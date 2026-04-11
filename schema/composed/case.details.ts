import z from "zod";
import { CaseBaseSchema } from "../base/case.base";
import { LabBaseSchema } from "../base/lab.base";
import { CaseWorkItemBaseSchema } from "../base/case-work-item.base";
import { PatientBaseSchema } from "../base/patient.base";
import { CaseCategoryBaseSchema } from "../base/case-category.base";
import { ClinicBaseSchema } from "../base/clinic.base";
import { CaseAssetFileBaseSchema } from "../base/case-asset-file.base";
import { CreateCaseWorkItemInputSchema } from "./case-work-item.details";
import { CaseStatusSchema } from "../base/enums.base";
import { DentistBaseSchema } from "../base/dentist.base";
import { CreateCaseAssetFilesInputSchema } from "./case-asset-file.details";
import { emptyToUndefinedTransformer } from "../base/utils.base";
import { LabStaffBaseSchema } from "../base/lab-staff.base";
import { CreateCaseStaffAssignmentInputSchema } from "./case-staff-assignment.details";

export const CaseDetailsSchema = CaseBaseSchema.extend({
	caseCategory: CaseCategoryBaseSchema.optional(),
	caseItems: z.array(CaseWorkItemBaseSchema),
	clinic: ClinicBaseSchema.optional(),
	caseAssetFiles: z.array(CaseAssetFileBaseSchema).optional(),
	lab: LabBaseSchema,
	patient: PatientBaseSchema,
	dentist: DentistBaseSchema.optional(),
	staffAssignments: z.array(LabStaffBaseSchema),
});
export type CaseDetails = z.infer<typeof CaseDetailsSchema>;

export const CaseDetailsUISchema = CaseBaseSchema.extend({
	caseCategory: CaseCategoryBaseSchema.optional(),
	caseItems: z.array(CaseWorkItemBaseSchema),
	clinic: ClinicBaseSchema.optional(),
	caseAssetFiles: z.array(CaseAssetFileBaseSchema).optional(),
	lab: LabBaseSchema,
	patient: PatientBaseSchema,
	dentist: DentistBaseSchema.optional(),
	staffAssignments: z.array(LabStaffBaseSchema).optional(),
});
export type CaseDetailsUI = z.infer<typeof CaseDetailsUISchema>;

export const CreateCaseInputSchema = z.object({
	patientId: z.string(),
	caseCategoryId: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
	status: CaseStatusSchema,
	grandTotal: z.number(),
	clinicId: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
	deadline: z.date(),
	caseWorkItems: z.array(CreateCaseWorkItemInputSchema),
	caseAssetFiles: z.array(CreateCaseAssetFilesInputSchema),
	notes: z.string().transform(emptyToUndefinedTransformer).optional(),

	staffAssignments: z
		.array(
			CreateCaseStaffAssignmentInputSchema.omit({
				caseId: true,
				commissionTotal: true, // Computed at completion
				isPaid: true, // Defaults to false in DB
				paidAt: true, // Null until actually paid
			}),
		)
		.optional(),
});

export type CreateCaseInput = z.infer<typeof CreateCaseInputSchema>;
