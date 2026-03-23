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
