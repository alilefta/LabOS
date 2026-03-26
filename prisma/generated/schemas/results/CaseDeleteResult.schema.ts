import * as z from 'zod';
export const CaseDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  patientId: z.string(),
  patient: z.unknown(),
  labId: z.string(),
  lab: z.unknown(),
  salesRepsId: z.string().optional(),
  salesReps: z.unknown().optional(),
  caseItems: z.array(z.unknown()),
  caseCategoryId: z.string().optional(),
  caseCategory: z.unknown().optional(),
  status: z.unknown(),
  grandTotal: z.number().optional(),
  clinicId: z.string().optional(),
  clinic: z.unknown().optional(),
  technicianId: z.string().optional(),
  Technician: z.unknown().optional(),
  caseAssetFiles: z.array(z.unknown()),
  deadline: z.date(),
  createdAt: z.date(),
  updatedAt: z.date()
}));