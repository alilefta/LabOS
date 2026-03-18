import * as z from 'zod';
export const LabDeleteManyResultSchema = z.object({
  count: z.number()
});