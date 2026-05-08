'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ShopFiltersProps {
  onFilterChange: (filters: {
    category: string
    priceRange: [number, number]
    rating: number
  }) => void
}

export function ShopFilters({ onFilterChange }: ShopFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])
  const [selectedRating, setSelectedRating] = useState(0)
  const [open, setOpen] = useState(false)

  // ✅ UPDATED CATEGORIES
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'footwear', name: 'Footwear' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'beauty', name: 'Beauty & Skincare' },
    { id: 'food', name: 'Food & Spices' },
    { id: 'home', name: 'Home & Living' },
  ]

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    onFilterChange({
      category: categoryId,
      priceRange,
      rating: selectedRating,
    })
  }

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max])
    onFilterChange({
      category: selectedCategory,
      priceRange: [min, max],
      rating: selectedRating,
    })
  }

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating)
    onFilterChange({
      category: selectedCategory,
      priceRange,
      rating,
    })
  }

  return (
    <>
      {/* MOBILE BUTTON */}
      <div className="mb-4 md:hidden">
        <Button
          onClick={() => setOpen(!open)}
          variant="outline"
          className="w-full flex justify-between items-center py-6"
        >
          Filters
          <ChevronDown className={`transition ${open ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {/* FILTER PANEL */}
      <div
        className={`
          ${open ? 'block' : 'hidden'}
          md:block space-y-6 rounded-2xl border bg-white p-5
        `}
      >

        {/* CATEGORY */}
        <div>
          <h3 className="mb-3 text-sm font-medium">Category</h3>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3 py-1 rounded-full text-xs border transition ${
                  selectedCategory === cat.id
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-foreground border-gray-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* PRICE */}
        <div>
          <h3 className="mb-3 text-sm font-medium">Price</h3>

          <div className="flex gap-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) =>
                handlePriceChange(parseInt(e.target.value), priceRange[1])
              }
              className="w-full border rounded-lg px-2 py-2 text-sm"
              placeholder="Min"
            />

            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) =>
                handlePriceChange(priceRange[0], parseInt(e.target.value))
              }
              className="w-full border rounded-lg px-2 py-2 text-sm"
              placeholder="Max"
            />
          </div>
        </div>

        {/* RATING */}
        <div>
          <h3 className="mb-3 text-sm font-medium">Rating</h3>

          <div className="flex flex-wrap gap-2">
            {[5, 4, 3, 2, 1].map((r) => (
              <button
                key={r}
                onClick={() => handleRatingChange(r)}
                className={`px-3 py-1 rounded-full text-xs border transition ${
                  selectedRating === r
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-foreground border-gray-300'
                }`}
              >
                ⭐ {r}+
              </button>
            ))}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2 pt-2">

          <Button
            onClick={() => {
              setSelectedCategory('all')
              setPriceRange([0, 100000])
              setSelectedRating(0)

              onFilterChange({
                category: 'all',
                priceRange: [0, 100000],
                rating: 0,
              })
            }}
            variant="outline"
            className="w-full"
          >
            Reset
          </Button>

          <Button
            className="w-full bg-green-600 text-white"
            onClick={() => setOpen(false)}
          >
            Apply
          </Button>

        </div>

      </div>
    </>
  )
}