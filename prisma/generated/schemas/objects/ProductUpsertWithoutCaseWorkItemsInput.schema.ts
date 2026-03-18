import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductUpdateWithoutCaseWorkItemsInputObjectSchema as ProductUpdateWithoutCaseWorkItemsInputObjectSchema } from './ProductUpdateWithoutCaseWorkItemsInput.schema';
import { ProductUncheckedUpdateWithoutCaseWorkItemsInputObjectSchema as ProductUncheckedUpdateWithoutCaseWorkItemsInputObjectSchema } from './ProductUncheckedUpdateWithoutCaseWorkItemsInput.schema';
import { ProductCreateWithoutCaseWorkItemsInputObjectSchema as ProductCreateWithoutCaseWorkItemsInputObjectSchema } from './ProductCreateWithoutCaseWorkItemsInput.schema';
import { ProductUncheckedCreateWithoutCaseWorkItemsInputObjectSchema as ProductUncheckedCreateWithoutCaseWorkItemsInputObjectSchema } from './ProductUncheckedCreateWithoutCaseWorkItemsInput.schema';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ProductUpdateWithoutCaseWorkItemsInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutCaseWorkItemsInputObjectSchema)]),
  create: z.union([z.lazy(() => ProductCreateWithoutCaseWorkItemsInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutCaseWorkItemsInputObjectSchema)]),
  where: z.lazy(() => ProductWhereInputObjectSchema).optional()
}).strict();
export const ProductUpsertWithoutCaseWorkItemsInputObjectSchema: z.ZodType<Prisma.ProductUpsertWithoutCaseWorkItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpsertWithoutCaseWorkItemsInput>;
export const ProductUpsertWithoutCaseWorkItemsInputObjectZodSchema = makeSchema();
