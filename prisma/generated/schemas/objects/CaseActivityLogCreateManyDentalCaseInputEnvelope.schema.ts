import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogCreateManyDentalCaseInputObjectSchema as CaseActivityLogCreateManyDentalCaseInputObjectSchema } from './CaseActivityLogCreateManyDentalCaseInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseActivityLogCreateManyDentalCaseInputObjectSchema), z.lazy(() => CaseActivityLogCreateManyDentalCaseInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseActivityLogCreateManyDentalCaseInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseActivityLogCreateManyDentalCaseInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogCreateManyDentalCaseInputEnvelope>;
export const CaseActivityLogCreateManyDentalCaseInputEnvelopeObjectZodSchema = makeSchema();
