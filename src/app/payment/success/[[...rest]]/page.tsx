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
  const sessionId = sessionStorage?.getItem("sessionId");
  const { user } = useUser();
  const router = useRouter();
  const useSave = api.payment.saveSession.useMutation();

  const handleGoToRoast = async () => {
    const result = await useSave.mutateAsync({
      sessionId: sessionId as string,
      userId: user?.id,
    });
    router.push(`/roast/${result.response[0]?.hash!}`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] px-4 py-12 text-white">
      <SignedOut>
        <div className="w-full max-w-md rounded-2xl bg-white/15 p-8 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col items-center gap-6 text-center">
            <Sparkles className="h-12 w-12 text-pink-300" />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-pink-200">
                Falta pouco para o seu roast!
              </h2>
              <p className="text-sm text-white/80">
                Crie sua conta em segundos para salvar seus resultados, acessar
                históricos e receber roasts personalizados no futuro.
              </p>
            </div>
            <SignUp
              appearance={{
                elements: {
                  card: "bg-white/20 border-none shadow-lg",
                  formButtonPrimary:
                    "bg-pink-600 hover:bg-pink-700 text-white font-semibold",
                },
              }}
            />
            <div className="w-full rounded-xl bg-white/10 p-4 text-center">
              <p className="mb-3 text-sm text-white/70">
                Prefere continuar sem criar conta agora?
              </p>
              <Button
                onClick={handleGoToRoast}
                className="w-full bg-pink-600 text-white hover:bg-pink-700"
              >
                Continuar sem conta
              </Button>
            </div>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="w-full max-w-3xl rounded-3xl bg-white/10 p-10 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col items-center gap-4 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-300" />
            <h1 className="text-4xl font-black text-green-200">
              Parabéns pela compra!
            </h1>
            <p className="text-lg text-white/85">
              Sua transação foi concluída com sucesso e seu roast está sendo
              preparado. Pode levar alguns instantes, mas prometemos que vale a
              pena!
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white/15 p-6 text-left">
              <h3 className="text-sm font-semibold tracking-wide text-white/60 uppercase">
                Resumo da compra
              </h3>
            </div>
            <div className="rounded-2xl bg-white/15 p-6 text-left">
              <h3 className="text-sm font-semibold tracking-wide text-white/60 uppercase">
                Próximos passos
              </h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/85">
                <li>Preparamos seu roast com IA e humor afiado.</li>
                <li>
                  Você poderá visualizar, copiar e compartilhar o resultado.
                </li>
                <li>Fique de olho no seu e-mail para receber atualizações.</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 md:flex-row md:justify-center">
            <Button
              onClick={handleGoToRoast}
              size="lg"
              className="h-12 min-w-[200px] bg-pink-600 text-lg font-semibold text-white hover:bg-pink-700"
            >
              Ver meu roast
            </Button>
            <SignOutButton>
              <Button
                variant="outline"
                className="h-12 min-w-[200px] border-pink-300 text-pink-200 hover:bg-pink-300/10"
              >
                Sair por agora
              </Button>
            </SignOutButton>
          </div>
        </div>
      </SignedIn>
    </div>
  );
}
