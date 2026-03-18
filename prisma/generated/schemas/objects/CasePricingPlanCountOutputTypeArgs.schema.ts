import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanCountOutputTypeSelectObjectSchema as CasePricingPlanCountOutputTypeSelectObjectSchema } from './CasePricingPlanCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CasePricingPlanCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const CasePricingPlanCountOutputTypeArgsObjectSchema = makeSchema();
export const CasePricingPlanCountOutputTypeArgsObjectZodSchema = makeSchema();
