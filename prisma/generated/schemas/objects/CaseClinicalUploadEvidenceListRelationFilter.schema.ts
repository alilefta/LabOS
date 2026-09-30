import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceWhereInputObjectSchema as CaseClinicalUploadEvidenceWhereInputObjectSchema } from './CaseClinicalUploadEvidenceWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => CaseClinicalUploadEvidenceWhereInputObjectSchema).optional(),
  some: z.lazy(() => CaseClinicalUploadEvidenceWhereInputObjectSchema).optional(),
  none: z.lazy(() => CaseClinicalUploadEvidenceWhereInputObjectSchema).optional()
}).strict();
export const CaseClinicalUploadEvidenceListRelationFilterObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceListRelationFilter>;
export const CaseClinicalUploadEvidenceListRelationFilterObjectZodSchema = makeSchema();
