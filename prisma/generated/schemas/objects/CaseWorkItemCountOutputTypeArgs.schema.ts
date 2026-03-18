import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCountOutputTypeSelectObjectSchema as CaseWorkItemCountOutputTypeSelectObjectSchema } from './CaseWorkItemCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CaseWorkItemCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const CaseWorkItemCountOutputTypeArgsObjectSchema = makeSchema();
export const CaseWorkItemCountOutputTypeArgsObjectZodSchema = makeSchema();
