'use client'

import { useState, useMemo, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ShopFilters } from '@/components/shop-filters'
import { ProductGrid } from '@/components/product-grid'
import { useCart } from '@/context/CartContext' 
import { marketplaceDatabase, type Product } from '@/database/page'
import Image from 'next/image'
import { ShoppingCart, Heart, X, Star } from 'lucide-react'

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Track currently selected product for the popup modal view
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  
  // INITIALIZE THE ADD TO CART FUNCTION
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
    addToCart({
      id: String(p.id),
      name: p.title || p.name, 
      price: p.price,
      image: p.image
    })
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
                    rawProduct: p 
                  }))}
                  onAddToCart={(item: any) => handleAddToCart(item.rawProduct)}
                  // Pass the click handler into the product grid so clicking elements triggers the popup
                  onProductClick={(item: any) => setSelectedProduct(item.rawProduct)}
                />
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />

      {/* QUICK VIEW POPUP MODAL */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white p-6 shadow-xl transition-all md:p-8 animate-in zoom-in-95 duration-200 grid md:grid-cols-2 gap-6"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside content box
          >
            {/* CLOSE BUTTON */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {/* PRODUCT IMAGE */}
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-50 border border-gray-100">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.title}
                fill
                className="object-cover"
              />
            </div>

            {/* DETAILS CONTENT */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-green-600 font-extrabold">
                  {selectedProduct.category}
                </span>
                
                <h3 className="mt-2 text-xl font-bold text-gray-900 leading-tight">
                  {selectedProduct.title}
                </h3>

                {/* RATING SUBBAR */}
                {selectedProduct.rating && (
                  <div className="mt-2 flex items-center gap-1.5">
                    <div className="flex items-center text-amber-500">
                      <Star className="h-3.5 w-3.5 fill-current" />
                    </div>
                    <span className="text-xs font-bold text-gray-700">{selectedProduct.rating.rate}</span>
                    <span className="text-xs text-gray-400">({selectedProduct.rating.count} reviews)</span>
                  </div>
                )}

                <p className="mt-3 text-2xl font-black text-gray-900">
                  ₦{new Intl.NumberFormat("en-NG").format(selectedProduct.price)}
                </p>
                
                <hr className="my-4 border-gray-100" />
                
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Description</h4>
                <p className="mt-1 text-sm text-gray-500 leading-relaxed max-h-[140px] overflow-y-auto">
                  {selectedProduct.description || "Premium authentic quality item curated directly from talented local creators and top marketplace listings on Minmart platforms."}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="mt-6 flex gap-3">
                <button 
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    setSelectedProduct(null); // Optional: closes pop up after addition
                  }}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 shadow-sm transition-colors"
                >
                  <ShoppingCart className="h-4 w-4" /> Add To Cart
                </button>
                <button className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:text-red-500 hover:bg-gray-50 transition-all">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}