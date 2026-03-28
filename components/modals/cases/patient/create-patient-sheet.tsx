"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus, Sparkles, Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/custom/input-with-label";
import { toast } from "sonner";
import { CreatePatientInput, CreatePatientInputSchema, PatientDetails } from "@/schema/composed/patient.details";
import { useAction } from "next-safe-action/hooks";
import { createPatientAction } from "@/actions/patient";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { InputGroupTextarea } from "@/components/ui/input-group";
import { CustomFieldWithLabel } from "@/components/ui/custom/custom-field-with-label";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onPatientCreated: (newPatient: PatientDetails) => void;
}

export function RegisterPatientSheet({ isOpen, onClose, onPatientCreated }: Props) {
	const form = useForm<CreatePatientInput>({
		resolver: zodResolver(CreatePatientInputSchema),
		defaultValues: { name: "", description: "", notes: "", age: undefined, gender: undefined },
		mode: "onBlur",
	});

	const { executeAsync: registerPatient, isExecuting } = useAction(createPatientAction, {
		onSuccess: ({ data }) => {
			toast.success("Clinical profile created");
			onPatientCreated(data.patient);
			onClose();
			form.reset();
		},
		onError: ({ error }) => {
			handleSafeActionError(error);
		},
	});

	useEffect(() => {
		console.log(form.formState.errors);
	}, [form.formState.errors]);

	const onSubmit = async (data: CreatePatientInput) => {
		await registerPatient(data);
	};

	const isDirty = form.formState.dirtyFields.name;

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className="sm:max-w-md! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* --- HEADER --- */}
				<SheetHeader className="p-8 border-b border-border bg-linear-to-br from-primary/5 to-transparent relative overflow-hidden">
					<div className="absolute top-0 right-0 p-8 opacity-10">
						<UserPlus className="w-24 h-24 text-primary" />
					</div>

					<div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-ai-glow-light dark:shadow-ai-glow-dark">
						<Sparkles className="w-6 h-6" />
					</div>
					<SheetTitle className="text-2xl font-bold tracking-tight text-foreground">Register New Patient</SheetTitle>
					<SheetDescription className="text-sm text-muted-foreground font-medium">Create a clinical profile to track medical history and case trends.</SheetDescription>
				</SheetHeader>

				{/* --- FORM BODY --- */}
				<div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
					<form id="quick-patient-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						{/* Section 1: Identity */}
						<div className="space-y-5">
							<Controller
								control={form.control}
								name="name"
								render={({ field, fieldState }) => <InputWithLabel field={field} fieldState={fieldState} fieldTitle="Full Name" nameInSchema="name" placeholder="Johnathan Sterling" />}
							/>

							<div className="grid grid-cols-2 gap-4">
								<Controller
									control={form.control}
									name="age"
									render={({ field, fieldState }) => (
										<InputWithLabel
											field={field}
											fieldState={fieldState}
											fieldTitle="Patient Age"
											nameInSchema="age"
											placeholder="e.g. 45"
											type="number"
											isOptional
											min={0}
											max={120}
										/>
									)}
								/>

								{/* Custom Gender Selector */}
								<Controller
									control={form.control}
									name="gender"
									render={({ field, fieldState }) => (
										<CustomFieldWithLabel field={field} nameInSchema="gender" fieldState={fieldState} fieldTitle="Gender" isOptional>
											<div id="gender" className="flex p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-border h-11">
												{["MALE", "FEMALE", "OTHER"].map((g) => (
													<button
														key={g}
														type="button"
														onClick={() => field.onChange(g)}
														className={cn(
															"flex-1 text-[10px] font-bold rounded-lg transition-all uppercase tracking-tighter",
															field.value === g ? "bg-white dark:bg-[#121214] text-primary shadow-sm" : "text-muted-foreground hover:text-foreground",
														)}
													>
														{g.charAt(0) + g.slice(1).toLowerCase()}
													</button>
												))}
											</div>
										</CustomFieldWithLabel>
									)}
								/>
							</div>
						</div>

						{/* Section 2: Clinical Context */}
						<div className="space-y-5 pt-2">
							<Controller
								control={form.control}
								name="description"
								render={({ field, fieldState }) => (
									<CustomFieldWithLabel
										field={field}
										fieldState={fieldState}
										nameInSchema="description"
										fieldTitle="Clinical Description"
										isOptional
										labelClassName="dark:text-muted-foreground text-muted-foreground"
									>
										<InputGroupTextarea
											{...field}
											value={field.value ?? ""}
											rows={4}
											aria-invalid={fieldState.invalid}
											id="description"
											placeholder="Brief overview of clinical condition..."
											className="w-full min-h-20 p-3 bg-white max-h-32 dark:bg-[#121214] border border-border rounded-xl text-sm focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
										/>
									</CustomFieldWithLabel>
								)}
							/>

							<Controller
								control={form.control}
								name="notes"
								render={({ field, fieldState }) => (
									<CustomFieldWithLabel field={field} fieldState={fieldState} nameInSchema="notes" fieldTitle="Internal Lab Notes" isOptional labelClassName="dark:text-ai text-ai">
										<InputGroupTextarea
											{...field}
											placeholder="Technical preferences, history of remakes, etc..."
											id="notes"
											rows={4}
											aria-invalid={fieldState.invalid}
											className="w-full min-h-20 p-3 max-h-32 bg-white dark:bg-[#121214] border border-border rounded-xl text-sm focus:ring-1 focus:ring-ai outline-none transition-all resize-none shadow-sm"
										/>
									</CustomFieldWithLabel>
								)}
							/>
						</div>

						{/* AI Intelligence Badge */}
						<div className="p-4 rounded-2xl bg-ai/5 border border-ai/10 flex gap-3 items-start animate-in fade-in slide-in-from-bottom-2">
							<Sparkles className="w-4 h-4 text-ai shrink-0 mt-0.5" />
							<p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
								<span className="text-ai font-bold uppercase">Clinical Pro Tip:</span> Adding the <span className="text-foreground font-bold">Age</span> and{" "}
								<span className="text-foreground font-bold">Gender</span> helps the technician determine the most natural translucency and anatomy for the restoration.
							</p>
						</div>
					</form>
				</div>

				{/* --- FOOTER --- */}
				<SheetFooter className="p-8 border-t border-border bg-slate-50/30 dark:bg-white/1">
					<Button variant="ghost" onClick={onClose} className="rounded-xl h-11! px-6 font-semibold">
						Cancel
					</Button>
					<Button
						type="submit"
						disabled={isExecuting || !isDirty}
						form="quick-patient-form"
						className="rounded-xl flex items-center justify-center gap-2 h-11 bg-primary shadow-premium font-bold hover:bg-primary/90 transition-all "
					>
						{isExecuting ? (
							<>
								<Loader2 className="animate-spin w-4 h-4" /> Registering...
							</>
						) : (
							<>Register Clinical Profile</>
						)}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
