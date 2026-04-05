import * as z from 'zod';
export const CaseStaffAssignmentGroupByResultSchema = z.array(z.object({
  id: z.string(),
  caseId: z.string(),
  staffId: z.string(),
  labId: z.string(),
  commissionValue: z.number(),
  commissionTotal: z.number(),
  isPaid: z.boolean(),
  paidAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    caseId: z.number(),
    case: z.number(),
    staffId: z.number(),
    staff: z.number(),
    labId: z.number(),
    lab: z.number(),
    roleCategory: z.number(),
    commissionType: z.number(),
    commissionValue: z.number(),
    commissionTotal: z.number(),
    isPaid: z.number(),
    paidAt: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    commissionValue: z.number().nullable(),
    commissionTotal: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    commissionValue: z.number().nullable(),
    commissionTotal: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    caseId: z.string().nullable(),
    staffId: z.string().nullable(),
    labId: z.string().nullable(),
    commissionValue: z.number().nullable(),
    commissionTotal: z.number().nullable(),
    paidAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    caseId: z.string().nullable(),
    staffId: z.string().nullable(),
    labId: z.string().nullable(),
    commissionValue: z.number().nullable(),
    commissionTotal: z.number().nullable(),
    paidAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));