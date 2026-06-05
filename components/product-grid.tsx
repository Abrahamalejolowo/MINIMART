'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  rating: number
  reviews: number
}

interface ProductGridProps {
  products: Product[]
  onAddToCart: (product: Product) => void
}

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex h-96 flex-col items-center justify-center rounded-lg bg-gray-50">
        <p className="text-lg text-gray-500">No products found</p>
        <p className="text-sm text-gray-400">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.id}`}
          className="group"
        >
          <div className="relative overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md">
            {/* Image */}
            <div className="relative h-64 w-full overflow-hidden bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <button className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-md transition-colors hover:bg-gray-100">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-xs font-medium uppercase text-green">
                {product.category}
              </p>
              <h3 className="mt-2 line-clamp-2 font-heading font-light text-foreground">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="mt-2 flex items-center gap-1">
                <span className="text-sm">
                  {'⭐'.repeat(Math.floor(product.rating))}
                </span>
                <span className="text-xs text-gray-500">
                  ({product.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="mt-3 flex items-center justify-between">
                <p className="font-heading text-lg font-bold text-green">
                  ₦{product.price.toLocaleString()}
                </p>
              </div>

              {/* Add to cart */}
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  onAddToCart(product)
                }}
                className="mt-3 w-full gap-2 bg-green-600 text-white hover:bg-green-700"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
