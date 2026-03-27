import z from "zod";
import { CreateLabInputSchema, LabBaseSchema } from "@/schema/base/lab.base";
import { CreateLabUserInputSchema } from "./lab-user.details";
import { LabUserBaseSchema } from "../base/lab-user.base";
import { ClinicBaseSchema } from "../base/clinic.base";
import { PatientBaseSchema } from "../base/patient.base";
import { CaseAssetFileBaseSchema } from "../base/case-asset-file.base";
import { CasePricingPlanBaseSchema } from "../base/case-pricing-plan.base";
import { LabSubscriptionPlanBaseSchema } from "../base/lab-subscription-plan.base";
import { CaseBaseSchema } from "../base/case.base";
import { TechnicianBaseSchema } from "../base/technician.base";
import { SalesRepresentativeBaseSchema } from "../base/sales-representative.base";
import { CaseCategoryBaseSchema } from "../base/case-category.base";
import { WorkTypeBaseSchema } from "../base/worktype.base";
import { ProductBaseSchema } from "../base/product.base";
import { CaseWorkItemBaseSchema } from "../base/case-work-item.base";
import { SelectedToothBaseSchema } from "../base/selected-tooth.base";
import { DentistBaseSchema } from "../base/dentist.base";

export const LabDetailsSchema = LabBaseSchema.extend({
	labSubscriptionPlan: LabSubscriptionPlanBaseSchema,
	users: z.array(LabUserBaseSchema),

	clinics: z.array(ClinicBaseSchema),
	cases: z.array(CaseBaseSchema),
	technicians: z.array(TechnicianBaseSchema),
	salesReps: z.array(SalesRepresentativeBaseSchema),
	caseCategories: z.array(CaseCategoryBaseSchema),
	workTypes: z.array(WorkTypeBaseSchema),
	products: z.array(ProductBaseSchema),
	caseWorkItems: z.array(CaseWorkItemBaseSchema),
	selectedTeeth: z.array(SelectedToothBaseSchema),
	casePricingPlans: z.array(CasePricingPlanBaseSchema),
	caseAssetFiles: z.array(CaseAssetFileBaseSchema),

	patients: z.array(PatientBaseSchema),
	dentists: z.array(DentistBaseSchema),
});

export const CreateLabAndLabUserInputSchema = z.object({
	lab: CreateLabInputSchema,
	labUser: CreateLabUserInputSchema,
});

export type CreateLabAndLabUserInput = z.infer<typeof CreateLabAndLabUserInputSchema>;
