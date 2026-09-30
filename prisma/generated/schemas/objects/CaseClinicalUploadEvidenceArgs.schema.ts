import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceSelectObjectSchema as CaseClinicalUploadEvidenceSelectObjectSchema } from './CaseClinicalUploadEvidenceSelect.schema';
import { CaseClinicalUploadEvidenceIncludeObjectSchema as CaseClinicalUploadEvidenceIncludeObjectSchema } from './CaseClinicalUploadEvidenceInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CaseClinicalUploadEvidenceSelectObjectSchema).optional(),
  include: z.lazy(() => CaseClinicalUploadEvidenceIncludeObjectSchema).optional()
}).strict();
export const CaseClinicalUploadEvidenceArgsObjectSchema = makeSchema();
export const CaseClinicalUploadEvidenceArgsObjectZodSchema = makeSchema();
