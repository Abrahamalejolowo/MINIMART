"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Heart, ShoppingCart } from "lucide-react"

// IMPORTING FROM YOUR CENTRAL DATABASE FILE
import { marketplaceDatabase } from "../database/page"

interface Product {
  id: string | number
  title: string
  price: number
  image: string
  category: string
  isLocal?: boolean
}

// Fixed formatting to support both raw local Naira prices and standard mock API numbers
function formatNaira(amount: number, isLocal?: boolean) {
  const finalAmount = isLocal ? amount : amount * 1000
  return new Intl.NumberFormat("en-NG").format(finalAmount)
}

export function LatestArrivalsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // 1. (Optional) Fetch from a live mock API (currently commented out)
        // const apiResponse = await fetch('https://fakestoreapi.com/products?limit=10')
        // const apiProducts = await apiResponse.json()

        // 2. Format our local database listings to match the display interface structure
        const formattedLocalProducts = marketplaceDatabase.map((p) => ({
          id: p.id,
          title: p.title,
          price: p.price,
          image: p.image,
          category: p.category,
          isLocal: true,
        }))

        // 3. Mix both datasets together and limit the final section display to 8 items total
        const mixedCollection = [...formattedLocalProducts]
        // Shuffles the array so local and API elements interweave randomly
        const shuffledCollection = mixedCollection.sort(() => 0.5 - Math.random())

        setProducts(shuffledCollection.slice(0, 8))
      } catch (error) {
        console.error("Error fetching products:", error)
        // Fallback to local data if anything fails
        setProducts(
          marketplaceDatabase.slice(0, 8).map((p) => ({ ...p, isLocal: true }))
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <section className="py-16 text-center text-muted-foreground">
        Loading latest arrivals...
      </section>
    )
  }

  return (
    <section className="bg-secondary/30 pt-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* HEADER */}
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
            Latest Arrivals
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Discover the newest products from global marketplace
          </p>
        </div>

        {/* GRID */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-2xl bg-background shadow-sm transition hover:shadow-md border border-zinc-100"
            >
              {/* IMAGE CONTAINER */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />

                {/* WISHLIST BUTTON */}
                <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-zinc-400 hover:text-green-600 shadow-xs transition-colors">
                  <Heart className="h-4 w-4" />
                </button>
              </div>

              {/* INFO PACK */}
              <div className="p-4">
                <span className="text-[11px] uppercase tracking-wider text-green-600 font-bold">
                  {product.category}
                </span>

                <h3 className="mt-1 text-sm font-light text-foreground line-clamp-2 min-h-[40px]">
                  {product.title}
                </h3>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-zinc-50">
                  <span className="font-bold text-foreground text-base">
                    ₦{formatNaira(product.price, product.isLocal)}
                  </span>

                  <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 hover:bg-black hover:text-white transition-colors">
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}