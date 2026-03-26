"use client";

import { Controller, useFormContext } from "react-hook-form";
import { ClinicSelector } from "../../case/case-inputs/clinic-selector";
import { PatientSelector } from "../../case/case-inputs/patient-selector";
import { ClinicBase } from "@/schema/base/clinic.base";
import { CreateCaseInput } from "@/schema/composed/case.details";
import { PatientDetails } from "@/schema/composed/patient.details";

export function PatientAndClinicSection({ newCreatedPatient, handleOpenPatientCreationSheet }: { newCreatedPatient: PatientDetails | null; handleOpenPatientCreationSheet: () => void }) {
	const form = useFormContext<CreateCaseInput>();
	const clinics: ClinicBase[] = [];

	return (
		<section className="space-y-6">
			<div className="flex items-center gap-3">
				<div className="w-1.5 h-6 bg-primary rounded-full" />
				<h2 className="text-xl font-bold tracking-tight">Patient & Clinic</h2>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Controller control={form.control} name="clinicId" render={({ field }) => <ClinicSelector clinics={clinics} onSelect={(id: string) => field.onChange(id)} />} />
				<Controller
					control={form.control}
					name="patientId"
					render={({ field }) => <PatientSelector onSelect={(id: string) => field.onChange(id)} onCreateNew={handleOpenPatientCreationSheet} createdPatient={newCreatedPatient} />}
				/>
			</div>
		</section>
	);
}
