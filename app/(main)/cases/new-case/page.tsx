"use client";

import { CaseAiAuditor } from "@/components/cases/new-case/case-ai-auditor";

import { CaseSummaryModal } from "@/components/cases/case/case-summary-modal";
import { useCallback, useEffect, useMemo, useState } from "react";
import { NewCaseHeader } from "@/components/cases/new-case/new-case-header";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { CaseFileUploadZone } from "@/components/cases/case/case-inputs/case-file-upload-zone";
import { ClinicalAssetPreview } from "@/components/cases/case/clinical-assets-preview";
import { CreateCaseInput, CreateCaseInputSchema, SaveDraftCaseInputSchema } from "@/schema/composed/case.details";
import { PatientAndClinicSection } from "@/components/cases/new-case/sections/patient-clinic-section";
import { RegisterPatientSheet } from "@/components/modals/cases/patient/create-patient-sheet";

import { PatientDetails } from "@/schema/composed/patient.details";
import { RegisterClinicSheet } from "@/components/modals/cases/clinic/register-clinic-sheet";

import { ClinicDetailsUI } from "@/schema/composed/clinic.details";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCategorySheet } from "@/components/modals/case-category/create-case-category-sheet";
import { CaseCategoryDetailsUI } from "@/schema/composed/case-category.details";
import { CreateWorkTypeSheet } from "@/components/modals/work-type/create-work-type-sheet";
import { HierarchicalClinicalPicker } from "@/components/cases/new-case/sections/hierarchical-clinical-picker";
import { CreateProductSheet } from "@/components/modals/product/create-product-sheet";
import { CreatePricingPlanSheet } from "@/components/modals/pricing/create-pricing-plan-sheet";
import { CreateCaseAssetFilesInput } from "@/schema/composed/case-asset-file.details";
import { toast } from "sonner";
import { LogisticsAndRoutingSection } from "@/components/cases/new-case/sections/logisitc-and-routing-section";
import { RegisterStaffSheet } from "@/components/modals/cases/staff/register-staff-sheet";
import { LabStaffDetailsUI } from "@/schema/composed/lab-staff.details";
import { StaffRoleCategory } from "@/schema/base/enums.base";
import { useAction } from "next-safe-action/hooks";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { GlobalCaseNotesSection } from "@/components/cases/new-case/sections/global-case-notes-section";
import { createDentalCaseAction, getDraftByPatientAction, getRecentDraftsAction, loadDraftByIdAction, saveDraftCaseAction } from "@/actions/case";
import { useRouter } from "next/navigation";
import { DraftRecoveryBanner } from "@/components/cases/new-case/drafts/draft-recovery-banner";
import { useQuery } from "@tanstack/react-query";
import { PatientDraftPrompt } from "@/components/cases/new-case/drafts/patient-draft-prompt";
import { mapDraftToFormValues } from "@/lib/case-helpers";

