import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  ShieldCheck,
} from "lucide-react";

const footerLinks = {
  Marketplace: [
    { label: "All Categories", href: "/shop" },
    { label: "New Arrivals", href: "/shop?sort=new" },
    { label: "Best Sellers", href: "/shop?sort=popular" },
    { label: "Gift Cards", href: "/gift-cards" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
  ],
};

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    icon: Facebook,
  },
  {
    name: "Instagram",
    href: "#",
    icon: Instagram,
  },
  {
    name: "Twitter",
    href: "#",
    icon: Twitter,
  },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-5">
          {/* BRAND */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center">
  <div className="relative h-10 w-32 sm:h-10 sm:w-36 rounded-md bg-white p-1">
    <Image
      src="/SENT.png"
      alt="Minmart Logo"
      fill
      priority
      className="object-contain"
    />
  </div>
</Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-background/70">
              Minmart is Nigeria&apos;s curated marketplace for authentic local
              products, connecting talented creators with customers who value
              quality and craftsmanship.
            </p>

            {/* SOCIAL LINKS */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-background/20 text-background/70 transition-colors hover:border-green-500 hover:text-green-500"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* FOOTER LINKS */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-background/50">
                {heading}
              </h4>

              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/70 transition-colors hover:text-green-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 flex flex-col gap-4 border-t border-background/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-background/50">
            © 2026 Minmart. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-xs text-background/50">
            <ShieldCheck className="h-4 w-4 text-green-500" />
            <span>Secured with SSL Encryption</span>
          </div>
        </div>
      </div>
    </footer>
  );
}