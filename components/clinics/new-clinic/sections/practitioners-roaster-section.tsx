"use client";

import { useFormContext, Controller, useWatch, useFieldArray } from "react-hook-form";
import { Stethoscope, Sparkles, Plus, Trash2, Users } from "lucide-react";
import { InputWithLabel } from "@/components/ui/custom/input-with-label";
import { CustomFieldWithLabel } from "@/components/ui/custom/custom-field-with-label";
import { CreateCompleteClinicInput } from "@/schema/composed/clinic.details";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PractitionerRosterSection() {
	const { control, setValue } = useFormContext<CreateCompleteClinicInput>();

	// Watch the clinic type to adjust our copywriting and logic
	const clinicType = useWatch({ control, name: "type" });
	const isSolo = clinicType === "SOLO";

	// Force isOwner to true for primary dentist if it's a solo practice
	if (isSolo) {
		setValue("primaryDentist.isOwner", true);
	}

	// Setup Field Array for Additional Dentists
	const { fields, append, remove } = useFieldArray({
		control,
		name: "additionalDentists",
	});

	return (
		<section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="w-1.5 h-6 bg-primary rounded-full" />
					<h2 className="text-xl font-bold tracking-tight text-foreground">Practitioner Roster</h2>
				</div>

				{/* The "Add Doctor" button is only visible if it's NOT a Solo practice */}
				{!isSolo && (
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={() => append({ name: "", email: "", phoneNumber: "", notes: "", isOwner: false, isDefault: false })}
						className="h-9 rounded-xl border-dashed border-primary/50 text-primary hover:bg-primary/5 font-bold transition-all"
					>
						<Plus className="w-3.5 h-3.5 mr-1.5" /> Add Associate
					</Button>
				)}
			</div>

			<div className="space-y-6">
				{/* --- 1. PRIMARY DENTIST CARD --- */}
				<div className="lab-card p-6 sm:p-8 space-y-8 relative overflow-hidden group">
					{/* Ambient indicator for the "Lead" doctor */}
					<div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

					<div className="space-y-6 relative z-10">
						<div className="flex items-center justify-between mb-2">
							<div className="flex items-center gap-2">
								<Stethoscope className="w-4 h-4 text-primary" />
								<h4 className="text-[11px] font-bold uppercase tracking-widest text-primary">{isSolo ? "Solo Practice Owner" : "Lead / Primary Doctor"}</h4>
							</div>
							<span className="px-2 py-0.5 rounded border border-border bg-slate-100 dark:bg-white/5 text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Required</span>
						</div>

						<Controller
							control={control}
							name="primaryDentist.name"
							render={({ field, fieldState }) => (
								<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Doctor's Name" nameInSchema="primaryDentist.name" placeholder="Dr. Sarah Mitchell" />
							)}
						/>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Controller
								control={control}
								name="primaryDentist.phoneNumber"
								render={({ field, fieldState }) => (
									<InputWithLabel
										field={field}
										fieldState={fieldState}
										fieldTitle="Direct Phone (Optional)"
										nameInSchema="primaryDentist.phoneNumber"
										placeholder="+1 (555) 000-0000"
										isOptional
									/>
								)}
							/>
							<Controller
								control={control}
								name="primaryDentist.email"
								render={({ field, fieldState }) => (
									<InputWithLabel
										field={field}
										fieldState={fieldState}
										fieldTitle="Direct Email (Optional)"
										nameInSchema="primaryDentist.email"
										placeholder="doctor@clinic.com"
										isOptional
									/>
								)}
							/>
						</div>
					</div>
				</div>

				{/* --- 2. ADDITIONAL DENTISTS LIST --- */}
				{!isSolo && fields.length > 0 && (
					<div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
						<div className="flex items-center gap-2 px-1 mb-2">
							<Users className="w-4 h-4 text-muted-foreground" />
							<h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Associate Doctors ({fields.length})</h4>
						</div>

						{fields.map((field, index) => (
							<div key={field.id} className="lab-card p-6 border-slate-200/60 dark:border-white/5 relative group/associate animate-in fade-in zoom-in-95 duration-300">
								<div className="flex items-center justify-between mb-5">
									<span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-white/5 border border-border flex items-center justify-center text-[10px] font-bold text-muted-foreground">
										#{index + 1}
									</span>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										onClick={() => remove(index)}
										className="h-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 -mr-2"
									>
										<Trash2 className="w-4 h-4 sm:mr-1.5" />
										<span className="hidden sm:inline">Remove</span>
									</Button>
								</div>

								<div className="space-y-6">
									<Controller
										control={control}
										name={`additionalDentists.${index}.name`}
										render={({ field: inputField, fieldState }) => (
											<InputWithLabel
												field={inputField}
												fieldState={fieldState}
												fieldTitle="Doctor's Name"
												nameInSchema={`additionalDentists.${index}.name`}
												placeholder="Dr. John Smith"
											/>
										)}
									/>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<Controller
											control={control}
											name={`additionalDentists.${index}.phoneNumber`}
											render={({ field: inputField, fieldState }) => (
												<InputWithLabel
													field={inputField}
													fieldState={fieldState}
													fieldTitle="Direct Phone (Optional)"
													nameInSchema={`additionalDentists.${index}.phoneNumber`}
													placeholder="+1 (555) 000-0000"
													isOptional
												/>
											)}
										/>
										<Controller
											control={control}
											name={`additionalDentists.${index}.email`}
											render={({ field: inputField, fieldState }) => (
												<InputWithLabel
													field={inputField}
													fieldState={fieldState}
													fieldTitle="Direct Email (Optional)"
													nameInSchema={`additionalDentists.${index}.email`}
													placeholder="doctor@clinic.com"
													isOptional
												/>
											)}
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				{/* --- 3. CLINIC-WIDE AI NOTES AREA --- */}
				<div className="lab-card p-6 sm:p-8 mt-6">
					<Controller
						control={control}
						name="notes"
						render={({ field, fieldState }) => (
							<CustomFieldWithLabel
								field={field}
								fieldState={fieldState}
								nameInSchema="notes"
								fieldTitle="Global Clinical Preferences"
								labelClassName="text-ai dark:text-ai flex items-center gap-1.5"
								isOptional
							>
								{/* Custom label child injected via CustomFieldWithLabel architecture */}
								<div className="relative group/notes">
									{/* Violet AI Glow Behind Textarea */}
									<div className="absolute -inset-0.5 bg-ai/20 rounded-xl blur opacity-0 group-focus-within/notes:opacity-100 transition duration-500" />

									<textarea
										{...field}
										value={field.value ?? ""}
										placeholder="e.g., Clinic prefers digital impressions, uses Trios scanner, needs 3-day turnaround for Zirconia."
										className={cn(
											"relative w-full min-h-[100px] p-4 bg-white dark:bg-[#121214] border border-border rounded-xl text-sm outline-none transition-all resize-none shadow-sm custom-scrollbar",
											"focus:border-ai focus:ring-[3px] focus:ring-ai/20",
											fieldState.invalid && "border-destructive focus:border-destructive focus:ring-destructive/20",
										)}
									/>
									<Sparkles className="absolute top-4 right-4 w-4 h-4 text-ai/40 group-focus-within/notes:text-ai transition-colors pointer-events-none" />
								</div>
							</CustomFieldWithLabel>
						)}
					/>

					{/* AI Intelligence Badge */}
					<div className="mt-6 p-4 rounded-2xl bg-ai/5 border border-ai/10 flex gap-3 items-start">
						<Sparkles className="w-4 h-4 text-ai shrink-0 mt-0.5" />
						<p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
							<span className="text-ai font-bold uppercase">Clinical Intelligence:</span>
							LabOS AI will scan these notes and automatically alert technicians during case production if specific preferences (like tight contacts or heavy glaze) are requested.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
