import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseClinicalUploadEvidenceCreateManyInputObjectSchema as CaseClinicalUploadEvidenceCreateManyInputObjectSchema } from './objects/CaseClinicalUploadEvidenceCreateManyInput.schema';

export const CaseClinicalUploadEvidenceCreateManySchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateManyArgs> = z.object({ data: z.union([ CaseClinicalUploadEvidenceCreateManyInputObjectSchema, z.array(CaseClinicalUploadEvidenceCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateManyArgs>;

export const CaseClinicalUploadEvidenceCreateManyZodSchema = z.object({ data: z.union([ CaseClinicalUploadEvidenceCreateManyInputObjectSchema, z.array(CaseClinicalUploadEvidenceCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();