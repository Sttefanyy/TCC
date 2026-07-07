import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowUp, Volume2, AlertTriangle, Navigation2 } from "lucide-react";
import { PhoneShell } from "@/components/PhoneShell";
import { MapMock } from "@/components/MapMock";

export const Route = createFileRoute("/navegacao")({
  head: () => ({
    meta: [{ title: "Navegação — Caminho Seguro" }],
  }),
  component: Navegacao,
});

function Navegacao() {
  const navigate = useNavigate();
  return (
    <PhoneShell>
      <div className="relative flex flex-1 flex-col">
        <div className="flex items-center gap-4 gradient-primary px-5 py-5 text-primary-foreground">
          <div className="flex flex-col items-center">
            <ArrowUp className="h-8 w-8" />
            <span className="mt-1 text-xs font-semibold">300 m</span>
          </div>
          <div>
            <p className="text-lg font-bold">Siga em frente</p>
            <p className="text-sm opacity-90">Rua das Flores</p>
          </div>
        </div>

        <MapMock route className="flex-1">
          <div className="absolute right-4 top-4 flex flex-col gap-3">
            <IconBtn icon={Volume2} />
            <IconBtn icon={AlertTriangle} />
          </div>
          <div className="absolute bottom-24 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full gradient-primary text-primary-foreground shadow-float">
            <Navigation2 className="h-5 w-5" />
          </div>
        </MapMock>

        <div className="flex items-center justify-between border-t border-border bg-background px-5 py-4">
          <div>
            <p className="text-xl font-bold text-foreground">25 min</p>
            <p className="text-xs text-muted-foreground">6,2 km · 14:58</p>
          </div>
          <button
            onClick={() => navigate({ to: "/trajeto" })}
            className="rounded-2xl bg-destructive px-6 py-3 text-sm font-semibold text-destructive-foreground transition-transform active:scale-95"
          >
            Encerrar
          </button>
        </div>
      </div>
    </PhoneShell>
  );
}

function IconBtn({ icon: Icon }: { icon: typeof Volume2 }) {
  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-full gradient-primary text-primary-foreground shadow-float">
      <Icon className="h-5 w-5" />
    </span>
  );
}
