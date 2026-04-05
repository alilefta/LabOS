import z from "zod";
import { CommissionTypeSchema, StaffRoleCategorySchema } from "./enums.base";

export const LabStaffBaseSchema = z.object({
	id: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	labId: z.string(),
	email: z.string().nullable(),
	phoneNumber: z.string(),
	avatarUrl: z.string().nullable(),
	isActive: z.boolean(),
	roleCategory: StaffRoleCategorySchema,
	jobTitle: z.string().nullable(),
	specialization: z.string().nullable(),
	commissionType: CommissionTypeSchema,
	commissionValue: z.number().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type LabStaffBase = z.infer<typeof LabStaffBaseSchema>;
