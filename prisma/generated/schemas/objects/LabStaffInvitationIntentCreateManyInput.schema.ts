import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  invitationId: z.string(),
  labId: z.string(),
  labStaffId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const LabStaffInvitationIntentCreateManyInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentCreateManyInput>;
export const LabStaffInvitationIntentCreateManyInputObjectZodSchema = makeSchema();
