import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionSelectObjectSchema as CaseAssetFileVersionSelectObjectSchema } from './CaseAssetFileVersionSelect.schema';
import { CaseAssetFileVersionIncludeObjectSchema as CaseAssetFileVersionIncludeObjectSchema } from './CaseAssetFileVersionInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CaseAssetFileVersionSelectObjectSchema).optional(),
  include: z.lazy(() => CaseAssetFileVersionIncludeObjectSchema).optional()
}).strict();
export const CaseAssetFileVersionArgsObjectSchema = makeSchema();
export const CaseAssetFileVersionArgsObjectZodSchema = makeSchema();
