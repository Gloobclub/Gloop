import { z } from 'zod';
import { insertSubmissionSchema, submissions } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  submissions: {
    list: {
      method: 'GET' as const,
      path: '/api/submissions' as const,
      responses: {
        200: z.array(z.custom<typeof submissions.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/submissions' as const,
      input: insertSubmissionSchema,
      responses: {
        201: z.custom<typeof submissions.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  twitterSubmissions: {
    create: {
      method: 'POST' as const,
      path: '/api/twitter-submissions' as const,
      input: z.object({
        twitterHandle: z.string().min(1, "X username is required"),
        quoteContent: z.string().min(1, "Quote content is required"),
      }),
      responses: {
        201: z.object({ success: z.boolean() }),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type SubmissionInput = z.infer<typeof api.submissions.create.input>;
export type SubmissionResponse = z.infer<typeof api.submissions.create.responses[201]>;
export type SubmissionsListResponse = z.infer<typeof api.submissions.list.responses[200]>;
