import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateManyCasePricingPlanInputObjectSchema as CaseWorkItemCreateManyCasePricingPlanInputObjectSchema } from './CaseWorkItemCreateManyCasePricingPlanInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseWorkItemCreateManyCasePricingPlanInputObjectSchema), z.lazy(() => CaseWorkItemCreateManyCasePricingPlanInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseWorkItemCreateManyCasePricingPlanInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseWorkItemCreateManyCasePricingPlanInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemCreateManyCasePricingPlanInputEnvelope>;
export const CaseWorkItemCreateManyCasePricingPlanInputEnvelopeObjectZodSchema = makeSchema();
