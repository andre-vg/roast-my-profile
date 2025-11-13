import { notFound } from "next/navigation";
import { api, HydrateClient } from "@/trpc/server";
import ChatMessages from "@/components/chatMessages";

export default async function RoastPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const roastSession = await api.roast.getSessionByHash({ hash: slug });

  if (!roastSession?.session) {
    notFound();
  }

  const metadata =
    (roastSession.session.metadata as Record<string, string | undefined>) ?? {};
  const profileName = metadata.name ?? metadata.profile_name ?? "Usuário";
  const profileBio =
    metadata.bio ?? metadata.profile_bio ?? "(bio ainda não informada)";

  const photos = metadata.photos ? JSON.parse(metadata.photos) : [];

  const sessionId = roastSession.session.id;

  return (
    <HydrateClient>
      <main className="min-h-screen w-full bg-gradient-to-b from-[#0b1220] via-[#0f172a] to-[#05020d] px-4 py-8 text-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 md:flex-row md:gap-8">
          <section className="flex-1 rounded-3xl border border-white/6 bg-white/4 p-4 shadow-2xl backdrop-blur-xl sm:p-6">
            <div className="flex h-full flex-col gap-6">
              <header className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-white/5 p-5 backdrop-blur-lg sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full items-center gap-4 sm:w-auto">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-600 text-lg font-semibold uppercase sm:text-xl">
                    {profileName.charAt(0)}
                  </span>
                  <div>
                    <h1 className="text-lg font-semibold text-white">
                      {profileName}
                    </h1>
                    <p className="text-sm text-slate-300">
                      Status: Roast pronto
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                  <span className="rounded-full border border-white/8 bg-white/6 px-3 py-1 text-center">
                    Sessão #{sessionId.slice(-6)}
                  </span>
                </div>
              </header>

              <div className="flex-1 overflow-hidden rounded-2xl border border-white/8 bg-black/30 p-4 backdrop-blur-lg sm:p-6">
                <div className="flex h-full min-h-[18rem] rounded-xl border border-dashed border-white/20 bg-white/5 sm:min-h-[22rem] lg:min-h-[26rem]">
                  <ChatMessages
                    myMessage={{ profileName, profileBio, photos }}
                    roastId={roastSession.roast?.id}
                    roastMessage={roastSession.roast?.message || undefined}
                  />
                </div>
              </div>

              <footer className="rounded-2xl border border-white/8 bg-white/5 p-4 backdrop-blur-lg sm:p-5">
                <div className="flex flex-col items-center gap-3 sm:flex-row">
                  <div className="flex h-11 w-full items-center rounded-full border border-white/15 bg-white/10 px-4 text-sm text-slate-300 sm:h-10 sm:flex-1">
                    Campo de envio em breve
                  </div>
                  <button
                    type="button"
                    className="w-full cursor-not-allowed rounded-full bg-pink-600/80 px-5 py-2 text-sm font-semibold text-white opacity-60 sm:w-auto"
                    disabled
                  >
                    Enviar
                  </button>
                </div>
              </footer>
            </div>
          </section>

          <aside className="flex w-full flex-col gap-4 md:max-w-sm md:gap-5">
            <div className="rounded-3xl border border-white/8 bg-white/6 p-5 backdrop-blur-xl sm:p-6">
              <h2 className="text-sm font-semibold tracking-wide text-slate-300 uppercase">
                Resumo do perfil
              </h2>
              <div className="mt-4 space-y-4 text-sm text-slate-300">
                <div>
                  <span className="text-xs tracking-wide text-slate-400 uppercase">
                    Nome
                  </span>
                  <p className="text-white">{profileName}</p>
                </div>
                <div>
                  <span className="text-xs tracking-wide text-slate-400 uppercase">
                    Bio
                  </span>
                  <p className="whitespace-pre-wrap text-slate-300">
                    {profileBio}
                  </p>
                </div>

                <div>
                  <span className="text-xs tracking-wide text-slate-400 uppercase">
                    Fotos enviadas
                  </span>
                  {photos.length > 0 ? (
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {photos.map((url: string, index: number) => (
                        <a
                          key={url}
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="block overflow-hidden rounded-md border border-white/8"
                        >
                          <img
                            src={url}
                            alt={`Foto ${index + 1}`}
                            className="h-20 w-full object-cover"
                          />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-slate-400">
                      Nenhuma foto enviada ainda.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/8 bg-white/5 p-5 text-sm text-slate-300 backdrop-blur-xl sm:p-6">
              <h2 className="text-sm font-semibold tracking-wide text-slate-300 uppercase">
                Próximos passos
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  Assim que o roast estiver disponível, as mensagens surgirão na
                  área do chat.
                </li>
                <li>
                  Você poderá responder, salvar e compartilhar os highlights
                  direto daqui.
                </li>
                <li>
                  Enquanto isso, confirme se os dados do perfil estão corretos.
                </li>
              </ul>
            </div>

            <details className="rounded-3xl border border-white/8 bg-black/40 p-4 text-xs text-slate-400 sm:p-5">
              <summary className="cursor-pointer text-slate-300">
                Ver JSON de depuração
              </summary>
              <div className="mt-3 space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-300">
                    Session metadata
                  </h3>
                  <pre className="mt-1 max-h-48 overflow-auto text-[10px] leading-relaxed whitespace-pre-wrap">
                    {JSON.stringify(roastSession.session.metadata, null, 2)}
                  </pre>
                </div>
              </div>
            </details>
          </aside>
        </div>
      </main>
    </HydrateClient>
  );
}
