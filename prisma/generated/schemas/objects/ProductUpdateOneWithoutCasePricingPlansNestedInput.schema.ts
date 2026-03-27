import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductCreateWithoutCasePricingPlansInputObjectSchema as ProductCreateWithoutCasePricingPlansInputObjectSchema } from './ProductCreateWithoutCasePricingPlansInput.schema';
import { ProductUncheckedCreateWithoutCasePricingPlansInputObjectSchema as ProductUncheckedCreateWithoutCasePricingPlansInputObjectSchema } from './ProductUncheckedCreateWithoutCasePricingPlansInput.schema';
import { ProductCreateOrConnectWithoutCasePricingPlansInputObjectSchema as ProductCreateOrConnectWithoutCasePricingPlansInputObjectSchema } from './ProductCreateOrConnectWithoutCasePricingPlansInput.schema';
import { ProductUpsertWithoutCasePricingPlansInputObjectSchema as ProductUpsertWithoutCasePricingPlansInputObjectSchema } from './ProductUpsertWithoutCasePricingPlansInput.schema';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductUpdateToOneWithWhereWithoutCasePricingPlansInputObjectSchema as ProductUpdateToOneWithWhereWithoutCasePricingPlansInputObjectSchema } from './ProductUpdateToOneWithWhereWithoutCasePricingPlansInput.schema';
import { ProductUpdateWithoutCasePricingPlansInputObjectSchema as ProductUpdateWithoutCasePricingPlansInputObjectSchema } from './ProductUpdateWithoutCasePricingPlansInput.schema';
import { ProductUncheckedUpdateWithoutCasePricingPlansInputObjectSchema as ProductUncheckedUpdateWithoutCasePricingPlansInputObjectSchema } from './ProductUncheckedUpdateWithoutCasePricingPlansInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutCasePricingPlansInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutCasePricingPlansInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutCasePricingPlansInputObjectSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutCasePricingPlansInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => ProductWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => ProductWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ProductUpdateToOneWithWhereWithoutCasePricingPlansInputObjectSchema), z.lazy(() => ProductUpdateWithoutCasePricingPlansInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutCasePricingPlansInputObjectSchema)]).optional()
}).strict();
export const ProductUpdateOneWithoutCasePricingPlansNestedInputObjectSchema: z.ZodType<Prisma.ProductUpdateOneWithoutCasePricingPlansNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateOneWithoutCasePricingPlansNestedInput>;
export const ProductUpdateOneWithoutCasePricingPlansNestedInputObjectZodSchema = makeSchema();
