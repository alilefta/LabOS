import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserSelectObjectSchema as LabUserSelectObjectSchema } from './LabUserSelect.schema';
import { LabUserIncludeObjectSchema as LabUserIncludeObjectSchema } from './LabUserInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => LabUserSelectObjectSchema).optional(),
  include: z.lazy(() => LabUserIncludeObjectSchema).optional()
}).strict();
export const LabUserArgsObjectSchema = makeSchema();
export const LabUserArgsObjectZodSchema = makeSchema();
