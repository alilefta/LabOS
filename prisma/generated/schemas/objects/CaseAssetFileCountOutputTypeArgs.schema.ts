import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileCountOutputTypeSelectObjectSchema as CaseAssetFileCountOutputTypeSelectObjectSchema } from './CaseAssetFileCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CaseAssetFileCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const CaseAssetFileCountOutputTypeArgsObjectSchema = makeSchema();
export const CaseAssetFileCountOutputTypeArgsObjectZodSchema = makeSchema();
