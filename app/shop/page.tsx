'use client'

import { useState, useMemo, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ShopFilters } from '@/components/shop-filters'
import { ProductGrid } from '@/components/product-grid'

// --- TYPES ---
interface Product {
  id: string | number
  title: string
  price: number
  image: any 
  category: string
  subcategory?: string
  brand?: string
  description: string
  rating: {
    rate: number
    count: number
  }
}

// --- NIGERIAN PRODUCT DATA ---
const NIGERIAN_PRODUCTS: Product[] = [
  {
    id: 'nerolit-1',
    title: "Handcrafted Black Leather Sneakers",
    price: 10000,
    brand: "Nerolit Handmade",
    image: "/Sneakers.avif", 
    category: "footwear",
    subcategory: "Sneakers",
    description: "Premium handcrafted black leather sneakers by Nerolit Handmade.",
    rating: { rate: 4.8, count: 42 }
  },
  {
    id: 'pongo-1',
    title: "Handcrafted Brown Loafers",
    price: 18000,
    brand: "Pongo Bespoke",
    image: "/BrownLoawers.webp", 
    category: "footwear",
    subcategory: "Loafers",
    description: "Elegant bespoke brown loafers by Pongo Bespoke.",
    rating: { rate: 4.9, count: 28 }
  },
  {
    id: 'bello-1',
    title: "Handmade Palm Slippers",
    price: 7500,
    brand: "Bello Leather Works",
    image: "/handmade.jpg", 
    category: "footwear",
    subcategory: "Sandals",
    description: "Quality leather palm slippers by Bello Leather Works.",
    rating: { rate: 4.6, count: 53 }
  }
]

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  
  // FILTER STATE
  const [filters, setFilters] = useState({
    category: 'all',
    subcategories: [] as string[],
    priceRange: [0, 100000] as [number, number],
    rating: 0,
  })

  // 1. DATA INITIALIZATION
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products')
        const apiData = await response.json()
        
        // Clean API categories to match our lowercase system
        const cleanedApiData = apiData.map((p: any) => ({
          ...p,
          category: p.category.includes("clothing") ? "fashion" : p.category
        }))

        setProducts([...NIGERIAN_PRODUCTS, ...cleanedApiData])
      } catch (error) {
        console.error('Error loading products:', error)
        setProducts(NIGERIAN_PRODUCTS)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // 2. FILTERING ENGINE
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category Match
      if (filters.category !== 'all' && product.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false
      }

      // Subcategory Match (Supports picking one, multiple, or none for "All")
      if (filters.subcategories.length > 0) {
        if (!product.subcategory || !filters.subcategories.includes(product.subcategory)) {
          return false
        }
      }

      // Price Range Match
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }

      // Rating Match
      if (filters.rating > 0 && product.rating.rate < filters.rating) {
        return false
      }

      // Search Query Match
      if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      return true
    })
  }, [products, filters, searchQuery])

  const handleAddToCart = (product: any) => {
    console.log('Cart Interaction:', product.name)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB]">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <div className="bg-white border-b border-gray-200 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Marketplace
            </h1>
            <p className="mt-4 max-w-2xl text-base text-gray-500">
              Explore the finest Nigerian-made products, from handcrafted footwear to organic skincare.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-4">
            
            {/* LEFT: FILTERS SIDEBAR */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <ShopFilters onFilterChange={(newFilters: any) => setFilters(newFilters)} />
              </div>
            </aside>

            {/* RIGHT: SEARCH & PRODUCTS */}
            <section className="lg:col-span-3">
              {/* Search Bar */}
              <div className="relative mb-8">
                <input
                  type="text"
                  placeholder="Search for brands, products, or styles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-6 py-4 text-gray-900 shadow-sm outline-none transition-all focus:border-green-600 focus:ring-2 focus:ring-green-600/10"
                />
              </div>

              {/* Stats Bar */}
              <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  {loading ? "Searching..." : `${filteredProducts.length} Results Found`}
                </p>
              </div>

              {/* Loader */}
              {loading ? (
                <div className="flex h-64 items-center justify-center">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
                </div>
              ) : (
                /* Product Grid */
                <ProductGrid
                  products={filteredProducts.map((p) => ({
                    id: String(p.id),
                    name: p.title,
                    price: p.price,
                    image: p.image,
                    category: p.category,
                    rating: p.rating.rate,
                    reviews: p.rating.count,
                  }))}
                  onAddToCart={handleAddToCart}
                />
              )}

              {/* Empty State */}
              {!loading && filteredProducts.length === 0 && (
                <div className="mt-20 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">No products found</h3>
                  <p className="mt-2 text-gray-500">Try adjusting your filters or search query.</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}