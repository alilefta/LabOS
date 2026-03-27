import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemFindManySchema as CaseWorkItemFindManySchema } from '../findManyCaseWorkItem.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { WorkTypeArgsObjectSchema as WorkTypeArgsObjectSchema } from './WorkTypeArgs.schema';
import { CasePricingPlanFindManySchema as CasePricingPlanFindManySchema } from '../findManyCasePricingPlan.schema';
import { ProductCountOutputTypeArgsObjectSchema as ProductCountOutputTypeArgsObjectSchema } from './ProductCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  caseWorkItems: z.union([z.boolean(), z.lazy(() => CaseWorkItemFindManySchema)]).optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  workType: z.union([z.boolean(), z.lazy(() => WorkTypeArgsObjectSchema)]).optional(),
  casePricingPlans: z.union([z.boolean(), z.lazy(() => CasePricingPlanFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ProductCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ProductIncludeObjectSchema: z.ZodType<Prisma.ProductInclude> = makeSchema() as unknown as z.ZodType<Prisma.ProductInclude>;
export const ProductIncludeObjectZodSchema = makeSchema();
