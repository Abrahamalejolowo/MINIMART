'use client'

import Image from 'next/image'
import Link from 'next/link'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'

export default function CartPage() {
  // Destructure mutation methods from context pipeline
  const { cartItems = [], updateQuantity, removeItem } = useCart()

  // Guard values safely against initial client-side loading flashes
  const itemsList = cartItems || []

  const subtotal = itemsList.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0)
  const shipping = subtotal > 50000 || subtotal === 0 ? 0 : 1000
  const tax = Math.round(subtotal * 0.075)
  const total = subtotal + shipping + tax

  return (
    <div className="flex min-h-screen flex-col bg-gray-50/50">
      <Navbar />
      <main className="flex-1">
        
        {/* Header Section */}
        <div className="border-b border-gray-200 bg-white py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Shopping Cart
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              You have {itemsList.length} item{itemsList.length !== 1 ? 's' : ''} stored inside your current session
            </p>
          </div>
        </div>

        {/* Dynamic Cart Canvas Layout Container */}
        {itemsList.length === 0 ? (
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-16 px-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-500 mb-4">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <p className="text-xl font-bold text-gray-900">Your basket looks completely empty</p>
              <p className="mt-1 text-sm text-gray-500 max-w-xs">Explore our curated collections to load up on local boutique goods.</p>
              <Link href="/shop">
                <Button className="mt-6 bg-green-500 text-white hover:bg-green-600 rounded-xl px-6 py-5 font-semibold transition-all">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3 items-start">
              
              {/* Left Column: Cart Items Iteration List */}
              <div className="lg:col-span-2 space-y-4">
                {itemsList.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition-all hover:shadow-sm items-center"
                  >
                    {/* Product Image Link Container */}
                    <Link href={`/product/${item.id}`} className="flex-shrink-0">
                      <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                        <Image
                          src={item.image || "/placeholder.jpeg"}
                          alt={item.name || "Product Item"}
                          fill
                          className="object-contain p-2 mix-blend-multiply"
                        />
                      </div>
                    </Link>

                    {/* Meta Info Context Frame */}
                    <div className="flex flex-1 flex-col justify-between self-stretch py-1">
                      <div>
                        <Link href={`/product/${item.id}`}>
                          <h3 className="font-bold text-gray-900 text-sm hover:text-green-600 transition-colors line-clamp-1">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-base font-black text-green-600 mt-1">
                          ₦{(item.price || 0).toLocaleString()}
                        </p>
                      </div>

                      {/* Control Panel Counter Row */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50/50 p-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                            className="p-1.5 rounded-lg text-gray-500 hover:bg-white hover:text-gray-900 transition-all"
                          >
                            <Minus className="h-3.5 w-3.5 stroke-[2.5px]" />
                          </button>
                          <span className="w-8 text-center text-xs font-black text-gray-900">
                            {item.quantity || 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            className="p-1.5 rounded-lg text-gray-500 hover:bg-white hover:text-gray-900 transition-all"
                          >
                            <Plus className="h-3.5 w-3.5 stroke-[2.5px]" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 p-1.5 rounded-xl hover:bg-red-50 transition-colors"
                        >
                          <X className="h-4 w-4 stroke-[2.5px]" />
                        </button>
                      </div>
                    </div>

                    {/* Individual Line item Sum Value Calculations */}
                    <div className="flex flex-col items-end justify-center min-w-[100px] text-right self-center pr-2">
                      <p className="text-base font-black text-gray-900">
                        ₦{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Dynamic Order Calculation Sidebar Panel */}
              <div className="lg:col-span-1">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs position:sticky top-24">
                  <h2 className="text-base font-black text-gray-900 tracking-tight">
                    Order Summary
                  </h2>

                  <div className="mt-6 space-y-4 border-b border-gray-100 pb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">Subtotal</span>
                      <span className="font-bold text-gray-900">
                        ₦{subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">Shipping</span>
                      <span className="font-bold">
                        {shipping === 0 ? (
                          <span className="text-green-600 font-extrabold tracking-wide text-xs bg-green-50 px-2 py-0.5 rounded-md">FREE</span>
                        ) : (
                          <span className="text-gray-900">₦{shipping.toLocaleString()}</span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">VAT (7.5%)</span>
                      <span className="font-bold text-gray-900">
                        ₦{tax.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-baseline">
                    <p className="text-sm font-bold text-gray-900">Total Price</p>
                    <p className="text-2xl font-black text-green-600 tracking-tight">
                      ₦{total.toLocaleString()}
                    </p>
                  </div>

                  {subtotal > 50000 && (
                    <div className="mt-4 rounded-xl bg-green-50 border border-green-100 p-3">
                      <p className="text-xs font-bold text-green-700 text-center">
                        🎉 Free delivery active over ₦50,000 threshold
                      </p>
                    </div>
                  )}

                  <Link href="/checkout" className="block mt-6">
                    <Button className="w-full bg-green-600 text-white hover:bg-green-700 py-6 text-sm font-bold rounded-xl shadow-md shadow-green-600/10 active:scale-[0.98] transition-all">
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <Link href="/shop" className="block mt-2">
                    <Button
                      variant="outline"
                      className="w-full py-6 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 rounded-xl text-xs uppercase tracking-wider"
                    >
                      Browse More Products
                    </Button>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}