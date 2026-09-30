import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceCreateManyDentalCaseInputObjectSchema as CaseClinicalUploadEvidenceCreateManyDentalCaseInputObjectSchema } from './CaseClinicalUploadEvidenceCreateManyDentalCaseInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseClinicalUploadEvidenceCreateManyDentalCaseInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceCreateManyDentalCaseInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseClinicalUploadEvidenceCreateManyDentalCaseInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateManyDentalCaseInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateManyDentalCaseInputEnvelope>;
export const CaseClinicalUploadEvidenceCreateManyDentalCaseInputEnvelopeObjectZodSchema = makeSchema();
