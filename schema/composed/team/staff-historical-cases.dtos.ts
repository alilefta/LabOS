// schema/composed/team/staff-historical-cases.dtos.ts

import { z } from "zod";
import { CaseStatusSchema, JawTypeSchema } from "@/schema/base/enums.base"; // Adjust paths

export const StaffHistoricalWorkItemDTOSchema = z.object({
	id: z.string().uuid(),
	productName: z.string(),
	workTypeName: z.string(),
	jawType: JawTypeSchema,
	teethCount: z.number().int().min(0),
});

export type StaffHistoricalWorkItemDTO = z.infer<typeof StaffHistoricalWorkItemDTOSchema>;

export const StaffHistoricalCaseDTOSchema = z.object({
	id: z.uuid(),
	caseNumber: z.string(),
	status: CaseStatusSchema,
	resolvedDate: z.coerce.date(), // Immutable resolution milestone date

	patientName: z.string(),
	clinicName: z.string(), // 🔥 MANDATORY on the staff dossier page
	dentistName: z.string().nullable(),
	grandTotal: z.number().nullable(), // Role-guarded on render

	isRemake: z.boolean(),
	failureReason: z.string().nullable(),

	workItems: z.array(StaffHistoricalWorkItemDTOSchema),
});

export type StaffHistoricalCaseDTO = z.infer<typeof StaffHistoricalCaseDTOSchema>;

export type GetStaffHistoricalCasesResult = {
	cases: StaffHistoricalCaseDTO[];
	nextCursor: string | null;
	totalCount: number;
};
