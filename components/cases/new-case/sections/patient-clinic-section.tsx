"use client";

import { Controller, ControllerRenderProps, useFormContext } from "react-hook-form";
import { ClinicSelector } from "../../case/case-inputs/clinic-selector";
import { PatientSelector } from "../../case/case-inputs/patient-selector";
import { CreateCaseInput } from "@/schema/composed/case.details";
import { ClinicDetailsUI } from "@/schema/composed/clinic.details";
import { PatientDetails } from "@/schema/composed/patient.details";
import { memo, useCallback } from "react";

export const PatientAndClinicSection = memo(function PatientAndClinicSection({
	handleOpenPatientCreationSheet,
	handleOpenClinicCreationSheet,
	newCreatedClinic,
	newCreatedPatient,
	onPatientSelect,
}: {
	handleOpenPatientCreationSheet: () => void;
	handleOpenClinicCreationSheet: () => void;
	newCreatedPatient: PatientDetails | null;
	newCreatedClinic: ClinicDetailsUI | null;
	onPatientSelect?: (patientId: string) => void;
}) {
	const { setValue, control } = useFormContext<CreateCaseInput>();
	const handleClinicSelect = useCallback(
		(field: ControllerRenderProps<CreateCaseInput, "clinicId">, clinicId: string, dentistId: string) => {
			field.onChange(clinicId);
			// setValue("clinicId", clinicId, { shouldValidate: true, shouldDirty: true });
			// If dentistId is optional in your schema, make sure it handles nulls gracefully
			if (dentistId) setValue("dentistId", dentistId, { shouldValidate: true, shouldDirty: true });
		},
		[setValue],
	);

	const handlePatientChange = useCallback(
		(field: ControllerRenderProps<CreateCaseInput, "patientId">, id: string) => {
			// setValue("patientId", id, { shouldValidate: true, shouldDirty: true });
			field.onChange(id);
			onPatientSelect?.(id);
		},
		[onPatientSelect],
	);

	return (
		<section className="space-y-6 animate-in fade-in duration-500">
			<div className="flex items-center gap-3">
				<div className="w-1.5 h-6 bg-primary rounded-full" />
				<h2 className="text-xl font-bold tracking-tight">Patient & Clinic</h2>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* 1. CLINIC SELECTOR (Now properly wrapped in Controller) */}
				<Controller
					control={control}
					name="clinicId"
					render={({ field, fieldState }) => (
						<ClinicSelector
							value={field.value} // <-- CRITICAL: Tells the UI a draft loaded
							fieldError={fieldState.error}
							onCreateNew={handleOpenClinicCreationSheet}
							newCreatedClinic={newCreatedClinic}
							onSelect={(clinicId, dentistId) => {
								// field.onChange(clinicId); // Keep RHF in sync
								handleClinicSelect(field, clinicId, dentistId);
							}}
						/>
					)}
				/>

				{/* 2. PATIENT SELECTOR (Now properly extracting field.value) */}
				<Controller
					control={control}
					name="patientId"
					render={({ field, fieldState }) => (
						<PatientSelector
							value={field.value}
							fieldError={fieldState.error}
							onCreateNew={handleOpenPatientCreationSheet}
							newCreatedPatient={newCreatedPatient}
							onSelect={(id) => {
								handlePatientChange(field, id);
							}}
						/>
					)}
				/>
			</div>
		</section>
	);
});
