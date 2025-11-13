import React from "react";
import { useTranslations } from "next-intl";
import FormProfile from "../components/formProfile";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#0b1220] text-slate-100 antialiased">
      <header className="container mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center font-bold text-white shadow-lg">
            RM
          </div>
          <div>
            <h1 className="text-lg font-semibold">Roast My Profile</h1>
            <p className="text-xs text-slate-400">Get brutally honest — and useful — feedback</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <a className="hover:text-white" href="#features">Features</a>
          <a className="hover:text-white" href="#example">Example</a>
          <a className="hover:text-white" href="#upload">Upload</a>
        </nav>
      </header>

      <section className="container mx-auto px-6 py-12 grid gap-12 md:grid-cols-2 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            {t("title") || "Make your profile unforgettable"}
          </h2>
          <p className="text-lg text-slate-300 max-w-xl">
            {t("subtitle") || "Upload your photo and bio, get a playful but actionable roast that helps you stand out."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <a href="#upload" className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-5 py-3 text-white font-medium shadow hover:scale-[1.02] transition">
              Upload profile — get roast
            </a>
            <a href="#example" className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-3 text-sm text-slate-200 hover:bg-slate-800 transition">
              See an example
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-800/60 px-3 py-1 text-xs text-slate-300">AI-driven insights</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-800/60 px-3 py-1 text-xs text-slate-300">Quick & private</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-800/60 px-3 py-1 text-xs text-slate-300">Actionable tips</span>
          </div>
        </div>

        <div id="upload" className="relative">
          <div className="pointer-events-none absolute -right-12 -top-12 hidden md:block">
            <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20 drop-shadow-2xl">
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0" stopColor="#ff80b5" />
                  <stop offset="1" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
              <circle cx="110" cy="110" r="110" fill="url(#g1)" />
            </svg>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-white/6 to-white/3 backdrop-blur-md border border-white/6 p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-white">Get a quick roast</h3>
            <p className="text-sm text-slate-300 mb-4">Upload a photo and paste your bio — you’ll get a short roast and 3 improvement tips.</p>
            <div className="rounded-md bg-slate-900/60 p-4">
              <FormProfile />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="container mx-auto px-6 py-10">
        <h3 className="text-2xl font-bold text-center mb-8">Why people love it</h3>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-6 rounded-xl bg-slate-800/40 border border-white/6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-pink-500 text-white">🔥</div>
            <h4 className="font-semibold mb-2">Attention-grabbing roasts</h4>
            <p className="text-sm text-slate-300">Playful, direct, and crafted to point out exactly what needs fixing.</p>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/40 border border-white/6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500 text-white">⚙️</div>
            <h4 className="font-semibold mb-2">Actionable tips</h4>
            <p className="text-sm text-slate-300">Each roast comes with 2–4 concrete suggestions you can apply right away.</p>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/40 border border-white/6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500 text-white">🔒</div>
            <h4 className="font-semibold mb-2">Private & fast</h4>
            <p className="text-sm text-slate-300">Files are processed securely and results are shown instantly — no drama.</p>
          </div>
        </div>
      </section>

      <section id="example" className="container mx-auto px-6 py-12">
        <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-slate-900/60 to-slate-900/40 p-8 border border-white/6 shadow-lg">
          <div className="flex items-start gap-6">
            <div className="h-28 w-28 flex-none rounded-xl bg-gradient-to-br from-pink-500 to-violet-600 shadow-lg flex items-center justify-center font-bold text-white">🙂</div>
            <div>
              <h4 className="text-xl font-bold">Exemplo de Roast</h4>
              <p className="mt-2 text-slate-300">"Sua foto parece tirada com uma batata, mas pelo menos você sorriu! A bio tem mais clichê que perfil de LinkedIn — vamos dar personalidade."</p>

              <div className="mt-4 flex items-center gap-4">
                <div className="text-sm text-slate-300">Score</div>
                <div className="w-full">
                  <div className="h-3 w-full rounded-full bg-white/8">
                    <div className="h-3 rounded-full bg-yellow-400" style={{ width: "42%" }} />
                  </div>
                </div>
                <div className="text-sm font-semibold text-white">42/100</div>
              </div>

              <ul className="mt-4 list-inside list-disc text-slate-300">
                <li>Use uma foto com melhor iluminação e fundo limpo</li>
                <li>Remova frases genéricas na bio — conte algo específico</li>
                <li>Adicione um toque de humor ou interesse único</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-12 border-t border-white/6 py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} Roast My Profile — Built with ❤️</p>
          <div className="flex gap-4 text-sm">
            <a className="text-slate-300 hover:text-white" href="#">Privacy</a>
            <a className="text-slate-300 hover:text-white" href="#">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
