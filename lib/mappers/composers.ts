// lib/mappers/composers.ts
// ─────────────────────────────────────────────────────────────────────────────
// RULE: Composers assemble DTOs from normalized atoms.
// Each composer declares its own input shape (the Prisma include shape it needs).
// This is what makes them independently maintainable — no shared mutable state,
// no implicit dependency on a specific top-level query.
// ─────────────────────────────────────────────────────────────────────────────

import type {
	CaseActivityLogModel,
	CaseAssetFileModel,
	CaseCategoryModel,
	CaseModel,
	CasePricingPlanModel,
	CaseStaffAssignmentModel,
	CaseWorkItemModel,
	ClinicModel,
	DentistModel,
	LabStaffModel,
	LabUserModel,
	PatientModel,
	ProductModel,
	SelectedToothModel,
	WorkTypeModel,
} from "@/generated/prisma/models";

import {
	normalizeCase,
	normalizeClinic,
	normalizeLabStaff,
	normalizePricingPlan,
	normalizeStaffAssignment,
	normalizeWorkItem,
	normalizeAssetFile,
	normalizeSelectedTooth,
	normalizeProduct,
	normalizeWorkType,
	normalizeDentist,
	normalizePatient,
	normalizeCaseCategory,
	normalizeCaseActivity,
} from "./normalizers";
import { CaseWorkItemDetailsUI } from "@/schema/composed/case-work-item.details";
import { CaseStaffAssignmentDetailsUI } from "@/schema/composed/case-staff-assignment.details";
import { CaseDetailsUI, DraftCaseDTO, DraftCaseSummaryDTO } from "@/schema/composed/case.details";

// ─── Input shapes ─────────────────────────────────────────────────────────────
// Declare exactly what each composer needs from Prisma.
// These are the "contracts" between your query selects and your mappers.
// If you change a query, TypeScript will catch the mismatch here.

type RawCaseActivityLog = CaseActivityLogModel & {
	actor: LabUserModel | null;
};

type RawWorkItem = CaseWorkItemModel & {
	product: ProductModel | null;
	workType: WorkTypeModel | null;
	casePricingPlan: CasePricingPlanModel | null;
	selectedTeeth: SelectedToothModel[];
};

type RawStaffAssignment = CaseStaffAssignmentModel & {
	staff: LabStaffModel | null;
};

type RawFullCase = CaseModel & {
	patient: PatientModel | null;
	clinic: ClinicModel | null;
	dentist: DentistModel | null;
	caseCategory: CaseCategoryModel | null;
	caseItems: RawWorkItem[];
	staffAssignments: RawStaffAssignment[];
	caseAssetFiles: CaseAssetFileModel[];
	caseActivityLogs: RawCaseActivityLog[];
};

// Drafts use a narrower shape — only what's needed to repopulate the form
type RawDraftCase = CaseModel & {
	patient: Pick<PatientModel, "id" | "name">;
	clinic: Pick<ClinicModel, "id" | "name" | "city"> | null;
	caseCategory: Pick<CaseCategoryModel, "id" | "name"> | null;
	caseItems: (CaseWorkItemModel & {
		selectedTeeth: Pick<SelectedToothModel, "toothPosition">[];
		product: Pick<ProductModel, "id" | "name"> | null;
		workType: Pick<WorkTypeModel, "id" | "name"> | null;
	})[];
	staffAssignments: Pick<CaseStaffAssignmentModel, "staffId" | "roleCategory" | "commissionType" | "commissionValue">[];
	caseAssetFiles: CaseAssetFileModel[];
};

// ─── Composers ────────────────────────────────────────────────────────────────

export function composeWorkItem(raw: RawWorkItem): CaseWorkItemDetailsUI {
	return {
		...normalizeWorkItem(raw),
		product: raw.product ? normalizeProduct(raw.product) : null,
		workType: raw.workType ? normalizeWorkType(raw.workType) : null,
		casePricingPlan: raw.casePricingPlan ? normalizePricingPlan(raw.casePricingPlan) : null,
		selectedTeeth: raw.selectedTeeth.map(normalizeSelectedTooth),
		lab: null,
		dentalCase: null,
	};
}

export function composeStaffAssignment(raw: RawStaffAssignment): CaseStaffAssignmentDetailsUI {
	return {
		...normalizeStaffAssignment(raw),
		staff: raw.staff ? normalizeLabStaff(raw.staff) : null,
		dentalCase: null,
		lab: null,
	};
}

export function composeCaseDTO(raw: RawFullCase): CaseDetailsUI {
	return {
		...normalizeCase(raw),
		patient: raw.patient ? normalizePatient(raw.patient) : null,
		clinic: raw.clinic ? normalizeClinic(raw.clinic) : null,
		dentist: raw.dentist ? normalizeDentist(raw.dentist) : null,
		caseCategory: raw.caseCategory ? normalizeCaseCategory(raw.caseCategory) : null,
		caseItems: raw.caseItems.map(composeWorkItem),
		staffAssignments: raw.staffAssignments.map(composeStaffAssignment),
		caseAssetFiles: raw.caseAssetFiles.map(normalizeAssetFile),
		lab: null,
		caseActivityLogs: raw.caseActivityLogs.map(normalizeCaseActivity),
	};
}

export function composeDraftCaseDTO(raw: RawDraftCase): DraftCaseDTO {
	return {
		...normalizeCase(raw),
		patient: raw.patient,
		clinic: raw.clinic ?? null,
		caseCategory: raw.caseCategory ?? null,
		caseItems: raw.caseItems.map((item) => ({
			...normalizeWorkItem(item),
			product: item.product ?? null,
			workType: item.workType ?? null,
			selectedTeeth: item.selectedTeeth,
			casePricingPlan: null,
			lab: null,
			dentalCase: null,
		})),
		staffAssignments: raw.staffAssignments.map((s) => ({
			staffId: s.staffId,
			roleCategory: s.roleCategory,
			commissionType: s.commissionType,
			commissionValue: Number(s.commissionValue),
		})),
		caseAssetFiles: raw.caseAssetFiles.map(normalizeAssetFile),
	};
}

export function composeDraftSummaryDTO(raw: { id: string; caseNumber: string; updatedAt: Date; patient: Pick<PatientModel, "name">; clinic: Pick<ClinicModel, "name"> | null }): DraftCaseSummaryDTO {
	return {
		id: raw.id,
		caseNumber: raw.caseNumber,
		lastSavedAt: raw.updatedAt,
		patientName: raw.patient.name,
		clinicName: raw.clinic?.name ?? null,
	};
}
