"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Search, Filter, Receipt, ShieldCheck, Wallet, FileQuestion } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useDebounce from "@/hooks/useDebounce";

import { DataTable } from "@/components/shared/tables/data-table";
import { invoiceColumns } from "./invoice-columns";
import { InvoiceFilters, DEFAULT_INVOICE_FILTERS } from "@/schema/composed/invoices/invoice-filters";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { FilterChip } from "@/components/shared/filters/filter-chip";
import { GetInvoicesListResult } from "@/schema/composed/invoices/invoices.dtos";
import { getInvoicesListAction } from "@/actions/invoices/get-invoices";

interface Props {
	labId: string;
	filters: InvoiceFilters;
	setFilters: React.Dispatch<React.SetStateAction<InvoiceFilters>>;
	onOpenFilters: () => void;
}

export function InvoicesDataTable({ labId, filters, setFilters, onOpenFilters }: Props) {
	const router = useRouter();

	// ── 1. SEARCH STATE ──────────────────────────────────────────────
	const [searchInput, setSearchInput] = useState("");
	const debouncedSearch = useDebounce({ value: searchInput, delay: 400 });

	// ── 2. DATA FETCHING (INFINITE SCROLL) ───────────────────────────
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
		queryKey: ["invoices-list", labId, debouncedSearch, filters],
		queryFn: async ({ pageParam }): Promise<GetInvoicesListResult> => {
			const res = await getInvoicesListAction({
				cursor: pageParam as string | undefined,
				search: debouncedSearch,
				filters,
				take: 30,
			});
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}
			return res?.data ?? { invoices: [], nextCursor: null, totalCount: 0, totalAmountDue: 0 };
		},
		initialPageParam: undefined as string | undefined,
		getNextPageParam: (last) => last.nextCursor ?? undefined,
		staleTime: 30 * 1000 * 5,
	});

	// ── 3. DERIVED DATA ──────────────────────────────────────────────
	const flatData = useMemo(() => data?.pages.flatMap((page) => page.invoices) ?? [], [data]);
	const totalCount = data?.pages[0]?.totalCount ?? 0;

	const hasActiveAdvancedFilters = filters.statuses.length > 0 || !!filters.clinicId || !!filters.dateRange;

	const handleClearAll = useCallback(() => {
		setFilters(DEFAULT_INVOICE_FILTERS);
		setSearchInput("");
	}, [setFilters]);

	// ── 4. RENDER EMPTY STATES (Contextual) ──────────────────────────
	const renderEmptyState = () => {
		if (isLoading) return null; // Table component handles initial skeleton

		// Search Mismatch
		if (debouncedSearch) {
			return {
				title: "No invoices found",
				description: `No results match "${debouncedSearch}". Check for typos or clear your search.`,
				icon: <FileQuestion className="w-8 h-8 text-slate-400 dark:text-zinc-500" />,
			};
		}

		// Overdue Reward State
		if (filters.pulseFilter === "overdue") {
			return {
				title: "Zero Past Due Accounts",
				description: "Incredible work. All of your clinic partners are currently up to date on their payments.",
				icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
			};
		}

		// Outstanding Reward State
		if (filters.pulseFilter === "outstanding") {
			return {
				title: "Ledger Balanced",
				description: "There are no outstanding invoices in the system. The lab's A/R is fully settled.",
				icon: <Wallet className="w-8 h-8 text-primary" />,
			};
		}

		// Default Empty
		return {
			title: "No Invoice Records",
			description: "Adjust your filters to see historical billing data.",
			icon: <Receipt className="w-8 h-8 text-slate-400 dark:text-zinc-500" />,
		};
	};

	return (
		<div className="lab-card flex-1 flex flex-col overflow-hidden shadow-md min-h-150 transition-all duration-300">
			{/* --- THE COMMAND STRIP --- */}
			<div className="p-4 sm:p-5 border-b border-border bg-slate-50/50 dark:bg-white/2 flex flex-col gap-4 z-10 relative">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					<div className="relative w-full sm:max-w-md group">
						<Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
						<input
							type="text"
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
							placeholder="Search by invoice #, clinic, or status..."
							className="w-full h-11 pl-10 pr-4 bg-white dark:bg-[#121214] border border-border rounded-2xl text-sm focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/20 transition-all shadow-sm"
						/>
					</div>

					<div className="flex items-center gap-3 w-full sm:w-auto">
						<Button
							variant="outline"
							onClick={onOpenFilters}
							className={cn(
								"h-10 rounded-xl border-border bg-white dark:bg-white/5 text-xs font-bold transition-all shadow-sm flex-1 sm:flex-none",
								hasActiveAdvancedFilters && "border-primary/50 text-primary bg-primary/5",
							)}
						>
							<Filter className="w-3.5 h-3.5 mr-2" /> Filters
							{hasActiveAdvancedFilters && <span className="ml-2 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
						</Button>
					</div>
				</div>

				{/* --- FILTER CHIPS ZONE --- */}
				{(hasActiveAdvancedFilters || debouncedSearch || filters.pulseFilter !== "all") && (
					<div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 animate-in slide-in-from-top-1">
						<span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mr-1 shrink-0 ml-1">Active View:</span>

						{filters.pulseFilter !== "all" && (
							<FilterChip
								label={filters.pulseFilter}
								variant={filters.pulseFilter === "overdue" ? "danger" : "default"}
								onRemove={() => setFilters((prev) => ({ ...prev, pulseFilter: "all" }))}
							/>
						)}

						{filters.statuses.map((status) => (
							<FilterChip key={status} label={status} onRemove={() => setFilters((prev) => ({ ...prev, statuses: prev.statuses.filter((s) => s !== status) }))} />
						))}

						{filters.dateRange && (
							<FilterChip
								label={filters.dateRange.preset === "custom" ? "Custom Range" : filters.dateRange.preset.replace("_", " ")}
								onRemove={() => setFilters((prev) => ({ ...prev, dateRange: null }))}
							/>
						)}

						{debouncedSearch && <FilterChip label={`"${debouncedSearch}"`} variant="ai" onRemove={() => setSearchInput("")} />}

						<button onClick={handleClearAll} className="text-[10px] font-black uppercase text-rose-500 hover:text-rose-600 transition-colors ml-2 tracking-tighter shrink-0">
							Reset All
						</button>
					</div>
				)}
			</div>

			{/* --- THE VIRTUALIZED TABLE --- */}
			<div className="flex-1 bg-background relative overflow-hidden">
				<DataTable
					columns={invoiceColumns} // The columns we designed earlier
					data={flatData}
					isLoading={isLoading}
					onRowClick={(row) => router.push(`/invoices/${row.id}`)}
					fetchNextPage={fetchNextPage}
					hasNextPage={hasNextPage}
					isFetchingNextPage={isFetchingNextPage}
					emptyState={renderEmptyState() ?? undefined}
					minHeight={500}
				/>
			</div>
		</div>
	);
}
