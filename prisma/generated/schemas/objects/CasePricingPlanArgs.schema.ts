import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanSelectObjectSchema as CasePricingPlanSelectObjectSchema } from './CasePricingPlanSelect.schema';
import { CasePricingPlanIncludeObjectSchema as CasePricingPlanIncludeObjectSchema } from './CasePricingPlanInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CasePricingPlanSelectObjectSchema).optional(),
  include: z.lazy(() => CasePricingPlanIncludeObjectSchema).optional()
}).strict();
export const CasePricingPlanArgsObjectSchema = makeSchema();
export const CasePricingPlanArgsObjectZodSchema = makeSchema();
