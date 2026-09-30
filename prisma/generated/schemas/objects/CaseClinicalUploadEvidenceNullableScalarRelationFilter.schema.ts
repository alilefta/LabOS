import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceWhereInputObjectSchema as CaseClinicalUploadEvidenceWhereInputObjectSchema } from './CaseClinicalUploadEvidenceWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => CaseClinicalUploadEvidenceWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => CaseClinicalUploadEvidenceWhereInputObjectSchema).optional().nullable()
}).strict();
export const CaseClinicalUploadEvidenceNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceNullableScalarRelationFilter>;
export const CaseClinicalUploadEvidenceNullableScalarRelationFilterObjectZodSchema = makeSchema();
