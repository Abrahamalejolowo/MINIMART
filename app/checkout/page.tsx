'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Check, Truck, Lock } from 'lucide-react'

type StepType = 'shipping' | 'payment' | 'confirmation'

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<StepType>('shipping')
  const [isProcessing, setIsProcessing] = useState(false)

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

  const cartItems = [
    { name: 'Organic Pure Shea Butter', quantity: 2, price: 4500, total: 9000 },
    { name: 'Hand-woven Aso-Oke Fabric', quantity: 1, price: 12500, total: 12500 },
    { name: 'Classic Coral Bead Set', quantity: 1, price: 18500, total: 18500 },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0)
  const shippingCost = shippingData.shippingMethod === 'express' ? 3000 : 1000
  const tax = Math.round(subtotal * 0.075)
  const total = subtotal + shippingCost + tax

  const handleShippingChange = (field: string, value: string) => {
    setShippingData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePaymentChange = (field: string, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }))
  }

  const handleShippingSubmit = () => {
    if (!shippingData.firstName || !shippingData.address) {
      alert('Please fill in all shipping details')
      return
    }
    setCurrentStep('payment')
  }

  const handlePaymentSubmit = async () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setCurrentStep('confirmation')
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl font-bold text-foreground">
              Checkout
            </h1>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              {/* Step 1 - Shipping */}
              <div
                className="flex flex-1 flex-col items-center"
                onClick={() => currentStep !== 'confirmation' && setCurrentStep('shipping')}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-white ${
                    currentStep === 'shipping' || (currentStep !== 'shipping' && currentStep !== 'confirmation')
                      ? 'bg-green'
                      : 'bg-green-500'
                  }`}
                >
                  {currentStep === 'confirmation' || currentStep === 'payment' ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    '1'
                  )}
                </div>
                <p className="mt-2 text-sm font-light text-foreground">Shipping</p>
              </div>

              <div className="flex-1 border-t-2 border-gray-300"></div>

              {/* Step 2 - Payment */}
              <div
                className="flex flex-1 flex-col items-center"
                onClick={() => currentStep === 'payment' && setCurrentStep('payment')}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-white ${
                    currentStep === 'payment'
                      ? 'bg-green'
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
                <p className="mt-2 text-sm font-light text-foreground">Payment</p>
              </div>

              <div className="flex-1 border-t-2 border-gray-300"></div>

              {/* Step 3 - Confirmation */}
              <div className="flex flex-1 flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-white ${
                    currentStep === 'confirmation' ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  {currentStep === 'confirmation' ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    '3'
                  )}
                </div>
                <p className="mt-2 text-sm font-light text-foreground">Confirmation</p>
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
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <h2 className="mb-6 font-heading text-2xl font-bold text-foreground">
                    Shipping Address
                  </h2>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-light text-foreground">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={shippingData.firstName}
                          onChange={(e) =>
                            handleShippingChange('firstName', e.target.value)
                          }
                          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-foreground">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={shippingData.lastName}
                          onChange={(e) =>
                            handleShippingChange('lastName', e.target.value)
                          }
                          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-light text-foreground">
                        Email
                      </label>
                      <input
                        type="email"
                        value={shippingData.email}
                        onChange={(e) =>
                          handleShippingChange('email', e.target.value)
                        }
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-light text-foreground">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={shippingData.phone}
                        onChange={(e) =>
                          handleShippingChange('phone', e.target.value)
                        }
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-light text-foreground">
                        Street Address
                      </label>
                      <input
                        type="text"
                        value={shippingData.address}
                        onChange={(e) =>
                          handleShippingChange('address', e.target.value)
                        }
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-light text-foreground">
                          City
                        </label>
                        <input
                          type="text"
                          value={shippingData.city}
                          onChange={(e) =>
                            handleShippingChange('city', e.target.value)
                          }
                          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-foreground">
                          State
                        </label>
                        <input
                          type="text"
                          value={shippingData.state}
                          onChange={(e) =>
                            handleShippingChange('state', e.target.value)
                          }
                          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-foreground">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          value={shippingData.zip}
                          onChange={(e) =>
                            handleShippingChange('zip', e.target.value)
                          }
                          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
                          required
                        />
                      </div>
                    </div>

                    {/* Shipping Method */}
                    <div className="mt-8 border-t border-gray-200 pt-6">
                      <h3 className="mb-4 font-heading font-bold text-foreground">
                        Shipping Method
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 rounded-lg border border-gray-300 p-4">
                          <input
                            type="radio"
                            name="shipping"
                            checked={shippingData.shippingMethod === 'standard'}
                            onChange={() =>
                              handleShippingChange('shippingMethod', 'standard')
                            }
                            className="h-4 w-4"
                          />
                          <div>
                            <p className="font-light text-foreground">
                              Standard Shipping (3-5 days)
                            </p>
                            <p className="text-sm text-gray-600">₦1,000</p>
                          </div>
                        </label>
                        <label className="flex items-center gap-3 rounded-lg border border-gray-300 p-4">
                          <input
                            type="radio"
                            name="shipping"
                            checked={shippingData.shippingMethod === 'express'}
                            onChange={() =>
                              handleShippingChange('shippingMethod', 'express')
                            }
                            className="h-4 w-4"
                          />
                          <div>
                            <p className="font-light text-foreground">
                              Express Shipping (1-2 days)
                            </p>
                            <p className="text-sm text-gray-600">₦3,000</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <Button
                      onClick={handleShippingSubmit}
                      className="mt-6 w-full bg-green py-3 text-white hover:bg-green/90"
                    >
                      Continue to Payment
                    </Button>
                  </form>
                </div>
              )}

              {/* Payment Step */}
              {currentStep === 'payment' && (
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <h2 className="mb-6 font-heading text-2xl font-bold text-foreground">
                    Payment Information
                  </h2>
                  <form className="space-y-4">
                    <div className="rounded-lg bg-blue-50 p-4">
                      <p className="flex items-center gap-2 text-sm text-blue-700">
                        <Lock className="h-4 w-4" />
                        Your payment information is secure and encrypted
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-light text-foreground">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={paymentData.cardNumber}
                        onChange={(e) =>
                          handlePaymentChange('cardNumber', e.target.value)
                        }
                        placeholder="1234 5678 9012 3456"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-light text-foreground">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={paymentData.cardHolder}
                        onChange={(e) =>
                          handlePaymentChange('cardHolder', e.target.value)
                        }
                        placeholder="John Doe"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-light text-foreground">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={paymentData.expiryDate}
                          onChange={(e) =>
                            handlePaymentChange('expiryDate', e.target.value)
                          }
                          placeholder="MM/YY"
                          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-foreground">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={paymentData.cvv}
                          onChange={(e) =>
                            handlePaymentChange('cvv', e.target.value)
                          }
                          placeholder="123"
                          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={() => setCurrentStep('shipping')}
                        variant="outline"
                        className="flex-1 py-3"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handlePaymentSubmit}
                        disabled={isProcessing}
                        className="flex-1 bg-green py-3 text-white hover:bg-green/90 disabled:opacity-50"
                      >
                        {isProcessing ? 'Processing...' : 'Complete Order'}
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Confirmation Step */}
              {currentStep === 'confirmation' && (
                <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-10 w-10 text-green-600" />
                    </div>
                  </div>
                  <h2 className="font-heading text-3xl font-bold text-foreground">
                    Order Confirmed!
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Thank you for your purchase. Your order has been successfully placed.
                  </p>

                  <div className="mt-8 space-y-4 rounded-lg bg-gray-50 p-6 text-left">
                    <div className="flex justify-between">
                      <p className="text-gray-600">Order Number:</p>
                      <p className="font-bold text-foreground">#MIN001234</p>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-4">
                      <p className="text-gray-600">Expected Delivery:</p>
                      <p className="font-bold text-foreground">Feb 20, 2025</p>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-4">
                      <p className="text-gray-600">Tracking Link:</p>
                      <p className="font-bold text-green">minmart.com/track/001234</p>
                    </div>
                  </div>

                  <p className="mt-6 text-sm text-gray-600">
                    A confirmation email has been sent to {shippingData.email}
                  </p>

                  <Button className="mt-6 w-full bg-green py-3 text-white hover:bg-green/90">
                    View Order Details
                  </Button>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-4 font-heading font-bold text-foreground">
                  Order Summary
                </h3>

                {/* Items */}
                <div className="space-y-3 border-b border-gray-200 pb-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-light text-foreground">
                        ₦{item.total.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-light">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-light">₦{shippingCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (7.5%)</span>
                    <span className="font-light">₦{tax.toLocaleString()}</span>
                  </div>
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <p className="font-heading font-bold text-foreground">Total</p>
                      <p className="font-heading text-2xl font-bold text-green">
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
