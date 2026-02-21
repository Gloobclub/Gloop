import type { VercelRequest, VercelResponse } from "@vercel/node";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

const twitterSubmissions = pgTable("twitter_submissions", {
  id: serial("id").primaryKey(),
  twitterHandle: text("twitter_handle").notNull(),
  quoteContent: text("quote_content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
import { Resend } from "resend";
import { z } from "zod";

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);
const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  twitterHandle: z.string().min(1),
  quoteContent: z.string().min(1),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();
  try {
    const data = schema.parse(req.body);
    await db.insert(twitterSubmissions).values(data);
    await resend.emails.send({
      from: "Gloop Club <onboarding@resend.dev>",
      to: "gloopclubs@gmail.com",
      subject: "New X Submission",
      html: `<p><strong>X Username:</strong> ${data.twitterHandle}</p><p><strong>Quote/Thread:</strong> ${data.quoteContent}</p>`,
    });
    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
