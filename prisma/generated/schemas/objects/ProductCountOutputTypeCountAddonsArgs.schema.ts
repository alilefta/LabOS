import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductAddonWhereInputObjectSchema as ProductAddonWhereInputObjectSchema } from './ProductAddonWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductAddonWhereInputObjectSchema).optional()
}).strict();
export const ProductCountOutputTypeCountAddonsArgsObjectSchema = makeSchema();
export const ProductCountOutputTypeCountAddonsArgsObjectZodSchema = makeSchema();
