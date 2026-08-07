'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

import LogPages from '@/public/LogPages.jpg'

// Inline Social Icon Components
function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

export default function SignupPage() {
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

  // Password strength calculation
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
      case 4: return { score: 100, label: 'Strong', color: 'bg-[#1db954]' }
      default: return { score: 10, label: 'Too Short', color: 'bg-red-500' }
    }
  }, [formData.password])

  const passwordMatch = useMemo(() => {
    if (!formData.confirmPassword) return null
    return formData.password === formData.confirmPassword
  }, [formData.password, formData.confirmPassword])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }
    if (!agreeToTerms) {
      setErrorMessage('Please agree to terms and conditions.')
      return
    }

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Signup success:', formData)
    } catch (err) {
      console.error(err)
      setErrorMessage('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-3 md:p-6 antialiased">
      {/* Compact Container Box */}
      <main className="w-full max-w-3xl bg-white rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
        {/* LEFT SIDE: Image / Branding Panel */}
        <div className="relative w-full md:w-[42%] hidden md:block">
          <Image
            src={LogPages}
            alt="Couple shopping at Minmart"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />

          {/* Text Content */}
          <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
            <Link href="/" className="font-bold text-xl tracking-tight text-white">
              Minmart
            </Link>
            
            <div>
              <h2 className="text-xl font-bold mb-2 leading-snug">
                Join Nigeria&apos;s Premium Creative Trade
              </h2>
              <p className="text-white/85 text-xs font-normal leading-relaxed">
                Access verified local brands, handcrafted lifestyle pieces, custom footwear, and fine scents.
              </p>
            </div>

            <div className="flex items-center space-x-2 border-t border-white/20 pt-4">
              <ShieldCheck className="h-4 w-4 text-white shrink-0" />
              <span className="text-[11px] font-medium text-white/90">Verified Merchant Protocol</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Compact Form */}
        <div className="w-full md:w-[58%] p-5 md:p-8 flex flex-col justify-center">
          
          <div className="mb-4">
            <Link href="/" className="inline-block md:hidden text-2xl font-black text-[#1db954] tracking-tight mb-1">
              Minmart
            </Link>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Create your account</h2>
            <p className="text-xs text-gray-500">Get started with your free profile today.</p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-3 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 flex flex-col">
            
            {/* Names Row */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label htmlFor="firstName" className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1 ml-0.5">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onFocus={() => setIsFocused('firstName')}
                  onBlur={() => setIsFocused(null)}
                  placeholder="Chidi"
                  className={`w-full rounded-lg border bg-white px-3 py-2 text-xs text-gray-900 outline-none transition-all ${
                    isFocused === 'firstName' ? 'border-[#1db954] ring-1 ring-[#1db954]' : 'border-gray-200'
                  }`}
                  required
                />
              </div>

              <div className="flex-1">
                <label htmlFor="lastName" className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1 ml-0.5">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onFocus={() => setIsFocused('lastName')}
                  onBlur={() => setIsFocused(null)}
                  placeholder="Okonkwo"
                  className={`w-full rounded-lg border bg-white px-3 py-2 text-xs text-gray-900 outline-none transition-all ${
                    isFocused === 'lastName' ? 'border-[#1db954] ring-1 ring-[#1db954]' : 'border-gray-200'
                  }`}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1 ml-0.5">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setIsFocused('email')}
                onBlur={() => setIsFocused(null)}
                placeholder="name@domain.com"
                className={`w-full rounded-lg border bg-white px-3 py-2 text-xs text-gray-900 outline-none transition-all ${
                  isFocused === 'email' ? 'border-[#1db954] ring-1 ring-[#1db954]' : 'border-gray-200'
                }`}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1 ml-0.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setIsFocused('password')}
                  onBlur={() => setIsFocused(null)}
                  placeholder="••••••••"
                  className={`w-full rounded-lg border bg-white pl-3 pr-9 py-2 text-xs text-gray-900 outline-none transition-all ${
                    isFocused === 'password' ? 'border-[#1db954] ring-1 ring-[#1db954]' : 'border-gray-200'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1db954] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {formData.password && (
                <div className="mt-1 space-y-0.5">
                  <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${passwordStrength.score}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium text-right">
                    Strength: <span className="font-semibold text-gray-600">{passwordStrength.label}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1 ml-0.5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setIsFocused('confirmPassword')}
                  onBlur={() => setIsFocused(null)}
                  placeholder="••••••••"
                  className={`w-full rounded-lg border bg-white pl-3 pr-9 py-2 text-xs text-gray-900 outline-none transition-all ${
                    isFocused === 'confirmPassword' ? 'border-[#1db954] ring-1 ring-[#1db954]' :
                    passwordMatch === true ? 'border-[#1db954]' :
                    passwordMatch === false ? 'border-red-300 bg-red-50/20' : 'border-gray-200'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1db954] transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {passwordMatch === false && (
                <p className="text-[10px] text-red-500 font-medium mt-0.5 ml-0.5">Passwords do not match</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center gap-2 pt-0.5">
              <input
                id="terms"
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="w-3.5 h-3.5 text-[#1db954] bg-white border-gray-300 rounded focus:ring-[#1db954]"
              />
              <label htmlFor="terms" className="text-[11px] text-gray-500 select-none cursor-pointer">
                I agree to Minmart&apos;s{' '}
                <Link href="/terms" className="font-semibold text-gray-900 hover:underline">
                  Terms
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="font-semibold text-gray-900 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1db954] text-white hover:bg-[#1ed760] py-2.5 h-auto rounded-lg font-medium text-xs flex justify-center items-center shadow-sm transition-all mt-1 active:scale-[0.99] disabled:opacity-50"
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="mx-3 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Or continue with</span>
            <div className="flex-grow border-t border-gray-100"></div>
          </div>

          {/* Social Login */}
          <div className="flex gap-2">
            <button
              type="button"
              className="flex-1 flex items-center justify-center space-x-2 bg-white border border-gray-200 hover:bg-gray-50 py-2 rounded-lg text-xs font-medium text-gray-700 shadow-xs transition-all active:scale-[0.99] cursor-pointer"
            >
              <GoogleIcon />
              <span>Google</span>
            </button>
            <button
              type="button"
              className="flex-1 flex items-center justify-center space-x-2 bg-white border border-gray-200 hover:bg-gray-50 py-2 rounded-lg text-xs font-medium text-gray-700 shadow-xs transition-all active:scale-[0.99] cursor-pointer"
            >
              <FacebookIcon />
              <span>Facebook</span>
            </button>
          </div>

          {/* Footer Link */}
          <div className="mt-5 text-center">
            <p className="text-xs text-gray-500">
              Already have an account?{' '}
              <Link href="/login" className="text-[#1db954] hover:underline font-bold ml-0.5">
                Sign In
              </Link>
            </p>
          </div>
        </div>

      </main>
    </div>
  )
}