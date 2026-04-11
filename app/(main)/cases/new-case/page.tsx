"use client";

import { CaseAiAuditor } from "@/components/cases/new-case/case-ai-auditor";

import { CaseSummaryModal } from "@/components/cases/case/case-summary-modal";
import { useCallback, useEffect, useState } from "react";
import { NewCaseHeader } from "@/components/cases/new-case/new-case-header";
import { FormProvider, useForm } from "react-hook-form";
import { CaseFileUploadZone } from "@/components/cases/case/case-inputs/case-file-upload-zone";
import { ClinicalAssetPreview } from "@/components/cases/case/clinical-assets-preview";
import { CreateCaseInput, CreateCaseInputSchema } from "@/schema/composed/case.details";
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

	const handleOpenClinicSheet = useCallback(() => setOpenCreateNewClinicSheet(true), []);
	const handleOpenPatientSheet = useCallback(() => setOpenCreateNewPatientSheet(true), []);
	const handleOpenCategorySheet = useCallback(() => setOpenCreateNewCategory(true), []);
	const handleOpenStaffSheet = useCallback((roles: StaffRoleCategory[]) => {
		setRegisterNewStaffMemberState({ open: true, requiredRoles: roles });
	}, []);

	// const {} = useAction(saveDraftCaseAction, {
	// 	onSuccess: ({data}) => {

	// 	},
	// 	onError: ({error}) => {
	// 		handleSafeActionError(error)
	// 	},
	// })

	const form = useForm<CreateCaseInput>({
		resolver: zodResolver(CreateCaseInputSchema),
		defaultValues: {
			caseWorkItems: [
				{
					jawType: "UPPER",
					productId: "",
					totalPrice: 0,
				},
			],
			caseAssetFiles: [],
			grandTotal: 0,
			caseCategoryId: "",
			status: "DRAFT",
			clinicId: "",
			deadline: new Date(),
			patientId: "",
		},
	});

	const isExecuting = false;

	// 3. The Boss gives the Form a walkie-talkie
	const handleFormValid = useCallback((data: CreateCaseInput) => {
		setDraftData(data);
		setIsSummaryOpen(true);
	}, []);

	// 4. The Boss gives the Modal a walkie-talkie
	const handleFinalConfirm = useCallback(async () => {
		if (draftData) {
			// await createCase(draftData);
		}
	}, [draftData]);
	const handleSaveDraft = async () => {
		// 1. Get raw values directly (bypasses RHF/Zod strict validation)
		const currentData = form.getValues();

		// 2. Validate the bare minimum requirement (Patient)
		if (!currentData.patientId) {
			toast.error("Draft Error", {
				description: "A patient must be selected to save a draft.",
			});

			// UX Touch: Scroll to the patient section
			document.getElementsByName("patientId")[0]?.scrollIntoView({ behavior: "smooth", block: "center" });
			return;
		}

		// 3. Prepare payload (Force status to DRAFT)
		const draftPayload: CreateCaseInput = {
			...currentData,
			status: "DRAFT",
		};

		console.log("Saving Draft to DB:", draftPayload);

		// 4. Call Server Action
		toast.promise(
			// executeAsyncSaveDraft(draftPayload) --> Your actual server action
			new Promise((resolve) => setTimeout(resolve, 1500)), // Mocking network
			{
				loading: "Saving draft...",
				success: "Draft saved successfully. You can safely exit.",
				error: "Failed to save draft.",
			},
		);
	};

	const handleUploadedAssets = useCallback(
		(files: CreateCaseAssetFilesInput[]) => {
			const current = form.getValues("caseAssetFiles") ?? [];
			form.setValue("caseAssetFiles", [...current, ...files], { shouldValidate: true });
		},
		[form],
	);

	useEffect(() => {
		console.log(form.formState.dirtyFields);
	}, [form.formState.dirtyFields]);

	return (
		<div className="flex flex-col h-full animate-in fade-in duration-700">
			<NewCaseHeader isSubmitForReviewEnabled={!form.formState.disabled} isSaveDraftEnabled={true} onSaveDraft={handleSaveDraft} onSubmitCaseForReview={() => setIsSummaryOpen(true)} />
			<div className="flex-1 min-h-0">
				<div className="flex flex-col xl:flex-row gap-8 h-full">
					{/* FORM SECTION (Left) */}
					<FormProvider {...form}>
						<form className="flex-1 overflow-y-auto no-scrollbar pb-20 space-y-12" id="new-case-submission-form" onSubmit={form.handleSubmit(handleFormValid)}>
							<div className="flex-1 overflow-y-auto no-scrollbar pb-20 space-y-12">
								{/* SECTION 1: ORIGIN */}
								<PatientAndClinicSection
									handleOpenClinicCreationSheet={handleOpenClinicSheet}
									handleOpenPatientCreationSheet={handleOpenPatientSheet}
									newCreatedPatient={newPatient}
									newCreatedClinic={newClinic}
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

								{/* SECTION 4: LOGISTICS & ROUTING */}
								<LogisticsAndRoutingSection newRegisteredStaffMember={newStaffMember} handleOpenRegisterLabStaffSheet={handleOpenStaffSheet} />
							</div>
						</form>
					</FormProvider>
					{/* AI AUDITOR (Right) */}
					<div className="w-full xl:w-96 shrink-0 flex flex-col gap-6 h-fit sticky top-24">
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
