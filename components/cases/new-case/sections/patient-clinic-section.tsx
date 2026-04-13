"use client";

import { Controller, useFormContext } from "react-hook-form";
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

	// Stable references — won't change between renders

	const handleClinicSelect = useCallback(
		(clinicId: string, dentistId: string) => {
			setValue("clinicId", clinicId, { shouldValidate: true });
			setValue("dentistId", dentistId, { shouldValidate: true });
		},
		[setValue],
	);

	const handlePatientSelect = useCallback(
		(id: string) => {
			setValue("patientId", id, { shouldValidate: true });
			onPatientSelect?.(id);
		},
		[setValue, onPatientSelect],
	);

	return (
		<section className="space-y-6">
			<div className="flex items-center gap-3">
				<div className="w-1.5 h-6 bg-primary rounded-full" />
				<h2 className="text-xl font-bold tracking-tight">Patient & Clinic</h2>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<ClinicSelector onCreateNew={handleOpenClinicCreationSheet} newCreatedClinic={newCreatedClinic} onSelect={handleClinicSelect} />
				<Controller
					control={control}
					name="patientId"
					render={({ fieldState }) => (
						<PatientSelector fieldError={fieldState.error} onCreateNew={handleOpenPatientCreationSheet} newCreatedPatient={newCreatedPatient} onSelect={handlePatientSelect} />
					)}
				/>
			</div>
		</section>
	);
});
