"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { ChevronLeft, LoaderCircle, Save } from "lucide-react";
import Link from "next/link";

// Schemas & Actions
import { UpdateClinicInput, UpdateClinicInputSchema } from "@/schema/composed/clinic.details";
import { updateClinicAction } from "@/actions/clinics/update-clinic-form"; // Ensure this matches your actual action path
import { handleSafeActionError } from "@/lib/safe-action-helpers";

// UI Components
import { Button } from "@/components/ui/button";
import { ClinicIdentitySection } from "@/components/clinics/shared-form-sections/clinic-identity-section";
import { ClinicLocationSection } from "@/components/clinics/shared-form-sections/clinic-location-section";
import { ClinicFinancialsSection } from "@/components/clinics/shared-form-sections/clinic-financials-section";
import { ModificationAuditor } from "./right-pane/modification-auditor";
import { ClinicStatusEditor } from "./sections/clinic-status-editor";

interface Props {
	initialData: UpdateClinicInput;
	clinicId: string;
	clinicName: string;
	currentBalance: number;
}

export function EditClinicClient({ initialData, clinicId, clinicName, currentBalance }: Props) {
	const router = useRouter();

	// 1. FORM INITIALIZATION
	const form = useForm<UpdateClinicInput>({
		resolver: zodResolver(UpdateClinicInputSchema),
		defaultValues: initialData, // Hydrate the DB data
		mode: "onBlur",
	});

	// 2. SERVER ACTION
	const { executeAsync: updateClinic, isExecuting } = useAction(updateClinicAction, {
		onSuccess: () => {
			toast.success(`Modifications saved for ${clinicName}`);
			router.push(`/clinics/${clinicId}`);
			router.refresh();
		},
		onError: ({ error }) => {
			handleSafeActionError(error);
		},
	});

	// 3. SUBMIT HANDLERS
	const onSubmit = useCallback(
		async (data: UpdateClinicInput) => {
			// In a real scenario, you might pop a CaseSummaryModal here for a final "Diff" review.
			// For clinics, direct submission is often fine if the AI Auditor warns them enough.
			await updateClinic(data);
		},
		[updateClinic],
	);

	const isDirty = form.formState.isDirty;
	const isValid = form.formState.isValid;
	const canSubmit = isDirty && isValid;

	return (
		<div className="flex flex-col h-full animate-in fade-in duration-700 bg-background relative">
			{/* --- THE EDIT HEADER --- */}
			<header className="shrink-0 sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 pb-4 px-4 sm:px-6 lg:px-8 max-w-500 mx-auto w-full">
					<div className="flex items-start sm:items-center gap-3 sm:gap-4">
						<Link href={`/clinics/${clinicId}`} className="shrink-0 mt-0.5 sm:mt-0">
							<Button
								variant="outline"
								size="icon"
								className="rounded-xl border-border bg-white dark:bg-white/5 shadow-sm hover:bg-slate-50 dark:hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-10 transition-colors"
							>
								<ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-zinc-400" />
							</Button>
						</Link>
						<div className="flex flex-col min-w-0">
							<h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground line-clamp-1 flex items-center gap-2">Edit Profile: {clinicName}</h1>
							<p className="text-xs sm:text-sm text-muted-foreground mt-0.5 line-clamp-1">Modify identity, routing, and financial agreements.</p>
						</div>
					</div>

					<div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto">
						<Link href={`/clinics/${clinicId}`}>
							<Button variant="ghost" type="button" className="rounded-xl font-semibold text-muted-foreground hover:text-foreground h-10 px-4 transition-all">
								Discard Changes
							</Button>
						</Link>
						<Button
							disabled={!canSubmit || isExecuting}
							className="rounded-xl h-10 px-6 font-bold transition-all shadow-premium bg-primary text-white hover:bg-primary/90 disabled:bg-slate-100 dark:disabled:bg-white/5 disabled:text-slate-400"
							type="submit"
							form="edit-clinic-form"
						>
							{isExecuting ? <LoaderCircle className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2 shrink-0" />}
							Save Modifications
						</Button>
					</div>
				</div>
			</header>

			{/* MAIN WORKSPACE */}
			<div className="flex-1 min-h-0 relative z-10 w-full">
				<div className="flex flex-col xl:flex-row gap-8 h-full max-w-500 mx-auto px-4 sm:px-6 lg:px-8">
					{/* LEFT PANE: The Form */}
					<div className="flex-1 h-full overflow-y-auto custom-scrollbar pt-6 lg:pt-8">
						<FormProvider {...form}>
							<form id="edit-clinic-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 pr-2">
								{/* NEW: Operational Status Editor */}
								<ClinicStatusEditor control={form.control} />
								<ClinicIdentitySection />
								<ClinicLocationSection />
								<ClinicFinancialsSection />
							</form>
						</FormProvider>
					</div>

					{/* RIGHT PANE: Modification Auditor */}
					{/* 3. THE MOBILE AUDITOR (Now perfectly in-flow) */}
					{/* 
						- `sticky bottom-0` makes it float at the bottom of this specific scroll pane.
						- `mt-auto` pushes it down if the form is extremely short.
						- `-mx-4 sm:-mx-6` pulls it to the edges of the screen, overriding the parent layout padding!
					*/}
					<div className="hidden xl:flex w-96 shrink-0 flex-col gap-6 h-full overflow-y-auto custom-scrollbar pt-6 lg:pt-8 pb-12">
						<ModificationAuditor control={form.control} initialData={initialData} currentBalance={currentBalance} />
					</div>

					{/* Mobile Floating Auditor */}
					<div className="xl:hidden sticky bottom-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] mt-auto -mx-4 sm:-mx-6 lg:-mx-8">
						<ModificationAuditor control={form.control} initialData={initialData} currentBalance={currentBalance} />
					</div>
				</div>
			</div>
		</div>
	);
}
