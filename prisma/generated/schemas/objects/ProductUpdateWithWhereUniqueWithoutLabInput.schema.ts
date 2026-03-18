import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductUpdateWithoutLabInputObjectSchema as ProductUpdateWithoutLabInputObjectSchema } from './ProductUpdateWithoutLabInput.schema';
import { ProductUncheckedUpdateWithoutLabInputObjectSchema as ProductUncheckedUpdateWithoutLabInputObjectSchema } from './ProductUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ProductUpdateWithoutLabInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const ProductUpdateWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.ProductUpdateWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateWithWhereUniqueWithoutLabInput>;
export const ProductUpdateWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
