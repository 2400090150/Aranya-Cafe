import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/SiteChrome";
import { Reveal } from "@/components/site/Reveal";
import menuCoffee from "@/assets/menu-coffee.jpg";
import menuSnacks from "@/assets/menu-snacks.jpg";
import menuMain from "@/assets/menu-main.jpg";
import menuDessert from "@/assets/menu-dessert.jpg";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Aranya Cafe Suryalanka" },
      { name: "description", content: "Coffee, snacks, mains and desserts at Aranya Cafe, Suryalanka Beach Road, Bapatla. Prices from ₹1." },
      { property: "og:title", content: "Menu — Aranya Cafe" },
      { property: "og:description", content: "Small plates, big flavor. Priced for everyone." },
      { property: "og:image", content: menuCoffee },
    ],
  }),
  component: MenuPage,
});

const CATEGORIES = [
  {
    img: menuCoffee, name: "Coffee & Beverages", tag: "Brewed slow",
    items: [
      { n: "Filter Coffee", d: "South Indian classic, freshly brewed", p: "₹40" },
      { n: "Cappuccino", d: "Bold espresso with silky foam", p: "₹110" },
      { n: "Cold Brew", d: "Slow-steeped, smooth & bright", p: "₹150" },
      { n: "Masala Chai", d: "Cardamom, ginger, full milk", p: "₹50" },
      { n: "Iced Latte", d: "Espresso poured over chilled milk", p: "₹130" },
    ],
  },
  {
    img: menuSnacks, name: "Snacks & Small Plates", tag: "For sharing",
    items: [
      { n: "Crispy Samosa", d: "Spiced potato, mint chutney", p: "₹30" },
      { n: "Masala Fries", d: "Hot, crisp, perfectly spiced", p: "₹90" },
      { n: "Veg Sandwich", d: "Toasted, layered, fresh", p: "₹120" },
      { n: "Paneer Pakora", d: "Golden, gram flour batter", p: "₹140" },
    ],
  },
  {
    img: menuMain, name: "Main Course", tag: "Filling meals",
    items: [
      { n: "Andhra Meals", d: "Rice, curry, sambar & papad", p: "₹180" },
      { n: "Paneer Tikka Bowl", d: "Smoky grilled paneer with rice", p: "₹200" },
      { n: "Pasta Arrabbiata", d: "Spicy tomato, garlic, herbs", p: "₹190" },
      { n: "Veg Biryani", d: "Long grain rice, raita on side", p: "₹220" },
    ],
  },
  {
    img: menuDessert, name: "Desserts", tag: "Sweet endings",
    items: [
      { n: "Chocolate Brownie", d: "Warm, gooey, caramel drizzle", p: "₹130" },
      { n: "Filter Coffee Tiramisu", d: "Our local twist on a classic", p: "₹160" },
      { n: "Gulab Jamun (2 pc)", d: "Soft, syrupy, comforting", p: "₹60" },
      { n: "Affogato", d: "Vanilla ice cream + espresso shot", p: "₹140" },
    ],
  },
];

function MenuPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="The Menu"
        title={<>Small plates. <em className="italic text-accent">Big flavor.</em></>}
        subtitle="A curated menu — comforting Indian classics, careful coffee, and a few quiet surprises. From ₹1, because everyone's welcome."
      />
      <section className="px-6 pb-24 space-y-24">
        {CATEGORIES.map((cat, idx) => (
          <div key={cat.name} className="max-w-6xl mx-auto">
            <div className={`grid md:grid-cols-2 gap-10 items-center ${idx % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <Reveal>
                <div className="relative overflow-hidden rounded-2xl shadow-[var(--shadow-warm)] group">
                  <img
                    src={cat.img} alt={cat.name}
                    className="w-full aspect-[5/4] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-cream/90 backdrop-blur px-3 py-1 text-xs uppercase tracking-widest text-primary">
                    {cat.tag}
                  </span>
                </div>
              </Reveal>
              <Reveal delay={1}>
                <h2 className="font-display text-4xl sm:text-5xl text-primary leading-tight">
                  {cat.name}
                </h2>
                <ul className="mt-6 divide-y divide-border">
                  {cat.items.map((i) => (
                    <li key={i.n} className="py-4 flex items-baseline gap-4 group">
                      <div className="flex-1">
                        <p className="font-medium text-foreground group-hover:text-accent transition-colors">{i.n}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{i.d}</p>
                      </div>
                      <span className="font-display text-xl text-accent font-semibold">{i.p}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        ))}
      </section>
      <section className="px-6 py-16 bg-secondary text-center">
        <p className="font-display italic text-2xl text-primary">
          The full menu changes with the season — ask us about today's specials.
        </p>
      </section>
    </PageShell>
  );
}
