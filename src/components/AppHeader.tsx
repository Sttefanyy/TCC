import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function AppHeader({
  title,
  back = true,
  action,
}: {
  title: string;
  back?: boolean;
  action?: ReactNode;
}) {
  const navigate = useNavigate();
  return (
    <header className="flex items-center gap-2 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
      {back ? (
        <button
          aria-label="Voltar"
          onClick={() => navigate({ to: ".." as string })}
          className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      ) : (
        <span className="h-9 w-9" />
      )}
      <h1 className="flex-1 text-center text-base font-semibold text-foreground">{title}</h1>
      <span className="flex h-9 w-9 items-center justify-center">{action}</span>
    </header>
  );
}

export function HeaderIconButton({
  icon: Icon,
  to,
  label,
}: {
  icon: LucideIcon;
  to?: string;
  label: string;
}) {
  const content = (
    <span className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted">
      <Icon className="h-5 w-5" />
    </span>
  );
  if (to) {
    return (
      <Link to={to} aria-label={label}>
        {content}
      </Link>
    );
  }
  return (
    <button aria-label={label} type="button">
      {content}
    </button>
  );
}
