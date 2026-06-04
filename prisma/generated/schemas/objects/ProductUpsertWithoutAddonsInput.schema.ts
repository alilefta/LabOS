import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductUpdateWithoutAddonsInputObjectSchema as ProductUpdateWithoutAddonsInputObjectSchema } from './ProductUpdateWithoutAddonsInput.schema';
import { ProductUncheckedUpdateWithoutAddonsInputObjectSchema as ProductUncheckedUpdateWithoutAddonsInputObjectSchema } from './ProductUncheckedUpdateWithoutAddonsInput.schema';
import { ProductCreateWithoutAddonsInputObjectSchema as ProductCreateWithoutAddonsInputObjectSchema } from './ProductCreateWithoutAddonsInput.schema';
import { ProductUncheckedCreateWithoutAddonsInputObjectSchema as ProductUncheckedCreateWithoutAddonsInputObjectSchema } from './ProductUncheckedCreateWithoutAddonsInput.schema';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ProductUpdateWithoutAddonsInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutAddonsInputObjectSchema)]),
  create: z.union([z.lazy(() => ProductCreateWithoutAddonsInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutAddonsInputObjectSchema)]),
  where: z.lazy(() => ProductWhereInputObjectSchema).optional()
}).strict();
export const ProductUpsertWithoutAddonsInputObjectSchema: z.ZodType<Prisma.ProductUpsertWithoutAddonsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpsertWithoutAddonsInput>;
export const ProductUpsertWithoutAddonsInputObjectZodSchema = makeSchema();
