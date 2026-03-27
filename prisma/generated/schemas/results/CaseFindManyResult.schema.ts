import * as z from 'zod';
export const CaseFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  patientId: z.string(),
  patient: z.unknown(),
  caseNumber: z.string(),
  labId: z.string(),
  lab: z.unknown(),
  salesRepsId: z.string().optional(),
  salesReps: z.unknown().optional(),
  caseItems: z.array(z.unknown()),
  caseCategoryId: z.string().optional(),
  caseCategory: z.unknown().optional(),
  status: z.unknown(),
  grandTotal: z.number(),
  clinicId: z.string().optional(),
  clinic: z.unknown().optional(),
  dentistId: z.string().optional(),
  dentist: z.unknown().optional(),
  technicianId: z.string().optional(),
  Technician: z.unknown().optional(),
  caseAssetFiles: z.array(z.unknown()),
  deadline: z.date(),
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