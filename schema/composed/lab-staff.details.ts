import z from "zod";
import { LabStaffBaseSchema } from "../base/lab-staff.base";
import { LabBaseSchema } from "../base/lab.base";
import { CaseBaseSchema } from "../base/case.base";
import { CommissionTypeSchema, StaffRoleCategorySchema } from "../base/enums.base";
import { emptyToUndefinedTransformer } from "../base/utils.base";

export const LabStaffDetailsSchema = LabStaffBaseSchema.extend({
	lab: LabBaseSchema,
	cases: z.array(CaseBaseSchema),
});

export type LabStaffDetails = z.infer<typeof LabStaffDetailsSchema>;

export const LabStaffDetailsUISchema = LabStaffBaseSchema.extend({
	lab: LabBaseSchema.optional(),
	cases: z.array(CaseBaseSchema).optional(),
});

export type LabStaffDetailsUI = z.infer<typeof LabStaffDetailsUISchema>;

export const CreateLabStaffInputSchema = LabStaffBaseSchema.omit({
	id: true,
	labId: true,
	createdAt: true,
	updatedAt: true,
}).extend({
	firstName: z.string().trim().min(2, "First name must be at least 2 characters."),
	lastName: z.string().trim().min(2, "Last name must be at least 2 characters."),
	phoneNumber: z.string().trim().min(7, "Please enter a valid phone number."),
	email: z.string().trim().email("Please enter a valid email address.").transform(emptyToUndefinedTransformer).optional(),
	avatarUrl: z
		.union([z.literal(""), z.string().trim().url("Please enter a valid image URL")])
		.transform(emptyToUndefinedTransformer)
		.optional(),
	isActive: z.boolean(),
	jobTitle: z.string().transform(emptyToUndefinedTransformer).optional(),
	roleCategory: StaffRoleCategorySchema,
	specialization: z.string().transform(emptyToUndefinedTransformer).optional(),
	commissionType: CommissionTypeSchema,
	commissionValue: z.coerce.number<number>().min(0, "").optional(),
});

export type CreateLabStaffInput = z.infer<typeof CreateLabStaffInputSchema>;

export const GetLabStaffByRoleAndSearchQueryInputSchema = z.object({
	role: StaffRoleCategorySchema,
	searchQuery: z.string(),
	limit: z.number().default(20),
});

export type GetLabStaffByRoleAndSearchQueryInput = z.infer<typeof GetLabStaffByRoleAndSearchQueryInputSchema>;
