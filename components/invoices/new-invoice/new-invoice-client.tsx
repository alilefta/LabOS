"use client";

import { useState, useMemo, useCallback } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { NewInvoiceOnboardingData, UnbilledCaseDTO } from "@/schema/composed/invoices/new.invoice.dtos";
import { CreateInvoiceInput, InvoiceMetadataInput, InvoiceMetadataSchema } from "@/schema/composed/invoices/new-invoice.schema";

import { InvoiceConfigurationPane } from "./sections/invoice-configuration-pane";
import { ReconciliationLedger } from "./sections/reconciliation-ledger";
import { NewInvoiceHeader } from "./new-invoice-header";
import { AmbientBgGlow } from "@/components/ui/ui-utils/animated-ambient-bg-glow";
import { InvoiceGenerationModal } from "@/components/modals/invoices/invoice-generation/invoice-generation-modal";
import { getUnbilledCasesAction } from "@/actions/invoices/get-unbilled-cases";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { createInvoiceAction } from "@/actions/invoices/create-invoice";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { InvoiceSuccessShareModal } from "@/components/modals/invoice-generation/invoice-success-share-modal";

interface Props {
	labId: string;
	initialClinicId?: string;
	onboardingData: NewInvoiceOnboardingData;
}

const EMPTY_CASES: UnbilledCaseDTO[] = [];

