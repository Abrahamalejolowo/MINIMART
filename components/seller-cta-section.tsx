import Image from "next/image"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import softwareDev from "../public/software dev.jpeg"
import { useRouter } from 'next/navigation'

const benefits = [
  "Zero initial listing fees",
  "Nationwide delivery network",
  "Weekly payouts and secure escrow",
]

export function SellerCtaSection() {
  const router = useRouter()
  return (
    <section className="bg-secondary/30 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-secondary">
          <div className="flex flex-col items-center gap-8 p-8 md:flex-row md:gap-12 md:p-12">
            {/* Text */}
            <div className="flex-1">
              <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                Partner with Minmart
              </h2>
              <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
                We are currently inviting Nigerian brands, artisans, and creators to feature their products on Minmart.
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle className="h-4 w-4 flex-shrink-0 text-green" />
                    {b}
                  </li>
                ))}
              </ul>
              <Button
              onClick={() => router.push('/partner')} 
               size="lg" className="mt-8 rounded-2">
                Express Interest
              </Button>
            </div>

            {/* Image */}
            <div className="relative aspect-[4/3] w-full flex-1 overflow-hidden rounded-2xl">
              <Image
                src={softwareDev}
                alt="Laptop showing Minmart seller dashboard"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
