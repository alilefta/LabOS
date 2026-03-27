import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanCreateManyProductInputObjectSchema as CasePricingPlanCreateManyProductInputObjectSchema } from './CasePricingPlanCreateManyProductInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CasePricingPlanCreateManyProductInputObjectSchema), z.lazy(() => CasePricingPlanCreateManyProductInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CasePricingPlanCreateManyProductInputEnvelopeObjectSchema: z.ZodType<Prisma.CasePricingPlanCreateManyProductInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanCreateManyProductInputEnvelope>;
export const CasePricingPlanCreateManyProductInputEnvelopeObjectZodSchema = makeSchema();
