export interface Product {
  id: string | number
  title: string
  price: number
  image: string
  category: string
  subcategory?: string
  brand?: string
  location?: string 
  email?: string 
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
    location: "Abuja, Nigeria",
    email: "abubakarwadada011@gmail.com",
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
    location: "Abuja, Nigeria",
    email: "abubakarwadada011@gmail.com", // 👈 Added brand email
    description: "Four fragrances composed for curious minds and noses reveal their stories via scent.",
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
    location: "Abuja, Nigeria",
    email: "abubakarwadada011@gmail.com", // 👈 Added brand email
    description: "Four fragrances composed for curious minds and noses reveal their stories via scent.",
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
    location: "Abuja, Nigeria",
    email: "abubakarwadada011@gmail.com",
    description: "Four fragrances composed for curious minds and noses reveal their stories via scent.",
    rating: { rate: 4.8, count: 11 }
  },

  // --- ZINO CARTEL COLLECTION ---
  // Bags (2 items)
  {
    id: 'zino-bag-1',
    title: "Zino Cartel Premium Duffle Bag",
    price: 50000,
    brand: "ZINO CARTEL",
    image: "/ZinoBag1.JPG",
    category: "fashion",
    subcategory: "Bags",
    location: "Abuja, Nigeria", 
    email: "Zinocartelclothing@gmail.com", 
    description: "Built from late nights, limited resources, and relentless ambition. A statement utility piece transforming raw emotions into wearable art.",
    rating: { rate: 5.0, count: 8 }
  },
  {
    id: 'zino-bag-2',
    title: "Zino Cartel Monogram Tote Bag",
    price: 50000,
    brand: "ZINO CARTEL",
    image: "/ZinoBag2.JPG",
    category: "fashion",
    subcategory: "Bags",
    location: "Abuja, Nigeria", 
    email: "Zinocartelclothing@gmail.com", 
    description: "Inspired by underground culture and craftsmanship. More than fashion, this piece is part of a movement for dreamers and creators.",
    rating: { rate: 4.7, count: 5 }
  },

  // Shirts (4 items)
  {
    id: 'zino-shirt-1',
    title: "Zino Cartel Graphic Streetwear Tee",
    price: 50000,
    brand: "ZINO CARTEL",
    image: "/ZinoShirt1.JPG",
    category: "fashion",
    subcategory: "Shirts",
    location: "Abuja, Nigeria",
    email: "Zinocartelclothing@gmail.com",
    description: "Carrying a story of resilience, rebellion, and self-expression. Crafted for those who refuse to follow the crowd and choose to create their own path.",
    rating: { rate: 4.9, count: 12 }
  },
  {
    id: 'zino-shirt-2',
    title: "Zino Cartel Floral Embroidered Work Jacket Shirt",
    price: 50000,
    brand: "ZINO CARTEL",
    image: "/ZinoShirt2.JPG",
    category: "fashion",
    subcategory: "Shirts",
    location: "Abuja, Nigeria", 
    email: "Zinocartelclothing@gmail.com", 
    description: "Premium distressed canvas texture featuring detailed heavy floral embroidery and structural 'cartel dept' identification. Embracing the absolute beauty of imperfection.",
    rating: { rate: 5.0, count: 18 }
  },
  {
    id: 'zino-shirt-3',
    title: "Zino Cartel Distressed Heavyweight Overshirt",
    price: 50000,
    brand: "ZINO CARTEL",
    image: "/ZinoShirt3.JPG",
    category: "fashion",
    subcategory: "Shirts",
    location: "Abuja, Nigeria",
    email: "Zinocartelclothing@gmail.com", 
    description: "A movement for dreamers, creators, and outsiders turning their vision into reality. Heavy boxy cut with customized raw fringe detailing.",
    rating: { rate: 4.8, count: 15 }
  },
  {
    id: 'zino-shirt-4',
    title: "Zino Cartel Underground Luxury Button-Up",
    price: 50000,
    brand: "ZINO CARTEL",
    image: "/ZinoShirt4.JPG",
    category: "fashion",
    subcategory: "Shirts",
    location: "Abuja, Nigeria", 
    email: "Zinocartelclothing@gmail.com", 
    description: "Born from struggle, sacrifice, and an obsession with creating something real. Intricate utility silhouettes optimized for modern streetwear aesthetics.",
    rating: { rate: 4.6, count: 7 }
  },

  {
    id: 'zino-trousers-1',
    title: "Zino Cartel Raw-Edge Cargo Pants",
    price: 50000,
    brand: "ZINO CARTEL",
    image: "/ZinoTrouser1.JPG",
    category: "fashion",
    subcategory: "Trousers",
    location: "Abuja, Nigeria",
    email: "Zinocartelclothing@gmail.com",
    description: "Structured utility tailoring from the Zino Cartel collective. Designed with complex pockets and heavy stitching to stand the test of time.",
    rating: { rate: 4.9, count: 11 }
  },
  {
    id: 'zino-trousers-2',
    title: "Zino Cartel Relaxed Fit Distressed Denim",
    price: 50000,
    brand: "ZINO CARTEL",
    image: "/ZinoTrouser2.JPG",
    category: "fashion",
    subcategory: "Trousers",
    location: "Abuja, Nigeria", 
    email: "Zinocartelclothing@gmail.com", 
    description: "Custom washed finish denim celebrating the architectural beauty of imperfection. Features heavy metal hardware accents and classic relaxed tailoring.",
    rating: { rate: 5.0, count: 9 }
  }
]