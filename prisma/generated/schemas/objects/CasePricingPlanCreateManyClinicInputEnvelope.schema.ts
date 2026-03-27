import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanCreateManyClinicInputObjectSchema as CasePricingPlanCreateManyClinicInputObjectSchema } from './CasePricingPlanCreateManyClinicInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CasePricingPlanCreateManyClinicInputObjectSchema), z.lazy(() => CasePricingPlanCreateManyClinicInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CasePricingPlanCreateManyClinicInputEnvelopeObjectSchema: z.ZodType<Prisma.CasePricingPlanCreateManyClinicInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanCreateManyClinicInputEnvelope>;
export const CasePricingPlanCreateManyClinicInputEnvelopeObjectZodSchema = makeSchema();
