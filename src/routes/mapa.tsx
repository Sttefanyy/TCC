import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageContainer } from "@/components/AppLayout";
import { MapMock } from "@/components/MapMock";

export const Route = createFileRoute("/mapa")({
  head: () => ({
    meta: [{ title: "Mapa de risco — Caminho Seguro" }],
  }),
  component: Mapa,
});

const levels = [
  { label: "Baixo", color: "oklch(0.62 0.17 150)" },
  { label: "Médio", color: "oklch(0.75 0.16 65)" },
  { label: "Alto", color: "oklch(0.7 0.2 45)" },
  { label: "Muito alto", color: "oklch(0.58 0.24 25)" },
];

function Mapa() {
  return (
    <AppLayout>
      <PageContainer
        eyebrow="Mapa de risco"
        title="Áreas com mais ocorrências"
        description="Visualize a concentração de relatos e ocorrências pela cidade para planejar trajetos com mais cuidado."
      >
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          <MapMock heat className="h-[520px] w-full" />
          <div className="border-t border-border px-6 py-5">
            <p className="mb-3 text-sm font-semibold text-foreground">Nível de risco</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {levels.map((l) => (
                <span key={l.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: l.color }} />
                  {l.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </AppLayout>
  );
}
