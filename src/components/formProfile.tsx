"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { useCallback, useMemo, useState } from "react";
import { UploadButton } from "@/utils/uploadthing";

// validação básica; o upload é tratado pelo UploadButton
const formSchema = z.object({
  pictures: z.any().optional(),
  name: z.string().min(1, "Insira um nome"),
  Bio: z.string().optional(),
});

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

export default function FormProfile() {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", Bio: "" },
  });

  const saveMutation = api.payment.create.useMutation();

  const canSubmit = useMemo(() => {
    return uploadedUrls.length > 0 && !isSubmitting;
  }, [uploadedUrls, isSubmitting]);

  const handleRemove = useCallback((url: string) => {
    setUploadedUrls((s) => s.filter((u) => u !== url));
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (uploadedUrls.length === 0) {
      toast.error("Envie pelo menos uma foto (máx. 3).");
      return;
    }

    setIsSubmitting(true);
    try {
      await convertAndCheckout(values);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Falha ao enviar o formulário. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const convertAndCheckout = async (formData: z.infer<typeof formSchema>) => {
    const stripe = await stripePromise;
    const { session } = await saveMutation.mutateAsync({
      photos: uploadedUrls,
      name: formData.name,
      bio: formData.Bio || "",
    });
    sessionStorage.setItem("sessionId", session.id);
    await stripe?.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="grid gap-6 md:grid-cols-1">
          {/* Upload area */}
          <FormField
            control={form.control}
            name="pictures"
            render={() => (
              <FormItem>
                <FormLabel className="text-base">Fotos do perfil (até 3)</FormLabel>
                <FormDescription>
                  Faça upload das suas melhores fotos — o ideal são 2–3 imagens.
                </FormDescription>

                <div className="mt-3 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          const urls = res.map((r) => r.url).slice(0, 3);
                          setUploadedUrls((prev) => {
                            const merged = [...prev, ...urls].slice(0, 3);
                            return Array.from(new Set(merged));
                          });
                          toast.success("Upload concluído!");
                        }}
                        onUploadError={(error) => {
                          toast.error("Erro no upload: " + error.message);
                        }}
                      />
                    </div>

                    <div className="text-sm text-slate-300">{uploadedUrls.length}/3</div>
                  </div>

                  {uploadedUrls.length > 0 && (
                    <div className="grid grid-cols-3 gap-3">
                      {uploadedUrls.map((url) => (
                        <div key={url} className="relative rounded-md overflow-hidden border border-white/6">
                          <img src={url} alt="preview" className="h-24 w-full object-cover" />
                          <button
                            type="button"
                            aria-label="Remover imagem"
                            onClick={() => handleRemove(url)}
                            className="absolute top-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Name field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome público</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome ou nickname" type="text" {...field} />
                </FormControl>
                <FormDescription>Este nome aparecerá no resultado do roast.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bio field */}
          <FormField
            control={form.control}
            name="Bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Escreva uma bio curta (opcional)" className="resize-none min-h-[96px]" {...field} />
                </FormControl>
                <FormDescription>Conte algo único — ajuda o roast a ser mais específico.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end gap-3">
            <Button type="submit" disabled={!canSubmit} className="px-6 py-2">
              {isSubmitting ? "Redirecionando..." : "Enviar e pagar"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
