import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductScalarWhereInputObjectSchema as ProductScalarWhereInputObjectSchema } from './ProductScalarWhereInput.schema';
import { ProductUpdateManyMutationInputObjectSchema as ProductUpdateManyMutationInputObjectSchema } from './ProductUpdateManyMutationInput.schema';
import { ProductUncheckedUpdateManyWithoutWorkTypeInputObjectSchema as ProductUncheckedUpdateManyWithoutWorkTypeInputObjectSchema } from './ProductUncheckedUpdateManyWithoutWorkTypeInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ProductUpdateManyMutationInputObjectSchema), z.lazy(() => ProductUncheckedUpdateManyWithoutWorkTypeInputObjectSchema)])
}).strict();
export const ProductUpdateManyWithWhereWithoutWorkTypeInputObjectSchema: z.ZodType<Prisma.ProductUpdateManyWithWhereWithoutWorkTypeInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateManyWithWhereWithoutWorkTypeInput>;
export const ProductUpdateManyWithWhereWithoutWorkTypeInputObjectZodSchema = makeSchema();
