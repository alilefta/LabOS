import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseClinicalUploadEvidenceUpdateManyMutationInputObjectSchema as CaseClinicalUploadEvidenceUpdateManyMutationInputObjectSchema } from './objects/CaseClinicalUploadEvidenceUpdateManyMutationInput.schema';
import { CaseClinicalUploadEvidenceWhereInputObjectSchema as CaseClinicalUploadEvidenceWhereInputObjectSchema } from './objects/CaseClinicalUploadEvidenceWhereInput.schema';

export const CaseClinicalUploadEvidenceUpdateManySchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceUpdateManyArgs> = z.object({ data: CaseClinicalUploadEvidenceUpdateManyMutationInputObjectSchema, where: CaseClinicalUploadEvidenceWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceUpdateManyArgs>;

export const CaseClinicalUploadEvidenceUpdateManyZodSchema = z.object({ data: CaseClinicalUploadEvidenceUpdateManyMutationInputObjectSchema, where: CaseClinicalUploadEvidenceWhereInputObjectSchema.optional() }).strict();