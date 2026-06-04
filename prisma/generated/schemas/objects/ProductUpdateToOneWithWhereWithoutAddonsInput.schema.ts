import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema';
import { ProductUpdateWithoutAddonsInputObjectSchema as ProductUpdateWithoutAddonsInputObjectSchema } from './ProductUpdateWithoutAddonsInput.schema';
import { ProductUncheckedUpdateWithoutAddonsInputObjectSchema as ProductUncheckedUpdateWithoutAddonsInputObjectSchema } from './ProductUncheckedUpdateWithoutAddonsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ProductUpdateWithoutAddonsInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutAddonsInputObjectSchema)])
}).strict();
export const ProductUpdateToOneWithWhereWithoutAddonsInputObjectSchema: z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutAddonsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutAddonsInput>;
export const ProductUpdateToOneWithWhereWithoutAddonsInputObjectZodSchema = makeSchema();
