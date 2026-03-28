"use client";

import z from "zod";
import { HierarchicalClinicalPicker } from "../case/case-category-selector";
import { CaseWorkItemManager } from "../case/case-work-item-manager";
import { CaseFileUploadZone } from "../case/case-file-upload-zone";
import { ClinicalAssetPreview } from "../case/clinical-assets-preview";
import { Controller, useFormContext } from "react-hook-form";
import { CreateCaseInput } from "@/schema/composed/case.details";
import { PatientSelector } from "../case/case-inputs/patient-selector";
import { ClinicSelector } from "../case/case-inputs/clinic-selector";
import { useState } from "react";
import { ClinicBase } from "@/schema/base/clinic.base";
import { PatientBase } from "@/schema/base/patient.base";

export function NewCaseForm() {
	const form = useFormContext<CreateCaseInput>();

	// const onSubmit = (data: any) => {
	// 	console.log("Atomic Submission to Prisma:", data);
	// 	// Trigger the CaseSummaryModal here!
	// };
	return (
		// <FormProvider {...form}>
		// 	<form onSubmit={form.handleSubmit(onSubmit)}  className="flex flex-col h-full">

		// 	</form>
		// </FormProvider>

		<div className="flex-1 overflow-y-auto no-scrollbar pb-20 space-y-12">
			{/* SECTION 1: ORIGIN */}

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
	);
}
