"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion as m, AnimatePresence, type Transition } from "motion/react";
import { api } from "@/trpc/react";

type ChatMessagesProps = {
  myMessage: { profileName: string; profileBio: string; photos: string[] };
  roastId?: number;
  roastMessage?: string;
};

const bubbleTransition: Transition = {
  type: "spring",
  stiffness: 160,
  damping: 18,
};

const loadingMessages = [
  "Analisando suas fotos...",
  "Rindo da sua bio...",
  "Calculando o nível de cringe...",
  "Chamando reforços sarcásticos...",
  "Preparando a queimada perfeita...",
];

export default function ChatMessages({
  myMessage,
  roastId,
  roastMessage,
}: ChatMessagesProps) {
  const [showUserBubble, setShowUserBubble] = useState(false);
  const [showAIBubble, setShowAIBubble] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  // Fazer a requisição do aiResponse apenas se não temos a roastMessage
  const { data: aiResponseData, isLoading } = api.roast.getAIResponse.useQuery(
    {
      photos: JSON.stringify(myMessage.photos),
      name: myMessage.profileName,
      bio: myMessage.profileBio,
      roastId,
      roastMessage,
    },
    {
      enabled: !!myMessage.profileName && !!myMessage.profileBio && !roastMessage,
    },
  );

  const aiResponse = roastMessage ? roastMessage : aiResponseData?.text ?? "";
  const hasAIText = useMemo(() => aiResponse?.trim().length > 0, [aiResponse]);
  const photoSignature = useMemo(
    () => myMessage.photos.join("|"),
    [myMessage.photos],
  );
  const shouldShowTyping = isLoading && !hasAIText;
  const currentLoadingMessage = loadingMessages[loadingMessageIndex];

  useEffect(() => {
    setShowUserBubble(false);
    setShowAIBubble(false);
    const userTimeout = setTimeout(() => setShowUserBubble(true), 150);
    return () => {
      clearTimeout(userTimeout);
    };
  }, [myMessage.profileName, myMessage.profileBio, photoSignature]);

  useEffect(() => {
    if (hasAIText) {
      const aiTimeout = setTimeout(() => setShowAIBubble(true), 400);
      return () => clearTimeout(aiTimeout);
    }

    setShowAIBubble(false);
    return undefined;
  }, [hasAIText]);

  useEffect(() => {
    if (!shouldShowTyping) {
      setLoadingMessageIndex(0);
      return undefined;
    }

    setLoadingMessageIndex(0);

    const interval = setInterval(() => {
      setLoadingMessageIndex((index) => (index + 1) % loadingMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [shouldShowTyping]);

  return (
    <div className="relative flex h-full flex-col justify-end overflow-hidden px-3 pb-4 sm:px-4">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-4 pr-2 sm:gap-6 sm:pr-3">
        <AnimatePresence>
          {showUserBubble && (
            <m.div
              key={`user-${myMessage.profileName}-${myMessage.profileBio}`}
              initial={{ opacity: 0, y: 40, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={bubbleTransition}
              className="w-full self-end rounded-3xl bg-pink-500/80 px-4 py-4 text-sm text-white shadow-2xl backdrop-blur-lg sm:max-w-xl sm:px-5 sm:py-5"
            >
              <p className="text-[0.65rem] font-semibold tracking-[0.35em] text-white/70 uppercase sm:text-xs">
                Você
              </p>
              <div className="mt-3 space-y-2 text-sm sm:text-base">
                <p className="font-semibold">{myMessage.profileName}</p>
                <p className="whitespace-pre-wrap text-white/80">
                  {myMessage.profileBio}
                </p>
                {myMessage.photos?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {myMessage.photos.slice(0, 3).map((url, index) => (
                      <m.div
                        key={url}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.15 + index * 0.05,
                          duration: 0.3,
                        }}
                        className="h-16 w-16 overflow-hidden rounded-2xl border border-white/30 bg-black/20 sm:h-20 sm:w-20"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={url}
                          alt={`Foto ${index + 1} enviada`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </m.div>
                    ))}
                    {myMessage.photos.length > 3 && (
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/30 bg-white/20 text-xs font-semibold sm:h-20 sm:w-20">
                        +{myMessage.photos.length - 3}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </m.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAIBubble && (
            <m.div
              key={`ai-${aiResponse}`}
              initial={{ opacity: 0, y: 30, x: -40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ ...bubbleTransition, delay: 0.05 }}
              className="w-full rounded-3xl border border-white/10 bg-white/8 px-4 py-4 text-sm text-white/90 shadow-2xl backdrop-blur-xl sm:max-w-2xl sm:px-5 sm:py-5"
            >
              <p className="text-[0.65rem] font-semibold tracking-[0.35em] text-white/50 uppercase sm:text-xs">
                RoastMyProfile IA
              </p>
              <div className="mt-3 text-sm whitespace-pre-wrap text-white/80 sm:text-base">
                {aiResponse.trim()}
              </div>
            </m.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {shouldShowTyping && (
            <m.div
              key="typing-indicator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="flex w-full max-w-sm items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/70 sm:text-sm"
            >
              <span className="font-semibold tracking-[0.3em] text-white/50 uppercase">
                IA
              </span>
              <TypingDots />
              <span className="flex-1 text-left text-white/60 sm:text-sm">
                {currentLoadingMessage}
              </span>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const TypingDots = () => (
  <div className="flex items-center gap-1">
    {[0, 1, 2].map((dot) => (
      <m.span
        key={dot}
        className="h-2 w-2 rounded-full bg-white/50"
        animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }}
        transition={{ duration: 1, repeat: Infinity, delay: dot * 0.2 }}
      />
    ))}
  </div>
);
