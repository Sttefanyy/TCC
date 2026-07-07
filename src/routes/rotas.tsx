import { createFileRoute, Link } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { PhoneShell } from "@/components/PhoneShell";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
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
    <PhoneShell footer={<BottomNav />}>
      <AppHeader
        title="Rotas encontradas"
        action={<SlidersHorizontal className="h-5 w-5 text-foreground" />}
      />
      <MapMock route className="h-52 w-full" />
      <div className="flex flex-1 flex-col gap-3 px-4 py-4">
        {routeOptions.map((r, i) => (
          <Link
            key={r.id}
            to="/rota"
            className="flex items-center justify-between rounded-2xl border bg-card px-4 py-4 shadow-soft transition-colors hover:border-primary/40"
            style={i === 0 ? { borderColor: "var(--primary)" } : undefined}
          >
            <div>
              <p className="text-sm font-semibold text-foreground">{r.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {r.time} · {r.distance}
              </p>
            </div>
            <ScoreBadge score={r.score} />
          </Link>
        ))}
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Os valores representam o índice de segurança da rota.
        </p>
      </div>
    </PhoneShell>
  );
}
