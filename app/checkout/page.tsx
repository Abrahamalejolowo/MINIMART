'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'
import { 
  Check, 
  Lock, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  ArrowLeft, 
  ShoppingBag,
  Package,
  Calendar,
  Sparkles,
  ChevronRight,
  Loader2,
  BadgeCheck
} from 'lucide-react'

type StepType = 'shipping' | 'payment' | 'confirmation'

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<StepType>('shipping')
  const [isProcessing, setIsProcessing] = useState(false)
  
  const { cartItems: cart = [], clearCart } = useCart()

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

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  })

  const subtotal = useMemo(() => {
    const list = cart || []
    return list.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0)
  }, [cart])

  const shippingCost = shippingData.shippingMethod === 'express' ? 3000 : 1000
  const tax = Math.round(subtotal * 0.075)
  const total = subtotal + shippingCost + tax

  const formattedDeliveryDate = useMemo(() => {
    const deliveryDays = shippingData.shippingMethod === 'express' ? 2 : 5
    const deliveryDate = new Date()
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays)
    return deliveryDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }, [shippingData.shippingMethod])

  const handleShippingChange = (field: string, value: string) => {
    setShippingData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePaymentChange = (field: string, value: string) => {
    let formattedValue = value
    
    // Auto-format Card Number with spaces
    if (field === 'cardNumber') {
      formattedValue = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)
    }
    // Auto-format Expiry Date with slash
    else if (field === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/^(\d{2})(\d)/, '$1/$2').slice(0, 5)
    }

    setPaymentData((prev) => ({ ...prev, [field]: formattedValue }))
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!shippingData.firstName || !shippingData.lastName || !shippingData.address || !shippingData.email || !shippingData.phone) {
      alert('Please fill in all mandatory shipping details')
      return
    }
    setCurrentStep('payment')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!paymentData.cardNumber || !paymentData.cardHolder || !paymentData.expiryDate || !paymentData.cvv) {
      alert('Please fill in all payment details')
      return
    }
    
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setCurrentStep('confirmation')
      clearCart()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 1500)
  }

  const steps = [
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'confirmation', label: 'Confirmation', icon: BadgeCheck },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50 antialiased">
      <Navbar />
      
      <main className="flex-1 pb-20 pt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header & Stepper */}
          <div className="mb-10 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="mb-8 flex flex-col justify-between gap-2 md:flex-row md:items-center">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  Checkout
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Complete your order securely with end-to-end encrypted processing.
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 self-start md:self-auto">
                <Lock className="h-3.5 w-3.5" /> 256-Bit SSL Encrypted
              </div>
            </div>

            {/* Stepper Component */}
            <div className="relative flex justify-between max-w-xl mx-auto">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-slate-200 z-0" />
              <div 
                className="absolute top-1/2 left-0 h-0.5 -translate-y-1/2 bg-emerald-600 transition-all duration-300 z-0"
                style={{
                  width: currentStep === 'shipping' ? '0%' : currentStep === 'payment' ? '50%' : '100%'
                }}
              />

              {steps.map((step, idx) => {
                const Icon = step.icon
                const isDone = (currentStep === 'payment' && idx === 0) || currentStep === 'confirmation'
                const isCurrent = currentStep === step.id

                return (
                  <div key={step.id} className="relative z-10 flex flex-col items-center">
                    <button
                      type="button"
                      disabled={currentStep === 'confirmation' || (idx === 1 && currentStep === 'shipping')}
                      onClick={() => setCurrentStep(step.id as StepType)}
                      className={`flex h-11 w-11 items-center justify-center rounded-full font-bold transition-all duration-200 ${
                        isDone
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                          : isCurrent
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 shadow-md'
                          : 'bg-white border-2 border-slate-200 text-slate-400'
                      }`}
                    >
                      {isDone ? <Check className="h-5 w-5 stroke-[3]" /> : <Icon className="h-5 w-5" />}
                    </button>
                    <span className={`mt-2 text-xs font-semibold ${isCurrent || isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                      {step.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Main Content Layout */}
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            
            {/* Steps Container */}
            <div className="lg:col-span-7 xl:col-span-8">
              
              {/* Shipping Step */}
              {currentStep === 'shipping' && (
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8 transition-all">
                  <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <Truck className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Shipping Details</h2>
                      <p className="text-xs text-slate-500">Provide your contact and delivery address.</p>
                    </div>
                  </div>

                  <form onSubmit={handleShippingSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                          First Name <span className="text-emerald-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={shippingData.firstName}
                          onChange={(e) => handleShippingChange('firstName', e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition-all focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                          Last Name <span className="text-emerald-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={shippingData.lastName}
                          onChange={(e) => handleShippingChange('lastName', e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition-all focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                          Email Address <span className="text-emerald-600">*</span>
                        </label>
                        <input
                          type="email"
                          value={shippingData.email}
                          onChange={(e) => handleShippingChange('email', e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition-all focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                          Phone Number <span className="text-emerald-600">*</span>
                        </label>
                        <input
                          type="tel"
                          value={shippingData.phone}
                          onChange={(e) => handleShippingChange('phone', e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition-all focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                        Street Address <span className="text-emerald-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={shippingData.address}
                        onChange={(e) => handleShippingChange('address', e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition-all focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                          City <span className="text-emerald-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={shippingData.city}
                          onChange={(e) => handleShippingChange('city', e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 sm:px-4 py-3 text-sm text-slate-900 transition-all focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                          State <span className="text-emerald-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={shippingData.state}
                          onChange={(e) => handleShippingChange('state', e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 sm:px-4 py-3 text-sm text-slate-900 transition-all focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                          ZIP Code <span className="text-emerald-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={shippingData.zip}
                          onChange={(e) => handleShippingChange('zip', e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 sm:px-4 py-3 text-sm text-slate-900 transition-all focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                          required
                        />
                      </div>
                    </div>

                    {/* Shipping Options */}
                    <div className="pt-6 border-t border-slate-100">
                      <h3 className="text-sm font-bold text-slate-900 mb-3">
                        Shipping Method
                      </h3>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <label className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all ${
                          shippingData.shippingMethod === 'standard'
                            ? 'border-emerald-500 bg-emerald-50/30 ring-2 ring-emerald-500/20'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}>
                          <input
                            type="radio"
                            name="shipping"
                            checked={shippingData.shippingMethod === 'standard'}
                            onChange={() => handleShippingChange('shippingMethod', 'standard')}
                            className="mt-0.5 h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                          />
                          <div>
                            <p className="text-sm font-bold text-slate-900">Standard Shipping</p>
                            <p className="text-xs text-slate-500 mt-0.5">3–5 Business Days</p>
                            <p className="text-sm font-semibold text-emerald-700 mt-2">₦1,000</p>
                          </div>
                        </label>

                        <label className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all ${
                          shippingData.shippingMethod === 'express'
                            ? 'border-emerald-500 bg-emerald-50/30 ring-2 ring-emerald-500/20'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}>
                          <input
                            type="radio"
                            name="shipping"
                            checked={shippingData.shippingMethod === 'express'}
                            onChange={() => handleShippingChange('shippingMethod', 'express')}
                            className="mt-0.5 h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                          />
                          <div>
                            <p className="text-sm font-bold text-slate-900">Express Delivery</p>
                            <p className="text-xs text-slate-500 mt-0.5">1–2 Business Days</p>
                            <p className="text-sm font-semibold text-emerald-700 mt-2">₦3,000</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="mt-6 w-full rounded-xl bg-emerald-600 py-4 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                    >
                      Continue to Payment <ChevronRight className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              )}

              {/* Payment Step */}
              {currentStep === 'payment' && (
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8 transition-all">
                  <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Payment Details</h2>
                      <p className="text-xs text-slate-500">Provide your payment card information.</p>
                    </div>
                  </div>

                  <form onSubmit={handlePaymentSubmit} className="space-y-5">
                    <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4 flex items-center gap-3 text-slate-700 text-xs">
                      <Lock className="h-4 w-4 shrink-0 text-emerald-600" />
                      <span>Transactions are encrypted using 256-bit security protocols.</span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                        Card Number <span className="text-emerald-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={paymentData.cardNumber}
                        onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 font-mono transition-all focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                        Cardholder Name <span className="text-emerald-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={paymentData.cardHolder}
                        onChange={(e) => handlePaymentChange('cardHolder', e.target.value)}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition-all focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                          Expiry Date <span className="text-emerald-600">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={paymentData.expiryDate}
                          onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 font-mono transition-all focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                          CVV <span className="text-emerald-600">*</span>
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="•••"
                          value={paymentData.cvv}
                          onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 font-mono transition-all focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button
                        type="button"
                        onClick={() => setCurrentStep('shipping')}
                        variant="outline"
                        className="rounded-xl border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2"
                      >
                        <ArrowLeft className="h-4 w-4" /> Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={isProcessing}
                        className="flex-1 rounded-xl bg-emerald-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" /> Processing Transaction...
                          </>
                        ) : (
                          `Pay ₦${total.toLocaleString()}`
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Confirmation Step */}
              {currentStep === 'confirmation' && (
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-sm sm:p-10 transition-all">
                  <div className="mb-6 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 border-8 border-emerald-100">
                      <Check className="h-10 w-10 text-emerald-600 stroke-[3]" />
                    </div>
                  </div>
                  
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                    <Sparkles className="h-3.5 w-3.5" /> Order Confirmed
                  </span>

                  <h2 className="mt-4 text-3xl font-extrabold text-slate-900">
                    Thank You for Your Order!
                  </h2>
                  <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
                    Your order has been logged and is currently being processed by our fulfillment team.
                  </p>

                  <div className="mt-8 space-y-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-6 text-left">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Order Reference</span>
                      <span className="font-mono font-bold text-slate-900">#MIN001234</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200/60 pt-4 text-sm">
                      <span className="flex items-center gap-2 text-slate-500">
                        <Calendar className="h-4 w-4 text-slate-400" /> Estimated Delivery
                      </span>
                      <span className="font-semibold text-slate-900">{formattedDeliveryDate}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200/60 pt-4 text-sm">
                      <span className="flex items-center gap-2 text-slate-500">
                        <Package className="h-4 w-4 text-slate-400" /> Track Shipment
                      </span>
                      <span className="font-semibold text-emerald-600 hover:underline cursor-pointer">
                        minmart.com/track/001234
                      </span>
                    </div>
                  </div>

                  <p className="mt-6 text-xs text-slate-400">
                    A order summary receipt was sent to <span className="font-medium text-slate-700">{shippingData.email || 'your email'}</span>
                  </p>

                  <Link href="/">
                    <Button 
                      className="mt-6 w-full rounded-xl bg-emerald-600 py-3.5 text-white hover:bg-emerald-700 transition-all font-semibold shadow-md shadow-emerald-600/20"
                    >
                      Return to Store
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="sticky top-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
                  <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
                    <ShoppingBag className="h-4 w-4 text-emerald-600" />
                    Order Summary
                  </h3>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    {(cart || []).length} items
                  </span>
                </div>

                {/* Cart Items List */}
                <div className="max-h-[300px] space-y-3.5 overflow-y-auto pr-1 border-b border-slate-100 pb-4">
                  {(!cart || cart.length === 0) && currentStep !== 'confirmation' ? (
                    <p className="py-4 text-center text-xs text-slate-400">Your cart is empty</p>
                  ) : (
                    (cart || []).map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                            {item.image ? (
                              <Image 
                                src={item.image} 
                                alt={item.name} 
                                fill 
                                className="object-cover" 
                              />
                            ) : (
                              <Package className="h-5 w-5 text-slate-300 m-auto mt-3" />
                            )}
                          </div>
                          <div className="truncate">
                            <p className="font-semibold text-slate-800 truncate">{item.name}</p>
                            <p className="text-slate-400 mt-0.5">Qty: {item.quantity || 1}</p>
                          </div>
                        </div>
                        <span className="shrink-0 font-bold text-slate-900">
                          ₦{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="mt-4 space-y-3 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Shipping</span>
                    <span className="font-semibold text-slate-900">₦{shippingCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>VAT Tax (7.5%)</span>
                    <span className="font-semibold text-slate-900">₦{tax.toLocaleString()}</span>
                  </div>

                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-bold text-slate-900">Total</span>
                      <span className="text-2xl font-black text-emerald-600">
                        ₦{total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                  <div className="flex items-center justify-center gap-2 text-[11px] font-medium text-slate-500">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Guaranteed Safe & Secure Checkout</span>
                  </div>
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