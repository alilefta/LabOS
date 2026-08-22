import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  organizationId: z.literal(true).optional(),
  email: z.literal(true).optional(),
  role: z.literal(true).optional(),
  status: z.literal(true).optional(),
  expiresAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  inviterId: z.literal(true).optional()
}).strict();
export const InvitationMaxAggregateInputObjectSchema: z.ZodType<Prisma.InvitationMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.InvitationMaxAggregateInputType>;
export const InvitationMaxAggregateInputObjectZodSchema = makeSchema();
