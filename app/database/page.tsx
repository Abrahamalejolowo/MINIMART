// app/database/products.ts

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
  // --- FOOTWEAR DATA ---
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
  },

  // --- SCENTS BY AW PREMIUM FRAGRANCES ---
  {
    id: 'saw-gigs-1',
    title: "GIGS (100ML)",
    price: 80000,
    brand: "SCENTS BY AW",
    image: "/GIGS.jpeg", // Make sure to save your image file in public/gigs.jpg
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
    image: "/GIGS2.0.jpeg", // Save your image in public/gigs2.jpg
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
    image: "/lubna.jpeg", // Save your image in public/lubna.jpg
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
    image: "/lubna2.0.jpeg", // Save your image in public/lubna2.jpg
    category: "beauty",
    subcategory: "Perfumes",
    description: "Four fragrances composed for curious minds—and noses—reveal their stories via scent.",
    rating: { rate: 4.8, count: 11 }
  }
]