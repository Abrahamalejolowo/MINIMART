'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  LogOut,
  Search,
  Filter,
  TrendingUp,
  Package,
  DollarSign,
  CheckCircle,
  ArrowRight,
  ShoppingBag,
  Layers,
  ChevronDown,
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

const ITEMS_PER_PAGE = 10

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const router = useRouter()

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [orders, filter, search])

 const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/orders')
      const { orders: data, error } = await response.json()

      if (error) {
        throw new Error(error)
      }

      setOrders(data || [])
    } catch (err) {
      console.error('Error fetching orders:', err)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...orders]

    if (filter !== 'all') {
      filtered = filtered.filter((o) => o.status === filter)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(
        (o) =>
          o.id.toLowerCase().includes(searchLower) ||
          o.user_name.toLowerCase().includes(searchLower)
      )
    }

    setFilteredOrders(filtered)
    setVisibleCount(ITEMS_PER_PAGE)
  }

  const handleLogout = () => {
    document.cookie = 'admin_logged_in=; path=/; max-age=0'
    router.push('/admin/login')
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE)
  }

  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-[hsl(var(--green)/0.12)] text-green-500 border-[hsl(var(--green)/0.3)]'
      case 'processing':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/20'
      case 'shipped':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
      case 'delivered':
        return 'bg-[hsl(var(--green)/0.12)] text-green-500 border-[hsl(var(--green)/0.3)]'
      default:
        return 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))]'
    }
  }

  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0)
  const processingCount = orders.filter((o) => o.status === 'processing').length
  const deliveredCount = orders.filter((o) => o.status === 'delivered').length

  const visibleOrders = filteredOrders.slice(0, visibleCount)
  const hasMoreOrders = visibleCount < filteredOrders.length

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-[hsl(var(--card))] border-b border-[hsl(var(--border))] shadow-xs backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500 text-[hsl(var(--green-foreground))] flex items-center justify-center font-bold shadow-xs">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                Admin Dashboard
              </h1>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">Minimart Store Management</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-[hsl(var(--destructive)/0.1)] hover:bg-[hsl(var(--destructive)/0.18)] text-[hsl(var(--destructive))] px-3.5 py-2 rounded-lg font-medium text-xs border border-[hsl(var(--destructive)/0.2)] transition-all cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* KPI / Stats Grid */}
        {!loading && orders.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-4 sm:p-5 shadow-xs transition-all hover:border-[hsl(var(--green)/0.4)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Total Orders
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-[hsl(var(--card-foreground))] mt-1">
                    {orders.length}
                  </p>
                </div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[hsl(var(--green)/0.12)] text-green-500 flex items-center justify-center shrink-0">
                  <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
              </div>
            </div>

            <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-4 sm:p-5 shadow-xs transition-all hover:border-[hsl(var(--green)/0.4)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Total Revenue
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-green-500 mt-1">
                    ₦{totalRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[hsl(var(--green)/0.12)] text-green-500 flex items-center justify-center shrink-0">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
              </div>
            </div>

            <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-4 sm:p-5 shadow-xs transition-all hover:border-amber-500/40">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Processing
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                    {processingCount}
                  </p>
                </div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
              </div>
            </div>

            <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-4 sm:p-5 shadow-xs transition-all hover:border-[hsl(var(--green)/0.4)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Delivered
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-green-500 mt-1">
                    {deliveredCount}
                  </p>
                </div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[hsl(var(--green)/0.12)] text-green-500 flex items-center justify-center shrink-0">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter & Search Controls */}
        <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-4 shadow-xs">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
              <input
                type="text"
                placeholder="Search by Order ID or Customer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs font-medium bg-[hsl(var(--background))] border border-[hsl(var(--input))] rounded-lg text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[hsl(var(--muted-foreground))] shrink-0" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-2.5 text-xs font-medium bg-[hsl(var(--background))] border border-[hsl(var(--input))] rounded-lg text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] transition-all"
              >
                <option value="all">All Orders</option>
                <option value="paid">Paid</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Container */}
        {loading ? (
          <div className="text-center py-16 bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] shadow-xs">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-green-500 border-t-transparent mb-2"></div>
            <p className="text-xs text-[hsl(var(--muted-foreground))] font-medium">Loading orders...</p>
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {/* Mobile Card Layout (Visible on small screens < sm) */}
            <div className="block sm:hidden space-y-3">
              {visibleOrders.map((order) => {
                const itemsList = Array.isArray(order.items) ? order.items : []
                return (
                  <div
                    key={order.id}
                    onClick={() => router.push(`/admin/orders/${order.id}`)}
                    className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-4 shadow-xs active:bg-[hsl(var(--secondary)/0.5)] transition-colors cursor-pointer space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs text-[hsl(var(--foreground))]">
                        #{order.id.substring(0, 8)}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border uppercase tracking-wider ${getStatusBadgeStyles(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-[hsl(var(--foreground))]">{order.user_name}</p>
                        <p className="text-[11px] text-[hsl(var(--muted-foreground))]">
                          {new Date(order.created_at).toLocaleDateString('en-NG', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[hsl(var(--foreground))]">
                          ₦{Number(order.amount).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[hsl(var(--border))] flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {itemsList.slice(0, 3).map((item: any, idx: number) => (
                          <div
                            key={idx}
                            className="relative w-7 h-7 rounded-md bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] overflow-hidden flex items-center justify-center shrink-0"
                          >
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.name || 'Product'}
                                fill
                                className="object-cover"
                                sizes="28px"
                                unoptimized
                              />
                            ) : (
                              <ShoppingBag className="w-3 h-3 text-[hsl(var(--muted-foreground))]" />
                            )}
                          </div>
                        ))}
                        {itemsList.length > 3 && (
                          <div className="w-7 h-7 rounded-md bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] flex items-center justify-center text-[10px] font-bold text-[hsl(var(--muted-foreground))]">
                            +{itemsList.length - 3}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-green-500 font-semibold text-xs">
                        <span>Details</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Desktop Table View (Hidden on mobile < sm) */}
            <div className="hidden sm:block bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--secondary)/0.5)]">
                      <th className="px-6 py-3.5 font-semibold text-[hsl(var(--muted-foreground))]">Order ID</th>
                      <th className="px-6 py-3.5 font-semibold text-[hsl(var(--muted-foreground))]">Customer</th>
                      <th className="px-6 py-3.5 font-semibold text-[hsl(var(--muted-foreground))]">Items</th>
                      <th className="px-6 py-3.5 font-semibold text-[hsl(var(--muted-foreground))] text-right">Amount</th>
                      <th className="px-6 py-3.5 font-semibold text-[hsl(var(--muted-foreground))] text-center">Status</th>
                      <th className="px-6 py-3.5 font-semibold text-[hsl(var(--muted-foreground))]">Date</th>
                      <th className="px-6 py-3.5 font-semibold text-[hsl(var(--muted-foreground))] text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[hsl(var(--border))]">
                    {visibleOrders.map((order) => {
                      const itemsList = Array.isArray(order.items) ? order.items : []
                      return (
                        <tr
                          key={order.id}
                          className="hover:bg-[hsl(var(--secondary)/0.3)] transition-colors"
                        >
                          <td className="px-6 py-4 font-mono font-semibold text-[hsl(var(--foreground))]">
                            #{order.id.substring(0, 8)}
                          </td>
                          <td className="px-6 py-4 font-medium text-[hsl(var(--foreground))]">
                            {order.user_name}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5">
                              {itemsList.slice(0, 3).map((item: any, idx: number) => (
                                <div
                                  key={idx}
                                  className="relative w-8 h-8 rounded-lg bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] overflow-hidden flex items-center justify-center shrink-0"
                                  title={item.name || item.title}
                                >
                                  {item.image ? (
                                    <Image
                                      src={item.image}
                                      alt={item.name || 'Product'}
                                      fill
                                      className="object-cover"
                                      sizes="32px"
                                      unoptimized
                                    />
                                  ) : (
                                    <ShoppingBag className="w-3.5 h-3.5 text-[hsl(var(--muted-foreground))]" />
                                  )}
                                </div>
                              ))}
                              {itemsList.length > 3 && (
                                <div className="w-8 h-8 rounded-lg bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] flex items-center justify-center text-[10px] font-bold text-[hsl(var(--muted-foreground))]">
                                  +{itemsList.length - 3}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right font-semibold text-[hsl(var(--foreground))]">
                            ₦{Number(order.amount).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border uppercase tracking-wider ${getStatusBadgeStyles(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-[hsl(var(--muted-foreground))] whitespace-nowrap">
                            {new Date(order.created_at).toLocaleDateString('en-NG', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Link
                              href={`/admin/orders/${order.id}`}
                              className="inline-flex items-center gap-1 text-green-500 font-bold transition-all"
                            >
                              <span>View</span>
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Load More Button & Record Count Status */}
            <div className="flex flex-col items-center justify-center space-y-2 pt-2">
              <p className="text-xs text-[hsl(var(--muted-foreground))] font-medium">
                Showing {visibleOrders.length} of {filteredOrders.length} orders
              </p>
              {hasMoreOrders && (
                <button
                  onClick={handleLoadMore}
                  className="inline-flex items-center gap-2 bg-[hsl(var(--card))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] px-5 py-2.5 rounded-xl font-medium text-xs shadow-xs transition-all cursor-pointer"
                >
                  <span>See More Orders</span>
                  <ChevronDown className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] shadow-xs space-y-2">
            <Package className="h-8 w-8 text-[hsl(var(--muted-foreground))] mx-auto opacity-50" />
            <p className="text-sm font-semibold text-[hsl(var(--foreground))]">No orders found</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))] max-w-sm mx-auto">
              {search || filter !== 'all'
                ? 'Try adjusting your search query or filter settings.'
                : 'No order records currently exist in your database.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}