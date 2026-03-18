import * as z from 'zod';
export const SuperUserDeleteManyResultSchema = z.object({
  count: z.number()
});