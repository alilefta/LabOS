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
import { CaseStatusSchema } from "../base/case-status.base";
import { CreateCaseWorkItemInputSchema } from "./case-work-item.details";

export const CaseDetailsSchema = CaseBaseSchema.extend({
	caseCategory: CaseCategoryBaseSchema,
	caseItems: z.array(CaseWorkItemBaseSchema),
	salesReps: SalesRepresentativeBaseSchema.nullable(),
	clinic: ClinicBaseSchema.nullable(),
	Technician: TechnicianBaseSchema.nullable(),
	caseAssetFiles: z.array(CaseAssetFileBaseSchema),
	lab: LabBaseSchema,
	patient: PatientBaseSchema,
});
export type CaseDetails = z.infer<typeof CaseDetailsSchema>;

export const CreateCaseInputSchema = z.object({
	patientId: z.string(),
	labId: z.string(),
	salesRepsId: z.string().nullable(),
	caseCategoryId: z.string().nullable(),
	status: CaseStatusSchema,
	grandTotal: z.number(),
	clinicId: z.string().nullable(),
	technicianId: z.string().nullable(),
	deadline: z.date(),
	caseWorkItems: z.array(CreateCaseWorkItemInputSchema),
});

export type CreateCaseInput = z.infer<typeof CreateCaseInputSchema>;
