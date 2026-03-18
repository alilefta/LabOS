import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileWhereInputObjectSchema as CaseAssetFileWhereInputObjectSchema } from './CaseAssetFileWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => CaseAssetFileWhereInputObjectSchema).optional(),
  some: z.lazy(() => CaseAssetFileWhereInputObjectSchema).optional(),
  none: z.lazy(() => CaseAssetFileWhereInputObjectSchema).optional()
}).strict();
export const CaseAssetFileListRelationFilterObjectSchema: z.ZodType<Prisma.CaseAssetFileListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileListRelationFilter>;
export const CaseAssetFileListRelationFilterObjectZodSchema = makeSchema();
