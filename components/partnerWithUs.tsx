'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { CheckCircle, ShieldCheck, Zap, Globe, ArrowRight } from 'lucide-react'

export default function PartnerPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    category: '',
    location: '',
    website: '',
    description: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here (e.g., send to API route)
    console.log('Vendor Application Submitted:', formData)
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB]">
      <Navbar />

      <main className="flex-1">
        {/* HERO HERO SECTION */}
        <div className="relative bg-zinc-900 py-24 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block rounded-full bg-green-500/10 px-4 py-1.5 text-xs font-semibold text-green-400 backdrop-blur-sm border border-green-500/20">
              Grow Your Business With Us
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl max-w-3xl mx-auto leading-tight">
              Bring Your Authentic Nigerian Brand to the World
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-zinc-400">
              Join Nigeria's premium curated marketplace. We handle the visibility, logistics, and infrastructure so you can focus on making incredible products.
            </p>
          </div>
        </div>

        {/* VALUE PROPOSITION GRID */}
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
              Why Partner With Us?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We provide the ecosystem built to solve growth challenges for Nigerian local creators.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 mb-5">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Global Exposure</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Reach thousands of high-intent buyers looking specifically for authentic, premium Nigerian craft, apparel, and goods.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 mb-5">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Seamless Logistics</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Enjoy reliable delivery operations. Once you secure an order, our system coordinates hassle-free drop-offs and dispatch.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 mb-5">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Secure Payouts</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Fast, automated, and totally transparent vendor disbursements straight into your local Nigerian business account.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 mb-5">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Marketing Support</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Get spotlighted in our lookbooks, newsletters, and premium social media campaigns designed to celebrate artisan branding.
              </p>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="bg-white border-y border-gray-200 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Three Easy Steps to Onboard</h2>
            </div>

            <div className="grid gap-10 md:grid-cols-3 relative">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white font-bold text-lg mb-4">1</div>
                <h4 className="text-lg font-semibold text-gray-900">Apply Online</h4>
                <p className="mt-2 text-sm text-gray-500 max-w-xs">Fill out the basic registration form below with details regarding your brand identity.</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white font-bold text-lg mb-4">2</div>
                <h4 className="text-lg font-semibold text-gray-900">Vetting Process</h4>
                <p className="mt-2 text-sm text-gray-500 max-w-xs">Our quality assurance team reviews your products to verify design craftsmanship standards.</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white font-bold text-lg mb-4">3</div>
                <h4 className="text-lg font-semibold text-gray-900">Start Selling</h4>
                <p className="mt-2 text-sm text-gray-500 max-w-xs">Gain dashboard access to control listings, stock counts, and check out incoming orders instantly.</p>
              </div>
            </div>
          </div>
        </div>

        {/* REGISTRATION FORM SECTION */}
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:p-12">
            
            {submitted ? (
              <div className="text-center py-12">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-6">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Application Received!</h3>
                <p className="mt-3 text-gray-600">
                  Thank you for applying to partner with us, <span className="font-semibold text-gray-900">{formData.contactName}</span>. Our merchant team will review your brand details and reach back within 2–3 business days.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">Merchant Application</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Tell us about your brand. All applications are reviewed carefully to maintain an elite collection standard.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business / Registered Name</label>
                      <input
                        type="text"
                        name="businessName"
                        required
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="e.g., Nerolit Handmade"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Primary Representative Contact Name</label>
                      <input
                        type="text"
                        name="contactName"
                        required
                        value={formData.contactName}
                        onChange={handleChange}
                        placeholder="First and Last Name"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number (WhatsApp Preferred)</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g., +234..."
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Core Product Category</label>
                      <select
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
                      >
                        <option value="">Select a Category</option>
                        <option value="footwear">Footwear</option>
                        <option value="fashion">Fashion & Apparel</option>
                        <option value="leather">Leather Goods</option>
                        <option value="beauty">Beauty & Skincare</option>
                        <option value="home">Home & Living</option>
                        <option value="food">Food & Spices</option>
                        <option value="crafts">Crafts & Artisanal Items</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Operational Hub Location (City / State)</label>
                      <input
                        type="text"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g., Aba, Lagos, Kano"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website or Social Media Portfolio Link (Optional)</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="instagram.com/yourbrand"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Brief Brand & Production Process Pitch</label>
                    <textarea
                      name="description"
                      required
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Give us a short description of how your goods are sourced and produced..."
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 text-white hover:bg-green-700 font-medium py-6 rounded-xl flex items-center justify-center gap-2 text-base transition-all"
                  >
                    Submit Vendor Application
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </form>
              </>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}