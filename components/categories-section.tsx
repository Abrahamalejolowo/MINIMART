'use client'

import Image from "next/image"
import Link from "next/link"  

const categories = [
  {
    title: "Parfumes",  
    description: ",Perfumes FROM SCENTS BY AW,GIGS, GIGS 2.0, LUBNA and LUBNA 2.0,",
    image: "/LUBNA.jpeg",
    href: "/shop?category=perfumes",
    cta: "Explore Perfumes",
  },
  {
    title: "Footwear",
    description: "Sneakers, sandals, loafers and handmade footwear",
    image: "/shoe2.webp", 
    href: "/shop?category=footwear",
    cta: "Explore Footwear",
  },
  {
    title: "Fashion",
    description: "Premium bags, embroidered shirts, and utility trousers born from resilience and underground culture. eg ZINO CARTEL",
    image: "/ZinoShirt4.JPG",
    href: "/shop?category=fashion",
    cta: "Explore The Cartel",
  },
{
  title: "Bags",
  description: "Leather Bags, totes, wallets, and timeless artisan accessories.",
  image: "/Bag5.PNG",
  href: "/shop?category=fashion&subcategory=Bags",
  cta: "Explore Bags",
},
  {
    title: "Home & Living",
    description: "Handmade decor, candles, and artisan kitchenware",
    image: "/Home.webp", 
    href: "/shop?category=home",
    cta: "Explore Home",
  },
  {
    title: "Beauty & Skincare",
    description: "Organic skincare and beauty essentials",
    image: "/Beauty.webp",
    href: "/shop?category=beauty",
    cta: "Explore Beauty",
  },
  {
    title: "Food & Spices",
    description: "Authentic spices, snacks and packaged foods",
    image: "/Store3.webp",
    href: "/shop?category=food",
    cta: "Explore Food",
  },
  {
    title: "Crafts & Artisanal",
    description: "Woven items, cultural pieces and handmade creative crafts",
    image: "/Artisan.webp",
    href: "/shop?category=crafts",
    cta: "Explore Crafts",
  },
]

export function CategoriesSection() {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">

        {/* HEADER */}
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              Shop by Category
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Discover curated Nigerian-made products across different categories
            </p>
          </div>

          <Link
            href="/shop"
            className="hidden text-sm font-medium text-green-600 hover:underline md:inline"
          >
            View All →
          </Link>
        </div>

        {/* MOBILE SNAP SCROLL + DESKTOP GRID */}
        <div
          className="
            mt-10
            flex gap-4 
            overflow-x-auto 
            pb-6
            /* Scroll Snap Logic */
            snap-x snap-mandatory 
            scrollbar-hide
            md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:snap-none
          "
        >
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="
                relative 
                /* Card width on mobile */
                min-w-[85%] sm:min-w-[60%] md:min-w-0
                /* Snapping point */
                snap-center 
                aspect-[4/5] flex-shrink-0
                overflow-hidden rounded-3xl group
              "
            >
              {/* IMAGE */}
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* CONTENT */}
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white">
                  {cat.title}
                </h3>

                <p className="mt-2 text-sm text-white/80 leading-relaxed line-clamp-2">
                  {cat.description}
                </p>

                <span className="mt-4 inline-block rounded-xl bg-white/20 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm transition group-hover:bg-white/40">
                  {cat.cta}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* MOBILE VIEW ALL */}
        <Link
          href="/shop"
          className="mt-6 block text-center text-sm font-medium text-green-600 hover:underline md:hidden"
        >
          View All →
        </Link>
      </div>
    </section>
  )
}