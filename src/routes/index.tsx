import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Clock, Coffee, Leaf, Moon, Star } from "lucide-react";
import heroImg from "@/assets/hero-cafe.jpg";
import aboutImg from "@/assets/about-coffee.jpg";
import { PageShell, MAPS } from "@/components/site/SiteChrome";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aranya Cafe Suryalanka — Where Nature Meets Flavor" },
      { name: "description", content: "A thoughtfully designed, nature-inspired cafe on Suryalanka Beach Road, Bapatla. Dine-in, drive-through & no-contact delivery. Open till 11 PM daily." },
      { property: "og:title", content: "Aranya Cafe Suryalanka" },
      { property: "og:description", content: "Where Nature Meets Flavor — a cozy beachside cafe in Bapatla." },
      { property: "og:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <PageShell>
      <Hero />
      <AboutPreview />
      <WhyVisit />
      <MenuPreview />
      <ReviewsStrip />
    </PageShell>
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
        className="absolute inset-0 h-full w-full object-cover animate-kenburns"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.18_0.03_145/0.55)] via-[oklch(0.18_0.03_145/0.45)] to-[oklch(0.15_0.025_145/0.9)]" />
      <div className="relative z-10 max-w-4xl text-center px-6 pt-24 pb-16 animate-page-in">
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
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-foreground shadow-[var(--shadow-glow)] hover:scale-[1.04] transition-transform"
          >
            Explore Menu
          </Link>
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
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/60 text-xs uppercase tracking-[0.3em] animate-float-slow">
        scroll
      </div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="py-24 sm:py-32 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="relative">
            <img
              src={aboutImg}
              alt="Latte art with tropical leaves"
              width={1280} height={1280} loading="lazy"
              className="rounded-2xl shadow-[var(--shadow-warm)] aspect-square object-cover"
            />
            <div className="absolute -bottom-6 -right-6 hidden sm:block bg-primary text-primary-foreground rounded-2xl p-6 shadow-[var(--shadow-warm)] animate-float-slow">
              <p className="font-display text-4xl">4.7<span className="text-accent">★</span></p>
              <p className="text-xs uppercase tracking-widest opacity-80 mt-1">148 reviews</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={1}>
          <span className="eyebrow-line text-xs uppercase tracking-[0.25em] text-accent font-medium">Our Story</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-primary leading-tight">
            A quiet corner of forest, beside the sea.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Aranya is a thoughtfully planned café a few steps from Suryalanka Beach.
            Somewhere you can slow down over filter coffee, share a plate, and watch
            the evening turn into night under our string lights.
          </p>
          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 text-accent hover:gap-3 transition-all"
          >
            Read our story →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function WhyVisit() {
  const items = [
    { icon: Leaf, title: "Cozy Ambience", text: "Aesthetically designed nature-inspired interior that feels like a hidden grove." },
    { icon: Coffee, title: "Coffee Paradise", text: "A must-visit for anyone serious about a great cup, brewed with intention." },
    { icon: Moon, title: "Night Views", text: "Warm light, sea breeze, palm shadows — Suryalanka after dark is something else." },
    { icon: Star, title: "Loved by 148+", text: "A 4.7-star rating from guests who've made Aranya part of their evenings." },
  ];
  return (
    <section className="py-24 sm:py-32 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="max-w-2xl">
            <span className="eyebrow-line text-xs uppercase tracking-[0.25em] text-accent font-medium">Why Visit</span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl text-primary leading-tight">
              Four reasons people keep coming back.
            </h2>
          </div>
        </Reveal>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="group h-full rounded-2xl bg-card border border-border p-7 hover:shadow-[var(--shadow-warm)] hover:-translate-y-1 transition-all duration-500">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <it.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-2xl text-primary">{it.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuPreview() {
  return (
    <section className="py-24 sm:py-32 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <Reveal>
          <span className="eyebrow-line text-xs uppercase tracking-[0.25em] text-accent font-medium">Menu</span>
          <h2 className="mt-3 font-display text-4xl sm:text-6xl text-primary leading-tight max-w-3xl mx-auto">
            Small plates. Big flavor. Priced for everyone.
          </h2>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
            From ₹1 filter coffees to slow-cooked Andhra meals — a menu built for lingering.
          </p>
          <Link
            to="/menu"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Browse full menu →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function ReviewsStrip() {
  const list = [
    { q: "A welcome and much-needed addition… aesthetically done and very well maintained.", a: "Srikanth Golakoti" },
    { q: "The food is fantastic. Each dish is unique with superb taste.", a: "The Review Master" },
    { q: "Must try especially at night — the view will be stunning.", a: "Shahil Shaik" },
  ];
  return (
    <section className="py-24 sm:py-32 px-6 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,var(--amber-warm),transparent_50%)]" />
      <div className="max-w-7xl mx-auto relative">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow-line text-xs uppercase tracking-[0.25em] text-accent font-medium">Reviews</span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl leading-tight">
              What our guests are saying.
            </h2>
          </div>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {list.map((r, i) => (
            <Reveal key={r.a} delay={(i + 1) as 1 | 2 | 3}>
              <figure className="h-full rounded-2xl bg-[oklch(1_0_0/0.06)] backdrop-blur border border-cream/15 p-7">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="font-display italic text-xl leading-snug">"{r.q}"</blockquote>
                <figcaption className="mt-6 text-sm font-medium">— {r.a}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
