import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Leaf, MapPin, Menu as MenuIcon, X, Instagram, Facebook, MessageCircle,
} from "lucide-react";

export const WHATSAPP = "https://wa.me/919999999999?text=Hi%20Aranya%20Cafe!";
export const MAPS =
  "https://www.google.com/maps/search/?api=1&query=Aranya+Cafe+Suryalanka+Bapatla";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/menu", label: "Menu" },
  { to: "/gallery", label: "Gallery" },
  { to: "/visit", label: "Visit" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-[color-mix(in_oklab,var(--cream)_88%,transparent)] border-b border-border/60 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-12">
            <Leaf className="h-4 w-4" />
          </span>
          <span className="font-display text-2xl font-semibold tracking-tight text-primary">
            Aranya
          </span>
        </Link>
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-primary/80">
          {NAV.map((n) => (
            <li key={n.to}>
              <Link
                to={n.to}
                activeOptions={{ exact: true }}
                className="relative py-1 transition-colors hover:text-accent data-[status=active]:text-accent"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href={MAPS}
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all hover:shadow-[var(--shadow-glow)]"
        >
          <MapPin className="h-4 w-4" /> Directions
        </a>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-primary p-2"
          aria-label="Toggle menu"
        >
          {open ? <X /> : <MenuIcon />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background animate-fade-in-soft">
          <ul className="px-6 py-4 space-y-3 text-primary">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="block py-1">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={MAPS} target="_blank" rel="noreferrer" className="block py-1 text-accent">
                Get Directions →
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-cream/10">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground animate-float-slow">
              <Leaf className="h-4 w-4" />
            </span>
            <span className="font-display text-2xl">Aranya</span>
          </div>
          <p className="mt-4 text-sm text-cream/70 max-w-xs">
            Where Nature Meets Flavor — a cozy cafe on Suryalanka Beach Road.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://instagram.com/rupeshravu"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-accent">Explore</p>
          <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-cream/80">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-accent transition-colors">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-accent">Visit</p>
          <p className="mt-4 text-sm text-cream/80 leading-relaxed">
            Bapatla Suryalanka Rd<br />
            beside Nagaravanam<br />
            Bapatla, AP 522102
          </p>
        </div>
      </div>
      <div className="border-t border-cream/10 px-6 py-5 text-center text-xs text-cream/55">
        © {new Date().getFullYear()} Aranya Cafe Suryalanka. All rights reserved.
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[var(--shadow-glow)] hover:scale-110 transition-transform"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
}) {
  return (
    <section className="relative pt-36 pb-16 px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_20%_10%,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_50%),radial-gradient(circle_at_80%_30%,color-mix(in_oklab,var(--forest)_22%,transparent),transparent_55%)]" />
      <LeafParticles />
      <div className="max-w-7xl mx-auto relative animate-page-in">
        <span className="eyebrow-line text-xs uppercase tracking-[0.25em] text-accent font-medium">
          {eyebrow}
        </span>
        <h1 className="mt-4 font-display text-5xl sm:text-6xl md:text-7xl text-primary leading-[1.02] max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-xl text-muted-foreground text-lg leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

export function LeafParticles() {
  const leaves = Array.from({ length: 10 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {leaves.map((_, i) => (
        <span
          key={i}
          className="leaf-particle"
          style={{
            left: `${(i * 11 + 5) % 100}%`,
            animationDelay: `${i * 1.7}s`,
            animationDuration: `${14 + (i % 5) * 3}s`,
            background:
              i % 2 === 0
                ? "color-mix(in oklab, var(--accent) 80%, transparent)"
                : "color-mix(in oklab, var(--forest) 70%, transparent)",
          }}
        />
      ))}
    </div>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1 animate-fade-in-soft">{children}</main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
