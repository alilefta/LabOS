import * as z from 'zod';
import { CaseStatusSchema } from '../../enums/CaseStatus.schema';
import { FaultPartySchema } from '../../enums/FaultParty.schema';
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
    manualDiscountAmount: z.number(),
    manualDiscountReason: z.string().nullable(),
    isWarranty: z.boolean(),
    clinicId: z.string().nullable(),
    clinic: z.unknown().nullable(),
    dentistId: z.string().nullable(),
    dentist: z.unknown().nullable(),
    notes: z.string().nullable(),
    staffAssignments: z.array(z.unknown()),
    caseActivityLogs: z.array(z.unknown()),
    caseAssetFiles: z.array(z.unknown()),
    deadline: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    invoiceCase: z.unknown().nullable(),
    isRemake: z.boolean(),
    originalCaseId: z.string().nullable(),
    originalCase: z.unknown().nullable(),
    remakes: z.array(z.unknown()),
    failureReason: z.string().nullable(),
    failureFault: FaultPartySchema.nullable(),
    completedAt: z.date().nullable(),
    deliveredAt: z.date().nullable()
}).strict();

export type CaseResultType = z.infer<typeof CaseResultSchema>;
