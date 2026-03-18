import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabSubscriptionPlanSelectObjectSchema as LabSubscriptionPlanSelectObjectSchema } from './LabSubscriptionPlanSelect.schema';
import { LabSubscriptionPlanIncludeObjectSchema as LabSubscriptionPlanIncludeObjectSchema } from './LabSubscriptionPlanInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => LabSubscriptionPlanSelectObjectSchema).optional(),
  include: z.lazy(() => LabSubscriptionPlanIncludeObjectSchema).optional()
}).strict();
export const LabSubscriptionPlanArgsObjectSchema = makeSchema();
export const LabSubscriptionPlanArgsObjectZodSchema = makeSchema();
