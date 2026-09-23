'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      console.log('🔐 Attempting login...')

      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()
      console.log('📥 Response:', data)

      if (data.success) {
        console.log('✅ Login successful!')
        // Set cookie
        document.cookie = `admin_logged_in=true; path=/; max-age=2592000`
        // Redirect to dashboard
        router.push('/admin')
      } else {
        console.log('❌ Login failed:', data.error)
        setError('❌ Invalid password')
      }
    } catch (err) {
      console.error('❌ Login error:', err)
      setError('❌ Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-green-500 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2">🔐</h1>
          <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
          <p className="text-gray-600">Minimart Store Management</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Password
            </label>
            <input
              type="password"
              placeholder="Enter your admin password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              disabled={loading}
              autoFocus
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-bold transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ Logging in...' : '🚀 Login'}
          </button>
        </form>

        <hr className="my-6" />

        <div className="text-center space-y-2 text-sm text-gray-600">
          <p>💡 Keyboard Shortcut: <kbd className="bg-gray-100 px-2 py-1 rounded">Ctrl+Shift+A</kbd></p>
          <p className="text-xs">From anywhere on the website</p>
        </div>
      </div>
    </div>
  )
}