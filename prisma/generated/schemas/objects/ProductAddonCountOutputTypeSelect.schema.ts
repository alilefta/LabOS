import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductAddonCountOutputTypeCountCaseWorkItemAddonsArgsObjectSchema as ProductAddonCountOutputTypeCountCaseWorkItemAddonsArgsObjectSchema } from './ProductAddonCountOutputTypeCountCaseWorkItemAddonsArgs.schema'

const makeSchema = () => z.object({
  caseWorkItemAddons: z.union([z.boolean(), z.lazy(() => ProductAddonCountOutputTypeCountCaseWorkItemAddonsArgsObjectSchema)]).optional()
}).strict();
export const ProductAddonCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ProductAddonCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonCountOutputTypeSelect>;
export const ProductAddonCountOutputTypeSelectObjectZodSchema = makeSchema();
