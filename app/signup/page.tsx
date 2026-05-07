'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    if (!agreeToTerms) {
      alert('Please agree to terms and conditions')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      console.log('Signup attempt:', formData)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green/5 to-green/10">
      <div className="flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
          {/* Header */}
          <div className="mb-8 text-center">
            <Link href="/" className="inline-block">
              <h1 className="font-heading text-3xl font-bold text-green">
                Minmart
              </h1>
            </Link>
            <p className="mt-2 text-gray-600">Create your Minmart account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-light text-foreground">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-foreground placeholder-gray-400 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-light text-foreground">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-foreground placeholder-gray-400 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-light text-foreground">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-foreground placeholder-gray-400 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-light text-foreground">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-foreground placeholder-gray-400 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-light text-foreground">
                Confirm Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-foreground placeholder-gray-400 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms & Conditions */}
            <label className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mt-1 h-4 w-4 rounded"
              />
              <span className="text-xs text-gray-600">
                I agree to Minmart's{' '}
                <Link href="/terms" className="font-light text-green hover:underline">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="font-light text-green hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green py-2 text-white hover:bg-green/90 disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="text-sm text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Social Signup */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full py-2"
            >
              Sign up with Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full py-2"
            >
              Sign up with Facebook
            </Button>
          </div>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-light text-green hover:text-green/80"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
