import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductCountOutputTypeCountCaseWorkItemsArgsObjectSchema as ProductCountOutputTypeCountCaseWorkItemsArgsObjectSchema } from './ProductCountOutputTypeCountCaseWorkItemsArgs.schema';
import { ProductCountOutputTypeCountCasePricingPlansArgsObjectSchema as ProductCountOutputTypeCountCasePricingPlansArgsObjectSchema } from './ProductCountOutputTypeCountCasePricingPlansArgs.schema';
import { ProductCountOutputTypeCountAddonsArgsObjectSchema as ProductCountOutputTypeCountAddonsArgsObjectSchema } from './ProductCountOutputTypeCountAddonsArgs.schema'

const makeSchema = () => z.object({
  caseWorkItems: z.union([z.boolean(), z.lazy(() => ProductCountOutputTypeCountCaseWorkItemsArgsObjectSchema)]).optional(),
  casePricingPlans: z.union([z.boolean(), z.lazy(() => ProductCountOutputTypeCountCasePricingPlansArgsObjectSchema)]).optional(),
  addons: z.union([z.boolean(), z.lazy(() => ProductCountOutputTypeCountAddonsArgsObjectSchema)]).optional()
}).strict();
export const ProductCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ProductCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ProductCountOutputTypeSelect>;
export const ProductCountOutputTypeSelectObjectZodSchema = makeSchema();
