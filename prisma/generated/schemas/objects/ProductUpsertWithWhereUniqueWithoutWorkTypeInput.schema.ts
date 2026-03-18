import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductUpdateWithoutWorkTypeInputObjectSchema as ProductUpdateWithoutWorkTypeInputObjectSchema } from './ProductUpdateWithoutWorkTypeInput.schema';
import { ProductUncheckedUpdateWithoutWorkTypeInputObjectSchema as ProductUncheckedUpdateWithoutWorkTypeInputObjectSchema } from './ProductUncheckedUpdateWithoutWorkTypeInput.schema';
import { ProductCreateWithoutWorkTypeInputObjectSchema as ProductCreateWithoutWorkTypeInputObjectSchema } from './ProductCreateWithoutWorkTypeInput.schema';
import { ProductUncheckedCreateWithoutWorkTypeInputObjectSchema as ProductUncheckedCreateWithoutWorkTypeInputObjectSchema } from './ProductUncheckedCreateWithoutWorkTypeInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ProductUpdateWithoutWorkTypeInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutWorkTypeInputObjectSchema)]),
  create: z.union([z.lazy(() => ProductCreateWithoutWorkTypeInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutWorkTypeInputObjectSchema)])
}).strict();
export const ProductUpsertWithWhereUniqueWithoutWorkTypeInputObjectSchema: z.ZodType<Prisma.ProductUpsertWithWhereUniqueWithoutWorkTypeInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpsertWithWhereUniqueWithoutWorkTypeInput>;
export const ProductUpsertWithWhereUniqueWithoutWorkTypeInputObjectZodSchema = makeSchema();
