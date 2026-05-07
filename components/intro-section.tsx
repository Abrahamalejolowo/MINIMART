"use client"

export function IntroSection() {
  return (
    <section className="py-2 md:py- bg-white">
      <div className="mx-auto max-w-5xl px-4 text-center">

        {/* SMALL LABEL */}
        <p className="text-xs uppercase tracking-widest text-green-600 font-medium">
          Our Story
        </p>

        {/* HEADLINE */}
        <h1 className="mt-4 font-heading text-3xl md:text-5xl font-light leading-tight text-foreground">
          Every product has a story
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-muted-foreground">
          Across Nigeria, artisans and creators produce high-quality products — 
          yet many remain unseen or disconnected from wider audiences.
        </p>

        <p className="mt-3 max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-muted-foreground">
          Minmart exists to bridge that gap — organizing and showcasing authentic 
          products in one curated, modern marketplace.
        </p>

      </div>
    </section>
  )
}