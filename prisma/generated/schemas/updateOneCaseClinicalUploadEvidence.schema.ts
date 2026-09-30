import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseClinicalUploadEvidenceSelectObjectSchema as CaseClinicalUploadEvidenceSelectObjectSchema } from './objects/CaseClinicalUploadEvidenceSelect.schema';
import { CaseClinicalUploadEvidenceIncludeObjectSchema as CaseClinicalUploadEvidenceIncludeObjectSchema } from './objects/CaseClinicalUploadEvidenceInclude.schema';
import { CaseClinicalUploadEvidenceUpdateInputObjectSchema as CaseClinicalUploadEvidenceUpdateInputObjectSchema } from './objects/CaseClinicalUploadEvidenceUpdateInput.schema';
import { CaseClinicalUploadEvidenceUncheckedUpdateInputObjectSchema as CaseClinicalUploadEvidenceUncheckedUpdateInputObjectSchema } from './objects/CaseClinicalUploadEvidenceUncheckedUpdateInput.schema';
import { CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema as CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema } from './objects/CaseClinicalUploadEvidenceWhereUniqueInput.schema';

export const CaseClinicalUploadEvidenceUpdateOneSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceUpdateArgs> = z.object({ select: CaseClinicalUploadEvidenceSelectObjectSchema.optional(), include: CaseClinicalUploadEvidenceIncludeObjectSchema.optional(), data: z.union([CaseClinicalUploadEvidenceUpdateInputObjectSchema, CaseClinicalUploadEvidenceUncheckedUpdateInputObjectSchema]), where: CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceUpdateArgs>;

export const CaseClinicalUploadEvidenceUpdateOneZodSchema = z.object({ select: CaseClinicalUploadEvidenceSelectObjectSchema.optional(), include: CaseClinicalUploadEvidenceIncludeObjectSchema.optional(), data: z.union([CaseClinicalUploadEvidenceUpdateInputObjectSchema, CaseClinicalUploadEvidenceUncheckedUpdateInputObjectSchema]), where: CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema }).strict();