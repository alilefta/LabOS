import z from "zod";
import { CaseBaseSchema } from "../base/case.base";
import { LabBaseSchema } from "../base/lab.base";
import { CaseWorkItemBaseSchema } from "../base/case-work-item.base";
import { PatientBaseSchema } from "../base/patient.base";
import { CaseCategoryBaseSchema } from "../base/case-category.base";
import { ClinicBaseSchema } from "../base/clinic.base";
import { CaseAssetFileBaseSchema } from "../base/case-asset-file.base";
import { CaseWorkItemDetailsUISchema, CreateCaseWorkItemInputSchema } from "./case-work-item.details";
import { AssetFileTypeSchema, CaseStatusSchema, CommissionTypeSchema, JawTypeSchema, StaffRoleCategorySchema } from "../base/enums.base";
import { DentistBaseSchema } from "../base/dentist.base";
import { CreateCaseAssetFilesInputSchema } from "./case-asset-file.details";
import { emptyToUndefinedTransformer } from "../base/utils.base";
import { CaseStaffAssignmentDetailsUISchema, CreateCaseStaffAssignmentInputSchema } from "./case-staff-assignment.details";
import { ToothPositionSchema } from "../base/tooth-position.base";
import { CaseStaffAssignmentBaseSchema } from "../base/case-staff-assignment.base";

export const CaseDetailsSchema = CaseBaseSchema.extend({
	caseCategory: CaseCategoryBaseSchema.nullable(),
	caseItems: z.array(CaseWorkItemBaseSchema),
	clinic: ClinicBaseSchema.nullable(),
	caseAssetFiles: z.array(CaseAssetFileBaseSchema).nullable(),
	lab: LabBaseSchema,
	patient: PatientBaseSchema,
	dentist: DentistBaseSchema.nullable(),
	staffAssignments: z.array(CaseStaffAssignmentBaseSchema),
});
export type CaseDetails = z.infer<typeof CaseDetailsSchema>;

export const CaseDetailsUISchema = CaseBaseSchema.extend({
	caseCategory: CaseCategoryBaseSchema.nullable(),
	caseItems: z.array(CaseWorkItemDetailsUISchema),
	clinic: ClinicBaseSchema.nullable(),
	caseAssetFiles: z.array(CaseAssetFileBaseSchema).nullable(),
	lab: LabBaseSchema.nullable(),
	patient: PatientBaseSchema.nullable(),
	dentist: DentistBaseSchema.nullable(),
	staffAssignments: z.array(CaseStaffAssignmentDetailsUISchema).nullable(),
});
export type CaseDetailsUI = z.infer<typeof CaseDetailsUISchema>;

export const CreateCaseInputSchema = z
	.object({
		// draftId: z.string().optional(), // if draft was saved
		// caseNumber: z.string().optional(), // if draft was saved
		patientId: z.string().min(1, "Patient is required"), // ← add min(1), empty string would pass
		caseCategoryId: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
		status: CaseStatusSchema, // ← add default, shouldn't need client to set this
		grandTotal: z.number().min(0).optional(), // ← add min(0), negative total makes no sense
		clinicId: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
		deadline: z.date().optional(),
		dentistId: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
		caseWorkItems: z.array(CreateCaseWorkItemInputSchema),
		caseAssetFiles: z.array(CreateCaseAssetFilesInputSchema).optional(),
		notes: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
		existingDraftId: z.string().optional(),
		staffAssignments: z
			.array(
				CreateCaseStaffAssignmentInputSchema.omit({
					caseId: true,
					commissionTotal: true,
					isPaid: true,
					paidAt: true,
				}),
			)
			.optional(),
	})
	.superRefine((data, ctx) => {
		if (data.status === "DRAFT") return;

		if (!data.patientId || data.patientId.trim() === "") {
			ctx.addIssue({
				code: "custom",
				message: "A patient is required to submit a case.",
				path: ["patientId"],
			});
		}

		if (!data.deadline) {
			ctx.addIssue({
				code: "custom",
				message: "A deadline is required to submit a case.",
				path: ["deadline"],
			});
		}

		if (!data.clinicId) {
			ctx.addIssue({
				code: "custom",
				message: "A clinic must be selected.",
				path: ["clinicId"],
			});
		}

		if (!data.caseCategoryId) {
			// ← missing from your original
			ctx.addIssue({
				code: "custom",
				message: "A case category must be selected.",
				path: ["caseCategoryId"],
			});
		}
		// Filter out empty ghost rows before checking
		const validWorkItems = (data.caseWorkItems ?? []).filter((item) => item.productId || item.casePricingPlanId);

		if (validWorkItems.length === 0) {
			ctx.addIssue({
				code: "custom",
				message: "At least one work item is required.",
				path: ["caseWorkItems"],
			});
		}

		// ← missing: if dentistId provided but no clinicId, that's inconsistent
		if (data.dentistId && !data.clinicId) {
			ctx.addIssue({
				code: "custom",
				message: "A clinic must be selected when a dentist is specified.",
				path: ["clinicId"],
			});
		}
	});

