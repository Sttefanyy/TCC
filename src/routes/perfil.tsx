import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
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
import { authClient } from "@/lib/auth-client";
import { getSession } from "@/lib/auth-session";

export const Route = createFileRoute("/perfil")({
  beforeLoad: async ({ location }) => {
    const session = await getSession();
    if (!session) throw redirect({ to: "/entrar", search: { redirect: location.href } });
    return { session };
  },
  head: () => ({ meta: [{ title: "Meu perfil — Caminho Seguro" }] }),
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
  const { session } = Route.useRouteContext();

  async function signOut() {
    await authClient.signOut();
    await navigate({ to: "/entrar" });
  }

  return (
    <AppLayout>
      <PageContainer eyebrow="Conta" title="Meu perfil">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <div className="flex flex-col items-center rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
            <div className="flex h-24 w-24 items-center justify-center rounded-full gradient-primary text-primary-foreground shadow-float">
              <UserRound className="h-12 w-12" />
            </div>
            <p className="mt-4 text-xl font-bold text-foreground">{session.user.name}</p>
            <p className="break-all text-sm text-muted-foreground">{session.user.email}</p>
            <button
              onClick={signOut}
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-destructive/30 px-4 py-2.5 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/5"
            >
              <LogOut className="h-4 w-4" /> Sair
            </button>
          </div>
          <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            {menu.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="flex items-center gap-3 px-6 py-5 hover:bg-muted/40"
              >
                <item.icon className="h-5 w-5 text-primary" />
                <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </PageContainer>
    </AppLayout>
  );
}
