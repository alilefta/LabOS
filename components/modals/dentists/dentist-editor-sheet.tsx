"use client";

import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stethoscope, Sparkles, Loader2, Medal, UserPlus, Phone, PencilLine, Check, Plus } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/custom/input-with-label";
import { CustomFieldWithLabel } from "@/components/ui/custom/custom-field-with-label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { handleSafeActionError } from "@/lib/safe-action-helpers";

// Types & Actions
import { CreateDentistInput, CreateDentistInputSchema, UpdateDentistInput } from "@/schema/composed/dentist.details";
import { CatalogImageUpload } from "@/components/shared/file-assets/catalog-image-upload";
import { createDentistAction } from "@/actions/dentists/create-dentist";
import { DentistBase } from "@/schema/base/dentist.base";
import { memo, useEffect } from "react";
import { updateDentistAction } from "@/actions/dentists/update-dentist";
import { getDentistByIdAction } from "@/actions/dentists/get-dentist";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	clinicId: string;
	dentistIdToEdit: string | null;
}

export const DentistEditorSheet = memo(function DentistEditorSheet({ isOpen, onClose, clinicId, dentistIdToEdit }: Props) {
	const queryClient = useQueryClient();
	const isEdit = !!dentistIdToEdit;

	const { data: initialData, isFetching: isFetchingDetails } = useQuery({
		queryKey: ["dentist-details", dentistIdToEdit],
		queryFn: async () => {
			if (!dentistIdToEdit) return null;
			const res = await getDentistByIdAction({ clinicId, dentistId: dentistIdToEdit });
			return res.data?.dentist as DentistBase;
		},
		enabled: isOpen && isEdit,
		staleTime: Infinity,
	});

	const form = useForm<CreateDentistInput>({
		resolver: zodResolver(CreateDentistInputSchema),
		defaultValues: {
			clinicId,
			name: "",
			email: "",
			phoneNumber: "",
			speciality: "",
			licenseNumber: "",
			isOwner: false,
			isDefault: false,
			notes: "",
			avatarUrl: "",
		},
		mode: "onBlur",
	});
	useEffect(() => {
		if (isOpen && isEdit && initialData) {
			form.reset({
				clinicId,
				name: initialData.name || "",
				speciality: initialData.specialty || "",
				email: initialData.email || "",
				phoneNumber: initialData.phoneNumber || "",
				notes: initialData.notes || "",
				avatarUrl: initialData.avatarUrl || "",
				licenseNumber: initialData.licenseNumber || "",
				isOwner: initialData.isOwner || false,
				isDefault: initialData.isDefault || false,
			});
		}

		if (!isOpen) {
			form.reset();
		}
	}, [isOpen, isEdit, initialData]); // form intentionally omitted

	const { executeAsync: createDentist, isExecuting: isCreating } = useAction(createDentistAction, {
		onSuccess: () => {
			toast.success("Practitioner added to roster");
			queryClient.invalidateQueries({ queryKey: ["clinic-dentists", clinicId] });
			onClose();
		},
		onError: ({ error }) => handleSafeActionError(error),
	});

	const { executeAsync: updateDentist, isExecuting: isUpdating } = useAction(updateDentistAction, {
		onSuccess: () => {
			toast.success("Clinical profile updated");
			queryClient.invalidateQueries({ queryKey: ["clinic-dentists", clinicId] });
			onClose();
		},
		onError: ({ error }) => handleSafeActionError(error),
	});

	const onSubmit = async (data: CreateDentistInput) => {
		if (isEdit && dentistIdToEdit) {
			await updateDentist({ ...data, dentistId: dentistIdToEdit } as UpdateDentistInput);
		} else {
			await createDentist(data);
		}
	};

	const isProcessing = isCreating || isUpdating;
	console.log("Sheet render:", { isOpen, isEdit, isFetchingDetails, hasInitialData: !!initialData });

	return (
		<Sheet
			open={isOpen}
			onOpenChange={(open) => {
				// Only trigger onClose if the internal state of the Sheet library
				// is actually trying to close the component.
				if (!open) onClose();
			}}
		>
			<SheetContent className="lg:max-w-md! max-w-full! w-full! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* --- DYNAMIC HEADER --- */}
				<SheetHeader className="p-8 border-b border-border bg-linear-to-br from-primary/5 to-transparent relative overflow-hidden shrink-0">
					<div className="absolute top-0 right-0 p-8 opacity-10">
						<Stethoscope className="w-24 h-24 text-primary" />
					</div>
					<div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-ai-glow-light">
						{isEdit ? <PencilLine className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />}
					</div>
					<SheetTitle className="text-2xl font-bold tracking-tight text-foreground">{isEdit ? "Edit practitioner" : "Register practitioner"}</SheetTitle>
					<SheetDescription className="text-sm text-muted-foreground font-medium">
						{isEdit ? "Modify clinical identity and technical preferences." : "Add a new doctor to this clinic's operational roster."}
					</SheetDescription>
				</SheetHeader>

				{/* --- FORM BODY --- */}
				<div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
					{/* 1. The Skeleton Layer (Overlay) */}
					{isFetchingDetails && (
						<div className="absolute inset-0 z-50 bg-card dark:bg-[#09090B] p-8 space-y-8">
							<div className="flex flex-col items-center gap-4">
								<Skeleton className="w-28 h-28 rounded-3xl" />
								<Skeleton className="h-4 w-32" />
							</div>
							<div className="space-y-4">
								<Skeleton className="h-10 w-full rounded-xl" />
								<div className="grid grid-cols-2 gap-4">
									<Skeleton className="h-10 w-full rounded-xl" />
									<Skeleton className="h-10 w-full rounded-xl" />
								</div>
							</div>
							<Skeleton className="h-32 w-full rounded-xl" />
						</div>
					)}
					<div className={cn("transition-opacity duration-500", isFetchingDetails ? "opacity-0 pointer-events-none" : "opacity-100")}>
						<FormProvider {...form}>
							<form id="dentist-editor-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
								<div className="animate-in fade-in slide-in-from-top-2 duration-500 space-y-8">
									{/* --- SECTION 1: IDENTITY & PHOTO --- */}
									<div className="space-y-6">
										<div className="flex items-center gap-2 mb-2">
											<Medal className="w-4 h-4 text-primary" />
											<h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Clinical identity</h4>
										</div>

										{/* THE NEW UPLOAD COMPONENT */}
										<div className="p-6 rounded-3xl bg-slate-50 dark:bg-white/2 border border-border/50">
											<CatalogImageUpload<CreateDentistInput> nameInSchema="avatarUrl" label="Practitioner" />
										</div>

										<Controller
											control={form.control}
											name="name"
											render={({ field, fieldState }) => (
												<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Doctor's full name" nameInSchema="name" placeholder="John Doe" />
											)}
										/>

										<div className="grid grid-cols-2 gap-4">
											<Controller
												control={form.control}
												name="speciality"
												render={({ field, fieldState }) => (
													<InputWithLabel
														field={field}
														fieldState={fieldState}
														fieldTitle="Speciality"
														nameInSchema="speciality"
														placeholder="e.g. Prosthodontist"
														isOptional
													/>
												)}
											/>
											<Controller
												control={form.control}
												name="licenseNumber"
												render={({ field, fieldState }) => (
													<InputWithLabel
														field={field}
														fieldState={fieldState}
														fieldTitle="License / NPI"
														nameInSchema="licenseNumber"
														placeholder="Required for Rx"
														isOptional
													/>
												)}
											/>
										</div>
									</div>

									{/* 2. Contact Channels */}
									<div className="space-y-5 pt-6 border-t border-border">
										<div className="flex items-center gap-2 mb-2">
											<Phone className="w-4 h-4 text-primary" />
											<h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Contact information</h4>
										</div>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											<Controller
												control={form.control}
												name="phoneNumber"
												render={({ field, fieldState }) => (
													<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Direct phone" nameInSchema="phoneNumber" placeholder="+1..." isOptional />
												)}
											/>
											<Controller
												control={form.control}
												name="email"
												render={({ field, fieldState }) => (
													<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Direct email" nameInSchema="email" placeholder="doctor@clinic.com" isOptional />
												)}
											/>
										</div>
									</div>

									{/* 3. Management Toggles */}
									<div className="space-y-4 pt-6 border-t border-border">
										<div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-white/2 border border-border">
											<div className="flex flex-col gap-0.5">
												<span className="text-[13px] font-bold text-foreground">Clinic owner</span>
												<span className="text-[10px] text-muted-foreground">This doctor owns the practice business.</span>
											</div>
											<Controller
												control={form.control}
												name="isOwner"
												render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-primary" />}
											/>
										</div>

										<div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-white/2 border border-border">
											<div className="flex flex-col gap-0.5">
												<span className="text-[13px] font-bold text-foreground">Primary contact</span>
												<span className="text-[10px] text-muted-foreground">Default prescriber for new cases.</span>
											</div>
											<Controller
												control={form.control}
												name="isDefault"
												render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-primary" />}
											/>
										</div>
									</div>

									{/* 4. Internal Lab Notes */}
									<div className="pt-6 border-t border-border">
										<Controller
											control={form.control}
											name="notes"
											render={({ field, fieldState }) => (
												<CustomFieldWithLabel field={field} fieldState={fieldState} nameInSchema="notes" fieldTitle="Technical preferences" isOptional>
													<div className="relative group">
														<div className="absolute -inset-0.5 bg-ai/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
														<textarea
															{...field}
															placeholder="e.g. Requests tight proximal contacts on all posterior crowns..."
															className="relative w-full min-h-25 p-4 bg-white dark:bg-[#121214] border border-border rounded-xl text-sm outline-none transition-all resize-none shadow-sm focus:border-ai focus:ring-[3px] focus:ring-ai/20"
														/>
														<Sparkles className="absolute top-4 right-4 w-4 h-4 text-ai/30" />
													</div>
												</CustomFieldWithLabel>
											)}
										/>
									</div>
								</div>
							</form>
						</FormProvider>
					</div>
				</div>

				{/* --- DYNAMIC FOOTER --- */}
				<SheetFooter className="p-8 border-t border-border bg-slate-50/30 dark:bg-white/1">
					<Button variant="ghost" onClick={onClose} className="rounded-xl h-11! px-6 font-semibold">
						Cancel
					</Button>
					<Button
						type="submit"
						disabled={isProcessing || !form.formState.isDirty}
						form="dentist-editor-form"
						className="rounded-xl flex items-center justify-center gap-2 h-11 bg-primary shadow-premium font-bold hover:bg-primary/90 transition-all text-primary-foreground"
					>
						{isProcessing ? <Loader2 className="animate-spin w-4 h-4" /> : isEdit ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
						{isEdit ? "Save modifications" : "Register practitioner"}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
});
