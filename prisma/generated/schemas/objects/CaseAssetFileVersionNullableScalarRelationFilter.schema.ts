import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionWhereInputObjectSchema as CaseAssetFileVersionWhereInputObjectSchema } from './CaseAssetFileVersionWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => CaseAssetFileVersionWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => CaseAssetFileVersionWhereInputObjectSchema).optional().nullable()
}).strict();
export const CaseAssetFileVersionNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionNullableScalarRelationFilter>;
export const CaseAssetFileVersionNullableScalarRelationFilterObjectZodSchema = makeSchema();
