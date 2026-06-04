import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductAddonCreateWithoutCaseWorkItemAddonsInputObjectSchema as ProductAddonCreateWithoutCaseWorkItemAddonsInputObjectSchema } from './ProductAddonCreateWithoutCaseWorkItemAddonsInput.schema';
import { ProductAddonUncheckedCreateWithoutCaseWorkItemAddonsInputObjectSchema as ProductAddonUncheckedCreateWithoutCaseWorkItemAddonsInputObjectSchema } from './ProductAddonUncheckedCreateWithoutCaseWorkItemAddonsInput.schema';
import { ProductAddonCreateOrConnectWithoutCaseWorkItemAddonsInputObjectSchema as ProductAddonCreateOrConnectWithoutCaseWorkItemAddonsInputObjectSchema } from './ProductAddonCreateOrConnectWithoutCaseWorkItemAddonsInput.schema';
import { ProductAddonWhereUniqueInputObjectSchema as ProductAddonWhereUniqueInputObjectSchema } from './ProductAddonWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductAddonCreateWithoutCaseWorkItemAddonsInputObjectSchema), z.lazy(() => ProductAddonUncheckedCreateWithoutCaseWorkItemAddonsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductAddonCreateOrConnectWithoutCaseWorkItemAddonsInputObjectSchema).optional(),
  connect: z.lazy(() => ProductAddonWhereUniqueInputObjectSchema).optional()
}).strict();
export const ProductAddonCreateNestedOneWithoutCaseWorkItemAddonsInputObjectSchema: z.ZodType<Prisma.ProductAddonCreateNestedOneWithoutCaseWorkItemAddonsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonCreateNestedOneWithoutCaseWorkItemAddonsInput>;
export const ProductAddonCreateNestedOneWithoutCaseWorkItemAddonsInputObjectZodSchema = makeSchema();
