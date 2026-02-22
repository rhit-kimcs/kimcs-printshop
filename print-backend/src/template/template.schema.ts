import { z } from 'zod';

export const templateSchema = z.object({
  id: z.number(),
  name: z.string(),
  department: z.string(),
  FOPAL: z.string(),
});

export type Template = z.infer<typeof templateSchema>;
