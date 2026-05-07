"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Heart, ShoppingCart } from "lucide-react"

interface Product {
  id: number
  title: string
  price: number
  image: string
  category: string
}

function formatNaira(amount: number) {
  return new Intl.NumberFormat("en-NG").format(amount * 1000)
}

export function LatestArrivalsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // FETCH FROM API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://fakestoreapi.com/products?limit=8"
        )
        const data = await res.json()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
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
              className="group overflow-hidden rounded-2xl bg-background shadow-sm transition hover:shadow-md"
            >

              {/* IMAGE */}
              <div className="relative aspect-square bg-white overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />

                {/* WISHLIST */}
                <button
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:text-green-600"
                >
                  <Heart className="h-4 w-4" />
                </button>
              </div>

              {/* INFO */}
              <div className="p-4">

                <span className="text-[11px] uppercase tracking-wider text-green-600 font-bold">
                  {product.category}
                </span>

                <h3 className="mt-1 text-sm font-light text-foreground line-clamp-2">
                  {product.title}
                </h3>

                <div className="mt-3 flex items-center justify-between">

                  <span className="font-bold text-foreground">
                    ₦{formatNaira(product.price)}
                  </span>

                  <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 hover:bg-black hover:text-white transition">
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