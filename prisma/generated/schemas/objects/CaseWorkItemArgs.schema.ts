import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemSelectObjectSchema as CaseWorkItemSelectObjectSchema } from './CaseWorkItemSelect.schema';
import { CaseWorkItemIncludeObjectSchema as CaseWorkItemIncludeObjectSchema } from './CaseWorkItemInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CaseWorkItemSelectObjectSchema).optional(),
  include: z.lazy(() => CaseWorkItemIncludeObjectSchema).optional()
}).strict();
export const CaseWorkItemArgsObjectSchema = makeSchema();
export const CaseWorkItemArgsObjectZodSchema = makeSchema();
