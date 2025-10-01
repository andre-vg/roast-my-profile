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
import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";

const formSchema = z.object({
  pictures: z.any(), // aceita FileList
  name: z.string().min(1),
  Bio: z.string(),
});

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

export default function FormProfile() {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const useSave = api.payment.create.useMutation();

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (uploadedUrls.length === 0) {
        toast.error("Envie pelo menos uma foto!");
        return;
      }
      convertAndCheckout(values);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  const convertAndCheckout = async (formData: z.infer<typeof formSchema>) => {
    const stripe = await stripePromise;
    const { session } = await useSave.mutateAsync({
      photos: uploadedUrls,
      name: formData.name,
      bio: formData.Bio,
    });
    sessionStorage.setItem("sessionId", session.id);
    await stripe?.redirectToCheckout({
      sessionId: session.id,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-8 py-10"
      >
        <FormField
          control={form.control}
          name="pictures"
          render={() => (
            <FormItem>
              <FormLabel>Fotos do perfil (até 3)</FormLabel>
              <FormControl>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setUploadedUrls(res.map((r) => r.url));
                    toast.success("Upload concluído!");
                  }}
                  onUploadError={(error) => {
                    toast.error("Erro no upload: " + error.message);
                  }}
                />
              </FormControl>
              <FormDescription>
                Envie até 3 fotos principais do seu perfil de dating.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="text" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Placeholder"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can @mention other users and organizations.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
