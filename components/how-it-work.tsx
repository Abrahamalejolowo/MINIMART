export function HowItWorks() {
  const customerSteps = [
    {
      number: "1",
      title: "Explore Products",
      description:
        "Browse curated Nigerian-made products across different categories.",
    },
    {
      number: "2",
      title: "Place Your Order",
      description:
        "Select your product, choose your preferences, and complete your order securely on Minmart.",
    },
    {
      number: "3",
      title: "Order Verification",
      description:
        "Your order is verified with the vendor before final confirmation.",
    },
    {
      number: "4",
      title: "Receive Updates",
      description:
        "Get notified when your order is confirmed, prepared, and dispatched.",
    },
    {
      number: "5",
      title: "Delivery",
      description:
        "Your product is delivered through our vendor fulfillment and logistics network.",
    },
  ]
  const vendorSteps = [
    {
      number: "1",
      title: "Get Featured",
      description:
        "Showcase your products on Minmart and reach more customers.",
    },
    {
      number: "2",
      title: "Receive Orders",
      description:
        "Get notified immediately when customers place orders for your products.",
    },
    {
      number: "3",
      title: "Confirm Availability",
      description:
        "Verify product availability before order confirmation.",
    },
    {
      number: "4",
      title: "Prepare & Dispatch",
      description:
        "Package and dispatch products using your preferred delivery method.",
    },
    {
      number: "5",
      title: "Grow Your Visibility",
      description:
        "Build awareness for your brand through Minmart’s marketplace and storytelling approach.",
    },
  ]

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-xl sm:text-4xl font-bold text-foreground">
            How It Works
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Minmart simplifies the shopping experience for customers while helping vendors grow their visibility and sales.
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-8 lg:grid-cols-2">

          {/* CUSTOMERS */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">

            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
                For Customers
              </p>

              <h3 className="mt-2 text-xl font-bold text-foreground">
                How It Works
              </h3>
            </div>

            <div className="space-y-6">
              {customerSteps.map((step) => (
                <StepCard
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>

          </div>

          {/* VENDORS */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">

            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
                For Vendors
              </p>

              <h3 className="mt-2 text-2xl font-bold text-foreground">
                Partner with Minmart
              </h3>
            </div>

            <div className="space-y-6">
              {vendorSteps.map((step) => (
                <StepCard
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>

          </div>

        </div>

        {/* NOTE */}
        <div className="mt-10 rounded-2xl border border-yellow-200 bg-yellow-50 p-5 text-sm text-gray-700">
          <span className="font-semibold">Note:</span>{" "}
          Customers do not contact vendors directly. Minmart manages all order communication.
        </div>

      </div>
    </section>
  )
}

/* STEP CARD */
function StepCard({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-4">

      {/* NUMBER */}
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-semibold text-white">
        {number}
      </div>

      {/* CONTENT */}
      <div>
        <h4 className="text-base sm:text-lg font-semibold text-foreground">
          {title}
        </h4>

        <p className="mt-1 text-sm sm:text-base text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

    </div>
  )
}