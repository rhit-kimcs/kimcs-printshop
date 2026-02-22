import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  cid: z.string(),
  first: z.string(),
  last: z.string(),
  email: z.string().email(),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be at most 15 digits')
    .nullable(),
  default_did: z.number().nullable(),
});

export type User = z.infer<typeof userSchema>;
