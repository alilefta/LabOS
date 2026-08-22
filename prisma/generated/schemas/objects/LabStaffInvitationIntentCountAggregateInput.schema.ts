import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  invitationId: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  labStaffId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const LabStaffInvitationIntentCountAggregateInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentCountAggregateInputType>;
export const LabStaffInvitationIntentCountAggregateInputObjectZodSchema = makeSchema();
