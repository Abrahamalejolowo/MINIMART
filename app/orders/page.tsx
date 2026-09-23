'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  LogOut,
  ArrowRight,
  ShoppingBag,
  Package,
  Layers,
} from 'lucide-react'

interface Order {
  id: string
  user_name: string
  user_email: string
  amount: number
  status: string
  created_at: string
  items: any[]
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/orders')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch orders')
      }

      setOrders(data.orders || [])
    } catch (err) {
      console.error('Error fetching orders:', err)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    document.cookie = 'user_logged_in=; path=/; max-age=0'
    router.push('/login')
  }

  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500/10 text-green-600 border-green-500/20'
      case 'processing':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/20'
      case 'shipped':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
      case 'delivered':
        return 'bg-green-500/10 text-green-600 border-green-500/20'
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
    }
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[hsl(var(--card))] border-b border-[hsl(var(--border))] shadow-xs backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500 text-white flex items-center justify-center font-bold">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold">My Orders</h1>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">Track your purchases</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 px-3.5 py-2 rounded-lg font-medium text-xs border border-red-500/20 transition-all"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-green-500 border-t-transparent mb-2"></div>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Loading your orders...</p>
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => {
              const itemsList = Array.isArray(order.items) ? order.items : []
              return (
                <div
                  key={order.id}
                  className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-4 sm:p-6 shadow-xs hover:border-[hsl(var(--green)/0.4)] transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 pb-4 border-b border-[hsl(var(--border))]">
                    <div>
                      <p className="font-mono font-bold text-sm text-[hsl(var(--foreground))]">
                        Order #{order.id.substring(0, 8)}
                      </p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                        {new Date(order.created_at).toLocaleDateString('en-NG', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border uppercase tracking-wider w-fit ${getStatusBadgeStyles(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="mb-4 pb-4 border-b border-[hsl(var(--border))]">
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mb-3">Items ordered:</p>
                    <div className="flex flex-wrap gap-2">
                      {itemsList.slice(0, 5).map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="relative w-10 h-10 rounded-lg bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] overflow-hidden flex items-center justify-center"
                          title={item.name || item.title}
                        >
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name || 'Product'}
                              fill
                              className="object-cover"
                              sizes="40px"
                              unoptimized
                            />
                          ) : (
                            <ShoppingBag className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                          )}
                        </div>
                      ))}
                      {itemsList.length > 5 && (
                        <div className="w-10 h-10 rounded-lg bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] flex items-center justify-center text-xs font-bold text-[hsl(var(--muted-foreground))]">
                          +{itemsList.length - 5}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Total Amount</p>
                      <p className="text-2xl font-bold text-green-500">
                        ₦{Number(order.amount).toLocaleString()}
                      </p>
                    </div>
                    <Link
                      href={`/orders/${order.id}`}
                      className="inline-flex items-center gap-2 text-green-500 font-semibold hover:gap-3 transition-all text-sm"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] space-y-3">
            <Package className="h-12 w-12 text-[hsl(var(--muted-foreground))] mx-auto opacity-50" />
            <div>
              <p className="text-lg font-semibold text-[hsl(var(--foreground))]">No orders yet</p>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                Start shopping to see your orders here.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-block mt-4 bg-green-500 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-green-600 transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}