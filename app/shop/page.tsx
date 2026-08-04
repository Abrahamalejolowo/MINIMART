"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ShopFilters } from "@/components/shop-filters";
import { ProductGrid } from "@/components/product-grid";
import { useCart } from "@/context/CartContext";
import { marketplaceDatabase, type Product } from "@/database/page";
import Image from "next/image";
import {
  ShoppingCart,
  Heart,
  X,
  Search,
  Sparkles,
  ArrowUpDown,
  PackageX,
  Loader2,
  Flame,
  Clock,
} from "lucide-react";

const ITEMS_PER_BATCH = 8;

const cleanText = (text: string = "") => text.replace(/[()]/g, "").trim();

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "low-high" | "high-low">("default");

  // WISHLIST / LOVE TRACKING STATE
  const [wishlist, setWishlist] = useState<(string | number)[]>([]);

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);
  const [loadingMore, setLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [heroDealIndex, setHeroDealIndex] = useState(0);

  const [filters, setFilters] = useState({
    category: "all",
    subcategories: [] as string[],
    priceRange: [0, 100000] as [number, number],
    rating: 0,
  });

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProducts([...marketplaceDatabase]);
      } catch (error) {
        setProducts(marketplaceDatabase);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Spotlight Carousel Switcher
  useEffect(() => {
    if (!products.length) return;
    const interval = setInterval(() => {
      setHeroDealIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [products]);

  const currentHeroProduct = useMemo(() => {
    if (!products.length) return null;
    return products[heroDealIndex % products.length];
  }, [products, heroDealIndex]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setVisibleCount(ITEMS_PER_BATCH);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setVisibleCount(ITEMS_PER_BATCH);
  };

  const handleSortChange = (sort: typeof sortBy) => {
    setSortBy(sort);
    setVisibleCount(ITEMS_PER_BATCH);
  };

  const handleAddToCart = (p: Product) => {
    if (!p) return;
    addToCart({
      id: String(p.id),
      name: cleanText(p.title),
      price: p.price,
      image: p.image,
    });
  };

  // TOGGLE HEART / WISHLIST ITEM
  const toggleWishlist = (productId: string | number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      if (
        filters.category !== "all" &&
        product.category?.toLowerCase() !== filters.category.toLowerCase()
      ) {
        return false;
      }

      if (
        filters.subcategories.length > 0 &&
        (!product.subcategory || !filters.subcategories.includes(product.subcategory))
      ) {
        return false;
      }

      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false;
      }

      const matchesSearch =
        product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase()));

      return !searchQuery || matchesSearch;
    });

    if (sortBy === "low-high") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-low") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, filters, searchQuery, sortBy]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const handleLoadMore = () => {
    if (loadingMore || visibleCount >= filteredProducts.length) return;
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + ITEMS_PER_BATCH);
      setLoadingMore(false);
    }, 350);
  };

  const hasMore = visibleCount < filteredProducts.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          handleLoadMore();
        }
      },
      { threshold: 0.5 }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadingMore]);

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased text-foreground">
      <Navbar />

      <main className="flex-1">
        {/* HERO SPOTLIGHT SECTION */}
        <section className="relative overflow-hidden border-b border-border bg-card py-10 lg:py-16">
          <div className="pointer-events-none absolute -top-40 -left-40 -z-10 h-[500px] w-[500px] rounded-full bg-[hsl(var(--green))]/10 blur-[130px]" />
          <div className="pointer-events-none absolute -bottom-40 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[120px]" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--green))]/30 bg-[hsl(var(--green))]/10 px-3.5 py-1.5 text-xs font-bold text-[hsl(var(--green))] shadow-xs">
                  <Sparkles className="h-4 w-4" />
                  <span>Nigeria’s Premier Marketplace</span>
                </div>

                <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl leading-[1.1] text-foreground">
                  Discover Authentic <br />
                  <span className="bg-gradient-to-r from-[hsl(var(--green))] via-emerald-500 to-teal-600 bg-clip-text text-transparent">
                    Nigerian Craftsmanship
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed">
                  Support independent local artisans, fashion creators, and food producers with nationwide tracked delivery.
                </p>

                <div className="relative max-w-xl">
                  <div className="relative flex items-center rounded-2xl border-2 border-border bg-background p-2 shadow-xl focus-within:border-[hsl(var(--green))] transition-all">
                    <Search className="ml-3 h-5 w-5 text-muted-foreground shrink-0" />
                    <input
                      type="text"
                      placeholder="Search Ankara, handcrafted shoes, cosmetics..."
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="w-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground text-foreground font-medium"
                    />
                    {searchQuery && (
                      <button onClick={() => handleSearchChange("")} className="p-1 text-muted-foreground hover:text-foreground mr-2">
                        <X className="h-4 w-4" />
                      </button>
                    )}
                    <button className="rounded-xl bg-[hsl(var(--green))] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90 shadow-md transition-opacity">
                      Search
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                {currentHeroProduct ? (
                  <div className="relative h-[380px] w-full overflow-hidden rounded-3xl border-2 border-[hsl(var(--green))]/30 shadow-2xl transition-all duration-700 group">
                    <Image
                      key={currentHeroProduct.id}
                      src={currentHeroProduct.image}
                      alt={cleanText(currentHeroProduct.title)}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-all duration-700 animate-in fade-in zoom-in-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/90 backdrop-blur-md text-white px-3 py-1 text-xs font-black uppercase tracking-wider shadow-lg">
                        <Flame className="h-3.5 w-3.5 fill-current" /> Spotlight Product
                      </span>

                      {/* HERO HEART BUTTON */}
                      <button
                        onClick={() => toggleWishlist(currentHeroProduct.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:scale-110 transition-all shadow-md"
                      >
                        <Heart
                          className={`h-4 w-4 transition-colors ${
                            wishlist.includes(currentHeroProduct.id)
                              ? "fill-red-500 text-red-500"
                              : "text-white"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10 space-y-3">
                      <div className="flex items-center justify-between text-white/80 text-xs font-bold">
                        <span className="uppercase tracking-wider text-[hsl(var(--green))] font-black bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/10">
                          {currentHeroProduct.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-white line-clamp-1 drop-shadow-md">
                        {cleanText(currentHeroProduct.title)}
                      </h3>

                      <div className="flex items-center justify-between pt-1">
                        <div>
                          <span className="text-2xl font-black text-white drop-shadow-md">
                            ₦{new Intl.NumberFormat("en-NG").format(currentHeroProduct.price)}
                          </span>
                        </div>

                        <button
                          onClick={() => handleAddToCart(currentHeroProduct)}
                          className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--green))] px-5 py-2.5 text-xs font-bold text-white shadow-lg hover:opacity-90 transition-opacity active:scale-95"
                        >
                          <ShoppingCart className="h-4 w-4" /> Add To Cart
                        </button>
                      </div>

                      <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mt-2 backdrop-blur-xs">
                        <div
                          key={heroDealIndex}
                          className="bg-[hsl(var(--green))] h-full"
                          style={{ animation: "progress 10s linear infinite" }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-[380px] rounded-3xl bg-secondary animate-pulse" />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* MARKETPLACE CONTENT */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-4">
            <aside className="lg:col-span-1">
              <div className="sticky top-20">
                <ShopFilters onFilterChange={handleFilterChange} />
              </div>
            </aside>

            <section className="lg:col-span-3">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-border gap-4">
                <h2 className="text-lg font-black text-foreground">
                  {searchQuery ? `Search results for "${searchQuery}"` : "Explore Catalog"}
                </h2>

                <div className="relative inline-flex items-center">
                  <select
                    value={sortBy}
                    onChange={(e: any) => handleSortChange(e.target.value)}
                    className="appearance-none rounded-xl border border-border bg-card pl-3 pr-8 py-2 text-xs font-bold uppercase tracking-wider text-foreground outline-none focus:ring-2 focus:ring-[hsl(var(--green))] cursor-pointer shadow-xs"
                  >
                    <option value="default">Sort: Featured</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                  </select>
                  <ArrowUpDown className="pointer-events-none absolute right-2.5 h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rounded-2xl border border-border bg-card p-4 space-y-4 animate-pulse">
                      <div className="h-48 rounded-xl bg-secondary" />
                      <div className="h-4 w-3/4 rounded bg-secondary" />
                      <div className="h-4 w-1/2 rounded bg-secondary" />
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="flex h-80 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border bg-card p-8 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-[hsl(var(--green))] mb-3">
                    <PackageX className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-black text-foreground">No Items Found</h3>
                  <p className="mt-1 text-xs text-muted-foreground max-w-xs">
                    Try adjusting your filters or search phrase.
                  </p>
                  <button
                    onClick={() => handleSearchChange("")}
                    className="mt-4 rounded-xl bg-[hsl(var(--green))] px-5 py-2.5 text-xs font-bold text-white hover:opacity-90 shadow-md transition-opacity"
                  >
                    Reset Search
                  </button>
                </div>
              ) : (
                <>
                  <ProductGrid
                    products={displayedProducts.map((p) => ({
                      id: String(p.id),
                      name: cleanText(p.title),
                      brand: cleanText(p.brand),
                      price: p.price,
                      image: p.image,
                      category: p.category,
                      rawProduct: p,
                    }))}
                    wishlist={wishlist}
                    onToggleWishlist={toggleWishlist}
                    onAddToCart={(item: any) => handleAddToCart(item.rawProduct)}
                    onQuickView={(item: any) => setSelectedProduct(item.rawProduct)}
                  />

                  {hasMore && (
                    <div ref={loadMoreRef} className="mt-12 flex flex-col items-center justify-center gap-3 py-6">
                      <button
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--green))] px-8 py-3 text-sm font-bold text-white shadow-lg hover:opacity-90 transition-all cursor-pointer disabled:opacity-50"
                      >
                        {loadingMore ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Loading more products...</span>
                          </>
                        ) : (
                          <span>Load More Products</span>
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />

      {/* QUICK VIEW POPUP MODAL */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-card p-6 shadow-2xl transition-all md:p-8 animate-in zoom-in-95 duration-200 grid md:grid-cols-2 gap-6 border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-foreground hover:bg-border transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-secondary border border-border">
              <Image
                src={selectedProduct.image}
                alt={cleanText(selectedProduct.title)}
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-[hsl(var(--green))] font-black">
                  {selectedProduct.category}
                </span>

                <h3 className="mt-2 text-xl font-black text-foreground leading-tight">
                  {cleanText(selectedProduct.title)}
                </h3>

                {selectedProduct.brand && (
                  <p className="text-xs text-muted-foreground font-semibold mt-1">
                    {cleanText(selectedProduct.brand)}
                  </p>
                )}

                <p className="mt-3 text-2xl font-black text-foreground">
                  ₦{new Intl.NumberFormat("en-NG").format(selectedProduct.price)}
                </p>

                <hr className="my-4 border-border" />

                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Product Description
                </h4>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed max-h-[140px] overflow-y-auto">
                  {selectedProduct.description ||
                    "Premium authentic quality item curated directly from talented local creators."}
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--green))] hover:opacity-90 text-white font-bold py-3.5 px-4 shadow-lg transition-colors"
                >
                  <ShoppingCart className="h-4 w-4" /> Add To Cart
                </button>

                {/* MODAL HEART BUTTON */}
                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-secondary transition-all"
                >
                  <Heart
                    className={`h-5 w-5 transition-colors ${
                      wishlist.includes(selectedProduct.id)
                        ? "fill-red-500 text-red-500"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}