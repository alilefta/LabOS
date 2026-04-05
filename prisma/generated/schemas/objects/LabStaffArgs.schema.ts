import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffSelectObjectSchema as LabStaffSelectObjectSchema } from './LabStaffSelect.schema';
import { LabStaffIncludeObjectSchema as LabStaffIncludeObjectSchema } from './LabStaffInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => LabStaffSelectObjectSchema).optional(),
  include: z.lazy(() => LabStaffIncludeObjectSchema).optional()
}).strict();
export const LabStaffArgsObjectSchema = makeSchema();
export const LabStaffArgsObjectZodSchema = makeSchema();
