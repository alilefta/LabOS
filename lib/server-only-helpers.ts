import {
	CaseAssetFileModel,
	CaseCategoryModel,
	CaseModel,
	CasePricingPlanModel,
	CaseStaffAssignmentModel,
	CaseWorkItemModel,
	ClinicModel,
	DentistModel,
	LabModel,
	LabStaffModel,
	PatientModel,
	ProductModel,
	SelectedToothModel,
	WorkTypeModel,
} from "@/generated/prisma/models";
import { CasePricingPlanBase } from "@/schema/base/case-pricing-plan.base";
import { CasePricingPlanDetailsUI } from "@/schema/composed/case-pricing-plan.details";
import { CaseStaffAssignmentDetailsUI } from "@/schema/composed/case-staff-assignment.details";
import { CaseWorkItemDetailsUI } from "@/schema/composed/case-work-item.details";
import { CaseDetailsUI, DraftCaseDTO, DraftCaseSummaryDTO } from "@/schema/composed/case.details";
import { ClinicDetailsUI } from "@/schema/composed/clinic.details";

import { JawType } from "@/schema/base/enums.base";
import { ToothPosition } from "@/schema/base/tooth-position.base";

import type * as runtime from "@prisma/client/runtime/client";

// ============================================================================
// 1. UTILITY HELPERS
// ============================================================================

// Safely converts Prisma Decimal to JS Number, handling nulls gracefully.
const toNum = (val: runtime.Decimal | null | undefined): number | null => {
	if (val === null || val === undefined) return null;
	return Number(val);
};

const toStrictNum = (val: runtime.Decimal | null | undefined, fallback = 0): number => {
	if (val === null || val === undefined) return fallback;
	return Number(val);
};

// ============================================================================
// 2. ATOMIC MODEL MAPPERS (Base Fields & Simple Relations)
// ============================================================================

type CaseItemsWithDetails = CaseWorkItemModel & {
	product: ProductModel | null;
	casePricingPlan: CasePricingPlanModel | null;
	workType: WorkTypeModel | null;
	selectedTeeth: SelectedToothModel[];
	lab: LabModel | null;
	dentalCase: CaseModel | null;
};

export function caseWorkItemServerToFrontDTO(caseWorkItems: CaseItemsWithDetails[]): CaseWorkItemDetailsUI[] {
	return caseWorkItems.map((cwi) => ({
		...cwi,
		casePricingPlan: cwi.casePricingPlan ? (pricingPlansNormalizer(cwi.casePricingPlan) as CasePricingPlanBase) : null,
		additionalToothPrice: cwi.additionalToothPrice === null ? null : Number(cwi.additionalToothPrice),
		bulkPrice: cwi.bulkPrice === null ? null : Number(cwi.bulkPrice),
		firstToothPrice: cwi.firstToothPrice === null ? null : Number(cwi.firstToothPrice),
		teethCountToApplyBulkPrice: cwi.teethCountToApplyBulkPrice === null ? null : Number(cwi.teethCountToApplyBulkPrice),
		toothPrice: cwi.toothPrice === null ? null : Number(cwi.toothPrice),
		totalPrice: Number(cwi.totalPrice),
		selectedTeeth: cwi.selectedTeeth,
		dentalCase: null,
	}));
}

type CaseStaffAssignmentWithStaffMember = CaseStaffAssignmentModel & {
	staff: LabStaffModel | null;
};

export function staffAssignmentServerToFrontDTO(caseStaffAssignments: CaseStaffAssignmentWithStaffMember[]): CaseStaffAssignmentDetailsUI[] {
	return caseStaffAssignments.map((csa) => ({
		...csa,
		commissionTotal: Number(csa.commissionTotal),
		commissionValue: Number(csa.commissionValue),
		staff: csa.staff
			? {
					...csa.staff,
					commissionValue: csa.staff.commissionValue ? Number(csa.staff.commissionValue) : null,
				}
			: null,
		case: null,
		lab: null,
	}));
}

export function clinicNormalizer(clinic: ClinicModel): ClinicDetailsUI {
	return {
		...clinic,
		creditLimit: clinic.creditLimit !== null ? Number(clinic.creditLimit) : null,
		currentBalance: Number(clinic.currentBalance),
		discount: clinic.discount !== null ? Number(clinic.discount) : null,
	};
}

