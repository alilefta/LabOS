import * as z from 'zod';
import { CaseStatusSchema } from '../../enums/CaseStatus.schema';
// prettier-ignore
export const CaseModelSchema = z.object({
    id: z.string(),
    patientId: z.string(),
    patient: z.unknown(),
    labId: z.string(),
    lab: z.unknown(),
    salesRepsId: z.string().nullable(),
    salesReps: z.unknown().nullable(),
    caseItems: z.array(z.unknown()),
    caseCategoryId: z.string().nullable(),
    caseCategory: z.unknown().nullable(),
    status: CaseStatusSchema,
    grandTotal: z.number().nullable(),
    clinicId: z.string().nullable(),
    clinic: z.unknown().nullable(),
    technicianId: z.string().nullable(),
    Technician: z.unknown().nullable(),
    caseAssetFiles: z.array(z.unknown()),
    deadline: z.date(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CasePureType = z.infer<typeof CaseModelSchema>;
