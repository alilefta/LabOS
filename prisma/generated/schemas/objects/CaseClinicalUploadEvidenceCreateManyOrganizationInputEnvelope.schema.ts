import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceCreateManyOrganizationInputObjectSchema as CaseClinicalUploadEvidenceCreateManyOrganizationInputObjectSchema } from './CaseClinicalUploadEvidenceCreateManyOrganizationInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseClinicalUploadEvidenceCreateManyOrganizationInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceCreateManyOrganizationInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseClinicalUploadEvidenceCreateManyOrganizationInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateManyOrganizationInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateManyOrganizationInputEnvelope>;
export const CaseClinicalUploadEvidenceCreateManyOrganizationInputEnvelopeObjectZodSchema = makeSchema();
