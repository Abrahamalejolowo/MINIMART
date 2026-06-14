"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Studio from '@/public/Stuidio.jpg'
import { 
  ArrowUpRight, 
  ShieldCheck, 
  Cpu, 
  Globe2, 
  Sparkles, 
  Search, 
  ShoppingBag, 
  CheckCircle2, 
  BellRing, 
  Truck,
  Store,
  Inbox,
  Boxes,
  TrendingUp,
  MessageSquareOff,
  Check
} from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      number: '01',
      icon: <ShieldCheck className="h-5 w-5 text-green-600" />,
      title: 'Radical Authenticity',
      description: 'We believe in origin stories. Every item cataloged is traced directly back to vetted creators to verify materials, fair wages, and undeniable premium quality.',
    },
    {
      number: '02',
      icon: <Cpu className="h-5 w-5 text-green-600" />,
      title: 'Frictionless Infrastructure',
      description: 'Bridging the physical-to-digital gap shouldn’t be slow. We build optimized, secure, enterprise-grade payment and shipping lines tailored for West Africa.',
    },
    {
      number: '03',
      icon: <Globe2 className="h-5 w-5 text-green-600" />,
      title: 'Global Visibility',
      description: 'Our ultimate target is borderless digital trade. We turn localized talent into international exports, ensuring Nigerian craftsmanship sits on the global stage.',
    },
  ];

  const customerSteps = [
    {
      step: '1',
      icon: <Search className="h-4 w-4 text-green-600" />,
      title: 'Explore Products',
      description: 'Browse curated Nigerian-made products across different categories.',
    },
    {
      step: '2',
      icon: <ShoppingBag className="h-4 w-4 text-green-600" />,
      title: 'Place Your Order',
      description: 'Select your product, choose your preferences, and complete your order securely on Minmart.',
    },
    {
      step: '3',
      icon: <CheckCircle2 className="h-4 w-4 text-green-600" />,
      title: 'Order Verification',
      description: 'Your order is verified with the vendor before final confirmation.',
    },
    {
      step: '4',
      icon: <BellRing className="h-4 w-4 text-green-600" />,
      title: 'Receive Updates',
      description: 'Get notified when your order is confirmed, prepared, and dispatched.',
    },
    {
      step: '5',
      icon: <Truck className="h-4 w-4 text-green-600" />,
      title: 'Delivery',
      description: 'Your product is delivered through our vendor fulfillment and logistics network.',
    },
  ];

  const vendorSteps = [
    {
      step: '1',
      icon: <Store className="h-4 w-4 text-green-600" />,
      title: 'Get Featured',
      description: 'Showcase your products on Minmart and reach more customers.',
    },
    {
      step: '2',
      icon: <Inbox className="h-4 w-4 text-green-600" />,
      title: 'Receive Orders',
      description: 'Get notified immediately when customers place orders for your products.',
    },
    {
      step: '3',
      icon: <CheckCircle2 className="h-4 w-4 text-green-600" />,
      title: 'Confirm Availability',
      description: 'Verify product availability before order confirmation.',
    },
    {
      step: '4',
      icon: <Boxes className="h-4 w-4 text-green-600" />,
      title: 'Prepare & Dispatch',
      description: 'Package and dispatch products using your preferred delivery method.',
    },
    {
      step: '5',
      icon: <TrendingUp className="h-4 w-4 text-green-600" />,
      title: 'Grow Your Visibility',
      description: 'Build awareness for your brand through Minmart’s marketplace and storytelling approach.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB] text-zinc-900 antialiased selection:bg-green-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* PREMIUM EDITORIAL TEXT HERO HEADER */}
        <section className="bg-white border-b border-zinc-200/80 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[11px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-md">
                Enterprise Infrastructure
              </span>
            </div>
            
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-950 lg:col-span-8 leading-[1.1]">
                Elevating Nigerian <br />
                <span className="text-green-600">craftsmanship</span> for the modern global marketplace.
              </h1>
              <div className="lg:col-span-4 space-y-4 lg:border-l lg:border-zinc-200 lg:pt-2 lg:pl-8">
                <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                  Minmart operates a highly curated digital architecture. We bypass traditional structural bottlenecks to pass premium fashion, bespoke textiles, and organic assets directly to design-conscious tastemakers.
                </p>
                <div className="flex items-center gap-1.5 text-xs font-bold text-green-600">
                  <Sparkles className="h-4 w-4" />
                  <span>Curated Visibility Ecosystem</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HIGH CONTRAST IMAGE CANVAS HERO */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="relative h-[320px] sm:h-[420px] md:h-[550px] w-full overflow-hidden rounded-2xl border border-zinc-200 p-4 shadow-xs bg-white group">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-50">
              <Image
                src={Studio}
                alt="Artisanal Textile Production Studio"
                fill
                className="object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                sizes="(max-width: 1280px) 100vw, 1200px"
                priority
              />
            </div>
          </div>
        </section>

        {/* CORE ARCHITECTURE STATEMENTS */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-zinc-200 p-8 md:p-12 shadow-xs grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-400 block">
                [01] THE STRATEGY
              </span>
            </div>
            <div className="md:col-span-8 space-y-6">
              <h3 className="text-2xl md:text-3xl font-black text-zinc-950 tracking-tight leading-snug">
                Authenticity is the ultimate modern luxury asset. Local origin shouldn’t fix a growth ceiling.
              </h3>
              <div className="grid sm:grid-cols-2 gap-6 text-sm text-zinc-500 font-medium leading-relaxed">
                <p>
                  World-class local creators have run against systemic friction—fragmented transaction pipelines, volatile transit corridors, and unpredictable exposure lines. Minmart normalizes this landscape. We do not aggregate bulk data; we verify identity.
                </p>
                <p>
                  By processing every luxury collection through streamlined checkpoint channels, we maintain rigorous verification barriers. Creators remain safe to build, and premium global consumers place orders with unconditional clarity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CURRENT LAUNCH MILESTONE STATUS */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-zinc-200 p-8 md:p-12 shadow-xs space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-100/80 pb-4">
              <span className="text-xs uppercase tracking-wider font-bold text-zinc-400 block">
                Platform Status
              </span>
              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-0.5">
                <Check className="h-3 w-3 stroke-[3px]" /> DEPLOYED 2026
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black text-zinc-950">
                  2026
                </span>
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-sm uppercase tracking-wider">
                  Genesis Deployment
                </span>
              </div>
              <h4 className="text-base font-bold text-zinc-950 tracking-tight">Standardizing Borderless Trade</h4>
              <p className="text-sm text-zinc-500 max-w-3xl leading-relaxed font-medium">
                Minmart launched this year to completely replace fragmented, unverified social media marketplace setups with a trusted architecture. We are scaling secure ecosystem hubs to guarantee item verification lines and automated merchant routing from day one.
              </p>
            </div>
          </div>
        </section>

        {/* PIXEL-PERFECT PIPELINE PIPES (HOW IT WORKS) */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-400 block">System Operational Framework</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-950">How It Works</h2>
            <p className="text-sm text-zinc-500 font-medium">
              Minmart simplifies the shopping experience for customers while helping vendors grow their visibility and sales channels seamlessly.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            
            {/* BUYER SIDE ENGINE */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 md:p-8 shadow-xs space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-zinc-400">Buyer Pipeline</span>
                <h3 className="text-lg font-black text-zinc-950 mt-0.5">For Customers</h3>
              </div>
              
              <div className="relative border-l border-zinc-200 ml-3 pl-6 space-y-6">
                {customerSteps.map((step, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[35px] top-0.5 bg-white border border-zinc-200 shadow-xs h-6 w-6 rounded-md flex items-center justify-center font-mono text-[10px] font-bold text-zinc-900 group-hover:border-green-500 group-hover:text-green-600 transition-colors">
                      {step.step}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {step.icon}
                        <h4 className="text-sm font-bold text-zinc-950 group-hover:text-green-600 transition-colors">{step.title}</h4>
                      </div>
                      <p className="text-xs text-zinc-400 font-medium leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* VENDOR SIDE ENGINE */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 md:p-8 shadow-xs space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-zinc-400">Merchant Hub Architecture</span>
                <h3 className="text-lg font-black text-zinc-950 mt-0.5">For Vendors</h3>
              </div>
              
              <div className="relative border-l border-zinc-200 ml-3 pl-6 space-y-6">
                {vendorSteps.map((step, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[35px] top-0.5 bg-white border border-zinc-200 shadow-xs h-6 w-6 rounded-md flex items-center justify-center font-mono text-[10px] font-bold text-zinc-900 group-hover:border-green-500 group-hover:text-green-600 transition-colors">
                      {step.step}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {step.icon}
                        <h4 className="text-sm font-bold text-zinc-950 group-hover:text-green-600 transition-colors">{step.title}</h4>
                      </div>
                      <p className="text-xs text-zinc-400 font-medium leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* PRIVACY LOG SECURITY WARNING FRAME */}
          <div className="mt-6 bg-green-50/50 border border-green-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 max-w-4xl mx-auto shadow-xs">
            <div className="p-2.5 bg-white border border-green-200 rounded-xl text-green-600 shrink-0 shadow-2xs">
              <MessageSquareOff className="h-5 w-5" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-green-700 block">Communication Routing Policy</span>
              <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                Customers do not contact vendors directly. <strong className="font-bold text-zinc-900">Minmart logs and operates all transactional communication layers</strong> directly to preserve validation audits and lock down delivery security.
              </p>
            </div>
          </div>
        </section>

        {/* REINFORCED VALUES MATRIX GRID */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 mb-12">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs uppercase tracking-wider font-bold text-zinc-400">
              Operational Framework Pillars
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.number} className="bg-white rounded-2xl p-6 space-y-4 border border-zinc-200 shadow-xs hover:shadow-sm transition-shadow duration-300">
                <div className="flex justify-between items-center">
                  <div className="p-2 bg-zinc-50 border border-zinc-100 rounded-lg text-green-600">
                    {v.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-400 bg-zinc-50 px-2 py-0.5 rounded-md">
                    [{v.number}]
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-zinc-950 tracking-tight">{v.title}</h3>
                  <p className="text-xs text-zinc-400 font-medium leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HIGH CONTRAST ACCELERATED CTA CONSOLE */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 mb-12">
          <div className="bg-white rounded-3xl border border-zinc-200 p-8 md:p-16 text-center space-y-6 shadow-xs relative overflow-hidden">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-950">
              Ready to cross borders?
            </h2>
            <p className="text-sm text-zinc-400 max-w-md mx-auto font-medium leading-relaxed">
              Whether you are looking to acquire highly coveted statement pieces or scale your verified business footprint to international audiences, your gateway is open.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/shop" passHref className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-green-500 text-white hover:bg-green-600 active:scale-[0.99] font-bold text-sm px-8 py-6 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 group">
                  Enter The Shop <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </Link>

              <Link href="/partner" passHref className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto border-zinc-200 bg-white text-zinc-700 hover:bg-gray-50 hover:border-zinc-300 font-bold text-sm px-8 py-6 rounded-xl transition-all shadow-xs">
                  Partner with Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}