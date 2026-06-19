import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageShell, PageHeader } from "@/components/site/SiteChrome";
import { toast } from "sonner";
import { Trash2, Upload, LogOut, Download, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Aranya Cafe" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Dish = {
  id: string;
  name: string;
  category: string;
  description: string | null;
  price: number | null;
  image_url: string | null;
  available: boolean;
  position: number;
  created_at: string;
};

type Inquiry = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  message: string;
  created_at: string;
};

const CATEGORIES = ["Coffee", "Snacks", "Mains", "Desserts", "Specials"];
const OWNER_EMAIL = "rupeshravu@gmail.com";

async function getSignedUrl(path: string) {
  // 1 year signed URL
  const { data } = await supabase.storage.from("dish-images").createSignedUrl(path, 60 * 60 * 24 * 365);
  return data?.signedUrl ?? null;
}

function AdminPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [tab, setTab] = useState<"dishes" | "inquiries">("dishes");

  // form state
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Specials");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    refresh();
  }, []);

  async function refresh() {
    const { data: d } = await supabase.from("dishes").select("*").order("position").order("created_at", { ascending: false });
    if (d) setDishes(d as Dish[]);
    const { data: i } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
    if (i) setInquiries(i as Inquiry[]);
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  async function addDish(e: React.FormEvent) {
    e.preventDefault();
    if (email !== OWNER_EMAIL) {
      toast.error(`Only the owner (${OWNER_EMAIL}) can add dishes.`);
      return;
    }
    setBusy(true);
    try {
      let image_url: string | null = null;
      if (file) {
        const ext = file.name.split(".").pop() ?? "jpg";
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: upErr } = await supabase.storage.from("dish-images").upload(path, file, {
          cacheControl: "31536000", upsert: false, contentType: file.type,
        });
        if (upErr) throw upErr;
        image_url = await getSignedUrl(path);
      }
      const { error } = await supabase.from("dishes").insert({
        name, category, description: description || null,
        price: price ? Number(price) : null, image_url,
      });
      if (error) throw error;
      toast.success(`Added "${name}"`);
      setName(""); setDescription(""); setPrice(""); setFile(null);
      await refresh();
    } catch (err: any) {
      toast.error(err.message ?? "Failed to add dish");
    } finally {
      setBusy(false);
    }
  }

  async function toggleAvailable(d: Dish) {
    const { error } = await supabase.from("dishes").update({ available: !d.available }).eq("id", d.id);
    if (error) return toast.error(error.message);
    refresh();
  }

  async function removeDish(d: Dish) {
    if (!confirm(`Delete "${d.name}"?`)) return;
    const { error } = await supabase.from("dishes").delete().eq("id", d.id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    refresh();
  }

  function exportCsv() {
    const rows = [
      ["Date", "Name", "Email", "Phone", "Message"],
      ...inquiries.map((i) => [
        new Date(i.created_at).toLocaleString(),
        i.name, i.email ?? "", i.phone ?? "", i.message.replace(/\n/g, " "),
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `aranya-customers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  }

  const isOwner = email === OWNER_EMAIL;

  return (
    <PageShell>
      <PageHeader
        eyebrow="Admin Panel"
        title={<>Manage <em className="italic text-accent">Aranya.</em></>}
        subtitle={`Signed in as ${email ?? "…"}.`}
      />
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
            <div className="flex gap-2 rounded-full bg-secondary p-1">
              <button onClick={() => setTab("dishes")} className={`px-5 py-2 rounded-full text-sm transition-colors ${tab === "dishes" ? "bg-primary text-primary-foreground" : "text-primary"}`}>
                Dishes ({dishes.length})
              </button>
              <button onClick={() => setTab("inquiries")} className={`px-5 py-2 rounded-full text-sm transition-colors ${tab === "inquiries" ? "bg-primary text-primary-foreground" : "text-primary"}`}>
                Customers ({inquiries.length})
              </button>
            </div>
            <button onClick={signOut} className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm hover:bg-secondary">
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>

          {!isOwner && (
            <div className="mb-6 rounded-xl bg-amber-100 border border-amber-300 px-4 py-3 text-sm text-amber-900">
              You're signed in as <b>{email}</b>. Only <b>{OWNER_EMAIL}</b> can add or edit dishes and view customer data.
            </div>
          )}

          {tab === "dishes" && (
            <div className="grid lg:grid-cols-[400px_1fr] gap-8">
              <form onSubmit={addDish} className="bg-card border border-border rounded-2xl p-6 space-y-4 h-fit">
                <h3 className="font-display text-2xl text-primary">Add a new dish</h3>
                <input
                  required maxLength={100} placeholder="Dish name (e.g. Cold Brew)"
                  value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 outline-none focus:border-accent"
                />
                <select
                  value={category} onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5"
                >
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
                <textarea
                  maxLength={500} rows={3} placeholder="Short description (optional)"
                  value={description} onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 outline-none focus:border-accent"
                />
                <input
                  type="number" step="0.01" min="0" placeholder="Price in ₹ (optional)"
                  value={price} onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5"
                />
                <label className="flex items-center gap-2 text-sm cursor-pointer rounded-lg border border-dashed border-border px-4 py-3 hover:bg-secondary">
                  <Upload className="h-4 w-4" />
                  {file ? file.name : "Choose photo (optional)"}
                  <input type="file" accept="image/*" hidden
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
                </label>
                <button
                  type="submit" disabled={busy || !isOwner}
                  className="w-full rounded-full bg-accent text-accent-foreground py-3 font-medium hover:opacity-90 disabled:opacity-50"
                >
                  {busy ? "Saving…" : "Add Dish"}
                </button>
              </form>

              <div className="space-y-3">
                {dishes.length === 0 && (
                  <p className="text-muted-foreground italic">No dishes yet. Add your first one →</p>
                )}
                {dishes.map((d) => (
                  <div key={d.id} className="bg-card border border-border rounded-xl p-4 flex gap-4 items-center">
                    {d.image_url ? (
                      <img src={d.image_url} alt={d.name} className="h-16 w-16 rounded-lg object-cover" />
                    ) : (
                      <div className="h-16 w-16 rounded-lg bg-secondary" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium text-foreground truncate">{d.name}</p>
                        <span className="text-xs uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary text-primary">{d.category}</span>
                        {!d.available && <span className="text-xs text-amber-700">Hidden</span>}
                      </div>
                      {d.description && <p className="text-xs text-muted-foreground truncate">{d.description}</p>}
                      {d.price != null && <p className="text-sm text-accent font-semibold mt-1">₹{Number(d.price).toFixed(0)}</p>}
                    </div>
                    <button onClick={() => toggleAvailable(d)} className="p-2 hover:bg-secondary rounded-lg" title={d.available ? "Hide" : "Show"}>
                      {d.available ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                    <button onClick={() => removeDish(d)} className="p-2 hover:bg-destructive/10 text-destructive rounded-lg" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "inquiries" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Customer messages from your website's contact form.
                </p>
                <button onClick={exportCsv} disabled={!isOwner || inquiries.length === 0}
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm hover:bg-accent disabled:opacity-50">
                  <Download className="h-4 w-4" /> Export to Excel (CSV)
                </button>
              </div>
              {inquiries.length === 0 && (
                <p className="text-muted-foreground italic">No customer messages yet.</p>
              )}
              {inquiries.map((i) => (
                <div key={i.id} className="bg-card border border-border rounded-xl p-5">
                  <div className="flex justify-between items-start gap-4 flex-wrap">
                    <div>
                      <p className="font-medium text-foreground">{i.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {i.email && <span>{i.email} · </span>}
                        {i.phone && <span>{i.phone}</span>}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">{new Date(i.created_at).toLocaleString()}</p>
                  </div>
                  <p className="mt-3 text-sm text-foreground/80 whitespace-pre-wrap">{i.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
