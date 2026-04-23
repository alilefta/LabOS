import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { LabUserArgsObjectSchema as LabUserArgsObjectSchema } from './LabUserArgs.schema';
import { CaseStaffAssignmentFindManySchema as CaseStaffAssignmentFindManySchema } from '../findManyCaseStaffAssignment.schema';
import { LabStaffCountOutputTypeArgsObjectSchema as LabStaffCountOutputTypeArgsObjectSchema } from './LabStaffCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  labId: z.boolean().optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  firstName: z.boolean().optional(),
  lastName: z.boolean().optional(),
  phoneNumber: z.boolean().optional(),
  avatarUrl: z.boolean().optional(),
  isActive: z.boolean().optional(),
  city: z.boolean().optional(),
  address1: z.boolean().optional(),
  address2: z.boolean().optional(),
  zipcode: z.boolean().optional(),
  roleCategory: z.boolean().optional(),
  jobTitle: z.boolean().optional(),
  specialization: z.boolean().optional(),
  commissionType: z.boolean().optional(),
  commissionValue: z.boolean().optional(),
  labUser: z.union([z.boolean(), z.lazy(() => LabUserArgsObjectSchema)]).optional(),
  caseAssignments: z.union([z.boolean(), z.lazy(() => CaseStaffAssignmentFindManySchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => LabStaffCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const LabStaffSelectObjectSchema: z.ZodType<Prisma.LabStaffSelect> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffSelect>;
export const LabStaffSelectObjectZodSchema = makeSchema();
