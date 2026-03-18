import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanCreateManyLabInputObjectSchema as CasePricingPlanCreateManyLabInputObjectSchema } from './CasePricingPlanCreateManyLabInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CasePricingPlanCreateManyLabInputObjectSchema), z.lazy(() => CasePricingPlanCreateManyLabInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CasePricingPlanCreateManyLabInputEnvelopeObjectSchema: z.ZodType<Prisma.CasePricingPlanCreateManyLabInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanCreateManyLabInputEnvelope>;
export const CasePricingPlanCreateManyLabInputEnvelopeObjectZodSchema = makeSchema();
