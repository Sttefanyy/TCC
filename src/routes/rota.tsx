import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout, PageContainer } from "@/components/AppLayout";
import { MapMock } from "@/components/MapMock";
import { ScoreBadge } from "@/components/ScoreBadge";
import { safetyFactors } from "@/lib/data";

export const Route = createFileRoute("/rota")({
  head: () => ({
    meta: [{ title: "Detalhes da rota — Caminho Seguro" }],
  }),
  component: RotaDetalhes,
});

function RotaDetalhes() {
  return (
    <AppLayout>
      <PageContainer eyebrow="Detalhes da rota" title="Rota mais segura">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            <MapMock route className="h-full min-h-[420px] w-full" />
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-5 shadow-soft">
              <div>
                <p className="text-base font-semibold text-foreground">Rota mais segura</p>
                <p className="mt-1 text-sm text-muted-foreground">25 min · 6,2 km</p>
              </div>
              <ScoreBadge score={82} />
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <p className="mb-4 text-sm font-semibold text-foreground">Fatores que influenciaram</p>
              <div className="space-y-4">
                {safetyFactors.map((f) => (
                  <div key={f.label}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{f.label}</span>
                      <span className="font-semibold tabular-nums text-foreground">
                        {f.value.toFixed(2)}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full gradient-primary"
                        style={{ width: `${f.value * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">Dados atualizados em 12/05/2025 14:30</p>
            </div>

            <Link
              to="/navegacao"
              className="flex w-full items-center justify-center rounded-xl gradient-primary py-4 text-sm font-semibold text-primary-foreground shadow-soft transition-transform active:scale-[0.98]"
            >
              Iniciar rota
            </Link>
          </div>
        </div>
      </PageContainer>
    </AppLayout>
  );
}
