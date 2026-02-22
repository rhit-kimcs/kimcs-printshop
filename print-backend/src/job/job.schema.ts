import { file, z } from 'zod';

export const jobSchema = z.object({
  id: z.number(),
  pid: z.number(),
  file_name: z.string(),
  file_path: z.string(),
  num_copies: z.number(),
  num_pages: z.number(),
  comment: z.string().optional(),
});

export type Job = z.infer<typeof jobSchema>;
