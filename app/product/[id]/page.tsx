"use client";

import React, { use, useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Check, Building2, Phone, MapPin, MessageSquare, Star, Shield, HelpCircle } from "lucide-react";
import { marketplaceDatabase } from '@/database/page';

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
      <div className="mx-auto max-w-7xl px-4 py-32 text-center flex flex-col items-center justify-center min-h-[70vh] bg-white">
        <div className="h-12 w-12 text-gray-300 border border-gray-200 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <ShoppingBag className="h-5 w-5" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Product Unreachable</h1>
        <p className="mt-2 text-sm text-gray-400 max-w-xs">This item does not exist or has been cycled out of the marketplace inventory.</p>
        <Link href="/shop" className="mt-8 bg-gray-950 hover:bg-gray-800 text-white px-8 py-3.5 rounded-full font-semibold text-xs tracking-widest uppercase transition-all shadow-sm">
          Return to Catalog
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
    <div className="bg-white min-h-screen text-gray-900 selection:bg-green-500 selection:text-white antialiased">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        
        {/* Luxury Top Navigation Bar */}
        <div className="mb-10 sm:mb-16 flex items-center justify-between border-b border-gray-100 pb-6">
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-3 text-[11px] uppercase tracking-widest font-bold text-gray-400 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1 stroke-[2.5px]" />
            Back to Collection
          </Link>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            Minimart Verified Authentic
          </div>
        </div>

        {/* Asymmetric Split Layout Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT COLUMN: Premium Art Vault Showcase */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-square w-full rounded-2xl bg-[#FBFBFD] flex items-center justify-center border border-gray-100/70 overflow-hidden group">
              {/* Premium Category Floating Tag */}
              <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gray-200/40 shadow-xs">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{product.category}</p>
              </div>

              <Image 
                src={product.image || "/placeholder.jpeg"} 
                alt={product.title || "Product Display Showcase"} 
                fill 
                className="object-contain p-8 sm:p-16 transition-transform duration-700 ease-out group-hover:scale-102 mix-blend-multiply" 
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Editorial Description & Action Deck */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-8">
            
            {/* Header Content Frame */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] font-mono tracking-widest text-gray-400 font-bold bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-md">
                  REF: {product.id}
                </span>
                {product.rating && (
                  <div className="flex items-center gap-1 text-xs font-bold text-gray-900 bg-amber-50/60 border border-amber-100 px-2.5 py-1 rounded-full">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    <span>{product.rating.rate.toFixed(1)}</span>
                    <span className="text-gray-400 font-normal text-[11px]">({product.rating.count})</span>
                  </div>
                )}
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 leading-tight">
                {product.title}
              </h1>
              
              <div className="pt-2">
                <p className="text-3xl sm:text-4xl font-black text-green-600 tracking-tight">
                  ₦{(product.price || 0).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Editorial Overview Frame */}
            <div className="space-y-2 border-t border-b border-gray-100 py-6">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400">The Story</h4>
              <p className="text-sm text-gray-600 leading-relaxed font-normal">
                {product.description || "Premium Nigerian-made item listed and verified live under the Minimart catalog. Fully inspected for superior authenticity and rigorous quality control parameters."}
              </p>
            </div>

            {/* Premium Merchant Metadata Rowcards */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Provenance & Fulfilment</h4>
              
              <div className="grid grid-cols-1 gap-2.5">
                {/* Brand Frame */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 bg-white hover:border-gray-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-gray-50 text-gray-600 rounded-lg flex items-center justify-center border border-gray-100">
                      <Building2 className="h-4 w-4 stroke-[1.5px]" />
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider leading-none">Origin Brand</p>
                      <p className="font-bold text-gray-900 mt-1 text-xs">{product.brand || "Scents by AW"}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">Verified</span>
                </div>

                {/* Contact Frame */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 bg-white hover:border-gray-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-gray-50 text-gray-600 rounded-lg flex items-center justify-center border border-gray-100">
                      <Phone className="h-4 w-4 stroke-[1.5px]" />
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider leading-none">Concierge Line</p>
                      <a href="tel:+2348000000000" className="font-bold text-gray-900 text-xs mt-1 block hover:text-green-600 transition-colors">
                        +234 800 000 0000
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hub Location Frame */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 bg-white hover:border-gray-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-gray-50 text-gray-600 rounded-lg flex items-center justify-center border border-gray-100">
                      <MapPin className="h-4 w-4 stroke-[1.5px]" />
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider leading-none">Dispatch Center</p>
                      <p className="font-bold text-gray-900 text-xs mt-1">{product.location || "Lagos, Nigeria"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Actions / Conversion Console */}
            <div className="pt-4 space-y-3">
              <Button 
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full rounded-full text-xs font-bold tracking-widest uppercase py-7 transition-all duration-300 border flex items-center justify-center gap-3 ${
                  isAdded 
                    ? "bg-gray-900 border-gray-900 text-white cursor-default" 
                    : "bg-gray-950 border-gray-950 text-white hover:bg-white hover:text-gray-950 hover:shadow-xl hover:shadow-gray-900/5 active:scale-[0.99]"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="h-3.5 w-3.5 stroke-[3px]" />
                    Allocated to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-3.5 w-3.5 stroke-[2px]" />
                    Acquire Product / Add to Cart
                  </>
                )}
              </Button>

              <a
                href="https://wa.me/2348000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-full text-[11px] font-bold tracking-widest uppercase py-4 border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="h-4 w-4 text-green-500 fill-green-500/10" />
                Inquire via WhatsApp
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}