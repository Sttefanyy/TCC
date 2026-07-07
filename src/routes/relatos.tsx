import { createFileRoute } from "@tanstack/react-router";
import { SlidersHorizontal, UserRound } from "lucide-react";
import { PhoneShell } from "@/components/PhoneShell";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { communityReports } from "@/lib/data";

export const Route = createFileRoute("/relatos")({
  head: () => ({
    meta: [{ title: "Relatos próximos — Caminho Seguro" }],
  }),
  component: Relatos,
});

function Relatos() {
  return (
    <PhoneShell footer={<BottomNav />}>
      <AppHeader
        title="Relatos próximos"
        action={<SlidersHorizontal className="h-5 w-5 text-foreground" />}
      />
      <div className="flex flex-1 flex-col gap-3 px-4 py-4">
        {communityReports.map((r) => (
          <article
            key={r.id}
            className="flex gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
              <UserRound className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-foreground">{r.address}</p>
                <span
                  className={
                    "shrink-0 text-xs font-bold " +
                    (r.severity === "perigoso" ? "text-danger" : "text-warning")
                  }
                >
                  {r.severity === "perigoso" ? "Perigoso" : "Atenção"}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {r.type} · {r.date}
              </p>
              <p className="mt-1.5 text-sm text-foreground">{r.description}</p>
            </div>
          </article>
        ))}
      </div>
    </PhoneShell>
  );
}
