import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { AuthUserArgsObjectSchema as AuthUserArgsObjectSchema } from './AuthUserArgs.schema';
import { LabStaffArgsObjectSchema as LabStaffArgsObjectSchema } from './LabStaffArgs.schema';
import { CaseActivityLogFindManySchema as CaseActivityLogFindManySchema } from '../findManyCaseActivityLog.schema';
import { LabUserCountOutputTypeArgsObjectSchema as LabUserCountOutputTypeArgsObjectSchema } from './LabUserCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  labId: z.boolean().optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  authUserId: z.boolean().optional(),
  authUser: z.union([z.boolean(), z.lazy(() => AuthUserArgsObjectSchema)]).optional(),
  labStaffId: z.boolean().optional(),
  labStaff: z.union([z.boolean(), z.lazy(() => LabStaffArgsObjectSchema)]).optional(),
  role: z.boolean().optional(),
  isActive: z.boolean().optional(),
  lastTimeActive: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  activityLogs: z.union([z.boolean(), z.lazy(() => CaseActivityLogFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => LabUserCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const LabUserSelectObjectSchema: z.ZodType<Prisma.LabUserSelect> = makeSchema() as unknown as z.ZodType<Prisma.LabUserSelect>;
export const LabUserSelectObjectZodSchema = makeSchema();
