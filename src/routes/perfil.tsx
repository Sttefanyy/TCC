import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  FileText,
  ShieldCheck,
  SlidersHorizontal,
  Bell,
  Info,
  LogOut,
  ChevronRight,
  UserRound,
} from "lucide-react";
import { AppLayout, PageContainer } from "@/components/AppLayout";

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
] as const;

function Perfil() {
  const navigate = useNavigate();
  return (
    <AppLayout>
      <PageContainer eyebrow="Conta" title="Meu perfil">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <div className="flex flex-col items-center rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
            <div className="flex h-24 w-24 items-center justify-center rounded-full gradient-primary text-primary-foreground shadow-float">
              <UserRound className="h-12 w-12" />
            </div>
            <p className="mt-4 text-xl font-bold text-foreground">Ana Silva</p>
            <p className="text-sm text-muted-foreground">ana.silva@email.com</p>
            <button
              onClick={() => navigate({ to: "/" })}
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-destructive/30 px-4 py-2.5 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/5"
            >
              <LogOut className="h-4 w-4" /> Sair
            </button>
          </div>

          <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            {menu.map((m) => (
              <Link key={m.label} to={m.to} className="flex items-center gap-3 px-6 py-5 hover:bg-muted/40">
                <m.icon className="h-5 w-5 text-primary" />
                <span className="flex-1 text-sm font-medium text-foreground">{m.label}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </PageContainer>
    </AppLayout>
  );
}
