'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const FREE_SHIPPING_THRESHOLD = 50000 // ₦50,000

export default function CartPage() {
  const { cartItems = [], updateQuantity, removeItem, clearCart } = useCart()

  // Safe fallback list for hydration
  const itemsList = cartItems || []
  const router = useRouter()
  const { data: session, status } = useSession()

  // Mathematical calculations
  const subtotal = itemsList.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  )

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0
  const shipping = isFreeShipping ? 0 : 1500
  const tax = Math.round(subtotal * 0.075) // 7.5% VAT
  const total = subtotal + shipping + tax

  // Free shipping progress calculation
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100))
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  
  const formatNaira = (val: number) => `₦${val.toLocaleString()}`

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFBFB] font-sans text-gray-900 antialiased">
      <Navbar />

      <main className="flex-1 pb-20 pt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* HEADER SECTION */}
          <div className="mb-8 flex flex-col justify-between gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-green-700">
                  <ShoppingBag className="h-3.5 w-3.5" /> Checkout Express
                </span>
              </div>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                Shopping Cart
              </h1>
              <p className="mt-1 text-sm font-medium text-gray-500">
                {itemsList.length === 0
                  ? 'Your bag is empty'
                  : `You have ${itemsList.length} distinct item${itemsList.length > 1 ? 's' : ''} in your cart`}
              </p>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-bold text-green-600 hover:text-green-600 hover:underline transition-all"
            >
              <ArrowLeft className="h-4 w-4" /> Continue Shopping
            </Link>
          </div>

          {/* EMPTY CART STATE */}
          {itemsList.length === 0 ? (
            <div className="mx-auto max-w-xl py-12">
              <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200/80 bg-white p-8 sm:p-12 text-center shadow-xs">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-600 text-green-600 ring-8 ring-green-600">
                  <ShoppingBag className="h-10 w-10 stroke-[1.75]" />
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900">Your basket is empty</h2>
                <p className="mt-2 text-sm text-gray-500 max-w-sm leading-relaxed">
                  Discover top-rated products and local marketplace goods waiting for you in our store.
                </p>
                <Link href="/shop" className="mt-8 w-full sm:w-auto">
                  <Button className="w-full sm:w-auto rounded-xl bg-green-600 px-8 py-6 text-sm font-bold text-white shadow-lg shadow-green-600 hover:bg-emerald-700 active:scale-95 transition-all">
                    Explore Marketplace <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            /* ACTIVE CART GRID */
            <div className="grid items-start gap-8 lg:grid-cols-12">
              
              {/* LEFT COLUMN: PRODUCTS & TRUST BADGES */}
              <div className="space-y-6 lg:col-span-7 xl:col-span-8">
                
                {/* FREE SHIPPING PROGRESS BAR */}
                <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-800">
                    <span className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-green-600" />
                      {isFreeShipping ? (
                        <span className="flex items-center gap-1.5 font-extrabold text-green-600">
                          <Sparkles className="h-4 w-4" /> Unlocked FREE Delivery
                        </span>
                      ) : (
                        <span>
                          Add <strong className="text-gray-900">{formatNaira(remainingForFreeShipping)}</strong> more to get <strong className="text-green-600">Free Shipping</strong>
                        </span>
                      )}
                    </span>
                    <span className="text-gray-500">{progressPercent}%</span>
                  </div>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-green-600 transition-all duration-500 ease-out"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* ITEM CARDS LIST */}
                <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-xs">
                  <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                      Cart Items ({itemsList.length})
                    </h2>
                    {clearCart && (
                      <button
                        onClick={clearCart}
                        className="text-xs font-bold text-gray-400 hover:text-red-600 transition-colors"
                      >
                        Clear Cart
                      </button>
                    )}
                  </div>

                  <div className="divide-y divide-gray-100">
                    {itemsList.map((item) => {
                      const itemQuantity = item.quantity || 1
                      const itemPrice = item.price || 0
                      const itemTotal = itemPrice * itemQuantity

                      return (
                        <div
                          key={item.id}
                          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 sm:p-6 transition-colors hover:bg-gray-50/40"
                        >
                          {/* Thumbnail */}
                          <Link href={`/product/${item.id}`} className="shrink-0">
                            <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                              <Image
                                src={item.image || "/placeholder.jpeg"}
                                alt={item.name || "Product"}
                                fill
                                sizes="96px"
                                unoptimized
                                className="object-contain p-2 mix-blend-multiply"
                              />
                            </div>
                          </Link>

                          {/* Details & Controls */}
                          <div className="flex flex-1 flex-col justify-between w-full">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <Link href={`/product/${item.id}`}>
                                  <h3 className="line-clamp-1 text-sm font-extrabold uppercase tracking-tight text-gray-900 transition-colors hover:text-green-600">
                                    {item.name}
                                  </h3>
                                </Link>
                                <p className="mt-1 text-xs text-gray-500">
                                  Price: <span className="font-semibold text-gray-700">{formatNaira(itemPrice)}</span>
                                </p>
                              </div>

                              <p className="text-base font-black text-gray-900 sm:hidden">
                                {formatNaira(itemTotal)}
                              </p>
                            </div>

                            {/* Stepper + Remove */}
                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex items-center rounded-xl border border-gray-200/80 bg-gray-50/80 p-1">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, Math.max(1, itemQuantity - 1))}
                                  className="rounded-lg p-1.5 text-gray-600 transition-all hover:bg-white hover:text-gray-900 hover:shadow-xs"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="h-3.5 w-3.5 stroke-[2.5px]" />
                                </button>
                                <span className="w-8 text-center text-xs font-black text-gray-900">
                                  {itemQuantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, itemQuantity + 1)}
                                  className="rounded-lg p-1.5 text-gray-600 transition-all hover:bg-white hover:text-gray-900 hover:shadow-xs"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="h-3.5 w-3.5 stroke-[2.5px]" />
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="inline-flex items-center gap-1 rounded-xl p-1.5 text-xs font-bold text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>

                          {/* Line Total */}
                          <div className="hidden sm:flex flex-col items-end justify-center border-l border-gray-100 pl-4 text-right min-w-[110px]">
                            <span className="text-[10px] font-bold uppercase text-gray-400">Total</span>
                            <p className="text-base font-black text-gray-900">
                              {formatNaira(itemTotal)}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* TRUST BADGES */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="flex items-center gap-3.5 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-xs">
                    <ShieldCheck className="h-6 w-6 shrink-0 text-green-600" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Encrypted Payments</h4>
                      <p className="text-[11px] text-gray-500">100% safe & verified</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-xs">
                    <Truck className="h-6 w-6 shrink-0 text-green-600" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Express Delivery</h4>
                      <p className="text-[11px] text-gray-500">Fast nationwide dispatch</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-xs">
                    <RotateCcw className="h-6 w-6 shrink-0 text-green-600" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Easy Returns</h4>
                      <p className="text-[11px] text-gray-500">Buyer protection active</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: STICKY ORDER SUMMARY */}
              <div className="lg:col-span-5 xl:col-span-4">
                <div className="sticky top-24 space-y-6">
                  <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs">
                    <h2 className="text-base font-black tracking-tight text-gray-900">
                      Order Summary
                    </h2>

                    {/* PRICE BREAKDOWN */}
                    <div className="mt-6 space-y-3.5 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span className="font-medium">Subtotal</span>
                        <span className="font-bold text-gray-900">{formatNaira(subtotal)}</span>
                      </div>

                      <div className="flex justify-between text-gray-600">
                        <span className="font-medium">Estimated Shipping</span>
                        <span className="font-bold">
                          {shipping === 0 ? (
                            <span className="rounded-md bg-emerald-100/70 px-2 py-0.5 text-xs font-extrabold uppercase text-green-600">
                              FREE
                            </span>
                          ) : (
                            <span className="text-gray-900">{formatNaira(shipping)}</span>
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between text-gray-600">
                        <span className="font-medium">Estimated VAT (7.5%)</span>
                        <span className="font-bold text-gray-900">{formatNaira(tax)}</span>
                      </div>

                      <hr className="my-4 border-gray-100" />

                      <div className="flex items-baseline justify-between">
                        <span className="text-base font-extrabold text-gray-900">Total Amount</span>
                        <span className="text-2xl font-black tracking-tight text-green-600">
                          {formatNaira(total)}
                        </span>
                      </div>
                    </div>

                    {/* FREE DELIVERY STATUS */}
                    {isFreeShipping && (
                      <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50/60 p-3 text-center">
                        <p className="flex items-center justify-center gap-1.5 text-xs font-bold text-green-600">
                          <Sparkles className="h-4 w-4 text-green-600" /> Your order qualifies for free delivery!
                        </p>
                      </div>
                    )}

                    {/* ACTIONS */}
                    <Button
                      type="button"
                      onClick={handleCheckout}
                      className="mt-6 w-full rounded-xl bg-green-600 py-6 text-sm font-bold text-white shadow-md shadow-green-500 hover:bg-green-700 transition-all"
                    >
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <Link href="/shop" className="mt-3 block">
                      <Button
                        variant="outline"
                        className="w-full rounded-xl border-gray-200 py-5 text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-50"
                      >
                        Explore More Products
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}