'use client'

import { useState, useMemo } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'
import { Check, Lock } from 'lucide-react'

type StepType = 'shipping' | 'payment' | 'confirmation'

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<StepType>('shipping')
  const [isProcessing, setIsProcessing] = useState(false)
  
  // FIXED: Hooked into cartItems from global context and safely aliased it to 'cart'
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

  // Dynamic calculations utilizing your real cart state
  const subtotal = useMemo(() => {
    const list = cart || []
    return list.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0)
  }, [cart])

  const shippingCost = shippingData.shippingMethod === 'express' ? 3000 : 1000
  const tax = Math.round(subtotal * 0.075)
  const total = subtotal + shippingCost + tax

  // Calculated estimated delivery formatting
  const formattedDeliveryDate = useMemo(() => {
    const deliveryDays = shippingData.shippingMethod === 'express' ? 2 : 5
    const deliveryDate = new Date()
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays)
    return deliveryDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }, [shippingData.shippingMethod])

  const handleShippingChange = (field: string, value: string) => {
    setShippingData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePaymentChange = (field: string, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }))
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!shippingData.firstName || !shippingData.lastName || !shippingData.address || !shippingData.email || !shippingData.phone) {
      alert('Please fill in all mandatory shipping details')
      return
    }
    setCurrentStep('payment')
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!paymentData.cardNumber || !paymentData.cardHolder || !paymentData.expiryDate || !paymentData.cvv) {
      alert('Please fill in all payment details')
      return
    }
    
    setIsProcessing(true)
    // Simulate API authorization layer
    setTimeout(() => {
      setIsProcessing(false)
      setCurrentStep('confirmation')
      clearCart() // Clean the context state out upon a validated successful order placement
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50/50">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl font-bold text-gray-900">
              Checkout
            </h1>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {/* Step 1 - Shipping */}
              <div
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => currentStep !== 'confirmation' && setCurrentStep('shipping')}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-white transition-colors ${
                    currentStep === 'shipping'
                      ? 'bg-green-600'
                      : 'bg-green-500'
                  }`}
                >
                  {currentStep === 'confirmation' || currentStep === 'payment' ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    '1'
                  )}
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900">Shipping</p>
              </div>

              <div className="flex-1 mx-4 border-t-2 border-gray-200"></div>

              {/* Step 2 - Payment */}
              <div
                className={`flex flex-col items-center ${currentStep !== 'shipping' && currentStep !== 'confirmation' ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                onClick={() => currentStep === 'payment' && setCurrentStep('payment')}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-white transition-colors ${
                    currentStep === 'payment'
                      ? 'bg-green-600'
                      : currentStep === 'confirmation'
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                  }`}
                >
                  {currentStep === 'confirmation' ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    '2'
                  )}
                </div>
                <p className={`mt-2 text-sm font-medium ${currentStep !== 'shipping' ? 'text-gray-900' : 'text-gray-400'}`}>Payment</p>
              </div>

              <div className="flex-1 mx-4 border-t-2 border-gray-200"></div>

              {/* Step 3 - Confirmation */}
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-white transition-colors ${
                    currentStep === 'confirmation' ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  {currentStep === 'confirmation' ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    '3'
                  )}
                </div>
                <p className={`mt-2 text-sm font-medium ${currentStep === 'confirmation' ? 'text-gray-900' : 'text-gray-400'}`}>Confirmation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Content */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Shipping Step */}
              {currentStep === 'shipping' && (
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="mb-6 font-heading text-2xl font-bold text-gray-900">
                    Shipping Address
                  </h2>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          First Name
                        </label>
                        <input
                          type="text"
                          autoComplete="given-name"
                          value={shippingData.firstName}
                          onChange={(e) => handleShippingChange('firstName', e.target.value)}
                          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/10 text-gray-900"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Last Name
                        </label>
                        <input
                          type="text"
                          autoComplete="family-name"
                          value={shippingData.lastName}
                          onChange={(e) => handleShippingChange('lastName', e.target.value)}
                          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/10 text-gray-900"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        autoComplete="email"
                        value={shippingData.email}
                        onChange={(e) => handleShippingChange('email', e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/10 text-gray-900"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        autoComplete="tel"
                        value={shippingData.phone}
                        onChange={(e) => handleShippingChange('phone', e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/10 text-gray-900"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Street Address
                      </label>
                      <input
                        type="text"
                        autoComplete="street-address"
                        value={shippingData.address}
                        onChange={(e) => handleShippingChange('address', e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/10 text-gray-900"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <input
                          type="text"
                          value={shippingData.city}
                          onChange={(e) => handleShippingChange('city', e.target.value)}
                          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/10 text-gray-900"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          State
                        </label>
                        <input
                          type="text"
                          value={shippingData.state}
                          onChange={(e) => handleShippingChange('state', e.target.value)}
                          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/10 text-gray-900"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          autoComplete="postal-code"
                          value={shippingData.zip}
                          onChange={(e) => handleShippingChange('zip', e.target.value)}
                          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/10 text-gray-900"
                          required
                        />
                      </div>
                    </div>

                    {/* Shipping Method */}
                    <div className="mt-8 border-t border-gray-200 pt-6">
                      <h3 className="mb-4 font-heading font-bold text-gray-900">
                        Shipping Method
                      </h3>
                      <div className="space-y-3">
                        <label className={`flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-all ${shippingData.shippingMethod === 'standard' ? 'border-green-500 bg-green-50/20' : 'border-gray-200'}`}>
                          <input
                            type="radio"
                            name="shipping"
                            checked={shippingData.shippingMethod === 'standard'}
                            onChange={() => handleShippingChange('shippingMethod', 'standard')}
                            className="h-4 w-4 text-green-600 focus:ring-green-500"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              Standard Shipping (3-5 days)
                            </p>
                            <p className="text-sm text-gray-500">₦1,000</p>
                          </div>
                        </label>
                        <label className={`flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-all ${shippingData.shippingMethod === 'express' ? 'border-green-500 bg-green-50/20' : 'border-gray-200'}`}>
                          <input
                            type="radio"
                            name="shipping"
                            checked={shippingData.shippingMethod === 'express'}
                            onChange={() => handleShippingChange('shippingMethod', 'express')}
                            className="h-4 w-4 text-green-600 focus:ring-green-500"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              Express Shipping (1-2 days)
                            </p>
                            <p className="text-sm text-gray-500">₦3,000</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="mt-6 w-full bg-green-600 py-3 text-white hover:bg-green-700 transition-colors"
                    >
                      Continue to Payment
                    </Button>
                  </form>
                </div>
              )}

              {/* Payment Step */}
              {currentStep === 'payment' && (
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="mb-6 font-heading text-2xl font-bold text-gray-900">
                    Payment Information
                  </h2>
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div className="rounded-lg bg-blue-50/60 border border-blue-100 p-4">
                      <p className="flex items-center gap-2 text-sm text-blue-800">
                        <Lock className="h-4 w-4 shrink-0 text-blue-600" />
                        Your payment information is completely secure, encrypted, and safe.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Card Number
                      </label>
                      <input
                        type="text"
                        pattern="\d*"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        value={paymentData.cardNumber}
                        onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/10 text-gray-900"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        autoComplete="cc-name"
                        value={paymentData.cardHolder}
                        onChange={(e) => handlePaymentChange('cardHolder', e.target.value)}
                        placeholder="John Doe"
                        className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/10 text-gray-900"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          autoComplete="cc-exp"
                          placeholder="MM/YY"
                          value={paymentData.expiryDate}
                          onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
                          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/10 text-gray-900"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          CVV
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          autoComplete="cc-csc"
                          placeholder="•••"
                          value={paymentData.cvv}
                          onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/10 text-gray-900"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button
                        type="button"
                        onClick={() => setCurrentStep('shipping')}
                        variant="outline"
                        className="flex-1 py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={isProcessing}
                        className="flex-1 bg-green-600 py-3 text-white hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        {isProcessing ? 'Processing Transaction...' : `Pay ₦${total.toLocaleString()}`}
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Confirmation Step */}
              {currentStep === 'confirmation' && (
                <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                  <div className="mb-6 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50 border border-green-100">
                      <Check className="h-10 w-10 text-green-600" />
                    </div>
                  </div>
                  <h2 className="font-heading text-3xl font-bold text-gray-900">
                    Order Confirmed!
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Thank you for your purchase. Your order has been successfully logged.
                  </p>

                  <div className="mt-8 space-y-4 rounded-xl bg-gray-50 p-6 text-left border border-gray-100">
                    <div className="flex justify-between">
                      <p className="text-gray-500 text-sm">Order Reference:</p>
                      <p className="font-semibold text-gray-900">#MIN001234</p>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-4">
                      <p className="text-gray-500 text-sm">Expected Delivery:</p>
                      <p className="font-semibold text-gray-900">{formattedDeliveryDate}</p>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-4">
                      <p className="text-gray-500 text-sm">Real-time Tracking:</p>
                      <p className="font-semibold text-green-600">minmart.com/track/001234</p>
                    </div>
                  </div>

                  <p className="mt-6 text-sm text-gray-500">
                    A contextual receipt has been dispatched to <span className="font-medium text-gray-700">{shippingData.email || 'your email'}</span>
                  </p>

                  <Button className="mt-6 w-full bg-green-600 py-3 text-white hover:bg-green-700 transition-colors">
                    View Complete Order Log
                  </Button>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sticky top-6">
                <h3 className="mb-4 font-heading font-bold text-gray-900 text-lg">
                  Order Summary
                </h3>

                {/* Items */}
                <div className="space-y-4 border-b border-gray-200 pb-4 max-h-[320px] overflow-y-auto pr-1">
                  {(!cart || cart.length === 0) && currentStep !== 'confirmation' ? (
                    <p className="text-sm text-gray-400 py-2">Your shopping basket is empty</p>
                  ) : (
                    (cart || []).map((item) => (
                      <div key={item.id} className="flex justify-between text-sm items-start gap-4">
                        <span className="text-gray-600 font-light">
                          {item.name} <span className="text-gray-400 font-normal">x{item.quantity || 1}</span>
                        </span>
                        <span className="font-medium text-gray-900 shrink-0">
                          ₦{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                {/* Totals */}
                <div className="mt-4 space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium text-gray-900">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-medium text-gray-900">₦{shippingCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">VAT Tax (7.5%)</span>
                    <span className="font-medium text-gray-900">₦{tax.toLocaleString()}</span>
                  </div>
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-baseline">
                      <p className="font-heading font-bold text-gray-900">Total Due</p>
                      <p className="font-heading text-2xl font-black text-green-600">
                        ₦{total.toLocaleString()}
                      </p>
                    </div>
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