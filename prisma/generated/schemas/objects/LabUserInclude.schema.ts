import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { AuthUserArgsObjectSchema as AuthUserArgsObjectSchema } from './AuthUserArgs.schema';
import { LabStaffArgsObjectSchema as LabStaffArgsObjectSchema } from './LabStaffArgs.schema';
import { CaseActivityLogFindManySchema as CaseActivityLogFindManySchema } from '../findManyCaseActivityLog.schema';
import { LabUserCountOutputTypeArgsObjectSchema as LabUserCountOutputTypeArgsObjectSchema } from './LabUserCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  authUser: z.union([z.boolean(), z.lazy(() => AuthUserArgsObjectSchema)]).optional(),
  labStaff: z.union([z.boolean(), z.lazy(() => LabStaffArgsObjectSchema)]).optional(),
  activityLogs: z.union([z.boolean(), z.lazy(() => CaseActivityLogFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => LabUserCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const LabUserIncludeObjectSchema: z.ZodType<Prisma.LabUserInclude> = makeSchema() as unknown as z.ZodType<Prisma.LabUserInclude>;
export const LabUserIncludeObjectZodSchema = makeSchema();
