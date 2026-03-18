import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductScalarWhereInputObjectSchema as ProductScalarWhereInputObjectSchema } from './ProductScalarWhereInput.schema';
import { ProductUpdateManyMutationInputObjectSchema as ProductUpdateManyMutationInputObjectSchema } from './ProductUpdateManyMutationInput.schema';
import { ProductUncheckedUpdateManyWithoutLabInputObjectSchema as ProductUncheckedUpdateManyWithoutLabInputObjectSchema } from './ProductUncheckedUpdateManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ProductUpdateManyMutationInputObjectSchema), z.lazy(() => ProductUncheckedUpdateManyWithoutLabInputObjectSchema)])
}).strict();
export const ProductUpdateManyWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.ProductUpdateManyWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateManyWithWhereWithoutLabInput>;
export const ProductUpdateManyWithWhereWithoutLabInputObjectZodSchema = makeSchema();
