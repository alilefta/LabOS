import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogSelectObjectSchema as CaseActivityLogSelectObjectSchema } from './CaseActivityLogSelect.schema';
import { CaseActivityLogIncludeObjectSchema as CaseActivityLogIncludeObjectSchema } from './CaseActivityLogInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CaseActivityLogSelectObjectSchema).optional(),
  include: z.lazy(() => CaseActivityLogIncludeObjectSchema).optional()
}).strict();
export const CaseActivityLogArgsObjectSchema = makeSchema();
export const CaseActivityLogArgsObjectZodSchema = makeSchema();
