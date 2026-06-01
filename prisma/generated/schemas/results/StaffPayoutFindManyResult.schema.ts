import * as z from 'zod';
export const StaffPayoutFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  payoutNumber: z.string(),
  labId: z.string(),
  lab: z.unknown(),
  staffId: z.string(),
  staff: z.unknown(),
  amount: z.number(),
  method: z.unknown(),
  status: z.unknown(),
  reference: z.string().optional(),
  notes: z.string().optional(),
  caseAssignments: z.array(z.unknown()),
  paidAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});