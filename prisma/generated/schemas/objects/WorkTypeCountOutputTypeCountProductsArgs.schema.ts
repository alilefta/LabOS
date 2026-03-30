import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductWhereInputObjectSchema).optional()
}).strict();
export const WorkTypeCountOutputTypeCountProductsArgsObjectSchema = makeSchema();
export const WorkTypeCountOutputTypeCountProductsArgsObjectZodSchema = makeSchema();
