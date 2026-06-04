import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemAddonSelectObjectSchema as CaseWorkItemAddonSelectObjectSchema } from './CaseWorkItemAddonSelect.schema';
import { CaseWorkItemAddonIncludeObjectSchema as CaseWorkItemAddonIncludeObjectSchema } from './CaseWorkItemAddonInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CaseWorkItemAddonSelectObjectSchema).optional(),
  include: z.lazy(() => CaseWorkItemAddonIncludeObjectSchema).optional()
}).strict();
export const CaseWorkItemAddonArgsObjectSchema = makeSchema();
export const CaseWorkItemAddonArgsObjectZodSchema = makeSchema();
