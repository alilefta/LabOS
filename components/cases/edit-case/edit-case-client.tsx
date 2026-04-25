"use client";

import { useCallback, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

// Schemas & Types
import { UpdateCaseInput, UpdateCaseInputSchema } from "@/schema/composed/case.details";
import { CreateCaseAssetFilesInput } from "@/schema/composed/case-asset-file.details";
import { ClinicDetailsUI } from "@/schema/composed/clinic.details";
import { CaseCategoryDetailsUI } from "@/schema/composed/case-category.details";
import { LabStaffDetailsUI } from "@/schema/composed/lab-staff.details";
import { StaffRoleCategory } from "@/schema/base/enums.base";

// Actions
import { handleSafeActionError } from "@/lib/safe-action-helpers";

// Modals
import { RegisterClinicSheet } from "@/components/modals/cases/clinic/register-clinic-sheet";
import { CreateCategorySheet } from "@/components/modals/case-category/create-case-category-sheet";
import { CreateWorkTypeSheet } from "@/components/modals/work-type/create-work-type-sheet";
import { CreateProductSheet } from "@/components/modals/product/create-product-sheet";
import { CreatePricingPlanSheet } from "@/components/modals/pricing/create-pricing-plan-sheet";
import { RegisterStaffSheet } from "@/components/modals/cases/staff/register-staff-sheet";

// Zustand
import { useClinicalCreationStore } from "@/store/use-clinical-creation-store";
import { updateDentalCaseAction } from "@/actions/cases/update-case-form";
import { NewCaseHeader } from "../new-case/new-case-header";
import { NewCaseFormContent } from "../new-case/new-case-form-content";

interface Props {
	initialData: UpdateCaseInput;
	caseNumber: string;
	patientName: string;
}

export function EditCaseClient({ initialData, caseNumber, patientName }: Props) {
	const router = useRouter();

	// 1. STATE MANAGEMENT
	const [editPayload, setEditPayload] = useState<UpdateCaseInput | null>(null);
	const [isSummaryOpen, setIsSummaryOpen] = useState(false);

	// Modals & New Entities State
	const [openCreateNewClinicSheet, setOpenCreateNewClinicSheet] = useState(false);
	const [openCreateNewCategory, setOpenCreateNewCategory] = useState(false);
	const [registerNewStaffMemberState, setRegisterNewStaffMemberState] = useState<{ open: boolean; requiredRoles: StaffRoleCategory[] }>({ open: false, requiredRoles: [] });

	const [newStaffMember, setNewStaffMember] = useState<LabStaffDetailsUI | null>(null);
	const [newClinic, setNewClinic] = useState<ClinicDetailsUI | null>(null);
	const [newCategory, setNewCategory] = useState<CaseCategoryDetailsUI | null>(null);

	const isWTCreationSheetOpen = useClinicalCreationStore((st) => st.isWorkTypeSheetOpen);
	const isProductCreationSheetOpen = useClinicalCreationStore((st) => st.isProductSheetOpen);
	const isPricingPlanCreationSheetOpen = useClinicalCreationStore((st) => st.isPricingSheetOpen);

	// 2. REACT HOOK FORM INITIALIZATION
	const form = useForm<UpdateCaseInput>({
		resolver: zodResolver(UpdateCaseInputSchema),
		defaultValues: initialData, // HYDRATION happens here
	});

	// 3. SERVER ACTION: UPDATE CASE
	const { executeAsync: updateCase, isExecuting: isUpdating } = useAction(updateDentalCaseAction, {
		onSuccess: () => {
			toast.success(`Case #${caseNumber} updated successfully.`);
			router.push(`/cases/${initialData.caseId}`);
			router.refresh();
		},
		onError: ({ error }) => handleSafeActionError(error),
	});

	// --- HANDLERS ---
	const handleOpenClinicSheet = useCallback(() => setOpenCreateNewClinicSheet(true), []);
	const handleOpenCategorySheet = useCallback(() => setOpenCreateNewCategory(true), []);
	const handleOpenStaffSheet = useCallback((roles: StaffRoleCategory[]) => setRegisterNewStaffMemberState({ open: true, requiredRoles: roles }), []);

	// SUBMISSION FLOW
	const handleFormValid = useCallback((data: UpdateCaseInput) => {
		// Clean the data: filter out ghost rows
		const validItems = (data.caseWorkItems ?? []).filter((item) => item.productId && item.casePricingPlanId);
		const calculatedGrandTotal = validItems.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0);

		const cleanData: UpdateCaseInput = {
			...data,
			caseWorkItems: validItems,
			grandTotal: calculatedGrandTotal,
		};

		setEditPayload(cleanData);
		setIsSummaryOpen(true);
	}, []);

	const handleFinalConfirm = useCallback(async () => {
		if (!editPayload) return;
		await updateCase(editPayload);
		setIsSummaryOpen(false);
	}, [editPayload, updateCase]);

	// ASSET HANDLING (Injecting as "isNew: true")
	const handleUploadedAssets = useCallback(
		(files: CreateCaseAssetFilesInput[]) => {
			const current = form.getValues("caseAssetFiles") ?? [];

			// Map the newly uploaded files to the Update Asset Union shape
			const mappedNewFiles = files.map((f) => ({
				...f,
				isNew: true as const,
			}));

			form.setValue("caseAssetFiles", [...current, ...mappedNewFiles], { shouldValidate: true, shouldDirty: true });
		},
		[form],
	);

	return (
		<div className="flex flex-col h-full animate-in fade-in duration-700">
			{/* THE HEADER: Switches to EDIT branding */}
			<NewCaseHeader
				mode="edit"
				caseNumber={caseNumber}
				isSaveDraftEnabled={false} // You can't "Save Draft" on an existing production case
				isSubmittingCase={isUpdating}
				onSaveDraft={() => {}}
				control={form.control as any}
				onSubmitCaseForReview={() => form.handleSubmit(handleFormValid)()}
			/>

			<div className="flex-1 min-h-0 relative z-10">
				<div className="flex flex-col xl:flex-row gap-8 h-full">
					{/* FORM SECTION: Reusing the exact same body! */}
					<FormProvider {...form}>
						<form className="flex-1 overflow-y-auto no-scrollbar pb-48 xl:pb-32" id="new-case-submission-form" onSubmit={form.handleSubmit(handleFormValid)}>
							<NewCaseFormContent
								mode="edit" // CRITICAL: Tells the content to lock the Patient selector
								patientName={patientName} // Used for the read-only patient identity card
								// Draft recovery is disabled in edit mode
								isLoadingDrafts={false}
								recentDrafts={[]}
								patientDraftPrompt={null}
								onResumeDraft={() => {}}
								onDismissPatientDraft={() => {}}
								onOpenClinicSheet={handleOpenClinicSheet}
								onOpenPatientSheet={() => {}} // Disabled in edit mode
								onOpenCategorySheet={handleOpenCategorySheet}
								onOpenStaffSheet={handleOpenStaffSheet}
								newPatient={null}
								newClinic={newClinic}
								newCategory={newCategory}
								newStaffMember={newStaffMember}
								onPatientSelect={() => {}} // Patient is immutable
								onUploadAssets={handleUploadedAssets}
							/>
						</form>
					</FormProvider>

					{/* AI AUDITOR: Analyzes the edit in real-time */}
					<div className="hidden xl:flex w-96 shrink-0 flex-col gap-6 sticky top-0 h-fit z-20">
						<CaseAiAuditor control={form.control as any} />
					</div>

					{/* --- MODALS --- */}
					<RegisterClinicSheet isOpen={openCreateNewClinicSheet} onClose={() => setOpenCreateNewClinicSheet(false)} onClinicCreated={setNewClinic} />
					<CreateCategorySheet isOpen={openCreateNewCategory} onClose={() => setOpenCreateNewCategory(false)} onCategoryCreated={setNewCategory} />

					{isWTCreationSheetOpen && <CreateWorkTypeSheet />}
					{isProductCreationSheetOpen && <CreateProductSheet />}
					{isPricingPlanCreationSheetOpen && <CreatePricingPlanSheet />}

					<RegisterStaffSheet
						isOpen={registerNewStaffMemberState.open}
						onClose={() => setRegisterNewStaffMemberState({ open: false, requiredRoles: [] })}
						requiredRoles={registerNewStaffMemberState.requiredRoles}
						onStaffCreated={setNewStaffMember}
					/>

					{/* The Summary Modal shows the "Preview of Changes" before the replace-all transaction happens */}
					<CaseSummaryModal isOpen={isSummaryOpen} onClose={() => setIsSummaryOpen(false)} onConfirm={handleFinalConfirm} data={editPayload as any} isSubmitting={isUpdating} mode="edit" />
				</div>
			</div>
		</div>
	);
}
