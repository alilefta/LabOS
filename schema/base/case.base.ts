import { z } from 'zod'
import { CaseStatusSchema, FaultPartySchema } from './enums.base'
export const CaseBaseSchema = z.object({
	id: z.string(),
	patientId: z.string(),
	caseNumber: z.string(),
	labId: z.string(),
	caseCategoryId: z.string().nullable(),
	status: CaseStatusSchema,
	grandTotal: z.number().nullable(),
	manualDiscountAmount: z.number(),
	manualDiscountReason: z.string().nullable(),
	isWarranty: z.boolean(),
	clinicId: z.string().nullable(),

	dentistId: z.string().nullable(),
	notes: z.string().nullable(),
	deadline: z.date().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
	isRemake: z.boolean(),
	originalCaseId: z.string().nullable(),
	failureReason: z.string().nullable(),
	failureFault: FaultPartySchema.nullable(),
	completedAt: z.date().nullable(),
	deliveredAt: z.date().nullable(),
})

export type CaseBase = z.infer<typeof CaseBaseSchema>
