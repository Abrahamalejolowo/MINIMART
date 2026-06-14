"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Menu, X, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  const { cartItems: cart = [] } = useCart();
  const totalCartItems = (cart || []).reduce((total, item) => total + (item.quantity || 1), 0);
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    // { name: "Sell", href: "/sell" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/SENT.png"
            alt="Minmart Logo"
            width={130}
            height={52}
            className="object-contain"
            priority
          />
        </Link>
        
        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-green-500 ${
                    isActive
                      ? "text-green-500 font-semibold underline underline-offset-4"
                      : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Side Icons & Actions */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Search"
            className="text-foreground transition-colors hover:text-green-500"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Desktop Cart Icon with Dynamic Counter Badge */}
          <Link
            href="/cart"
            aria-label="Shopping Cart"
            className={`relative transition-colors hover:text-green-500 flex items-center justify-center p-2 group ${
              pathname === "/cart" ? "text-green-500" : "text-foreground"
            }`}
          >
            <ShoppingBag className="h-5 w-5" />
            
            {/* 2. Visual Badge Indicator displaying many items are inside */}
            {totalCartItems > 0 && (
              <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white ring-2 ring-background animate-in zoom-in-50">
                {totalCartItems}
              </span>
            )}
          </Link>
          
          <Button
            onClick={() => router.push('/login')}
            size="sm" 
            className="hidden bg-green-500 text-white hover:bg-green-600 rounded-xl px-5 md:inline-flex"
          >
            Login
          </Button>
          
          {/* Mobile Layout Menu Button */}
          <button
            aria-label="Toggle mobile menu"
            className="text-foreground md:hidden transition-colors hover:text-green-500"
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

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 pb-6 md:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm block py-1 transition-colors ${
                      isActive ? "font-bold text-green-500" : "font-medium text-foreground"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
            
            {/* Mobile Layout Cart Row with direct counter value */}
            <li>
              <Link
                href="/cart"
                className={`text-sm font-medium flex items-center justify-between py-1 ${
                  pathname === "/cart" ? "text-green-500 font-bold" : "text-foreground"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  <span>Cart</span>
                </div>
                {totalCartItems > 0 && (
                  <span className="rounded-full bg-green-500 px-2 py-0.5 text-xs font-bold text-white">
                    {totalCartItems} items
                  </span>
                )}
              </Link>
            </li>
          </ul>
          
          <Button 
            onClick={() => {
              setMobileOpen(false);
              router.push('/login');
            }} 
            size="sm" 
            className="mt-5 w-full bg-green-500 text-white hover:bg-green-600 rounded-xl py-5 font-semibold"
          >
            Login
          </Button>
        </div>
      )}
    </header>
  );
}