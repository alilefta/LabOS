import * as z from 'zod';
import { CaseStatusSchema } from '../../enums/CaseStatus.schema';
// prettier-ignore
export const CaseInputSchema = z.object({
    id: z.string(),
    patientId: z.string(),
    patient: z.unknown(),
    caseNumber: z.string(),
    labId: z.string(),
    lab: z.unknown(),
    salesRepsId: z.string().optional().nullable(),
    salesReps: z.unknown().optional().nullable(),
    caseItems: z.array(z.unknown()),
    caseCategoryId: z.string().optional().nullable(),
    caseCategory: z.unknown().optional().nullable(),
    status: CaseStatusSchema,
    grandTotal: z.number(),
    clinicId: z.string().optional().nullable(),
    clinic: z.unknown().optional().nullable(),
    dentistId: z.string().optional().nullable(),
    dentist: z.unknown().optional().nullable(),
    technicianId: z.string().optional().nullable(),
    Technician: z.unknown().optional().nullable(),
    caseAssetFiles: z.array(z.unknown()),
    deadline: z.date(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CaseInputType = z.infer<typeof CaseInputSchema>;
