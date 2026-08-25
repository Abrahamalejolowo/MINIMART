import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { InitialLoader } from "@/components/initial-loader";
import SessionProviderWrapper from "@/components/session-provider";

import "../app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Minmart",
  description:
    "Empowering local creators, delivering authentic quality to your doorstep.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <SessionProviderWrapper>
          <InitialLoader>
            <CartProvider>{children}</CartProvider>
          </InitialLoader>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
