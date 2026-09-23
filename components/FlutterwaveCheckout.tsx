"use client";

import React, { useState } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

interface ShippingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip?: string;
  country?: string;
}

interface CartItem {
  id: string;
  name: string;
  title?: string;
  price: number;
  quantity: number;
  image?: string; // 🆕 NEW - Product image
}

interface FlutterwaveCheckoutProps {
  amountInNaira: number;
  email: string;
  name: string;
  phone: string;
  txRef: string;
  shippingData: ShippingData;
  cartItems: CartItem[];
  onSuccessCallback?: (response: any) => void;
  onCloseCallback?: () => void;
}

export default function FlutterwaveCheckout({
  amountInNaira,
  email,
  name,
  phone,
  txRef,
  shippingData,
  cartItems,
  onSuccessCallback,
  onCloseCallback,
}: FlutterwaveCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const publicKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "";

  console.log("🛒 Cart Items with images:", cartItems);

  const config = {
    public_key: publicKey,
    tx_ref: txRef,
    amount: amountInNaira,
    currency: "NGN",
    payment_options: "card,ussd,banktransfer",
    customer: {
      email,
      phone_number: phone,
      name,
    },
    meta: {
      // 🆕 UPDATED - Include product images in cart items
      items: JSON.stringify(
        cartItems.map((item) => ({
          id: item.id,
          name: item.name || item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image || "", // 🆕 NEW - Include image URL
        }))
      ),
      address: JSON.stringify({
        address_line1: shippingData.address,
        address_line2: shippingData.addressLine2 || "",
        city: shippingData.city,
        state: shippingData.state,
        country: shippingData.country || "Nigeria",
        postal_code: shippingData.zip || "",
      }),
    },
    customizations: {
      title: "Minimart Store",
      description: "Payment for store items",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-photo-online-shopping-commerce-concept.jpg",
    },
  };

  const handleFlutterwavePayment = useFlutterwave(config);

  const handlePayment = () => {
    if (!publicKey) {
      alert("❌ Missing NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY in .env.local");
      return;
    }

    setLoading(true);
    console.log("🚀 Initiating Flutterwave payment...", { txRef, amount: amountInNaira });

    handleFlutterwavePayment({
      callback: async (response: any) => {
        console.log("💳 Payment callback response:", response);
        closePaymentModal();

        // Check for successful payment
        if (
          response.status === "successful" ||
          response.status === "completed"
        ) {
          try {
            console.log("✅ Payment successful! Saving order...");

            // Prepare order data with images
            const orderPayload = {
              tx_ref: response.tx_ref || txRef,
              flutterwave_tx_id: String(
                response.transaction_id || response.id || ""
              ),
              shippingData,
              cart: cartItems.map((item) => ({
                id: item.id,
                name: item.name || item.title,
                price: item.price,
                quantity: item.quantity,
                image: item.image || "", // 🆕 NEW - Include image
              })),
              total: amountInNaira,
              paymentStatus: "completed",
            };

            console.log("📦 Order payload:", orderPayload);

            const fallbackRes = await fetch("/api/orders", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(orderPayload),
            });

            const fallbackData = await fallbackRes.json();
            console.log("📋 Fallback API Response:", fallbackData);

            if (fallbackData.success) {
              console.log("✅ Order saved successfully!");
            } else {
              console.warn(
                "⚠️ API response not successful:",
                fallbackData.error
              );
            }

            // Always redirect after successful payment
            if (onSuccessCallback) onSuccessCallback(response);

            // Small delay to allow processing
            setTimeout(() => {
              window.location.href = "/orders";
            }, 1500);
          } catch (err) {
            console.error("❌ Fallback save error:", err);
            alert(
              "Payment completed! ✅ Please wait while we process your order..."
            );
            setTimeout(() => {
              window.location.href = "/orders";
            }, 2000);
          } finally {
            setLoading(false);
          }
        } else {
          console.log("❌ Payment not successful:", response.status);
          setLoading(false);
          alert("Payment was not successful. Please try again.");
        }
      },
      onClose: () => {
        console.log("🔌 Payment modal closed");
        setLoading(false);
        if (onCloseCallback) onCloseCallback();
      },
    });
  };

  return (
    <button
      type="button"
      onClick={handlePayment}
      disabled={loading}
      className="w-full bg-green-500 hover:bg-green-600 disabled:bg-emerald-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer"
    >
      {loading ? "Processing..." : `Pay ₦${amountInNaira.toLocaleString()}`}
    </button>
  );
}