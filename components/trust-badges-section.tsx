
import { ShoppingCart, Bell, CheckCircle, Package, Truck } from "lucide-react"

const steps = [
  {
    icon: ShoppingCart,
    title: "Customer places order",
    desc: "Order is created on Minmart marketplace",
  },
  {
    icon: Bell,
    title: "Vendor notified",
    desc: "Vendor gets WhatsApp or email alert instantly",
  },
  {
    icon: CheckCircle,
    title: "Vendor confirms",
    desc: "Confirmation within 2 hours or next morning",
  },
  {
    icon: Package,
    title: "Order prepared",
    desc: "Product is packaged and ready for dispatch",
  },
  {
    icon: Truck,
    title: "Delivery completed",
    desc: "Customer receives updates until delivery",
  },
]

export function TrustBadgesSection() {
  return (
    <section className="bg-background py-16 sm:py-20 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            How Orders Work
          </h2>
          <p className="mt-3 text-gray-600">
            Simple, fast and fully managed by Minmart
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              {/* ICON */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
                <step.icon className="h-6 w-6 text-green-600" />
              </div>

              {/* TEXT */}
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {step.title}
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                {step.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}