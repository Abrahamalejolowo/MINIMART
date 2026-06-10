'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFocused, setIsFocused] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate active server payload submission 
    setTimeout(() => {
      setIsLoading(false)
      console.log('Login success payload:', { email, password })
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F6F5] via-[#FCFDFD] to-[#F4F6F5] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Premium Content Card Grid Wrapper */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-12 min-h-[600px]">
        
        {/* LEFT COLUMN: Visual Brand Panel (Matches Signup Layout Mirroring) */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-green to-green/80 p-12 text-white flex-col justify-between relative overflow-hidden">
          {/* Subtle Abstract Background Glow Circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/10 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <Link href="/" className="inline-block tracking-tight text-3xl font-black text-white hover:opacity-90 transition-opacity">
              Minmart
            </Link>
            <h2 className="text-2xl font-bold mt-20 leading-snug">
              Welcome Back to the Trade
            </h2>
            <p className="text-white/80 font-light mt-4 text-sm leading-relaxed">
              Sign back into your profile to manage your curated orders, track active local store dispatches, or manage your boutique products.
            </p>
          </div>

          <div className="relative z-10 border-t border-white/20 pt-6">
            <div className="flex items-center gap-3 text-xs text-white/90">
              <ShieldCheck className="h-5 w-5 text-white animate-pulse" />
              <span>Verified Merchant Security Protocol Active</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Form Interface Controls */}
        <div className="col-span-12 lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            
            {/* Form Responsive Brand Identity Header */}
            <div className="mb-8 text-center lg:text-left">
              <Link href="/" className="inline-block lg:hidden text-3xl font-black text-green tracking-tight mb-2">
                Minmart
              </Link>
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome Back</h3>
              <p className="text-sm text-gray-500 mt-1">Please enter your credentials to access your portal.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email Control */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused('email')}
                  onBlur={() => setIsFocused(null)}
                  placeholder="name@domain.com"
                  className={`mt-1.5 w-full rounded-xl border bg-[#F9FAFB] px-4 py-3 text-sm text-gray-900 outline-none transition-all ${
                    isFocused === 'email' ? 'border-green bg-white ring-4 ring-green/5' : 'border-gray-200'
                  }`}
                  required
                />
              </div>

              {/* Password Control */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Password</label>
                <div className="relative mt-1.5">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setIsFocused('password')}
                    onBlur={() => setIsFocused(null)}
                    placeholder="••••••••"
                    className={`w-full rounded-xl border bg-[#F9FAFB] px-4 py-3 pr-11 text-sm text-gray-900 outline-none transition-all ${
                      isFocused === 'password' ? 'border-green bg-white ring-4 ring-green/5' : 'border-gray-200'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Recover Link Flex Controls */}
              <div className="flex items-center justify-between pt-1 flex-row">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 rounded border-gray-300 text-green focus:ring-green/20" 
                  />
                  <span className="text-xs font-light text-gray-500">Remember device</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-green hover:underline decoration-green/20"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Authentication Action Trigger */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white hover:bg-green-700 py-6 text-sm font-semibold rounded-xl shadow-lg shadow-green-500/10 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            {/* Structured Border Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 border-t border-gray-100"></div>
              <span className="text-[11px] font-bold text-gray-400 tracking-widest uppercase">OR CONNECT WITH</span>
              <div className="flex-1 border-t border-gray-100"></div>
            </div>

            {/* Social Authentication Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium text-xs py-3 px-4 rounded-xl transition-colors shadow-sm"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.94 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.6 2.8C6.01 7.19 8.77 5.04 12 5.04z"/>
                  <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.47h6.46c-.28 1.47-1.11 2.72-2.36 3.56l3.63 2.82c2.12-1.95 3.36-4.83 3.36-8.49z"/>
                  <path fill="#FBBC05" d="M5.1 14.7c-.25-.75-.39-1.55-.39-2.37s.14-1.62.39-2.37L1.5 7.16C.54 9.08 0 11.24 0 13.5s.54 4.42 1.5 6.34l3.6-2.14z"/>
                  <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.63-2.82c-1.1.74-2.52 1.18-4.33 1.18-3.23 0-5.99-2.15-6.96-5.26l-3.6 2.8C3.4 20.35 7.35 23 12 23z"/>
                </svg>
                <span>Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium text-xs py-3 px-4 rounded-xl transition-colors shadow-sm"
              >
                <svg className="h-4 w-4" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </button>
            </div>

            {/* Alternative Form Registration Trigger Link */}
            <p className="mt-8 text-center text-sm text-">
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="font-semibold text-green-500 hover:text-green-700 transition-colors underline underline-offset-4 decoration-green/20"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}