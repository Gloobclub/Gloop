import { submissions, twitterSubmissions, type Submission, type InsertSubmission, type TwitterSubmission, type InsertTwitterSubmission } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createSubmission(submission: InsertSubmission): Promise<Submission>;
  getSubmissions(): Promise<Submission[]>;
  getSubmission(id: number): Promise<Submission | undefined>;
  updateSubmissionStatus(id: number, status: string): Promise<Submission | undefined>;
  createTwitterSubmission(submission: InsertTwitterSubmission): Promise<TwitterSubmission>;
}

export class DatabaseStorage implements IStorage {
  async createSubmission(insertSubmission: InsertSubmission): Promise<Submission> {
    const [submission] = await db
      .insert(submissions)
      .values(insertSubmission)
      .returning();
    return submission;
  }

  async getSubmissions(): Promise<Submission[]> {
    return await db.select().from(submissions);
  }

  async getSubmission(id: number): Promise<Submission | undefined> {
    const [submission] = await db
      .select()
      .from(submissions)
      .where(eq(submissions.id, id));
    return submission;
  }

  async updateSubmissionStatus(id: number, status: string): Promise<Submission | undefined> {
    const [submission] = await db
      .update(submissions)
      .set({ status })
      .where(eq(submissions.id, id))
      .returning();
    return submission;
  }

  async createTwitterSubmission(insertTwitterSubmission: InsertTwitterSubmission): Promise<TwitterSubmission> {
    const [submission] = await db
      .insert(twitterSubmissions)
      .values(insertTwitterSubmission)
      .returning();
    return submission;
  }
}

export const storage = new DatabaseStorage();
