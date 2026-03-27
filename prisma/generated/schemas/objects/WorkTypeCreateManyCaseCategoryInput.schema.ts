import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  labId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const WorkTypeCreateManyCaseCategoryInputObjectSchema: z.ZodType<Prisma.WorkTypeCreateManyCaseCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeCreateManyCaseCategoryInput>;
export const WorkTypeCreateManyCaseCategoryInputObjectZodSchema = makeSchema();
