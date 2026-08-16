import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { UserRound, Plus } from "lucide-react";
import { AppLayout, PageContainer } from "@/components/AppLayout";
import { ApiReport, categoryLabels, confirmReport, listReports } from "@/lib/api";

export const Route = createFileRoute("/relatos")({
  head: () => ({ meta: [{ title: "Relatos da comunidade — Caminho Seguro" }] }),
  component: Relatos,
});

function Relatos() {
  const [reports, setReports] = useState<ApiReport[]>([]);
  const [error, setError] = useState("");

  async function load() {
    try { setReports(await listReports()); } catch { setError("Não foi possível carregar os relatos."); }
  }

  useEffect(() => { load(); }, []);

  async function handleConfirm(id: string) {
    await confirmReport(id);
    await load();
  }

  return (
    <AppLayout>
      <PageContainer eyebrow="Comunidade" title="Relatos próximos" description="Experiências compartilhadas por outras usuárias ajudam a manter todas mais seguras.">
        <div className="mb-6"><Link to="/novo-relato" className="inline-flex items-center gap-2 rounded-xl gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft"><Plus className="h-4 w-4" /> Enviar relato</Link></div>
        {error && <p className="mb-4 rounded-xl bg-danger/10 px-4 py-3 text-danger">{error}</p>}
        {reports.length === 0 ? <p className="rounded-2xl border border-border bg-card p-6 text-muted-foreground">Nenhum relato cadastrado ainda.</p> : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((r) => (
              <article key={r._id} className="flex gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary"><UserRound className="h-5 w-5" /></div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground">{r.address || r.title}</p>
                    <span className={(r.severity >= 4 ? "bg-danger/10 text-danger" : "bg-warning/15 text-warning") + " shrink-0 rounded-full px-2 py-0.5 text-xs font-bold"}>{r.severity >= 4 ? "Perigoso" : "Atenção"}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{categoryLabels[r.category]} · {new Date(r.createdAt).toLocaleString("pt-BR")}</p>
                  <p className="mt-2 text-sm text-foreground">{r.description || r.title}</p>
                  <button onClick={() => handleConfirm(r._id)} className="mt-3 rounded-lg border border-primary/30 px-3 py-1.5 text-xs font-bold text-primary">Confirmar relato ({r.confirmations?.length || 0})</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </PageContainer>
    </AppLayout>
  );
}
