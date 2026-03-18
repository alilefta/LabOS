import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryCountOutputTypeSelectObjectSchema as CaseCategoryCountOutputTypeSelectObjectSchema } from './CaseCategoryCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CaseCategoryCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const CaseCategoryCountOutputTypeArgsObjectSchema = makeSchema();
export const CaseCategoryCountOutputTypeArgsObjectZodSchema = makeSchema();
