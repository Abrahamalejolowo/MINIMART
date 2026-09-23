import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

// Initialize at module level (singleton)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    // 1. PARSE REQUEST
    let body;
    try {
      body = await req.json()
    } catch (e) {
      console.error("❌ Invalid JSON:", e)
      return NextResponse.json(
        { success: false, error: "Invalid JSON in request" },
        { status: 400 }
      )
    }

    const { 
      tx_ref, 
      flutterwave_tx_id, 
      shippingData = {}, 
      cart, 
      total, 
      paymentStatus = "completed" 
    } = body

    // 2. VALIDATE REQUIRED FIELDS
    if (!tx_ref || !cart?.length || !total) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    if (!shippingData.email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      )
    }

    // 3. PREPARE ORDER DATA
    const orderData = {
      id: tx_ref,
      flutterwave_tx_id: flutterwave_tx_id ? String(flutterwave_tx_id) : null,
      user_name: `${shippingData.firstName || ''} ${shippingData.lastName || ''}`.trim(),
      user_email: shippingData.email,
      user_phone: shippingData.phone || '',
      address_line1: shippingData.address || null,
      address_line2: shippingData.addressLine2 || null,
      city: shippingData.city || null,
      state: shippingData.state || null,
      country: shippingData.country || 'Nigeria',
      postal_code: shippingData.zip || null,
      items: cart,
      amount: total,
      currency: 'NGN',
      status: paymentStatus,
    }

    // 4. SAVE TO DATABASE
    const { data: order, error: dbError } = await supabase
      .from('orders')
      .upsert([orderData])
      .select()
      .single()

    if (dbError) {
      console.error("❌ Database error:", dbError)
      return NextResponse.json(
        { success: false, error: `Database error: ${dbError.message}` },
        { status: 500 }
      )
    }

    // 5. GENERATE EMAIL HTML
    const cartItemsHtml = cart
      .map(
        (item: any) => `
        <li style="margin-bottom: 8px;">
          <strong>${item.title || item.name}</strong> — Qty: ${item.quantity || 1} — ₦${(
            (item.price || 0) * (item.quantity || 1)
          ).toLocaleString()}
        </li>`
      )
      .join('')

    // 6. SEND EMAILS (non-critical failures)
    if (process.env.RESEND_API_KEY) {
      try {
        // Customer confirmation email
        await resend.emails.send({
          from: 'Minimart Store <onboarding@resend.dev>',
          to: [shippingData.email],
          subject: `Order Confirmation - #${tx_ref}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; color: #1e293b;">
              <h2 style="color: #059669; margin-top: 0;">Thank you for your order, ${shippingData.firstName || 'Customer'}!</h2>
              <p style="font-size: 14px; color: #64748b;">We have received your payment and are processing your shipment.</p>
              
              <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
              
              <h3 style="font-size: 16px; margin-bottom: 12px;">Order Summary (${tx_ref})</h3>
              <ul style="padding-left: 20px; font-size: 14px; color: #334155;">
                ${cartItemsHtml}
              </ul>
              
              <p style="font-size: 16px; font-weight: bold; margin-top: 16px;">
                Total Paid: <span style="color: #059669;">₦${Number(total).toLocaleString()}</span>
              </p>

              <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
              
              <h3 style="font-size: 16px; margin-bottom: 8px;">Delivery Details</h3>
              <p style="font-size: 14px; color: #475569; margin: 0;">
                ${shippingData.address}, ${shippingData.city}, ${shippingData.state}
              </p>
              <p style="font-size: 14px; color: #475569; margin: 4px 0 0 0;">
                Phone: ${shippingData.phone}
              </p>
            </div>
          `,
        })

        // Store owner notification
        const storeOwnerEmail = process.env.STORE_OWNER_EMAIL
        if (storeOwnerEmail) {
          await resend.emails.send({
            from: 'Minimart Store <onboarding@resend.dev>',
            to: [storeOwnerEmail],
            subject: `🛍️ New Order Received! ₦${Number(total).toLocaleString()} (${shippingData.firstName})`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; color: #1e293b;">
                <h2 style="color: #059669; margin-top: 0;">New Order Alert!</h2>
                
                <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; margin: 16px 0;">
                  <h3 style="font-size: 14px; margin-top: 0; color: #0f172a;">Customer Details</h3>
                  <p style="font-size: 13px; margin: 4px 0;"><strong>Name:</strong> ${shippingData.firstName} ${shippingData.lastName}</p>
                  <p style="font-size: 13px; margin: 4px 0;"><strong>Email:</strong> ${shippingData.email}</p>
                  <p style="font-size: 13px; margin: 4px 0;"><strong>Phone:</strong> ${shippingData.phone}</p>
                  <p style="font-size: 13px; margin: 4px 0;"><strong>Address:</strong> ${shippingData.address}, ${shippingData.city}, ${shippingData.state}</p>
                </div>

                <h3 style="font-size: 15px; margin-bottom: 8px;">Items Purchased:</h3>
                <ul style="padding-left: 20px; font-size: 14px;">
                  ${cartItemsHtml}
                </ul>

                <p style="font-size: 16px; font-weight: bold;">Total Amount: ₦${Number(total).toLocaleString()}</p>
              </div>
            `,
          })
        }
      } catch (emailErr: any) {
        console.warn("⚠️ Email send failed (non-critical):", emailErr.message)
      }
    }

    // 7. RETURN SUCCESS
    return NextResponse.json({ success: true, order }, { status: 200 })

  } catch (err: any) {
    console.error("❌ Unexpected error:", err)
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    )
  }
}

// GET endpoint for fetching user orders
export async function GET(req: Request) {
  try {
    const email = req.headers.get('x-user-email')

    if (!email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_email', email)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ orders: data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}