import { z } from 'zod';

export const profileSchema = z.object({
  id: z.number(),
  name: z.string(),
  is_color: z.boolean(),
  double_sizing: z.string(),
  paper_color: z.string(),
  paper_size: z.string(),
  distribution: z.string(),
  binding: z.string(),
});

export type Profile = z.infer<typeof profileSchema>;
