import * as z from 'zod';
export const StoredFileCreateManyResultSchema = z.object({
  count: z.number()
});