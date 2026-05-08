import Image from "next/image"
import Link from "next/link"

import shoe1 from "../public/shoe1.webp"
import Shore3 from "../public/Store3.webp"
import Store5 from "../public/store5.webp"
import footwear from "../public/shoe2.webp"

const categories = [
  {
    title: "Footwear",
    description: "Sneakers, sandals, loafers and handmade footwear",
    image: footwear,
    href: "/shop?category=footwear",
    cta: "Explore Footwear",
  },
  {
    title: "Fashion",
    description: "Modern Nigerian fashion and cultural styles",
    image: shoe1,
    href: "/shop?category=fashion",
    cta: "Explore Fashion",
  },
  {
    title: "Beauty & Skincare",
    description: "Organic skincare and beauty essentials",
    image: Store5,
    href: "/shop?category=beauty",
    cta: "Explore Beauty",
  },
  {
    title: "Food & Spices",
    description: "Authentic spices, snacks and packaged foods",
    image: Shore3,
    href: "/shop?category=food",
    cta: "Explore Food",
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

        {/* MOBILE SCROLL + DESKTOP GRID */}
        <div
          className="
            mt-10
            flex gap-4 overflow-x-auto scroll-smooth pb-2
            md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible
          "
        >

          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="
                relative min-w-[85%] sm:min-w-[60%] md:min-w-0
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* CONTENT */}
              <div className="absolute bottom-0 left-0 p-6">

                <h3 className="text-2xl font-bold text-white">
                  {cat.title}
                </h3>

                <p className="mt-2 text-sm text-white/80 leading-relaxed">
                  {cat.description}
                </p>

                <span className="mt-4 inline-block rounded-xl bg-white/20 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm transition group-hover:bg-white/30">
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