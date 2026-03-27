import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductUpdateWithoutCasePricingPlansInputObjectSchema as ProductUpdateWithoutCasePricingPlansInputObjectSchema } from './ProductUpdateWithoutCasePricingPlansInput.schema';
import { ProductUncheckedUpdateWithoutCasePricingPlansInputObjectSchema as ProductUncheckedUpdateWithoutCasePricingPlansInputObjectSchema } from './ProductUncheckedUpdateWithoutCasePricingPlansInput.schema';
import { ProductCreateWithoutCasePricingPlansInputObjectSchema as ProductCreateWithoutCasePricingPlansInputObjectSchema } from './ProductCreateWithoutCasePricingPlansInput.schema';
import { ProductUncheckedCreateWithoutCasePricingPlansInputObjectSchema as ProductUncheckedCreateWithoutCasePricingPlansInputObjectSchema } from './ProductUncheckedCreateWithoutCasePricingPlansInput.schema';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ProductUpdateWithoutCasePricingPlansInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutCasePricingPlansInputObjectSchema)]),
  create: z.union([z.lazy(() => ProductCreateWithoutCasePricingPlansInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutCasePricingPlansInputObjectSchema)]),
  where: z.lazy(() => ProductWhereInputObjectSchema).optional()
}).strict();
export const ProductUpsertWithoutCasePricingPlansInputObjectSchema: z.ZodType<Prisma.ProductUpsertWithoutCasePricingPlansInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpsertWithoutCasePricingPlansInput>;
export const ProductUpsertWithoutCasePricingPlansInputObjectZodSchema = makeSchema();
