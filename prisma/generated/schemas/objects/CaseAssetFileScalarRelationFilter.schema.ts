import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileWhereInputObjectSchema as CaseAssetFileWhereInputObjectSchema } from './CaseAssetFileWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => CaseAssetFileWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => CaseAssetFileWhereInputObjectSchema).optional()
}).strict();
export const CaseAssetFileScalarRelationFilterObjectSchema: z.ZodType<Prisma.CaseAssetFileScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileScalarRelationFilter>;
export const CaseAssetFileScalarRelationFilterObjectZodSchema = makeSchema();
