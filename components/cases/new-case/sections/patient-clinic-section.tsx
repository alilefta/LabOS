"use client";

import { Controller, ControllerRenderProps, useFormContext, useWatch } from "react-hook-form";
import { ClinicSelector } from "../../case/case-inputs/clinic-selector";
import { PatientSelector } from "../../case/case-inputs/patient-selector";
import { CreateCaseInput } from "@/schema/composed/case.details";
import { ClinicDetailsUI } from "@/schema/composed/clinic.details";
import { PatientDetails } from "@/schema/composed/patient.details";
import { memo, useCallback } from "react";
import { DentistSelector } from "../../case/case-inputs/dentist-selector";

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
	const { control } = useFormContext<CreateCaseInput>();
	// const handleClinicSelect = useCallback(
	// 	(field: ControllerRenderProps<CreateCaseInput, "clinicId">, clinicId: string) => {
	// 		field.onChange(clinicId);
	// 		// setValue("clinicId", clinicId, { shouldValidate: true, shouldDirty: true });
	// 		// If dentistId is optional in your schema, make sure it handles nulls gracefully
	// 	},
	// 	[],
	// );

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
				<h2 className="text-xl font-bold tracking-tight">Origin & Identity</h2>
			</div>

			{/* UPGRADED TO 3 COLUMNS ON LARGE SCREENS */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{/* 1. CLINIC SELECTOR */}
				<div className="lg:col-span-1">
					<Controller
						control={control}
						name="clinicId"
						render={({ field, fieldState }) => (
							<ClinicSelector
								value={field.value}
								fieldError={fieldState.error}
								onCreateNew={handleOpenClinicCreationSheet}
								newCreatedClinic={newCreatedClinic}
								onSelect={(clinicId) => {
									field.onChange(clinicId);
								}}
							/>
						)}
					/>
				</div>

				{/* 2. DENTIST SELECTOR (Progressively Enabled) */}
				<div className="lg:col-span-1">
					<Controller
						control={control}
						name="dentistId"
						render={({ field, fieldState }) => <DentistSelector value={field.value} fieldError={fieldState.error} control={control} onSelect={(id) => field.onChange(id)} />}
					/>
				</div>

				{/* 3. PATIENT SELECTOR */}
				<div className="lg:col-span-1 md:col-span-2">
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
			</div>
		</section>
	);
});
