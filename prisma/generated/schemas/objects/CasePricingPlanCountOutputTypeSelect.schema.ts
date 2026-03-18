import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanCountOutputTypeCountCaseWorkItemArgsObjectSchema as CasePricingPlanCountOutputTypeCountCaseWorkItemArgsObjectSchema } from './CasePricingPlanCountOutputTypeCountCaseWorkItemArgs.schema'

const makeSchema = () => z.object({
  caseWorkItem: z.union([z.boolean(), z.lazy(() => CasePricingPlanCountOutputTypeCountCaseWorkItemArgsObjectSchema)]).optional()
}).strict();
export const CasePricingPlanCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.CasePricingPlanCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanCountOutputTypeSelect>;
export const CasePricingPlanCountOutputTypeSelectObjectZodSchema = makeSchema();
