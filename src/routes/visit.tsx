import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Clock, Phone, Instagram } from "lucide-react";
import { PageShell, PageHeader, WHATSAPP, MAPS } from "@/components/site/SiteChrome";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/visit")({
  head: () => ({
    meta: [
      { title: "Visit Us — Aranya Cafe Suryalanka" },
      { name: "description", content: "Find Aranya Cafe on Bapatla Suryalanka Road, beside Nagaravanam. Open daily till 11 PM." },
      { property: "og:title", content: "Visit Aranya Cafe" },
      { property: "og:description", content: "Suryalanka Beach Road, Bapatla. Open daily till 11 PM." },
    ],
  }),
  component: VisitPage,
});

function VisitPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Visit Us"
        title={<>Find your way <em className="italic text-accent">to Aranya.</em></>}
        subtitle="Beside Nagaravanam on Bapatla Suryalanka Road — five minutes from the beach, open till 11 PM."
      />
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-stretch">
          <Reveal>
            <div className="space-y-7">
              <InfoRow icon={MapPin} title="Address">
                Bapatla Suryalanka Rd, beside Nagaravanam,<br />
                Bapatla, Andhra Pradesh 522102
              </InfoRow>
              <InfoRow icon={Clock} title="Hours">
                Open daily · Closes 11:00 PM
              </InfoRow>
              <InfoRow icon={Phone} title="Get in touch">
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                  Message us on WhatsApp →
                </a>
              </InfoRow>
              <InfoRow icon={Instagram} title="Follow along">
                <a href="https://instagram.com/rupeshravu" target="_blank" rel="noreferrer" className="text-accent hover:underline">
                  @rupeshravu on Instagram
                </a>
              </InfoRow>
              <div className="pt-4 flex flex-wrap gap-3">
                <a href={MAPS} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                  <MapPin className="h-4 w-4" /> Open in Google Maps
                </a>
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-secondary transition-colors">
                  Reserve a table
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div className="rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-warm)] min-h-[460px] h-full">
              <iframe
                title="Aranya Cafe location"
                src="https://www.google.com/maps?q=Aranya+Cafe+Suryalanka+Bapatla&output=embed"
                className="w-full h-full min-h-[460px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
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
