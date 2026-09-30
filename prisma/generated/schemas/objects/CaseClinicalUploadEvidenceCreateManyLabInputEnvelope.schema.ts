import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceCreateManyLabInputObjectSchema as CaseClinicalUploadEvidenceCreateManyLabInputObjectSchema } from './CaseClinicalUploadEvidenceCreateManyLabInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseClinicalUploadEvidenceCreateManyLabInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceCreateManyLabInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseClinicalUploadEvidenceCreateManyLabInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateManyLabInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateManyLabInputEnvelope>;
export const CaseClinicalUploadEvidenceCreateManyLabInputEnvelopeObjectZodSchema = makeSchema();
