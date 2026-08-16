import { createFileRoute, Link } from "@tanstack/react-router";
import { UserRound, Plus } from "lucide-react";
import { AppLayout, PageContainer } from "@/components/AppLayout";
import { communityReports } from "@/lib/data";

export const Route = createFileRoute("/relatos")({
  head: () => ({
    meta: [{ title: "Relatos da comunidade — Caminho Seguro" }],
  }),
  component: Relatos,
});

function Relatos() {
  return (
    <AppLayout>
      <PageContainer
        eyebrow="Comunidade"
        title="Relatos próximos"
        description="Experiências compartilhadas por outras usuárias ajudam a manter todas mais seguras."
      >
        <div className="mb-6">
          <Link
            to="/novo-relato"
            className="inline-flex items-center gap-2 rounded-xl gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform active:scale-95"
          >
            <Plus className="h-4 w-4" /> Enviar relato
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {communityReports.map((r) => (
            <article
              key={r.id}
              className="flex gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                <UserRound className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-foreground">{r.address}</p>
                  <span
                    className={
                      "shrink-0 rounded-full px-2 py-0.5 text-xs font-bold " +
                      (r.severity === "perigoso"
                        ? "bg-danger/10 text-danger"
                        : "bg-warning/15 text-warning")
                    }
                  >
                    {r.severity === "perigoso" ? "Perigoso" : "Atenção"}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {r.type} · {r.date}
                </p>
                <p className="mt-2 text-sm text-foreground">{r.description}</p>
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </AppLayout>
  );
}
