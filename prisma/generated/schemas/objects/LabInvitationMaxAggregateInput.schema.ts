import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  token: z.literal(true).optional(),
  email: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  labStaffId: z.literal(true).optional(),
  roleToGrant: z.literal(true).optional(),
  expiresAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const LabInvitationMaxAggregateInputObjectSchema: z.ZodType<Prisma.LabInvitationMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationMaxAggregateInputType>;
export const LabInvitationMaxAggregateInputObjectZodSchema = makeSchema();
