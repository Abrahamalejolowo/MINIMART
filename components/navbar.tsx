"use client";

import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
// import min2 from '../public/min2.png'
import Image from "next/image";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/min2.png"
            alt="Minmart Logo"
            width={42}
            height={42}
            className="object-contain"
            priority
          />
        </Link>
        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-8 md:flex">
          <li>
            <Link
              href="/"
              className="text-sm font-medium text-green underline underline-offset-4"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/shop"
              className="text-sm font-medium text-foreground transition-colors hover:text-green"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              href="/sell"
              className="text-sm font-medium text-foreground transition-colors hover:text-green"
            >
              Sell
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-sm font-medium text-foreground transition-colors hover:text-green"
            >
              About
            </Link>
          </li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <button
            aria-label="Search"
            className="text-foreground transition-colors hover:text-green"
          >
            <Search className="h-5 w-5" />
          </button>
          <Button size="sm" className="hidden rounded-2 md:inline-flex">
            Login
          </Button>
          <button
            aria-label="Toggle mobile menu"
            className="text-foreground md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 pb-4 md:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            <li>
              <Link
                href="/"
                className="text-sm font-medium text-green"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className="text-sm font-medium text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/sell"
                className="text-sm font-medium text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                Sell
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-sm font-medium text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                About
              </Link>
            </li>
          </ul>
          <Button size="sm" className="mt-4 w-full rounded-full">
            Login
          </Button>
        </div>
      )}
    </header>
  );
}
