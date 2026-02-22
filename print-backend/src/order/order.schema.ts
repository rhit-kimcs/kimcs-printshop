import { z } from 'zod';

export const orderSchema = z.object({
  id: z.number(),
  department_name: z.string(),
  FOPAL: z.string(),
  date_needed: z.date(),
  time_needed: z.string().nullable(),
  date_submitted: z.date(),
});

export type Order = z.infer<typeof orderSchema>;
