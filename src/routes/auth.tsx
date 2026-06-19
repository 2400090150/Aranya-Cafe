import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageShell, PageHeader } from "@/components/site/SiteChrome";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Owner Sign In — Aranya Cafe" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. Check your email to confirm, then sign in.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate({ to: "/admin" });
      }
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <PageHeader
        eyebrow="Owner Access"
        title={<>Sign in to <em className="italic text-accent">Aranya.</em></>}
        subtitle="Manage your menu, dishes and customer messages."
      />
      <section className="px-6 pb-24">
        <form
          onSubmit={onSubmit}
          className="max-w-md mx-auto bg-card border border-border rounded-2xl p-8 shadow-[var(--shadow-warm)] space-y-5"
        >
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
            <input
              type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-accent"
              placeholder="rupeshravu@gmail.com"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Password</label>
            <input
              type="password" required minLength={6} value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-accent"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full rounded-full bg-primary text-primary-foreground py-3 font-medium hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-60"
          >
            {loading ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
          </button>
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="w-full text-sm text-muted-foreground hover:text-accent"
          >
            {mode === "signin" ? "First time? Create owner account" : "Already have an account? Sign in"}
          </button>
        </form>
      </section>
    </PageShell>
  );
}
