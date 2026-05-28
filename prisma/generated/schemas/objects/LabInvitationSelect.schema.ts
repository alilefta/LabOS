import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { LabStaffArgsObjectSchema as LabStaffArgsObjectSchema } from './LabStaffArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  token: z.boolean().optional(),
  email: z.boolean().optional(),
  labId: z.boolean().optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  labStaffId: z.boolean().optional(),
  labStaff: z.union([z.boolean(), z.lazy(() => LabStaffArgsObjectSchema)]).optional(),
  roleToGrant: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  createdAt: z.boolean().optional()
}).strict();
export const LabInvitationSelectObjectSchema: z.ZodType<Prisma.LabInvitationSelect> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationSelect>;
export const LabInvitationSelectObjectZodSchema = makeSchema();
