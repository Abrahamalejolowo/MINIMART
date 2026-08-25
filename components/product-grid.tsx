'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Heart, Star, PackageSearch } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating?: number
  reviews?: number
  isWishlisted?: boolean
  inStock?: boolean
}

interface ProductGridProps {
  products: Product[]
  onAddToCart: (product: Product) => void
  onToggleWishlist?: (product: Product) => void
}

export function ProductGrid({
  products,
  onAddToCart,
  onToggleWishlist,
}: ProductGridProps) {
  // Local wishlist state fallback if not managed globally
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({})

  const handleWishlistClick = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()

    setWishlist((prev) => ({
      ...prev,
      [product.id]: !(prev[product.id] ?? product.isWishlisted),
    }))

    onToggleWishlist?.(product)
  }

  const handleAddToCartClick = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    onAddToCart(product)
  }

  if (products.length === 0) {
    return (
      <div className="flex h-96 flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/50 p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <PackageSearch className="h-8 w-8" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">No products found</h3>
        <p className="mt-1 text-sm text-gray-500">
          Try adjusting your search or filters to find what you&apos;re looking for.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-3">
      {products.map((product) => {
        const isLiked = wishlist[product.id] ?? product.isWishlisted
        const discountPercentage = product.originalPrice
          ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
          : null

        return (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <div>
              {/* Image Container */}
              <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Badges */}
                <div className="absolute left-3 top-3 flex flex-col gap-1">
                  {discountPercentage && (
                    <span className="rounded-full bg-red-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
                      -{discountPercentage}%
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={(e) => handleWishlistClick(e, product)}
                  aria-label="Add to wishlist"
                  className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-gray-600 shadow-xs backdrop-blur-xs transition-all hover:bg-white hover:text-red-500 hover:scale-110 active:scale-95"
                >
                  <Heart
                    className={`h-4 w-4 transition-colors ${
                      isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600">
                  {product.category}
                </p>

                <h3 className="mt-1 line-clamp-2 text-sm font-medium text-gray-900  transition-colors">
                  {product.name}
                </h3>

                {/* Rating & Reviews */}
                {product.rating !== undefined && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                    <div className="flex items-center text-amber-400">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span className="ml-1 font-semibold text-gray-700">
                        {product.rating.toFixed(1)}
                      </span>
                    </div>
                    {product.reviews !== undefined && (
                      <span className="text-gray-400">({product.reviews})</span>
                    )}
                  </div>
                )}

                {/* Pricing */}
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-base font-bold text-gray-900">
                    ₦{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      ₦{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="p-4 pt-0">
              <Button
                onClick={(e) => handleAddToCartClick(e, product)}
                className="w-full gap-2 bg-green-500 text-white hover:bg-green-600 active:scale-[0.98] transition-all"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </Link>
        )
      })}
    </div>
  )
}