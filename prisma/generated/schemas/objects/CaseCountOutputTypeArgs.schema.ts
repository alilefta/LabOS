import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCountOutputTypeSelectObjectSchema as CaseCountOutputTypeSelectObjectSchema } from './CaseCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CaseCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const CaseCountOutputTypeArgsObjectSchema = makeSchema();
export const CaseCountOutputTypeArgsObjectZodSchema = makeSchema();
