import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductUpdateWithoutLabInputObjectSchema as ProductUpdateWithoutLabInputObjectSchema } from './ProductUpdateWithoutLabInput.schema';
import { ProductUncheckedUpdateWithoutLabInputObjectSchema as ProductUncheckedUpdateWithoutLabInputObjectSchema } from './ProductUncheckedUpdateWithoutLabInput.schema';
import { ProductCreateWithoutLabInputObjectSchema as ProductCreateWithoutLabInputObjectSchema } from './ProductCreateWithoutLabInput.schema';
import { ProductUncheckedCreateWithoutLabInputObjectSchema as ProductUncheckedCreateWithoutLabInputObjectSchema } from './ProductUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ProductUpdateWithoutLabInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => ProductCreateWithoutLabInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const ProductUpsertWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.ProductUpsertWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpsertWithWhereUniqueWithoutLabInput>;
export const ProductUpsertWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
