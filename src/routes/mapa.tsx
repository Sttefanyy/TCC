import { createFileRoute } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { PhoneShell } from "@/components/PhoneShell";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
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
    <PhoneShell footer={<BottomNav />}>
      <AppHeader
        title="Mapa de Risco"
        action={<SlidersHorizontal className="h-5 w-5 text-foreground" />}
      />
      <MapMock heat className="flex-1" />
      <div className="border-t border-border bg-background px-5 py-4">
        <p className="mb-2 text-xs font-semibold text-foreground">Nível de risco</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {levels.map((l) => (
            <span key={l.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: l.color }} />
              {l.label}
            </span>
          ))}
        </div>
      </div>
    </PhoneShell>
  );
}
