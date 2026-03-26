import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileCreateManyDentalCaseInputObjectSchema as CaseAssetFileCreateManyDentalCaseInputObjectSchema } from './CaseAssetFileCreateManyDentalCaseInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseAssetFileCreateManyDentalCaseInputObjectSchema), z.lazy(() => CaseAssetFileCreateManyDentalCaseInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseAssetFileCreateManyDentalCaseInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseAssetFileCreateManyDentalCaseInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileCreateManyDentalCaseInputEnvelope>;
export const CaseAssetFileCreateManyDentalCaseInputEnvelopeObjectZodSchema = makeSchema();
