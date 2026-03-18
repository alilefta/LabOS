import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductCreateWithoutCaseWorkItemsInputObjectSchema as ProductCreateWithoutCaseWorkItemsInputObjectSchema } from './ProductCreateWithoutCaseWorkItemsInput.schema';
import { ProductUncheckedCreateWithoutCaseWorkItemsInputObjectSchema as ProductUncheckedCreateWithoutCaseWorkItemsInputObjectSchema } from './ProductUncheckedCreateWithoutCaseWorkItemsInput.schema';
import { ProductCreateOrConnectWithoutCaseWorkItemsInputObjectSchema as ProductCreateOrConnectWithoutCaseWorkItemsInputObjectSchema } from './ProductCreateOrConnectWithoutCaseWorkItemsInput.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutCaseWorkItemsInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutCaseWorkItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutCaseWorkItemsInputObjectSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputObjectSchema).optional()
}).strict();
export const ProductCreateNestedOneWithoutCaseWorkItemsInputObjectSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutCaseWorkItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateNestedOneWithoutCaseWorkItemsInput>;
export const ProductCreateNestedOneWithoutCaseWorkItemsInputObjectZodSchema = makeSchema();
