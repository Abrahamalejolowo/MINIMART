import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, ShieldCheck, ArrowRight, Store } from "lucide-react";
import StandaloneApplier from "./_components/StandaloneApplier";
import Countdown from "./_components/Countdown";
import { Navbar } from "@/components/navbar";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://minmart.ng";

export const metadata: Metadata = {
  title: "Partner Portal Coming Soon | Minmart",
  description: "Minmart is putting the finishing touches on our seller and partner onboarding portal. Join the waitlist for early access.",
  alternates: { canonical: `${SITE_URL}/coming-soon` },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Partner Portal Coming Soon | Minmart",
    description: "Minmart is putting the finishing touches on our seller and partner onboarding portal. Join the waitlist for early access.",
    url: `${SITE_URL}/coming-soon`,
    type: "website",
  },
  twitter: {
    title: "Partner Portal Coming Soon | Minmart",
    description: "Minmart is putting the finishing touches on our seller and partner onboarding portal. Join the waitlist for early access.",
  },
};

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground selection:bg-green-500/20 antialiased">
      <StandaloneApplier />

      {/* Modern Header */}

      <Navbar/>

    

      {/* Hero Body */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8 relative overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-green-500/15 blur-[120px]" />

        <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
          
          {/* Status Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--green))]/30 bg-green-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[hsl(var(--green))] shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Coming Soon</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-foreground max-w-2xl">
            COMING  <span className="text-[hsl(var(--green))]">SOON.</span>
          </h1>

          {/* Description */}
          <p className="mt-5 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl">
            Minmart is building Nigeria’s premier merchant & artisan platform. 
            Be among the first verified creators to showcase and sell nationwide.
          </p>

          {/* Live Countdown Component */}
          <div className="my-10 w-full max-w-md">
            <Countdown />
          </div>

          {/* CTA Link */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
            <Link
              href="/shop"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-2xl bg-green-500 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-xl hover:opacity-95 active:scale-[0.98] transition-all"
            >
              <span>Explore Active Products</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Guarantee Note */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-[hsl(var(--green))]" />
            <span>Verified local creators & guaranteed buyer protection.</span>
          </div>

        </div>
      </main>
    </div>
  );
}