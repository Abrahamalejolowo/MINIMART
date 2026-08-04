'use client'

import { useState, useMemo, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'

function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect') || '/'
  const { signup } = useAuth()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isFocused, setIsFocused] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Real-time password strength calculation engine
  const passwordStrength = useMemo(() => {
    const pass = formData.password
    if (!pass) return { score: 0, label: '', color: 'bg-gray-200' }
    let score = 0
    if (pass.length >= 8) score++
    if (/[A-Z]/.test(pass)) score++
    if (/[0-9]/.test(pass)) score++
    if (/[^A-Za-z0-9]/.test(pass)) score++

    switch (score) {
      case 1: return { score: 25, label: 'Weak', color: 'bg-red-500' }
      case 2: return { score: 50, label: 'Fair', color: 'bg-orange-400' }
      case 3: return { score: 75, label: 'Good', color: 'bg-blue-500' }
      case 4: return { score: 100, label: 'Strong', color: 'bg-green-600' }
      default: return { score: 10, label: 'Too Short', color: 'bg-red-500' }
    }
  }, [formData.password])

  // Real-time confirmation matching calculation
  const passwordMatch = useMemo(() => {
    if (!formData.confirmPassword) return null
    return formData.password === formData.confirmPassword
  }, [formData.password, formData.confirmPassword])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match')
      return
    }
    if (!agreeToTerms) {
      setErrorMessage('Please agree to terms and conditions to proceed.')
      return
    }

    setIsLoading(true)

    try {
      let result;
      if (signup) {
        result = await signup({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          password: formData.password,
        })
      } else {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            password: formData.password,
          }),
        })
        const data = await res.json()
        if (!res.ok) {
          result = { success: false, error: data.error || 'Registration failed.' }
        } else {
          localStorage.setItem('user', JSON.stringify(data.user))
          result = { success: true }
        }
      }

      if (!result?.success) {
        setErrorMessage(result?.error || 'Account creation failed. Please try again.')
        setIsLoading(false)
        return
      }

      router.push(redirectUrl)
      router.refresh()
    } catch (err) {
      console.error('Signup error:', err)
      setErrorMessage('Something went wrong. Please check your network connection.')
    } finally {
      setIsLoading(false)
    }
  }

  const loginLink = `/login${redirectUrl !== '/' ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F6F5] via-[#FCFDFD] to-[#F4F6F5] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Container Box */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-12 min-h-[680px]">
        
        {/* LEFT COLUMN: Visual Brand Panel */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-green-600 to-green-800 p-12 text-white flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/10 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <Link href="/" className="inline-block tracking-tight text-3xl font-black text-white hover:opacity-90 transition-opacity">
              Minmart
            </Link>
            <h2 className="text-2xl font-bold mt-16 leading-snug">
              Join Nigeria&apos;s Premium Quality Creative Trade
            </h2>
            <p className="text-white/80 font-light mt-4 text-sm leading-relaxed">
              Unlock access to hundreds of verified local brands, handcrafted lifestyle pieces, custom footwear, and fine essential scents.
            </p>
          </div>

          <div className="relative z-10 border-t border-white/20 pt-6">
            <div className="flex items-center gap-3 text-xs text-white/90">
              <ShieldCheck className="h-5 w-5 text-white animate-pulse" />
              <span>Verified Merchant Security Protocol Active</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Form Controls */}
        <div className="col-span-12 lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            
            {/* Form Mobile Brand Identity Header */}
            <div className="mb-8 lg:mb-6 text-center lg:text-left">
              <Link href="/" className="inline-block lg:hidden text-3xl font-black text-green-600 tracking-tight mb-2">
                Minmart
              </Link>
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Create your account</h3>
              <p className="text-sm text-gray-500 mt-1">Get started with your free profile today.</p>
            </div>

            {/* Error Notification Banner */}
            {errorMessage && (
              <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Dual Column Names layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onFocus={() => setIsFocused('firstName')}
                    onBlur={() => setIsFocused(null)}
                    placeholder="Chidi"
                    className={`mt-1.5 w-full rounded-xl border bg-[#F9FAFB] px-4 py-3 text-sm text-gray-900 outline-none transition-all ${
                      isFocused === 'firstName' ? 'border-green-600 bg-white ring-4 ring-green-600/5' : 'border-gray-200'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onFocus={() => setIsFocused('lastName')}
                    onBlur={() => setIsFocused(null)}
                    placeholder="Okonkwo"
                    className={`mt-1.5 w-full rounded-xl border bg-[#F9FAFB] px-4 py-3 text-sm text-gray-900 outline-none transition-all ${
                      isFocused === 'lastName' ? 'border-green-600 bg-white ring-4 ring-green-600/5' : 'border-gray-200'
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Email Control */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setIsFocused('email')}
                  onBlur={() => setIsFocused(null)}
                  placeholder="name@domain.com"
                  className={`mt-1.5 w-full rounded-xl border bg-[#F9FAFB] px-4 py-3 text-sm text-gray-900 outline-none transition-all ${
                    isFocused === 'email' ? 'border-green-600 bg-white ring-4 ring-green-600/5' : 'border-gray-200'
                  }`}
                  required
                />
              </div>

              {/* Password Control + Reactive Strength Meter */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Password</label>
                <div className="relative mt-1.5">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setIsFocused('password')}
                    onBlur={() => setIsFocused(null)}
                    placeholder="••••••••"
                    className={`w-full rounded-xl border bg-[#F9FAFB] px-4 py-3 pr-11 text-sm text-gray-900 outline-none transition-all ${
                      isFocused === 'password' ? 'border-green-600 bg-white ring-4 ring-green-600/5' : 'border-gray-200'
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
                
                {/* Dynamic Strength Visual Feedback Track */}
                {formData.password && (
                  <div className="mt-2 space-y-1 animate-fade-in">
                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ease-out ${passwordStrength.color}`}
                        style={{ width: `${passwordStrength.score}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-gray-400 font-medium text-right">
                      Strength: <span className="font-bold text-gray-600">{passwordStrength.label}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password + Dynamic Match Check */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Confirm Password</label>
                <div className="relative mt-1.5">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => setIsFocused('confirmPassword')}
                    onBlur={() => setIsFocused(null)}
                    placeholder="••••••••"
                    className={`w-full rounded-xl border bg-[#F9FAFB] px-4 py-3 pr-11 text-sm text-gray-900 outline-none transition-all ${
                      isFocused === 'confirmPassword' ? 'border-green-600 bg-white ring-4 ring-green-600/5' : 
                      passwordMatch === true ? 'border-green-600 bg-green-50/20' :
                      passwordMatch === false ? 'border-red-300 bg-red-50/30' : 'border-gray-200'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                
                {/* Visual Feedback text if mismatch happens */}
                {passwordMatch === false && (
                  <p className="text-[11px] text-red-500 font-medium mt-1">Passwords do not match yet</p>
                )}
              </div>

              {/* Custom Terms & Conditions Checkbox */}
              <label className="flex items-start gap-3 pt-1 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded-md border-gray-300 text-green-600 focus:ring-green-600/20"
                />
                <span className="text-xs text-gray-500 leading-normal font-light">
                  I explicitly agree to Minmart&apos;s{' '}
                  <Link href="/terms" className="font-medium text-green-600 hover:underline decoration-green-600/30">
                    Terms &amp; Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="font-medium text-green-600 hover:underline decoration-green-600/30">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              {/* Submit CTA */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white hover:bg-green-700 py-6 text-sm font-semibold rounded-xl shadow-lg shadow-green-500/10 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            {/* Clean Custom Divider Layout */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 border-t border-gray-100"></div>
              <span className="text-[11px] font-bold text-gray-400 tracking-widest uppercase">OR CONTINUE WITH</span>
              <div className="flex-1 border-t border-gray-100"></div>
            </div>

            {/* Social OAuth Buttons */}
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

            {/* Bottom Form Switcher Anchor Link */}
            <p className="mt-8 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link
                href={loginLink}
                className="font-semibold text-green-600 hover:text-green-700 transition-colors underline underline-offset-4 decoration-green-600/20"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SignupForm />
    </Suspense>
  )
}