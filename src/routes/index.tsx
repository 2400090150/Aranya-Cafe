import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  MapPin, Clock, Coffee, Leaf, Moon, Star, Menu as MenuIcon,
  Instagram, Facebook, MessageCircle, Phone, X,
} from "lucide-react";
import heroImg from "@/assets/hero-cafe.jpg";
import aboutImg from "@/assets/about-coffee.jpg";
import menuCoffee from "@/assets/menu-coffee.jpg";
import menuSnacks from "@/assets/menu-snacks.jpg";
import menuMain from "@/assets/menu-main.jpg";
import menuDessert from "@/assets/menu-dessert.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aranya Cafe Suryalanka — Where Nature Meets Flavor" },
      { name: "description", content: "A thoughtfully designed, nature-inspired cafe on Suryalanka Beach Road, Bapatla. Dine-in, drive-through & no-contact delivery. Open till 11 PM daily." },
      { property: "og:title", content: "Aranya Cafe Suryalanka" },
      { property: "og:description", content: "Where Nature Meets Flavor — a cozy beachside cafe in Bapatla." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const NAV = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Why Us", href: "#why" },
  { label: "Menu", href: "#menu" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#visit" },
];

const WHATSAPP = "https://wa.me/919999999999?text=Hi%20Aranya%20Cafe!";
const MAPS = "https://www.google.com/maps/search/?api=1&query=Aranya+Cafe+Suryalanka+Bapatla";

function HomePage() {
  const [open, setOpen] = useState(false);
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <Header open={open} setOpen={setOpen} />
      <Hero />
      <About />
      <WhyVisit />
      <MenuSection />
      <Reviews />
      <Visit />
      <Footer />
      <WhatsAppFab />
    </div>
  );
}

