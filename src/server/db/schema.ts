import { pgTable, integer, varchar, text } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const roasts = pgTable("roasts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({
    name: "roasts_id_seq",
    startWith: 1,
    increment: 1,
    minValue: 1,
    maxValue: 2147483647,
    cache: 1,
  }),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  userId: varchar("user_id", { length: 255 }),
  hash: varchar("hash", { length: 255 })
    .default(sql`gen_random_uuid()`)
    .notNull(),
  message: text(),
});
