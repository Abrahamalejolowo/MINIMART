'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Package,
  Truck,
  User,
  MapPin,
  CreditCard,
  Calendar,
  ShoppingBag,
  ShieldCheck,
  Copy,
  Check,
  Mail,
  Phone,
} from 'lucide-react'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface Order {
  id: string
  user_name: string
  user_email: string
  user_phone: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  country: string
  postal_code: string
  amount: number
  currency: string
  status: string
  items: OrderItem[]
  created_at: string
  flutterwave_tx_id?: string
}

const STATUS_STEPS = [
  { key: 'paid', label: 'Paid', icon: CreditCard, description: 'Payment confirmed' },
  { key: 'processing', label: 'Processing', icon: Clock, description: 'Fulfilling order' },
  { key: 'shipped', label: 'Shipped', icon: Truck, description: 'In transit' },
  { key: 'delivered', label: 'Delivered', icon: CheckCircle2, description: 'Order completed' },
]

async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    const response = await fetch('/api/admin/orders/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, status: newStatus }),
    })

    const data = await response.json()
    return data
  } catch (err: any) {
    return { error: err.message, success: false }
  }
}

export default function OrderDetailsClient({ order: initialOrder }: { order: Order }) {
  const [order, setOrder] = useState(initialOrder)
  const [isUpdating, setIsUpdating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const statusIndex = STATUS_STEPS.findIndex((s) => s.key === order.status)

  const handleCopyId = () => {
    navigator.clipboard.writeText(order.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === order.status) return

    try {
      setIsUpdating(true)
      setMessage(null)

      const result = await updateOrderStatus(order.id, newStatus)

      if (result.success) {
        setOrder({ ...order, status: newStatus })
        setMessage({ type: 'success', text: `Order status updated to ${newStatus.toUpperCase()}` })
        setTimeout(() => setMessage(null), 4000)
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to update status' })
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--secondary)/0.2)] p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Orders
          </Link>

          <div className="flex items-center gap-2 text-xs font-medium text-[hsl(var(--muted-foreground))] bg-[hsl(var(--card))] px-3 py-1.5 rounded-full border border-[hsl(var(--border))] shadow-xs">
            <Calendar size={14} className="text-green-500" />
            <span>
              {new Date(order.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>

        {/* Header Block */}
        <div className="bg-[hsl(var(--card))] rounded-2xl p-6 border border-[hsl(var(--border))] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                  Order Details
                </span>
                <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-[hsl(var(--green)/0.15)] text-green-500 border border-[hsl(var(--green)/0.3)] capitalize">
                  {order.status}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[hsl(var(--foreground))] break-all">
                  #{order.id}
                </h1>
                <button
                  onClick={handleCopyId}
                  className="p-1.5 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] rounded-md transition-colors shrink-0"
                  title="Copy Order ID"
                >
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {/* Quick Status Control */}
            <div className="flex items-center gap-3 bg-[hsl(var(--secondary)/0.5)] p-2 rounded-xl border border-[hsl(var(--border))] shrink-0">
              <span className="text-xs font-medium text-[hsl(var(--muted-foreground))] pl-1">Status:</span>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                disabled={isUpdating}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[hsl(var(--background))] border border-[hsl(var(--input))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] disabled:opacity-50 cursor-pointer"
              >
                {STATUS_STEPS.map((step) => (
                  <option key={step.key} value={step.key}>
                    {step.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="pt-4 border-t border-[hsl(var(--border))]">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STATUS_STEPS.map((step, idx) => {
                const Icon = step.icon
                const isPassed = idx <= statusIndex
                const isCurrent = idx === statusIndex

                return (
                  <div
                    key={step.key}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-[hsl(var(--green)/0.08)] border-green-500 shadow-xs'
                        : isPassed
                        ? 'bg-[hsl(var(--card))] border-[hsl(var(--border))] opacity-90'
                        : 'bg-[hsl(var(--secondary)/0.3)] border-[hsl(var(--border)/0.5)] opacity-40'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isPassed
                          ? 'bg-green-500 text-white'
                          : 'bg-[hsl(var(--secondary))] text-[hsl(var(--muted-foreground))]'
                      }`}
                    >
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[hsl(var(--foreground))] truncate">{step.label}</p>
                      <p className="text-[10px] text-[hsl(var(--muted-foreground))] truncate">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Alert Banner */}
        {message && (
          <div
            className={`p-4 rounded-xl text-sm font-medium border transition-all ${
              message.type === 'success'
                ? 'bg-[hsl(var(--green)/0.1)] border-[hsl(var(--green)/0.3)] text-green-500'
                : 'bg-[hsl(var(--destructive)/0.1)] border-[hsl(var(--destructive)/0.3)] text-[hsl(var(--destructive))]'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Left Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Items Card */}
            <div className="bg-[hsl(var(--card))] rounded-2xl border border-[hsl(var(--border))] shadow-xs overflow-hidden">
              <div className="p-5 border-b border-[hsl(var(--border))] flex items-center justify-between">
                <h2 className="text-sm font-semibold text-[hsl(var(--card-foreground))] flex items-center gap-2">
                  <ShoppingBag size={16} className="text-green-500" />
                  Items Ordered
                </h2>
                <span className="text-xs font-medium text-[hsl(var(--muted-foreground))] bg-[hsl(var(--secondary))] px-2.5 py-0.5 rounded-full">
                  {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              <div className="divide-y divide-[hsl(var(--border))]">
                {order.items.map((item) => (
                  <div key={item.id} className="p-4 sm:p-5 flex items-center gap-4 hover:bg-[hsl(var(--secondary)/0.2)] transition-colors">
                    <div className="w-14 h-14 rounded-xl bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] shrink-0 overflow-hidden flex items-center justify-center">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <ShoppingBag size={18} className="text-[hsl(var(--muted-foreground))]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-[hsl(var(--foreground))] truncate">{item.name}</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                        Qty: {item.quantity} × ₦{item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-semibold text-sm text-[hsl(var(--foreground))]">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer & Address Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Customer Info Card */}
              <div className="bg-[hsl(var(--card))] rounded-2xl p-5 border border-[hsl(var(--border))] shadow-xs space-y-3">
                <h2 className="text-sm font-semibold text-[hsl(var(--card-foreground))] flex items-center gap-2 border-b border-[hsl(var(--border))] pb-3">
                  <User size={16} className="text-green-500" />
                  Customer Details
                </h2>
                <div className="space-y-2.5 text-xs pt-1">
                  <div>
                    <span className="text-[hsl(var(--muted-foreground))] block mb-0.5">Full Name</span>
                    <span className="font-semibold text-[hsl(var(--foreground))] text-sm">{order.user_name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                    <Mail size={14} className="shrink-0" />
                    <span className="font-medium text-[hsl(var(--foreground))] truncate">{order.user_email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                    <Phone size={14} className="shrink-0" />
                    <span className="font-medium text-[hsl(var(--foreground))]">{order.user_phone}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Address Card */}
              <div className="bg-[hsl(var(--card))] rounded-2xl p-5 border border-[hsl(var(--border))] shadow-xs space-y-3">
                <h2 className="text-sm font-semibold text-[hsl(var(--card-foreground))] flex items-center gap-2 border-b border-[hsl(var(--border))] pb-3">
                  <MapPin size={16} className="text-green-500" />
                  Shipping Address
                </h2>
                <div className="text-xs leading-relaxed text-[hsl(var(--foreground))] space-y-1 pt-1">
                  <p className="font-semibold text-sm">{order.address_line1}</p>
                  {order.address_line2 && <p>{order.address_line2}</p>}
                  <p className="text-[hsl(var(--muted-foreground))]">
                    {order.city}, {order.state} {order.postal_code}
                  </p>
                  <p className="font-medium text-[hsl(var(--foreground))] pt-1">{order.country}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="bg-[hsl(var(--card))] rounded-2xl p-5 border border-[hsl(var(--border))] shadow-xs sticky top-6 space-y-5">
              <h2 className="text-sm font-semibold text-[hsl(var(--card-foreground))] border-b border-[hsl(var(--border))] pb-3">
                Payment Breakdown
              </h2>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-[hsl(var(--muted-foreground))]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[hsl(var(--foreground))]">₦{order.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[hsl(var(--muted-foreground))]">
                  <span>Shipping Fee</span>
                  <span className="text-green-500 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-[hsl(var(--muted-foreground))]">
                  <span>Tax</span>
                  <span className="font-medium text-[hsl(var(--foreground))]">₦0</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-[hsl(var(--border))]">
                <span className="text-sm font-semibold text-[hsl(var(--foreground))]">Total</span>
                <span className="text-xl font-extrabold text-green-500">
                  ₦{order.amount.toLocaleString()}
                </span>
              </div>

              <div className="pt-3 border-t border-[hsl(var(--border))] space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[hsl(var(--muted-foreground))]">Payment Status</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-green-500 bg-[hsl(var(--green)/0.1)] px-2.5 py-0.5 rounded-full">
                    <ShieldCheck size={12} /> Paid
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[hsl(var(--muted-foreground))]">Currency</span>
                  <span className="font-semibold text-[hsl(var(--foreground))]">{order.currency}</span>
                </div>

                {order.flutterwave_tx_id && (
                  <div className="pt-2">
                    <span className="text-[hsl(var(--muted-foreground))] block mb-1">Transaction Ref</span>
                    <span className="font-mono text-[11px] bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] p-2 rounded-lg block break-all border border-[hsl(var(--border))]">
                      {order.flutterwave_tx_id}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}