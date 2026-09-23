'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'
import { 
  Check, 
  Lock, 
  Truck, 
  CreditCard, 
  ArrowLeft, 
  ShoppingBag,
  Package,
  Loader2,
  Building2,
  Smartphone,
  ShieldCheck
} from 'lucide-react'

type StepType = 'shipping' | 'payment' | 'confirmation'

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<StepType>('shipping')
  const [isProcessing, setIsProcessing] = useState(false)

  const { cartItems: cart = [], clearCart } = useCart()
  const [orderSnapshot, setOrderSnapshot] = useState<typeof cart>([])

  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    shippingMethod: 'standard',
  })

  const activeCart = currentStep === 'confirmation' ? orderSnapshot : cart

  const subtotal = useMemo(() => {
    return activeCart.reduce((sum: number, item: any) => sum + (item.price || 0) * (item.quantity || 1), 0)
  }, [activeCart])

  const shippingCost = shippingData.shippingMethod === 'express' ? 3000 : 1000
  const tax = Math.round(subtotal * 0.075)
  const total = subtotal + shippingCost + tax

  const publicKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || ''

   // Flutterwave Config setup
  const flutterwaveConfig = {
    public_key: publicKey,
    tx_ref: `MIN_ORD_${Date.now()}`,
    amount: total,
    currency: 'NGN',
    payment_options: 'card,banktransfer,ussd,account',
    customer: {
      email: shippingData.email,
      phone_number: shippingData.phone,
      name: `${shippingData.firstName} ${shippingData.lastName}`,
    },
    // 🆕 NEW - Meta field with cart items and images
    meta: {
      items: JSON.stringify(
        cart.map((item: any) => ({
          id: item.id,
          name: item.name || item.title,
          price: item.price,
          quantity: item.quantity || 1,
          image: item.image || '', // 🖼️ INCLUDE IMAGE!
        }))
      ),
      address: JSON.stringify({
        address_line1: shippingData.address,
        address_line2: '',
        city: shippingData.city,
        state: shippingData.state,
        country: 'Nigeria',
        postal_code: shippingData.zip || '',
      }),
    },
    customizations: {
      title: 'Minmart Store',
      description: 'Payment for order items',
      logo: 'https://minmart.com/logo.png',
    },
  }

  const handleFlutterwavePayment = useFlutterwave(flutterwaveConfig)

  const handleShippingChange = (field: string, value: string) => {
    setShippingData((prev) => ({ ...prev, [field]: value }))
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!shippingData.firstName || !shippingData.lastName || !shippingData.address || !shippingData.email || !shippingData.phone) {
      alert('Please complete all required shipping fields')
      return
    }
    setCurrentStep('payment')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const saveOrderToDatabase = async (txRef: string) => {
    try {
      console.log('💾 Saving order with cart items including images...')
      
      const orderPayload = {
        tx_ref: txRef,
        shippingData,
        cart: activeCart.map((item: any) => ({
          id: item.id,
          name: item.name || item.title,
          price: item.price,
          quantity: item.quantity || 1,
          image: item.image || '',
        })),
        total,
        paymentStatus: 'paid',
      }

      console.log(' Order payload with images:', orderPayload)

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      })

      const data = await response.json()
      console.log('Order saved response:', data)
    } catch (error) {
      console.error('Failed to persist order to database:', error)
    }
  }

  const triggerPayment = (e: React.FormEvent) => {
    e.preventDefault()

    if (!publicKey) {
      alert("Missing NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY in .env.local")
      return
    }

    setIsProcessing(true)
    setOrderSnapshot([...cart])

    handleFlutterwavePayment({
      callback: async (response) => {
        if (response.status === 'successful' || response.status === 'completed') {
          await saveOrderToDatabase(response.tx_ref)
          setCurrentStep('confirmation')
          clearCart()
        } else {
          alert('Payment was not completed. Please try again.')
        }
        closePaymentModal()
        setIsProcessing(false)
      },
      onClose: () => {
        setIsProcessing(false)
      },
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50 antialiased">
      <Navbar />

      <main className="flex-1 pb-20 pt-4 sm:pt-6">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">

          {/* Stepper Steps Bar */}
          <div className="mb-6 sm:mb-8 rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">Checkout</h1>
                <p className="mt-0.5 text-xs sm:text-sm text-slate-500">Secure transaction powered by Flutterwave.</p>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <span className={`px-2.5 py-1 rounded-full ${currentStep === 'shipping' ? 'bg-green-500 text-white font-semibold' : 'bg-slate-100 text-slate-600'}`}>
                  1. Shipping
                </span>
                <span className="text-slate-300">➔</span>
                <span className={`px-2.5 py-1 rounded-full ${currentStep === 'payment' ? 'bg-green-500 text-white font-semibold' : 'bg-slate-100 text-slate-600'}`}>
                  2. Payment
                </span>
                <span className="text-slate-300">➔</span>
                <span className={`px-2.5 py-1 rounded-full ${currentStep === 'confirmation' ? 'bg-green-500 text-white font-semibold' : 'bg-slate-100 text-slate-600'}`}>
                  3. Confirm
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100/80 self-start md:self-auto">
                <Lock className="h-3.5 w-3.5" /> 256-Bit SSL Encrypted
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 items-start">
            <div className="lg:col-span-7 xl:col-span-8">

              {/* Step 1: Shipping */}
              {currentStep === 'shipping' && (
                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 lg:p-8 shadow-sm">
                  <div className="mb-5 sm:mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                    <Truck className="h-5 w-5 text-green-500" />
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">Shipping Details</h2>
                  </div>

                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">First Name *</label>
                        <input
                          type="text"
                          placeholder="John"
                          value={shippingData.firstName}
                          onChange={(e) => handleShippingChange('firstName', e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name *</label>
                        <input
                          type="text"
                          placeholder="Doe"
                          value={shippingData.lastName}
                          onChange={(e) => handleShippingChange('lastName', e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                        <input
                          type="email"
                          placeholder="john@example.com"
                          value={shippingData.email}
                          onChange={(e) => handleShippingChange('email', e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          placeholder="08012345678"
                          value={shippingData.phone}
                          onChange={(e) => handleShippingChange('phone', e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Street Address *</label>
                      <input
                        type="text"
                        placeholder="House / Flat Number, Street Name"
                        value={shippingData.address}
                        onChange={(e) => handleShippingChange('address', e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">City *</label>
                        <input
                          type="text"
                          placeholder="Ikeja"
                          value={shippingData.city}
                          onChange={(e) => handleShippingChange('city', e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">State *</label>
                        <input
                          type="text"
                          placeholder="Lagos"
                          value={shippingData.state}
                          onChange={(e) => handleShippingChange('state', e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">ZIP / Postal Code</label>
                        <input
                          type="text"
                          placeholder="100001"
                          value={shippingData.zip}
                          onChange={(e) => handleShippingChange('zip', e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Delivery Options */}
                    <div className="pt-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-2">Delivery Method</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <label
                          onClick={() => handleShippingChange('shippingMethod', 'standard')}
                          className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 text-xs font-medium transition-all ${
                            shippingData.shippingMethod === 'standard'
                              ? 'border-green-500 bg-emerald-50/50 text-emerald-950 ring-1 ring-green-500'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div>
                            <p className="font-bold">Standard Delivery</p>
                            <p className="text-[11px] text-slate-500">2 - 4 Business Days</p>
                          </div>
                          <span className="font-extrabold text-emerald-700">₦1,000</span>
                        </label>

                        <label
                          onClick={() => handleShippingChange('shippingMethod', 'express')}
                          className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 text-xs font-medium transition-all ${
                            shippingData.shippingMethod === 'express'
                              ? 'border-green-500 bg-emerald-50/50 text-emerald-950 ring-1 ring-green-500'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div>
                            <p className="font-bold">Express Delivery</p>
                            <p className="text-[11px] text-slate-500">24 Hours Express</p>
                          </div>
                          <span className="font-extrabold text-emerald-700">₦3,000</span>
                        </label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="mt-6 w-full rounded-xl bg-green-500 py-4 font-semibold text-white hover:bg-green-600 active:bg-emerald-800 transition-all shadow-md shadow-green-500/10"
                    >
                      Continue to Payment Method
                    </Button>
                  </form>
                </div>
              )}

              {/* Step 2: Payment Trigger */}
              {currentStep === 'payment' && (
                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 lg:p-8 shadow-sm">
                  <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
                    <CreditCard className="h-5 w-5 text-green-500" />
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900">Select Payment Gateway Option</h2>
                      <p className="text-xs text-slate-500">You will be redirected to Flutterwave's secure checkout portal to complete payment.</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4 sm:p-5 space-y-3">
                    <p className="text-xs font-semibold text-slate-800">Supported Payment Options:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center text-xs font-medium text-slate-700">
                      <div className="rounded-lg bg-white p-3 border border-slate-200/60 shadow-xs flex items-center justify-center gap-1.5">
                        <Building2 className="h-4 w-4 text-green-500" /> Bank Transfer
                      </div>
                      <div className="rounded-lg bg-white p-3 border border-slate-200/60 shadow-xs flex items-center justify-center gap-1.5">
                        <CreditCard className="h-4 w-4 text-green-500" /> Card Payment
                      </div>
                      <div className="rounded-lg bg-white p-3 border border-slate-200/60 shadow-xs flex items-center justify-center gap-1.5">
                        <Smartphone className="h-4 w-4 text-green-500" /> USSD Code
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-6">
                    <Button
                      type="button"
                      onClick={() => setCurrentStep('shipping')}
                      variant="outline"
                      className="w-full sm:w-auto rounded-xl border-slate-200 px-5 text-slate-700 hover:bg-slate-50"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" /> Back
                    </Button>
                    <Button
                      type="button"
                      onClick={triggerPayment}
                      disabled={isProcessing}
                      className="w-full sm:flex-1 rounded-xl bg-green-500 py-3.5 font-semibold text-white hover:bg-green-600 active:bg-emerald-800 transition-all shadow-md shadow-green-500/20"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" /> Opening Payment Portal...
                        </>
                      ) : (
                        `Pay ₦${total.toLocaleString()} with Flutterwave`
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {currentStep === 'confirmation' && (
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-10 text-center shadow-sm">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 border border-emerald-100">
                      <Check className="h-8 w-8 text-green-500 stroke-[3]" />
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Payment Successful!</h2>
                  <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                    Your order has been recorded. A digital receipt has been sent to <strong className="text-slate-800">{shippingData.email}</strong>.
                  </p>
                  <div className="mt-8">
                    <Link href="/">
                      <Button className="rounded-xl bg-green-500 px-8 py-3 text-white hover:bg-green-600 font-semibold shadow-md shadow-green-500/10">
                        Return to Shop
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="lg:sticky lg:top-6 rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 shadow-sm">
                <h3 className="mb-4 text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <ShoppingBag className="h-4 w-4 text-green-500" /> Order Summary
                </h3>

                <div className="max-h-[280px] space-y-3 overflow-y-auto border-b border-slate-100 pb-4 pr-1">
                  {activeCart.length > 0 ? (
                    activeCart.map((item: any) => (
                      <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <div className="relative h-10 w-10 shrink-0 rounded-lg border border-slate-200/80 bg-slate-50 overflow-hidden">
                            {item.image ? (
                              <Image src={item.image} alt={String(item?.title || item?.name || 'Product')} fill className="object-cover" />
                            ) : (
                              <Package className="h-5 w-5 m-auto text-slate-400" />
                            )}
                          </div>
                          <div className="truncate">
                            <p className="font-semibold text-slate-800 truncate">{item.title || item.name}</p>
                            <p className="text-[10px] text-slate-400">Qty: {item.quantity || 1}</p>
                          </div>
                        </div>
                        <span className="font-semibold text-slate-900 shrink-0">
                          ₦{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 text-center py-4">Your cart is empty</p>
                  )}
                </div>

                <div className="space-y-2.5 pt-4 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal</span>
                    <span className="font-medium text-slate-700">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Shipping ({shippingData.shippingMethod})</span>
                    <span className="font-medium text-slate-700">₦{shippingCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>VAT (7.5%)</span>
                    <span className="font-medium text-slate-700">₦{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 pt-3 text-sm font-bold text-slate-900">
                    <span>Total</span>
                    <span className="text-green-500 text-base">₦{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 border-t border-slate-100 pt-3">
                  <ShieldCheck className="h-3.5 w-3.5 text-green-500" /> Buyer Protection Guaranteed
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}