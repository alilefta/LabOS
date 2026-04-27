"use client";

import { memo } from "react";

// Types
import { DraftCaseSummaryDTO, UpdateCaseAssetFilesInput } from "@/schema/composed/case.details";
import { CreateCaseAssetFilesInput } from "@/schema/composed/case-asset-file.details";
import { StaffRoleCategory } from "@/schema/base/enums.base";
import { PatientDetails } from "@/schema/composed/patient.details";
import { ClinicDetailsUI } from "@/schema/composed/clinic.details";
import { CaseCategoryDetailsUI } from "@/schema/composed/case-category.details";
import { LabStaffDetailsUI } from "@/schema/composed/lab-staff.details";

// Sections
import { LogisticsAndRoutingSection } from "@/components/cases/new-case/sections/logisitc-and-routing-section";
import { GlobalCaseNotesSection } from "@/components/cases/new-case/sections/global-case-notes-section";
import { AssetsAndFilesSection } from "@/components/cases/new-case/sections/assets-and-files-section";
import { PatientAndClinicSection } from "@/components/cases/new-case/sections/patient-clinic-section";
import { HierarchicalClinicalPicker } from "@/components/cases/new-case/sections/hierarchical-clinical-picker";

// Draft Components
import { PatientDraftPrompt } from "../new-case/drafts/patient-draft-prompt";
import { DraftRecoveryBanner } from "../new-case/drafts/draft-recovery-banner";

interface CaseFormContentProps {
	mode: "create" | "edit";
	patientName?: string; // Required for display in edit mode

	// Drafts State (Only used in 'create' mode)
	isLoadingDrafts?: boolean;
	recentDrafts?: DraftCaseSummaryDTO[];
	existingDraftId?: string;
	patientDraftPrompt?: { draftId: string; caseNumber: string; lastSavedAt: Date } | null;

	// Handlers
	onResumeDraft?: (draftId: string) => void;
	onDismissPatientDraft?: () => void;
	onPatientSelect: (patientId: string) => void;
	onUploadAssets: (files: CreateCaseAssetFilesInput[] | UpdateCaseAssetFilesInput[]) => void;

	// Modal Triggers
	onOpenClinicSheet: () => void;
	onOpenPatientSheet: () => void;
	onOpenCategorySheet: () => void;
	onOpenStaffSheet: (roles: StaffRoleCategory[]) => void;

	// Newly Created Data
	newPatient: PatientDetails | null;
	newClinic: ClinicDetailsUI | null;
	newCategory: CaseCategoryDetailsUI | null;
	newStaffMember: LabStaffDetailsUI | null;
}

export const CaseFormContent = memo(function CaseFormContent({
	mode,
	patientName,
	isLoadingDrafts = false,
	recentDrafts = [],
	onResumeDraft,
	patientDraftPrompt,
	existingDraftId,
	onDismissPatientDraft,
	onOpenClinicSheet,
	newClinic,
	onPatientSelect,
	newPatient,
	onOpenPatientSheet,
	newCategory,
	onOpenCategorySheet,
	onUploadAssets,
	newStaffMember,
	onOpenStaffSheet,
}: CaseFormContentProps) {
	// Re-access form context to pass control/getValues to sub-sections if they don't use useFormContext themselves
	// const { control } = useFormContext<CreateCaseInput>();

	const isEdit = mode === "edit";

	return (
		<div className="flex-1 overflow-y-auto no-scrollbar pb-20 space-y-12">
			{/* ── DRAFT RECOVERY UI (Only visible in CREATE mode) ────────────────── */}
			{!isEdit && (
				<>
					{!isLoadingDrafts && recentDrafts.length > 0 && !existingDraftId && !patientDraftPrompt && onResumeDraft && (
						<DraftRecoveryBanner drafts={recentDrafts} onResumeDraft={onResumeDraft} />
					)}

					{patientDraftPrompt && onResumeDraft && onDismissPatientDraft && (
						<PatientDraftPrompt
							caseNumber={patientDraftPrompt.caseNumber}
							lastSavedAt={patientDraftPrompt.lastSavedAt}
							onResume={() => onResumeDraft(patientDraftPrompt.draftId)}
							onDismiss={onDismissPatientDraft}
						/>
					)}
				</>
			)}

			{/* ── SECTION 1: ORIGIN ────────────────────────────────────────────── */}
			<PatientAndClinicSection
				mode={mode}
				patientName={patientName}
				handleOpenClinicCreationSheet={onOpenClinicSheet}
				handleOpenPatientCreationSheet={onOpenPatientSheet}
				newCreatedPatient={newPatient}
				newCreatedClinic={newClinic}
				onPatientSelect={onPatientSelect}
			/>

			{/* ── SECTION 2: THE PRODUCT ────────────────────────────────────────── */}
			<HierarchicalClinicalPicker newCreatedCategory={newCategory} handleOpenCreateCategorySheet={onOpenCategorySheet} mode={mode} />

			{/* ── SECTION 3: ASSETS & FILES ─────────────────────────────────────── */}
			<AssetsAndFilesSection onUploadFiles={onUploadAssets} mode={mode} />

			{/* ── SECTION 4: CLINICAL NOTES ─────────────────────────────────────── */}
			<GlobalCaseNotesSection mode={mode} />

			{/* ── SECTION 5: LOGISTICS & ROUTING ────────────────────────────────── */}
			<LogisticsAndRoutingSection mode={mode} newRegisteredStaffMember={newStaffMember} handleOpenRegisterLabStaffSheet={onOpenStaffSheet} />
		</div>
	);
});
