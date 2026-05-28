// schema/composed/lab-staff.details.ts
import { CommissionTypeSchema, LabRoleSchema, StaffRoleCategorySchema } from "@/schema/base/enums.base";
import { emptyToUndefinedTransformer } from "@/schema/base/utils.base";
import { z } from "zod";

export const CreateLabStaffInputSchema = z.object({
	// ── 1. IDENTITY & CONTACT (STRICT VALIDATION) ──────────────────────────
	firstName: z.string().trim().min(2, "First name must be at least 2 characters."),
	lastName: z.string().trim().min(2, "Last name must be at least 2 characters."),
	phoneNumber: z.string().trim().min(7, "Please enter a valid phone number."),

	// Re-using your secure UploadThing avatar URL validator
	avatarUrl: z
		.union([z.literal(""), z.string().trim().url("Please enter a valid image URL")])
		.transform(emptyToUndefinedTransformer)
		.optional(),

	isActive: z.boolean(),

	// ── 2. LOCATION & LOGISTICS (WITH "N/A" DEFAULTS) ────────────────────
	city: z.string().trim().min(1, "City is required."),
	address1: z.string().trim().min(1, "Street address is required."),
	address2: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
	zipcode: z.string().trim().transform(emptyToUndefinedTransformer).optional(),

	// ── 3. JOB DETAILS (WITH SANITIZERS) ─────────────────────────────────
	roleCategory: StaffRoleCategorySchema,
	jobTitle: z.string().transform(emptyToUndefinedTransformer).optional().nullable(),
	specialization: z.string().transform(emptyToUndefinedTransformer).optional().nullable(),

	// ── 4. COMPENSATION (EMERALD FINANCIAL MODEL) ────────────────────────
	commissionType: CommissionTypeSchema,
	commissionValue: z.coerce.number<number>().min(0, "Value must be positive.").optional(),

	// ── 5. SYSTEM ACCESS & INVITATION (NEW) ──────────────────────────────
	grantAccess: z.boolean(),
	// React Hook Form safe union: allows email to be an empty string without failing the email regex
	email: z.string().trim().email("Please enter a valid email address.").optional().or(z.literal("")),
	systemRole: LabRoleSchema,
});

export type CreateLabStaffInput = z.infer<typeof CreateLabStaffInputSchema>;
