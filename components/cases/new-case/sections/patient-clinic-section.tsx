"use client";

import { Control, Controller, useFormContext } from "react-hook-form";
import { User, Lock } from "lucide-react";
import { memo } from "react";

import { ClinicSelector } from "../../case/case-inputs/clinic-selector";
import { PatientSelector } from "../../case/case-inputs/patient-selector";
import { DentistSelector } from "../../case/case-inputs/dentist-selector";
import { CaseFormModeType, CreateCaseInput, UpdateCaseInput } from "@/schema/composed/case.details";
import { ClinicDetailsUI } from "@/schema/composed/clinic.details";
import { PatientDetails } from "@/schema/composed/patient.details";

interface PatientAndClinicSectionProps {
	mode: CaseFormModeType;
	patientName?: string | null;
	handleOpenPatientCreationSheet: () => void;
	handleOpenClinicCreationSheet: () => void;
	newCreatedPatient: PatientDetails | null;
	newCreatedClinic: ClinicDetailsUI | null;
	onPatientSelect?: (patientId: string) => void;
}

export const PatientAndClinicSection = memo(function PatientAndClinicSection({
	mode,
	patientName,
	handleOpenPatientCreationSheet,
	handleOpenClinicCreationSheet,
	newCreatedClinic,
	newCreatedPatient,
	onPatientSelect,
}: PatientAndClinicSectionProps) {
	const { control } = useFormContext<CreateCaseInput | UpdateCaseInput>();

	const isEdit = mode === "edit";

	return (
		<section className="space-y-6 animate-in fade-in duration-500">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="w-1.5 h-6 bg-primary rounded-full" />
					<h2 className="text-xl font-bold tracking-tight text-foreground">Origin & Identity</h2>
				</div>
				{isEdit && (
					<div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-border text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
						<Lock className="w-3 h-3" /> Edit Mode Restricted
					</div>
				)}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-1">
				{/* 1. CLINIC SELECTOR (Editable in both modes) */}
				<div className="lg:col-span-1">
					<Controller
						control={control}
						name="clinicId"
						render={({ field, fieldState }) => (
							<ClinicSelector
								mode={mode}
								value={field.value}
								fieldError={fieldState.error}
								onCreateNew={handleOpenClinicCreationSheet}
								newCreatedClinic={newCreatedClinic}
								onSelect={(clinicId) => field.onChange(clinicId)}
							/>
						)}
					/>
				</div>

				{/* 2. DENTIST SELECTOR (Editable in both modes) */}
				<div className="lg:col-span-1">
					<Controller
						control={control}
						name="dentistId"
						render={({ field, fieldState }) => (
							<DentistSelector
								mode={mode}
								value={field.value}
								fieldError={fieldState.error}
								control={control as Control<CreateCaseInput | UpdateCaseInput>}
								onSelect={(id) => field.onChange(id)}
							/>
						)}
					/>
				</div>

				{/* 3. PATIENT SELECTOR (LOCKED IN EDIT MODE) */}
				<div className="lg:col-span-1 md:col-span-2">
					{isEdit ? (
						/* --- THE LOCKED IDENTITY CARD --- */
						<div className="flex flex-col gap-2">
							<h5 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
								Patient Identity <span className="text-primary/50">(Immutable)</span>
							</h5>
							<div className="w-full h-12 rounded-xl border border-border bg-slate-50 dark:bg-white/2 px-4 flex items-center justify-between group transition-all">
								<div className="flex items-center gap-3">
									<div className="w-7 h-7 rounded-lg bg-white dark:bg-[#121214] border border-border flex items-center justify-center text-primary shadow-sm">
										<User className="w-4 h-4" />
									</div>
									<span className="text-sm font-bold text-foreground">{patientName || "Loading Patient..."}</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="text-[9px] font-black uppercase tracking-tighter text-muted-foreground bg-white dark:bg-[#121214] border border-border px-1.5 py-0.5 rounded shadow-inner">
										ID Locked
									</span>
									<Lock className="w-3.5 h-3.5 text-slate-400" />
								</div>
							</div>
							<p className="text-[10px] text-muted-foreground ml-1">Patient identity cannot be changed after a case is registered.</p>
						</div>
					) : (
						/* --- STANDARD SELECTOR --- */
						<Controller
							control={control}
							name="patientId"
							render={({ field, fieldState }) => (
								<PatientSelector
									value={field.value as string}
									fieldError={fieldState.error}
									onCreateNew={handleOpenPatientCreationSheet}
									newCreatedPatient={newCreatedPatient}
									onSelect={(id) => {
										field.onChange(id);
										onPatientSelect?.(id);
									}}
								/>
							)}
						/>
					)}
				</div>
			</div>
		</section>
	);
});
