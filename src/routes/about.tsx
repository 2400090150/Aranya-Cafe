import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, Coffee, Heart, Sparkles } from "lucide-react";
import { PageShell, PageHeader } from "@/components/site/SiteChrome";
import { Reveal } from "@/components/site/Reveal";
import aboutImg from "@/assets/about-coffee.jpg";
import heroImg from "@/assets/hero-cafe.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Aranya Cafe Suryalanka" },
      { name: "description", content: "The story behind Aranya — a nature-inspired cafe beside Suryalanka Beach in Bapatla, Andhra Pradesh." },
      { property: "og:title", content: "Our Story — Aranya Cafe" },
      { property: "og:description", content: "A quiet corner of forest, beside the sea." },
      { property: "og:image", content: aboutImg },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: Leaf, title: "Rooted in nature", text: "Every corner of Aranya is designed to soften the day — plants, raw wood, warm light." },
  { icon: Coffee, title: "Quietly obsessed", text: "From bean to brew, we care about the small things you can taste in every sip." },
  { icon: Heart, title: "For everyone", text: "Prices that start at ₹1, because good places shouldn't be exclusive." },
  { icon: Sparkles, title: "Slow evenings", text: "We built this for lingering — long conversations, soft music, sea breeze." },
];

function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Our Story"
        title={<>A quiet corner of forest, <em className="italic text-accent">beside the sea.</em></>}
        subtitle="Aranya means 'forest' in Sanskrit. We named the cafe for the feeling — sheltered, green, and a little bit hidden."
      />
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 items-start">
          <Reveal className="md:col-span-3">
            <img
              src={aboutImg}
              alt="Coffee with leaves"
              className="rounded-2xl shadow-[var(--shadow-warm)] w-full object-cover aspect-[4/5]"
              loading="lazy"
            />
          </Reveal>
          <Reveal delay={1} className="md:col-span-2">
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Aranya started as a small idea: a place near the beach where the
                food, the light, and the silence all do their part.
              </p>
              <p>
                We're a few steps from Suryalanka Beach in Bapatla — close enough
                to hear the waves on a quiet evening, far enough that you can
                actually slow down.
              </p>
              <p className="font-display text-2xl italic text-primary">
                "We built it as a pause."
              </p>
              <p>
                Open till 11 PM, every day. Dine-in, drive-through, or no-contact
                delivery. Whatever brings you here.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-24 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="eyebrow-line text-xs uppercase tracking-[0.25em] text-accent font-medium">What we care about</span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl text-primary leading-tight max-w-2xl">
              Four small things, every day.
            </h2>
          </Reveal>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={(i % 4) as 0 | 1 | 2 | 3}>
                <div className="h-full rounded-2xl bg-card border border-border p-7 hover:-translate-y-1 hover:shadow-[var(--shadow-warm)] transition-all duration-500">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl text-primary">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-32 overflow-hidden">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover animate-kenburns" />
        <div className="absolute inset-0 bg-primary/80" />
        <Reveal className="relative max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl sm:text-6xl text-cream leading-tight">
            Come find your <em className="italic text-accent">slow evening.</em>
          </h2>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/menu" className="rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-foreground shadow-[var(--shadow-glow)] hover:scale-[1.04] transition-transform">
              See the menu
            </Link>
            <Link to="/visit" className="rounded-full border border-cream/40 bg-[oklch(1_0_0/0.05)] backdrop-blur px-7 py-3.5 text-sm font-medium text-cream hover:bg-cream hover:text-primary transition-colors">
              Find us
            </Link>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