function Header({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-[color-mix(in_oklab,var(--cream)_82%,transparent)] border-b border-border/60">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Leaf className="h-4 w-4" />
          </span>
          <span className="font-display text-2xl font-semibold tracking-tight text-primary">
            Aranya
          </span>
        </a>
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-primary/80">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="hover:text-accent transition-colors">{n.label}</a>
            </li>
          ))}
        </ul>
        <a
          href={MAPS} target="_blank" rel="noreferrer"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <MapPin className="h-4 w-4" /> Directions
        </a>
        <button onClick={() => setOpen(!open)} className="md:hidden text-primary p-2" aria-label="Toggle menu">
          {open ? <X /> : <MenuIcon />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <ul className="px-6 py-4 space-y-3 text-primary">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)} className="block py-1">{n.label}</a>
              </li>
            ))}
            <li><a href={MAPS} target="_blank" rel="noreferrer" className="block py-1 text-accent">Get Directions →</a></li>
          </ul>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroImg}
        alt="Aranya Cafe outdoor seating with warm string lights at dusk near Suryalanka Beach"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.18_0.03_145/0.55)] via-[oklch(0.18_0.03_145/0.45)] to-[oklch(0.15_0.025_145/0.85)]" />
      <div className="relative z-10 max-w-4xl text-center px-6 pt-24 pb-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-[oklch(1_0_0/0.08)] backdrop-blur px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-cream">
          <Leaf className="h-3.5 w-3.5" /> Suryalanka Beach Road · Bapatla
        </span>
        <h1 className="mt-6 font-display text-5xl sm:text-7xl md:text-8xl font-medium text-cream leading-[0.95]">
          Aranya <span className="italic text-accent">Cafe</span>
        </h1>
        <p className="mt-6 font-display italic text-2xl sm:text-3xl text-cream/90">
          Where Nature Meets Flavor
        </p>
        <p className="mt-4 max-w-xl mx-auto text-cream/75 text-base">
          A thoughtfully designed cafe tucked beside the sea — warm light, slow evenings,
          and coffee that lingers.
        </p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <a
            href="#menu"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-foreground shadow-[var(--shadow-glow)] hover:scale-[1.02] transition-transform"
          >
            View Menu
          </a>
          <a
            href={MAPS} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-cream/40 bg-[oklch(1_0_0/0.05)] backdrop-blur px-7 py-3.5 text-sm font-medium text-cream hover:bg-cream hover:text-primary transition-colors"
          >
            <MapPin className="h-4 w-4" /> Get Directions
          </a>
        </div>
        <div className="mt-12 flex items-center justify-center gap-6 text-cream/70 text-sm">
          <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-accent text-accent" /> 4.7 · 148 reviews</span>
          <span className="h-3 w-px bg-cream/30" />
          <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> Open till 11 PM</span>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 sm:py-32 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img
            src={aboutImg}
            alt="Latte art coffee with tropical leaves on wooden table"
            width={1280} height={1280} loading="lazy"
            className="rounded-2xl shadow-[var(--shadow-warm)] aspect-square object-cover"
          />
          <div className="absolute -bottom-6 -right-6 hidden sm:block bg-primary text-primary-foreground rounded-2xl p-6 shadow-[var(--shadow-warm)]">
            <p className="font-display text-4xl">4.7<span className="text-accent">★</span></p>
            <p className="text-xs uppercase tracking-widest opacity-80 mt-1">148 reviews</p>
          </div>
        </div>
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-medium">Our Story</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-primary leading-tight">
            A quiet corner of forest, beside the sea.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Aranya is a thoughtfully planned, aesthetically done café a few steps from
            Suryalanka Beach. We built it as a pause — somewhere you can slow down
            over filter coffee, share a plate, and watch the evening turn into night
            under our string lights.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Welcoming everyone with prices that start at just ₹1, because good places
            shouldn't be exclusive.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { k: "Dine-in", v: "Cozy seating" },
              { k: "Drive-thru", v: "Quick grab" },
              { k: "Delivery", v: "No-contact" },
            ].map((b) => (
              <div key={b.k} className="rounded-xl border border-border bg-card p-4">
                <p className="font-display text-lg text-primary">{b.k}</p>
                <p className="text-xs text-muted-foreground mt-1">{b.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyVisit() {
  const items = [
    { icon: Leaf, title: "Cozy Ambience", text: "Aesthetically designed with a nature-inspired interior that feels like a hidden grove." },
    { icon: Coffee, title: "Coffee Lovers' Paradise", text: "A must-visit for anyone serious about a great cup, brewed with intention." },
    { icon: Moon, title: "Stunning Night Views", text: "Warm light, sea breeze, palm shadows — Suryalanka after dark is something else." },
    { icon: Star, title: "Loved by 148+", text: "A 4.7-star rating from guests who've made Aranya part of their evenings." },
  ];
  return (
    <section id="why" className="py-24 sm:py-32 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-medium">Why Visit</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-primary leading-tight">
            Four reasons people keep coming back.
          </h2>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it) => (
            <div key={it.title} className="group rounded-2xl bg-card border border-border p-7 hover:shadow-[var(--shadow-warm)] hover:-translate-y-1 transition-all duration-300">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-2xl text-primary">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuSection() {
  const cats = [
    {
      img: menuCoffee, name: "Coffee & Beverages",
      items: [
        { n: "Filter Coffee", d: "South Indian classic, freshly brewed", p: "₹40" },
        { n: "Cappuccino", d: "Bold espresso with silky foam", p: "₹110" },
        { n: "Cold Brew", d: "Slow-steeped, smooth & bright", p: "₹150" },
      ],
    },
    {
      img: menuSnacks, name: "Snacks",
      items: [
        { n: "Crispy Samosa", d: "Spiced potato, mint chutney", p: "₹30" },
        { n: "Masala Fries", d: "Hot, crisp, perfectly spiced", p: "₹90" },
        { n: "Veg Sandwich", d: "Toasted, layered, fresh", p: "₹120" },
      ],
    },
    {
      img: menuMain, name: "Main Course",
      items: [
        { n: "Andhra Meals", d: "Rice, curry, sambar & papad", p: "₹180" },
        { n: "Paneer Tikka Bowl", d: "Smoky grilled paneer with rice", p: "₹200" },
        { n: "Pasta Arrabbiata", d: "Spicy tomato, garlic, herbs", p: "₹190" },
      ],
    },
    {
      img: menuDessert, name: "Desserts",
      items: [
        { n: "Chocolate Brownie", d: "Warm, gooey, caramel drizzle", p: "₹130" },
        { n: "Filter Coffee Tiramisu", d: "Our local twist on a classic", p: "₹160" },
        { n: "Gulab Jamun (2 pc)", d: "Soft, syrupy, comforting", p: "₹60" },
      ],
    },
  ];
  return (
    <section id="menu" className="py-24 sm:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-medium">Menu</span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl text-primary leading-tight">
              Small plates, big flavor. Priced for everyone.
            </h2>
          </div>
          <p className="text-sm text-muted-foreground italic">Full menu coming soon</p>
        </div>
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {cats.map((c) => (
            <article key={c.name} className="rounded-2xl overflow-hidden bg-card border border-border hover:shadow-[var(--shadow-warm)] transition-shadow">
              <div className="aspect-[16/9] overflow-hidden">
                <img src={c.img} alt={c.name} width={800} height={450} loading="lazy"
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-7">
                <h3 className="font-display text-3xl text-primary">{c.name}</h3>
                <ul className="mt-5 divide-y divide-border">
                  {c.items.map((i) => (
                    <li key={i.n} className="py-3 flex items-baseline gap-4">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{i.n}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{i.d}</p>
                      </div>
                      <span className="font-display text-lg text-accent font-semibold">{i.p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const list = [
    { q: "A welcome and much-needed addition… aesthetically done and very well maintained.", a: "Srikanth Golakoti", t: "Local Guide" },
    { q: "The food is fantastic. Each dish is unique with superb taste.", a: "The Review Master", t: "Local Guide" },
    { q: "Must try especially at night — the view will be stunning.", a: "Shahil Shaik", t: "Local Guide" },
  ];
  return (
    <section id="reviews" className="py-24 sm:py-32 px-6 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,var(--amber-warm),transparent_50%)]" />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-medium">Reviews</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl leading-tight">
            What our guests are saying.
          </h2>
          <div className="mt-5 flex items-center justify-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-accent text-accent" />
            ))}
            <span className="ml-2 text-cream/85">4.7 from 148 reviews</span>
          </div>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {list.map((r) => (
            <figure key={r.a} className="rounded-2xl bg-[oklch(1_0_0/0.06)] backdrop-blur border border-cream/15 p-7">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="font-display italic text-xl leading-snug">"{r.q}"</blockquote>
              <figcaption className="mt-6 text-sm">
                <p className="font-medium">{r.a}</p>
                <p className="text-cream/65 text-xs mt-0.5">{r.t}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a
            href={MAPS}
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:underline underline-offset-4"
          >
            See all 148 reviews on Google →
          </a>
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="visit" className="py-24 sm:py-32 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-stretch">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-medium">Visit Us</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-primary leading-tight">
            Find your way to Aranya.
          </h2>
          <div className="mt-10 space-y-7">
            <InfoRow icon={MapPin} title="Address">
              Bapatla Suryalanka Rd, beside Nagaravanam,<br />
              Bapatla, Andhra Pradesh 522102
            </InfoRow>
            <InfoRow icon={Clock} title="Hours">
              Open daily · Closes 11:00 PM
            </InfoRow>
            <InfoRow icon={Phone} title="Get in touch">
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                Message on WhatsApp
              </a>
            </InfoRow>
          </div>
          <div className="mt-10 flex items-center gap-3">
            <a href="#" aria-label="Instagram" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Facebook" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-warm)] min-h-[420px]">
          <iframe
            title="Aranya Cafe location"
            src="https://www.google.com/maps?q=Aranya+Cafe+Suryalanka+Bapatla&output=embed"
            className="w-full h-full min-h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon: Icon, title, children }: { icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="font-display text-lg text-primary">{title}</p>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-cream/10">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Leaf className="h-4 w-4" />
            </span>
            <span className="font-display text-2xl">Aranya</span>
          </div>
          <p className="mt-4 text-sm text-cream/70 max-w-xs">
            Where Nature Meets Flavor — a cozy cafe on Suryalanka Beach Road.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-accent">Explore</p>
          <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-cream/80">
            {NAV.map((n) => (
              <li key={n.href}><a href={n.href} className="hover:text-accent">{n.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-accent">Visit</p>
          <p className="mt-4 text-sm text-cream/80 leading-relaxed">
            Bapatla Suryalanka Rd<br />beside Nagaravanam<br />Bapatla, AP 522102
          </p>
        </div>
      </div>
      <div className="border-t border-cream/10 px-6 py-5 text-center text-xs text-cream/55">
        © {new Date().getFullYear()} Aranya Cafe Suryalanka. All rights reserved.
      </div>
    </footer>
  );
}

function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP} target="_blank" rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[var(--shadow-glow)] hover:scale-110 transition-transform"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
