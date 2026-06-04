import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductAddonWhereUniqueInputObjectSchema as ProductAddonWhereUniqueInputObjectSchema } from './ProductAddonWhereUniqueInput.schema';
import { ProductAddonCreateWithoutCaseWorkItemAddonsInputObjectSchema as ProductAddonCreateWithoutCaseWorkItemAddonsInputObjectSchema } from './ProductAddonCreateWithoutCaseWorkItemAddonsInput.schema';
import { ProductAddonUncheckedCreateWithoutCaseWorkItemAddonsInputObjectSchema as ProductAddonUncheckedCreateWithoutCaseWorkItemAddonsInputObjectSchema } from './ProductAddonUncheckedCreateWithoutCaseWorkItemAddonsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductAddonWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProductAddonCreateWithoutCaseWorkItemAddonsInputObjectSchema), z.lazy(() => ProductAddonUncheckedCreateWithoutCaseWorkItemAddonsInputObjectSchema)])
}).strict();
export const ProductAddonCreateOrConnectWithoutCaseWorkItemAddonsInputObjectSchema: z.ZodType<Prisma.ProductAddonCreateOrConnectWithoutCaseWorkItemAddonsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonCreateOrConnectWithoutCaseWorkItemAddonsInput>;
export const ProductAddonCreateOrConnectWithoutCaseWorkItemAddonsInputObjectZodSchema = makeSchema();
