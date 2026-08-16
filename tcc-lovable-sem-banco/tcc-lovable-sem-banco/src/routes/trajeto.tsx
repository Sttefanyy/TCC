import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Navigation, MoonStar, Lightbulb, AlertTriangle } from "lucide-react";
import { AppLayout, PageContainer } from "@/components/AppLayout";
import { RealMap } from "@/components/RealMap";
import { getToken, getWalkingRoute, scoreSafeRoutes, searchAddress } from "@/lib/api";

export const Route = createFileRoute("/trajeto")({
  head: () => ({ meta: [{ title: "Planejar rota — Caminho Seguro" }] }),
  component: Trajeto,
});

const prefs = [
  { icon: MoonStar, label: "Evitar áreas desertas" },
  { icon: Lightbulb, label: "Priorizar ruas iluminadas" },
  { icon: AlertTriangle, label: "Evitar locais com relatos" },
];

function pointsFromOsrm(route: any) {
  return route.geometry.coordinates.map(([lng, lat]: [number, number]) => ({ lat, lng }));
}

async function firstPoint(text: string) {
  const results = await searchAddress(text);
  if (!results.length) throw new Error(`Endereço não encontrado: ${text}`);
  return { lat: Number(results[0].lat), lng: Number(results[0].lon) };
}

function Trajeto() {
  const [origin, setOrigin] = useState("Centro, Niterói");
  const [destination, setDestination] = useState("");
  const [result, setResult] = useState<any>(null);
  const [routeLine, setRouteLine] = useState<Array<{ lat: number; lng: number }>>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!getToken()) throw new Error("Faça login na página Perfil antes de calcular a rota segura.");
      const originPoint = await firstPoint(origin);
      const destinationPoint = await firstPoint(destination);
      const routeData = await getWalkingRoute(originPoint, destinationPoint);
      const routes = routeData.routes.map((route: any, index: number) => ({
        name: `Rota ${index + 1}`,
        distance: route.distance,
        duration: route.duration,
        points: pointsFromOsrm(route),
      }));
      const scored = await scoreSafeRoutes(routes);
      setResult(scored);
      setRouteLine(scored.recommended.points);
    } catch (err: any) {
      setError(err.message || "Erro ao calcular rota.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppLayout>
      <PageContainer eyebrow="Novo trajeto" title="Planeje seu caminho" description="Informe origem e destino. A rota é calculada pelo OSRM e pontuada pelo backend conforme os relatos próximos.">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field icon={MapPin} label="Origem" value={origin} onChange={setOrigin} />
            <Field icon={Navigation} label="Destino" value={destination} onChange={setDestination} placeholder="Digite o destino" />
            <div className="pt-2"><p className="mb-3 text-sm font-semibold text-foreground">Preferências</p><div className="space-y-2.5">{prefs.map((p) => <Toggle key={p.label} {...p} />)}</div></div>
            {error && <p className="rounded-xl bg-danger/10 px-4 py-3 text-sm font-semibold text-danger">{error}</p>}
            <button type="submit" className="mt-2 flex w-full items-center justify-center rounded-xl gradient-primary py-4 text-sm font-semibold text-primary-foreground shadow-soft" disabled={loading}>{loading ? "Calculando..." : "Buscar rotas seguras"}</button>
            {result?.recommended && (
              <div className="rounded-2xl border border-primary/30 bg-card p-5 shadow-soft">
                <p className="text-base font-bold text-foreground">{result.recommended.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">Score de segurança: <strong>{result.recommended.safetyScore}/100</strong></p>
                <p className="text-sm text-muted-foreground">Distância: {(result.recommended.distance / 1000).toFixed(2)} km</p>
                <p className="text-sm text-muted-foreground">Relatos próximos: {result.recommended.consideredReports?.length || 0}</p>
              </div>
            )}
          </form>
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft"><RealMap reports={[]} routePoints={routeLine} className="h-full min-h-[420px] w-full" /></div>
        </div>
      </PageContainer>
    </AppLayout>
  );
}

function Field({ icon: Icon, label, value, placeholder, onChange }: { icon: typeof MapPin; label: string; value: string; placeholder?: string; onChange: (value: string) => void }) {
  return <label className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 shadow-soft"><Icon className="h-5 w-5 text-primary" /><div className="flex-1"><p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p><input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="mt-1 w-full border-none bg-transparent p-0 text-sm font-semibold text-foreground outline-none" required /></div></label>;
}

function Toggle({ icon: Icon, label }: { icon: typeof MapPin; label: string }) {
  return <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"><Icon className="h-4 w-4 text-primary" /><span className="flex-1 text-sm text-foreground">{label}</span><input type="checkbox" defaultChecked className="peer sr-only" /><span className="relative h-5 w-9 rounded-full bg-muted transition-colors peer-checked:bg-primary"><span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" /></span></label>;
}
