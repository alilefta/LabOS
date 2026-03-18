import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileSelectObjectSchema as CaseAssetFileSelectObjectSchema } from './CaseAssetFileSelect.schema';
import { CaseAssetFileIncludeObjectSchema as CaseAssetFileIncludeObjectSchema } from './CaseAssetFileInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CaseAssetFileSelectObjectSchema).optional(),
  include: z.lazy(() => CaseAssetFileIncludeObjectSchema).optional()
}).strict();
export const CaseAssetFileArgsObjectSchema = makeSchema();
export const CaseAssetFileArgsObjectZodSchema = makeSchema();