export function NewInvoiceClient({ labId, initialClinicId, onboardingData }: Props) {
	const router = useRouter();

	// ── 1. STATE COORDINATION ───────────────────────────────────────────
	const [selectedClinicId, setSelectedClinicId] = useState<string | undefined>(initialClinicId);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [pendingPayload, setPendingPayload] = useState<CreateInvoiceInput | null>(null);

	const [successPayload, setSuccessPayload] = useState<{
		id: string;
		invoiceNumber: string;
		publicToken: string | null;
		clinicName: string;
		amountDue: number;
	} | null>(null);

	const [deselectedCaseIds, setDeselectedCaseIds] = useState<Set<string>>(new Set());

	// ── 2. DATA FETCHING & HYDRATION ────────────────────────────────────
	const { data = EMPTY_CASES, isFetching: isFetchingCases } = useQuery({
		queryKey: ["unbilled-cases", labId, selectedClinicId],
		queryFn: async () => {
			if (!selectedClinicId) return EMPTY_CASES;

			const res = await getUnbilledCasesAction({ clinicId: selectedClinicId });
			if (res?.serverError || res?.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
				return EMPTY_CASES;
			}
			return (res?.data?.cases as UnbilledCaseDTO[]) || EMPTY_CASES;
		},
		enabled: !!selectedClinicId,
		initialData: selectedClinicId === initialClinicId ? onboardingData.prefetchedCases : undefined,
		staleTime: 1000 * 60 * 5,
	});

	const activeCases = data;

	const selectedCaseIds = useMemo(() => {
		const set = new Set<string>();
		activeCases.forEach((c) => {
			if (!deselectedCaseIds.has(c.id)) set.add(c.id);
		});
		return set;
	}, [activeCases, deselectedCaseIds]);

	// ── 3. METADATA FORM INITIALIZATION ─────────────────────────────────
	const form = useForm<InvoiceMetadataInput>({
		resolver: zodResolver(InvoiceMetadataSchema),
		defaultValues: {
			billingTerms: "RECEIPT",
			discountPercentage: 0,
			discountReason: "",
			notes: "",
		},
		mode: "onBlur",
	});

	const discountPercentage = useWatch({ control: form.control, name: "discountPercentage" }) || 0;

	// ── 4. MATHEMATICAL RECONCILIATION ENGINE ───────────────────────────
	const calculatedTotals = useMemo(() => {
		let subtotal = 0;
		activeCases.forEach((c) => {
			if (selectedCaseIds.has(c.id)) {
				subtotal += Number(c.grandTotal);
			}
		});

		// Ensure discount doesn't exceed 100% visually
		const safeDiscount = Math.min(Math.max(discountPercentage, 0), 100);
		const discountAmount = (subtotal * safeDiscount) / 100;
		const grandTotal = Math.max(0, subtotal - discountAmount);

		return {
			subtotal,
			discountAmount,
			grandTotal,
			selectedCount: selectedCaseIds.size,
		};
	}, [selectedCaseIds, activeCases, discountPercentage]);

	// ── 5. STABLE CALLBACKS ─────────────────────────────────────────────
	const handleToggleCase = useCallback((caseId: string) => {
		setDeselectedCaseIds((prev) => {
			const next = new Set(prev);
			// Invert the logic: If it was deselected, remove it (checking it). If it was checked, add to deselected.
			if (next.has(caseId)) next.delete(caseId);
			else next.add(caseId);
			return next;
		});
	}, []);

	const handleToggleAllCases = useCallback((allIds: string[], checkAll: boolean) => {
		// If checkAll is true, nothing is deselected. If false, everything is deselected!
		setDeselectedCaseIds(checkAll ? new Set() : new Set(allIds));
	}, []);

	// Update the manual clinic change handler to clear the tracker
	const handleClinicChange = useCallback(
		(id: string | null) => {
			setSelectedClinicId(id ?? undefined);

			// Instantly reset the deselected list. Next time data loads, everything is checked by default.
			setDeselectedCaseIds(new Set());

			form.resetField("discountPercentage");
			form.resetField("discountReason");
		},
		[form],
	);

	// // ── 6. SERVER ACTION: EXECUTE INVOICE ───────────────────────────────
	// const { executeAsync: executeCreateInvoice, isExecuting: isCreatingInvoice } = useAction(createInvoiceAction, {
	// 	onSuccess: ({ data }) => {
	// 		setIsModalOpen(false); // Close modal on success
	// 		toast.success(`Invoice ${data.invoice.invoiceNumber} successfully generated.`);
	// 		// Route user to the Financial Dossier for this specific invoice
	// 		router.push(`/invoices/${data.invoice.id}`);
	// 	},
	// 	onError: ({ error }) => {
	// 		// Keep modal open so they can see the error and try again if needed
	// 		handleSafeActionError(error);
	// 	},
	// });

	// 2. UPDATE THE SERVER ACTION HOOK
	const { executeAsync: executeCreateInvoice, isExecuting: isCreatingInvoice } = useAction(createInvoiceAction, {
		onSuccess: ({ data }) => {
			// INSTEAD of immediate redirect: Trigger the Success Handshake Modal!
			setSuccessPayload({
				id: data.invoice.id,
				invoiceNumber: data.invoice.invoiceNumber,
				publicToken: data.invoice.publicToken, // Securely returned from Server Action
				clinicName: onboardingData.selectedClinicName || "Selected Clinic",
				amountDue: calculatedTotals.grandTotal,
			});

			form.reset(); // Safely clear the left pane metadata
		},
		onError: ({ error }) => handleSafeActionError(error),
	});

	// 3. THE HANDSHAKE CLOSE TRIGGER
	const handleCloseSuccessModal = () => {
		if (!successPayload) return;
		const invoiceId = successPayload.id;
		setSuccessPayload(null); // Clear state

		// Redirect to the internal detail dossier we designed in Phase 5!
		router.push(`/invoices/${invoiceId}`);
	};

	// ── 7. VALIDATION & HANDSHAKE FLOW ──────────────────────────────────

	// Step A: Validate the form and prepare the payload
	const preparePayload = async (): Promise<CreateInvoiceInput | null> => {
		if (!selectedClinicId) {
			toast.error("Please select a clinic partner before continuing.");
			return null;
		}
		if (selectedCaseIds.size === 0) {
			toast.error("At least one case must be selected to generate a statement.");
			return null;
		}

		const isMetadataValid = await form.trigger();
		if (!isMetadataValid) {
			toast.error("Validation failed. Please review the configuration panel.");
			return null;
		}

		const metadataValues = form.getValues();
		return {
			...metadataValues,
			clinicId: selectedClinicId,
			caseIds: Array.from(selectedCaseIds),
			status: "DRAFT", // Default fallback, modal overrides this
		};
	};

	// Step B (Path 1): The Header "Save Draft" Button (Bypasses Modal)
	const handleHeaderSaveDraft = async () => {
		const payload = await preparePayload();
		if (!payload) return;

		// Execute immediately as DRAFT
		await executeCreateInvoice({ ...payload, status: "DRAFT" });
	};

	// Step B (Path 2): The Ledger "Generate Invoice" Button (Opens Modal)
	const handleOpenReviewModal = async () => {
		const payload = await preparePayload();
		if (!payload) return;

		setPendingPayload(payload);
		setIsModalOpen(true);
	};

	// Step C: The Modal Confirmation (Executes the Payload)
	const handleModalConfirm = async (finalStatus: "DRAFT" | "SENT") => {
		if (!pendingPayload) return;

		const finalPayload = { ...pendingPayload, status: finalStatus };
		await executeCreateInvoice(finalPayload);
	};

	return (
		// FIX 1: ROOT WRAPPER
		// On mobile, we allow the entire page to scroll (`overflow-y-auto`).
		// On desktop (xl), we lock the screen (`xl:overflow-hidden`) to let individual panes scroll.
		<div className="flex flex-col h-full overflow-y-auto xl:overflow-hidden animate-in fade-in duration-700 bg-background relative custom-scrollbar">
			{/* --- THE STICKY COMMAND HEADER --- */}
			<NewInvoiceHeader clinicId={selectedClinicId} selectedCount={calculatedTotals.selectedCount} isSavingDraft={isCreatingInvoice} onSaveDraft={handleHeaderSaveDraft} />

			{/* --- THE SPLIT CANVAS --- */}
			{/* FIX 2: WRAPPER DIV */}
			{/* On mobile, we use h-auto. On desktop, we lock it to h-full so columns can stretch */}
			<div className="flex-1 h-auto xl:h-full xl:min-h-0 relative z-10 w-full">
				<AmbientBgGlow variant="emerald" />

				<div className="flex flex-col xl:flex-row gap-8 h-full max-w-500 mx-auto px-4 sm:px-6 lg:px-8">
					{/* LEFT PANE: Invoicing Terms (30%) */}
					{/* FIX 3: LEFT PANE SCROLL */}
					{/* On mobile, we use `overflow-visible` (no internal scroll, flows naturally). */}
					{/* On desktop, we lock the column height and enable `overflow-y-auto` scrolling. */}
					<div className="w-full xl:w-96 shrink-0 h-auto xl:h-full overflow-visible xl:overflow-y-auto custom-scrollbar pt-2 xl:pt-6 pb-6 xl:pb-32">
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
					{/* FIX 4: RIGHT PANE SCROLL */}
					{/* On mobile, we use `overflow-visible` to let cases flow naturally into the page scroll. */}
					{/* On desktop, we lock it to `flex-1 h-full flex flex-col` so the internal scroll works. */}
					<div className="flex-1 h-auto xl:h-full min-h-0 flex flex-col overflow-visible xl:overflow-hidden pt-2 xl:pt-6 pb-32 xl:pb-8 relative">
						<ReconciliationLedger
							cases={activeCases}
							selectedIds={selectedCaseIds}
							totals={calculatedTotals}
							onToggle={handleToggleCase}
							onToggleAll={handleToggleAllCases}
							isClinicSelected={!!selectedClinicId}
							selectedClinicName={onboardingData.selectedClinicName}
							onGenerate={handleOpenReviewModal}
							isLoading={isFetchingCases}
						/>
					</div>
				</div>
			</div>

			{/* THE MODAL */}
			<InvoiceGenerationModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onConfirm={handleModalConfirm}
				isExecuting={isCreatingInvoice}
				clinicName={onboardingData.selectedClinicName || "Selected Clinic"}
				totals={calculatedTotals}
			/>

			{/* RENDER THE SUCCESS HANDSHAKE MODAL */}
			{successPayload && (
				<InvoiceSuccessShareModal
					isOpen={successPayload !== null}
					onClose={handleCloseSuccessModal}
					invoiceNumber={successPayload.invoiceNumber}
					publicToken={successPayload.publicToken}
					clinicName={successPayload.clinicName}
					// Grab the phone number directly from the pre-fetched clinics list
					clinicPhone={onboardingData.eligibleClinics.find((c) => c.id === selectedClinicId)?.phoneNumber}
					amountDue={successPayload.amountDue}
				/>
			)}
		</div>
	);
}
