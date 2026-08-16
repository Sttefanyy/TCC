import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ShieldCheck } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/entrar")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect:
      typeof search.redirect === "string" && search.redirect.startsWith("/")
        ? search.redirect
        : "/perfil",
  }),
  head: () => ({ meta: [{ title: "Entrar — Caminho Seguro" }] }),
  component: Entrar,
});

function Entrar() {
  const navigate = useNavigate();
  const { redirect: redirectTo } = Route.useSearch();
  const [mode, setMode] = useState<"login" | "cadastro">("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const name = String(data.get("name") ?? "").trim();

    const result =
      mode === "login"
        ? await authClient.signIn.email({ email, password })
        : await authClient.signUp.email({ email, password, name });

    setLoading(false);
    if (result.error) {
      setError(
        result.error.message ?? "Não foi possível concluir. Verifique os dados e tente novamente.",
      );
      return;
    }
    window.location.assign(redirectTo);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-secondary/30 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-7 shadow-float">
        <Link to="/" className="mb-7 flex items-center justify-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary text-primary-foreground">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <span className="text-xl font-extrabold">
            Caminho<span className="text-primary">Seguro</span>
          </span>
        </Link>
        <h1 className="text-2xl font-extrabold">
          {mode === "login" ? "Entre na sua conta" : "Crie sua conta"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Use seu e-mail e uma senha com pelo menos 8 caracteres.
        </p>

        <form className="mt-6 space-y-4" onSubmit={submit}>
          {mode === "cadastro" && (
            <Field name="name" label="Nome" type="text" autoComplete="name" />
          )}
          <Field name="email" label="E-mail" type="email" autoComplete="email" />
          <Field
            name="password"
            label="Senha"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            minLength={8}
          />
          {error && (
            <p
              role="alert"
              className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              {error}
            </p>
          )}
          <button
            disabled={loading}
            className="w-full rounded-xl gradient-primary py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {loading ? "Aguarde..." : mode === "login" ? "Entrar" : "Cadastrar"}
          </button>
        </form>
        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "cadastro" : "login");
            setError("");
          }}
          className="mt-5 w-full text-sm font-semibold text-primary"
        >
          {mode === "login" ? "Ainda não tenho uma conta" : "Já tenho uma conta"}
        </button>
      </div>
    </main>
  );
}

function Field(props: {
  name: string;
  label: string;
  type: string;
  autoComplete: string;
  minLength?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{props.label}</span>
      <input
        {...props}
        required
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}
