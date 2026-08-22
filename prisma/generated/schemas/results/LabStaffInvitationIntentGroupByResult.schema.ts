import * as z from 'zod';
export const LabStaffInvitationIntentGroupByResultSchema = z.array(z.object({
  id: z.string(),
  invitationId: z.string(),
  labId: z.string(),
  labStaffId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    invitationId: z.number(),
    invitation: z.number(),
    labId: z.number(),
    labStaffId: z.number(),
    labStaff: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    invitationId: z.string().nullable(),
    labId: z.string().nullable(),
    labStaffId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    invitationId: z.string().nullable(),
    labId: z.string().nullable(),
    labStaffId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));