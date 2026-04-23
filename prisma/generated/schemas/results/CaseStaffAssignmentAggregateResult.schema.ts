import * as z from 'zod';
export const CaseStaffAssignmentAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    caseId: z.number(),
    dentalCase: z.number(),
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
  }).nullable().optional()});