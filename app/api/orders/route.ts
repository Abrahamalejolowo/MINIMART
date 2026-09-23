import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  try {
    console.log("📥 Order API called");
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    // 1. CHECK ENVIRONMENT VARIABLES
    if (!supabaseUrl) {
      console.error("❌ Missing: NEXT_PUBLIC_SUPABASE_URL");
      return NextResponse.json(
        { success: false, error: "Missing NEXT_PUBLIC_SUPABASE_URL in .env" },
        { status: 500 }
      );
    }

    if (!serviceRoleKey) {
      console.error("❌ Missing: SUPABASE_SERVICE_ROLE_KEY");
      return NextResponse.json(
        { success: false, error: "Missing SUPABASE_SERVICE_ROLE_KEY in .env" },
        { status: 500 }
      );
    }

    console.log("✅ Environment variables found");

    // 2. PARSE REQUEST BODY
    let body;
    try {
      body = await req.json();
      console.log("📦 Request body:", {
        tx_ref: body.tx_ref,
        flutterwave_tx_id: body.flutterwave_tx_id,
        total: body.total,
      });
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
      shippingData, 
      cart, 
      total, 
      paymentStatus = "completed" 
    } = body;

    // 3. VALIDATE REQUIRED FIELDS
    if (!tx_ref) {
      console.error("❌ Missing: tx_ref");
      return NextResponse.json(
        { success: false, error: "Missing tx_ref" },
        { status: 400 }
      );
    }

    if (!cart || !Array.isArray(cart)) {
      console.error("❌ Missing or invalid: cart");
      return NextResponse.json(
        { success: false, error: "Missing or invalid cart data" },
        { status: 400 }
      );
    }

    if (!total) {
      console.error("❌ Missing: total");
      return NextResponse.json(
        { success: false, error: "Missing total amount" },
        { status: 400 }
      );
    }

    // 4. CREATE SUPABASE CLIENT
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    console.log("✅ Supabase client created");

    // 5. PREPARE ORDER DATA
    const orderData = {
      id: tx_ref,
      flutterwave_tx_id: flutterwave_tx_id ? String(flutterwave_tx_id) : null,
      user_name: shippingData 
        ? `${shippingData.firstName || ''} ${shippingData.lastName || ''}`.trim() 
        : '',
      user_email: shippingData?.email || '',
      user_phone: shippingData?.phone || '',
      address_line1: shippingData?.address || null,
      address_line2: shippingData?.addressLine2 || null,
      city: shippingData?.city || null,
      state: shippingData?.state || null,
      country: shippingData?.country || 'Nigeria',
      postal_code: shippingData?.zip || null,
      items: cart,
      amount: total,
      currency: 'NGN',
      status: paymentStatus,
    };

    console.log("💾 Preparing to save order:", orderData);

    // 6. INSERT/UPDATE ORDER IN SUPABASE
    const { data: order, error: dbError } = await supabase
      .from('orders')
      .upsert([orderData])
      .select()
      .single();

    if (dbError) {
      console.error("❌ Database error:", {
        code: dbError.code,
        message: dbError.message,
        details: dbError.details,
      });
      return NextResponse.json(
        { 
          success: false, 
          error: `Database error: ${dbError.message}`,
          code: dbError.code
        },
        { status: 500 }
      );
    }

    console.log("✅ Order saved successfully:", order?.id);

    // 7. SEND EMAIL (OPTIONAL - DON'T CRASH IF IT FAILS)
    if (process.env.RESEND_API_KEY) {
      try {
        console.log("📧 Attempting to send confirmation email...");
        
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        const cartItemsHtml = (cart || [])
          .map(
            (item: any) => `
            <li style="margin-bottom: 8px;">
              <strong>${item.title || item.name}</strong> — Qty: ${item.quantity || 1} — ₦${(
                (item.price || 0) * (item.quantity || 1)
              ).toLocaleString()}
            </li>`
          )
          .join('');

        const emailResult = await resend.emails.send({
          from: 'Minimart Store <onboarding@resend.dev>',
          to: [shippingData?.email || ''],
          subject: `Order Confirmation - #${tx_ref}`,
          html: `
            <h2>Thank you for your order!</h2>
            <p><strong>Order ID:</strong> ${tx_ref}</p>
            <p><strong>Total Paid:</strong> ₦${Number(total).toLocaleString()}</p>
            <h3>Items:</h3>
            <ul>${cartItemsHtml}</ul>
          `,
        });
        
        if (emailResult.error) {
          console.warn("⚠️ Email send failed:", emailResult.error);
        } else if (emailResult.data?.id) {
          console.log("✅ Email sent successfully:", emailResult.data.id);
        }
      } catch (emailErr: any) {
        console.warn("⚠️ Email send failed (non-critical):", emailErr.message);
        // Don't throw - email is optional
      }
    } else {
      console.log("ℹ️ Resend API key not configured - skipping email");
    }

    // 8. RETURN SUCCESS
    return NextResponse.json({ 
      success: true, 
      order,
      message: "Order saved successfully"
    }, { status: 200 });

  } catch (err: any) {
    console.error("❌ Unexpected error in order API:", {
      message: err.message,
      stack: err.stack,
    });
    return NextResponse.json(
      { 
        success: false, 
        error: `Server error: ${err.message}`,
      },
      { status: 500 }
    );
  }
}