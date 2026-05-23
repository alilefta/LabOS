"use client";

import { useCallback, useState } from "react";
import { InvoiceFilters, DEFAULT_INVOICE_FILTERS } from "@/schema/composed/invoices/invoice-filters";
import { ArVitalsStrip } from "./ar-vitals-strip";
import { InvoicesDataTable } from "./invoices-table/invoices-data-table";
import { RecordPaymentSheet } from "@/components/modals/invoices/payments/record-payment-sheet";
import { useInvoiceUiStore } from "@/store/invoices/use-invoice-ui-store";
import { InvoiceFiltersSheet } from "@/components/modals/invoices/filters/invoice-filters-sheet";
import { toast } from "sonner";
import { useCopilotStore } from "@/store/ai-copilot/use-copilot-store";
import dynamic from "next/dynamic";
import { GlobalTimeFramePeriod } from "@/schema/composed/shared/date-preset";

interface Props {
	labId: string;
	period: GlobalTimeFramePeriod;
}

const GlobalAiCopilotSheet = dynamic(() => import("../../modals/shared/global-ai-copilot-sheet").then((cm) => cm.GlobalAiCopilotSheet), {
	ssr: false,
});

export function InvoicesDashboardClient({ labId, period }: Props) {
	// 1. Unified State for the Dashboard
	const [filters, setFilters] = useState<InvoiceFilters>(DEFAULT_INVOICE_FILTERS);
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	const paymentInvoice = useInvoiceUiStore((s) => s.paymentInvoice);
	const closePaymentSheet = useInvoiceUiStore((s) => s.closePaymentSheet);

	const isCopilotOpen = useCopilotStore((s) => s.isOpen);
	const copilotMode = useCopilotStore((s) => s.mode);
	const closeCopilot = useCopilotStore((s) => s.closeCopilot);

	const handleAIPromptClick = useCallback(
		(intent: string) => {
			toast.message(intent);
			closeCopilot();
			if (intent === "overdue") {
				// Apply the filter based on the AI prompt!
				setFilters((prev) => ({ ...prev, pulseFilter: "overdue", statuses: [] }));
			}
		},
		[closeCopilot],
	);

	return (
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
			{/* ZONE B: Vitals (Acts as quick-filters) */}
			<ArVitalsStrip labId={labId} currentFilter={filters.pulseFilter} onFilterChange={(newPulse) => setFilters((prev) => ({ ...prev, pulseFilter: newPulse }))} period={period} />
			{/* ZONE C & D: The Unified Ledger */}
			<InvoicesDataTable labId={labId} filters={filters} setFilters={setFilters} onOpenFilters={() => setIsFilterOpen(true)} />
			{/* --- OVERLAYS --- */}
			<InvoiceFiltersSheet
				onClearFilters={() => setFilters(DEFAULT_INVOICE_FILTERS)}
				isOpen={isFilterOpen}
				onClose={() => setIsFilterOpen(false)}
				currentFilters={filters}
				onApplyFilters={setFilters}
				mode="GLOBAL"
			/>
			{/* 
                We map the minimal data required by the sheet from the DTO.
                The key={paymentInvoice.id} ensures the sheet completely resets 
                if opened for a different invoice consecutively.
            */}
			{paymentInvoice && (
				<RecordPaymentSheet
					key={paymentInvoice.id}
					isOpen={!!paymentInvoice}
					onClose={closePaymentSheet}
					invoice={{
						id: paymentInvoice.id,
						invoiceNumber: paymentInvoice.invoiceNumber,
						clinicName: paymentInvoice.clinicName,
						amountDue: paymentInvoice.amountDue,
						total: paymentInvoice.total,
					}}
				/>
			)}
			{/* THE SHEET */}
			<GlobalAiCopilotSheet isOpen={isCopilotOpen} mode={copilotMode} onClose={closeCopilot} onActionClick={handleAIPromptClick} />
		</div>
	);
}
