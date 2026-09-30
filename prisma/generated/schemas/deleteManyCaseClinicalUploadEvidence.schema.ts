import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseClinicalUploadEvidenceWhereInputObjectSchema as CaseClinicalUploadEvidenceWhereInputObjectSchema } from './objects/CaseClinicalUploadEvidenceWhereInput.schema';

export const CaseClinicalUploadEvidenceDeleteManySchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceDeleteManyArgs> = z.object({ where: CaseClinicalUploadEvidenceWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceDeleteManyArgs>;

export const CaseClinicalUploadEvidenceDeleteManyZodSchema = z.object({ where: CaseClinicalUploadEvidenceWhereInputObjectSchema.optional() }).strict();