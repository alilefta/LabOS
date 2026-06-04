import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductAddonWhereInputObjectSchema as ProductAddonWhereInputObjectSchema } from './ProductAddonWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => ProductAddonWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => ProductAddonWhereInputObjectSchema).optional()
}).strict();
export const ProductAddonScalarRelationFilterObjectSchema: z.ZodType<Prisma.ProductAddonScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonScalarRelationFilter>;
export const ProductAddonScalarRelationFilterObjectZodSchema = makeSchema();
