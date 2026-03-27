import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductCreateWithoutCasePricingPlansInputObjectSchema as ProductCreateWithoutCasePricingPlansInputObjectSchema } from './ProductCreateWithoutCasePricingPlansInput.schema';
import { ProductUncheckedCreateWithoutCasePricingPlansInputObjectSchema as ProductUncheckedCreateWithoutCasePricingPlansInputObjectSchema } from './ProductUncheckedCreateWithoutCasePricingPlansInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProductCreateWithoutCasePricingPlansInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutCasePricingPlansInputObjectSchema)])
}).strict();
export const ProductCreateOrConnectWithoutCasePricingPlansInputObjectSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutCasePricingPlansInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateOrConnectWithoutCasePricingPlansInput>;
export const ProductCreateOrConnectWithoutCasePricingPlansInputObjectZodSchema = makeSchema();
