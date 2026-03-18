import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseSelectObjectSchema as CaseSelectObjectSchema } from './CaseSelect.schema';
import { CaseIncludeObjectSchema as CaseIncludeObjectSchema } from './CaseInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CaseSelectObjectSchema).optional(),
  include: z.lazy(() => CaseIncludeObjectSchema).optional()
}).strict();
export const CaseArgsObjectSchema = makeSchema();
export const CaseArgsObjectZodSchema = makeSchema();
