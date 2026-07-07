import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, MapPin, CalendarClock } from "lucide-react";
import { PhoneShell } from "@/components/PhoneShell";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { reportTypes } from "@/lib/data";

export const Route = createFileRoute("/novo-relato")({
  head: () => ({
    meta: [{ title: "Novo relato — Caminho Seguro" }],
  }),
  component: NovoRelato,
});

function NovoRelato() {
  const navigate = useNavigate();
  const [type, setType] = useState("");

  return (
    <PhoneShell footer={<BottomNav />}>
      <AppHeader title="Novo relato" />
      <form
        className="flex flex-1 flex-col gap-4 px-4 py-5"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/relatos" });
        }}
      >
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted-foreground">
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
          <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Descrição</span>
          <textarea
            rows={4}
            placeholder="Conte o que aconteceu..."
            className="w-full resize-none rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground shadow-soft outline-none placeholder:text-muted-foreground focus:border-primary"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Local</span>
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3.5 shadow-soft">
            <span className="flex-1 text-sm text-muted-foreground">Selecione no mapa</span>
            <MapPin className="h-4 w-4 text-primary" />
          </div>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Data e hora</span>
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3.5 shadow-soft">
            <span className="flex-1 text-sm font-medium text-foreground">12/05/2025 19:30</span>
            <CalendarClock className="h-4 w-4 text-primary" />
          </div>
        </label>

        <div className="mt-auto pt-2">
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-2xl gradient-primary py-4 text-sm font-semibold text-primary-foreground shadow-soft transition-transform active:scale-[0.98]"
          >
            Enviar relato
          </button>
        </div>
      </form>
    </PhoneShell>
  );
}
