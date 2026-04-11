import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductArgsObjectSchema as ProductArgsObjectSchema } from './ProductArgs.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { CaseArgsObjectSchema as CaseArgsObjectSchema } from './CaseArgs.schema';
import { CasePricingPlanArgsObjectSchema as CasePricingPlanArgsObjectSchema } from './CasePricingPlanArgs.schema';
import { WorkTypeArgsObjectSchema as WorkTypeArgsObjectSchema } from './WorkTypeArgs.schema';
import { SelectedToothFindManySchema as SelectedToothFindManySchema } from '../findManySelectedTooth.schema';
import { CaseWorkItemCountOutputTypeArgsObjectSchema as CaseWorkItemCountOutputTypeArgsObjectSchema } from './CaseWorkItemCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  productId: z.boolean().optional(),
  product: z.union([z.boolean(), z.lazy(() => ProductArgsObjectSchema)]).optional(),
  labId: z.boolean().optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  dentalCaseId: z.boolean().optional(),
  dentalCase: z.union([z.boolean(), z.lazy(() => CaseArgsObjectSchema)]).optional(),
  casePricingPlanId: z.boolean().optional(),
  casePricingPlan: z.union([z.boolean(), z.lazy(() => CasePricingPlanArgsObjectSchema)]).optional(),
  totalPrice: z.boolean().optional(),
  pricingStrategy: z.boolean().optional(),
  firstToothPrice: z.boolean().optional(),
  additionalToothPrice: z.boolean().optional(),
  teethCountToApplyBulkPrice: z.boolean().optional(),
  bulkPrice: z.boolean().optional(),
  toothPrice: z.boolean().optional(),
  jawType: z.boolean().optional(),
  workTypeId: z.boolean().optional(),
  workType: z.union([z.boolean(), z.lazy(() => WorkTypeArgsObjectSchema)]).optional(),
  notes: z.boolean().optional(),
  shadeSystem: z.boolean().optional(),
  baseShade: z.boolean().optional(),
  stumpShade: z.boolean().optional(),
  shadeNotes: z.boolean().optional(),
  selectedTeeth: z.union([z.boolean(), z.lazy(() => SelectedToothFindManySchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => CaseWorkItemCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CaseWorkItemSelectObjectSchema: z.ZodType<Prisma.CaseWorkItemSelect> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemSelect>;
export const CaseWorkItemSelectObjectZodSchema = makeSchema();
