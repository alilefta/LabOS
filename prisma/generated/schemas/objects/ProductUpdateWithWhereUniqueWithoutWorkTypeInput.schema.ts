import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductUpdateWithoutWorkTypeInputObjectSchema as ProductUpdateWithoutWorkTypeInputObjectSchema } from './ProductUpdateWithoutWorkTypeInput.schema';
import { ProductUncheckedUpdateWithoutWorkTypeInputObjectSchema as ProductUncheckedUpdateWithoutWorkTypeInputObjectSchema } from './ProductUncheckedUpdateWithoutWorkTypeInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ProductUpdateWithoutWorkTypeInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutWorkTypeInputObjectSchema)])
}).strict();
export const ProductUpdateWithWhereUniqueWithoutWorkTypeInputObjectSchema: z.ZodType<Prisma.ProductUpdateWithWhereUniqueWithoutWorkTypeInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateWithWhereUniqueWithoutWorkTypeInput>;
export const ProductUpdateWithWhereUniqueWithoutWorkTypeInputObjectZodSchema = makeSchema();