type CasePricingPlanWithDetails = CasePricingPlanModel & {
	lab: LabModel | null;
	product: ProductModel | null;
	clinic: ClinicModel | null;
	caseWorkItem: CaseWorkItemModel | null;
};
function pricingPlansNormalizer(pricingPlan: CasePricingPlanModel[] | CasePricingPlanModel): CasePricingPlanBase[] | CasePricingPlanBase {
	if (Array.isArray(pricingPlan)) {
		return pricingPlan.map((p) => ({
			...p,
			additionalToothPrice: p.additionalToothPrice === null ? null : Number(p.additionalToothPrice),
			bulkPrice: p.bulkPrice === null ? null : Number(p.bulkPrice),
			firstToothPrice: p.firstToothPrice === null ? null : Number(p.firstToothPrice),
			teethCountToApplyBulkPrice: p.teethCountToApplyBulkPrice === null ? null : Number(p.teethCountToApplyBulkPrice),
			toothPrice: p.toothPrice === null ? null : Number(p.toothPrice),
		}));
	} else {
		return {
			...pricingPlan,
			additionalToothPrice: pricingPlan.additionalToothPrice === null ? null : Number(pricingPlan.additionalToothPrice),
			bulkPrice: pricingPlan.bulkPrice === null ? null : Number(pricingPlan.bulkPrice),
			firstToothPrice: pricingPlan.firstToothPrice === null ? null : Number(pricingPlan.firstToothPrice),
			teethCountToApplyBulkPrice: pricingPlan.teethCountToApplyBulkPrice === null ? null : Number(pricingPlan.teethCountToApplyBulkPrice),
			toothPrice: pricingPlan.toothPrice === null ? null : Number(pricingPlan.toothPrice),
		};
	}
}

// export function caseServerToFrontDTO(
// 	dentalCase: CaseModel & {
// 		caseItems: CaseWorkItemModel[];
// 		staffAssignments: CaseStaffAssignmentWithStaffMember[];
// 	},
// ): CaseDetailsUI | null {
// 	return {
// 		...dentalCase,
// 		grandTotal: dentalCase.grandTotal ? Number(dentalCase.grandTotal) : null,
// 		caseItems: caseWorkItemServerToFrontDTO(dentalCase.caseItems),
// 		staffAssignments: staffAssignmentServerToFrontDTO(dentalCase.staffAssignments),
// 		clinic: null,
// 	};
// }

// type ProductWithWorkType = ProductModel & {
// 	workType: WorkTypeModel | undefined;
// };

export function serverCaseToCaseDetailsDTOMapper(
	dentalCase:
		| (CaseModel & {
				caseItems: CaseItemsWithDetails[];
				staffAssignments: CaseStaffAssignmentWithStaffMember[] | null;
				caseCategory: CaseCategoryModel | null;
				clinic: ClinicModel | null;
				caseAssetFiles: CaseAssetFileModel[] | null;
				lab: LabModel | null;
				patient: PatientModel | null;
				dentist: DentistModel | null;
		  })
		| null,
): CaseDetailsUI | null {
	if (!dentalCase) return null;

	return {
		...dentalCase,
		grandTotal: dentalCase.grandTotal ? Number(dentalCase.grandTotal) : null,
		staffAssignments: dentalCase.staffAssignments ? staffAssignmentServerToFrontDTO(dentalCase.staffAssignments) : null,
		caseItems: dentalCase.caseItems.map((cwi) => ({
			...cwi,
			casePricingPlan: cwi.casePricingPlan ? (pricingPlansNormalizer(cwi.casePricingPlan) as CasePricingPlanBase) : null,
			additionalToothPrice: cwi.additionalToothPrice === null ? null : Number(cwi.additionalToothPrice),
			bulkPrice: cwi.bulkPrice === null ? null : Number(cwi.bulkPrice),
			firstToothPrice: cwi.firstToothPrice === null ? null : Number(cwi.firstToothPrice),
			teethCountToApplyBulkPrice: cwi.teethCountToApplyBulkPrice === null ? null : Number(cwi.teethCountToApplyBulkPrice),
			toothPrice: cwi.toothPrice === null ? null : Number(cwi.toothPrice),
			totalPrice: Number(cwi.totalPrice),
			product: cwi.product,
			workType: cwi.workType,
			Lab: null,
			dentalCase: null,
			selectedTeeth: cwi.selectedTeeth,
		})),

		clinic: dentalCase.clinic ? clinicNormalizer(dentalCase.clinic) : null,
	};
}

// ── Draft normalizers ──────────────────────────────────────────────────────

type DraftCaseRaw = CaseModel & {
	patient: Pick<PatientModel, "id" | "name">;
	clinic: Pick<ClinicModel, "id" | "name" | "city"> | null;
	caseItems: (CaseWorkItemModel & {
		selectedTeeth: Pick<SelectedToothModel, "toothPosition">[];
	})[];
	staffAssignments: Partial<CaseStaffAssignmentModel>[];
	caseAssetFiles: Partial<CaseAssetFileModel>[];
};

