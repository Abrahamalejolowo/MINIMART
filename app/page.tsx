import { Navbar } from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import { CategoriesSection } from "@/components/categories-section"
import { LatestArrivalsSection } from "@/components/latest-arrivals-section"
import { SellerCtaSection } from "@/components/seller-cta-section"
import { TrustBadgesSection } from "@/components/trust-badges-section"
import { Footer } from "@/components/footer"
import { IntroSection } from "@/components/intro-section"
import { HowItWorks } from "@/components/how-it-work"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <IntroSection/>
        <CategoriesSection />
        <LatestArrivalsSection />
        <HowItWorks />
        <TrustBadgesSection />
        <SellerCtaSection />
      </main>
      <Footer />
    </div>
  )
}
