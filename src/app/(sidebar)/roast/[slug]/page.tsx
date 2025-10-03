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
      <main className="min-h-screen w-full min-w-screen bg-gradient-to-b from-[#1c0f33] via-[#110720] to-[#05020d] px-4 py-8 text-white sm:py-10 lg:py-12">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 md:flex-row md:gap-8">
          <section className="flex-1 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl sm:p-6">
            <div className="flex h-full flex-col gap-6">
              <header className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full items-center gap-4 sm:w-auto">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-500/80 text-lg font-semibold uppercase sm:text-xl">
                    {profileName.charAt(0)}
                  </span>
                  <div>
                    <h1 className="text-lg font-semibold text-white">
                      {profileName}
                    </h1>
                    <p className="text-sm text-white/70">
                      Status: Roast pronto
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-center">
                    Sessão #{sessionId.slice(-6)}
                  </span>
                </div>
              </header>

              <div className="flex-1 overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-lg sm:p-6">
                <div className="flex h-full min-h-[18rem] rounded-xl border border-dashed border-white/20 bg-white/5 sm:min-h-[22rem] lg:min-h-[26rem]">
                  <ChatMessages
                    myMessage={{
                      profileName,
                      profileBio,
                      photos,
                    }}
                    roastId={roastSession.roast?.id}
                    roastMessage={roastSession.roast?.message || undefined}
                  />
                </div>
              </div>

              <footer className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg sm:p-5">
                <div className="flex flex-col items-center gap-3 sm:flex-row">
                  <div className="flex h-11 w-full items-center rounded-full border border-white/15 bg-white/10 px-4 text-sm text-white/60 sm:h-10 sm:flex-1">
                    Campo de envio em breve
                  </div>
                  <button
                    type="button"
                    className="w-full cursor-not-allowed rounded-full bg-pink-500/70 px-5 py-2 text-sm font-semibold text-white opacity-60 sm:w-auto"
                    disabled
                  >
                    Enviar
                  </button>
                </div>
              </footer>
            </div>
          </section>

          <aside className="flex w-full flex-col gap-4 md:max-w-sm md:gap-5">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl sm:p-6">
              <h2 className="text-sm font-semibold tracking-wide text-white/70 uppercase">
                Resumo do perfil
              </h2>
              <div className="mt-4 space-y-4 text-sm text-white/80">
                <div>
                  <span className="text-xs tracking-wide text-white/60 uppercase">
                    Nome
                  </span>
                  <p className="text-white">{profileName}</p>
                </div>
                <div>
                  <span className="text-xs tracking-wide text-white/60 uppercase">
                    Bio
                  </span>
                  <p className="whitespace-pre-wrap text-white/80">
                    {profileBio}
                  </p>
                </div>
                {photos.length > 0 ? (
                  <div>
                    <span className="text-xs tracking-wide text-white/60 uppercase">
                      Fotos enviadas
                    </span>
                    <ul className="mt-2 space-y-1 text-white/80">
                      {photos.map((url: string, index: number) => (
                        <li
                          key={url}
                          className="truncate text-xs text-white/70"
                        >
                          #{index + 1} — {url}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>
                    <span className="text-xs tracking-wide text-white/60 uppercase">
                      Fotos enviadas
                    </span>
                    <p className="text-white/60">Nenhuma foto enviada ainda.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/80 backdrop-blur-xl sm:p-6">
              <h2 className="text-sm font-semibold tracking-wide text-white/70 uppercase">
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

            <details className="rounded-3xl border border-white/10 bg-black/40 p-4 text-xs text-white/60 sm:p-5">
              <summary className="cursor-pointer text-white/70">
                Ver JSON de depuração
              </summary>
              <div className="mt-3 space-y-4">
                <div>
                  <h3 className="font-semibold text-white/80">
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
