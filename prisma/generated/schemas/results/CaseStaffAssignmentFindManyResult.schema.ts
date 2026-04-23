import * as z from 'zod';
export const CaseStaffAssignmentFindManyResultSchema = z.object({
  data: z.array(z.object({
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