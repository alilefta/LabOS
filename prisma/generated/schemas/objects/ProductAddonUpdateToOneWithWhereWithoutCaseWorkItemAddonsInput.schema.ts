import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductAddonWhereInputObjectSchema as ProductAddonWhereInputObjectSchema } from './ProductAddonWhereInput.schema';
import { ProductAddonUpdateWithoutCaseWorkItemAddonsInputObjectSchema as ProductAddonUpdateWithoutCaseWorkItemAddonsInputObjectSchema } from './ProductAddonUpdateWithoutCaseWorkItemAddonsInput.schema';
import { ProductAddonUncheckedUpdateWithoutCaseWorkItemAddonsInputObjectSchema as ProductAddonUncheckedUpdateWithoutCaseWorkItemAddonsInputObjectSchema } from './ProductAddonUncheckedUpdateWithoutCaseWorkItemAddonsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductAddonWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ProductAddonUpdateWithoutCaseWorkItemAddonsInputObjectSchema), z.lazy(() => ProductAddonUncheckedUpdateWithoutCaseWorkItemAddonsInputObjectSchema)])
}).strict();
export const ProductAddonUpdateToOneWithWhereWithoutCaseWorkItemAddonsInputObjectSchema: z.ZodType<Prisma.ProductAddonUpdateToOneWithWhereWithoutCaseWorkItemAddonsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonUpdateToOneWithWhereWithoutCaseWorkItemAddonsInput>;
export const ProductAddonUpdateToOneWithWhereWithoutCaseWorkItemAddonsInputObjectZodSchema = makeSchema();
