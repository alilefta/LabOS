import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductAddonCreateWithoutCaseWorkItemAddonsInputObjectSchema as ProductAddonCreateWithoutCaseWorkItemAddonsInputObjectSchema } from './ProductAddonCreateWithoutCaseWorkItemAddonsInput.schema';
import { ProductAddonUncheckedCreateWithoutCaseWorkItemAddonsInputObjectSchema as ProductAddonUncheckedCreateWithoutCaseWorkItemAddonsInputObjectSchema } from './ProductAddonUncheckedCreateWithoutCaseWorkItemAddonsInput.schema';
import { ProductAddonCreateOrConnectWithoutCaseWorkItemAddonsInputObjectSchema as ProductAddonCreateOrConnectWithoutCaseWorkItemAddonsInputObjectSchema } from './ProductAddonCreateOrConnectWithoutCaseWorkItemAddonsInput.schema';
import { ProductAddonUpsertWithoutCaseWorkItemAddonsInputObjectSchema as ProductAddonUpsertWithoutCaseWorkItemAddonsInputObjectSchema } from './ProductAddonUpsertWithoutCaseWorkItemAddonsInput.schema';
import { ProductAddonWhereUniqueInputObjectSchema as ProductAddonWhereUniqueInputObjectSchema } from './ProductAddonWhereUniqueInput.schema';
import { ProductAddonUpdateToOneWithWhereWithoutCaseWorkItemAddonsInputObjectSchema as ProductAddonUpdateToOneWithWhereWithoutCaseWorkItemAddonsInputObjectSchema } from './ProductAddonUpdateToOneWithWhereWithoutCaseWorkItemAddonsInput.schema';
import { ProductAddonUpdateWithoutCaseWorkItemAddonsInputObjectSchema as ProductAddonUpdateWithoutCaseWorkItemAddonsInputObjectSchema } from './ProductAddonUpdateWithoutCaseWorkItemAddonsInput.schema';
import { ProductAddonUncheckedUpdateWithoutCaseWorkItemAddonsInputObjectSchema as ProductAddonUncheckedUpdateWithoutCaseWorkItemAddonsInputObjectSchema } from './ProductAddonUncheckedUpdateWithoutCaseWorkItemAddonsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductAddonCreateWithoutCaseWorkItemAddonsInputObjectSchema), z.lazy(() => ProductAddonUncheckedCreateWithoutCaseWorkItemAddonsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductAddonCreateOrConnectWithoutCaseWorkItemAddonsInputObjectSchema).optional(),
  upsert: z.lazy(() => ProductAddonUpsertWithoutCaseWorkItemAddonsInputObjectSchema).optional(),
  connect: z.lazy(() => ProductAddonWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ProductAddonUpdateToOneWithWhereWithoutCaseWorkItemAddonsInputObjectSchema), z.lazy(() => ProductAddonUpdateWithoutCaseWorkItemAddonsInputObjectSchema), z.lazy(() => ProductAddonUncheckedUpdateWithoutCaseWorkItemAddonsInputObjectSchema)]).optional()
}).strict();
export const ProductAddonUpdateOneRequiredWithoutCaseWorkItemAddonsNestedInputObjectSchema: z.ZodType<Prisma.ProductAddonUpdateOneRequiredWithoutCaseWorkItemAddonsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonUpdateOneRequiredWithoutCaseWorkItemAddonsNestedInput>;
export const ProductAddonUpdateOneRequiredWithoutCaseWorkItemAddonsNestedInputObjectZodSchema = makeSchema();
