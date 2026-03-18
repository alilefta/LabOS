import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductCreateWithoutCaseWorkItemsInputObjectSchema as ProductCreateWithoutCaseWorkItemsInputObjectSchema } from './ProductCreateWithoutCaseWorkItemsInput.schema';
import { ProductUncheckedCreateWithoutCaseWorkItemsInputObjectSchema as ProductUncheckedCreateWithoutCaseWorkItemsInputObjectSchema } from './ProductUncheckedCreateWithoutCaseWorkItemsInput.schema';
import { ProductCreateOrConnectWithoutCaseWorkItemsInputObjectSchema as ProductCreateOrConnectWithoutCaseWorkItemsInputObjectSchema } from './ProductCreateOrConnectWithoutCaseWorkItemsInput.schema';
import { ProductUpsertWithoutCaseWorkItemsInputObjectSchema as ProductUpsertWithoutCaseWorkItemsInputObjectSchema } from './ProductUpsertWithoutCaseWorkItemsInput.schema';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductUpdateToOneWithWhereWithoutCaseWorkItemsInputObjectSchema as ProductUpdateToOneWithWhereWithoutCaseWorkItemsInputObjectSchema } from './ProductUpdateToOneWithWhereWithoutCaseWorkItemsInput.schema';
import { ProductUpdateWithoutCaseWorkItemsInputObjectSchema as ProductUpdateWithoutCaseWorkItemsInputObjectSchema } from './ProductUpdateWithoutCaseWorkItemsInput.schema';
import { ProductUncheckedUpdateWithoutCaseWorkItemsInputObjectSchema as ProductUncheckedUpdateWithoutCaseWorkItemsInputObjectSchema } from './ProductUncheckedUpdateWithoutCaseWorkItemsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutCaseWorkItemsInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutCaseWorkItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutCaseWorkItemsInputObjectSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutCaseWorkItemsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => ProductWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => ProductWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ProductUpdateToOneWithWhereWithoutCaseWorkItemsInputObjectSchema), z.lazy(() => ProductUpdateWithoutCaseWorkItemsInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutCaseWorkItemsInputObjectSchema)]).optional()
}).strict();
export const ProductUpdateOneWithoutCaseWorkItemsNestedInputObjectSchema: z.ZodType<Prisma.ProductUpdateOneWithoutCaseWorkItemsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateOneWithoutCaseWorkItemsNestedInput>;
export const ProductUpdateOneWithoutCaseWorkItemsNestedInputObjectZodSchema = makeSchema();
