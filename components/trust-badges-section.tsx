import { ShieldCheck, Truck, Lock, Headphones } from "lucide-react"

const badges = [
  {
    icon: ShieldCheck,
    title: "Authenticity",
    description: "100% Quality Assurance",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Nationwide Shipping",
  },
  {
    icon: Lock,
    title: "Secure Payment",
    description: "Escrow Protected",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated Help Desk",
  },
]

export function TrustBadgesSection() {
  return (
    <section className="border-y border-border bg-background py-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {badges.map((badge) => (
            <div key={badge.title} className="flex items-center gap-3">
              <badge.icon className="h-6 w-6 flex-shrink-0 text-foreground" />
              <div>
                <p className="text-sm font-light text-foreground">
                  {badge.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
