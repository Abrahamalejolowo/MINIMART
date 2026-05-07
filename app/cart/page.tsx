'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Minus, Plus } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Organic Pure Shea Butter',
      price: 4500,
      quantity: 2,
      image: '/images/product-shea-butter.jpg',
    },
    {
      id: '2',
      name: 'Hand-woven Aso-Oke Fabric',
      price: 12500,
      quantity: 1,
      image: '/images/product-aso-oke.jpg',
    },
    {
      id: '4',
      name: 'Classic Coral Bead Set',
      price: 18500,
      quantity: 1,
      image: '/images/product-coral-beads.jpg',
    },
  ])

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50000 ? 0 : 1000
  const tax = Math.round(subtotal * 0.075) // 7.5% tax
  const total = subtotal + shipping + tax

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl font-bold text-foreground">
              Shopping Cart
            </h1>
            <p className="mt-2 text-gray-600">
              You have {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
            </p>
          </div>
        </div>

        {/* Cart Content */}
        {cartItems.length === 0 ? (
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 py-12">
              <p className="text-2xl font-light text-gray-600">Your cart is empty</p>
              <p className="mt-2 text-gray-500">Add some products to get started</p>
              <Link href="/shop">
                <Button className="mt-6 bg-green text-white hover:bg-green/90">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
                  >
                    {/* Product Image */}
                    <Link href={`/product/${item.id}`} className="flex-shrink-0">
                      <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>

                    {/* Product Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link href={`/product/${item.id}`}>
                          <h3 className="font-heading font-light text-foreground hover:text-green">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-lg font-bold text-green">
                          ₦{item.price.toLocaleString()}
                        </p>
                      </div>

                      {/* Quantity & Remove */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-lg border border-gray-300">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.id, parseInt(e.target.value) || 1)
                            }
                            className="w-12 border-none text-center text-sm font-light"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 transition-colors hover:text-red-700"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="flex flex-col items-end justify-between">
                      <p className="font-heading text-xl font-bold text-foreground">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <h2 className="font-heading text-lg font-bold text-foreground">
                    Order Summary
                  </h2>

                  <div className="mt-6 space-y-4 border-b border-gray-200 pb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-light text-foreground">
                        ₦{subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-light text-foreground">
                        {shipping === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          `₦${shipping.toLocaleString()}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax (7.5%)</span>
                      <span className="font-light text-foreground">
                        ₦{tax.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between">
                    <p className="font-heading text-lg font-bold text-foreground">Total</p>
                    <p className="font-heading text-2xl font-bold text-green">
                      ₦{total.toLocaleString()}
                    </p>
                  </div>

                  {subtotal > 50000 && (
                    <div className="mt-4 rounded-lg bg-green-50 p-3">
                      <p className="text-xs font-light text-green-700">
                        ✓ Free shipping on orders over ₦50,000
                      </p>
                    </div>
                  )}

                  <Link href="/checkout">
                    <Button className="mt-6 w-full bg-green py-3 text-white hover:bg-green/90">
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <Link href="/shop">
                    <Button
                      variant="outline"
                      className="mt-3 w-full py-3"
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                {/* Promo Code */}
                <div className="mt-6">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
                  />
                  <Button
                    variant="outline"
                    className="mt-2 w-full py-2"
                  >
                    Apply Code
                  </Button>
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
