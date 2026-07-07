import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUp, Volume2, AlertTriangle, Navigation2, X } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { MapMock } from "@/components/MapMock";

export const Route = createFileRoute("/navegacao")({
  head: () => ({
    meta: [{ title: "Navegação — Caminho Seguro" }],
  }),
  component: Navegacao,
});

function Navegacao() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-float">
          {/* Turn banner */}
          <div className="flex items-center gap-4 gradient-primary px-6 py-6 text-primary-foreground">
            <div className="flex flex-col items-center">
              <ArrowUp className="h-9 w-9" />
              <span className="mt-1 text-xs font-semibold">300 m</span>
            </div>
            <div>
              <p className="text-xl font-bold">Siga em frente</p>
              <p className="text-sm opacity-90">Rua das Flores</p>
            </div>
          </div>

          <MapMock route className="h-[420px] w-full">
            <div className="absolute right-5 top-5 flex flex-col gap-3">
              <IconBtn icon={Volume2} />
              <IconBtn icon={AlertTriangle} />
            </div>
            <div className="absolute bottom-8 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full gradient-primary text-primary-foreground shadow-float">
              <Navigation2 className="h-5 w-5" />
            </div>
          </MapMock>

          {/* Bottom bar */}
          <div className="flex items-center justify-between px-6 py-5">
            <div>
              <p className="text-2xl font-bold text-foreground">25 min</p>
              <p className="text-sm text-muted-foreground">6,2 km · chegada às 14:58</p>
            </div>
            <Link
              to="/trajeto"
              className="inline-flex items-center gap-2 rounded-xl bg-destructive px-6 py-3 text-sm font-semibold text-destructive-foreground transition-transform active:scale-95"
            >
              <X className="h-4 w-4" /> Encerrar
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function IconBtn({ icon: Icon }: { icon: typeof Volume2 }) {
  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-full gradient-primary text-primary-foreground shadow-float">
      <Icon className="h-5 w-5" />
    </span>
  );
}
