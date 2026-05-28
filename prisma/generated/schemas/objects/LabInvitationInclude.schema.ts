import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { LabStaffArgsObjectSchema as LabStaffArgsObjectSchema } from './LabStaffArgs.schema'

const makeSchema = () => z.object({
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  labStaff: z.union([z.boolean(), z.lazy(() => LabStaffArgsObjectSchema)]).optional()
}).strict();
export const LabInvitationIncludeObjectSchema: z.ZodType<Prisma.LabInvitationInclude> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationInclude>;
export const LabInvitationIncludeObjectZodSchema = makeSchema();
