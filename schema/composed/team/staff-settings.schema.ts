import { CommissionTypeSchema, LabRoleSchema, StaffRoleCategorySchema } from "@/schema/base/enums.base";
import z from "zod";

// ──  Revoke Access ──────────────────────────────────────────────
export const RevokeStaffSystemAccessInputSchema = z.object({
	staffId: z.string().uuid("Invalid staff ID format."),
});

export type RevokeStaffSystemAccessInput = z.infer<typeof RevokeStaffSystemAccessInputSchema>;

// ──  Grant Access ──────────────────────────────────────────────
export const GrantStaffSystemAccessInputSchema = z.object({
	staffId: z.string().uuid("Invalid staff ID format."),
	email: z.string().trim().email("Please enter a valid business email address."),
	roleToGrant: LabRoleSchema,
});

export type GrantStaffSystemAccessInput = z.infer<typeof GrantStaffSystemAccessInputSchema>;

// ──  Update Staff Compensation ──────────────────────────────────────────────
export const UpdateStaffCompensationInputSchema = z.object({
	staffId: z.string().uuid("Invalid staff ID format."),
	commissionType: CommissionTypeSchema,
	commissionValue: z.coerce.number<number>().min(0, "Commission value cannot be negative.").nullable().optional(),
});

export type UpdateStaffCompensationInput = z.infer<typeof UpdateStaffCompensationInputSchema>;

// ──  Update Staff Identity ──────────────────────────────────────────────
export const UpdateStaffIdentityInputSchema = z.object({
	staffId: z.string().uuid("Invalid staff ID format."),
	firstName: z.string().trim().min(1, "First name is required."),
	lastName: z.string().trim().min(1, "Last name is required."),
	phoneNumber: z.string().trim().min(5, "Please enter a valid phone number."),
	jobTitle: z.string().trim().nullable().optional(),
	specialization: z.string().trim().nullable().optional(),
	roleCategory: StaffRoleCategorySchema,
});

export type UpdateStaffIdentityInput = z.infer<typeof UpdateStaffIdentityInputSchema>;
