"use client";

import { CaseAiAuditor } from "@/components/cases/new-case/case-ai-auditor";

import { CaseSummaryModal } from "@/components/cases/case/case-summary-modal";
import { useCallback, useState } from "react";
import { CreateCaseFormHeader } from "@/components/cases/new-case/create-case-form-header";
import { Control, FormProvider, useForm } from "react-hook-form";
import { CreateCaseInput, CreateCaseInputSchema, SaveDraftCaseInputSchema, UpdateCaseAssetFilesInput } from "@/schema/composed/case.details";
import { RegisterPatientSheet } from "@/components/modals/cases/patient/create-patient-sheet";

import { PatientDetails } from "@/schema/composed/patient.details";
import { RegisterClinicSheet } from "@/components/modals/cases/clinic/register-clinic-sheet";

import { ClinicDetailsUI } from "@/schema/composed/clinic.details";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCategorySheet } from "@/components/modals/case-category/create-case-category-sheet";
import { CaseCategoryDetailsUI } from "@/schema/composed/case-category.details";
import { CreateWorkTypeSheet } from "@/components/modals/work-type/create-work-type-sheet";
import { CreateProductSheet } from "@/components/modals/product/create-product-sheet";
import { CreatePricingPlanSheet } from "@/components/modals/pricing/create-pricing-plan-sheet";
import { CreateCaseAssetFilesInput } from "@/schema/composed/case-asset-file.details";
import { toast } from "sonner";
import { RegisterStaffSheet } from "@/components/modals/cases/staff/register-staff-sheet";
import { LabStaffDetailsUI } from "@/schema/composed/lab-staff.details";
import { StaffRoleCategory } from "@/schema/base/enums.base";
import { useAction } from "next-safe-action/hooks";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { createDentalCaseAction, getDraftByPatientAction, getRecentDraftsAction, loadDraftByIdAction, saveDraftCaseAction } from "@/actions/cases/create-case";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { mapDraftToFormValues } from "@/lib/case-helpers";
import { useClinicalCreationStore } from "@/store/use-clinical-creation-store";
import { CaseFormContent } from "@/components/cases/new-case/case-form-content";

