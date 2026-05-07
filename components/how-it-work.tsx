export function HowItWorks() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* TITLE */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            How it Works
          </h2>
          <p className="mt-3 text-gray-600">
            Simple steps for customers and vendors
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-10 md:grid-cols-2">

          {/* CUSTOMERS */}
          <div className="rounded-2xl border border-gray-200 p-6 sm:p-8">
            <h3 className="text-xl font-semibold mb-6 text-green-600">
              For Customers
            </h3>

            <div className="space-y-4">
              <Step number="1" text="Browse categories" />
              <Step number="2" text="Select a product" />
              <Step number="3" text="Place an order on Minmart" />
              <Step number="4" text="Receive updates until delivery" />
            </div>
          </div>

          {/* VENDORS */}
          <div className="rounded-2xl border border-gray-200 p-6 sm:p-8">
            <h3 className="text-xl font-semibold mb-6 text-green-600">
              For Vendors
            </h3>

            <div className="space-y-4">
              <Step number="1" text="Partner with Minmart" />
              <Step number="2" text="Feature your products" />
              <Step number="3" text="Receive orders directly" />
              <Step number="4" text="Confirm and dispatch items" />
            </div>
          </div>

        </div>

        {/* IMPORTANT NOTE */}
        <div className="mt-10 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-gray-700">
          <span className="font-semibold">Note:</span> Customers do not contact vendors directly. Minmart manages all order communication.
        </div>

      </div>
    </section>
  )
}

/* STEP COMPONENT */
function Step({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white text-sm font-semibold">
        {number}
      </div>
      <p className="text-gray-700 text-sm sm:text-base">{text}</p>
    </div>
  )
}