import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateManyPatientInputObjectSchema as CaseCreateManyPatientInputObjectSchema } from './CaseCreateManyPatientInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseCreateManyPatientInputObjectSchema), z.lazy(() => CaseCreateManyPatientInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseCreateManyPatientInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseCreateManyPatientInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateManyPatientInputEnvelope>;
export const CaseCreateManyPatientInputEnvelopeObjectZodSchema = makeSchema();
