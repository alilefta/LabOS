import z from "zod";
import { CaseStaffAssignmentBaseSchema } from "../base/case-staff-assignment.base";
import { CaseBaseSchema } from "../base/case.base";
import { LabStaffBaseSchema } from "../base/lab-staff.base";
import { LabBaseSchema } from "../base/lab.base";
import { CommissionTypeSchema, StaffRoleCategorySchema } from "../base/enums.base";

export const CaseStaffAssignmentDetailsSchema = CaseStaffAssignmentBaseSchema.extend({
	dentalCase: CaseBaseSchema,
	staff: LabStaffBaseSchema,
	lab: LabBaseSchema,
});

export type CaseStaffAssignmentDetails = z.infer<typeof CaseStaffAssignmentDetailsSchema>;

export const CaseStaffAssignmentDetailsUISchema = CaseStaffAssignmentBaseSchema.extend({
	dentalCase: CaseBaseSchema.nullable(),
	staff: LabStaffBaseSchema.nullable(),
	lab: LabBaseSchema.nullable(),
});

export type CaseStaffAssignmentDetailsUI = z.infer<typeof CaseStaffAssignmentDetailsUISchema>;

export const CreateCaseStaffAssignmentInputSchema = z.object({
	caseId: z.string().trim().min(2, "Case id is required."),
	staffId: z.string().trim().min(2, "Staff id is required."),
	commissionType: CommissionTypeSchema,
	roleCategory: StaffRoleCategorySchema,
	commissionValue: z.number(),
	commissionTotal: z.number(),
	isPaid: z.boolean(),
	paidAt: z.date().optional(),
});
export type CreateCaseStaffAssignmentInput = z.infer<typeof CreateCaseStaffAssignmentInputSchema>;

// export const CreateLabStaffDetailsInputSchema = LabStaffBaseSchema.extend({
//     firstName: z.string().trim().min(2, "First name must be at least 2 characters."),
//     lastName: z.string().trim().min(2, "Last name must be at least 2 characters."),
//     phoneNumber: z.string().trim().min(7, "Please enter a valid phone number."),
//     email: z.string().trim().email("Please enter a valid email address.").transform(emptyToUndefinedTransformer).optional(),
//     avatarUrl: z
//         .union([z.literal(""), z.string().trim().url("Please enter a valid image URL")])
//         .transform(emptyToUndefinedTransformer)
//         .optional(),
//     isActive: z.boolean(),
//     jobTitle: z.string().transform(emptyToUndefinedTransformer).optional(),
//     specialization: z.string().transform(emptyToUndefinedTransformer).optional(),
//     commissionType: CommissionTypeSchema,
//     commissionValue: z.number().optional(),
// });
