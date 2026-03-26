import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateManyDentalCaseInputObjectSchema as CaseWorkItemCreateManyDentalCaseInputObjectSchema } from './CaseWorkItemCreateManyDentalCaseInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseWorkItemCreateManyDentalCaseInputObjectSchema), z.lazy(() => CaseWorkItemCreateManyDentalCaseInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseWorkItemCreateManyDentalCaseInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseWorkItemCreateManyDentalCaseInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemCreateManyDentalCaseInputEnvelope>;
export const CaseWorkItemCreateManyDentalCaseInputEnvelopeObjectZodSchema = makeSchema();
