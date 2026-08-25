"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Menu,
  X,
  ShoppingBag,
  User as UserIcon,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import Image from "next/image";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  const { cartItems: cart = [] } = useCart();

  const totalCartItems = (cart || []).reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  useEffect(() => {
    // 1. Get initial user state
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    // 2. Listen for auth changes (sign in, sign out, user updates)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const query = searchQuery.trim().toLowerCase();

    if (!query) return;

    if (query === "bag" || query === "bags") {
      router.push("/shop?category=bags");
    } else {
      router.push(`/shop?q=${encodeURIComponent(query)}`);
    }

    setSearchOpen(false);
    setSearchQuery("");
    setMobileOpen(false);
  };

  const handleSignOut = async () => {
    setAccountOpen(false);
    setMobileOpen(false);

    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const userName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "User";

  const getInitials = () => {
    if (!userName) return "U";

    const names = userName.trim().split(" ").filter(Boolean);

    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }

    return `${names[0].charAt(0)}${names[names.length - 1].charAt(
      0
    )}`.toUpperCase();
  };

  const userInitials = getInitials();

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
                      ? "font-semibold text-green-500 underline underline-offset-4"
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
          {/* Desktop Search */}
          {searchOpen ? (
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center"
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-40 rounded-lg border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-green-500 sm:w-60"
              />

              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                className="ml-2 text-foreground hover:text-green-500"
              >
                <X className="h-4 w-4" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="text-foreground transition-colors hover:text-green-500"
            >
              <Search className="h-5 w-5" />
            </button>
          )}

          {/* Cart Icon */}
          <Link
            href="/cart"
            aria-label="Shopping Cart"
            className={`relative flex items-center justify-center p-2 transition-colors hover:text-green-500 ${
              pathname === "/cart" ? "text-green-500" : "text-foreground"
            }`}
          >
            <ShoppingBag className="h-5 w-5" />

            {totalCartItems > 0 && (
              <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white ring-2 ring-background">
                {totalCartItems}
              </span>
            )}
          </Link>

          {/* Account / Login */}
          {loading ? (
            <div className="hidden h-9 w-9 animate-pulse rounded-full bg-muted md:block" />
          ) : user ? (
            /* Logged In */
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setAccountOpen(!accountOpen)}
                aria-label="Open account menu"
                aria-expanded={accountOpen}
                className="flex items-center gap-2 rounded-full border border-border bg-background p-1 pr-2 transition-colors hover:border-green-500"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
                  {userInitials}
                </div>

                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform ${
                    accountOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Account Dropdown */}
              {accountOpen && (
                <div className="absolute right-0 top-12 w-56 overflow-hidden rounded-xl border border-border bg-background shadow-lg">
                  <div className="border-b border-border px-4 py-3">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {userName}
                    </p>

                    {user.email && (
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    )}
                  </div>

                  <div className="p-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setAccountOpen(false);
                        router.push("/account");
                      }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-muted"
                    >
                      <UserIcon className="h-4 w-4" />
                      <span>Account</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-500 transition-colors hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Logged Out */
            <Button
              onClick={() => router.push("/login")}
              size="sm"
              className="hidden rounded-xl bg-green-500 px-5 text-white hover:bg-green-600 md:inline-flex"
            >
              Login
            </Button>
          )}

          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle mobile menu"
            className="text-foreground transition-colors hover:text-green-500 md:hidden"
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
          {/* Mobile Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-4 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-green-500"
            />

            <Button
              type="submit"
              size="sm"
              className="bg-green-500 text-white hover:bg-green-600"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>

          {/* Mobile Navigation */}
          <ul className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-1 text-sm transition-colors ${
                      isActive
                        ? "font-bold text-green-500"
                        : "font-medium text-foreground"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}

            {/* Mobile Cart */}
            <li>
              <Link
                href="/cart"
                className={`flex items-center justify-between py-1 text-sm font-medium ${
                  pathname === "/cart"
                    ? "font-bold text-green-500"
                    : "text-foreground"
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

          {/* Mobile Account */}
          {loading ? (
            <div className="mt-5 h-12 w-full animate-pulse rounded-xl bg-muted" />
          ) : user ? (
            <div className="mt-5 space-y-2">
              {/* User Info */}
              <div className="flex items-center gap-3 rounded-xl border border-border p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">
                  {userInitials}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {userName}
                  </p>

                  {user.email && (
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Account */}
              <Button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  router.push("/account");
                }}
                variant="outline"
                className="w-full rounded-xl"
              >
                <UserIcon className="mr-2 h-4 w-4" />
                Account
              </Button>

              {/* Sign Out */}
              <Button
                type="button"
                onClick={handleSignOut}
                variant="outline"
                className="w-full rounded-xl border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            /* Mobile Login */
            <Button
              onClick={() => {
                setMobileOpen(false);
                router.push("/login");
              }}
              size="sm"
              className="mt-5 w-full rounded-xl bg-green-500 py-5 font-semibold text-white hover:bg-green-600"
            >
              Login
            </Button>
          )}
        </div>
      )}
    </header>
  );
}