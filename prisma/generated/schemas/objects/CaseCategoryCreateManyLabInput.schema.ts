import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const CaseCategoryCreateManyLabInputObjectSchema: z.ZodType<Prisma.CaseCategoryCreateManyLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryCreateManyLabInput>;
export const CaseCategoryCreateManyLabInputObjectZodSchema = makeSchema();
