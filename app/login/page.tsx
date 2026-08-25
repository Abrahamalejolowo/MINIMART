'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

import LogPages from '@/public/LogPages.jpg'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const callbackUrl = searchParams.get('callbackUrl') || '/checkout'

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFocused, setIsFocused] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      })

      if (error) {
        setErrorMessage(error.message || 'Invalid email or password')
        setIsLoading(false)
        return
      }

      const destination =
        callbackUrl.startsWith('/') && !callbackUrl.startsWith('//')
          ? callbackUrl
          : '/checkout'

      router.refresh()
      window.location.href = destination
    } catch (error) {
      console.error('Login error:', error)
      setErrorMessage('Unable to connect to the server. Please try again.')
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setErrorMessage(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(
          callbackUrl
        )}`,
      },
    })

    if (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <div className="w-full md:w-[58%] p-5 md:p-8 flex flex-col justify-center">
      <div className="mb-4">
        <Link
          href="/"
          className="inline-block md:hidden text-2xl font-black text-[#1db954] tracking-tight mb-1"
        >
          Minmart
        </Link>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          Welcome Back
        </h2>
        <p className="text-xs text-gray-500">
          Please enter your credentials to access your portal.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-3 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-medium flex items-center gap-2">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 flex flex-col">
        <div>
          <label
            htmlFor="login-email"
            className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1 ml-0.5"
          >
            Email Address
          </label>
          <input
            id="login-email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            onFocus={() => setIsFocused('email')}
            onBlur={() => setIsFocused(null)}
            placeholder="name@domain.com"
            className={`w-full rounded-lg border bg-white px-3 py-2 text-xs text-gray-900 outline-none transition-all ${
              isFocused === 'email'
                ? 'border-[#1db954] ring-1 ring-[#1db954]'
                : 'border-gray-200'
            }`}
            required
          />
        </div>

        <div>
          <label
            htmlFor="login-password"
            className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1 ml-0.5"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              onFocus={() => setIsFocused('password')}
              onBlur={() => setIsFocused(null)}
              placeholder="••••••••"
              className={`w-full rounded-lg border bg-white pl-3 pr-9 py-2 text-xs text-gray-900 outline-none transition-all ${
                isFocused === 'password'
                  ? 'border-[#1db954] ring-1 ring-[#1db954]'
                  : 'border-gray-200'
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1db954] transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-0.5">
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              className="w-3.5 h-3.5 rounded text-[#1db954] bg-white border-gray-300 focus:ring-[#1db954]"
            />
            <span className="text-[11px] text-gray-500">
              Remember device
            </span>
          </label>
          <Link
            href="/forgot-password"
            className="text-[11px] font-semibold text-[#1db954] hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#1db954] text-white hover:bg-[#1ed760] py-2.5 h-auto rounded-lg font-medium text-xs flex justify-center items-center shadow-sm transition-all mt-1 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </>
          )}
        </Button>
      </form>

      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-100"></div>
        <span className="mx-3 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
          Or continue with
        </span>
        <div className="flex-grow border-t border-gray-100"></div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex-1 flex items-center justify-center space-x-2 bg-white border border-gray-200 hover:bg-gray-50 py-2 rounded-lg text-xs font-medium text-gray-700 shadow-xs transition-all active:scale-[0.99] cursor-pointer"
        >
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
          <span>Google</span>
        </button>

        <button
          type="button"
          className="flex-1 flex items-center justify-center space-x-2 bg-white border border-gray-200 hover:bg-gray-50 py-2 rounded-lg text-xs font-medium text-gray-700 shadow-xs transition-all active:scale-[0.99] cursor-pointer"
        >
          <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span>Facebook</span>
        </button>
      </div>

      <div className="mt-5 text-center">
        <p className="text-xs text-gray-500">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="text-[#1db954] hover:underline font-bold ml-0.5"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-3 md:p-6 antialiased">
      <main className="w-full max-w-3xl bg-white rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row border border-gray-100">
        <div className="relative w-full md:w-[42%] hidden md:block">
          <Image
            src={LogPages}
            alt="Minmart visual banner"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
            <Link href="/" className="font-bold text-xl tracking-tight text-white">
              Minmart
            </Link>

            <div>
              <h2 className="text-xl font-bold mb-2 leading-snug">
                Welcome Back to the Trade
              </h2>
              <p className="text-white/85 text-xs font-normal leading-relaxed">
                Sign back into your profile to manage your curated orders, track active store dispatches, or view your boutique items.
              </p>
            </div>

            <div className="flex items-center space-x-2 border-t border-white/20 pt-4">
              <ShieldCheck className="h-4 w-4 text-white shrink-0" />
              <span className="text-[11px] font-medium text-white/90">
                Verified Merchant Security Protocol
              </span>
            </div>
          </div>
        </div>

        <Suspense fallback={<div className="w-full md:w-[58%] p-8 flex items-center justify-center text-xs text-gray-400">Loading form...</div>}>
          <LoginForm />
        </Suspense>
      </main>
    </div>
  )
}