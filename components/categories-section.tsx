import Image from "next/image"
import Link from "next/link"
import shoe1 from "../public/shoe1.webp"
import Shore3 from "../public/Store3.webp"
import Store5 from "../public/store5.webp"

const categories = [
  {
    title: "Taste of Home",
    description: "Authentic spices, grains, and snacks",
    image: Shore3,
    href: "/shop?category=food",
    cta: "Explore Food",
  },
  {
    title: "Cultural Elegance",
    description: "Premium textiles and modern designs",
    image: shoe1,
    href: "/shop?category=fashion",
    cta: "Explore Fashion",
  },
  {
    title: "Natural Glow",
    description: "Organic skincare and beauty secrets",
    image: Store5,
    href: "/shop?category=beauty",
    cta: "Explore Beauty",
  },
]

export function CategoriesSection() {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">

        {/* HEADER */}
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
              Shop by Category
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Handpicked selections from our best artisans
            </p>
          </div>

          <Link
            href="/shop"
            className="hidden text-sm font-light text-green hover:underline md:inline"
          >
            View All →
          </Link>
        </div>

        {/* MOBILE SCROLL + DESKTOP GRID */}
        <div className="
          mt-8 
          flex gap-4 overflow-x-auto scroll-smooth pb-2
          md:grid md:grid-cols-3 md:overflow-visible
        ">

          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="
                relative min-w-[80%] sm:min-w-[60%] md:min-w-0
                aspect-[4/3] flex-shrink-0
                overflow-hidden rounded-2xl group
              "
            >
              {/* IMAGE */}
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

              {/* CONTENT */}
              <div className="absolute bottom-0 left-0 p-5">
                <h3 className="font-heading text-lg font-bold text-white">
                  {cat.title}
                </h3>

                <p className="mt-1 text-sm text-white/80">
                  {cat.description}
                </p>

                <span className="mt-3 inline-block rounded-md bg-white/20 px-3 py-1.5 text-xs text-white backdrop-blur-sm group-hover:bg-white/30 transition">
                  {cat.cta}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* MOBILE VIEW ALL */}
        <Link
          href="/shop"
          className="mt-6 block text-center text-sm font-light text-green hover:underline md:hidden"
        >
          View All →
        </Link>

      </div>
    </section>
  )
}