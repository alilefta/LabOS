import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  price: z.literal(true).optional()
}).strict();
export const ProductAddonAvgAggregateInputObjectSchema: z.ZodType<Prisma.ProductAddonAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonAvgAggregateInputType>;
export const ProductAddonAvgAggregateInputObjectZodSchema = makeSchema();