export default function NewCasePage() {
	// 1. Temporary State
	const [draftData, setDraftData] = useState<CreateCaseInput | null>(null);
	const [existingDraftId, setExistingDraftId] = useState<string | undefined>(undefined);

	// Modal States
	const [isSummaryOpen, setIsSummaryOpen] = useState(false);
	const [openCreateNewPatientSheet, setOpenCreateNewPatientSheet] = useState(false);
	const [openCreateNewClinicSheet, setOpenCreateNewClinicSheet] = useState(false);
	const [openCreateNewCategory, setOpenCreateNewCategory] = useState(false);
	const [registerNewStaffMemberState, setRegisterNewStaffMemberState] = useState<{ open: boolean; requiredRoles: StaffRoleCategory[] }>({ open: false, requiredRoles: [] });

	// Newly Created Entities
	const [newPatient, setNewPatient] = useState<PatientDetails | null>(null);
	const [newStaffMember, setNewStaffMember] = useState<LabStaffDetailsUI | null>(null);
	const [newClinic, setNewClinic] = useState<ClinicDetailsUI | null>(null);
	const [newCategory, setNewCategory] = useState<CaseCategoryDetailsUI | null>(null);

	const isWTCreationSheetOpen = useClinicalCreationStore((st) => st.isWorkTypeSheetOpen);
	const isProductCreationSheetOpen = useClinicalCreationStore((st) => st.isProductSheetOpen);
	const isPricingPlanCreationSheetOpen = useClinicalCreationStore((st) => st.isPricingSheetOpen);

	// Contextual Draft State
	const [patientDraftPrompt, setPatientDraftPrompt] = useState<{ draftId: string; caseNumber: string; lastSavedAt: Date } | null>(null);

	// React Hook Form Setup
	const form = useForm<CreateCaseInput>({
		resolver: zodResolver(CreateCaseInputSchema),
		defaultValues: {
			caseWorkItems: [],
			caseAssetFiles: [],
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

	const router = useRouter();

	// 3. Handlers
	const handleOpenClinicSheet = useCallback(() => setOpenCreateNewClinicSheet(true), []);
	const handleOpenPatientSheet = useCallback(() => setOpenCreateNewPatientSheet(true), []);
	const handleOpenCategorySheet = useCallback(() => setOpenCreateNewCategory(true), []);
	const handleOpenStaffSheet = useCallback((roles: StaffRoleCategory[]) => setRegisterNewStaffMemberState({ open: true, requiredRoles: roles }), []);

	// ── Recent drafts for banner ───────────────────────────────────────
	// --- DATA FETCHING ---
	const { data: recentDraftsData, isLoading: isLoadingDrafts } = useQuery({
		queryKey: ["recent-drafts"],
		queryFn: async () => {
			const res = await getRecentDraftsAction({ limit: 5 });
			if (res.serverError || res.validationErrors) handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			return res?.data?.drafts ?? [];
		},
	});
	const recentDrafts = recentDraftsData ?? [];

	// ------------ SERVER ACTIONS ------------
	const { executeAsync: saveDraft, isExecuting: isExecutingSavingDraft } = useAction(saveDraftCaseAction, {
		onSuccess: ({ data }) => {
			setExistingDraftId(data.draftCase.id);
			toast.success("Draft saved. You can safely exit.");
		},
		onError: ({ error }) => handleSafeActionError(error),
	});

	const { executeAsync: createCase, isExecuting: isCreatingCase } = useAction(createDentalCaseAction, {
		onSuccess: ({ data }) => {
			setExistingDraftId(undefined); // clear stale draft reference

			toast.success(`Case ${data.createdCase.caseNumber} submitted successfully.`);
			router.push(`/cases/${data.createdCase.id}`);
		},
		onError: ({ error }) => handleSafeActionError(error),
	});

	// ── SUBMIT FLOW ────────────────────────────────────────────────────
	// RHF validates with full CreateCaseInputSchema (status: "NEW")
	// superRefine enforces all required fields
	const handleFormValid = useCallback((data: CreateCaseInput) => {
		const validItems = (data.caseWorkItems ?? []).filter((item) => item.productId && item.casePricingPlanId);

		// Calculate the real grand total dynamically
		const calculatedGrandTotal = validItems.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0);

		const cleanData: CreateCaseInput = {
			...data,
			status: "NEW",
			caseWorkItems: validItems,
			grandTotal: calculatedGrandTotal, // Inject the math
		};

		setDraftData(cleanData);
		setIsSummaryOpen(true);
	}, []);

	const handleFinalConfirm = useCallback(async () => {
		if (!draftData) return;
		await createCase({ ...draftData, existingDraftId });
		setIsSummaryOpen(false);
	}, [draftData, createCase, existingDraftId]);
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
		(files: CreateCaseAssetFilesInput[] | UpdateCaseAssetFilesInput[]) => {
			const current = form.getValues("caseAssetFiles") ?? [];
			form.setValue("caseAssetFiles", [...current, ...files], { shouldValidate: true });
		},
		[form],
	);

	// ── Patient draft detection ────────────────────────────────────────
	// Called from PatientAndClinicSection when a patient is selected
	// --- DRAFT RECOVERY LOGIC ---
	const handlePatientSelect = useCallback(
		async (patientId: string) => {
			form.setValue("patientId", patientId, { shouldValidate: true });
			if (existingDraftId) return;

			const res = await getDraftByPatientAction({ patientId });
			const draft = res?.data?.draft;

			if (draft) {
				setPatientDraftPrompt({ draftId: draft.id, caseNumber: draft.caseNumber, lastSavedAt: draft.updatedAt });
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
			if (res.serverError || res.validationErrors) handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });

			const draft = res?.data?.draft;
			if (!draft) {
				toast.error("Could not load draft.");
				return;
			}

			form.reset(mapDraftToFormValues(draft));
			setExistingDraftId(draftId);
			setPatientDraftPrompt(null);
			toast.success(`Draft ${draft.caseNumber} loaded.`);
			form.setValue("existingDraftId", draftId);
		},
		[form],
	);

	const handleDismissPatientDraft = useCallback(() => {
		setPatientDraftPrompt(null);
	}, []);

	return (
		<div className="flex flex-col h-full animate-in fade-in duration-700 bg-background relative">
			<CreateCaseFormHeader isSavingDraft={isExecutingSavingDraft} isSubmittingCase={isCreatingCase} onSaveDraft={handleSaveDraft} control={form.control} />
			{/* MAIN WORKSPACE */}
			<div className="flex-1 min-h-0 relative w-full">
				<div className="flex flex-col xl:flex-row gap-8 h-full max-w-500 mx-auto px-4 sm:px-6 lg:px-8">
					{/* FORM SECTION (Left) */}
					<div className="flex-1 h-full overflow-y-auto custom-scrollbar pt-6 lg:pt-8">
						<FormProvider {...form}>
							<form className="space-y-12 pr-2" id="new-case-submission-form" onSubmit={form.handleSubmit(handleFormValid)}>
								<CaseFormContent
									mode={"create"}
									isLoadingDrafts={isLoadingDrafts}
									recentDrafts={recentDrafts}
									existingDraftId={existingDraftId}
									patientDraftPrompt={patientDraftPrompt}
									onResumeDraft={handleResumeDraft}
									onDismissPatientDraft={handleDismissPatientDraft}
									onOpenClinicSheet={handleOpenClinicSheet}
									onOpenPatientSheet={handleOpenPatientSheet}
									onOpenCategorySheet={handleOpenCategorySheet}
									onOpenStaffSheet={handleOpenStaffSheet}
									newPatient={newPatient}
									newClinic={newClinic}
									newCategory={newCategory}
									newStaffMember={newStaffMember}
									onPatientSelect={handlePatientSelect}
									onUploadAssets={handleUploadedAssets}
								/>
							</form>
						</FormProvider>
					</div>
					{/* AI AUDITOR (Right - Desktop) */}
					<div className="hidden xl:flex w-96 shrink-0 flex-col gap-6 h-full overflow-y-auto custom-scrollbar pt-6 lg:pt-8 pb-12">
						<CaseAiAuditor control={form.control as Control<CreateCaseInput>} mode="create" />
					</div>

					{/* AI AUDITOR (Floating Bottom - Mobile) */}
					<div className="xl:hidden sticky bottom-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] mt-auto -mx-4 sm:-mx-6 lg:-mx-8">
						<CaseAiAuditor control={form.control as Control<CreateCaseInput>} mode="create" />
					</div>

					{/* Modals */}
					<RegisterPatientSheet isOpen={openCreateNewPatientSheet} onClose={() => setOpenCreateNewPatientSheet(false)} onPatientCreated={(p) => setNewPatient(p)} />
					<RegisterClinicSheet isOpen={openCreateNewClinicSheet} onClose={() => setOpenCreateNewClinicSheet(false)} onClinicCreated={(c) => setNewClinic(c)} />
					<CreateCategorySheet isOpen={openCreateNewCategory} onClose={() => setOpenCreateNewCategory(false)} onCategoryCreated={(c) => setNewCategory(c)} />
					{isWTCreationSheetOpen && <CreateWorkTypeSheet />}
					{isProductCreationSheetOpen && <CreateProductSheet />}
					{isPricingPlanCreationSheetOpen && <CreatePricingPlanSheet />}
					<RegisterStaffSheet
						isOpen={registerNewStaffMemberState.open}
						onClose={() => setRegisterNewStaffMemberState({ open: false, requiredRoles: [] })}
						requiredRoles={registerNewStaffMemberState.requiredRoles}
						onStaffCreated={(s) => setNewStaffMember(s)}
					/>
					<CaseSummaryModal
						isOpen={isSummaryOpen}
						onClose={() => setIsSummaryOpen(false)}
						onConfirm={handleFinalConfirm}
						existingDraftId={existingDraftId}
						data={draftData}
						isSubmitting={isCreatingCase}
						mode={"create"}
					/>
				</div>
			</div>
		</div>
	);
}
