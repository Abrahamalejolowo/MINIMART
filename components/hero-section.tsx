'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import HeroSectionImage from '../public/HeroSectionImage.png'

export default function HeroSection() {
  const router = useRouter()

  return (
    <section className="relative w-full bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl">

          {/* BACKGROUND IMAGE */}
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2 }}
            className="relative h-[520px] sm:h-[600px] md:h-[650px] w-full"
          >
            <Image
              src={HeroSectionImage}
              alt="Nigerian products marketplace"
              fill
              priority
              className="object-cover"
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/55" />

            {/* HERO CONTENT */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-2xl px-6 sm:px-10 text-white">

                {/* SMALL BRAND TAG */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm uppercase tracking-widest text-white/70 font-semibold"
                >
                  Minmart Marketplace
                </motion.p>

                {/* TITLE */}
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 text-3xl sm:text-5xl md:text-6xl font-bold leading-tight"
                >
                  A curated marketplace for Nigerian-made products
                </motion.h1>

                {/* DESCRIPTION */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-5 text-base sm:text-lg text-white/80 max-w-xl"
                >
                  Discover handcrafted products, support local creators, and experience authentic Nigerian craftsmanship in one place.
                </motion.p>

                {/* ACTION BUTTONS */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-8 flex flex-col sm:flex-row gap-4"
                >
                  <Button
                    onClick={() => {
                      document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className="bg-green-500 hover:bg-green-600 hover:opacity-90 text-white px-6 py-6 text-base rounded-xl flex items-center gap-2 shadow-lg transition-all"
                  >
                    Explore Products <ArrowRight className="h-4 w-4" />
                  </Button>

                  {/* ROUTING TO COMING SOON PAGE */}
                  <Button
                    onClick={() => router.push('/coming-soon')} 
                    variant="outline"
                    className="border-white/40 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black px-6 py-6 text-base rounded-xl transition-all"
                  >
                    Partner with Us
                  </Button>
                </motion.div>

              </div>
            </div>
          </motion.div>

          {/* AUTHENTICITY BADGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-5 right-5 flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-xl z-10"
          >
            <CheckCircle className="h-5 w-5 text-emerald-600" />
            <p className="text-sm font-bold text-slate-900">
              100% Authentic Products
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}