'use client'

import { Navbar } from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import { IntroSection } from "@/components/intro-section"
import { CategoriesSection } from "@/components/categories-section"
import { LatestArrivalsSection } from "@/components/latest-arrivals-section"
// import { HowItWorks } from "@/components/how-it-work"
import { TrustBadgesSection } from "@/components/trust-badges-section"
import { SellerCtaSection } from "@/components/seller-cta-section"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB] text-gray-900 selection:bg-green-600 selection:text-white">
      <Navbar />
      
      <main className="flex-1 space-y-4 sm:space-y-0">
        <HeroSection />
        <IntroSection />
        <ScrollReveal>
          <CategoriesSection />
        </ScrollReveal>
        <ScrollReveal>
          <LatestArrivalsSection />
        </ScrollReveal>
        <ScrollReveal>
          <TrustBadgesSection />
        </ScrollReveal>

        <ScrollReveal>
          <SellerCtaSection />
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  )
}