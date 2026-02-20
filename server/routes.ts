import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { insertSubmissionSchema, insertTwitterSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/submissions", async (req, res) => {
    try {
      const data = insertSubmissionSchema.parse(req.body);
      const submission = await storage.createSubmission(data);
      res.status(201).json(submission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  });

  app.post("/api/twitter-submissions", async (req, res) => {
    try {
      const data = insertTwitterSubmissionSchema.parse(req.body);
      await storage.createTwitterSubmission(data);
      
      // Send email using Resend
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: 'Gloop Club <onboarding@resend.dev>',
          to: 'delivered@resend.dev', // In a real app, this would be the user's email
          subject: 'New X Submission',
          html: `<p><strong>X Username:</strong> ${data.twitterHandle}</p><p><strong>Quote/Thread:</strong> ${data.quoteContent}</p>`
        });
      }

      res.status(201).json({ success: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        console.error("Resend error:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  });

  app.get("/api/submissions", async (req, res) => {
    try {
      const submissions = await storage.getSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/api/submissions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }
      const submission = await storage.getSubmission(id);
      if (!submission) {
        return res.status(404).json({ error: "Submission not found" });
      }
      res.json(submission);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  return httpServer;
}
