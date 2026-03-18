import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema'

const makeSchema = () => z.object({
  Lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional()
}).strict();
export const LabSubscriptionPlanIncludeObjectSchema: z.ZodType<Prisma.LabSubscriptionPlanInclude> = makeSchema() as unknown as z.ZodType<Prisma.LabSubscriptionPlanInclude>;
export const LabSubscriptionPlanIncludeObjectZodSchema = makeSchema();
