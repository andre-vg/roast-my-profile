import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import Stripe from "stripe";
import { roasts } from "@/server/db/schema";
import { generateRoast } from "@/server/services/ai";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-08-27.basil",
});

export const roastRouter = createTRPCRouter({
  getSessionByHash: publicProcedure
    .input(z.object({ hash: z.string() }))
    .query(async ({ input, ctx }) => {
      const roast = await ctx.db.query.roasts.findFirst({
        where: (roast, { eq }) => eq(roast.hash, input.hash),
      });

      if (!roast) {
        throw new Error("Roast not found");
      }

      const session = await stripe.checkout.sessions.retrieve(roast?.sessionId);
      return { session, roast };
    }),

  getAIResponse: publicProcedure
    .input(
      z.object({
        photos: z.string().min(1),
        name: z.string().min(1),
        bio: z.string().min(1),
        roastId: z.number().min(1).optional(),
        roastMessage: z.string().min(1).optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      if (input.roastId && input.roastMessage) {
        const existingRoast = await ctx.db.query.roasts.findFirst({
          where: (roast, { eq }) => eq(roast.id, input.roastId!),
        });

        return { text: existingRoast?.message || "" };
      }

      const response = await generateRoast({
        photos: JSON.parse(input.photos),
        name: input.name,
        bio: input.bio,
      });
      if (response && response.text) {
        // Save the roast to the database
        try {
          const insertResult = await ctx.db
            .update(roasts)
            .set({ message: response.text })
            .where(eq(roasts.id, input.roastId as number))
            .returning();

          console.log("Roast salvo no banco de dados:", insertResult);
        } catch (error) {
          console.error("Erro ao salvar roast no banco de dados:", error);
        }
      }

      return {
        text: response.text,
      };
    }),
});
