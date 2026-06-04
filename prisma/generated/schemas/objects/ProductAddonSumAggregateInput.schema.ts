import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  price: z.literal(true).optional()
}).strict();
export const ProductAddonSumAggregateInputObjectSchema: z.ZodType<Prisma.ProductAddonSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonSumAggregateInputType>;
export const ProductAddonSumAggregateInputObjectZodSchema = makeSchema();
