import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CartProvider } from '@/context/CartContext'

import '../app/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Minmart',
  description:
    'Empowering local creators, delivering authentic quality to your doorstep.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <CartProvider>          
          {children}
        </CartProvider>
      </body>
    </html>
  )
}