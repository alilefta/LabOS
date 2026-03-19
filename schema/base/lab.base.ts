import { LabModelSchema } from "@/prisma/generated/schemas";
import z from "zod";

export const LabBaseSchema = LabModelSchema.omit({
	caseCategories: true,
	caseAssetFiles: true,
	casePricingPlans: true,
	labSubscriptionPlan: true,
	users: true,
	clinics: true,
	cases: true,
	technicians: true,
	salesReps: true,
	patients: true,
	caseWorkItems: true,
	products: true,
	workTypes: true,
	selectedTeeth: true,
});

export type LabBase = z.infer<typeof LabBaseSchema>;

export const CreateLabInputSchema = LabBaseSchema.pick({
	title: true,
	brandAvatarUrl: true,
	subtitle: true,
	slug: true,
});

export type CreateLabInput = z.infer<typeof CreateLabInputSchema>;
