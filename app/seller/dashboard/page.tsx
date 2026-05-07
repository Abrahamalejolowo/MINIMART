'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import {
  Package,
  TrendingUp,
  Users,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Plus,
  MoreVertical,
  AlertCircle,
} from 'lucide-react'

type TabType = 'overview' | 'products' | 'orders' | 'analytics'

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [showProductForm, setShowProductForm] = useState(false)

  const stats = [
    { label: 'Total Sales', value: '₦456,800', icon: DollarSign, change: '+12%' },
    { label: 'Orders', value: '128', icon: Package, change: '+8%' },
    { label: 'Customers', value: '342', icon: Users, change: '+15%' },
    { label: 'Views', value: '8.5K', icon: Eye, change: '+23%' },
  ]

  const sellerProducts = [
    {
      id: 1,
      name: 'Organic Pure Shea Butter',
      price: 4500,
      stock: 145,
      sales: 234,
      rating: 4.8,
      status: 'Active',
    },
    {
      id: 2,
      name: 'Hand-woven Aso-Oke Fabric',
      price: 12500,
      stock: 32,
      sales: 156,
      rating: 5,
      status: 'Active',
    },
    {
      id: 3,
      name: 'Premium Spiced Kilishi',
      price: 3200,
      stock: 0,
      sales: 89,
      rating: 4.5,
      status: 'Out of Stock',
    },
  ]

  const sellerOrders = [
    {
      id: '#MIN001240',
      customer: 'Chioma A.',
      items: 2,
      total: 9000,
      status: 'Processing',
      date: '2024-02-14',
    },
    {
      id: '#MIN001239',
      customer: 'Tunde O.',
      items: 1,
      total: 12500,
      status: 'Shipped',
      date: '2024-02-13',
    },
    {
      id: '#MIN001238',
      customer: 'Zainab M.',
      items: 3,
      total: 21500,
      status: 'Delivered',
      date: '2024-02-12',
    },
  ]

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Product added')
    setShowProductForm(false)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl font-bold text-foreground">
              Seller Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your products, orders, and store analytics
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Stats Overview */}
          {activeTab === 'overview' && (
            <>
              <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div
                      key={stat.label}
                      className="rounded-lg border border-gray-200 bg-white p-6"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-gray-600">{stat.label}</p>
                          <p className="mt-2 font-heading text-3xl font-bold text-foreground">
                            {stat.value}
                          </p>
                          <p className="mt-1 text-xs font-light text-green-600">
                            {stat.change} this month
                          </p>
                        </div>
                        <Icon className="h-8 w-8 text-green" />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Analytics Charts (Placeholder) */}
              <div className="grid gap-8 lg:grid-cols-2">
                {/* Sales Chart */}
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <h3 className="mb-6 font-heading font-bold text-foreground">
                    Sales Trend
                  </h3>
                  <div className="flex h-64 items-center justify-center rounded-lg bg-gray-50">
                    <div className="text-center">
                      <TrendingUp className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-gray-600">Sales chart visualization</p>
                    </div>
                  </div>
                </div>

                {/* Top Products */}
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <h3 className="mb-6 font-heading font-bold text-foreground">
                    Top Products
                  </h3>
                  <div className="space-y-4">
                    {sellerProducts.slice(0, 3).map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between border-b border-gray-200 pb-4"
                      >
                        <div>
                          <p className="font-light text-foreground">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {product.sales} sales
                          </p>
                        </div>
                        <p className="font-bold text-green">
                          ₦{product.price.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="rounded-lg border border-gray-200 bg-white">
              <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  My Products
                </h2>
                <Button
                  onClick={() => setShowProductForm(!showProductForm)}
                  className="gap-2 bg-green text-white hover:bg-green/90"
                >
                  <Plus className="h-4 w-4" />
                  Add Product
                </Button>
              </div>

              {/* Add Product Form */}
              {showProductForm && (
                <div className="border-b border-gray-200 p-6">
                  <form onSubmit={handleAddProduct} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-light text-foreground">
                          Product Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter product name"
                          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-foreground">
                          Price
                        </label>
                        <input
                          type="number"
                          placeholder="0.00"
                          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-light text-foreground">
                          Stock Quantity
                        </label>
                        <input
                          type="number"
                          placeholder="0"
                          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-foreground">
                          Category
                        </label>
                        <select className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2">
                          <option>Select category</option>
                          <option>Fashion</option>
                          <option>Beauty</option>
                          <option>Food</option>
                          <option>Home</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-light text-foreground">
                        Description
                      </label>
                      <textarea
                        placeholder="Describe your product"
                        rows={4}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
                        required
                      ></textarea>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="submit"
                        className="flex-1 bg-green text-white hover:bg-green/90"
                      >
                        Add Product
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setShowProductForm(false)}
                        variant="outline"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Products Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-light text-gray-600">
                        Product
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-light text-gray-600">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-light text-gray-600">
                        Stock
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-light text-gray-600">
                        Sales
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-light text-gray-600">
                        Rating
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-light text-gray-600">
                        Status
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-light text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellerProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <p className="font-light text-foreground">
                            {product.name}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-green">
                            ₦{product.price.toLocaleString()}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p
                            className={`font-light ${
                              product.stock === 0
                                ? 'text-red-600'
                                : 'text-foreground'
                            }`}
                          >
                            {product.stock}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-foreground">{product.sales}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-foreground">
                            ⭐ {product.rating}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-light ${
                              product.status === 'Active'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {product.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button className="text-gray-500 hover:text-green">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-gray-500 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="rounded-lg border border-gray-200 bg-white">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Recent Orders
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200 bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-light text-gray-600">
                        Order ID
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-light text-gray-600">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-light text-gray-600">
                        Items
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-light text-gray-600">
                        Total
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-light text-gray-600">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-light text-gray-600">
                        Date
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-light text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellerOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <p className="font-bold text-foreground">{order.id}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-foreground">{order.customer}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-foreground">{order.items} items</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-green">
                            ₦{order.total.toLocaleString()}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-light ${
                              order.status === 'Processing'
                                ? 'bg-blue-100 text-blue-700'
                                : order.status === 'Shipped'
                                  ? 'bg-orange-100 text-orange-700'
                                  : 'bg-green-100 text-green-700'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button className="text-gray-500 hover:text-green">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-6 font-heading font-bold text-foreground">
                  Sales Analytics
                </h3>
                <div className="flex h-64 items-center justify-center rounded-lg bg-gray-50">
                  <div className="text-center">
                    <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-gray-600">
                      Analytics chart coming soon
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-6 font-heading font-bold text-foreground">
                  Customer Insights
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-gray-200 pb-4">
                    <p className="text-gray-600">Total Customers</p>
                    <p className="font-bold text-foreground">342</p>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-4">
                    <p className="text-gray-600">Repeat Customers</p>
                    <p className="font-bold text-foreground">126 (37%)</p>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-4">
                    <p className="text-gray-600">Avg Order Value</p>
                    <p className="font-bold text-green">₦3,560</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Customer Rating</p>
                    <p className="font-bold text-foreground">4.8 ⭐</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8">
              {(['overview', 'products', 'orders', 'analytics'] as TabType[]).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`border-b-2 px-4 py-4 font-light capitalize transition-colors ${
                      activeTab === tab
                        ? 'border-green text-green'
                        : 'border-transparent text-gray-600 hover:text-foreground'
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Add padding to prevent content from hiding behind tab nav */}
      <div className="h-20"></div>

      <Footer />
    </div>
  )
}
