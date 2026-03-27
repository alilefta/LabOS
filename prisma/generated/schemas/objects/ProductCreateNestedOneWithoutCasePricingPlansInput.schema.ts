import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductCreateWithoutCasePricingPlansInputObjectSchema as ProductCreateWithoutCasePricingPlansInputObjectSchema } from './ProductCreateWithoutCasePricingPlansInput.schema';
import { ProductUncheckedCreateWithoutCasePricingPlansInputObjectSchema as ProductUncheckedCreateWithoutCasePricingPlansInputObjectSchema } from './ProductUncheckedCreateWithoutCasePricingPlansInput.schema';
import { ProductCreateOrConnectWithoutCasePricingPlansInputObjectSchema as ProductCreateOrConnectWithoutCasePricingPlansInputObjectSchema } from './ProductCreateOrConnectWithoutCasePricingPlansInput.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutCasePricingPlansInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutCasePricingPlansInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutCasePricingPlansInputObjectSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputObjectSchema).optional()
}).strict();
export const ProductCreateNestedOneWithoutCasePricingPlansInputObjectSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutCasePricingPlansInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateNestedOneWithoutCasePricingPlansInput>;
export const ProductCreateNestedOneWithoutCasePricingPlansInputObjectZodSchema = makeSchema();
