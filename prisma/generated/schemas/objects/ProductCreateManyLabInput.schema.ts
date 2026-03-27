import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  workTypeId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const ProductCreateManyLabInputObjectSchema: z.ZodType<Prisma.ProductCreateManyLabInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateManyLabInput>;
export const ProductCreateManyLabInputObjectZodSchema = makeSchema();
