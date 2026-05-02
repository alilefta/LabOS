"use client";

import { useFormContext, Controller, useWatch } from "react-hook-form";
import { Stethoscope, Sparkles } from "lucide-react";
import { InputWithLabel } from "@/components/ui/custom/input-with-label";
import { CustomFieldWithLabel } from "@/components/ui/custom/custom-field-with-label";
import { CreateClinicInput } from "@/schema/composed/clinic.details";
import { cn } from "@/lib/utils";

export function LeadDoctorSection() {
	const { control, setValue } = useFormContext<CreateClinicInput>();

	// Watch the clinic type to adjust our copywriting
	const clinicType = useWatch({ control, name: "type" });
	const isSolo = clinicType === "SOLO";

	// Force isOwner to true if it's a solo practice behind the scenes
	if (isSolo) {
		setValue("primaryDentist.isOwner", true);
	}

	return (
		<section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
			<div className="flex items-center gap-3">
				<div className="w-1.5 h-6 bg-primary rounded-full" />
				<h2 className="text-xl font-bold tracking-tight text-foreground">Lead Doctor & Preferences</h2>
			</div>

			<div className="lab-card p-6 sm:p-8 space-y-8">
				{/* Doctor Info */}
				<div className="space-y-6">
					<div className="flex items-center gap-2 mb-2">
						<Stethoscope className="w-4 h-4 text-muted-foreground" />
						<h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{isSolo ? "Solo Practice Owner" : "Primary Contact Doctor"}</h4>
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

				{/* The AI Notes Area */}
				<div className="pt-6 border-t border-border">
					<Controller
						control={control}
						name="notes"
						render={({ field, fieldState }) => (
							<CustomFieldWithLabel
								field={field}
								fieldState={fieldState}
								nameInSchema="notes"
								fieldTitle="Lab Notes & Preferences"
								labelClassName="text-ai dark:text-ai flex items-center gap-1.5"
								isOptional
							>
								{/* Custom label child injected via CustomFieldWithLabel architecture */}
								<div className="relative group">
									{/* Violet AI Glow Behind Textarea */}
									<div className="absolute -inset-0.5 bg-ai/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />

									<textarea
										{...field}
										value={field.value ?? ""}
										placeholder="e.g., Prefers digital impressions, uses Trios scanner, needs 3-day turnaround for Zirconia."
										className={cn(
											"relative w-full min-h-[100px] p-4 bg-white dark:bg-[#121214] border border-border rounded-xl text-sm outline-none transition-all resize-none shadow-sm custom-scrollbar",
											"focus:border-ai focus:ring-[3px] focus:ring-ai/20",
											fieldState.invalid && "border-destructive focus:border-destructive focus:ring-destructive/20",
										)}
									/>
									<Sparkles className="absolute top-4 right-4 w-4 h-4 text-ai/40 group-focus-within:text-ai transition-colors" />
								</div>
							</CustomFieldWithLabel>
						)}
					/>
				</div>
			</div>
		</section>
	);
}
