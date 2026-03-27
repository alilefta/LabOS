"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Sparkles, Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/custom/input-with-label";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { ClinicDetailsUI, CreateClinicInput, CreateClinicInputSchema } from "@/schema/composed/clinic.details";
import { createClinicAction } from "@/actions/clinic";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { cn } from "@/lib/utils";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onClinicCreated?: (newClinic: ClinicDetailsUI) => void;
}

type QueryDataShape = ClinicDetailsUI[];

export function RegisterClinicSheet({ isOpen, onClose, onClinicCreated }: Props) {
	const form = useForm<CreateClinicInput>({
		resolver: zodResolver(CreateClinicInputSchema),
		defaultValues: {
			name: "",
			type: "CLINIC",
			city: "",
			address1: "",
			email: "",
			phoneNumber: "",
			currentBalance: 0,
			status: "ACTIVE",
			address2: "",
			billingEmail: "",
			website: "",
			billingPhoneNumber: "",
			creditLimit: 0,
			description: "",
			discount: 0,
			notes: "",
			taxNumber: "",
			zipcode: "",

			primaryDentist: {
				name: "",
				email: "",
				phoneNumber: "",
				notes: "",
			},
		},
		mode: "onBlur",
	});

	const clinicType = form.watch("type");

	const queryClient = useQueryClient();

	const { executeAsync: registerClinic, isExecuting } = useAction(createClinicAction, {
		onSuccess: ({ data }) => {
			toast.success("Clinic partner registered!");

			// Update the TanStack Query Cache for the Selector
			queryClient.setQueryData<QueryDataShape>(["clinics", "search", ""], (old: QueryDataShape | undefined) => {
				return old ? [data.clinic, ...old] : [data.clinic];
			});

			if (onClinicCreated) onClinicCreated(data.clinic);
			onClose();
			form.reset();
		},
		onError: ({ error }) => handleSafeActionError(error),
	});

	const onSubmit = async (data: CreateClinicInput) => {
		await registerClinic(data);
	};

	const isDirty =
		form.formState.dirtyFields.name && form.formState.dirtyFields.city && form.formState.dirtyFields.address1 && form.formState.dirtyFields.phoneNumber && form.formState.dirtyFields.email;

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className="sm:max-w-md! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				<SheetHeader className="p-8 border-b border-border bg-linear-to-br from-primary/5 to-transparent relative overflow-hidden">
					<div className="absolute top-0 right-0 p-8 opacity-10">
						<Building2 className="w-24 h-24" />
					</div>
					<div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-ai-glow-light">
						<Building2 className="w-6 h-6" />
					</div>
					<SheetTitle className="text-2xl font-bold tracking-tight">Register Clinic Partner</SheetTitle>
					<SheetDescription className="text-sm text-muted-foreground">Define the clinic brand and its primary dental practitioner.</SheetDescription>
				</SheetHeader>

				<div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
					<form id="quick-clinic-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
						{/* SECTION 1: CLINIC TYPE TOGGLE */}
						<section className="space-y-4">
							<label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Practice Structure</label>
							<div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-border">
								{["CLINIC", "SOLO"].map((type) => (
									<button
										key={type}
										type="button"
										onClick={() => form.setValue("type", type as any)}
										className={cn(
											"flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all",
											clinicType === type ? "bg-white dark:bg-[#121214] text-primary shadow-sm" : "text-muted-foreground hover:text-foreground",
										)}
									>
										{type === "SOLO" ? <UserCircle className="w-3.5 h-3.5" /> : <Briefcase className="w-3.5 h-3.5" />}
										{type === "SOLO" ? "Solo Practice" : "Multi-Dentist"}
									</button>
								))}
							</div>
						</section>

						{/* SECTION 2: CLINIC DETAILS */}
						<div className="space-y-5">
							<div className="flex items-center gap-2 mb-2">
								<Building2 className="w-4 h-4 text-primary" />
								<h4 className="text-xs font-bold uppercase tracking-widest">Clinic Identity</h4>
							</div>
							<Controller
								control={form.control}
								name="name"
								render={({ field, fieldState }) => (
									<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Clinic Name" nameInSchema="name" placeholder="Apex Dental Design" />
								)}
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
										<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Clinic Email" nameInSchema="email" placeholder="orders@clinic.com" />
									)}
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<Controller
									control={form.control}
									name="address1"
									render={({ field, fieldState }) => (
										<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Address" nameInSchema="address1" placeholder="789 Professional Dr." />
									)}
								/>
								<Controller
									control={form.control}
									name="city"
									render={({ field, fieldState }) => <InputWithLabel field={field} fieldState={fieldState} fieldTitle="City" nameInSchema="city" placeholder="Miami" />}
								/>
							</div>
						</div>

						{/* SECTION 3: PRIMARY DENTIST */}
						<div className="space-y-5 pt-6 border-t border-border">
							<div className="flex items-center gap-2 mb-2">
								<Stethoscope className="w-4 h-4 text-ai" />
								<h4 className="text-xs font-bold uppercase tracking-widest">Lead Practitioner</h4>
							</div>
							<Controller
								control={form.control}
								name="primaryDentist.name"
								render={({ field, fieldState }) => (
									<InputWithLabel
										field={field}
										fieldState={fieldState}
										fieldTitle={clinicType === "SOLO" ? "Dentist Name (Owner)" : "Lead Dentist Name"}
										nameInSchema="primaryDentist.name"
										placeholder="Dr. Sarah Mitchell"
									/>
								)}
							/>
							<div className="p-4 rounded-2xl bg-ai/5 border border-ai/10 flex gap-3 items-start animate-in fade-in duration-500">
								<Sparkles className="w-4 h-4 text-ai shrink-0 mt-0.5" />
								<p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
									<span className="text-ai font-bold uppercase">Clinical Intelligence:</span>
									Associating a Lead Dentist helps LabOS track specific preference patterns (e.g. "Dr. Mitchell prefers heavier proximal contacts").
								</p>
							</div>
						</div>
					</form>
				</div>

				<SheetFooter className="p-8 border-t border-border bg-slate-50/30 dark:bg-white/1">
					<Button variant="ghost" onClick={onClose} className="rounded-xl h-11! px-6 font-semibold">
						Cancel
					</Button>
					<Button
						type="submit"
						disabled={isExecuting || !form.formState.isDirty}
						form="quick-clinic-form"
						className="rounded-xl flex items-center justify-center gap-2 h-11 bg-primary shadow-premium font-bold hover:bg-primary/90 transition-all flex-1"
					>
						{isExecuting ? <Loader2 className="animate-spin" /> : "Register Partner"}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
