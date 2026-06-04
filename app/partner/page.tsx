'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { 
  Mail, 
  Phone, 
  Instagram, 
  Calendar, 
  Sparkles, 
  Sliders, 
  ShoppingBag, 
  Send, 
  Plus, 
  Trash2, 
  Camera 
} from 'lucide-react'

interface CatalogItem {
  name: string
  price: string
}

export default function PartnerPage() {
  // Form input states
  const [brandName, setBrandName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [instagram, setInstagram] = useState('')
  const [sizesColors, setSizesColors] = useState('')
  const [timeline, setTimeline] = useState('')
  const [brandStory, setBrandStory] = useState('')
  
  // Catalog manager state
  const [catalog, setCatalog] = useState<CatalogItem[]>([{ name: '', price: '' }])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleAddProduct = () => {
    setCatalog([...catalog, { name: '', price: '' }])
  }

  const handleRemoveProduct = (index: number) => {
    const updated = catalog.filter((_, i) => i !== index)
    setCatalog(updated.length ? updated : [{ name: '', price: '' }])
  }

  const handleProductChange = (index: number, field: keyof CatalogItem, value: string) => {
    const updated = [...catalog]
    updated[index][field] = value
    setCatalog(updated)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API pipeline transmission time
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 shadow-sm">
          
          {/* SUCCESS RESPONSE SPLASH */}
          {submitted ? (
            <div className="text-center py-12 space-y-5">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600 border border-green-100">
                <Sparkles className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-950 tracking-tight">Application Successfully Received!</h2>
              <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
                Thank you for submitting your data. Our curation team will review your identity portfolio and contact you shortly to launch your merchant storefront.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-sm font-semibold text-green-700 hover:text-green-800 underline underline-offset-4"
              >
                Submit another brand request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* HEADER INTRO */}
              <div className="border-b border-gray-100 pb-8 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-950 tracking-tight">
                  Thank you for your interest in joining Minmart.
                </h1>
                <p className="mt-3 text-base text-gray-500 leading-relaxed">
                  To onboard your brand and prepare your products for listing, please supply your corporate operational records below:
                </p>
              </div>

              <div className="space-y-6">
                
                {/* 1. BRAND IDENTITY */}
                <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100/50 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-xl shadow-xs border border-gray-100 text-green-600">
                      <ShoppingBag className="h-5 w-5" />
                    </div>
                    <label htmlFor="brandName" className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                      Brand / Business Name
                    </label>
                  </div>
                  <input
                    id="brandName"
                    type="text"
                    required
                    placeholder="e.g., SCENTS BY AW"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full bg-white rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-600/5"
                  />
                </div>

                {/* 2. CONTACT PIPELINE */}
                <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100/50 space-y-4">
                  <span className="text-sm font-semibold uppercase tracking-wider text-gray-500 block">
                    Contact Phone Number & Email
                  </span>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-3 bg-white px-4 py-1.5 rounded-xl border border-gray-200 focus-within:border-green-600 focus-within:ring-4 focus-within:ring-green-600/5 transition">
                      <Mail className="h-4 w-4 text-gray-400 shrink-0" />
                      <input
                        type="email"
                        required
                        placeholder="abubakarwadada011@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent border-none outline-none text-sm py-2.5 text-gray-900 placeholder:text-gray-400"
                      />
                    </div>

                    <div className="flex items-center gap-3 bg-white px-4 py-1.5 rounded-xl border border-gray-200 focus-within:border-green-600 focus-within:ring-4 focus-within:ring-green-600/5 transition">
                      <Phone className="h-4 w-4 text-gray-400 shrink-0" />
                      <input
                        type="tel"
                        required
                        placeholder="08090551998"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-transparent border-none outline-none text-sm py-2.5 text-gray-900 placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                </div>


                {/* 4. PRODUCT MATRIX & CATALOG BUILDER */}
                <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                      Product Names and Prices
                    </span>
                    <button
                      type="button"
                      onClick={handleAddProduct}
                      className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 border border-green-100 hover:bg-green-100 px-3 py-1.5 rounded-lg transition"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add Row
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {catalog.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100">
                        <input
                          type="text"
                          required
                          placeholder="Product Name (e.g., GIGS)"
                          value={item.name}
                          onChange={(e) => handleProductChange(idx, 'name', e.target.value)}
                          className="w-full bg-transparent border-none outline-none text-sm font-medium text-gray-800"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Price (e.g., ₦80,000)"
                          value={item.price}
                          onChange={(e) => handleProductChange(idx, 'price', e.target.value)}
                          className="w-36 bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs font-extrabold text-green-700 text-center outline-none focus:border-green-600 focus:bg-white"
                        />
                        {catalog.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveProduct(idx)}
                            className="p-1.5 text-zinc-400 hover:text-red-600 rounded-md transition"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. VARIATIONS & PHOTOS */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100/50 flex flex-col justify-between gap-3">
                    <div>
                      <label htmlFor="variants" className="text-sm font-semibold uppercase tracking-wider text-gray-500 block mb-2">
                        Available Sizes / Colors
                      </label>
                      <input
                        id="variants"
                        type="text"
                        placeholder="e.g., 100ML Size, S/M/L, Black"
                        value={sizesColors}
                        onChange={(e) => setSizesColors(e.target.value)}
                        className="w-full bg-white rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs text-gray-900 outline-none transition focus:border-green-600"
                      />
                    </div>
                    <div className="text-[11px] text-gray-400 flex items-center gap-1.5 mt-2">
                      <Sliders className="h-3 w-3" /> Variant layout configuration
                    </div>
                  </div>

                  <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100/50 flex flex-col justify-between gap-3">
                    <div>
                      <span className="text-sm font-semibold uppercase tracking-wider text-gray-500 block mb-2">
                        Clear Product Photos
                      </span>
                      <label className="flex flex-col items-center justify-center border border-dashed border-gray-300 bg-white rounded-xl p-4 cursor-pointer hover:border-green-600 transition group">
                        <Camera className="h-5 w-5 text-gray-400 group-hover:text-green-600 mb-1" />
                        <span className="text-[11px] font-medium text-gray-500 group-hover:text-green-700">Upload high-res catalog assets</span>
                        <input type="file" multiple accept="image/*" className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>

                {/* 6. TIMELINE & STORY */}
                <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100/50 space-y-3">
                  <div>
                    <label htmlFor="timeline" className="text-sm font-semibold uppercase tracking-wider text-gray-500 block mb-2">
                      Estimated Preparation / Delivery Timeline
                    </label>
                    <div className="flex items-center gap-3 bg-white px-4 py-1.5 rounded-xl border border-gray-200 focus-within:border-green-600 focus-within:ring-4 focus-within:ring-green-600/5 transition">
                      <Calendar className="h-4 w-4 text-gray-400 shrink-0" />
                      <input
                        id="timeline"
                        type="text"
                        required
                        placeholder="e.g., Delivery time - a month at max"
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full bg-transparent border-none outline-none text-sm py-2.5 text-gray-900 placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100/50 space-y-2">
                  <label htmlFor="story" className="text-sm font-semibold uppercase tracking-wider text-gray-500 block">
                    Short Brand Story
                  </label>
                  <textarea
                    id="story"
                    rows={3}
                    placeholder="Tell us the story behind your scent notes, materials or creation ethos..."
                    value={brandStory}
                    onChange={(e) => setBrandStory(e.target.value)}
                    className="w-full bg-white rounded-xl border border-gray-200 p-4 text-sm text-gray-900 leading-relaxed outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-600/5 resize-none placeholder:italic"
                  />
                </div>

              </div>

              {/* ACTION BUTTON */}
              <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-zinc-950 hover:bg-zinc-900 text-white font-medium text-sm rounded-xl transition shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Processing Application...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Submit Pipeline Profile
                    </>
                  )}
                </button>
                
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-100 rounded-xl text-green-800 font-medium text-xs">
                  <Sparkles className="h-3.5 w-3.5 shrink-0" />
                  Once received, we’ll prepare your products for listing on Minmart.
                </div>
              </div>

            </form>
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}
