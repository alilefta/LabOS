import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductCreateWithoutCaseWorkItemsInputObjectSchema as ProductCreateWithoutCaseWorkItemsInputObjectSchema } from './ProductCreateWithoutCaseWorkItemsInput.schema';
import { ProductUncheckedCreateWithoutCaseWorkItemsInputObjectSchema as ProductUncheckedCreateWithoutCaseWorkItemsInputObjectSchema } from './ProductUncheckedCreateWithoutCaseWorkItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProductCreateWithoutCaseWorkItemsInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutCaseWorkItemsInputObjectSchema)])
}).strict();
export const ProductCreateOrConnectWithoutCaseWorkItemsInputObjectSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutCaseWorkItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateOrConnectWithoutCaseWorkItemsInput>;
export const ProductCreateOrConnectWithoutCaseWorkItemsInputObjectZodSchema = makeSchema();
