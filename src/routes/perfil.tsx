import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Settings,
  FileText,
  ShieldCheck,
  SlidersHorizontal,
  Bell,
  Info,
  LogOut,
  ChevronRight,
  UserRound,
} from "lucide-react";
import { PhoneShell } from "@/components/PhoneShell";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [{ title: "Meu perfil — Caminho Seguro" }],
  }),
  component: Perfil,
});

const menu = [
  { icon: FileText, label: "Meus relatos", to: "/relatos" },
  { icon: ShieldCheck, label: "Contatos de confiança", to: "/emergencia" },
  { icon: SlidersHorizontal, label: "Preferências", to: "/trajeto" },
  { icon: Bell, label: "Notificações", to: "/relatos" },
  { icon: Info, label: "Sobre o aplicativo", to: "/" },
];

function Perfil() {
  const navigate = useNavigate();
  return (
    <PhoneShell footer={<BottomNav />}>
      <AppHeader
        title="Meu perfil"
        back={false}
        action={<Settings className="h-5 w-5 text-foreground" />}
      />
      <div className="flex flex-1 flex-col gap-6 px-4 py-5">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full gradient-primary text-primary-foreground shadow-float">
            <UserRound className="h-10 w-10" />
          </div>
          <p className="mt-3 text-lg font-bold text-foreground">Ana Silva</p>
          <p className="text-sm text-muted-foreground">ana.silva@email.com</p>
        </div>

        <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          {menu.map((m) => (
            <Link key={m.label} to={m.to} className="flex items-center gap-3 px-4 py-4">
              <m.icon className="h-5 w-5 text-primary" />
              <span className="flex-1 text-sm text-foreground">{m.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>

        <button
          onClick={() => navigate({ to: "/" })}
          className="flex items-center gap-3 px-1 text-sm font-semibold text-destructive"
        >
          <LogOut className="h-5 w-5" />
          Sair
        </button>
      </div>
    </PhoneShell>
  );
}
