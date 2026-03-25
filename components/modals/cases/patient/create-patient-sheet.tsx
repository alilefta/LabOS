"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus, Sparkles, MapPin, Phone, Mail, Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/custom/input-with-label";
import { toast } from "sonner";
import z from "zod";
import { CreatePatientInput, CreatePatientInputSchema } from "@/schema/composed/patient.details";
import { PatientBase } from "@/schema/base/patient.base";
import { useAction } from "next-safe-action/hooks";
import { createPatientAction } from "@/actions/patient";
import { handleSafeActionError } from "@/lib/safe-action-helpers";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onPatientCreated: (patientId: string) => void;
}

export function RegisterPatientSheet({ isOpen, onClose, onPatientCreated }: Props) {
	const form = useForm<CreatePatientInput>({
		resolver: zodResolver(CreatePatientInputSchema),
		defaultValues: { name: "", email: "", phoneNumber: "", city: "", address1: "", zipcode: "" },
	});

	const { executeAsync: registerPatient, isExecuting } = useAction(createPatientAction, {
		onSuccess: ({ data }) => {
			toast.success("Patient registered successfully");

			onPatientCreated(data.patient.id);
			onClose();
		},
		onError: ({ error }) => {
			handleSafeActionError(error);
		},
	});

	const onSubmit = async (data: CreatePatientInput) => {
		await registerPatient(data);
	};

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className="sm:max-w-md! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* Header with Neon Sparkle */}
				<SheetHeader className="p-8 border-b border-border bg-linear-to-br from-primary/5 to-transparent relative overflow-hidden">
					<div className="absolute top-0 right-0 p-8 opacity-10">
						<UserPlus className="w-24 h-24 text-primary" />
					</div>

					<div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-ai-glow-light dark:shadow-ai-glow-dark">
						<Sparkles className="w-6 h-6" />
					</div>
					<SheetTitle className="text-2xl font-bold tracking-tight text-foreground">Register New Patient</SheetTitle>
					<SheetDescription className="text-sm text-muted-foreground font-medium">Create a clinical profile. This patient will be indexed for all future cases.</SheetDescription>
				</SheetHeader>

				{/* Form Body - Scrollable */}
				<div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
					<form
						id="quick-patient-form"
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit(onSubmit);
						}}
						className="space-y-6"
					>
						<div className="space-y-5">
							<Controller
								control={form.control}
								name="name"
								render={({ field, fieldState }) => <InputWithLabel field={field} fieldState={fieldState} fieldTitle="Full Name" nameInSchema="name" placeholder="Johnathan Sterling" />}
							/>

							<div className="grid grid-cols-2 gap-4">
								<Controller
									control={form.control}
									name="phoneNumber"
									render={({ field, fieldState }) => (
										<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Phone Number" nameInSchema="phoneNumber" placeholder="+1 (555) 000-0000" />
									)}
								/>
								<Controller
									control={form.control}
									name="email"
									render={({ field, fieldState }) => (
										<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Email (Optional)" nameInSchema="email" placeholder="patient@email.com" isOptional />
									)}
								/>
							</div>

							<Controller
								control={form.control}
								name="address1"
								render={({ field, fieldState }) => (
									<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Street Address" nameInSchema="address1" placeholder="123 Clinical Way" />
								)}
							/>

							<div className="grid grid-cols-2 gap-4">
								<Controller
									control={form.control}
									name="city"
									render={({ field, fieldState }) => <InputWithLabel field={field} fieldState={fieldState} fieldTitle="City" nameInSchema="city" placeholder="Miami" />}
								/>
								<Controller
									control={form.control}
									name="zipcode"
									render={({ field, fieldState }) => <InputWithLabel field={field} fieldState={fieldState} fieldTitle="Zip Code" nameInSchema="zipcode" placeholder="33101" />}
								/>
							</div>
						</div>

						{/* AI Intelligence Badge */}
						<div className="p-4 rounded-2xl bg-ai/5 border border-ai/10 flex gap-3 items-start animate-in fade-in slide-in-from-bottom-2">
							<Sparkles className="w-4 h-4 text-ai shrink-0 mt-0.5" />
							<p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
								<span className="text-ai font-bold uppercase">Pro Tip:</span> Providing a correct Zip Code helps the AI auditor estimate accurate shipping times for this patient&apos;s
								cases.
							</p>
						</div>
					</form>
				</div>

				{/* Footer Actions */}
				<SheetFooter className="p-8 border-t border-border bg-slate-50/30 dark:bg-white/1">
					<Button variant="ghost" onClick={onClose} className="rounded-xl h-11! px-6 font-semibold">
						Cancel
					</Button>
					<button type="submit" form="quick-patient-form" className="rounded-xl  h-11 bg-primary shadow-premium font-bold hover:bg-primary/90 transition-all ">
						Register Patient
					</button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
