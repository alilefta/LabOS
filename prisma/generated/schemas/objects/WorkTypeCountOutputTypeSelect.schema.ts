import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeCountOutputTypeCountProductsArgsObjectSchema as WorkTypeCountOutputTypeCountProductsArgsObjectSchema } from './WorkTypeCountOutputTypeCountProductsArgs.schema';
import { WorkTypeCountOutputTypeCountCaseWorkItemsArgsObjectSchema as WorkTypeCountOutputTypeCountCaseWorkItemsArgsObjectSchema } from './WorkTypeCountOutputTypeCountCaseWorkItemsArgs.schema'

const makeSchema = () => z.object({
  products: z.union([z.boolean(), z.lazy(() => WorkTypeCountOutputTypeCountProductsArgsObjectSchema)]).optional(),
  caseWorkItems: z.union([z.boolean(), z.lazy(() => WorkTypeCountOutputTypeCountCaseWorkItemsArgsObjectSchema)]).optional()
}).strict();
export const WorkTypeCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.WorkTypeCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeCountOutputTypeSelect>;
export const WorkTypeCountOutputTypeSelectObjectZodSchema = makeSchema();
