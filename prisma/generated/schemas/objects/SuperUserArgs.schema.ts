import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SuperUserSelectObjectSchema as SuperUserSelectObjectSchema } from './SuperUserSelect.schema';
import { SuperUserIncludeObjectSchema as SuperUserIncludeObjectSchema } from './SuperUserInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => SuperUserSelectObjectSchema).optional(),
  include: z.lazy(() => SuperUserIncludeObjectSchema).optional()
}).strict();
export const SuperUserArgsObjectSchema = makeSchema();
export const SuperUserArgsObjectZodSchema = makeSchema();
