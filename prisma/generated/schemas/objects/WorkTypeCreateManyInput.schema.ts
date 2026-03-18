import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  labId: z.string(),
  caseCategoryId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const WorkTypeCreateManyInputObjectSchema: z.ZodType<Prisma.WorkTypeCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeCreateManyInput>;
export const WorkTypeCreateManyInputObjectZodSchema = makeSchema();
