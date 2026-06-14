"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation" // Imported router hook
import { Heart, ShoppingCart, X, ArrowRight } from "lucide-react"
import { useCart } from "@/context/CartContext"

// IMPORTING FROM YOUR CENTRAL DATABASE FILE
import { marketplaceDatabase } from "../database/page"

interface Product {
  id: string | number
  title: string
  price: number
  image: string
  category: string
  description?: string 
  isLocal?: boolean
}

function formatNaira(amount: number, isLocal?: boolean) {
  const finalAmount = isLocal ? amount : amount * 1000
  return new Intl.NumberFormat("en-NG").format(finalAmount)
}

export function LatestArrivalsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter() 
  

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  

  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const formattedLocalProducts = marketplaceDatabase.map((p) => ({
          id: p.id,
          title: p.title,
          price: p.price,
          image: p.image,
          category: p.category,
          description: (p as any).description || "Authentic curated product premium item sourcing available locally at Minmart hub endpoints.",
          isLocal: true,
        }))

        const mixedCollection = [...formattedLocalProducts]
        const shuffledCollection = mixedCollection.sort(() => 0.5 - Math.random())

        setProducts(shuffledCollection.slice(0, 8))
      } catch (error) {
        console.error("Error fetching products:", error)
        setProducts(
          marketplaceDatabase.slice(0, 8).map((p) => ({ 
            ...p, 
            isLocal: true,
            description: (p as any).description || "Authentic curated product premium item sourcing available locally at Minmart hub endpoints."
          }))
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Navigation handler that closes modal and redirects to marketplace with matching casing category filter
  const handleSeeMoreClick = (category: string) => {
    setSelectedProduct(null)
    router.push(`/shop?category=${encodeURIComponent(category.trim())}`)
  }

  if (loading) {
    return (
      <section className="py-16 text-center text-muted-foreground">
        Loading latest arrivals...
      </section>
    )
  }

  return (
    <section className="bg-white py-6 md:py-10">
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
              className="group relative overflow-hidden rounded-2xl bg-background shadow-sm transition hover:shadow-md border border-zinc-100 flex flex-col justify-between cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div>
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
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); 
                    }}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-zinc-400 hover:text-green-600 shadow-xs transition-colors"
                  >
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
                </div>
              </div>

              <div className="px-4 pb-4">
                <div className="flex items-center justify-between pt-2 border-t border-zinc-50">
                  <span className="font-bold text-foreground text-base">
                    ₦{formatNaira(product.price, product.isLocal)}
                  </span>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); 
                      addToCart({
                        id: String(product.id),
                        name: product.title,
                        price: product.isLocal ? product.price : product.price * 1000,
                        image: product.image
                      });
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg  hover:bg-green-600 hover:text-white transition-colors"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DETAILED QUICK VIEW MODAL POPUP */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-xs animate-in fade-in duration-200 "
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-background p-6 shadow-[0_0_100px_rgba(0,0,0,0.45)] transition-all md:p-8 animate-in zoom-in-95 duration-200 grid md:grid-cols-2 gap-6"
            onClick={(e) => e.stopPropagation()} 
          >
            {/* CLOSE BUTTON */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {/* LEFT SIDE: PRODUCT IMAGE */}
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-50">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.title}
                fill
                className="object-cover"
              />
            </div>

            {/* RIGHT SIDE: TEXT & ACTIONS */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-green-600 font-extrabold">
                  {selectedProduct.category}
                </span>
                <h3 className="mt-2 text-xl font-bold text-foreground leading-tight">
                  {selectedProduct.title}
                </h3>
                <p className="mt-2 text-2xl font-black text-foreground">
                  ₦{formatNaira(selectedProduct.price, selectedProduct.isLocal)}
                </p>
                
                <hr className="my-4 border-zinc-100" />
                
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Product Details</h4>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* NEW ACTION: SEE MORE PRODUCTS LINK */}
                <button
                  onClick={() => handleSeeMoreClick(selectedProduct.category)}
                  className="mt-4 flex items-center gap-1 text-xs text-green-600 font-bold hover:text-green-700 transition-colors"
                >
                  See more products like this <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              {/* MODAL ACTION BUTTONS */}
              <div className="mt-6 flex gap-3">
                <button 
                  onClick={() => {
                    addToCart({
                      id: String(selectedProduct.id),
                      name: selectedProduct.title,
                      price: selectedProduct.isLocal ? selectedProduct.price : selectedProduct.price * 1000,
                      image: selectedProduct.image
                    });
                    setSelectedProduct(null); 
                  }}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 shadow-sm transition-colors"
                >
                  <ShoppingCart className="h-4 w-4" /> Add To Cart
                </button>
                <button className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 text-zinc-400 hover:text-red-500 hover:bg-zinc-50 transition-all">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}