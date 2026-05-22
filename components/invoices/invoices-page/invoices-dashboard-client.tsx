"use client";

import { useState } from "react";
import { InvoiceFilters, DEFAULT_INVOICE_FILTERS } from "@/schema/composed/invoices/invoice-filters";
import { ArVitalsStrip } from "./ar-vitals-strip";
import { InvoicesDataTable } from "./invoices-table/invoices-data-table";

interface Props {
	labId: string;
}

export function InvoicesDashboardClient({ labId }: Props) {
	// 1. Unified State for the Dashboard
	const [filters, setFilters] = useState<InvoiceFilters>(DEFAULT_INVOICE_FILTERS);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [isAiSheetOpen, setIsAiSheetOpen] = useState(false);

	return (
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
			{/* ZONE B: Vitals (Acts as quick-filters) */}
			<ArVitalsStrip labId={labId} currentFilter={filters.pulseFilter} onFilterChange={(newPulse) => setFilters((prev) => ({ ...prev, pulseFilter: newPulse }))} />

			{/* ZONE C & D: The Unified Ledger */}
			<InvoicesDataTable labId={labId} filters={filters} setFilters={setFilters} onOpenFilters={() => setIsFilterOpen(true)} />

			{/* --- OVERLAYS --- */}
			{/* <InvoicesFiltersSheet 
				isOpen={isFilterOpen} 
				onClose={() => setIsFilterOpen(false)} 
				currentFilters={filters} 
				onApplyFilters={setFilters} 
			/> */}
		</div>
	);
}
