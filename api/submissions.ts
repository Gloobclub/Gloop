import type { VercelRequest, VercelResponse } from "@vercel/node";
import { drizzle } from "drizzle-orm/node-postgres";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import pg from "pg";
import { z } from "zod";

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  walletAddress: text("wallet_address").notNull(),
  twitterHandle: text("twitter_handle"),
  discordHandle: text("discord_handle"),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().url(),
  walletAddress: z.string().min(1),
  twitterHandle: z.string().optional(),
  discordHandle: z.string().optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    const all = await db.select().from(submissions);
    return res.status(200).json(all);
  }
  if (req.method === "POST") {
    try {
      const data = schema.parse(req.body);
      const [submission] = await db.insert(submissions).values(data).returning();
      return res.status(201).json(submission);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  return res.status(405).end();
                 }
