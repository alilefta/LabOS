import z from "zod";
import { CommissionTypeSchema, StaffRoleCategorySchema } from "./enums.base";

export const LabStaffBaseSchema = z.object({
	id: z.string(),
	caseId: z.string(),
	staffId: z.string(),
	labId: z.string(),
	roleCategory: StaffRoleCategorySchema,
	commissionType: CommissionTypeSchema,
	commissionValue: z.number(),
	commissionTotal: z.number(),
	isPaid: z.boolean(),
	paidAt: z.date().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type LabStaffBase = z.infer<typeof LabStaffBaseSchema>;
