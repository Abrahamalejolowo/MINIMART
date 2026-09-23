import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface WebhookAddress {
  address_line1?: string;
  addressLine1?: string;
  address_line2?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  zip?: string;
}

interface WebhookMeta {
  items?: string | any[];
  address?: string | any;
}

export async function POST(req: NextRequest) {
  try {
    // 1. VERIFY SIGNATURE
    const signature = req.headers.get("verif-hash");
    const secretHash = process.env.FLUTTERWAVE_SECRET_HASH;

    console.log("🔐 Webhook signature check:", { signature, hasSecretHash: !!secretHash });

    if (!secretHash) {
      console.error("❌ FLUTTERWAVE_SECRET_HASH not configured in .env");
      return NextResponse.json(
        { error: "Server not configured" },
        { status: 500 }
      );
    }

    if (!signature || signature !== secretHash) {
      console.warn("❌ Unauthorized signature mismatch");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. PARSE WEBHOOK PAYLOAD
    const body = await req.json();
    const payload = body.data || body;

    console.log("📦 Webhook payload received:", {
      id: payload.id,
      tx_ref: payload.tx_ref,
      status: payload.status,
      amount: payload.amount,
    });

    const id = payload.id;
    const tx_ref = payload.tx_ref || payload.txRef;
    const amount = payload.amount;
    const currency = payload.currency || "NGN";
    const customer = payload.customer || {};
    const meta: WebhookMeta = payload.meta || {};

    if (!id || !tx_ref) {
      console.warn("⚠️ Missing transaction ID or reference");
      return NextResponse.json(
        { message: "Invalid webhook data" },
        { status: 400 }
      );
    }

    // 3. VERIFY TRANSACTION WITH FLUTTERWAVE
    console.log("🔄 Verifying transaction with Flutterwave API...");
    
    const verifyRes = await fetch(
      `https://api.flutterwave.com/v3/transactions/${id}/verify`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    );
    
    const verifyData = await verifyRes.json();

    console.log("✅ Flutterwave verification response:", {
      status: verifyData.status,
      dataStatus: verifyData.data?.status,
      amount: verifyData.data?.amount,
    });

    if (
      verifyData.status === "success" &&
      verifyData.data.status === "successful" &&
      verifyData.data.amount >= amount
    ) {
      // 4. PARSE ITEMS & ADDRESS
      let items: any[] = [];
      let address: WebhookAddress = {};

      try {
        if (meta.items) {
          items =
            typeof meta.items === "string"
              ? JSON.parse(meta.items)
              : meta.items || [];
        }
      } catch (e) {
        console.warn("⚠️ Failed to parse meta.items:", e);
        items = [];
      }

      try {
        if (meta.address) {
          address =
            typeof meta.address === "string"
              ? JSON.parse(meta.address)
              : meta.address || {};
        }
      } catch (e) {
        console.warn("⚠️ Failed to parse meta.address:", e);
        address = {};
      }

      // 5. SAVE TO SUPABASE
      const supabase = await createClient();

      const orderData = {
        id: tx_ref,
        flutterwave_tx_id: String(id),
        user_email: customer.email || null,
        user_name: customer.name || "",
        user_phone: customer.phone_number || "",
        address_line1:
          address.address_line1 || address.addressLine1 || null,
        address_line2:
          address.address_line2 || address.addressLine2 || null,
        city: address.city || null,
        state: address.state || null,
        country: address.country || null,
        postal_code: address.postal_code || address.zip || null,
        amount: amount,
        currency: currency,
        status: "completed",
        items: items,
      };

      console.log("💾 Saving order to Supabase:", orderData);

      const { error: dbError, data: savedData } = await supabase
        .from("orders")
        .upsert(orderData)
        .select()
        .single();

      if (dbError) {
        console.error("❌ Database upsert error:", dbError);
        return NextResponse.json(
          { error: "Database error", details: dbError.message },
          { status: 500 }
        );
      }

      console.log("✅ Order successfully saved:", savedData);
      return NextResponse.json(
        { status: "success", orderId: tx_ref },
        { status: 200 }
      );
    } else {
      console.warn(
        "❌ Transaction verification failed:",
        verifyData.data?.status
      );
      return NextResponse.json(
        { message: "Transaction verification failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("❌ Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed", details: String(error) },
      { status: 500 }
    );
  }
}