import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductCountOutputTypeCountCaseWorkItemsArgsObjectSchema as ProductCountOutputTypeCountCaseWorkItemsArgsObjectSchema } from './ProductCountOutputTypeCountCaseWorkItemsArgs.schema';
import { ProductCountOutputTypeCountCasePricingPlansArgsObjectSchema as ProductCountOutputTypeCountCasePricingPlansArgsObjectSchema } from './ProductCountOutputTypeCountCasePricingPlansArgs.schema'

const makeSchema = () => z.object({
  caseWorkItems: z.union([z.boolean(), z.lazy(() => ProductCountOutputTypeCountCaseWorkItemsArgsObjectSchema)]).optional(),
  casePricingPlans: z.union([z.boolean(), z.lazy(() => ProductCountOutputTypeCountCasePricingPlansArgsObjectSchema)]).optional()
}).strict();
export const ProductCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ProductCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ProductCountOutputTypeSelect>;
export const ProductCountOutputTypeSelectObjectZodSchema = makeSchema();
