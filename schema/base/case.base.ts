import { CaseModelSchema } from "@/prisma/generated/schemas";

export const CaseBaseSchema = CaseModelSchema.omit({
	patient: true,
	caseItems: true,
	lab: true,
	clinic: true,
	salesReps: true,
	Technician: true,
	caseCategory: true,
	caseAssetFiles: true,
});
