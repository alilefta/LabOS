// lib/mappers/normalizers.ts
// ─────────────────────────────────────────────────────────────────────────────
// RULE: Each normalizer handles ONE model's Decimal → number conversion only.
// Relations are handled by the COMPOSER functions below, not here.
// This is what prevents circular dependencies.
// ─────────────────────────────────────────────────────────────────────────────

import type * as runtime from "@prisma/client/runtime/client";
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
	LabModel,
	LabStaffModel,
	PatientModel,
	ProductModel,
	SelectedToothModel,
	WorkTypeModel,
} from "@/generated/prisma/models";
import { ClinicBase } from "@/schema/base/clinic.base";
import { CasePricingPlanBase } from "@/schema/base/case-pricing-plan.base";
import { CaseWorkItemBase } from "@/schema/base/case-work-item.base";
import { CaseStaffAssignmentBase } from "@/schema/base/case-staff-assignment.base";
import { LabStaffBase } from "@/schema/base/lab-staff.base";
import { CaseBase } from "@/schema/base/case.base";
import { PatientBase } from "@/schema/base/patient.base";
import { DentistBase } from "@/schema/base/dentist.base";
import { ProductBase } from "@/schema/base/product.base";
import { CaseCategoryBase } from "@/schema/base/case-category.base";
import { SelectedToothBase } from "@/schema/base/selected-tooth.base";
import { LabBase } from "@/schema/base/lab.base";
import { WorktypeBase } from "@/schema/base/worktype.base";
import { CaseAssetFileBase } from "@/schema/base/case-asset-file.base";
import { CaseActivityLogBase } from "@/schema/base/case-activity-logs.base";
import { CaseActivityPayload, CaseActivityPayloadSchema } from "@/schema/composed/case-activity-logs.details";

// ─── Decimal utility ──────────────────────────────────────────────────────────

const d = (val: runtime.Decimal | null | undefined): number | null => (val == null ? null : Number(val));

const dStrict = (val: runtime.Decimal | null | undefined, fallback = 0): number => (val == null ? fallback : Number(val));

// ─── Atomic normalizers ───────────────────────────────────────────────────────
// Each takes a raw Prisma model and returns the plain-number base type.
// No relations — just scalar field normalization.

export function normalizeClinic(raw: ClinicModel): ClinicBase {
	return {
		...raw,
		discount: d(raw.discount),
		creditLimit: d(raw.creditLimit),
		currentBalance: dStrict(raw.currentBalance),
	};
}

export function normalizePricingPlan(raw: CasePricingPlanModel): CasePricingPlanBase {
	return {
		...raw,
		bulkPrice: d(raw.bulkPrice),
		toothPrice: d(raw.toothPrice),
		firstToothPrice: d(raw.firstToothPrice),
		additionalToothPrice: d(raw.additionalToothPrice),
		teethCountToApplyBulkPrice: d(raw.teethCountToApplyBulkPrice),
	};
}

export function normalizeWorkItem(raw: CaseWorkItemModel): CaseWorkItemBase {
	return {
		...raw,
		totalPrice: dStrict(raw.totalPrice),
		bulkPrice: d(raw.bulkPrice),
		toothPrice: d(raw.toothPrice),
		firstToothPrice: d(raw.firstToothPrice),
		additionalToothPrice: d(raw.additionalToothPrice),
		teethCountToApplyBulkPrice: d(raw.teethCountToApplyBulkPrice),
	};
}

export function normalizeStaffAssignment(raw: CaseStaffAssignmentModel): CaseStaffAssignmentBase {
	return {
		...raw,
		commissionValue: dStrict(raw.commissionValue),
		commissionTotal: dStrict(raw.commissionTotal),
	};
}

export function normalizeLabStaff(raw: LabStaffModel): LabStaffBase {
	return {
		...raw,
		commissionValue: d(raw.commissionValue),
	};
}

export function normalizeCase(raw: CaseModel): CaseBase {
	return {
		...raw,
		grandTotal: d(raw.grandTotal),
	};
}

export function parseActivityPayload(log: CaseActivityLogBase): CaseActivityPayload | null {
	const result = CaseActivityPayloadSchema.safeParse({
		type: log.type,
		payload: log.payload ?? {},
	});

	if (!result.success) {
		console.error("[ActivityLog] Failed to parse payload", log.id, result.error);
		return null;
	}

	return result.data;
}

export function normalizeCaseActivity(raw: CaseActivityLogModel): CaseActivityLogBase {
	return {
		...raw,
		payload: parseActivityPayload(raw) as CaseActivityPayload,
	};
}

// These models have no Decimals — passthrough with type assertion
// so callers don't have to cast
export const normalizePatient = (raw: PatientModel): PatientBase => raw as PatientBase;
export const normalizeDentist = (raw: DentistModel): DentistBase => raw as DentistBase;
export const normalizeProduct = (raw: ProductModel): ProductBase => raw as ProductBase;
export const normalizeWorkType = (raw: WorkTypeModel): WorktypeBase => raw as WorktypeBase;
export const normalizeCaseCategory = (raw: CaseCategoryModel): CaseCategoryBase => raw as CaseCategoryBase;
export const normalizeAssetFile = (raw: CaseAssetFileModel): CaseAssetFileBase => raw as CaseAssetFileBase;
export const normalizeSelectedTooth = (raw: SelectedToothModel): SelectedToothBase => raw as SelectedToothBase;
export const normalizeLab = (raw: LabModel): LabBase => raw as LabBase;
