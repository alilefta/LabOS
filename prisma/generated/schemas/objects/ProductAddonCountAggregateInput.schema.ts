import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  productId: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  name: z.literal(true).optional(),
  price: z.literal(true).optional(),
  isArchived: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const ProductAddonCountAggregateInputObjectSchema: z.ZodType<Prisma.ProductAddonCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonCountAggregateInputType>;
export const ProductAddonCountAggregateInputObjectZodSchema = makeSchema();
