import { AssetFileTypeSchema, CaseStatusSchema, CommissionTypeSchema, StaffRoleCategorySchema } from "@/schema/base/enums.base";
import z from "zod";

export const AssignCaseStaffSchema = z.object({
	caseId: z.string().min(1),
	staffId: z.string().min(1),
	roleCategory: StaffRoleCategorySchema,
	commissionType: CommissionTypeSchema,
	commissionValue: z.number().min(0),
});

export const UpdateCaseStatusSchema = z.object({
	caseId: z.string().min(1),
	newStatus: CaseStatusSchema,
});

export const UpdateCaseDeadlineSchema = z.object({
	caseId: z.string().min(1),
	deadline: z.date(),
});

export const RemoveCaseStaffSchema = z.object({
	caseId: z.string().min(1),
	staffId: z.string().min(1),
});

export const DeleteCaseAssetFileSchema = z.object({
	caseId: z.string().min(1),
	fileId: z.string().min(1),
});

export const UpdateCaseNotesSchema = z.object({
	caseId: z.string().min(1),
	notes: z.string().max(2000, "Notes cannot exceed 2000 characters").nullable(),
});

export const AddCaseAssetFilesSchema = z.object({
	caseId: z.string().min(1),
	files: z
		.array(
			z.object({
				title: z.string().trim().optional(),
				description: z.string().trim().optional(),
				documentUrl: z.url(),
				assetFileType: AssetFileTypeSchema,
				fileExtension: z.string().min(1),
			}),
		)
		.min(1, "At least one file is required")
		.max(20, "Cannot upload more than 20 files at once"),
});
