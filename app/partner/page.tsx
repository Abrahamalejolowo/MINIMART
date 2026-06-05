'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { 
  ArrowRight, 
  Sparkles, 
  Layers, 
  ShoppingBag, 
  Send, 
  Plus, 
  X, 
  UploadCloud, 
  CheckCircle2,
  Instagram,
  Compass,
  Zap,
  Mail,
  Phone
} from 'lucide-react'

interface CatalogItem {
  name: string
  price: string
}

export default function PartnerPage() {
  const [brandName, setBrandName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [instagram, setInstagram] = useState('')
  const [sizesColors, setSizesColors] = useState('')
  const [timeline, setTimeline] = useState('')
  const [brandStory, setBrandStory] = useState('')
  
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
    
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 1200)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB] text-gray-900 selection:bg-green-600 selection:text-white">
      <Navbar />

      <main className="flex-1 relative flex flex-col lg:flex-row w-full max-w-7xl mx-auto items-stretch lg:py-6 lg:gap-6 px-0 sm:px-4">
        
        {/* LEFT COLUMN: HERO PANEL STYLED WITH PROJECT GREEN */}
        <div className="lg:w-[38%] bg-gradient-to-br from-green-600 via-green-700 to-green-800 p-8 sm:p-12 flex flex-col justify-between text-white relative overflow-hidden lg:rounded-3xl lg:sticky lg:top-24 lg:h-[calc(100vh-120px)] shadow-xl shadow-green-950/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_50%)]" />
          <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/10 rounded-full text-[10px] uppercase font-black tracking-widest text-green-100">
              <Zap className="h-3 w-3 animate-pulse text-yellow-300" /> Active Merchant Node
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-white">
                Partner with <span className="underline decoration-yellow-300 decoration-wavy underline-offset-4">Minmart</span>
              </h1>
              <p className="text-green-50/80 text-sm leading-relaxed font-light">
                Provide your product metrics to instantly onboard your active catalog layouts directly into our global commerce index.
              </p>
            </div>
          </div>

          {/* Dynamic Statistics Track */}
          <div className="relative pt-12 lg:pt-0 space-y-6 z-10 border-t border-white/10 lg:border-none">
            <div className="flex gap-6 items-center">
              <div>
                <p className="text-2xl font-black tracking-tight text-white">~24h</p>
                <p className="text-[10px] uppercase tracking-wider font-bold text-green-200/70">Review Speed</p>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div>
                <p className="text-2xl font-black tracking-tight text-white">0%</p>
                <p className="text-[10px] uppercase tracking-wider font-bold text-green-200/70">Setup Fees</p>
              </div>
            </div>

            <p className="text-xs text-green-100/70 flex items-center gap-2">
              <Compass className="h-3.5 w-3.5 text-yellow-300" /> Secure Multi-channel Pipeline Built In
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: HIGH-CONTRAST DATA CAPTURE PANELS */}
        <div className="flex-1 p-4 sm:p-8 lg:p-12 bg-white rounded-t-3xl lg:rounded-3xl border border-gray-100 shadow-sm">
          
          {submitted ? (
            <div className="max-w-md mx-auto text-center space-y-6 py-16">
              <div className="inline-flex p-4 rounded-2xl bg-green-50 text-green-600 border border-green-100 shadow-sm shadow-green-600/5">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h2 className="text-3xl font-black tracking-tight text-gray-900">Application Deployed!</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Thank you for submitting your brand data. Our marketplace curation team will activate your digital storefront pipeline within 24 hours.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-600 hover:text-green-700 transition"
              >
                Submit another request <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full space-y-10">
              
              {/* BRAND CARD FIELD BLOCK */}
              <div className="space-y-5">
                <div className="border-b border-gray-100 pb-2">
                  <h3 className="text-xs font-black uppercase tracking-widest text-green-700 flex items-center gap-2">
                    <span className="bg-green-100 text-green-800 px-1.5 py-0.5 rounded text-[10px]">01</span> Brand Dossier
                  </h3>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="brandName" className="text-xs font-bold text-gray-700 block">Brand / Business Name</label>
                  <div className="relative flex items-center bg-gray-50 focus-within:bg-white rounded-xl border border-gray-200 focus-within:border-green-600 transition-all duration-150 shadow-2xs">
                    <span className="pl-4 text-gray-400"><ShoppingBag className="h-4 w-4" /></span>
                    <input
                      id="brandName"
                      type="text"
                      required
                      placeholder="e.g. SCENTS BY AW"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-sm p-3.5 pl-2.5 font-medium text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-gray-700 block">Business Email</label>
                    <div className="relative flex items-center bg-gray-50 focus-within:bg-white rounded-xl border border-gray-200 focus-within:border-green-600 transition-all duration-150 shadow-2xs">
                      <span className="pl-4 text-gray-400"><Mail className="h-4 w-4" /></span>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent border-none outline-none text-sm p-3.5 pl-2.5 text-gray-900 placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-xs font-bold text-gray-700 block">Contact Line</label>
                    <div className="relative flex items-center bg-gray-50 focus-within:bg-white rounded-xl border border-gray-200 focus-within:border-green-600 transition-all duration-150 shadow-2xs">
                      <span className="pl-4 text-gray-400"><Phone className="h-4 w-4" /></span>
                      <input
                        id="phone"
                        type="tel"
                        required
                        placeholder="0800 000 0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-transparent border-none outline-none text-sm p-3.5 pl-2.5 text-gray-900 placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="instagram" className="text-xs font-bold text-gray-700 block">Instagram Handle</label>
                  <div className="relative flex items-center bg-gray-50 focus-within:bg-white rounded-xl border border-gray-200 focus-within:border-green-600 transition-all duration-150 shadow-2xs">
                    <span className="pl-4 text-gray-400"><Instagram className="h-4 w-4" /></span>
                    <span className="pl-2.5 text-sm font-bold text-green-700 select-none">@</span>
                    <input
                      id="instagram"
                      type="text"
                      required
                      placeholder="username"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-sm p-3.5 pl-0.5 font-medium text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* PRODUCT ARCHITECTURE BLOCK */}
              <div className="space-y-5">
                <div className="border-b border-gray-100 pb-2 flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-widest text-green-700 flex items-center gap-2">
                    <span className="bg-green-100 text-green-800 px-1.5 py-0.5 rounded text-[10px]">02</span> Blueprint Layout Matrix
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddProduct}
                    className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-green-600 hover:text-green-700 transition"
                  >
                    <Plus className="h-3 w-3 stroke-[3]" /> Add Item Row
                  </button>
                </div>

                <div className="space-y-3">
                  {catalog.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 animate-fade-in">
                      <div className="flex-1 bg-gray-50 border border-gray-200 focus-within:border-green-600 focus-within:bg-white rounded-xl px-4 py-2 transition-all duration-150 flex items-center shadow-3xs">
                        <input
                          type="text"
                          required
                          placeholder="Product Name or Style Tag"
                          value={item.name}
                          onChange={(e) => handleProductChange(idx, 'name', e.target.value)}
                          className="w-full bg-transparent border-none outline-none text-sm font-semibold text-gray-800 placeholder:font-normal placeholder:text-gray-400"
                        />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="w-full sm:w-36 bg-gray-50 border border-gray-200 focus-within:border-green-600 focus-within:bg-white rounded-xl px-3.5 py-2 transition-all duration-150 flex items-center shadow-3xs">
                          <span className="text-xs font-black text-green-700 mr-1.5">₦</span>
                          <input
                            type="text"
                            required
                            placeholder="Price"
                            value={item.price}
                            onChange={(e) => handleProductChange(idx, 'price', e.target.value)}
                            className="w-full bg-transparent border-none outline-none text-sm font-black text-gray-900"
                          />
                        </div>

                        {catalog.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveProduct(idx)}
                            className="p-3 bg-gray-50 hover:bg-rose-50 border border-gray-200 hover:border-rose-200 rounded-xl text-gray-400 hover:text-rose-600 transition shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* LOGISTICS AND DIGITAL ASSETS BLOCK */}
              <div className="space-y-5">
                <div className="border-b border-gray-100 pb-2">
                  <h3 className="text-xs font-black uppercase tracking-widest text-green-700 flex items-center gap-2">
                    <span className="bg-green-100 text-green-800 px-1.5 py-0.5 rounded text-[10px]">03</span> Logistics & Specifications
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="variants" className="text-xs font-bold text-gray-700 block">Available Variations</label>
                    <input
                      id="variants"
                      type="text"
                      placeholder="e.g. 100ML, S / M / L, Leather"
                      value={sizesColors}
                      onChange={(e) => setSizesColors(e.target.value)}
                      className="w-full bg-gray-50 focus:bg-white rounded-xl border border-gray-200 focus:border-green-600 px-4 py-3.5 text-xs font-medium outline-none transition shadow-2xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="timeline" className="text-xs font-bold text-gray-700 block">Fulfillment Lead Time</label>
                    <input
                      id="timeline"
                      type="text"
                      required
                      placeholder="e.g. Products ship within 3-5 days"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full bg-gray-50 focus:bg-white rounded-xl border border-gray-200 focus:border-green-600 px-4 py-3.5 text-xs font-medium outline-none transition shadow-2xs"
                    />
                  </div>
                </div>

                {/* DIGITAL ASSETS DROP ZONE */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-gray-700 block">Brand Book / Photography Media</span>
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 hover:border-green-600 bg-gray-50 hover:bg-white rounded-2xl p-6 cursor-pointer transition-all duration-150 group">
                    <UploadCloud className="h-6 w-6 text-gray-400 group-hover:text-green-600 group-hover:-translate-y-0.5 transition-all" />
                    <span className="text-xs font-bold text-gray-800 mt-2">Upload high-res photography directory</span>
                    <span className="text-[10px] text-gray-400 mt-0.5">Supports high-fidelity image arrays</span>
                    <input type="file" multiple accept="image/*" className="hidden" />
                  </label>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="story" className="text-xs font-bold text-gray-700 block">Brand Origin / Vision Statement</label>
                  <textarea
                    id="story"
                    rows={4}
                    placeholder="Briefly state the creative narrative behind your craft collections, design motivation, or brand ethos..."
                    value={brandStory}
                    onChange={(e) => setBrandStory(e.target.value)}
                    className="w-full bg-gray-50 focus:bg-white rounded-xl border border-gray-200 focus:border-green-600 p-4 text-sm text-gray-900 outline-none transition-all duration-150 resize-none placeholder:text-gray-400 font-light leading-relaxed shadow-2xs"
                  />
                </div>
              </div>

              {/* ACTION FOOTER BAR */}
              <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                  <Layers className="h-3.5 w-3.5 text-green-600" />
                  <span>Entry registers directly inside live catalog framework.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-600/10 active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Registering Storefront...
                    </>
                  ) : (
                    <>
                      Submit Application <Send className="h-3.5 w-3.5 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}