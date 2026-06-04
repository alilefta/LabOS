import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductAddonWhereInputObjectSchema as ProductAddonWhereInputObjectSchema } from './ProductAddonWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => ProductAddonWhereInputObjectSchema).optional(),
  some: z.lazy(() => ProductAddonWhereInputObjectSchema).optional(),
  none: z.lazy(() => ProductAddonWhereInputObjectSchema).optional()
}).strict();
export const ProductAddonListRelationFilterObjectSchema: z.ZodType<Prisma.ProductAddonListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonListRelationFilter>;
export const ProductAddonListRelationFilterObjectZodSchema = makeSchema();
