import React from "react";
import { useTranslations } from "next-intl";
import FormProfile from "../components/formProfile";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <section className="w-full max-w-2xl text-center">
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight sm:text-[4rem]">
            {t("title")}
          </h1>
          <p className="mb-8 text-xl text-white/80">{t("subtitle")}</p>
        </section>
        <section className="w-full max-w-xl rounded-xl bg-white/10 p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-pink-400">
            {t("upload")}
          </h2>
          <FormProfile />
        </section>
        <section className="mt-12 w-full max-w-2xl">
          <div className="rounded-xl bg-white/10 p-6 shadow-lg">
            <h2 className="mb-2 text-2xl font-bold text-pink-400">
              Exemplo de Roast
            </h2>
            <p className="mb-2 text-white">
              "Sua foto parece tirada com uma batata, mas pelo menos você
              sorriu! A bio tem mais clichê que perfil de LinkedIn, bora
              melhorar?"
            </p>
            <p className="text-yellow-300">Score: 42/100</p>
            <ul className="mt-2 list-inside list-disc text-left text-white/80">
              <li>Troque a foto por uma com melhor iluminação</li>
              <li>Evite frases genéricas na bio</li>
              <li>Mostre mais personalidade!</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
