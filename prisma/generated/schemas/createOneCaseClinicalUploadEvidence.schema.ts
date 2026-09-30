import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseClinicalUploadEvidenceSelectObjectSchema as CaseClinicalUploadEvidenceSelectObjectSchema } from './objects/CaseClinicalUploadEvidenceSelect.schema';
import { CaseClinicalUploadEvidenceIncludeObjectSchema as CaseClinicalUploadEvidenceIncludeObjectSchema } from './objects/CaseClinicalUploadEvidenceInclude.schema';
import { CaseClinicalUploadEvidenceCreateInputObjectSchema as CaseClinicalUploadEvidenceCreateInputObjectSchema } from './objects/CaseClinicalUploadEvidenceCreateInput.schema';
import { CaseClinicalUploadEvidenceUncheckedCreateInputObjectSchema as CaseClinicalUploadEvidenceUncheckedCreateInputObjectSchema } from './objects/CaseClinicalUploadEvidenceUncheckedCreateInput.schema';

export const CaseClinicalUploadEvidenceCreateOneSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateArgs> = z.object({ select: CaseClinicalUploadEvidenceSelectObjectSchema.optional(), include: CaseClinicalUploadEvidenceIncludeObjectSchema.optional(), data: z.union([CaseClinicalUploadEvidenceCreateInputObjectSchema, CaseClinicalUploadEvidenceUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateArgs>;

export const CaseClinicalUploadEvidenceCreateOneZodSchema = z.object({ select: CaseClinicalUploadEvidenceSelectObjectSchema.optional(), include: CaseClinicalUploadEvidenceIncludeObjectSchema.optional(), data: z.union([CaseClinicalUploadEvidenceCreateInputObjectSchema, CaseClinicalUploadEvidenceUncheckedCreateInputObjectSchema]) }).strict();