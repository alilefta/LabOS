import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { CaseWorkItemFindManySchema as CaseWorkItemFindManySchema } from '../findManyCaseWorkItem.schema';
import { CasePricingPlanCountOutputTypeArgsObjectSchema as CasePricingPlanCountOutputTypeArgsObjectSchema } from './CasePricingPlanCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  labId: z.boolean().optional(),
  Lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  pricingStrategy: z.boolean().optional(),
  firstToothPrice: z.boolean().optional(),
  bulkPrice: z.boolean().optional(),
  additionalToothPrice: z.boolean().optional(),
  bulkPriceThreshold: z.boolean().optional(),
  caseWorkItem: z.union([z.boolean(), z.lazy(() => CaseWorkItemFindManySchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => CasePricingPlanCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CasePricingPlanSelectObjectSchema: z.ZodType<Prisma.CasePricingPlanSelect> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanSelect>;
export const CasePricingPlanSelectObjectZodSchema = makeSchema();
