import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { AppLayout, PageContainer } from "@/components/AppLayout";
import { RealMap } from "@/components/RealMap";
import { ApiReport, categoryLabels, listReports, ReportCategory } from "@/lib/api";

export const Route = createFileRoute("/mapa")({
  head: () => ({ meta: [{ title: "Mapa de risco — Caminho Seguro" }] }),
  component: Mapa,
});

function Mapa() {
  const [reports, setReports] = useState<ApiReport[]>([]);
  const [category, setCategory] = useState("");

  async function load(nextCategory = category) { setReports(await listReports(nextCategory)); }
  useEffect(() => { load(""); }, []);

  return (
    <AppLayout>
      <PageContainer eyebrow="Mapa de risco" title="Áreas com mais ocorrências" description="Visualize os relatos cadastrados no mapa real de Niterói.">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <select value={category} onChange={(e) => { setCategory(e.target.value); load(e.target.value); }} className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold">
            <option value="">Todos os tipos</option>
            {(Object.entries(categoryLabels) as Array<[ReportCategory, string]>).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
          <Link to="/novo-relato" className="inline-flex items-center gap-2 rounded-xl gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft"><Plus className="h-4 w-4" /> Novo relato</Link>
        </div>
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft"><RealMap reports={reports} className="h-[560px] w-full" /></div>
      </PageContainer>
    </AppLayout>
  );
}
