import * as z from "zod";
import { ClinicBaseSchema } from "../base/clinic.base";
import { LabBaseSchema } from "../base/lab.base";
import { CaseBaseSchema } from "../base/case.base";
import { CasePricingPlanBaseSchema } from "../base/case-pricing-plan.base";
import { DentistBaseSchema } from "../base/dentist.base";
import { ClinicStatusSchema, ClinicTypeSchema } from "../base/enums.base";
import { CreatePrimaryDentistInputSchema } from "./dentist.details";
import { emptyToUndefinedTransformer } from "../base/utils.base";

export const ClinicDetailsSchema = ClinicBaseSchema.extend({
	lab: LabBaseSchema,
	cases: z.array(CaseBaseSchema),
	dentists: z.array(DentistBaseSchema),
	casePricingPlans: z.array(CasePricingPlanBaseSchema),
});

export type ClinicDetails = z.infer<typeof ClinicDetailsSchema>;

export const ClinicDetailsUISchema = ClinicBaseSchema.extend({
	lab: LabBaseSchema,
	cases: z.array(CaseBaseSchema).optional(),
	dentists: z.array(DentistBaseSchema).optional(),
	casePricingPlans: z.array(CasePricingPlanBaseSchema).optional(),
});

export type ClinicDetailsUI = z.infer<typeof ClinicDetailsUISchema>;

const optionalEmail = z
	.string()
	.trim()
	.transform(emptyToUndefinedTransformer)
	.optional()
	.pipe(z.email({ message: "Please enter a valid email address." }).optional());

export const CreateClinicInputSchema = z.object({
	name: z.string().trim().min(2, "Clinic name must be at least 2 characters."),

	description: z.string().trim().transform(emptyToUndefinedTransformer).optional(),

	website: z.string().trim().transform(emptyToUndefinedTransformer).optional().pipe(z.string().url("Please enter a valid website URL.").optional()),

	notes: z.string().trim().transform(emptyToUndefinedTransformer).optional(),

	status: ClinicStatusSchema,

	type: ClinicTypeSchema,

	city: z.string().trim().min(2, "City is required."),

	zipcode: z.string().trim().transform(emptyToUndefinedTransformer).optional(),

	address1: z.string().trim().min(3, "Address is required."),

	address2: z.string().trim().transform(emptyToUndefinedTransformer).optional(),

	email: z.string().trim().email("Please enter a valid email address."),

	phoneNumber: z.string().trim().min(7, "Please enter a valid phone number."),

	billingEmail: optionalEmail,

	billingPhoneNumber: z.string().trim().transform(emptyToUndefinedTransformer).optional(),

	taxNumber: z.string().trim().transform(emptyToUndefinedTransformer).optional(),

	discount: z.number().min(0, "Discount cannot be negative.").max(100, "Discount cannot exceed 100%.").optional(),

	creditLimit: z.number().min(0, "Credit limit cannot be negative.").optional(),

	currentBalance: z.number().min(0, "Current balance cannot be negative."),
	primaryDentist: CreatePrimaryDentistInputSchema,
});

export type CreateClinicInput = z.infer<typeof CreateClinicInputSchema>;
