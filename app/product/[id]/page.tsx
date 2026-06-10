"use client";

import React, { use, useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Check, Building2, Phone, MapPin, MessageSquare, Star, ShieldCheck } from "lucide-react";
import { marketplaceDatabase } from '@/database/page';
import { Navbar } from "@/components/navbar";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const { addToCart } = useCart();
  
  const [isAdded, setIsAdded] = useState(false);

  const product = marketplaceDatabase.find((item) => String(item.id) === productId);

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-32 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <div className="h-16 w-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
          <ShoppingBag className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Product Not Found</h1>
        <p className="mt-2 text-sm text-gray-500 max-w-sm">The item you are looking for might have been moved or removed from the catalog.</p>
        <Link href="/shop" className="mt-6 bg-green-600 hover:bg-green-700 active:scale-95 text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-green-600/20 transition-all">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: String(product.id),
      name: product.title,
      price: product.price,
      image: product.image
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen  ">
        <Navbar />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Minimalist Navigation */}
        <div className="mt-6 mb-4 sm:mb-10 flex items-center justify-between">
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-black text-green-500 hover:text-green-600 transition-colors group"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1 stroke-[3px]" />
            Back
          </Link>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 rounded-full text-xs font-semibold text-green-700">
            <ShieldCheck className="h-3.5 w-3.5" /> Minimart Verified Secure
          </span>
        </div>

        {/* Dynamic Split Canvas Container */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40 p-6 sm:p-10 lg:p-12 grid md:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          
          {/* Left Block: Fully Aligned Image Gallery Viewport */}
          <div className="md:col-span-6 lg:col-span-6 flex flex-col h-full justify-between">
            <div className="relative w-full h-[350px] sm:h-[450px] md:h-full min-h-[400px] rounded-3xl overflow-hidden bg-[#FBFBFD] flex items-center justify-center border border-gray-100/80 group shadow-inner">
              
              {/* Product Floating Category Badge */}
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-bold tracking-widest text-gray-500 uppercase border border-gray-100/60 shadow-xs z-10">
                {product.category}
              </span>
              
              {/* Image rendered with strict container fitting metrics */}
              <Image 
                src={product.image || "/placeholder.jpeg"} 
                alt={product.title || "Product Image"} 
                fill 
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Soft overlay gradient to melt image boundaries perfectly */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right Block: Content Details Panel (Matched 1:1 Height) */}
          <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-center space-y-6 sm:space-y-8 py-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-block text-[11px] font-mono tracking-widest text-gray-400 font-bold uppercase bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                  ID: {product.id}
                </span>
                {product.rating && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-100/50 rounded-lg text-amber-700 text-xs font-bold">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    <span>{product.rating.rate.toFixed(1)}</span>
                    <span className="text-gray-400 font-normal">({product.rating.count})</span>
                  </div>
                )}
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-none sm:leading-tight">
                {product.title}
              </h1>
              
              <div className="pt-2">
                <p className="text-3xl sm:text-4xl font-black text-green-600 tracking-tight">
                  ₦{(product.price || 0).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Description Summary */}
            <div className="space-y-2 bg-gray-50/50 p-4 sm:p-5 rounded-2xl border border-gray-100/40">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-gray-400">Product Overview</h4>
              <p className="text-sm text-gray-600 font-normal leading-relaxed">
                {product.description || "Premium Nigerian-made item listed and verified live under the Minimart catalog. Fully inspected for superior authenticity and rigorous quality control parameters."}
              </p>
            </div>

            {/* Merchant Hub Component */}
            <div className="border-t border-gray-100 pt-6 sm:pt-8 space-y-4">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-gray-400">Verified Seller Deck</h4>
              
              <div className="grid grid-cols-1 gap-3">
                {/* Company Item */}
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white border border-gray-100 transition-hover hover:border-gray-200 shadow-2xs">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none">Manufacturer / Brand</p>
                    <p className="font-bold text-gray-900 mt-1 text-sm">{product.brand || "Scents by AW"}</p>
                  </div>
                </div>

                {/* Contact Info Item */}
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white border border-gray-100 transition-hover hover:border-gray-200 shadow-2xs">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none">Direct Desk Line</p>
                    <a 
                      href="tel:+2348000000000" 
                      className="font-bold text-gray-900 hover:text-green-600 text-sm transition-colors mt-1 block"
                    >
                      +234 800 000 0000
                    </a>
                  </div>
                </div>

                {/* Logistics Hub Item */}
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white border border-gray-100 transition-hover hover:border-gray-200 shadow-2xs">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none">Distribution Hub</p>
                    <p className="font-bold text-gray-900 mt-1 text-sm">Lagos, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Workflow Interactive Actions */}
            <div className="pt-2 space-y-3">
              <Button 
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full rounded-2xl text-sm font-black py-7 transition-all duration-300 flex items-center justify-center gap-2.5 ${
                  isAdded 
                    ? "bg-gray-950 text-white cursor-default" 
                    : "bg-green-600 text-white hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/20 active:scale-[0.98]"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="h-4 w-4 stroke-[3.5px]" />
                    Added to Order List
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4 stroke-[2.5px]" />
                    Secure Purchase / Add to Cart
                  </>
                )}
              </Button>

              <a
                href="https://wa.me/2348000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-2xl text-xs font-black py-4 border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageSquare className="h-4 w-4 text-green-500 fill-green-500/10" />
                Inquire via Active WhatsApp
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}