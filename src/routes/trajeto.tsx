import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Navigation, Clock, ChevronDown, MoonStar, Lightbulb, AlertTriangle } from "lucide-react";
import { PhoneShell } from "@/components/PhoneShell";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/trajeto")({
  head: () => ({
    meta: [
      { title: "Novo trajeto — Caminho Seguro" },
      { name: "description", content: "Informe origem e destino para buscar rotas mais seguras." },
    ],
  }),
  component: Trajeto,
});

const prefs = [
  { icon: MoonStar, label: "Evitar áreas desertas" },
  { icon: Lightbulb, label: "Priorizar ruas iluminadas" },
  { icon: AlertTriangle, label: "Evitar locais com relatos" },
];

function Trajeto() {
  return (
    <PhoneShell footer={<BottomNav />}>
      <AppHeader title="Novo Trajeto" />
      <div className="flex flex-1 flex-col gap-4 px-4 py-5">
        <Field icon={MapPin} label="Origem" value="Meu local" />
        <Field icon={Navigation} label="Destino" placeholder="Digite o destino" />
        <Field icon={Clock} label="Horário do trajeto" value="Agora" chevron />

        <div className="pt-2">
          <p className="mb-3 text-sm font-semibold text-foreground">Preferências</p>
          <div className="space-y-2.5">
            {prefs.map((p) => (
              <Toggle key={p.label} {...p} />
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4">
          <Link
            to="/rotas"
            className="flex w-full items-center justify-center rounded-2xl gradient-primary py-4 text-sm font-semibold text-primary-foreground shadow-soft transition-transform active:scale-[0.98]"
          >
            Buscar rotas seguras
          </Link>
        </div>
      </div>
    </PhoneShell>
  );
}

function Field({
  icon: Icon,
  label,
  value,
  placeholder,
  chevron,
}: {
  icon: typeof MapPin;
  label: string;
  value?: string;
  placeholder?: string;
  chevron?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft">
      <Icon className="h-5 w-5 text-primary" />
      <div className="flex-1">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className={value ? "text-sm font-semibold text-foreground" : "text-sm text-muted-foreground"}>
          {value ?? placeholder}
        </p>
      </div>
      {chevron && <ChevronDown className="h-4 w-4 text-muted-foreground" />}
    </div>
  );
}

function Toggle({ icon: Icon, label }: { icon: typeof MapPin; label: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
      <Icon className="h-4 w-4 text-primary" />
      <span className="flex-1 text-sm text-foreground">{label}</span>
      <input type="checkbox" defaultChecked className="peer sr-only" />
      <span className="relative h-5 w-9 rounded-full bg-muted transition-colors peer-checked:bg-primary">
        <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
      </span>
    </label>
  );
}
