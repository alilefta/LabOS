"use client";

import { DraftCaseSummaryDTO } from "@/schema/composed/case.details";

import { LogisticsAndRoutingSection } from "./sections/logisitc-and-routing-section";
import { GlobalCaseNotesSection } from "./sections/global-case-notes-section";
import { AssetsAndFilesSection } from "./sections/assets-and-files-section";
import { PatientAndClinicSection } from "./sections/patient-clinic-section";
import { PatientDraftPrompt } from "./drafts/patient-draft-prompt";
import { DraftRecoveryBanner } from "./drafts/draft-recovery-banner";
import { HierarchicalClinicalPicker } from "./sections/hierarchical-clinical-picker";
import { CreateCaseAssetFilesInput } from "@/schema/composed/case-asset-file.details";
import { StaffRoleCategory } from "@/schema/base/enums.base";
import { PatientDetails } from "@/schema/composed/patient.details";
import { ClinicDetailsUI } from "@/schema/composed/clinic.details";
import { CaseCategoryDetailsUI } from "@/schema/composed/case-category.details";
import { LabStaffDetailsUI } from "@/schema/composed/lab-staff.details";
import { memo } from "react";

interface NewCaseFormContentProps {
	// Drafts State
	isLoadingDrafts: boolean;
	recentDrafts: DraftCaseSummaryDTO[];
	existingDraftId?: string;
	patientDraftPrompt: { draftId: string; caseNumber: string; lastSavedAt: Date } | null;

	// Handlers
	onResumeDraft: (draftId: string) => void;
	onDismissPatientDraft: () => void;
	onPatientSelect: (patientId: string) => void;
	onUploadAssets: (files: CreateCaseAssetFilesInput[]) => void;

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

export const NewCaseFormContent = memo(function NewCaseFormContent({
	isLoadingDrafts,
	recentDrafts,
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
}: NewCaseFormContentProps) {
	return (
		<div className="flex-1 overflow-y-auto no-scrollbar pb-20 space-y-12">
			{/* DRAFTS BANNER (Global) */}
			{!isLoadingDrafts && recentDrafts.length > 0 && !existingDraftId && !patientDraftPrompt && <DraftRecoveryBanner drafts={recentDrafts} onResumeDraft={onResumeDraft} />}

			{/* DRAFTS PROMPT (Contextual to Patient) */}
			{patientDraftPrompt && (
				<PatientDraftPrompt
					caseNumber={patientDraftPrompt.caseNumber}
					lastSavedAt={patientDraftPrompt.lastSavedAt}
					onResume={() => onResumeDraft(patientDraftPrompt.draftId)}
					onDismiss={onDismissPatientDraft}
				/>
			)}

			{/* SECTION 1: ORIGIN */}
			<PatientAndClinicSection
				handleOpenClinicCreationSheet={onOpenClinicSheet}
				handleOpenPatientCreationSheet={onOpenPatientSheet}
				newCreatedPatient={newPatient}
				newCreatedClinic={newClinic}
				onPatientSelect={onPatientSelect}
			/>
			{/* SECTION 2: THE PRODUCT */}
			<HierarchicalClinicalPicker newCreatedCategory={newCategory} handleOpenCreateCategorySheet={onOpenCategorySheet} />

			{/* SECTION 3: Assets & FILES */}
			<AssetsAndFilesSection onUploadFiles={onUploadAssets} />

			{/* SECTION 4: CLINICAL NOTES */}
			<GlobalCaseNotesSection />

			{/* SECTION 5: LOGISTICS & ROUTING */}
			<LogisticsAndRoutingSection newRegisteredStaffMember={newStaffMember} handleOpenRegisterLabStaffSheet={onOpenStaffSheet} />
		</div>
	);
});
