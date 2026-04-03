import z from "zod";
import { CaseBaseSchema } from "../base/case.base";
import { LabBaseSchema } from "../base/lab.base";
import { CaseWorkItemBaseSchema } from "../base/case-work-item.base";
import { TechnicianBaseSchema } from "../base/technician.base";
import { PatientBaseSchema } from "../base/patient.base";
import { CaseCategoryBaseSchema } from "../base/case-category.base";
import { ClinicBaseSchema } from "../base/clinic.base";
import { SalesRepresentativeBaseSchema } from "../base/sales-representative.base";
import { CaseAssetFileBaseSchema } from "../base/case-asset-file.base";
import { CreateCaseWorkItemInputSchema } from "./case-work-item.details";
import { CaseStatusSchema } from "../base/enums.base";
import { DentistBaseSchema } from "../base/dentist.base";
import { CreateCaseAssetFilesInputSchema } from "./case-asset-file.details";
import { emptyToUndefinedTransformer } from "../base/utils.base";

export const CaseDetailsSchema = CaseBaseSchema.extend({
	caseCategory: CaseCategoryBaseSchema.optional(),
	caseItems: z.array(CaseWorkItemBaseSchema),
	salesReps: SalesRepresentativeBaseSchema.optional(),
	clinic: ClinicBaseSchema.optional(),
	Technician: TechnicianBaseSchema.optional(),
	caseAssetFiles: z.array(CaseAssetFileBaseSchema).optional(),
	lab: LabBaseSchema,
	patient: PatientBaseSchema,
	dentist: DentistBaseSchema.optional(),
});
export type CaseDetails = z.infer<typeof CaseDetailsSchema>;

export const CaseDetailsUISchema = CaseBaseSchema.extend({
	caseCategory: CaseCategoryBaseSchema.optional(),
	caseItems: z.array(CaseWorkItemBaseSchema),
	salesReps: SalesRepresentativeBaseSchema.optional(),
	clinic: ClinicBaseSchema.optional(),
	Technician: TechnicianBaseSchema.optional(),
	caseAssetFiles: z.array(CaseAssetFileBaseSchema).optional(),
	lab: LabBaseSchema,
	patient: PatientBaseSchema,
	dentist: DentistBaseSchema.optional(),
});
export type CaseDetailsUI = z.infer<typeof CaseDetailsUISchema>;

export const CreateCaseInputSchema = z.object({
	patientId: z.string(),
	salesRepsId: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
	caseCategoryId: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
	status: CaseStatusSchema,
	grandTotal: z.number(),
	clinicId: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
	technicianId: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
	deadline: z.date(),
	caseWorkItems: z.array(CreateCaseWorkItemInputSchema),
	caseAssetFiles: z.array(CreateCaseAssetFilesInputSchema),
});

export type CreateCaseInput = z.infer<typeof CreateCaseInputSchema>;
