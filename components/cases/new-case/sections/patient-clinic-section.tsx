"use client";

import { Controller, useFormContext } from "react-hook-form";
import { ClinicSelector } from "../../case/case-inputs/clinic-selector";
import { PatientSelector } from "../../case/case-inputs/patient-selector";
import { CreateCaseInput } from "@/schema/composed/case.details";
import { ClinicDetails } from "@/schema/composed/clinic.details";
import { PatientDetails } from "@/schema/composed/patient.details";

export function PatientAndClinicSection({
	handleOpenPatientCreationSheet,
	handleOpenClinicCreationSheet,
	newCreatedClinic,
	newCreatedPatient,
}: {
	handleOpenPatientCreationSheet: () => void;
	handleOpenClinicCreationSheet: () => void;
	newCreatedPatient: PatientDetails | null;
	newCreatedClinic: ClinicDetails | null;
}) {
	const form = useFormContext<CreateCaseInput>();

	return (
		<section className="space-y-6">
			<div className="flex items-center gap-3">
				<div className="w-1.5 h-6 bg-primary rounded-full" />
				<h2 className="text-xl font-bold tracking-tight">Patient & Clinic</h2>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Controller
					control={form.control}
					name="clinicId"
					render={({ field }) => <ClinicSelector onCreateNew={handleOpenClinicCreationSheet} onSelect={(id: string) => field.onChange(id)} newCreatedClinic={newCreatedClinic} />}
				/>
				<Controller
					control={form.control}
					name="patientId"
					render={({ field }) => <PatientSelector onSelect={(id: string) => field.onChange(id)} onCreateNew={handleOpenPatientCreationSheet} newCreatedPatient={newCreatedPatient} />}
				/>
			</div>
		</section>
	);
}
