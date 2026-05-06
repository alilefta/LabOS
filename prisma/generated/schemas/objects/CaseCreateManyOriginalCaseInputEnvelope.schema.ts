import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateManyOriginalCaseInputObjectSchema as CaseCreateManyOriginalCaseInputObjectSchema } from './CaseCreateManyOriginalCaseInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseCreateManyOriginalCaseInputObjectSchema), z.lazy(() => CaseCreateManyOriginalCaseInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseCreateManyOriginalCaseInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseCreateManyOriginalCaseInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateManyOriginalCaseInputEnvelope>;
export const CaseCreateManyOriginalCaseInputEnvelopeObjectZodSchema = makeSchema();
