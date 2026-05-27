"use client";

import { useState, useMemo, useCallback } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";

// Schemas & Types
import { DraftInvoiceHydrationDTO } from "@/schema/composed/invoices/draft-invoice.dtos";
import { UnbilledCaseDTO } from "@/schema/composed/invoices/new.invoice.dtos";
import { InvoiceMetadataInput, InvoiceMetadataSchema } from "@/schema/composed/invoices/new-invoice.schema";

// Components & UI
import { AmbientBgGlow } from "@/components/ui/ui-utils/animated-ambient-bg-glow";
import { InvoiceConfigurationPane } from "../new-invoice/sections/invoice-configuration-pane";
import { ReconciliationLedger } from "../new-invoice/sections/reconciliation-ledger";

// Actions
import { getDraftEligibleCasesAction } from "@/actions/invoices/get-draft-eligible-cases";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { EditInvoiceHeader } from "./edit-invoice-header";
import { updateDraftInvoiceAction } from "@/actions/invoices/update-draft-invoice";
import { UpdateInvoiceInput } from "@/schema/composed/invoices/update-invoice.schema";
import dynamic from "next/dynamic";

interface Props {
	labId: string;
	initialData: DraftInvoiceHydrationDTO; // Pre-mapped server DTO [1]
	clinicName: string;
	invoiceNumber: string;
}

const EMPTY_CASES: UnbilledCaseDTO[] = [];

const InvoiceGenerationModal = dynamic(() => import("../../modals/invoices/invoice-generation/invoice-generation-modal").then((cm) => cm.InvoiceGenerationModal), {
	ssr: false,
});

const InvoiceSuccessShareModal = dynamic(() => import("../../modals/invoices/invoice-generation/invoice-success-share-modal").then((cm) => cm.InvoiceSuccessShareModal), {
	ssr: false,
});

