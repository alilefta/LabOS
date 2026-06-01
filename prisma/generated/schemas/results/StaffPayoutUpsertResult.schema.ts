import * as z from 'zod';
export const StaffPayoutUpsertResultSchema = z.object({
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
});