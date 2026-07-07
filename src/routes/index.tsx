import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { PhoneShell } from "@/components/PhoneShell";

export const Route = createFileRoute("/")({
  component: Welcome,
});

function Welcome() {
  return (
    <PhoneShell>
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] gradient-primary shadow-float">
          <ShieldCheck className="h-14 w-14 text-primary-foreground" />
        </div>

        <h1 className="mt-8 text-4xl font-extrabold uppercase leading-tight tracking-tight text-primary">
          Caminho
          <br />
          Seguro
        </h1>

        <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
          Rotas mais seguras para você andar com mais tranquilidade.
        </p>

        <div className="mt-12 w-full max-w-xs space-y-3">
          <Link
            to="/trajeto"
            className="flex h-13 w-full items-center justify-center rounded-2xl gradient-primary py-4 text-sm font-semibold text-primary-foreground shadow-soft transition-transform active:scale-[0.98]"
          >
            Entrar
          </Link>
          <Link
            to="/trajeto"
            className="flex w-full items-center justify-center rounded-2xl border border-primary/30 py-4 text-sm font-semibold text-primary transition-colors hover:bg-accent"
          >
            Criar conta
          </Link>
        </div>
      </div>
    </PhoneShell>
  );
}
