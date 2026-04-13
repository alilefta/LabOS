// lib/case-helpers.ts

import { DraftCaseDTO } from "@/schema/composed/case.details";
import { SaveDraftCaseInput } from "@/schema/composed/case.details";

export function mapDraftToFormValues(draft: DraftCaseDTO): SaveDraftCaseInput {
	return {
		status: "NEW",
		patientId: draft.patientId,
		clinicId: draft.clinicId ?? undefined,
		dentistId: draft.dentistId ?? undefined,
		caseCategoryId: draft.caseCategoryId ?? undefined,
		deadline: draft.deadline ?? undefined,
		notes: draft.notes ?? undefined,
		grandTotal: draft.grandTotal ?? undefined,

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

		staffAssignments: draft.staffAssignments.map((s) => ({
			staffId: s.staffId,
			roleCategory: s.roleCategory,
			commissionType: s.commissionType,
			commissionValue: s.commissionValue, // already number
		})),

		caseAssetFiles: draft.caseAssetFiles.map((f) => ({
			title: f.title ?? undefined,
			description: f.description ?? undefined,
			documentUrl: f.documentUrl ?? undefined,
			assetFileType: f.assetFileType ?? undefined,
			fileExtension: f.fileExtension ?? undefined,
		})),
	};
}
