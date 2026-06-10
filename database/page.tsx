export interface Product {
  id: string | number
  title: string
  price: number
  image: string
  category: string
  subcategory?: string
  brand?: string
  description: string
  rating: {
    rate: number
    count: number
  }
}

export const marketplaceDatabase: Product[] = [
  // --- SCENTS BY AW PREMIUM FRAGRANCES ---
  {
    id: 'saw-gigs-1',
    title: "GIGS (100ML)",
    price: 80000,
    brand: "SCENTS BY AW",
    image: "/GIGS.jpeg", 
    category: "beauty",
    subcategory: "Perfumes",
    description: "Four fragrances composed for curious minds—and noses—reveal their stories via scent.",
    rating: { rate: 5.0, count: 14 }
  },
  {
    id: 'saw-gigs-2',
    title: "GIGS 2.0 (100ML)",
    price: 80000,
    brand: "SCENTS BY AW",
    image: "/GIGS2.0.jpeg",
    category: "beauty",
    subcategory: "Perfumes",
    description: "Four fragrances composed for curious minds—and noses—reveal their stories via scent.",
    rating: { rate: 4.9, count: 9 }
  },
  {
    id: 'saw-lubna-1',
    title: "LUBNA (100ML)",
    price: 80000,
    brand: "SCENTS BY AW",
    image: "/lubna.jpeg",
    category: "beauty",
    subcategory: "Perfumes",
    description: "Four fragrances composed for curious minds—and noses—reveal their stories via scent.",
    rating: { rate: 5.0, count: 22 }
  },
  {
    id: 'saw-lubna-2',
    title: "LUBNA 2.0 (100ML)",
    price: 80000,
    brand: "SCENTS BY AW",
    image: "/lubna2.0.jpeg", 
    category: "beauty",
    subcategory: "Perfumes",
    description: "Four fragrances composed for curious minds—and noses—reveal their stories via scent.",
    rating: { rate: 4.8, count: 11 }
  }
]