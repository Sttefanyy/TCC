import { Link } from "@tanstack/react-router";
import { Home, Map, Bell, User, Plus } from "lucide-react";

const items = [
  { to: "/trajeto", label: "Início", icon: Home },
  { to: "/mapa", label: "Mapa", icon: Map },
  { to: "/relatos", label: "Relatos", icon: Bell },
  { to: "/perfil", label: "Perfil", icon: User },
];

export function BottomNav() {
  return (
    <nav className="relative border-t border-border bg-background px-2 pb-3 pt-2">
      <ul className="flex items-end justify-between">
        {items.slice(0, 2).map((item) => (
          <NavItem key={item.to} {...item} />
        ))}

        <li className="flex flex-1 justify-center">
          <Link
            to="/novo-relato"
            aria-label="Novo relato"
            className="-mt-8 flex h-14 w-14 items-center justify-center rounded-full gradient-primary text-primary-foreground shadow-float transition-transform active:scale-95"
          >
            <Plus className="h-7 w-7" />
          </Link>
        </li>

        {items.slice(2).map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </ul>
    </nav>
  );
}

function NavItem({
  to,
  label,
  icon: Icon,
}: {
  to: string;
  label: string;
  icon: typeof Home;
}) {
  return (
    <li className="flex flex-1 justify-center">
      <Link
        to={to}
        className="flex flex-col items-center gap-1 text-muted-foreground transition-colors data-[status=active]:text-primary"
        activeProps={{ "data-status": "active" }}
      >
        <Icon className="h-5 w-5" />
        <span className="text-[11px] font-medium">{label}</span>
      </Link>
    </li>
  );
}
