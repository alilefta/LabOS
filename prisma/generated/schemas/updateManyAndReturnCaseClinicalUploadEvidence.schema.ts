import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseClinicalUploadEvidenceSelectObjectSchema as CaseClinicalUploadEvidenceSelectObjectSchema } from './objects/CaseClinicalUploadEvidenceSelect.schema';
import { CaseClinicalUploadEvidenceUpdateManyMutationInputObjectSchema as CaseClinicalUploadEvidenceUpdateManyMutationInputObjectSchema } from './objects/CaseClinicalUploadEvidenceUpdateManyMutationInput.schema';
import { CaseClinicalUploadEvidenceWhereInputObjectSchema as CaseClinicalUploadEvidenceWhereInputObjectSchema } from './objects/CaseClinicalUploadEvidenceWhereInput.schema';

export const CaseClinicalUploadEvidenceUpdateManyAndReturnSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceUpdateManyAndReturnArgs> = z.object({ select: CaseClinicalUploadEvidenceSelectObjectSchema.optional(), data: CaseClinicalUploadEvidenceUpdateManyMutationInputObjectSchema, where: CaseClinicalUploadEvidenceWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceUpdateManyAndReturnArgs>;

export const CaseClinicalUploadEvidenceUpdateManyAndReturnZodSchema = z.object({ select: CaseClinicalUploadEvidenceSelectObjectSchema.optional(), data: CaseClinicalUploadEvidenceUpdateManyMutationInputObjectSchema, where: CaseClinicalUploadEvidenceWhereInputObjectSchema.optional() }).strict();