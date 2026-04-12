import * as z from 'zod';
import { CaseStatusSchema } from '../../enums/CaseStatus.schema';
// prettier-ignore
export const CaseResultSchema = z.object({
    id: z.string(),
    patientId: z.string(),
    patient: z.unknown(),
    caseNumber: z.string(),
    labId: z.string(),
    lab: z.unknown(),
    caseItems: z.array(z.unknown()),
    caseCategoryId: z.string().nullable(),
    caseCategory: z.unknown().nullable(),
    status: CaseStatusSchema,
    grandTotal: z.number().nullable(),
    clinicId: z.string().nullable(),
    clinic: z.unknown().nullable(),
    dentistId: z.string().nullable(),
    dentist: z.unknown().nullable(),
    notes: z.string().nullable(),
    staffAssignments: z.array(z.unknown()),
    caseAssetFiles: z.array(z.unknown()),
    deadline: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CaseResultType = z.infer<typeof CaseResultSchema>;
