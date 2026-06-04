import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductAddonUpdateWithoutCaseWorkItemAddonsInputObjectSchema as ProductAddonUpdateWithoutCaseWorkItemAddonsInputObjectSchema } from './ProductAddonUpdateWithoutCaseWorkItemAddonsInput.schema';
import { ProductAddonUncheckedUpdateWithoutCaseWorkItemAddonsInputObjectSchema as ProductAddonUncheckedUpdateWithoutCaseWorkItemAddonsInputObjectSchema } from './ProductAddonUncheckedUpdateWithoutCaseWorkItemAddonsInput.schema';
import { ProductAddonCreateWithoutCaseWorkItemAddonsInputObjectSchema as ProductAddonCreateWithoutCaseWorkItemAddonsInputObjectSchema } from './ProductAddonCreateWithoutCaseWorkItemAddonsInput.schema';
import { ProductAddonUncheckedCreateWithoutCaseWorkItemAddonsInputObjectSchema as ProductAddonUncheckedCreateWithoutCaseWorkItemAddonsInputObjectSchema } from './ProductAddonUncheckedCreateWithoutCaseWorkItemAddonsInput.schema';
import { ProductAddonWhereInputObjectSchema as ProductAddonWhereInputObjectSchema } from './ProductAddonWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ProductAddonUpdateWithoutCaseWorkItemAddonsInputObjectSchema), z.lazy(() => ProductAddonUncheckedUpdateWithoutCaseWorkItemAddonsInputObjectSchema)]),
  create: z.union([z.lazy(() => ProductAddonCreateWithoutCaseWorkItemAddonsInputObjectSchema), z.lazy(() => ProductAddonUncheckedCreateWithoutCaseWorkItemAddonsInputObjectSchema)]),
  where: z.lazy(() => ProductAddonWhereInputObjectSchema).optional()
}).strict();
export const ProductAddonUpsertWithoutCaseWorkItemAddonsInputObjectSchema: z.ZodType<Prisma.ProductAddonUpsertWithoutCaseWorkItemAddonsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonUpsertWithoutCaseWorkItemAddonsInput>;
export const ProductAddonUpsertWithoutCaseWorkItemAddonsInputObjectZodSchema = makeSchema();
