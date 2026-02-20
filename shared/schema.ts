import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  walletAddress: text("wallet_address").notNull(),
  twitterHandle: text("twitter_handle"),
  discordHandle: text("discord_handle"),
  imageUrl: text("image_url").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  createdAt: timestamp("created_at").defaultNow(),
});

export const twitterSubmissions = pgTable("twitter_submissions", {
  id: serial("id").primaryKey(),
  twitterHandle: text("twitter_handle").notNull(),
  quoteContent: text("quote_content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSubmissionSchema = createInsertSchema(submissions).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertTwitterSubmissionSchema = createInsertSchema(twitterSubmissions).omit({
  id: true,
  createdAt: true,
});

export type Submission = typeof submissions.$inferSelect;
export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;
export type TwitterSubmission = typeof twitterSubmissions.$inferSelect;
export type InsertTwitterSubmission = z.infer<typeof insertTwitterSubmissionSchema>;
