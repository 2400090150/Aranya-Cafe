import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Clock, Phone, Instagram, Send } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { PageShell, PageHeader, WHATSAPP, MAPS } from "@/components/site/SiteChrome";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

function VisitPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Visit Us"
        title={<>Find your way <em className="italic text-accent">to Aranya.</em></>}
        subtitle="Beside Nagaravanam on Bapatla Suryalanka Road — five minutes from the beach, open till 11 PM."
      />
      <section className="px-6 pb-16">
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

      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-8">
              <span className="eyebrow-line text-xs uppercase tracking-[0.25em] text-accent font-medium">Say Hello</span>
              <h2 className="mt-3 font-display text-4xl text-primary">Drop us a message</h2>
              <p className="mt-2 text-muted-foreground">Reservations, feedback or a quick question — we read every one.</p>
            </div>
            <InquiryForm />
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}

function InquiryForm() {
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = inquirySchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.from("inquiries").insert({
        name: parsed.data.name,
        email: parsed.data.email || null,
        phone: parsed.data.phone || null,
        message: parsed.data.message,
      });
      if (error) throw error;
      toast.success("Thanks! We'll get back to you soon.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      toast.error(err.message ?? "Could not send. Try WhatsApp instead?");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4 shadow-[var(--shadow-warm)]">
      <div className="grid sm:grid-cols-2 gap-4">
        <input required maxLength={100} placeholder="Your name *"
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-accent" />
        <input type="email" maxLength={255} placeholder="Email"
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-accent" />
      </div>
      <input maxLength={30} placeholder="Phone (optional)"
        value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-accent" />
      <textarea required rows={5} maxLength={2000} placeholder="Your message *"
        value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-accent resize-none" />
      <button type="submit" disabled={busy}
        className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-60">
        <Send className="h-4 w-4" /> {busy ? "Sending…" : "Send Message"}
      </button>
    </form>
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
