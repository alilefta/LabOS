import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileWhereInputObjectSchema as CaseAssetFileWhereInputObjectSchema } from './CaseAssetFileWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => CaseAssetFileWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => CaseAssetFileWhereInputObjectSchema).optional().nullable()
}).strict();
export const CaseAssetFileNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.CaseAssetFileNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileNullableScalarRelationFilter>;
export const CaseAssetFileNullableScalarRelationFilterObjectZodSchema = makeSchema();
