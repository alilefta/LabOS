import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseClinicalUploadEvidenceSelectObjectSchema as CaseClinicalUploadEvidenceSelectObjectSchema } from './objects/CaseClinicalUploadEvidenceSelect.schema';
import { CaseClinicalUploadEvidenceCreateManyInputObjectSchema as CaseClinicalUploadEvidenceCreateManyInputObjectSchema } from './objects/CaseClinicalUploadEvidenceCreateManyInput.schema';

export const CaseClinicalUploadEvidenceCreateManyAndReturnSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateManyAndReturnArgs> = z.object({ select: CaseClinicalUploadEvidenceSelectObjectSchema.optional(), data: z.union([ CaseClinicalUploadEvidenceCreateManyInputObjectSchema, z.array(CaseClinicalUploadEvidenceCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateManyAndReturnArgs>;

export const CaseClinicalUploadEvidenceCreateManyAndReturnZodSchema = z.object({ select: CaseClinicalUploadEvidenceSelectObjectSchema.optional(), data: z.union([ CaseClinicalUploadEvidenceCreateManyInputObjectSchema, z.array(CaseClinicalUploadEvidenceCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();