"use client";

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ClinicSelector } from "../../case/case-inputs/clinic-selector";
import { PatientSelector } from "../../case/case-inputs/patient-selector";
import { ClinicBase } from "@/schema/base/clinic.base";
import { PatientBase } from "@/schema/base/patient.base";
import { CreateCaseInput } from "@/schema/composed/case.details";
import { RegisterPatientSheet } from "@/components/modals/cases/patient/create-patient-sheet";

export function PatientAndClinicSection() {
	const form = useFormContext<CreateCaseInput>();
	const initialPatients: PatientBase[] = [];
	const clinics: ClinicBase[] = [];
	const [patients, setPatients] = useState(initialPatients);
	const [isSheetOpen, setIsSheetOpen] = useState(false);

	const handlePatientCreated = (newPatient: any) => {
		// 1. Add new patient to the local list so the selector sees them
		setPatients((prev) => [newPatient, ...prev]);

		// 2. Automatically select the new patient in the main form
		// setValue("patientId", newPatient.id, { shouldValidate: true });
	};

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
					render={({ field }) => <PatientSelector patients={patients} onSelect={(id: string) => field.onChange(id)} onCreateNew={() => setIsSheetOpen(true)} />}
				/>
			</div>

			<RegisterPatientSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)} onSuccess={handlePatientCreated} />
		</section>
	);
}