export default function NewCasePage() {
	// 1. The Boss holds the temporary data
	const [draftData, setDraftData] = useState<CreateCaseInput | null>(null);
	const [isSummaryOpen, setIsSummaryOpen] = useState(false);
	const [openCreateNewPatientSheet, setOpenCreateNewPatientSheet] = useState(false);
	const [openCreateNewClinicSheet, setOpenCreateNewClinicSheet] = useState(false);
	const [openCreateNewCategory, setOpenCreateNewCategory] = useState(false);

	const [registerNewStaffMemberState, setRegisterNewStaffMemberState] = useState<{
		open: boolean;
		requiredRoles: StaffRoleCategory[];
	}>({
		open: false,
		requiredRoles: [],
	});

	const [newPatient, setNewPatient] = useState<PatientDetails | null>(null);
	const [newStaffMember, setNewStaffMember] = useState<LabStaffDetailsUI | null>(null);
	const [newClinic, setNewClinic] = useState<ClinicDetailsUI | null>(null);
	const [newCategory, setNewCategory] = useState<CaseCategoryDetailsUI | null>(null);

	const router = useRouter();

	const handleOpenClinicSheet = useCallback(() => setOpenCreateNewClinicSheet(true), []);
	const handleOpenPatientSheet = useCallback(() => setOpenCreateNewPatientSheet(true), []);
	const handleOpenCategorySheet = useCallback(() => setOpenCreateNewCategory(true), []);
	const handleOpenStaffSheet = useCallback((roles: StaffRoleCategory[]) => {
		setRegisterNewStaffMemberState({ open: true, requiredRoles: roles });
	}, []);

	const [patientDraftPrompt, setPatientDraftPrompt] = useState<{
		draftId: string;
		caseNumber: string;
		lastSavedAt: Date;
	} | null>(null);

	// ── Recent drafts for banner ───────────────────────────────────────
	const { data: recentDraftsData, isLoading: isLoadingDrafts } = useQuery({
		queryKey: ["recent-drafts"],
		queryFn: async () => {
			const res = await getRecentDraftsAction({ limit: 5 });
			return res?.data?.drafts ?? [];
		},
	});

	const recentDrafts = recentDraftsData ?? [];

	const { executeAsync: saveDraft, isExecuting: isExecutingSavingDraft } = useAction(saveDraftCaseAction, {
		onSuccess: ({ data }) => {
			// Store the draft id so subsequent saves update instead of create
			setExistingDraftId(data.draftCase.id);
			toast.success("Draft saved. You can safely exit.");
		},
		onError: ({ error }) => handleSafeActionError(error),
	});

	const { executeAsync: createCase, isExecuting: isCreatingCase } = useAction(createDentalCaseAction, {
		onSuccess: ({ data }) => {
			toast.success(`Case ${data.dentalCase.caseNumber} submitted successfully.`);
			router.push(`/cases/${data.dentalCase.id}`);
		},
		onError: ({ error }) => handleSafeActionError(error),
	});

	// Track the draft id for upsert behaviour
	const [existingDraftId, setExistingDraftId] = useState<string | undefined>(undefined);

	const form = useForm<CreateCaseInput>({
		resolver: zodResolver(CreateCaseInputSchema),

		defaultValues: {
			caseWorkItems: [],
			caseAssetFiles: undefined,
			grandTotal: undefined,
			caseCategoryId: "",
			clinicId: "",
			dentistId: undefined,
			deadline: undefined,
			patientId: "",
			notes: undefined,
			status: "NEW",
		},
	});

	const isExecuting = false;

	// ── SUBMIT FLOW ────────────────────────────────────────────────────
	// RHF validates with full CreateCaseInputSchema (status: "NEW")
	// superRefine enforces all required fields
	const handleFormValid = useCallback((data: CreateCaseInput) => {
		// Filter ghost rows before showing summary
		const cleanData: CreateCaseInput = {
			...data,
			status: "NEW",
			caseWorkItems: (data.caseWorkItems ?? []).filter((item) => item.productId && item.casePricingPlanId),
		};
		setDraftData(cleanData);
		setIsSummaryOpen(true);
	}, []);

	const handleFinalConfirm = useCallback(async () => {
		if (!draftData) return;
		await createCase(draftData);
	}, [draftData, createCase]);

	// ── DRAFT FLOW ─────────────────────────────────────────────────────
	// Bypass RHF entirely — validate with SaveDraftCaseInputSchema directly
	const handleSaveDraft = useCallback(async () => {
		const rawValues = form.getValues();

		// Validate with the permissive draft schema
		const draftResult = SaveDraftCaseInputSchema.safeParse({
			...rawValues,
			// Filter ghost rows
			caseWorkItems: (rawValues.caseWorkItems ?? []).filter((item) => item.productId || item.casePricingPlanId || (item.selectedTeeth?.length ?? 0) > 0),
			existingDraftId,
		});

		if (!draftResult.success) {
			// Only patientId can fail here
			const patientError = draftResult.error.issues.find((i) => i.path[0] === "patientId");

			if (patientError) {
				toast.error("A patient must be selected to save a draft.");
				form.setError("patientId", { message: patientError.message });
				document.getElementsByName("patientId")[0]?.scrollIntoView({ behavior: "smooth", block: "center" });
			} else {
				toast.error("Could not save draft. Please check the form.");
			}
			return;
		}

		await saveDraft(draftResult.data);
	}, [form, saveDraft, existingDraftId]);

	const handleUploadedAssets = useCallback(
		(files: CreateCaseAssetFilesInput[]) => {
			const current = form.getValues("caseAssetFiles") ?? [];
			form.setValue("caseAssetFiles", [...current, ...files], { shouldValidate: true });
		},
		[form],
	);

	// ── Patient draft detection ────────────────────────────────────────
	// Called from PatientAndClinicSection when a patient is selected
	const handlePatientSelect = useCallback(
		async (patientId: string) => {
			form.setValue("patientId", patientId, { shouldValidate: true });

			// Don't check if we already have a draft loaded
			if (existingDraftId) return;

			const res = await getDraftByPatientAction({ patientId });
			const draft = res?.data?.draft;

			if (draft) {
				setPatientDraftPrompt({
					draftId: draft.id,
					caseNumber: draft.caseNumber,
					lastSavedAt: draft.updatedAt,
				});
			} else {
				setPatientDraftPrompt(null);
			}
		},
		[form, existingDraftId],
	);

	// ── Resume draft ───────────────────────────────────────────────────
	const handleResumeDraft = useCallback(
		async (draftId: string) => {
			const res = await loadDraftByIdAction({ draftId });
			const draft = res?.data?.draft;

			if (!draft) {
				toast.error("Could not load draft.");
				return;
			}

			// Hydrate the form with draft data
			form.reset(mapDraftToFormValues(draft));
			setExistingDraftId(draftId);
			setPatientDraftPrompt(null);

			toast.success(`Draft ${draft.caseNumber} loaded.`);
		},
		[form],
	);

	const handleDismissPatientDraft = useCallback(() => {
		setPatientDraftPrompt(null);
	}, []);

	useEffect(() => {
		console.log(form.formState.dirtyFields);
	}, [form.formState.dirtyFields]);

	// ── SUBMIT BUTTON ENABLED ──────────────────────────────────────────
	// Watch only patientId, clinicId, caseCategoryId, deadline for header button state
	// Don't use form.formState.isValid — it's only true after a submit attempt with mode: "onSubmit"
	const patientId = useWatch({ control: form.control, name: "patientId" });
	const clinicId = useWatch({ control: form.control, name: "clinicId" });
	const caseCategoryId = useWatch({ control: form.control, name: "caseCategoryId" });
	const deadline = useWatch({ control: form.control, name: "deadline" });
	const caseWorkItems = useWatch({ control: form.control, name: "caseWorkItems" });

	const isSubmitEnabled = useMemo(() => {
		const hasValidWorkItems = (caseWorkItems ?? []).some((item) => item.productId && item.casePricingPlanId);
		return !!patientId && !!clinicId && !!caseCategoryId && !!deadline && hasValidWorkItems;
	}, [patientId, clinicId, caseCategoryId, deadline, caseWorkItems]);

	return (
		<div className="flex flex-col h-full animate-in fade-in duration-700">
			<NewCaseHeader
				isSubmitForReviewEnabled={isSubmitEnabled}
				isSaveDraftEnabled={true}
				isSavingDraft={isExecutingSavingDraft}
				isSubmittingCase={isCreatingCase}
				onSaveDraft={handleSaveDraft}
				onSubmitCaseForReview={() => form.handleSubmit(handleFormValid)()}
			/>
			<div className="flex-1 min-h-0">
				<div className="flex flex-col xl:flex-row gap-8 h-full">
					{/* FORM SECTION (Left) */}
					<FormProvider {...form}>
						<form className="flex-1 overflow-y-auto no-scrollbar pb-32 space-y-12" id="new-case-submission-form" onSubmit={form.handleSubmit(handleFormValid)}>
							<div className="flex-1 overflow-y-auto no-scrollbar pb-20 space-y-12">
								{/* Generic banner — shown on page load if drafts exist */}
								{!isLoadingDrafts && recentDrafts.length > 0 && !existingDraftId && !patientDraftPrompt && (
									<DraftRecoveryBanner drafts={recentDrafts} onResumeDraft={handleResumeDraft} />
								)}

								{/* Patient-specific draft prompt */}
								{patientDraftPrompt && (
									<PatientDraftPrompt
										caseNumber={patientDraftPrompt.caseNumber}
										lastSavedAt={patientDraftPrompt.lastSavedAt}
										onResume={() => handleResumeDraft(patientDraftPrompt.draftId)}
										onDismiss={handleDismissPatientDraft}
									/>
								)}
								{/* SECTION 1: ORIGIN */}
								<PatientAndClinicSection
									handleOpenClinicCreationSheet={handleOpenClinicSheet}
									handleOpenPatientCreationSheet={handleOpenPatientSheet}
									newCreatedPatient={newPatient}
									newCreatedClinic={newClinic}
									onPatientSelect={handlePatientSelect}
								/>
								{/* SECTION 2: THE PRODUCT */}
								<HierarchicalClinicalPicker newCreatedCategory={newCategory} handleOpenCreateCategorySheet={handleOpenCategorySheet} />

								{/* SECTION 3: LOGISTICS & FILES */}
								<section className="space-y-8">
									<div className="flex items-center gap-3">
										<div className="w-1.5 h-6 bg-primary rounded-full" />
										<h2 className="text-xl font-bold tracking-tight">Technical Assets</h2>
									</div>

									<div className="grid grid-cols-1 gap-12">
										<CaseFileUploadZone onUploadFiles={handleUploadedAssets} />
										<ClinicalAssetPreview control={form.control} getValues={form.getValues} />
									</div>
								</section>

								{/* SECTION 4: CLINICAL NOTES */}
								<GlobalCaseNotesSection control={form.control} />

								{/* SECTION 5: LOGISTICS & ROUTING */}
								<LogisticsAndRoutingSection newRegisteredStaffMember={newStaffMember} handleOpenRegisterLabStaffSheet={handleOpenStaffSheet} />
							</div>
						</form>
					</FormProvider>
					{/* AI AUDITOR (Right) */}
					<div className="fixed bottom-0 left-0 right-0 z-40  xl:w-96 xl:shrink-0 xl:flex xl:flex-col xl:gap-6 xl:h-fit xl:sticky xl:top-24">
						<CaseAiAuditor />
					</div>

					{/* Modals */}
					<RegisterPatientSheet isOpen={openCreateNewPatientSheet} onClose={() => setOpenCreateNewPatientSheet(false)} onPatientCreated={(p) => setNewPatient(p)} />
					<RegisterClinicSheet isOpen={openCreateNewClinicSheet} onClose={() => setOpenCreateNewClinicSheet(false)} onClinicCreated={(c) => setNewClinic(c)} />
					<CreateCategorySheet isOpen={openCreateNewCategory} onClose={() => setOpenCreateNewCategory(false)} onCategoryCreated={(c) => setNewCategory(c)} />
					<CreateWorkTypeSheet />
					<CreateProductSheet />
					<CreatePricingPlanSheet />
					<RegisterStaffSheet
						isOpen={registerNewStaffMemberState.open}
						onClose={() => setRegisterNewStaffMemberState({ open: false, requiredRoles: [] })}
						requiredRoles={registerNewStaffMemberState.requiredRoles}
						onStaffCreated={(s) => setNewStaffMember(s)}
					/>
					<CaseSummaryModal isOpen={isSummaryOpen} onClose={() => setIsSummaryOpen(false)} onConfirm={handleFinalConfirm} data={draftData} isSubmitting={isExecuting} />
				</div>
			</div>
		</div>
	);
}
