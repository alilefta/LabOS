"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

// Schemas & Actions
import { handleSafeActionError } from "@/lib/safe-action-helpers";

// Layout Components
import { NewClinicHeader } from "@/components/clinics/shared-form-sections/new-clinic-header";
import { ClinicIdentitySection } from "@/components/clinics/shared-form-sections/clinic-identity-section";
import { ClinicLocationSection } from "@/components/clinics/shared-form-sections/clinic-location-section";
import { PractitionerRosterSection } from "@/components/clinics/new-clinic/sections/practitioners-roaster-section";
import { ClinicFinancialsSection } from "@/components/clinics/shared-form-sections/clinic-financials-section";

// Right Pane Components
import { LivePartnerDossier } from "@/components/clinics/new-clinic/right-pane/live-partner-dossier";
import { PartnerSetupAiAuditor } from "@/components/clinics/new-clinic/right-pane/partner-setup-ai-auditor";
import { CreateCompleteClinicInput, CreateCompleteClinicInputSchema } from "@/schema/composed/clinic.details";
import { createCompleteClinicAction } from "@/actions/clinics/create-clinic";

export default function NewClinicPage() {
	const router = useRouter();

	const form = useForm<CreateCompleteClinicInput>({
		resolver: zodResolver(CreateCompleteClinicInputSchema),
		defaultValues: {
			name: "",
			type: "CLINIC",
			city: "",
			address1: "",
			address2: "",
			email: "",
			phoneNumber: "",
			zipcode: "",
			billingEmail: "",
			billingPhoneNumber: "",
			taxNumber: "",
			discount: undefined,
			creditLimit: undefined,
			notes: "",
			description: "",
			additionalDentists: [],
			website: "",
			currentBalance: 0,
			status: "ACTIVE",
			primaryDentist: {
				name: "",
				email: "",
				phoneNumber: "",
				notes: "",
				isOwner: false,
			},
		},
		mode: "onBlur",
	});

	const { executeAsync: createClinic, isExecuting } = useAction(createCompleteClinicAction, {
		onSuccess: ({ data }) => {
			toast.success(`Partner activated: ${data.clinic.name}`);
			router.push(`/clinics/${data.clinic.id}`);
		},
		onError: ({ error }) => {
			handleSafeActionError(error);
		},
	});

	const onSubmit = useCallback(
		async (data: CreateCompleteClinicInput) => {
			await createClinic(data);
		},
		[createClinic],
	);

	const handleSaveDraft = useCallback(() => {
		const currentData = form.getValues();
		if (!currentData.name) {
			toast.error("A Clinic Name is required to save a draft.");
			return;
		}
		console.log("Saving Draft:", currentData);
		toast.success("Onboarding draft saved.");
	}, [form]);

	return (
		// We remove all fixed heights and overflow rules. We let the parent (main layout) handle scrolling.
		<div className="flex flex-col h-full animate-in fade-in duration-700 bg-background relative">
			<NewClinicHeader control={form.control} isSubmitting={isExecuting} onSaveDraft={handleSaveDraft} />

			{/* MAIN WORKSPACE */}
			<div className="flex-1 min-h-0 relative z-10 px-4 sm:px-8">
				<div className="flex flex-col xl:flex-row gap-8 h-full  mx-auto pt-4">
					{/* LEFT PANE: The Form (Internal Scroll) */}
					<FormProvider {...form}>
						{/* overflow-y-auto is applied here. Padding is inside so the scrollbar hits the edge. */}
						<form id="new-clinic-onboarding-form" onSubmit={form.handleSubmit(onSubmit)} className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-64 xl:pb-32 space-y-12">
							<ClinicIdentitySection />
							<ClinicLocationSection />
							<PractitionerRosterSection />
							<ClinicFinancialsSection />
						</form>
					</FormProvider>

					{/* RIGHT PANE: Live Feedback & AI (Desktop) */}
					{/* Removed overflow-y-auto here, it should just be sticky. If it gets too tall, we can wrap its contents. */}
					<div className="hidden xl:flex w-96 shrink-0 flex-col gap-6 h-fit sticky top-0 pb-12">
						<LivePartnerDossier control={form.control} />
						<PartnerSetupAiAuditor control={form.control} />
					</div>

					{/* RIGHT PANE: Floating Auditor (Mobile/Tablet Fix) */}
					<div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
						<PartnerSetupAiAuditor control={form.control} />
					</div>
				</div>
			</div>
		</div>
	);
}
