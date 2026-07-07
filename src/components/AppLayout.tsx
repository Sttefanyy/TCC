import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

/** Standard page wrapper: constrained width, heading, and content. */
export function PageContainer({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={"mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14 " + (className ?? "")}>
      <header className="mb-8 max-w-2xl">
        {eyebrow && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>
        )}
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">{title}</h1>
        {description && <p className="mt-3 text-base text-muted-foreground">{description}</p>}
      </header>
      {children}
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary text-primary-foreground">
            <ShieldCheck className="h-4 w-4" />
          </span>
          <span className="font-bold text-foreground">Caminho Seguro</span>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link to="/trajeto" className="hover:text-foreground">Planejar rota</Link>
          <Link to="/mapa" className="hover:text-foreground">Mapa de risco</Link>
          <Link to="/relatos" className="hover:text-foreground">Relatos</Link>
          <Link to="/emergencia" className="hover:text-foreground">Emergência</Link>
          <Link to="/perfil" className="hover:text-foreground">Perfil</Link>
        </nav>
        <p className="text-xs text-muted-foreground">
          © 2026 Caminho Seguro · TCC de mobilidade e segurança feminina
        </p>
      </div>
    </footer>
  );
}
