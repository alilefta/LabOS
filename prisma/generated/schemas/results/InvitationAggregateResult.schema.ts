import * as z from 'zod';
export const InvitationAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    organizationId: z.number(),
    organization: z.number(),
    email: z.number(),
    role: z.number(),
    status: z.number(),
    expiresAt: z.number(),
    createdAt: z.number(),
    inviterId: z.number(),
    authuser: z.number(),
    labStaffIntent: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    organizationId: z.string().nullable(),
    email: z.string().nullable(),
    role: z.string().nullable(),
    status: z.string().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    inviterId: z.string().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    organizationId: z.string().nullable(),
    email: z.string().nullable(),
    role: z.string().nullable(),
    status: z.string().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    inviterId: z.string().nullable()
  }).nullable().optional()});