import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseClinicalUploadEvidenceSelectObjectSchema as CaseClinicalUploadEvidenceSelectObjectSchema } from './objects/CaseClinicalUploadEvidenceSelect.schema';
import { CaseClinicalUploadEvidenceIncludeObjectSchema as CaseClinicalUploadEvidenceIncludeObjectSchema } from './objects/CaseClinicalUploadEvidenceInclude.schema';
import { CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema as CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema } from './objects/CaseClinicalUploadEvidenceWhereUniqueInput.schema';

export const CaseClinicalUploadEvidenceFindUniqueOrThrowSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceFindUniqueOrThrowArgs> = z.object({ select: CaseClinicalUploadEvidenceSelectObjectSchema.optional(), include: CaseClinicalUploadEvidenceIncludeObjectSchema.optional(), where: CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceFindUniqueOrThrowArgs>;

export const CaseClinicalUploadEvidenceFindUniqueOrThrowZodSchema = z.object({ select: CaseClinicalUploadEvidenceSelectObjectSchema.optional(), include: CaseClinicalUploadEvidenceIncludeObjectSchema.optional(), where: CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema }).strict();