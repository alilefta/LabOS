import * as z from 'zod';
export const CaseStaffAssignmentUpsertResultSchema = z.object({
  id: z.string(),
  caseId: z.string(),
  dentalCase: z.unknown(),
  staffId: z.string(),
  staff: z.unknown(),
  labId: z.string(),
  lab: z.unknown(),
  roleCategory: z.unknown(),
  commissionType: z.unknown(),
  commissionValue: z.number(),
  commissionTotal: z.number(),
  isPaid: z.boolean(),
  paidAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});