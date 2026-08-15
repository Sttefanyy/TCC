import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, MapPin, CalendarClock } from "lucide-react";
import { AppLayout, PageContainer } from "@/components/AppLayout";
import { MapMock } from "@/components/MapMock";
import { reportTypes } from "@/lib/data";
import { getSession } from "@/lib/auth-session";

export const Route = createFileRoute("/novo-relato")({
  beforeLoad: async ({ location }) => {
    const session = await getSession();
    if (!session) throw redirect({ to: "/entrar", search: { redirect: location.href } });
    return { session };
  },
  head: () => ({
    meta: [{ title: "Novo relato — Caminho Seguro" }],
  }),
  component: NovoRelato,
});

function NovoRelato() {
  const navigate = useNavigate();
  const [type, setType] = useState("");

  return (
    <AppLayout>
      <PageContainer
        eyebrow="Contribuir"
        title="Enviar um relato"
        description="Compartilhe uma ocorrência para ajudar outras usuárias a evitar locais de risco."
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/relatos" });
            }}
          >
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-foreground">
                Tipo de ocorrência
              </span>
              <div className="relative">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full appearance-none rounded-2xl border border-border bg-card px-4 py-3.5 text-sm font-medium text-foreground shadow-soft outline-none focus:border-primary"
                >
                  <option value="">Selecione o tipo</option>
                  {reportTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-foreground">Descrição</span>
              <textarea
                rows={5}
                placeholder="Conte o que aconteceu..."
                className="w-full resize-none rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground shadow-soft outline-none placeholder:text-muted-foreground focus:border-primary"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">Local</span>
                <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3.5 shadow-soft">
                  <span className="flex-1 text-sm text-muted-foreground">Selecione no mapa</span>
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">
                  Data e hora
                </span>
                <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3.5 shadow-soft">
                  <span className="flex-1 text-sm font-medium text-foreground">
                    12/05/2025 19:30
                  </span>
                  <CalendarClock className="h-4 w-4 text-primary" />
                </div>
              </label>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-xl gradient-primary py-4 text-sm font-semibold text-primary-foreground shadow-soft transition-transform active:scale-[0.98]"
            >
              Enviar relato
            </button>
          </form>

          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            <MapMock className="h-full min-h-[420px] w-full">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                <MapPin className="h-9 w-9 text-primary drop-shadow" fill="currentColor" />
              </div>
            </MapMock>
          </div>
        </div>
      </PageContainer>
    </AppLayout>
  );
}
