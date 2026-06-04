import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductAddonCountOutputTypeSelectObjectSchema as ProductAddonCountOutputTypeSelectObjectSchema } from './ProductAddonCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ProductAddonCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const ProductAddonCountOutputTypeArgsObjectSchema = makeSchema();
export const ProductAddonCountOutputTypeArgsObjectZodSchema = makeSchema();
