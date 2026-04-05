import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentSelectObjectSchema as CaseStaffAssignmentSelectObjectSchema } from './CaseStaffAssignmentSelect.schema';
import { CaseStaffAssignmentIncludeObjectSchema as CaseStaffAssignmentIncludeObjectSchema } from './CaseStaffAssignmentInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CaseStaffAssignmentSelectObjectSchema).optional(),
  include: z.lazy(() => CaseStaffAssignmentIncludeObjectSchema).optional()
}).strict();
export const CaseStaffAssignmentArgsObjectSchema = makeSchema();
export const CaseStaffAssignmentArgsObjectZodSchema = makeSchema();
