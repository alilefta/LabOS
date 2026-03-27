import * as z from "zod";
import { ClinicBaseSchema } from "../base/clinic.base";
import { LabBaseSchema } from "../base/lab.base";
import { CaseBaseSchema } from "../base/case.base";
import { CasePricingPlanBaseSchema } from "../base/case-pricing-plan.base";
import { DentistBaseSchema } from "../base/dentist.base";
import { ClinicStatusSchema, ClinicTypeSchema } from "../base/enums.base";
import { CreatePrimaryDentistInputSchema } from "./dentist.details";

export const ClinicDetailsSchema = ClinicBaseSchema.extend({
	lab: LabBaseSchema,
	cases: z.array(CaseBaseSchema),
	dentists: z.array(DentistBaseSchema),
	casePricingPlans: z.array(CasePricingPlanBaseSchema),
});

export type ClinicDetails = z.infer<typeof ClinicDetailsSchema>;

export const ClinicDetailsUISchema = ClinicBaseSchema.extend({
	lab: LabBaseSchema.nullable(),
	cases: z.array(CaseBaseSchema).nullable(),
	dentists: z.array(DentistBaseSchema).nullable(),
	casePricingPlans: z.array(CasePricingPlanBaseSchema).nullable(),
});

export type ClinicDetailsUI = z.infer<typeof ClinicDetailsUISchema>;

const emptyToUndefined = (v: string) => (v === "" ? undefined : v); // used inside transform(emptyToUndefined)

// const optionalEmail = z
// 	.string()
// 	.trim()
// 	.transform(emptyToUndefined)
// 	.optional()
// 	.pipe(z.email({ message: "Please enter a valid email address." }).optional());

export const CreateClinicInputSchema = z.object({
	name: z.string(),
	description: z.string().transform(emptyToUndefined).optional(),
	website: z.string().transform(emptyToUndefined).optional(),
	notes: z.string().transform(emptyToUndefined).optional(),
	status: ClinicStatusSchema,
	type: ClinicTypeSchema,
	city: z.string(),
	zipcode: z.string().transform(emptyToUndefined).optional(),
	address1: z.string(),
	address2: z.string().transform(emptyToUndefined).optional(),
	email: z.string(),
	phoneNumber: z.string(),
	billingEmail: z.string().transform(emptyToUndefined).optional(),
	billingPhoneNumber: z.string().transform(emptyToUndefined).optional(),
	taxNumber: z.string().transform(emptyToUndefined).optional(),
	discount: z.number().optional(),
	creditLimit: z.number().optional(),
	currentBalance: z.number(),
	primaryDentist: CreatePrimaryDentistInputSchema,
});

export type CreateClinicInput = z.infer<typeof CreateClinicInputSchema>;
