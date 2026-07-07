import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
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
    <PhoneShell footer={<BottomNav />}>
      <AppHeader title="Detalhes da rota" />
      <MapMock route className="h-48 w-full" />
      <div className="flex flex-1 flex-col gap-4 px-4 py-4">
        <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-4 shadow-soft">
          <div>
            <p className="text-sm font-semibold text-foreground">Rota mais segura</p>
            <p className="mt-1 text-xs text-muted-foreground">25 min · 6,2 km</p>
          </div>
          <ScoreBadge score={82} />
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-foreground">Fatores que influenciaram</p>
          <div className="space-y-3">
            {safetyFactors.map((f) => (
              <div key={f.label}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{f.label}</span>
                  <span className="font-semibold tabular-nums text-foreground">
                    {f.value.toFixed(2)}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full gradient-primary"
                    style={{ width: `${f.value * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground">Dados atualizados em 12/05/2025 14:30</p>

        <div className="mt-auto pt-2">
          <Link
            to="/navegacao"
            className="flex w-full items-center justify-center rounded-2xl gradient-primary py-4 text-sm font-semibold text-primary-foreground shadow-soft transition-transform active:scale-[0.98]"
          >
            Iniciar rota
          </Link>
        </div>
      </div>
    </PhoneShell>
  );
}
