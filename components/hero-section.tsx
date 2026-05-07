'use client'

import Image from 'next/image'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import store2 from "../public/Store.avif"

export default function HeroSection() {
  return (
    <section className="relative w-full bg-background">
      
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-16 lg:px-8">
        
        <div className="relative overflow-hidden rounded-3xl">

          {/* IMAGE BACKGROUND */}
          <div className="relative h-[520px] sm:h-[600px] md:h-[650px] w-full">
            <Image
              src={store2}
              alt="Nigerian products marketplace"
              fill
              priority
              className="object-cover"
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/55" />

            {/* CONTENT */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-2xl px-6 sm:px-10 text-white">

                <p className="text-sm uppercase tracking-widest text-white/70">
                  Minmart Marketplace
                </p>

                <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
                  A curated marketplace for Nigerian-made products
                </h1>

                <p className="mt-5 text-base sm:text-lg text-white/80 max-w-xl">
                  Discover handcrafted products, support local creators, and experience authentic Nigerian craftsmanship in one place.
                </p>

                {/* CTA BUTTONS */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-6 text-base rounded-xl flex items-center gap-2">
                    Explore Products <ArrowRight className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    className="border-white text-green-600 hover:bg-green-600 hover:text-WHIpx-6 py-6 mt-30 text-base rounded-xl"
                  >
                    Partner with Us
                  </Button>
                </div>

              </div>
            </div>
          </div>

          {/* BADGE */}
          <div className="absolute min-[500px]:mt-34 bottom-5 right-5 flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-lg">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="text-sm font-medium text-black">
              100% Authentic Products
            </p>
          </div>

        </div>
      </div>

    </section>
  )
}