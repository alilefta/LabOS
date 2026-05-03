"use client";

import { memo } from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import { UserCircle, Briefcase, Building2, GraduationCap, Check } from "lucide-react";
import { InputWithLabel } from "@/components/ui/custom/input-with-label";
import { ClinicType } from "@/schema/base/enums.base";
import { cn } from "@/lib/utils";
import { CreateCompleteClinicInput, UpdateClinicInput } from "@/schema/composed/clinic.details";

const CLINIC_TYPE_OPTIONS = [
	{ id: "SOLO", label: "Solo Practice", icon: UserCircle, desc: "Single Practitioner" },
	{ id: "CLINIC", label: "Multi-Dentist", icon: Briefcase, desc: "Group Practice" },
	{ id: "HOSPITAL", label: "Medical Center", icon: Building2, desc: "Hospital Department" },
	{ id: "UNIVERSITY", label: "Academic", icon: GraduationCap, desc: "School or Research" },
];

export const ClinicIdentitySection = memo(function ClinicIdentitySection() {
	const { control, setValue } = useFormContext<CreateCompleteClinicInput | UpdateClinicInput>();

	const clinicType = useWatch({
		control,
		name: "type",
	});

	return (
		<section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
			<div className="flex items-center gap-3">
				<div className="w-1.5 h-6 bg-primary rounded-full" />
				<h2 className="text-xl font-bold tracking-tight text-foreground">Identity & Structure</h2>
			</div>

			{/* PART A: The Premium Structure Grid */}
			<div className="space-y-5">
				<div className="flex items-center justify-between px-1">
					<label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
						Practice Structure <span className="text-destructive">*</span>
					</label>
					<span className="text-[10px] font-mono text-primary font-bold bg-primary/10 px-2.5 py-0.5 rounded-md border border-primary/20">{clinicType}</span>
				</div>

				{/* 
					THE FLUID GRID ARCHITECTURE 
					auto-fit + minmax(200px, 1fr) ensures the cards NEVER shrink below 200px. 
					They will perfectly wrap to 3, 2, or 1 columns depending on the exact container width.
				*/}
				<div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 sm:gap-5 mx-2">
					{CLINIC_TYPE_OPTIONS.map((option) => {
						const isSelected = clinicType === option.id;
						return (
							<button
								key={option.id}
								type="button"
								onClick={() => setValue("type", option.id as ClinicType, { shouldValidate: true })}
								className={cn(
									"relative flex flex-col p-6 rounded-2xl border text-left transition-all duration-500 ease-out group h-full outline-none focus-visible:ring-2 focus-visible:ring-primary/50 overflow-hidden",
									isSelected
										? "bg-primary/3 border-primary/60 shadow-[0_8px_30px_-6px_rgba(37,99,235,0.2)] dark:shadow-[0_8px_30px_-6px_rgba(37,99,235,0.15)] ring-1 ring-primary/20 scale-[1.02]"
										: "bg-card border-border hover:border-primary/40 hover:bg-slate-50/50 dark:hover:bg-white/2 hover:shadow-md",
								)}
							>
								{/* Premium Hover Gradient (Only visible on hover/selected) */}
								<div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

								{/* Top Row: Icon & Animated Checkmark */}
								<div className="flex items-start justify-between w-full mb-6 relative z-10">
									<div
										className={cn(
											"w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 shadow-sm",
											isSelected
												? "bg-primary text-primary-foreground scale-110 shadow-primary/30"
												: "bg-slate-100 dark:bg-[#121214] border border-border text-slate-500 dark:text-zinc-400 group-hover:text-primary group-hover:border-primary/20",
										)}
									>
										<option.icon className="w-5 h-5" />
									</div>

									{/* Smoothly scaling checkmark indicator */}
									<div
										className={cn(
											"w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ease-out",
											isSelected ? "bg-primary text-primary-foreground scale-100 opacity-100" : "bg-transparent scale-50 opacity-0",
										)}
									>
										<Check className="w-3.5 h-3.5 stroke-3" />
									</div>
								</div>

								{/* Text Content */}
								<div className="flex flex-col relative z-10 mt-auto">
									<span
										className={cn(
											"text-[15px] font-bold tracking-tight mb-1.5 transition-colors duration-300",
											isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
										)}
									>
										{option.label}
									</span>
									<span className="text-xs text-muted-foreground/80 font-medium leading-relaxed">{option.desc}</span>
								</div>
							</button>
						);
					})}
				</div>
			</div>

			{/* PART B: Core Brand Identity */}
			<div className="lab-card p-6 sm:p-8 space-y-6">
				<Controller
					control={control}
					name="name"
					render={({ field, fieldState }) => (
						<InputWithLabel
							field={field}
							fieldState={fieldState}
							fieldTitle={clinicType === "SOLO" ? "Practice Name (or Doctor's Name)" : "Clinic / Hospital Name"}
							nameInSchema="name"
							placeholder={clinicType === "SOLO" ? "e.g. Dr. Sarah Mitchell" : "e.g. Apex Dental Design"}
						/>
					)}
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Controller
						control={control}
						name="phoneNumber"
						render={({ field, fieldState }) => (
							<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Main Phone Number" nameInSchema="phoneNumber" placeholder="+1 (555) 000-0000" />
						)}
					/>
					<Controller
						control={control}
						name="email"
						render={({ field, fieldState }) => <InputWithLabel field={field} fieldState={fieldState} fieldTitle="Primary Email" nameInSchema="email" placeholder="hello@clinic.com" />}
					/>
				</div>

				<div className="pt-2">
					<Controller
						control={control}
						name="website"
						render={({ field, fieldState }) => (
							<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Website URL" nameInSchema="website" placeholder="https://www.clinic.com" isOptional />
						)}
					/>
				</div>
			</div>
		</section>
	);
});