export function EditInvoiceClient({ labId, initialData, clinicName, invoiceNumber }: Props) {
	const router = useRouter();

	// ── 1. STATE COORDINATION ───────────────────────────────────────────
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [pendingPayload, setPendingPayload] = useState<UpdateInvoiceInput | null>(null);

	const [successPayload, setSuccessPayload] = useState<{
		id: string;
		invoiceNumber: string;
		publicToken: string | null;
		clinicName: string;
		amountDue: number;
	} | null>(null);

	// SECURE CHECKBOX TRACKING [3]
	// Initialize with the cases currently saved on the draft [3]
	const [selectedCaseIds, setSelectedCaseIds] = useState<Set<string>>(new Set(initialData.caseIds));

	// ── 2. THE UNION QUERY FETCH (PHASE 2) ──────────────────────────────
	// Fetches both the cases currently on the draft AND any new unbilled cases [2]
	const { data = EMPTY_CASES, isFetching: isFetchingCases } = useQuery({
		queryKey: ["draft-eligible-cases", labId, initialData.clinicId, initialData.id],
		queryFn: async () => {
			const res = await getDraftEligibleCasesAction({
				clinicId: initialData.clinicId,
				draftInvoiceId: initialData.id,
			});

			if (res?.serverError || res?.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
				return EMPTY_CASES;
			}
			return (res?.data?.cases as UnbilledCaseDTO[]) || EMPTY_CASES;
		},
		staleTime: 1000 * 60 * 5,
	});

	const activeCases = data;

	// ── 3. METADATA FORM INITIALIZATION ─────────────────────────────────
	const form = useForm<InvoiceMetadataInput>({
		resolver: zodResolver(InvoiceMetadataSchema),
		defaultValues: {
			billingTerms: initialData.billingTerms,
			discountPercentage: initialData.discountPercentage,
			discountReason: initialData.discountReason,
			notes: initialData.notes,
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
		setSelectedCaseIds((prev) => {
			const next = new Set(prev);
			if (next.has(caseId)) next.delete(caseId);
			else next.add(caseId);
			return next;
		});
	}, []);

	const handleToggleAllCases = useCallback((allIds: string[], checkAll: boolean) => {
		setSelectedCaseIds(() => (checkAll ? new Set(allIds) : new Set()));
	}, []);

	// ── 6. SERVER ACTION: EXECUTE UPDATE ────────────────────────────────
	const { executeAsync: executeUpdateInvoice, isExecuting: isUpdating } = useAction(updateDraftInvoiceAction, {
		onSuccess: ({ data }) => {
			setSuccessPayload({
				id: initialData.id,
				invoiceNumber: invoiceNumber,
				publicToken: data.invoice.publicToken, // Returned on success if issued (SENT)
				clinicName,
				amountDue: calculatedTotals.grandTotal,
			});
			form.reset();
		},
		onError: ({ error }) => handleSafeActionError(error),
	});

	const handleCloseSuccessModal = () => {
		if (!successPayload) return;
		setSuccessPayload(null);
		router.push(`/invoices/${initialData.id}`);
		router.refresh();
	};

	// ── 7. VALIDATION & HANDSHAKE FLOW ──────────────────────────────────
	const preparePayload = async (): Promise<UpdateInvoiceInput | null> => {
		if (selectedCaseIds.size === 0) {
			toast.error("At least one case must be selected to save this statement.");
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
			clinicId: initialData.clinicId,
			caseIds: Array.from(selectedCaseIds),
			status: "DRAFT", // Default fallback, modal overrides
			invoiceId: initialData.id,
		};
	};

	const handleHeaderSaveDraft = async () => {
		const payload = await preparePayload();
		if (!payload) return;
		await executeUpdateInvoice({ ...payload, status: "DRAFT" });
	};

	const handleOpenReviewModal = async () => {
		const payload = await preparePayload();
		if (!payload) return;
		setPendingPayload(payload);
		setIsModalOpen(true);
	};

	const handleModalConfirm = async (finalStatus: "DRAFT" | "SENT") => {
		if (!pendingPayload) return;
		const finalPayload = { ...pendingPayload, status: finalStatus };
		await executeUpdateInvoice(finalPayload);
	};

	return (
		// FIX: App-Shell Scroll boundary matches your responsive standards [4]
		<div className="flex flex-col h-full overflow-y-auto xl:overflow-hidden animate-in fade-in duration-700 bg-background relative custom-scrollbar">
			{/* --- THE STICKY COMMAND HEADER --- */}
			<EditInvoiceHeader
				invoiceNumber={invoiceNumber}
				invoiceId={initialData.id}
				clinicId={initialData.clinicId}
				selectedCount={calculatedTotals.selectedCount}
				isSavingDraft={isUpdating}
				onSaveDraft={handleHeaderSaveDraft}
			/>

			{/* --- THE SPLIT CANVAS --- */}
			<div className="flex-1 h-auto xl:h-full xl:min-h-0 relative z-10 w-full">
				<AmbientBgGlow variant="emerald" />

				<div className="flex flex-col xl:flex-row gap-8 h-full max-w-500 mx-auto px-4 sm:px-6 lg:px-8">
					{/* LEFT PANE: Invoicing Terms (30%) - Locked to clinic [4] */}
					<div className="w-full xl:w-96 shrink-0 h-auto xl:h-full overflow-visible xl:overflow-y-auto custom-scrollbar pt-2 xl:pt-6 pb-6 xl:pb-32">
						<FormProvider {...form}>
							<InvoiceConfigurationPane
								selectedId={initialData.clinicId} // Passed down as locked [4]
								selectedClinicName={clinicName}
								onSelectClinic={() => {}} // No-op: clinic is immutable during edit
							/>
						</FormProvider>
					</div>

					{/* RIGHT PANE: Reconciliation Ledger (70%) [4] */}
					<div className="flex-1 h-auto xl:h-full min-h-0 flex flex-col overflow-visible xl:overflow-hidden pt-2 xl:pt-6 pb-32 xl:pb-8 relative">
						<ReconciliationLedger
							cases={activeCases}
							selectedIds={selectedCaseIds}
							totals={calculatedTotals}
							onToggle={handleToggleCase}
							onToggleAll={handleToggleAllCases}
							isClinicSelected={true}
							selectedClinicName={clinicName}
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
				isExecuting={isUpdating}
				clinicName={clinicName}
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
					clinicPhone={initialData.clinicPhoneNumber}
					amountDue={successPayload.amountDue}
				/>
			)}
		</div>
	);
}
