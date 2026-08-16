import { createFileRoute } from "@tanstack/react-router";
import { PhoneCall, Phone, Users, ChevronRight } from "lucide-react";
import { AppLayout, PageContainer } from "@/components/AppLayout";
import { emergencyContacts } from "@/lib/data";

export const Route = createFileRoute("/emergencia")({
  head: () => ({
    meta: [{ title: "Emergência — Caminho Seguro" }],
  }),
  component: Emergencia,
});

function Emergencia() {
  return (
    <AppLayout>
      <PageContainer
        eyebrow="Emergência"
        title="Precisa de ajuda agora?"
        description="Acione o SOS ou entre em contato com os serviços de emergência e seus contatos de confiança."
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <button className="flex items-center gap-4 rounded-3xl bg-destructive px-6 py-8 text-left text-destructive-foreground shadow-float transition-transform active:scale-[0.98]">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <PhoneCall className="h-8 w-8" />
            </span>
            <span>
              <span className="block text-2xl font-bold">SOS</span>
              <span className="block text-sm opacity-90">Acionar emergência (190)</span>
            </span>
          </button>

          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">Outros contatos</p>
            <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              {emergencyContacts.map((c) => (
                <div key={c.name} className="flex items-center gap-3 px-5 py-4">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="flex-1 text-sm text-foreground">{c.name}</span>
                  <span className="text-sm font-semibold tabular-nums text-foreground">{c.number}</span>
                  <Phone className="h-4 w-4 text-primary" />
                </div>
              ))}
              <button className="flex w-full items-center gap-3 px-5 py-4 text-left">
                <Users className="h-5 w-5 text-primary" />
                <span className="flex-1 text-sm text-foreground">Contatos de confiança</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </PageContainer>
    </AppLayout>
  );
}
