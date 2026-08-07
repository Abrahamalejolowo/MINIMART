'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ShopFiltersProps {
  onFilterChange: (filters: {
    category: string
    subcategories: string[] 
    priceRange: [number, number]
    rating: number
  }) => void
}

const categories = [
  { id: 'all', name: 'All', subcategories: [] },
  {
    id: 'bags',
    name: 'Bags',
    subcategories: ['Leather Bags', 'Totes', 'Wallets', 'Handbags', 'Backpacks'],
  },
  {
    id: 'footwear',
    name: 'Footwear',
    subcategories: ['Sneakers', 'Loafers', 'Sandals', 'Handmade Shoes', 'Leather Footwear'],
  },
  {
    id: 'fashion',
    name: 'Fashion',
    subcategories: ['Ready-to-Wear', 'Streetwear', 'Shirts', 'Trousers', 'Bags', 'Womenswear', 'Menswear', 'Native Wear'],
  },
  {
    id: 'perfumes',
    name: 'Perfumes & Fragrances',
    subcategories: ['Perfumes', 'Body Mists', 'Oils'],
  },
  {
    id: 'beauty',
    name: 'Beauty & Skincare',
    subcategories: ['Skincare', 'Oils', 'Soaps', 'Cosmetics'],
  },
  {
    id: 'food',
    name: 'Food & Spices',
    subcategories: ['Spices', 'Packaged Foods', 'Snacks', 'Local Food Products', 'Coffee', 'Tea'],
  },
  {
    id: 'leather',
    name: 'Leather Goods',
    subcategories: ['Bags', 'Wallets', 'Belts', 'Leather Accessories'],
  },
  {
    id: 'home',
    name: 'Home & Living',
    subcategories: ['Decor', 'Handmade Items', 'Candles', 'Kitchenware'],
  },
]

function ShopFiltersContent({ onFilterChange }: ShopFiltersProps) {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')?.toLowerCase() || 'all'
  const subcategoryParam = searchParams.get('subcategory')

  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    subcategoryParam ? [subcategoryParam] : []
  )
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    categoryParam !== 'all' ? categoryParam : null
  )
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])
  const [selectedRating, setSelectedRating] = useState(0)
  const [open, setOpen] = useState(false)

  // Sync component state when the URL query parameter changes
  useEffect(() => {
    const urlCategory = searchParams.get('category')?.toLowerCase() || 'all'
    const urlSubcategory = searchParams.get('subcategory')

    setSelectedCategory(urlCategory)
    setExpandedCategory(urlCategory !== 'all' ? urlCategory : null)

    const initialSubcategories = urlSubcategory ? [urlSubcategory] : []
    setSelectedSubcategories(initialSubcategories)

    onFilterChange({
      category: urlCategory,
      subcategories: initialSubcategories,
      priceRange,
      rating: selectedRating,
    })
  }, [searchParams])

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setSelectedSubcategories([])

    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)

    onFilterChange({
      category: categoryId,
      subcategories: [],
      priceRange,
      rating: selectedRating,
    })
  }

  const toggleSubcategory = (subcategory: string) => {
    const newSubcategories = selectedSubcategories.includes(subcategory)
      ? selectedSubcategories.filter((s) => s !== subcategory) 
      : [...selectedSubcategories, subcategory]  
    setSelectedSubcategories(newSubcategories)

    onFilterChange({
      category: selectedCategory,
      subcategories: newSubcategories,
      priceRange,
      rating: selectedRating,
    })
  }

  const handlePriceChange = (min: number, max: number) => {
    const safeMin = isNaN(min) ? 0 : min
    const safeMax = isNaN(max) ? 100000 : max
    setPriceRange([safeMin, safeMax])
    onFilterChange({
      category: selectedCategory,
      subcategories: selectedSubcategories,
      priceRange: [safeMin, safeMax],
      rating: selectedRating,
    })
  }

  const resetFilters = () => {
    setSelectedCategory('all')
    setSelectedSubcategories([])
    setExpandedCategory(null)
    setPriceRange([0, 100000])
    setSelectedRating(0)

    onFilterChange({
      category: 'all',
      subcategories: [],
      priceRange: [0, 100000],
      rating: 0,
    })
  }

  return (
    <>
      {/* Mobile Toggle */}
      <div className="mb-4 md:hidden">
        <Button onClick={() => setOpen(!open)} variant="outline" className="w-full flex items-center justify-between py-6">
          Filters
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      <div className={`${open ? 'block' : 'hidden'} md:block space-y-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm`}>
        {/* Categories */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-foreground">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id
              const isExpanded = expandedCategory === category.id

              return (
                <div key={category.id} className="rounded-xl border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => handleCategoryChange(category.id)}
                    className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition ${
                      isSelected ? 'bg-green-600 text-white font-semibold' : 'bg-white text-foreground hover:bg-gray-50'
                    }`}
                  >
                    <span>{category.name}</span>
                    {category.subcategories.length > 0 && (
                      <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    )}
                  </button>

                  {/* Multi-select Subcategories */}
                  {isExpanded && category.subcategories.length > 0 && (
                    <div className="bg-gray-50/50 space-y-1 px-3 py-3 border-t border-gray-100">
                      {category.subcategories.map((sub) => {
                        const isSubSelected = selectedSubcategories.includes(sub)
                        return (
                          <button
                            key={sub}
                            onClick={() => toggleSubcategory(sub)}
                            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs transition ${
                              isSubSelected ? 'bg-green-100 text-green-800 font-semibold' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            <div className={`h-3 w-3 rounded border flex items-center justify-center ${isSubSelected ? 'bg-green-600 border-green-600' : 'border-gray-300'}`}>
                              {isSubSelected && <div className="h-1.5 w-1.5 bg-white rounded-full" />}
                            </div>
                            {sub}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Price */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-foreground">Price Range</h3>
          <div className="flex gap-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(parseInt(e.target.value), priceRange[1])}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="Min"
            />
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(priceRange[0], parseInt(e.target.value))}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="Max"
            />
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" className="w-full" onClick={resetFilters}>Reset</Button>
          <Button className="w-full bg-green-600 text-white hover:bg-green-700" onClick={() => setOpen(false)}>Apply</Button>
        </div>
      </div>
    </>
  )
}

export function ShopFilters(props: ShopFiltersProps) {
  return (
    <Suspense fallback={<div className="p-4 text-xs text-gray-400">Loading filters...</div>}>
      <ShopFiltersContent {...props} />
    </Suspense>
  )
}