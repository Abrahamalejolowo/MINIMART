'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { User, Settings, Heart, Package, LogOut } from 'lucide-react'

type TabType = 'profile' | 'orders' | 'wishlist' | 'settings'

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<TabType>('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: 'Chioma',
    lastName: 'Adeyemi',
    email: 'chioma@example.com',
    phone: '+234 802 123 4567',
    address: '123 Lagos Street',
    city: 'Lagos',
    state: 'Lagos',
    zip: '101245',
  })

  const mockOrders = [
    {
      id: '#MIN001234',
      date: '2024-02-10',
      items: 'Organic Shea Butter x2, Aso-Oke Fabric',
      total: 21500,
      status: 'Delivered',
    },
    {
      id: '#MIN001233',
      date: '2024-02-05',
      items: 'Coral Bead Set x1',
      total: 18500,
      status: 'In Transit',
    },
    {
      id: '#MIN001232',
      date: '2024-01-28',
      items: 'Premium Spiced Kilishi',
      total: 3200,
      status: 'Delivered',
    },
  ]

  const mockWishlist = [
    {
      id: '1',
      name: 'Organic Pure Shea Butter',
      price: 4500,
      image: '/images/product-shea-butter.jpg',
    },
    {
      id: '3',
      name: 'Premium Spiced Kilishi',
      price: 3200,
      image: '/images/product-kilishi.jpg',
    },
    {
      id: '5',
      name: 'Nigerian Indigo Ankara',
      price: 8900,
      image: '/images/category-fashion.jpg',
    },
  ]

  const handleProfileChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    console.log('Profile saved:', profileData)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl font-bold text-foreground">
              My Account
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your profile, orders, and preferences
            </p>
          </div>
        </div>

        {/* Account Content */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="rounded-lg border border-gray-200 bg-white">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex w-full items-center gap-3 px-4 py-3 transition-colors ${
                    activeTab === 'profile'
                      ? 'border-l-4 border-green bg-green/5 text-green'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span className="font-light">Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex w-full items-center gap-3 border-t border-gray-200 px-4 py-3 transition-colors ${
                    activeTab === 'orders'
                      ? 'border-l-4 border-green bg-green/5 text-green'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Package className="h-5 w-5" />
                  <span className="font-light">Orders</span>
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`flex w-full items-center gap-3 border-t border-gray-200 px-4 py-3 transition-colors ${
                    activeTab === 'wishlist'
                      ? 'border-l-4 border-green bg-green/5 text-green'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Heart className="h-5 w-5" />
                  <span className="font-light">Wishlist</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex w-full items-center gap-3 border-t border-gray-200 px-4 py-3 transition-colors ${
                    activeTab === 'settings'
                      ? 'border-l-4 border-green bg-green/5 text-green'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  <span className="font-light">Settings</span>
                </button>
                <button className="flex w-full items-center gap-3 border-t border-gray-200 px-4 py-3 text-red-600 transition-colors hover:bg-red-50">
                  <LogOut className="h-5 w-5" />
                  <span className="font-light">Logout</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="font-heading text-2xl font-bold text-foreground">
                      Personal Information
                    </h2>
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      variant={isEditing ? 'default' : 'outline'}
                      className={
                        isEditing
                          ? 'bg-green text-white'
                          : ''
                      }
                    >
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-light text-foreground">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) =>
                            handleProfileChange('firstName', e.target.value)
                          }
                          disabled={!isEditing}
                          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-foreground">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={profileData.lastName}
                          onChange={(e) =>
                            handleProfileChange('lastName', e.target.value)
                          }
                          disabled={!isEditing}
                          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 disabled:bg-gray-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-light text-foreground">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          handleProfileChange('email', e.target.value)
                        }
                        disabled={!isEditing}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 disabled:bg-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-light text-foreground">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) =>
                          handleProfileChange('phone', e.target.value)
                        }
                        disabled={!isEditing}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 disabled:bg-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-light text-foreground">
                        Address
                      </label>
                      <input
                        type="text"
                        value={profileData.address}
                        onChange={(e) =>
                          handleProfileChange('address', e.target.value)
                        }
                        disabled={!isEditing}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 disabled:bg-gray-100"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-light text-foreground">
                          City
                        </label>
                        <input
                          type="text"
                          value={profileData.city}
                          onChange={(e) =>
                            handleProfileChange('city', e.target.value)
                          }
                          disabled={!isEditing}
                          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-foreground">
                          State
                        </label>
                        <input
                          type="text"
                          value={profileData.state}
                          onChange={(e) =>
                            handleProfileChange('state', e.target.value)
                          }
                          disabled={!isEditing}
                          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-foreground">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          value={profileData.zip}
                          onChange={(e) =>
                            handleProfileChange('zip', e.target.value)
                          }
                          disabled={!isEditing}
                          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 disabled:bg-gray-100"
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <Button
                        onClick={handleSaveProfile}
                        className="mt-6 w-full bg-green text-white hover:bg-green/90"
                      >
                        Save Changes
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <h2 className="mb-6 font-heading text-2xl font-bold text-foreground">
                    Order History
                  </h2>
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                      >
                        <div>
                          <p className="font-light text-foreground">{order.id}</p>
                          <p className="text-sm text-gray-600">{order.items}</p>
                          <p className="text-xs text-gray-500">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green">
                            ₦{order.total.toLocaleString()}
                          </p>
                          <span
                            className={`text-xs font-light ${
                              order.status === 'Delivered'
                                ? 'text-green-600'
                                : 'text-blue-600'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <h2 className="mb-6 font-heading text-2xl font-bold text-foreground">
                    My Wishlist
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {mockWishlist.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-lg border border-gray-200 p-4"
                      >
                        <div className="relative mb-3 h-40 w-full overflow-hidden rounded-lg bg-gray-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <h3 className="font-light text-foreground">
                          {item.name}
                        </h3>
                        <p className="mt-2 font-heading text-lg font-bold text-green">
                          ₦{item.price.toLocaleString()}
                        </p>
                        <Button className="mt-3 w-full bg-green text-white hover:bg-green/90">
                          Add to Cart
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <h2 className="mb-6 font-heading text-2xl font-bold text-foreground">
                    Account Settings
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-200 py-4">
                      <div>
                        <p className="font-light text-foreground">
                          Email Notifications
                        </p>
                        <p className="text-sm text-gray-600">
                          Get updates about orders and promotions
                        </p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-5 w-5" />
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-200 py-4">
                      <div>
                        <p className="font-light text-foreground">
                          SMS Notifications
                        </p>
                        <p className="text-sm text-gray-600">
                          Receive delivery updates via SMS
                        </p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-5 w-5" />
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-200 py-4">
                      <div>
                        <p className="font-light text-foreground">
                          Marketing Emails
                        </p>
                        <p className="text-sm text-gray-600">
                          Get exclusive deals and offers
                        </p>
                      </div>
                      <input type="checkbox" className="h-5 w-5" />
                    </div>
                    <div className="mt-6 flex gap-4">
                      <Button variant="outline" className="flex-1">
                        Change Password
                      </Button>
                      <Button variant="outline" className="flex-1 text-red-600 hover:bg-red-50">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
