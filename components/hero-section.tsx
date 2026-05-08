'use client'

import Image from 'next/image'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import store2 from "../public/Store.avif"

export default function HeroSection() {
  return (
    <section className="relative w-full bg-background">
      
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-16 lg:px-8">
        
        <div className="relative overflow-hidden rounded-3xl">

          {/* IMAGE */}
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2 }}
            className="relative h-[520px] sm:h-[600px] md:h-[650px] w-full"
          >
            <Image
              src={store2}
              alt="Nigerian products marketplace"
              fill
              priority
              className="object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/55" />

            {/* CONTENT */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-2xl px-6 sm:px-10 text-white">

                {/* SMALL TEXT */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm uppercase tracking-widest text-white/70"
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

                {/* BUTTONS */}
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
  className="bg-green-600 hover:bg-green-700 text-white px-6 py-6 text-base rounded-xl flex items-center gap-2"
>
  Explore Products <ArrowRight className="h-4 w-4" />
</Button>

                  <Button
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-6 py-6 text-base rounded-xl"
                  >
                    Partner with Us
                  </Button>
                </motion.div>

              </div>
            </div>
          </motion.div>

          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-5 right-5 flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-lg"
          >
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="text-sm font-medium text-black">
              100% Authentic Products
            </p>
          </motion.div>

        </div>
      </div>

    </section>
  )
}