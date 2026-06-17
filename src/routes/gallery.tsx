import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/SiteChrome";
import { Reveal } from "@/components/site/Reveal";
import hero from "@/assets/hero-cafe.jpg";
import about from "@/assets/about-coffee.jpg";
import coffee from "@/assets/menu-coffee.jpg";
import snacks from "@/assets/menu-snacks.jpg";
import main from "@/assets/menu-main.jpg";
import dessert from "@/assets/menu-dessert.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Aranya Cafe Suryalanka" },
      { name: "description", content: "A look inside Aranya Cafe — interiors, food and evening views from Suryalanka Beach Road, Bapatla." },
      { property: "og:title", content: "Gallery — Aranya Cafe" },
      { property: "og:description", content: "A look inside Aranya Cafe." },
      { property: "og:image", content: hero },
    ],
  }),
  component: GalleryPage,
});

const IMAGES = [
  { src: hero, alt: "Evening at Aranya with warm string lights", span: "md:col-span-2 md:row-span-2" },
  { src: coffee, alt: "Filter coffee on a wooden table", span: "" },
  { src: about, alt: "Latte art with tropical leaves", span: "" },
  { src: snacks, alt: "Crispy samosas and chutney", span: "" },
  { src: main, alt: "Andhra meals plated", span: "md:col-span-2" },
  { src: dessert, alt: "Chocolate brownie dessert", span: "" },
];

function GalleryPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Gallery"
        title={<>A look <em className="italic text-accent">inside.</em></>}
        subtitle="Mornings, evenings, plates, faces — small moments from Aranya."
      />
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:auto-rows-[220px]">
          {IMAGES.map((img, i) => (
            <Reveal
              key={i}
              delay={(i % 4) as 0 | 1 | 2 | 3}
              className={`relative overflow-hidden rounded-2xl group ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p className="absolute bottom-4 left-4 right-4 text-cream text-sm font-display italic translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                {img.alt}
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-20 text-center">
          <p className="font-display italic text-2xl text-primary">
            More moments on <a href="https://instagram.com/rupeshravu" target="_blank" rel="noreferrer" className="text-accent underline-offset-4 hover:underline">Instagram</a>.
          </p>
        </Reveal>
      </section>
    </PageShell>
  );
}
