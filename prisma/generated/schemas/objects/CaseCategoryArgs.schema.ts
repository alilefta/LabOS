import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategorySelectObjectSchema as CaseCategorySelectObjectSchema } from './CaseCategorySelect.schema';
import { CaseCategoryIncludeObjectSchema as CaseCategoryIncludeObjectSchema } from './CaseCategoryInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CaseCategorySelectObjectSchema).optional(),
  include: z.lazy(() => CaseCategoryIncludeObjectSchema).optional()
}).strict();
export const CaseCategoryArgsObjectSchema = makeSchema();
export const CaseCategoryArgsObjectZodSchema = makeSchema();
