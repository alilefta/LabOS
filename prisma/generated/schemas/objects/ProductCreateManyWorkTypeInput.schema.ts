import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  labId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const ProductCreateManyWorkTypeInputObjectSchema: z.ZodType<Prisma.ProductCreateManyWorkTypeInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateManyWorkTypeInput>;
export const ProductCreateManyWorkTypeInputObjectZodSchema = makeSchema();
