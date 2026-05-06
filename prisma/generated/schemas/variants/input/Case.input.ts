import * as z from 'zod';
import { CaseStatusSchema } from '../../enums/CaseStatus.schema';
import { FaultPartySchema } from '../../enums/FaultParty.schema';
// prettier-ignore
export const CaseInputSchema = z.object({
    id: z.string(),
    patientId: z.string(),
    patient: z.unknown(),
    caseNumber: z.string(),
    labId: z.string(),
    lab: z.unknown(),
    caseItems: z.array(z.unknown()),
    caseCategoryId: z.string().optional().nullable(),
    caseCategory: z.unknown().optional().nullable(),
    status: CaseStatusSchema,
    grandTotal: z.number().optional().nullable(),
    clinicId: z.string().optional().nullable(),
    clinic: z.unknown().optional().nullable(),
    dentistId: z.string().optional().nullable(),
    dentist: z.unknown().optional().nullable(),
    notes: z.string().optional().nullable(),
    staffAssignments: z.array(z.unknown()),
    caseActivityLogs: z.array(z.unknown()),
    caseAssetFiles: z.array(z.unknown()),
    deadline: z.date().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    invoiceCase: z.unknown().optional().nullable(),
    isRemake: z.boolean(),
    originalCaseId: z.string().optional().nullable(),
    originalCase: z.unknown().optional().nullable(),
    remakes: z.array(z.unknown()),
    failureReason: z.string().optional().nullable(),
    failureFault: FaultPartySchema.optional().nullable(),
    completedAt: z.date().optional().nullable(),
    deliveredAt: z.date().optional().nullable()
}).strict();

export type CaseInputType = z.infer<typeof CaseInputSchema>;
