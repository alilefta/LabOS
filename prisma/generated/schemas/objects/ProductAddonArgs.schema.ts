import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductAddonSelectObjectSchema as ProductAddonSelectObjectSchema } from './ProductAddonSelect.schema';
import { ProductAddonIncludeObjectSchema as ProductAddonIncludeObjectSchema } from './ProductAddonInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ProductAddonSelectObjectSchema).optional(),
  include: z.lazy(() => ProductAddonIncludeObjectSchema).optional()
}).strict();
export const ProductAddonArgsObjectSchema = makeSchema();
export const ProductAddonArgsObjectZodSchema = makeSchema();
