import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

export async function POST(req: Request) {
  try {
    console.log("📥 Order API called");
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    // 1. CHECK ENVIRONMENT VARIABLES
    if (!supabaseUrl) {
      console.error("❌ Missing: NEXT_PUBLIC_SUPABASE_URL");
      return NextResponse.json(
        { success: false, error: "Missing NEXT_PUBLIC_SUPABASE_URL in environment" },
        { status: 500 }
      );
    }

    if (!serviceRoleKey) {
      console.error("❌ Missing: SUPABASE_SERVICE_ROLE_KEY");
      return NextResponse.json(
        { success: false, error: "Missing SUPABASE_SERVICE_ROLE_KEY in environment" },
        { status: 500 }
      );
    }

    // 2. PARSE REQUEST BODY
    let body;
    try {
      body = await req.json();
    } catch (e) {
      console.error("❌ Failed to parse request JSON:", e);
      return NextResponse.json(
        { success: false, error: "Invalid JSON in request" },
        { status: 400 }
      );
    }

    const { 
      tx_ref, 
      flutterwave_tx_id, 
      shippingData = {}, 
      cart, 
      total, 
      paymentStatus = "completed" 
    } = body;

    // 3. VALIDATE REQUIRED FIELDS
    if (!tx_ref) {
      return NextResponse.json(
        { success: false, error: "Missing tx_ref" },
        { status: 400 }
      );
    }

    if (!cart || !Array.isArray(cart)) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid cart data" },
        { status: 400 }
      );
    }

    if (!total) {
      return NextResponse.json(
        { success: false, error: "Missing total amount" },
        { status: 400 }
      );
    }

    // 4. CREATE SUPABASE CLIENT
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // 5. PREPARE ORDER DATA
    const orderData = {
      id: tx_ref,
      flutterwave_tx_id: flutterwave_tx_id ? String(flutterwave_tx_id) : null,
      user_name: `${shippingData.firstName || ''} ${shippingData.lastName || ''}`.trim(),
      user_email: shippingData.email || '',
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
    };

    // 6. INSERT/UPDATE ORDER IN SUPABASE
    const { data: order, error: dbError } = await supabase
      .from('orders')
      .upsert([orderData])
      .select()
      .single();

    if (dbError) {
      console.error("❌ Database error:", dbError);
      return NextResponse.json(
        { 
          success: false, 
          error: `Database error: ${dbError.message}`,
          code: dbError.code
        },
        { status: 500 }
      );
    }

    // 7. SEND EMAIL VIA RESEND
    if (process.env.RESEND_API_KEY && shippingData.email) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        const cartItemsHtml = cart
          .map(
            (item: any) => `
            <li style="margin-bottom: 8px;">
              <strong>${item.title || item.name}</strong> — Qty: ${item.quantity || 1} — ₦${(
                (item.price || 0) * (item.quantity || 1)
              ).toLocaleString()}
            </li>`
          )
          .join('');

        await resend.emails.send({
          from: 'Minimart Store <onboarding@resend.dev>',
          to: [shippingData.email],
          subject: `Order Confirmation - #${tx_ref}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; padding: 20px;">
              <h2>Thank you for your order, ${shippingData.firstName || 'Customer'}!</h2>
              <p><strong>Order ID:</strong> ${tx_ref}</p>
              <p><strong>Total Paid:</strong> ₦${Number(total).toLocaleString()}</p>
              <h3>Purchased Items:</h3>
              <ul>${cartItemsHtml}</ul>
            </div>
          `,
        });
      } catch (emailErr: any) {
        console.warn("⚠️ Email send failed (non-critical):", emailErr.message);
      }
    }

    // 8. RETURN SUCCESS
    return NextResponse.json({ 
      success: true, 
      order,
      message: "Order saved successfully"
    }, { status: 200 });

  } catch (err: any) {
    console.error("❌ Unexpected error in order API:", err);
    return NextResponse.json(
      { 
        success: false, 
        error: `Server error: ${err.message}`,
      },
      { status: 500 }
    );
  }
}