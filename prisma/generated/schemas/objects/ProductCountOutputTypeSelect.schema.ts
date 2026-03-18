import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductCountOutputTypeCountCaseWorkItemsArgsObjectSchema as ProductCountOutputTypeCountCaseWorkItemsArgsObjectSchema } from './ProductCountOutputTypeCountCaseWorkItemsArgs.schema'

const makeSchema = () => z.object({
  caseWorkItems: z.union([z.boolean(), z.lazy(() => ProductCountOutputTypeCountCaseWorkItemsArgsObjectSchema)]).optional()
}).strict();
export const ProductCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ProductCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ProductCountOutputTypeSelect>;
export const ProductCountOutputTypeSelectObjectZodSchema = makeSchema();
