import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Map,
  Users,
  Siren,
  Route as RouteIcon,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { MapMock } from "@/components/MapMock";
import { ScoreBadge } from "@/components/ScoreBadge";

export const Route = createFileRoute("/")({
  component: Home,
});

const features = [
  {
    icon: RouteIcon,
    title: "Rotas mais seguras",
    text: "Compare trajetos por um índice de segurança que considera iluminação, movimento e relatos.",
  },
  {
    icon: Map,
    title: "Mapa de risco",
    text: "Visualize áreas com maior concentração de ocorrências e evite locais sensíveis.",
  },
  {
    icon: Users,
    title: "Relatos da comunidade",
    text: "Compartilhe e consulte relatos de outras usuárias em tempo real.",
  },
  {
    icon: Siren,
    title: "Emergência rápida",
    text: "Acione o SOS e contatos de confiança com poucos toques quando precisar.",
  },
];

const steps = [
  { n: "1", title: "Informe seu trajeto", text: "Digite origem, destino e suas preferências de segurança." },
  { n: "2", title: "Compare as rotas", text: "Receba opções com o índice de segurança de cada caminho." },
  { n: "3", title: "Siga com tranquilidade", text: "Navegue pela rota escolhida e conte com a comunidade." },
];

function Home() {
  return (
    <AppLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-3 py-1 text-xs font-semibold text-primary">
              <ShieldCheck className="h-3.5 w-3.5" /> Mobilidade e segurança feminina
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-6xl">
              Rotas mais seguras para você andar com{" "}
              <span className="text-primary">mais tranquilidade</span>.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              O Caminho Seguro usa relatos da comunidade e dados urbanos para recomendar os
              trajetos mais seguros na sua cidade.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/trajeto"
                className="inline-flex items-center gap-2 rounded-xl gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform active:scale-95"
              >
                Planejar minha rota <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/mapa"
                className="inline-flex items-center gap-2 rounded-xl border border-primary/30 px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-accent"
              >
                Ver mapa de risco
              </Link>
            </div>
          </div>

          {/* Route preview card */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-float">
              <MapMock route className="h-64 w-full" />
              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between rounded-2xl border border-primary/40 bg-card px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Rota mais segura</p>
                    <p className="text-xs text-muted-foreground">25 min · 6,2 km</p>
                  </div>
                  <ScoreBadge score={82} />
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Rota alternativa</p>
                    <p className="text-xs text-muted-foreground">24 min · 5,7 km</p>
                  </div>
                  <ScoreBadge score={48} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Recursos</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Tudo o que você precisa para se sentir segura
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-float"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="mb-10 max-w-2xl">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
            <Lightbulb className="h-4 w-4" /> Como funciona
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Em três passos simples
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-border bg-card p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-sm font-bold text-primary-foreground">
                {s.n}
              </span>
              <h3 className="mt-4 text-lg font-bold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
        <div className="overflow-hidden rounded-3xl gradient-primary px-8 py-14 text-center shadow-float">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-primary-foreground md:text-4xl">
            Comece a planejar trajetos mais seguros agora
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85">
            Junte-se a uma rede de cuidado coletivo pela mobilidade urbana feminina.
          </p>
          <Link
            to="/trajeto"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-background px-6 py-3.5 text-sm font-semibold text-primary shadow-soft transition-transform active:scale-95"
          >
            Planejar minha rota <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </AppLayout>
  );
}
