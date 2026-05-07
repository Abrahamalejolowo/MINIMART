'use client'

import { useState, useMemo } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ShopFilters } from '@/components/shop-filters'
import { ProductGrid } from '@/components/product-grid'

// Mock product data
const allProducts = [
  {
    id: '1',
    name: 'Organic Pure Shea Butter',
    price: 4500,
    image: '/shoe1.webp',
    category: 'Beauty',
    rating: 5,
    reviews: 234,
  },
  {
    id: '2',
    name: 'Shoe',
    price: 15000,
    image: '/shoe2.webp',
    category: 'Fashion',
    rating: 5,
    reviews: 156,
  },
  {
    id: '3',
    name: 'Men Shirts',
    price: 3200,
    image: '/store4.webp',
    category: 'Fashion',
    rating: 4,
    reviews: 89,
  },
  {
    id: '4',
    name: '',
    price: 18500,
    image: '/store4.webp',
    category: 'Fashion',
    rating: 5,
    reviews: 120,
  },
  {
    id: '5',
    name: 'Set men T-Shirt',
    price: 8900,
    image: '/store5.webp',
    category: 'Fashion',
    rating: 4,
    reviews: 95,
  },
  {
    id: '6',
     name: 'Set men T-Shirt',
    price: 8900,
    image: '/store5.webp',
    category: 'Fashion',
    rating: 5,
    reviews: 203,
  },
  {
    id: '7',
    name: 'Organic Pure Shea Butter',
    price: 4500,
    image: '/shoe1.webp',
    category: 'Beauty',
    rating: 4,
    reviews: 67,
  },
  {
    id: '8',
    name: 'Shoe',
    price: 15000,
    image: '/shoe2.webp',
    category: 'Home',
    rating: 5,
    reviews: 45,
  },
   {
    id: '9',
    name: 'Organic Pure Shea Butter',
    price: 4500,
    image: '/shoe1.webp',
    category: 'Beauty',
    rating: 5,
    reviews: 234,
  },
  {
    id: '10',
    name: 'Shoe',
    price: 15000,
    image: '/shoe2.webp',
    category: 'Fashion',
    rating: 5,
    reviews: 156,
  },
  {
    id: '11',
    name: 'Men Shirts',
    price: 3200,
    image: '/store4.webp',
    category: 'Fashion',
    rating: 4,
    reviews: 89,
  },
  {
    id: '12',
    name: '',
    price: 18500,
    image: '/store4.webp',
    category: 'Fashion',
    rating: 5,
    reviews: 120,
  },
  {
    id: '13',
    name: 'Set men T-Shirt',
    price: 8900,
    image: '/store5.webp',
    category: 'Fashion',
    rating: 4,
    reviews: 95,
  },
  {
    id: '14',
     name: 'Set men T-Shirt',
    price: 8900,
    image: '/store5.webp',
    category: 'Fashion',
    rating: 5,
    reviews: 203,
  },
  {
    id: '15',
    name: 'Organic Pure Shea Butter',
    price: 4500,
    image: '/shoe1.webp',
    category: 'Beauty',
    rating: 4,
    reviews: 67,
  },
  {
    id: '16',
    name: 'Shoe',
    price: 15000,
    image: '/shoe2.webp',
    category: 'Home',
    rating: 5,
    reviews: 45,
  },
]

interface Filters {
  category: string
  priceRange: [number, number]
  rating: number
}

export default function ShopPage() {
  const [filters, setFilters] = useState<Filters>({
    category: 'all',
    priceRange: [0, 100000],
    rating: 0,
  })
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Category filter
      if (filters.category !== 'all' && product.category.toLowerCase() !== filters.category) {
        return false
      }

      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }

      // Rating filter
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false
      }

      // Search filter
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      return true
    })
  }, [filters, searchQuery])

  const handleAddToCart = (product: typeof allProducts[0]) => {
    console.log('Added to cart:', product)
    // Cart logic will be implemented in the cart context
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl font-bold text-foreground">
              Shop All Products
            </h1>
            <p className="mt-2 text-gray-600">
              Discover authentic, quality Nigerian products
            </p>
          </div>
        </div>

        {/* Shop Content */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <ShopFilters onFilterChange={setFilters} />
            </div>

            {/* Products */}
            <div className="lg:col-span-3">
              {/* Search Bar */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-foreground placeholder-gray-400"
                />
              </div>

              {/* Results Count */}
              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <p className="text-sm text-gray-600">
                  Showing {filteredProducts.length} products
                </p>
              </div>

              {/* Products Grid */}
              <ProductGrid
                products={filteredProducts}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
