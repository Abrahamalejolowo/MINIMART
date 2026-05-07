'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Star, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'

/* =========================
   TYPES
========================= */

type Seller = {
  name: string
  verified: boolean
  rating: number
  reviews: number
}

type Product = {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  inStock: boolean
  description: string
  features: string[]
  specs: Record<string, string>
  seller: Seller
}

/* =========================
   MOCK DATA
========================= */

const productDetails: Record<string, Product> = {
  '1': {
    id: '1',
    name: 'Organic Pure Shea Butter',
    price: 4500,
    originalPrice: 5500,
    image: '/store4.webp',
    category: 'Beauty & Skincare',
    rating: 4.8,
    reviews: 234,
    inStock: true,
    description:
      'Our 100% organic, unrefined shea butter is sourced directly from ethical producers in Nigeria. Rich in vitamins A and E, this natural moisturizer is perfect for skincare and haircare.',
    features: [
      '100% Pure & Organic',
      'Unrefined Shea Butter',
      'Rich in Vitamins A & E',
      'Natural Moisturizer',
      'Ethically Sourced',
    ],
    specs: {
      weight: '500ml',
      origin: 'Northern Nigeria',
      ingredients: 'Pure Shea Butter',
      shelf_life: '2 years',
    },
    seller: {
      name: 'Natural Beauty Hub',
      verified: true,
      rating: 4.9,
      reviews: 1200,
    },
  },
  '2': {
    id: '2',
    name: 'Hand-woven Aso-Oke Fabric',
    price: 12500,
    image: '/Store.avif',
    category: 'Fashion',
    rating: 5,
    reviews: 156,
    inStock: true,
    description:
      'Authentic hand-woven Aso-Oke fabric made by skilled artisans in Yorubaland. This premium fabric is perfect for traditional occasions and contemporary fashion. Each piece is unique.',
    features: [
      'Hand-woven by artisans',
      'Premium quality',
      'Traditional patterns',
      'Perfect for special occasions',
      'Unique designs',
    ],
    specs: {
      length: '6 yards',
      width: '2.5 yards',
      material: '100% cotton blend',
      pattern: 'Traditional Yoruba',
    },
    seller: {
      name: 'Artisan Textiles Co.',
      verified: true,
      rating: 4.95,
      reviews: 890,
    },
  },
}

/* =========================
   PAGE COMPONENT
========================= */

export default function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const product = productDetails[params.id]

  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-xl font-bold">Product not found</h1>
      </div>
    )
  }

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) /
          product.originalPrice) *
          100
      )
    : null

  const handleAddToCart = () => {
    console.log(`Added ${quantity} x ${product.name}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="grid gap-10 lg:grid-cols-2">

            {/* PRODUCT IMAGE */}
            <div className="relative overflow-hidden rounded-xl bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={600}
                priority
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* PRODUCT INFO */}
            <div className="space-y-6">

              <p className="text-sm text-gray-500">
                Home / {product.category}
              </p>

              <h1 className="text-3xl font-bold">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-light">{product.rating}</span>
                <span className="text-gray-500">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="border-y py-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-green">
                    ₦{product.price.toLocaleString()}
                  </span>

                  {product.originalPrice && (
                    <>
                      <span className="text-lg line-through text-gray-400">
                        ₦{product.originalPrice.toLocaleString()}
                      </span>
                      {discountPercentage && (
                        <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-600">
                          Save {discountPercentage}%
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Seller */}
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="font-light">
                  Sold by {product.seller.name}
                  {product.seller.verified && (
                    <span className="ml-2 text-xs text-green-600">
                      ✓ Verified
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-600">
                  ⭐ {product.seller.rating} ({product.seller.reviews} reviews)
                </p>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="font-light">Quantity:</span>
                <div className="flex items-center rounded border">
                  <button
                    onClick={() =>
                      setQuantity((prev) => Math.max(1, prev - 1))
                    }
                    className="px-3 py-2"
                  >
                    −
                  </button>
                  <span className="px-4">{quantity}</span>
                  <button
                    onClick={() =>
                      setQuantity((prev) => prev + 1)
                    }
                    className="px-3 py-2"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleAddToCart}
                  className="w-full"
                >
                  🛒 Add to Cart
                </Button>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setIsWishlisted(!isWishlisted)
                    }
                    className="flex-1"
                  >
                    <Heart
                      className="mr-2 h-4 w-4"
                      fill={isWishlisted ? 'currentColor' : 'none'}
                    />
                    Wishlist
                  </Button>

                  <Button variant="outline" className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 rounded-lg bg-gray-50 p-4 text-center text-xs font-light">
                <div>
                  <Truck className="mx-auto mb-1 h-5 w-5 text-green" />
                  Fast Delivery
                </div>
                <div>
                  <Shield className="mx-auto mb-1 h-5 w-5 text-green" />
                  Secure Payment
                </div>
                <div>
                  <RotateCcw className="mx-auto mb-1 h-5 w-5 text-green" />
                  Easy Returns
                </div>
              </div>
            </div>
          </div>

          {/* DETAILS SECTION */}
          <div className="mt-14">
            <h2 className="text-2xl font-bold">Product Details</h2>
            <p className="mt-4 text-gray-600">
              {product.description}
            </p>

            <h3 className="mt-8 text-lg font-bold">
              Key Features
            </h3>
            <ul className="mt-3 space-y-2">
              {product.features.map((feature, i) => (
                <li key={i} className="text-gray-600">
                  • {feature}
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-lg font-bold">
              Specifications
            </h3>
            <div className="mt-4 space-y-2">
              {Object.entries(product.specs).map(
                ([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between border-b py-2"
                  >
                    <span className="capitalize text-gray-600">
                      {key.replace('_', ' ')}
                    </span>
                    <span className="font-light">
                      {value}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
