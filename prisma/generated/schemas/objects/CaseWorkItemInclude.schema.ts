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
  product: z.union([z.boolean(), z.lazy(() => ProductArgsObjectSchema)]).optional(),
  Lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  dentalCase: z.union([z.boolean(), z.lazy(() => CaseArgsObjectSchema)]).optional(),
  casePricingPlan: z.union([z.boolean(), z.lazy(() => CasePricingPlanArgsObjectSchema)]).optional(),
  workType: z.union([z.boolean(), z.lazy(() => WorkTypeArgsObjectSchema)]).optional(),
  selectedTeeth: z.union([z.boolean(), z.lazy(() => SelectedToothFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CaseWorkItemCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CaseWorkItemIncludeObjectSchema: z.ZodType<Prisma.CaseWorkItemInclude> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemInclude>;
export const CaseWorkItemIncludeObjectZodSchema = makeSchema();
