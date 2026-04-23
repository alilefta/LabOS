import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { LabUserArgsObjectSchema as LabUserArgsObjectSchema } from './LabUserArgs.schema';
import { CaseStaffAssignmentFindManySchema as CaseStaffAssignmentFindManySchema } from '../findManyCaseStaffAssignment.schema';
import { LabStaffCountOutputTypeArgsObjectSchema as LabStaffCountOutputTypeArgsObjectSchema } from './LabStaffCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  labUser: z.union([z.boolean(), z.lazy(() => LabUserArgsObjectSchema)]).optional(),
  caseAssignments: z.union([z.boolean(), z.lazy(() => CaseStaffAssignmentFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => LabStaffCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const LabStaffIncludeObjectSchema: z.ZodType<Prisma.LabStaffInclude> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInclude>;
export const LabStaffIncludeObjectZodSchema = makeSchema();
