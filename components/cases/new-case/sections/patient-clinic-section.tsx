"use client";

import { useFormContext } from "react-hook-form";
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
}: {
	handleOpenPatientCreationSheet: () => void;
	handleOpenClinicCreationSheet: () => void;
	newCreatedPatient: PatientDetails | null;
	newCreatedClinic: ClinicDetailsUI | null;
}) {
	const { setValue } = useFormContext<CreateCaseInput>();

	// Stable references — won't change between renders

	const handleClinicSelect = useCallback(
		(id: string) => {
			setValue("clinicId", id, { shouldValidate: true });
		},
		[setValue],
	);

	const handlePatientSelect = useCallback(
		(id: string) => {
			setValue("patientId", id, { shouldValidate: true });
		},
		[setValue],
	);

	return (
		<section className="space-y-6">
			<div className="flex items-center gap-3">
				<div className="w-1.5 h-6 bg-primary rounded-full" />
				<h2 className="text-xl font-bold tracking-tight">Patient & Clinic</h2>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<ClinicSelector onCreateNew={handleOpenClinicCreationSheet} newCreatedClinic={newCreatedClinic} onSelect={handleClinicSelect} />
				<PatientSelector onCreateNew={handleOpenPatientCreationSheet} newCreatedPatient={newCreatedPatient} onSelect={handlePatientSelect} />
			</div>
		</section>
	);
});
