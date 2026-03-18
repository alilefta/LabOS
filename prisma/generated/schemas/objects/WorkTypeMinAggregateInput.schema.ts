import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  description: z.literal(true).optional(),
  imageUrl: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  caseCategoryId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const WorkTypeMinAggregateInputObjectSchema: z.ZodType<Prisma.WorkTypeMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeMinAggregateInputType>;
export const WorkTypeMinAggregateInputObjectZodSchema = makeSchema();
