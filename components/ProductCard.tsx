'use client'

import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface ProductProps {
  id: string
  name: string
  price: number
  image: string
}

export function ProductCard({ id, name, price, image }: ProductProps) {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    // 1. CRITICAL: Stop the click from opening the modal behind the button
    e.stopPropagation() 
    
    addToCart({
      id,
      name,
      price,
      image,
      quantity: 1,
    })
  }

  return (
    /* 2. REMOVED THE <Link> TAG FROM HERE. Now it's a standard borderless div layout container */
    <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-xs flex flex-col justify-between h-full transition-all hover:border-green-500 hover:shadow-md group">
      
      {/* Product Image Frame */}
      <div className="relative h-48 w-full rounded-xl overflow-hidden bg-gray-50">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-cover transition-transform duration-300 group-hover:scale-105" 
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Product Information */}
      <div className="mt-3">
        <h4 className="font-bold text-sm text-gray-900 group-hover:text-green-500 transition-colors">
          {name}
        </h4>
        <p className="text-green-500 font-black text-base mt-0.5">₦{price.toLocaleString()}</p>
      </div>
      
      {/* Instant Action Cart Trigger Button */}
      <Button 
        onClick={handleAddToCart}
        className="mt-4 w-full bg-green-500 text-white hover:bg-green-600 rounded-xl text-xs font-semibold py-2 relative z-10"
      >
        Add to Cart
      </Button>
    </div>
  )
}