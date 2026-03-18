import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema';
import { ProductUpdateWithoutCaseWorkItemsInputObjectSchema as ProductUpdateWithoutCaseWorkItemsInputObjectSchema } from './ProductUpdateWithoutCaseWorkItemsInput.schema';
import { ProductUncheckedUpdateWithoutCaseWorkItemsInputObjectSchema as ProductUncheckedUpdateWithoutCaseWorkItemsInputObjectSchema } from './ProductUncheckedUpdateWithoutCaseWorkItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ProductUpdateWithoutCaseWorkItemsInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutCaseWorkItemsInputObjectSchema)])
}).strict();
export const ProductUpdateToOneWithWhereWithoutCaseWorkItemsInputObjectSchema: z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutCaseWorkItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutCaseWorkItemsInput>;
export const ProductUpdateToOneWithWhereWithoutCaseWorkItemsInputObjectZodSchema = makeSchema();
