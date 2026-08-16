import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout, PageContainer } from "@/components/AppLayout";
import { MapMock } from "@/components/MapMock";
import { ScoreBadge } from "@/components/ScoreBadge";
import { routeOptions } from "@/lib/data";

export const Route = createFileRoute("/rotas")({
  head: () => ({
    meta: [{ title: "Rotas encontradas — Caminho Seguro" }],
  }),
  component: Rotas,
});

function Rotas() {
  return (
    <AppLayout>
      <PageContainer
        eyebrow="Resultados"
        title="Rotas encontradas"
        description="Comparamos os caminhos disponíveis. Os valores representam o índice de segurança de cada rota."
      >
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            <MapMock route className="h-full min-h-[420px] w-full" />
          </div>

          <div className="space-y-3">
            {routeOptions.map((r, i) => (
              <Link
                key={r.id}
                to="/rota"
                className="flex items-center justify-between rounded-2xl border bg-card px-5 py-5 shadow-soft transition-colors hover:border-primary/40"
                style={i === 0 ? { borderColor: "var(--primary)" } : undefined}
              >
                <div>
                  <p className="text-base font-semibold text-foreground">{r.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {r.time} · {r.distance}
                  </p>
                </div>
                <ScoreBadge score={r.score} />
              </Link>
            ))}
            <p className="pt-2 text-xs text-muted-foreground">
              Índice calculado com base em iluminação, movimentação, relatos e ocorrências históricas.
            </p>
          </div>
        </div>
      </PageContainer>
    </AppLayout>
  );
}