export function draftCaseServerToDTO(raw: DraftCaseRaw): DraftCaseDTO {
	return {
		// CaseBase fields — normalize Decimals
		id: raw.id,
		patientId: raw.patientId,
		caseNumber: raw.caseNumber,
		labId: raw.labId,
		caseCategoryId: raw.caseCategoryId,
		status: raw.status,
		grandTotal: raw.grandTotal !== null ? Number(raw.grandTotal) : null,
		clinicId: raw.clinicId,
		dentistId: raw.dentistId,
		deadline: raw.deadline,
		notes: raw.notes,
		createdAt: raw.createdAt,
		updatedAt: raw.updatedAt,
		caseCategory: null,
		// Relations
		patient: raw.patient,
		clinic: raw.clinic,

		caseItems: raw.caseItems.map((item) => ({
			...item,
			totalPrice: Number(item.totalPrice),
			bulkPrice: item.bulkPrice !== null ? Number(item.bulkPrice) : null,
			toothPrice: item.toothPrice !== null ? Number(item.toothPrice) : null,
			firstToothPrice: item.firstToothPrice !== null ? Number(item.firstToothPrice) : null,
			additionalToothPrice: item.additionalToothPrice !== null ? Number(item.additionalToothPrice) : null,
			teethCountToApplyBulkPrice: item.teethCountToApplyBulkPrice !== null ? Number(item.teethCountToApplyBulkPrice) : null,
			selectedTeeth: item.selectedTeeth,
		})),

		staffAssignments: raw.staffAssignments
			.filter((sa) => sa !== undefined)
			.map((s) => ({
				...s,
				commissionValue: Number(s.commissionValue),
				commissionTotal: Number(s.commissionTotal),
			})),

		caseAssetFiles: raw.caseAssetFiles.filter((caf) => caf !== undefined),
	};
}

export function optionalSelectiveDraftCaseServerToDTO(raw: DraftCaseRaw): DraftCaseDTO {
	return {
		// CaseBase fields — normalize Decimals
		id: raw.id,
		patientId: raw.patientId,
		caseNumber: raw.caseNumber,
		labId: raw.labId,
		caseCategoryId: raw.caseCategoryId,
		status: raw.status,
		grandTotal: raw.grandTotal !== null ? Number(raw.grandTotal) : null,
		clinicId: raw.clinicId,
		dentistId: raw.dentistId,
		deadline: raw.deadline,
		notes: raw.notes,
		createdAt: raw.createdAt,
		updatedAt: raw.updatedAt,
		caseCategory: null,

		// Relations
		patient: raw.patient,
		clinic: raw.clinic,

		caseItems: raw.caseItems.map((item) => ({
			...item,
			totalPrice: Number(item.totalPrice),
			bulkPrice: item.bulkPrice !== null ? Number(item.bulkPrice) : null,
			toothPrice: item.toothPrice !== null ? Number(item.toothPrice) : null,
			firstToothPrice: item.firstToothPrice !== null ? Number(item.firstToothPrice) : null,
			additionalToothPrice: item.additionalToothPrice !== null ? Number(item.additionalToothPrice) : null,
			teethCountToApplyBulkPrice: item.teethCountToApplyBulkPrice !== null ? Number(item.teethCountToApplyBulkPrice) : null,
			selectedTeeth: item.selectedTeeth,
		})),

		staffAssignments: raw.staffAssignments
			.filter((s) => s !== undefined)
			.map((s) => ({
				...s,
				commissionValue: Number(s.commissionValue),
				commissionTotal: Number(s.commissionTotal),
			})),

		caseAssetFiles: raw.caseAssetFiles.filter((caf) => caf !== undefined),
	};
}

export function draftSummaryServerToDTO(raw: { id: string; caseNumber: string; updatedAt: Date; patient: { name: string }; clinic: { name: string } | null }): DraftCaseSummaryDTO {
	return {
		id: raw.id,
		caseNumber: raw.caseNumber,
		lastSavedAt: raw.updatedAt,
		patientName: raw.patient.name,
		clinicName: raw.clinic?.name ?? null,
	};
}

// ========================== Helpers =====================
export const computeCaseItemPrice = (pricingPlan: CasePricingPlanModel, selectedTeeth: ToothPosition[], jawType: JawType) => {
	if (!pricingPlan) return 0;
	const count = selectedTeeth.length;

	// If JawType is OTHER (No charting), assume count is 1 for pricing purposes if needed,
	// though flat rates usually apply here.
	const effectiveCount = jawType === "OTHER" && count === 0 ? 1 : count;

	// Don't charge if no teeth selected (unless it's a flat bulk rate)
	if (effectiveCount === 0 && pricingPlan.pricingStrategy !== "BULK") return 0;

	switch (pricingPlan.pricingStrategy) {
		case "BULK":
			return Number(pricingPlan.bulkPrice || 0);

		case "PERTOOTH":
			// Standard multiplication
			return effectiveCount * Number(pricingPlan.toothPrice || 0);

		case "CUSTOM":
			// 1. Check if they hit the Bulk Cap interval first!
			if (pricingPlan.teethCountToApplyBulkPrice && pricingPlan.bulkPrice && effectiveCount >= Number(pricingPlan.teethCountToApplyBulkPrice)) {
				return Number(pricingPlan.bulkPrice);
			}

			// 2. Otherwise, apply Tiered Pricing (1st tooth = X, rest = Y), if total teeth count >= bulkThreshold, apply bulkPrice
			const firstPrice = Number(pricingPlan.firstToothPrice || 0);
			const additionalPrice = Number(pricingPlan.additionalToothPrice || 0);

			if (effectiveCount === 1) return firstPrice;
			return firstPrice + additionalPrice * (effectiveCount - 1);

		default:
			return 0;
	}
};
