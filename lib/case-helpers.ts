// lib/case-helpers.ts

import { CaseDetails, CaseDetailsUI, DraftCaseDTO } from "@/schema/composed/case.details";
import { SaveDraftCaseInput } from "@/schema/composed/case.details";
import { UpdateCaseInput } from "@/schema/composed/case.details";
export function mapDraftToFormValues(draft: DraftCaseDTO): SaveDraftCaseInput {
	return {
		patientId: draft.patientId,
		clinicId: draft.clinicId ?? undefined,
		dentistId: draft.dentistId ?? undefined,
		caseCategoryId: draft.caseCategoryId ?? undefined,
		deadline: draft.deadline ?? undefined,
		notes: draft.notes ?? undefined,

		caseWorkItems: draft.caseItems.map((item) => ({
			productId: item.productId ?? undefined,
			workTypeId: item.workTypeId ?? undefined,
			casePricingPlanId: item.casePricingPlanId,
			jawType: item.jawType,
			totalPrice: item.totalPrice, // already number
			selectedTeeth: item.selectedTeeth.map((t) => ({
				toothPosition: t.toothPosition,
			})),
			notes: item.notes ?? undefined,
			shadeSystem: item.shadeSystem ?? undefined,
			baseShade: item.baseShade ?? undefined,
			stumpShade: item.stumpShade ?? undefined,
			shadeNotes: item.shadeNotes ?? undefined,
		})),

		staffAssignments:
			draft?.staffAssignments?.map((s) => ({
				staffId: s.staffId,
				roleCategory: s.roleCategory,
				commissionType: s.commissionType,
				commissionValue: s.commissionValue, // already number
			})) ?? [],

		caseAssetFiles:
			draft?.caseAssetFiles?.map((f) => ({
				title: f.title ?? undefined,
				description: f.description ?? undefined,
				documentUrl: f.documentUrl ?? undefined,
				assetFileType: f.assetFileType ?? undefined,
				fileExtension: f.fileExtension ?? undefined,
			})) ?? [],
	};
}

/**
 * Transforms a fully hydrated Case object from the Database into
 * the flat shape required by the UpdateCaseInputSchema.
 */
export function mapCaseToUpdateFormValues(dentalCase: CaseDetailsUI): UpdateCaseInput {
	return {
		caseId: dentalCase.id,
		caseCategoryId: dentalCase.caseCategoryId ?? undefined,
		clinicId: dentalCase.clinicId ?? undefined,
		dentistId: dentalCase.dentistId ?? undefined,
		deadline: dentalCase.deadline ? new Date(dentalCase.deadline) : undefined,
		notes: dentalCase.notes ?? undefined,
		status: dentalCase.status,

		// 1. Map Work Items (Replace-All strategy)
		caseWorkItems: dentalCase.caseItems
			? dentalCase.caseItems.map((item) => ({
					productId: item.productId ?? "",
					workTypeId: item.workTypeId ?? "",
					casePricingPlanId: item.casePricingPlanId,
					jawType: item.jawType,
					// We map the object array of teeth back to the simple position array
					selectedTeeth: item.selectedTeeth
						? item.selectedTeeth.map((t) => ({
								toothPosition: t.toothPosition,
							}))
						: undefined,
					notes: item.notes ?? undefined,
					shadeSystem: item.shadeSystem ?? undefined,
					baseShade: item.baseShade ?? undefined,
					stumpShade: item.stumpShade ?? undefined,
					shadeNotes: item.shadeNotes ?? undefined,
					// totalPrice is re-calculated server-side, but RHF needs a value
					totalPrice: Number(item.totalPrice),
				}))
			: [],

		// 2. Map Staff Assignments
		staffAssignments: dentalCase.staffAssignments
			? dentalCase.staffAssignments.map((sa) => ({
					staffId: sa.staffId,
					roleCategory: sa.roleCategory,
					commissionType: sa.commissionType,
					commissionValue: Number(sa.commissionValue),
				}))
			: [],

		// 3. Map Assets using the Discriminated Union (Keep vs New)
		caseAssetFiles:
			dentalCase.caseAssetFiles?.map((file) => ({
				isNew: false as const, // CRITICAL: Tells the server to "KEEP" this file
				id: file.id,
				// We include metadata for the UI preview even though the Update Schema only requires the ID
				title: file.title ?? undefined,
				assetFileType: file.assetFileType,
				documentUrl: file.documentUrl,
				fileExtension: file.fileExtension,
			})) ?? [],
	};
}
