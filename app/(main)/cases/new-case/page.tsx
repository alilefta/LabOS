"use client";

import { CaseAiAuditor } from "@/components/cases/new-case/case-ai-auditor";

import { CaseSummaryModal } from "@/components/cases/case/case-summary-modal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NewCaseHeader } from "@/components/cases/new-case/new-case-header";
import { FormProvider, useForm } from "react-hook-form";
import { HierarchicalClinicalPicker } from "@/components/cases/case/hierarchical-clinical-picker";
import { CaseWorkItemManager } from "@/components/cases/case/case-work-item-manager";
import { CaseFileUploadZone } from "@/components/cases/case/case-file-upload-zone";
import { ClinicalAssetPreview } from "@/components/cases/case/clinical-assets-preview";
import { CreateCaseInput, CreateCaseInputSchema } from "@/schema/composed/case.details";
import { PatientAndClinicSection } from "@/components/cases/new-case/sections/patient-clinic-section";
import { RegisterPatientSheet } from "@/components/modals/cases/patient/create-patient-sheet";

import { PatientDetails } from "@/schema/composed/patient.details";
import { RegisterClinicSheet } from "@/components/modals/cases/clinic/register-clinic-sheet";

import { ClinicDetails } from "@/schema/composed/clinic.details";
import { zodResolver } from "@hookform/resolvers/zod";

export default function NewCasePage() {
	// 1. The Boss holds the temporary data
	const [draftData, setDraftData] = useState<CreateCaseInput | null>(null);
	const [isSummaryOpen, setIsSummaryOpen] = useState(false);
	const [openCreateNewPatientSheet, setOpenCreateNewPatientSheet] = useState(false);
	const [openCreateNewClinicSheet, setOpenCreateNewClinicSheet] = useState(false);

	const [newPatient, setNewPatient] = useState<PatientDetails | null>(null);
	const [newClinic, setNewClinic] = useState<ClinicDetails | null>(null);

	const form = useForm<CreateCaseInput>({
		resolver: zodResolver(CreateCaseInputSchema),
		defaultValues: {
			caseWorkItems: [
				{
					jawType: "UPPER",
					casePricingPlanId: "",
					additionalToothPrice: null,
					bulkPrice: null,
					bulkPriceThreshold: null,
					labId: "",
					pricingStrategy: "PERTOOTH",
					firstToothPrice: 0,
					productId: "",
					totalPrice: 0,
				},
			],
			grandTotal: 0,
			caseCategoryId: "",
			technicianId: "",
			status: "DRAFT",
			clinicId: "",
			deadline: new Date(),
			labId: "",
			patientId: "",
			salesRepsId: "",
		},
	});

	const isExecuting = false;

	// 3. The Boss gives the Form a walkie-talkie
	const handleFormValid = (data: CreateCaseInput) => {
		setDraftData(data); // Save the validated data in memory
		setIsSummaryOpen(true); // Pop the modal!
	};

	// 4. The Boss gives the Modal a walkie-talkie
	const handleFinalConfirm = async () => {
		if (draftData) {
			// await createCase(draftData); // Send to DB!
		}
	};

	const handleSaveDraft = () => {
		// should store draft to db.
		console.log("Draft Data:", draftData);
	};

	return (
		<div className="flex flex-col h-full animate-in fade-in duration-700">
			<NewCaseHeader isSubmitForReviewEnabled={!form.formState.disabled} onSaveDraft={handleSaveDraft} />
			<div className="flex-1 min-h-0">
				<div className="flex flex-col xl:flex-row gap-8 h-full">
					{/* FORM SECTION (Left) */}
					<FormProvider {...form}>
						<form className="flex-1 overflow-y-auto no-scrollbar pb-20 space-y-12" id="new-case-submission-form" onSubmit={form.handleSubmit(handleFormValid)}>
							<div className="flex-1 overflow-y-auto no-scrollbar pb-20 space-y-12">
								{/* SECTION 1: ORIGIN */}
								<PatientAndClinicSection
									handleOpenClinicCreationSheet={() => setOpenCreateNewClinicSheet(true)}
									handleOpenPatientCreationSheet={() => setOpenCreateNewPatientSheet(true)}
									newCreatedPatient={newPatient}
									newCreatedClinic={newClinic}
								/>
								{/* SECTION 2: THE PRODUCT */}
								<section className="space-y-6">
									<div className="flex items-center gap-3">
										<div className="w-1.5 h-6 bg-primary rounded-full" />
										<h2 className="text-xl font-bold tracking-tight">Clinical Prescription</h2>
									</div>
									<HierarchicalClinicalPicker />
								</section>

								{/* SECTION 3: THE WORK DETAILS */}
								<CaseWorkItemManager />

								{/* SECTION 4: LOGISTICS & FILES */}
								<section className="space-y-8">
									<div className="flex items-center gap-3">
										<div className="w-1.5 h-6 bg-primary rounded-full" />
										<h2 className="text-xl font-bold tracking-tight">Technical Assets</h2>
									</div>

									<div className="grid grid-cols-1 gap-12">
										<CaseFileUploadZone />

										<div className="space-y-4">
											<h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Attachment Review</h4>
											<ClinicalAssetPreview />
										</div>
									</div>
								</section>
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

					<CaseSummaryModal isOpen={isSummaryOpen} onClose={() => setIsSummaryOpen(false)} onConfirm={handleFinalConfirm} data={draftData} isSubmitting={isExecuting} />
				</div>
			</div>
		</div>
	);
}
