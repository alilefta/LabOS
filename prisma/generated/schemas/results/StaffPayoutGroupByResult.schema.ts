import * as z from 'zod';
export const StaffPayoutGroupByResultSchema = z.array(z.object({
  id: z.string(),
  payoutNumber: z.string(),
  labId: z.string(),
  staffId: z.string(),
  amount: z.number(),
  reference: z.string(),
  notes: z.string(),
  paidAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    payoutNumber: z.number(),
    labId: z.number(),
    lab: z.number(),
    staffId: z.number(),
    staff: z.number(),
    amount: z.number(),
    method: z.number(),
    status: z.number(),
    reference: z.number(),
    notes: z.number(),
    caseAssignments: z.number(),
    paidAt: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    amount: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    amount: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    payoutNumber: z.string().nullable(),
    labId: z.string().nullable(),
    staffId: z.string().nullable(),
    amount: z.number().nullable(),
    reference: z.string().nullable(),
    notes: z.string().nullable(),
    paidAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    payoutNumber: z.string().nullable(),
    labId: z.string().nullable(),
    staffId: z.string().nullable(),
    amount: z.number().nullable(),
    reference: z.string().nullable(),
    notes: z.string().nullable(),
    paidAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));