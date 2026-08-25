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
    { label: "Contact", href: "/coming-soon" },
    { label: "Careers", href: "/coming-soon" },
    { label: "Blog", href: "/coming-soon" },
  ],
  Support: [
    { label: "Help Center", href: "/coming-soon" },
    { label: "Privacy Policy", href: "/coming-soon" },
    { label: "Terms of Service", href: "/coming-soon" },
    { label: "Refund Policy", href: "/coming-soon" },
  ],
};

const socialLinks = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "Twitter", href: "#", icon: Twitter },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-10 lg:px-8">
        <div className="grid gap-6 sm:gap-8 grid-cols-2 md:grid-cols-5">
          
          {/* BRAND SECTION */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="inline-block">
              <div className="relative h-8 w-28 sm:h-10 sm:w-36 rounded-md bg-white p-1">
                <Image
                  src="/SENT.png"
                  alt="Minmart Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </Link>

            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-background/70 max-w-sm">
              Minmart is Nigeria&apos;s curated marketplace for authentic local
              products, connecting talented creators with customers who value
              quality.
            </p>

            {/* SOCIAL LINKS */}
            <div className="mt-4 flex gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-background/20 text-background/70 transition-colors hover:border-green-500 hover:text-green-500"
                  >
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* LINK COLUMNS */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="col-span-1">
              <h4 className="mb-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-background/50">
                {heading}
              </h4>

              <ul className="space-y-1.5 sm:space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-background/70 transition-colors hover:text-green-500"
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
        <div className="mt-6 sm:mt-10 flex flex-row items-center justify-between border-t border-background/10 pt-4 text-[11px] sm:text-xs text-background/50 gap-2">
          <p>© 2026 Minmart. All rights reserved.</p>

          <div className="flex items-center gap-1.5 shrink-0">
            <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
            <span>SSL Secured</span>
          </div>
        </div>
      </div>
    </footer>
  );
}