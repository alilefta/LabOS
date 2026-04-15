import { CaseAssetFileModel, CaseModel, CaseStaffAssignmentModel, CaseWorkItemModel, ClinicModel, PatientModel, SelectedToothModel } from "@/generated/prisma/models";
import { CaseStaffAssignmentDetailsUI } from "@/schema/composed/case-staff-assignment.details";
import { CaseWorkItemDetailsUI } from "@/schema/composed/case-work-item.details";
import { CaseDetailsUI, DraftCaseDTO, DraftCaseSummaryDTO } from "@/schema/composed/case.details";

export function caseWorkItemServerToFrontDTO(caseWorkItems: CaseWorkItemModel[]): CaseWorkItemDetailsUI[] {
	return caseWorkItems.map((cw) => ({
		...cw,
		additionalToothPrice: cw.additionalToothPrice === null ? null : Number(cw.additionalToothPrice),
		bulkPrice: cw.bulkPrice === null ? null : Number(cw.bulkPrice),
		firstToothPrice: cw.firstToothPrice === null ? null : Number(cw.firstToothPrice),
		teethCountToApplyBulkPrice: cw.teethCountToApplyBulkPrice === null ? null : Number(cw.teethCountToApplyBulkPrice),
		toothPrice: cw.toothPrice === null ? null : Number(cw.toothPrice),
		totalPrice: Number(cw.totalPrice),
	}));
}

export function staffAssignmentServerToFrontDTO(caseStaffAssignments: CaseStaffAssignmentModel[]): CaseStaffAssignmentDetailsUI[] {
	return caseStaffAssignments.map((csa) => ({
		...csa,
		commissionTotal: Number(csa.commissionTotal),
		commissionValue: Number(csa.commissionValue),
	}));
}

export function caseServerToFrontDTO(
	dentalCase: CaseModel & {
		caseItems: CaseWorkItemModel[];
		staffAssignments: CaseStaffAssignmentModel[];
	},
): CaseDetailsUI {
	return {
		...dentalCase,
		grandTotal: dentalCase.grandTotal ? Number(dentalCase.grandTotal) : null,
		caseItems: caseWorkItemServerToFrontDTO(dentalCase.caseItems),
		staffAssignments: staffAssignmentServerToFrontDTO(dentalCase.staffAssignments),
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
