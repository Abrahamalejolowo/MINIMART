import { NextRequest, NextResponse } from "next/server";
import { OrderItem, AddressInfo } from "@/types/order";

export async function POST(req: NextRequest) {
  try {
    const {
      email,
      name,
      phone,
      amount,
      items,
      address,
    }: {
      email: string;
      name: string;
      phone?: string;
      amount: number;
      items: OrderItem[];
      address?: AddressInfo;
    } = await req.json();

    if (!email || !amount || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required checkout parameters." },
        { status: 400 }
      );
    }

    const tx_ref = `tx-${Date.now()}`;

    const response = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tx_ref,
        amount,
        currency: "NGN",
        redirect_url: `${process.env.NEXT_PUBLIC_SITE_URL}/orders`,
        customer: {
          email,
          name,
          phone_number: phone,
        },
        meta: {
          items: JSON.stringify(items),
          address: JSON.stringify(address || {}),
        },
        customizations: {
          title: "Minimart Checkout",
          description: "Payment for store order",
        },
      }),
    });

    const data = await response.json();

    if (data.status === "success") {
      return NextResponse.json({ url: data.data.link, tx_ref }, { status: 200 });
    }

    return NextResponse.json({ error: data.message }, { status: 400 });
  } catch (error) {
    console.error("Payment initialization error:", error);
    return NextResponse.json(
      { error: "Failed to initialize payment." },
      { status: 500 }
    );
  }
}