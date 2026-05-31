"use client";

import { useState, useMemo, useCallback, useEffect, memo } from "react";
import { Receipt, Search, Filter } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import useDebounce from "@/hooks/useDebounce";

import { DataTable } from "@/components/shared/tables/data-table";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { clinicInvoiceColumns } from "./invoice-history-columns";
import { getClinicInvoicesAction } from "@/actions/clinics/invoices/get-invoices";
import { InvoiceFilters, DEFAULT_INVOICE_FILTERS } from "@/schema/composed/invoices/invoice-filters";
import dynamic from "next/dynamic";
import { FilterChip } from "@/components/shared/filters/filter-chip";

const preloadInvoiceFiltersSheet = () => import("../../../modals/invoices/filters/invoice-filters-sheet");
const InvoiceFiltersSheet = dynamic(() => import("../../../modals/invoices/filters/invoice-filters-sheet").then((m) => m.InvoiceFiltersSheet), { ssr: false });

interface Props {
	clinicId: string;
}

export const ClinicInvoiceHistory = memo(function ClinicInvoiceHistory({ clinicId }: Props) {
	const router = useRouter();

	// ── 1. FILTER & SEARCH STATE ──────────────────────────────────────
	const [searchInput, setSearchInput] = useState("");
	const debouncedSearch = useDebounce({ value: searchInput, delay: 400 });

	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [filters, setFilters] = useState<InvoiceFilters>(DEFAULT_INVOICE_FILTERS);

	// ── 2. DATA FETCHING (INFINITE SCROLL) ─────────────────────────────
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
		queryKey: ["clinic-invoices", clinicId, debouncedSearch, filters],
		queryFn: async ({ pageParam }) => {
			const res = await getClinicInvoicesAction({
				clinicId,
				cursor: pageParam as string | undefined,
				search: debouncedSearch,
				filters,
				take: 20,
			});

			if (res?.serverError || res?.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}
			return res?.data ?? { invoices: [], nextCursor: null, totalCount: 0 };
		},
		initialPageParam: undefined as string | undefined,
		getNextPageParam: (last) => last.nextCursor ?? undefined,
		staleTime: 1000 * 60 * 5,
	});

	const handleClearFilters = useCallback(() => {
		setFilters(DEFAULT_INVOICE_FILTERS);
		setSearchInput("");
	}, []);

	// Prefetch the sheet bundle as soon as the roster tab mounts
	useEffect(() => {
		preloadInvoiceFiltersSheet();
	}, []);

	// ── 3. DERIVED DATA ───────────────────────────────────────────────
	const flatData = useMemo(() => data?.pages.flatMap((page) => page.invoices) ?? [], [data]);
	const totalCount = data?.pages[0]?.totalCount ?? 0;

	const hasActiveFilters = filters.statuses.length > 0 || filters.dateRange !== null || filters.isUnpaidOnly;

	return (
		<div className="lab-card flex-1 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
			{/* --- TOOLBAR ZONE --- */}
			<div className="p-4 sm:p-5 border-b border-border bg-slate-50/50 dark:bg-white/2 flex flex-col gap-5">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					<div className="flex items-center gap-3">
						<div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
							<Receipt className="w-4 h-4" />
						</div>
						<div>
							<h3 className="text-sm font-bold text-foreground">Billing Statements</h3>
							<p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">{totalCount} Records Found</p>
						</div>
					</div>

					<div className="flex items-center gap-3">
						{/* QUICK TOGGLE: Unpaid Only */}
						<div
							className={cn(
								"flex items-center gap-3 px-3 py-1.5 rounded-xl border transition-all duration-300",
								filters.isUnpaidOnly ? "bg-rose-500/5 border-rose-500/30 ring-1 ring-rose-500/20" : "bg-background border-border",
							)}
						>
							<span className={cn("text-[10px] font-black uppercase tracking-wider", filters.isUnpaidOnly ? "text-rose-600 dark:text-rose-500" : "text-muted-foreground")}>
								Unpaid Only
							</span>
							<Switch
								checked={filters.isUnpaidOnly}
								onCheckedChange={(val) => setFilters((prev) => ({ ...prev, isUnpaidOnly: val }))}
								className="data-[state=checked]:bg-rose-500 shadow-sm"
							/>
						</div>

						<Button
							variant="outline"
							size="sm"
							onClick={() => setIsFilterOpen(true)}
							className={cn("h-9 rounded-xl border-border bg-background transition-all text-xs font-bold", hasActiveFilters && "border-primary/50 bg-primary/5 text-primary")}
						>
							<Filter className="w-3.5 h-3.5 mr-2" />
							Filters
							{hasActiveFilters && <div className="ml-2 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
						</Button>
					</div>
				</div>

				{/* SEARCH BAR & CHIPS */}
				<div className="flex flex-col gap-3">
					<div className="relative group flex-1">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
						<input
							type="text"
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
							placeholder="Search by Invoice ID (e.g. INV-001)..."
							className="w-full h-11 pl-10 pr-4 bg-white dark:bg-[#121214] border border-border rounded-2xl text-sm focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/20 transition-all shadow-sm"
						/>
					</div>

					{/* Zone C: Active Filter Pills */}
					{(hasActiveFilters || debouncedSearch) && (
						<div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 animate-in slide-in-from-top-1 duration-300">
							<span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mr-1 shrink-0 ml-1">Active View:</span>

							{filters.statuses.map((s) => (
								<FilterChip key={s} label={s} onRemove={() => setFilters((prev) => ({ ...prev, statuses: prev.statuses.filter((st) => st !== s) }))} />
							))}

							{filters.dateRange && (
								<FilterChip
									label={
										filters.dateRange.preset === "custom" && filters.dateRange.from && filters.dateRange.to
											? `${filters.dateRange.from.toLocaleDateString()} - ${filters.dateRange.to.toLocaleDateString()}`
											: filters.dateRange.preset.replace(/_/g, " ")
									}
									onRemove={() => setFilters((prev) => ({ ...prev, dateRange: null }))}
								/>
							)}

							{filters.isUnpaidOnly && (
								<FilterChip
									label="UNPAID ONLY"
									variant="danger" // Using Rose color
									onRemove={() => setFilters((prev) => ({ ...prev, isUnpaidOnly: false }))}
								/>
							)}

							{debouncedSearch && <FilterChip label={`"${debouncedSearch}"`} onRemove={() => setSearchInput("")} />}

							<button onClick={handleClearFilters} className="text-[10px] font-black uppercase text-rose-500 hover:text-rose-600 transition-colors ml-2 tracking-tighter shrink-0">
								Reset All
							</button>
						</div>
					)}
				</div>
			</div>

			{/* --- DATA TABLE ZONE --- */}
			<div className="flex-1 min-h-100 bg-card">
				<DataTable
					columns={clinicInvoiceColumns}
					data={flatData}
					isLoading={isLoading}
					onRowClick={(row) => router.push(`/invoices/${row.id}`)}
					fetchNextPage={fetchNextPage}
					hasNextPage={hasNextPage}
					isFetchingNextPage={isFetchingNextPage}
					minHeight={400}
				/>
			</div>

			<InvoiceFiltersSheet
				currentFilters={filters}
				isOpen={isFilterOpen}
				mode="CLINIC_LEDGER"
				onClose={() => setIsFilterOpen(false)}
				onApplyFilters={(f) => setFilters(f)}
				onClearFilters={handleClearFilters}
			/>
		</div>
	);
});
