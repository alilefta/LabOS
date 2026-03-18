import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { CaseWorkItemFindManySchema as CaseWorkItemFindManySchema } from '../findManyCaseWorkItem.schema';
import { CasePricingPlanCountOutputTypeArgsObjectSchema as CasePricingPlanCountOutputTypeArgsObjectSchema } from './CasePricingPlanCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  Lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  caseWorkItem: z.union([z.boolean(), z.lazy(() => CaseWorkItemFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CasePricingPlanCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CasePricingPlanIncludeObjectSchema: z.ZodType<Prisma.CasePricingPlanInclude> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanInclude>;
export const CasePricingPlanIncludeObjectZodSchema = makeSchema();
