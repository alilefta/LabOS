import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  description: z.literal(true).optional(),
  imageUrl: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  requireTeethSelection: z.literal(true).optional(),
  caseCategoryId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const WorkTypeCountAggregateInputObjectSchema: z.ZodType<Prisma.WorkTypeCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeCountAggregateInputType>;
export const WorkTypeCountAggregateInputObjectZodSchema = makeSchema();
