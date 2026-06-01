import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffPayoutSelectObjectSchema as StaffPayoutSelectObjectSchema } from './StaffPayoutSelect.schema';
import { StaffPayoutIncludeObjectSchema as StaffPayoutIncludeObjectSchema } from './StaffPayoutInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => StaffPayoutSelectObjectSchema).optional(),
  include: z.lazy(() => StaffPayoutIncludeObjectSchema).optional()
}).strict();
export const StaffPayoutArgsObjectSchema = makeSchema();
export const StaffPayoutArgsObjectZodSchema = makeSchema();
