import * as z from 'zod';
export const AuthUserDeleteManyResultSchema = z.object({
  count: z.number()
});