import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionWhereInputObjectSchema as CaseAssetFileVersionWhereInputObjectSchema } from './CaseAssetFileVersionWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => CaseAssetFileVersionWhereInputObjectSchema).optional(),
  some: z.lazy(() => CaseAssetFileVersionWhereInputObjectSchema).optional(),
  none: z.lazy(() => CaseAssetFileVersionWhereInputObjectSchema).optional()
}).strict();
export const CaseAssetFileVersionListRelationFilterObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionListRelationFilter>;
export const CaseAssetFileVersionListRelationFilterObjectZodSchema = makeSchema();
