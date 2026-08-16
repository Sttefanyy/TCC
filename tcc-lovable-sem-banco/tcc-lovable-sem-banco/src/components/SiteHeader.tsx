import { Link } from "@tanstack/react-router";
import { ShieldCheck, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/trajeto", label: "Planejar rota" },
  { to: "/mapa", label: "Mapa de risco" },
  { to: "/relatos", label: "Relatos" },
  { to: "/emergencia", label: "Emergência" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary text-primary-foreground">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-foreground">
            Caminho<span className="text-primary">Seguro</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[status=active]:text-primary"
              activeProps={{ "data-status": "active" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/perfil"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Entrar
          </Link>
          <Link
            to="/trajeto"
            className="rounded-lg gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform active:scale-95"
          >
            Começar
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/perfil"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
            >
              Perfil
            </Link>
            <Link
              to="/trajeto"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-lg gradient-primary px-3 py-2.5 text-center text-sm font-semibold text-primary-foreground"
            >
              Começar
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
