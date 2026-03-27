import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema';
import { ProductUpdateWithoutCasePricingPlansInputObjectSchema as ProductUpdateWithoutCasePricingPlansInputObjectSchema } from './ProductUpdateWithoutCasePricingPlansInput.schema';
import { ProductUncheckedUpdateWithoutCasePricingPlansInputObjectSchema as ProductUncheckedUpdateWithoutCasePricingPlansInputObjectSchema } from './ProductUncheckedUpdateWithoutCasePricingPlansInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ProductUpdateWithoutCasePricingPlansInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutCasePricingPlansInputObjectSchema)])
}).strict();
export const ProductUpdateToOneWithWhereWithoutCasePricingPlansInputObjectSchema: z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutCasePricingPlansInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutCasePricingPlansInput>;
export const ProductUpdateToOneWithWhereWithoutCasePricingPlansInputObjectZodSchema = makeSchema();
