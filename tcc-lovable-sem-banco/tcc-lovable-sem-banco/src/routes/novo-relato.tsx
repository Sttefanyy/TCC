import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { AppLayout, PageContainer } from "@/components/AppLayout";
import { RealMap } from "@/components/RealMap";
import { categoryLabels, createReport, getToken, ReportCategory } from "@/lib/api";

export const Route = createFileRoute("/novo-relato")({
  head: () => ({ meta: [{ title: "Novo relato — Caminho Seguro" }] }),
  component: NovoRelato,
});

const categories = Object.entries(categoryLabels) as Array<[ReportCategory, string]>;

function NovoRelato() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", category: "local_escuro" as ReportCategory, severity: 3, address: "", latitude: -22.8832, longitude: -43.1034, isAnonymous: true });
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (!getToken()) { setError("Faça login na página Perfil antes de enviar um relato."); return; }
    try {
      await createReport(form);
      navigate({ to: "/relatos" });
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao enviar relato.");
    }
  }

  return (
    <AppLayout>
      <PageContainer eyebrow="Contribuir" title="Enviar um relato" description="Compartilhe uma ocorrência para ajudar outras usuárias a evitar locais de risco.">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block"><span className="mb-1.5 block text-sm font-medium text-foreground">Título</span><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Ex: Rua escura" className="w-full rounded-2xl border border-border bg-card px-4 py-3.5 text-sm shadow-soft outline-none focus:border-primary" required /></label>
            <label className="block"><span className="mb-1.5 block text-sm font-medium text-foreground">Tipo de ocorrência</span><div className="relative"><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as ReportCategory })} className="w-full appearance-none rounded-2xl border border-border bg-card px-4 py-3.5 text-sm font-medium text-foreground shadow-soft outline-none focus:border-primary">{categories.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /></div></label>
            <label className="block"><span className="mb-1.5 block text-sm font-medium text-foreground">Descrição</span><textarea rows={5} placeholder="Conte o que aconteceu ou descreva o local..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full resize-none rounded-2xl border border-border bg-card px-4 py-3.5 text-sm shadow-soft outline-none focus:border-primary" /></label>
            <label className="block"><span className="mb-1.5 block text-sm font-medium text-foreground">Endereço</span><input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Ex: Centro, Niterói" className="w-full rounded-2xl border border-border bg-card px-4 py-3.5 text-sm shadow-soft outline-none focus:border-primary" /></label>
            <div className="grid grid-cols-2 gap-3"><label className="block"><span className="mb-1.5 block text-sm font-medium text-foreground">Latitude</span><input type="number" step="any" value={form.latitude} onChange={(e) => setForm({ ...form, latitude: Number(e.target.value) })} className="w-full rounded-2xl border border-border bg-card px-4 py-3.5 text-sm shadow-soft" /></label><label className="block"><span className="mb-1.5 block text-sm font-medium text-foreground">Longitude</span><input type="number" step="any" value={form.longitude} onChange={(e) => setForm({ ...form, longitude: Number(e.target.value) })} className="w-full rounded-2xl border border-border bg-card px-4 py-3.5 text-sm shadow-soft" /></label></div>
            <label className="block"><span className="mb-1.5 block text-sm font-medium text-foreground">Gravidade: {form.severity}</span><input type="range" min="1" max="5" value={form.severity} onChange={(e) => setForm({ ...form, severity: Number(e.target.value) })} className="w-full" /></label>
            <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={form.isAnonymous} onChange={(e) => setForm({ ...form, isAnonymous: e.target.checked })} /> Publicar de forma anônima</label>
            {error && <p className="rounded-xl bg-danger/10 px-4 py-3 text-sm font-semibold text-danger">{error}</p>}
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl gradient-primary py-4 text-sm font-semibold text-primary-foreground shadow-soft"><MapPin className="h-4 w-4" /> Enviar relato</button>
          </form>
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft"><RealMap reports={[]} className="h-full min-h-[420px] w-full" onPickLocation={(p) => setForm({ ...form, latitude: p.lat, longitude: p.lng })} /></div>
        </div>
      </PageContainer>
    </AppLayout>
  );
}
