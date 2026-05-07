import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import {
  Globe,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  Zap,
  Heart,  
  Shield,
} from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Authenticity',
      description: 'We verify every seller and product to ensure quality and trust.',
    },
    {
      icon: Zap,
      title: 'Speed',
      description: 'Fast delivery and seamless shopping experience.',
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Enterprise-grade protection for all users and payments.',
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Connecting Nigerian products to the world.',
    },
  ]

  const team = [
    {
      name: 'Ada Okafor',
      role: 'CEO',
      image: '/images/product-shea-butter.jpg',
    },
    {
      name: 'Emeka Nwosu',
      role: 'CTO',
      image: '/images/product-aso-oke.jpg',
    },
    {
      name: 'Zainab Adeyemi',
      role: 'Operations',
      image: '/images/category-beauty.jpg',
    },
    {
      name: 'Tunde Okonkwo',
      role: 'Partnerships',
      image: '/images/category-fashion.jpg',
    },
  ]

  const stats = [
    { number: '500K+', label: 'Customers' },
    { number: '1K+', label: 'Sellers' },
    { number: '₦100M+', label: 'Sales' },
    { number: '48hrs', label: 'Delivery' },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">

        {/* HERO */}
        <section className="py-20 bg-gradient-to-b from-green-50 to-white">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <h1 className="text-4xl sm:text-6xl font-light text-black">
              About <span className="text-green-600">Minmart</span>
            </h1>

            <p className="mt-5 text-gray-600 max-w-2xl mx-auto text-lg font-light">
              A curated marketplace connecting Nigerian creativity to the world.
            </p>
          </div>
        </section>

        {/* STORY */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-12 items-center">

            <div className="space-y-5">
              <h2 className="text-3xl font-light">Our Story</h2>

              <p className="text-gray-600 leading-relaxed">
                Minmart was built to empower Nigerian creators and give them global visibility.
              </p>

              <p className="text-gray-600 leading-relaxed">
                We started with a simple idea — local products deserve global recognition.
              </p>

              <p className="text-gray-600 leading-relaxed">
                Today, we support thousands of sellers and hundreds of thousands of customers.
              </p>
            </div>

            <div className="relative h-80 md:h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/images/hero-textiles.jpg"
                alt="About Minmart"
                fill
                className="object-cover"
              />
            </div>

          </div>
        </section>

        {/* STATS */}
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-6xl px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

            {stats.map((s) => (
              <div key={s.label} className="p-6 bg-white rounded-xl border">
                <h3 className="text-2xl font-light text-black">{s.number}</h3>
                <p className="text-sm text-gray-500">{s.label}</p>
              </div>
            ))}

          </div>
        </section>

        {/* VALUES */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <h2 className="text-3xl font-light mb-10">Our Values</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => {
                const Icon = v.icon
                return (
                  <div key={v.title} className="p-6 border rounded-xl hover:shadow-md transition">
                    <Icon className="h-6 w-6 text-green-600 mx-auto" />
                    <h3 className="mt-3 font-light">{v.title}</h3>
                    <p className="text-sm text-gray-500 mt-2">{v.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <h2 className="text-3xl font-light mb-10">Meet the Team</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((t) => (
                <div key={t.name} className="bg-white border rounded-xl overflow-hidden">
                  <div className="relative h-52">
                    <Image src={t.image} alt={t.name} fill className="object-cover" />
                  </div>

                  <div className="p-4">
                    <h3 className="font-light">{t.name}</h3>
                    <p className="text-sm text-green-600">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-3xl font-light">Join Minmart</h2>
            <p className="text-gray-600 mt-3">
              Shop authentic products or become a seller today.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-black text-white px-6 py-6">
                Start Shopping
              </Button>

              <Button variant="outline" className="px-6 py-6">
                Become a Seller
              </Button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}