export type CreateCaseInput = z.infer<typeof CreateCaseInputSchema>;

// ================== Draft Schema ==========================
// Draft schema — much more permissive than the full case schema
// Only patientId is required, everything else is optional
export const SaveDraftCaseInputSchema = z.object({
	// The one hard requirement — a draft must be linked to a patient
	patientId: z.string().min(1, "A patient must be selected to save a draft."),

	// Optional — may not have been selected yet
	clinicId: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
	dentistId: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
	caseCategoryId: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
	deadline: z.date().optional(),
	notes: z.string().trim().transform(emptyToUndefinedTransformer).optional(),

	// Work items — optional and individually permissive
	// A draft work item doesn't need teeth or pricing
	caseWorkItems: z
		.array(
			z.object({
				productId: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
				workTypeId: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
				casePricingPlanId: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
				jawType: JawTypeSchema.default("UPPER"),
				totalPrice: z.number().min(0).default(0),
				selectedTeeth: z
					.array(
						z.object({
							toothPosition: ToothPositionSchema,
						}),
					)
					.default([]),
				notes: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
				shadeSystem: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
				baseShade: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
				stumpShade: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
				shadeNotes: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
			}),
		)
		.default([]),

	staffAssignments: z
		.array(
			z.object({
				staffId: z.string().min(1),
				roleCategory: StaffRoleCategorySchema,
				commissionType: CommissionTypeSchema,
				commissionValue: z.number().min(0),
			}),
		)
		.default([]),

	caseAssetFiles: z
		.array(
			z.object({
				title: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
				description: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
				documentUrl: z.string().url(),
				assetFileType: AssetFileTypeSchema,
				fileExtension: z.string().min(1),
			}),
		)
		.default([]),

	// If updating an existing draft — pass the existing case id
	existingDraftId: z.string().optional(),
});

export type SaveDraftCaseInput = z.infer<typeof SaveDraftCaseInputSchema>;

// ── Draft DTO ──────────────────────────────────────────────────────────────
// Returned from saveDraftCaseAction and loadDraftByIdAction.
// All Decimals already normalized to number by server-only-helpers.
// Safe to pass to client components.

export const DraftCaseSummaryDTOSchema = z.object({
	id: z.string(),
	caseNumber: z.string(),
	lastSavedAt: z.date(),
	patientName: z.string(),
	clinicName: z.string().nullable(),
});

export type DraftCaseSummaryDTO = z.infer<typeof DraftCaseSummaryDTOSchema>;

// Full draft — used when resuming/hydrating the form
export const DraftCaseDTOSchema = CaseBaseSchema.extend({
	// Relations — always included when loading a draft for editing
	patient: PatientBaseSchema.partial(),
	clinic: ClinicBaseSchema.partial().nullable(),

	caseItems: z.array(
		CaseWorkItemBaseSchema.extend({
			selectedTeeth: z.array(
				z.object({
					toothPosition: ToothPositionSchema,
				}),
			),
		}),
	),

	staffAssignments: z.array(CaseStaffAssignmentBaseSchema.partial()),

	caseAssetFiles: z.array(CaseAssetFileBaseSchema.partial()),
});

export type DraftCaseDTO = z.infer<typeof DraftCaseDTOSchema>;

// Used for Case Summary and Draft info
export type CaseSummaryMetadata = {
	caseNumber: string;
	clinicInfo: {
		id: string;
		name: string;
		dentists: { id: string; name: string; isOwner: boolean; isDefault: boolean }[];
	} | null;
	patientInfo: {
		id: string;
		name: string;
		age: number | null;
		gender: string | null;
		description: string | null;
		cases: { id: string }[];
	} | null;
	courier: { id: string; firstName: string; lastName: string } | null;
	technician: { id: string; firstName: string; lastName: string } | null;
	technicalDetails: {
		name: string;
		clinicId: string | null;
		product: {
			id: string;
			name: string;
			workType: {
				id: string;
				name: string;
				caseCategory: { id: string; name: string };
			};
		} | null;
	}[];
};
