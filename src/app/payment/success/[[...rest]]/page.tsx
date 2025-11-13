"use client";
import { useRouter } from "next/navigation";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import {
  useUser,
  SignUp,
  SignedOut,
  SignedIn,
  SignOutButton,
} from "@clerk/nextjs";

export default function PageSuccess() {
  // sessionId is stored in sessionStorage by the checkout flow
  const sessionId = typeof window !== "undefined" ? sessionStorage?.getItem("sessionId") : null;
  const { user } = useUser();
  const router = useRouter();
  const saveMutation = api.payment.saveSession.useMutation();

  const handleGoToRoast = async () => {
    if (!sessionId) return router.push("/");
    const result = await saveMutation.mutateAsync({
      sessionId: sessionId as string,
      userId: user?.id,
    });
    const hash = result.response?.[0]?.hash;
    if (hash) {
      router.push(`/roast/${hash}`);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0b1220] via-[#0f172a] to-[#05020d] text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        <div className="grid gap-8 md:grid-cols-2">
          {/* SignedOut card */}
          <SignedOut>
            <div className="rounded-3xl bg-white/6 p-8 shadow-xl backdrop-blur-md border border-white/6">
              <div className="flex flex-col items-center gap-6 text-center">
                <Sparkles className="h-12 w-12 text-pink-300" />
                <h2 className="text-2xl font-extrabold text-pink-300">Falta pouco para o seu roast!</h2>
                <p className="text-sm text-slate-300 max-w-md">
                  Crie uma conta em segundos para salvar seus resultados, acessar históricos e consultar roasts anteriores.
                </p>

                <div className="w-full">
                  <SignUp
                    appearance={{
                      elements: {
                        card: "bg-white/6 border-none shadow-lg",
                        formButtonPrimary: "bg-pink-600 hover:bg-pink-700 text-white font-semibold",
                      },
                    }}
                  />
                </div>

                <div className="w-full rounded-xl bg-white/8 p-4 text-center">
                  <p className="mb-3 text-sm text-slate-300">Prefere continuar sem conta?</p>
                  <Button onClick={handleGoToRoast} className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                    Continuar sem conta
                  </Button>
                </div>
              </div>
            </div>
          </SignedOut>

          {/* SignedIn card */}
          <SignedIn>
            <div className="rounded-3xl bg-white/6 p-8 shadow-2xl backdrop-blur-md border border-white/6">
              <div className="flex flex-col items-center gap-4 text-center">
                <CheckCircle2 className="h-16 w-16 text-emerald-300" />
                <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-200">Pagamento confirmado</h1>
                <p className="text-sm text-slate-300 max-w-lg">Obrigado — estamos gerando seu roast com nossa IA. Em instantes você será redirecionado para ver o resultado.</p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-white/5 p-4">
                  <h3 className="text-sm font-semibold text-slate-300 uppercase">Resumo</h3>
                  <p className="mt-2 text-sm text-slate-300">Seu pedido foi recebido e processado. Em pouco tempo o roast ficará disponível.</p>
                </div>

                <div className="rounded-xl bg-white/5 p-4">
                  <h3 className="text-sm font-semibold text-slate-300 uppercase">O que acontece agora</h3>
                  <ul className="mt-2 list-disc pl-5 text-sm text-slate-300 space-y-1">
                    <li>Geramos um roast com tom divertido e sugestões práticas.</li>
                    <li>Você poderá salvar, copiar e compartilhar o resultado.</li>
                    <li>Checaremos a sua sessão e liberaremos a página do roast.</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 md:flex-row md:justify-center">
                <Button onClick={handleGoToRoast} size="lg" className="h-12 min-w-[200px] bg-pink-600 hover:bg-pink-700 text-white">Ver meu roast</Button>
                <SignOutButton>
                  <Button variant="outline" className="h-12 min-w-[200px] border-pink-400 text-pink-300">Sair por agora</Button>
                </SignOutButton>
              </div>
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}
