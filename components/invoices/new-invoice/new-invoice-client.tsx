"use client";

import { useState, useMemo, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AmbientBgGlow } from "@/components/ui/ui-utils/animated-ambient-bg-glow";
import { NewInvoiceOnboardingData } from "@/schema/composed/invoices/new.invoice.dtos";
import { InvoiceConfigurationPane } from "./sections/invoice-configuration-pane";
import { ReconciliationLedger } from "./sections/reconciliation-ledger";
import { NewInvoiceHeader } from "./new-invoice-header";
import { CreateInvoiceInput, CreateInvoiceInputSchema, InvoiceMetadataInput, InvoiceMetadataSchema } from "@/schema/composed/invoices/new-invoice.schema";
import { toast } from "sonner";

interface Props {
	labId: string;
	initialClinicId?: string;
	onboardingData: NewInvoiceOnboardingData;
}

export function NewInvoiceClient({ labId, initialClinicId, onboardingData }: Props) {
	// ── 1. STATE COORDINATION ───────────────────────────────────────────

	// Track selected cases using the highly optimized O(1) Set pattern
	const [selectedCaseIds, setSelectedCaseIds] = useState<Set<string>>(new Set());

	// If no initialClinicId was passed from the server, the user selects it on the client
	const [selectedClinicId, setSelectedClinicId] = useState<string | undefined>(initialClinicId);

	// ── 2. METADATA FORM INITIALIZATION ──────────────────────────────────
	// Form only handles Terms, Discounts, and Notes to prevent rendering lag
	const form = useForm<InvoiceMetadataInput>({
		resolver: zodResolver(InvoiceMetadataSchema), // <-- ATTACH RESOLVER
		defaultValues: {
			billingTerms: "RECEIPT",
			discountPercentage: 0,
			discountReason: "",
			notes: "",
		},
		mode: "onBlur",
	});

	const discountPercentage = form.watch("discountPercentage");

	// ── 3. MATHEMATICAL RECONCILIATION ENGINE ────────────────────────────
	// useMemo intercepts the raw cases array and calculates the sums in < 1ms
	// ── 3. MATHEMATICAL RECONCILIATION ENGINE ────────────────────────────
	const calculatedTotals = useMemo(() => {
		const cases = onboardingData.prefetchedCases || [];

		let subtotal = 0;
		cases.forEach((c) => {
			if (selectedCaseIds.has(c.id)) {
				subtotal += Number(c.grandTotal);
			}
		});

		const discountPct = discountPercentage || 0;
		const discountAmount = (subtotal * discountPct) / 100;
		const grandTotal = Math.max(0, subtotal - discountAmount);

		return {
			subtotal,
			discountAmount,
			grandTotal,
			selectedCount: selectedCaseIds.size,
		};
	}, [selectedCaseIds, onboardingData.prefetchedCases, discountPercentage]);

	// ── 4. STABLE CALLBACKS ─────────────────────────────────────────────
	const handleToggleCase = useCallback((caseId: string) => {
		setSelectedCaseIds((prev) => {
			const next = new Set(prev);
			if (next.has(caseId)) {
				next.delete(caseId);
			} else {
				next.add(caseId);
			}
			return next;
		});
	}, []);

	const handleToggleAllCases = useCallback((allIds: string[], checkAll: boolean) => {
		setSelectedCaseIds(() => {
			return checkAll ? new Set(allIds) : new Set();
		});
	}, []);

	const handleClinicChange = useCallback(
		(id: string | null) => {
			setSelectedClinicId(id ?? undefined);
			setSelectedCaseIds(new Set()); // Clear active cases on clinic swap
			form.resetField("discountPercentage"); // Reset overrides
			form.resetField("discountReason");
		},
		[form],
	);

	// ── 5. FINAL RECONCILIATION HANDSHAKE ────────────────────────────────
	const processSubmit = useCallback(
		async (status: "DRAFT" | "SENT") => {
			if (!selectedClinicId) {
				toast.error("Please select a clinic partner before continuing.");
				return;
			}

			if (selectedCaseIds.size === 0) {
				toast.error("At least one case must be selected to generate a statement.");
				return;
			}

			// Validate the Left Pane metadata form first
			const isMetadataValid = await form.trigger();
			if (!isMetadataValid) {
				toast.error("Validation failed. Please review the configuration panel.");
				return;
			}

			const metadataValues = form.getValues();

			// Compose the final, robust composite DTO
			const submissionPayload: CreateInvoiceInput = {
				...metadataValues,
				clinicId: selectedClinicId,
				caseIds: Array.from(selectedCaseIds), // Convert the fast Set back to a standard DB array
				status,
			};

			console.log("Submitting finalized ledger payload to Server Action:", submissionPayload);
			// await createInvoiceAction(submissionPayload);
		},
		[form, selectedClinicId, selectedCaseIds],
	);

	const handleSaveDraft = useCallback(() => processSubmit("DRAFT"), [processSubmit]);
	const handleFinalSubmit = useCallback(() => processSubmit("SENT"), [processSubmit]);

	return (
		<div className="flex flex-col h-full animate-in fade-in duration-700 bg-background relative">
			{/* --- THE STICKY COMMAND HEADER (Phase 1, Step 3) --- */}
			<NewInvoiceHeader
				clinicId={selectedClinicId}
				selectedCount={calculatedTotals.selectedCount}
				isSavingDraft={false} // Hook to Server Action isExecuting state later
				onSaveDraft={handleSaveDraft}
			/>

			{/* --- THE SPLIT CANVAS --- */}
			{/* SPLIT CANVAS */}
			<div className="flex-1 min-h-0 relative z-10 w-full">
				<AmbientBgGlow variant="emerald" />

				<div className="flex flex-col xl:flex-row gap-8 h-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
					{/* LEFT PANE: Invoicing Terms (30%) */}
					<div className="w-full xl:w-96 shrink-0 xl:h-full flex flex-col py-6 lg:py-8">
						<FormProvider {...form}>
							<InvoiceConfigurationPane
								clinics={onboardingData.eligibleClinics}
								selectedId={selectedClinicId}
								selectedClinicName={onboardingData.selectedClinicName}
								onSelectClinic={handleClinicChange}
							/>
						</FormProvider>
					</div>

					{/* RIGHT PANE: Reconciliation Ledger (70%) */}
					<div className="flex-1 h-full overflow-y-auto custom-scrollbar pt-6 lg:pt-8 relative">
						<ReconciliationLedger
							cases={onboardingData.prefetchedCases}
							selectedIds={selectedCaseIds}
							totals={calculatedTotals}
							onToggle={handleToggleCase}
							onToggleAll={handleToggleAllCases}
							isClinicSelected={!!selectedClinicId}
							selectedClinicName={onboardingData.selectedClinicName}
							// Pass down the final trigger to the ledger's checkout footer
							onGenerate={handleFinalSubmit}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
