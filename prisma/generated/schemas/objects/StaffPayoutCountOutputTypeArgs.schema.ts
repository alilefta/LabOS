import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffPayoutCountOutputTypeSelectObjectSchema as StaffPayoutCountOutputTypeSelectObjectSchema } from './StaffPayoutCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => StaffPayoutCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const StaffPayoutCountOutputTypeArgsObjectSchema = makeSchema();
export const StaffPayoutCountOutputTypeArgsObjectZodSchema = makeSchema();
