import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FileText, ShieldCheck, SlidersHorizontal, Bell, Info, LogOut, ChevronRight, UserRound } from "lucide-react";
import { AppLayout, PageContainer } from "@/components/AppLayout";
import { clearAuth, getUser, login, register } from "@/lib/api";

export const Route = createFileRoute("/perfil")({
  head: () => ({ meta: [{ title: "Meu perfil — Caminho Seguro" }] }),
  component: Perfil,
});

const menu = [
  { icon: FileText, label: "Meus relatos", to: "/relatos" },
  { icon: ShieldCheck, label: "Contatos de confiança", to: "/emergencia" },
  { icon: SlidersHorizontal, label: "Preferências", to: "/trajeto" },
  { icon: Bell, label: "Notificações", to: "/relatos" },
  { icon: Info, label: "Sobre o aplicativo", to: "/" },
] as const;

function Perfil() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => setUser(getUser()), []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    try {
      const data = mode === "login"
        ? await login(form.email, form.password)
        : await register(form);
      setUser(data.user);
    } catch (err: any) {
      setError(err.response?.data?.message || "Não foi possível entrar.");
    }
  }

  if (!user) {
    return (
      <AppLayout>
        <PageContainer eyebrow="Conta" title={mode === "login" ? "Entrar" : "Criar conta"} description="Faça login para cadastrar relatos e calcular rotas seguras.">
          <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4 rounded-3xl border border-border bg-card p-6 shadow-soft">
            {mode === "register" && (
              <>
                <label className="block text-sm font-semibold text-foreground">Nome</label>
                <input className="w-full rounded-2xl border border-border bg-background px-4 py-3" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </>
            )}
            <label className="block text-sm font-semibold text-foreground">E-mail</label>
            <input type="email" className="w-full rounded-2xl border border-border bg-background px-4 py-3" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            {mode === "register" && (
              <>
                <label className="block text-sm font-semibold text-foreground">Telefone</label>
                <input className="w-full rounded-2xl border border-border bg-background px-4 py-3" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </>
            )}
            <label className="block text-sm font-semibold text-foreground">Senha</label>
            <input type="password" minLength={6} className="w-full rounded-2xl border border-border bg-background px-4 py-3" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            {error && <p className="rounded-xl bg-danger/10 px-4 py-3 text-sm font-semibold text-danger">{error}</p>}
            <button className="w-full rounded-xl gradient-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-soft">
              {mode === "login" ? "Entrar" : "Cadastrar"}
            </button>
            <button type="button" onClick={() => setMode(mode === "login" ? "register" : "login")} className="w-full rounded-xl border border-primary/30 py-3 text-sm font-semibold text-primary">
              {mode === "login" ? "Criar conta" : "Já tenho conta"}
            </button>
          </form>
        </PageContainer>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <PageContainer eyebrow="Conta" title="Meu perfil">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <div className="flex flex-col items-center rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
            <div className="flex h-24 w-24 items-center justify-center rounded-full gradient-primary text-primary-foreground shadow-float"><UserRound className="h-12 w-12" /></div>
            <p className="mt-4 text-xl font-bold text-foreground">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <button onClick={() => { clearAuth(); setUser(null); navigate({ to: "/" }); }} className="mt-6 inline-flex items-center gap-2 rounded-xl border border-destructive/30 px-4 py-2.5 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/5">
              <LogOut className="h-4 w-4" /> Sair
            </button>
          </div>
          <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            {menu.map((m) => <Link key={m.label} to={m.to} className="flex items-center gap-3 px-6 py-5 hover:bg-muted/40"><m.icon className="h-5 w-5 text-primary" /><span className="flex-1 text-sm font-medium text-foreground">{m.label}</span><ChevronRight className="h-4 w-4 text-muted-foreground" /></Link>)}
          </div>
        </div>
      </PageContainer>
    </AppLayout>
  );
}
