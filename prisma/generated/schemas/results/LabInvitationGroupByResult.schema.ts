import * as z from 'zod';
export const LabInvitationGroupByResultSchema = z.array(z.object({
  id: z.string(),
  token: z.string(),
  email: z.string(),
  labId: z.string(),
  labStaffId: z.string(),
  expiresAt: z.date(),
  createdAt: z.date(),
  _count: z.object({
    id: z.number(),
    token: z.number(),
    email: z.number(),
    labId: z.number(),
    lab: z.number(),
    labStaffId: z.number(),
    labStaff: z.number(),
    roleToGrant: z.number(),
    expiresAt: z.number(),
    createdAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    token: z.string().nullable(),
    email: z.string().nullable(),
    labId: z.string().nullable(),
    labStaffId: z.string().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    token: z.string().nullable(),
    email: z.string().nullable(),
    labId: z.string().nullable(),
    labStaffId: z.string().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()
}));