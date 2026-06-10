'use client'

import { useState, useMemo, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ShopFilters } from '@/components/shop-filters'
import { ProductGrid } from '@/components/product-grid'
import { useCart } from '@/context/CartContext' 
import { marketplaceDatabase, type Product } from '@/database/page'
import Image from 'next/image'

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  
  // 2. INITIALIZE THE ADD TO CART FUNCTION
  const { addToCart } = useCart()

  const [filters, setFilters] = useState({
    category: 'all',
    subcategories: [] as string[],
    priceRange: [0, 200000] as [number, number],
    rating: 0,
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        
        setProducts([...marketplaceDatabase])
      } catch (error) {
        setProducts(marketplaceDatabase)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

 
  const handleAddToCart = (p: any) => {
    // This sends the data to your Cart Context
    addToCart({
      id: String(p.id),
      name: p.title || p.name, 
      price: p.price,
      image: p.image
    })
    

    alert(`${p.title || p.name} added to cart!`)
  }

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (filters.category !== 'all' && product.category.toLowerCase() !== filters.category.toLowerCase()) return false
      if (filters.subcategories.length > 0 && (!product.subcategory || !filters.subcategories.includes(product.subcategory))) return false
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false
      if (filters.rating > 0 && product.rating.rate < filters.rating) return false
      
      const matchesSearch = 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase()))

      return !searchQuery || matchesSearch
    })
  }, [products, filters, searchQuery])

  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB]">
      <Navbar />
      <main className="flex-1">
        <div className="bg-white border-b border-gray-200 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              Marketplace
            </h1>
            <p className="mt-4 max-w-2xl text-base text-gray-500">
              Explore the finest Nigerian-made products.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-4">
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <ShopFilters onFilterChange={(newFilters: any) => setFilters(newFilters)} />
              </div>
            </aside>

            <section className="lg:col-span-3">
              <input
                type="text"
                placeholder="Search brands or products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-6 py-4 text-gray-900 shadow-sm outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/10 mb-8"
              />

              {loading ? (
                <div className="flex h-64 items-center justify-center">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
                </div>
              ) : (
                <ProductGrid
                  products={filteredProducts.map((p) => ({
                    id: String(p.id),
                    name: p.title,
                    price: p.price,
                    image: p.image,
                    category: p.category,
                    rating: p.rating.rate,
                    reviews: p.rating.count,
                    // Passing the product object so handleAddToCart can use it
                    rawProduct: p 
                  }))}
                  // 4. LINK THE CLICK HANDLER HERE
                  onAddToCart={(item: any) => handleAddToCart(item.rawProduct)}
                />
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}