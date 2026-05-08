'use client'

import { useState, useMemo, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ShopFilters } from '@/components/shop-filters'
import { ProductGrid } from '@/components/product-grid'

interface Product {
  id: number
  title: string
  price: number
  image: string
  category: string
  description: string
  rating: {
    rate: number
    count: number
  }
}

interface Filters {
  category: string
  priceRange: [number, number]
  rating: number
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const [filters, setFilters] = useState<Filters>({
    category: 'all',
    priceRange: [0, 100000],
    rating: 0,
  })

  const [searchQuery, setSearchQuery] = useState('')

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json()

        setProducts(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching products:', error)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // FILTER PRODUCTS
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (
        filters.category !== 'all' &&
        product.category.toLowerCase() !== filters.category
      ) {
        return false
      }

      // Price filter
      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false
      }

      // Rating filter
      if (
        filters.rating > 0 &&
        product.rating.rate < filters.rating
      ) {
        return false
      }

      // Search filter
      if (
        searchQuery &&
        !product.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      return true
    })
  }, [products, filters, searchQuery])

  // ADD TO CART
  const handleAddToCart = (product: any) => {
    console.log('Added to cart:', product)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background" id="shop">
      <Navbar />

      <main className="flex-1">

        {/* HEADER */}
        <div className="border-b border-gray-200 bg-white py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
              Shop All Products
            </h1>

            <p className="mt-3 text-gray-600">
              Discover authentic, quality Nigerian products
            </p>

          </div>
        </div>

        {/* SHOP CONTENT */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

          <div className="grid gap-8 lg:grid-cols-4">

            {/* FILTERS */}
            <div className="lg:col-span-1">
              <ShopFilters onFilterChange={setFilters} />
            </div>

            {/* PRODUCTS */}
            <div className="lg:col-span-3">

              {/* SEARCH */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-foreground placeholder-gray-400 outline-none focus:border-green-600"
                />
              </div>

              {/* RESULTS */}
              <div className="mb-6">
                <p className="text-sm text-gray-600">
                  Showing {filteredProducts.length} products
                </p>
              </div>

              {/* LOADING */}
              {loading ? (
                <div className="flex items-center justify-center py-32">
                  <p className="text-lg text-gray-600">
                    Loading products...
                  </p>
                </div>
              ) : (

                <ProductGrid
                  products={filteredProducts.map((product) => ({
                    id: String(product.id),
                    name: product.title,
                    price: product.price,
                    image: product.image,
                    category: product.category,
                    rating: product.rating.rate,
                    reviews: product.rating.count,
                  }))}
                  onAddToCart={handleAddToCart}
                />

              )}

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}