import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeSelectObjectSchema as WorkTypeSelectObjectSchema } from './WorkTypeSelect.schema';
import { WorkTypeIncludeObjectSchema as WorkTypeIncludeObjectSchema } from './WorkTypeInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => WorkTypeSelectObjectSchema).optional(),
  include: z.lazy(() => WorkTypeIncludeObjectSchema).optional()
}).strict();
export const WorkTypeArgsObjectSchema = makeSchema();
export const WorkTypeArgsObjectZodSchema = makeSchema();
