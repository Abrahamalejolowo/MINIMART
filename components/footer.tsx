import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  MARKETPLACE: [
    { label: "All Categories", href: "/shop" },
    { label: "New Arrivals", href: "/shop?sort=new" },
    { label: "Best Sellers", href: "/shop?sort=popular" },
    { label: "Gift Cards", href: "/gift-cards" },
  ],
  COMPANY: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
  ],
  SUPPORT: [
    { label: "Help Center", href: "/help" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
             <div className="relative h-12 w-12 overflow-hidden rounded-md bg-white p-1">
  <Image
    src="/min2.png"
    alt="Minmart Logo"
    fill
    className="object-contain"
  />
</div>
              <span className="font-heading text-xl font-bold text-background">
                Min<span className="text-green-700">mart</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-background/60">
              {
                "Minmart is Nigeria's premier digital marketplace connecting authentic local producers with global quality seekers."
              }
            </p>
            {/* Social */}
            <div className="mt-6 flex gap-3">
              {["Facebook", "Instagram", "Twitter"].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-background/20 text-background/60 transition-colors hover:border-green hover:text-green"
                >
                  <span className="text-xs font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-background/40">
                {heading}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/60 transition-colors hover:text-green"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-8 md:flex-row">
          <p className="text-xs text-background/40">
            {"© 2026 Minmart Inc. All rights reserved."}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-background/40">
              Secured with SSL Encryption
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
