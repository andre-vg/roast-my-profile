import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import Stripe from "stripe";
import { roasts } from "@/server/db/schema";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-08-27.basil",
});

export const paymentRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        photos: z.array(z.string().min(1)).max(3),
        name: z.string().min(1),
        bio: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { photos, name, bio } = input;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Your Product Name",
              },
              unit_amount: 299, // Price in cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        metadata: {
          photos: JSON.stringify(photos),
          name,
          bio,
        },
        success_url: `${ctx.headers.get("origin")}/payment/success`,
        cancel_url: `${ctx.headers.get("origin")}`,
      });

      return {
        session,
      };
    }),
  getSession: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      const session = await stripe.checkout.sessions.retrieve(input.sessionId);
      return { session };
    }),
  saveSession: publicProcedure
    .input(
      z.object({
        sessionId: z.string().min(1),
        userId: z.string().min(1).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { sessionId, userId } = input;
      const response = await ctx.db
        .insert(roasts)
        .values({ sessionId, userId })
        .returning();
      return { response };
    }),
});
