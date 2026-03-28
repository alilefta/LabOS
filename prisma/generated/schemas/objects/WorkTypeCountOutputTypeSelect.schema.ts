import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeCountOutputTypeCountProductArgsObjectSchema as WorkTypeCountOutputTypeCountProductArgsObjectSchema } from './WorkTypeCountOutputTypeCountProductArgs.schema';
import { WorkTypeCountOutputTypeCountCaseWorkItemsArgsObjectSchema as WorkTypeCountOutputTypeCountCaseWorkItemsArgsObjectSchema } from './WorkTypeCountOutputTypeCountCaseWorkItemsArgs.schema'

const makeSchema = () => z.object({
  product: z.union([z.boolean(), z.lazy(() => WorkTypeCountOutputTypeCountProductArgsObjectSchema)]).optional(),
  caseWorkItems: z.union([z.boolean(), z.lazy(() => WorkTypeCountOutputTypeCountCaseWorkItemsArgsObjectSchema)]).optional()
}).strict();
export const WorkTypeCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.WorkTypeCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeCountOutputTypeSelect>;
export const WorkTypeCountOutputTypeSelectObjectZodSchema = makeSchema();
