"use client";

import { memo, useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Search, Filter, History, Download, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import useDebounce from "@/hooks/useDebounce";

import { DataTable } from "@/components/shared/tables/data-table";
import { AdvancedFiltersSheet } from "@/components/modals/shared/advanced-filters-sheet";
import { GetClinicHistoricalCasesResult } from "@/schema/composed/clinics/clinic-cases.dtos";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { usePermissions } from "@/providers/permissions-provider";
import { getClinicHistoricalCasesAction } from "@/actions/clinics/get-clinic";
import { clinicHistoricalColumns } from "./historical-cases-table/clinic-historical-columns";
import { CasesFilters, DEFAULT_CASES_FILTERS } from "@/schema/composed/cases/cases-filters";
import { TooltipProvider } from "@/components/ui/tooltip";

interface Props {
	clinicId: string;
}

export const ClinicHistoricalDataTable = memo(function ClinicHistoricalDataTable({ clinicId }: Props) {
	const router = useRouter();
	const { canViewFinancials } = usePermissions();

	const [searchInput, setSearchInput] = useState("");
	const debouncedSearch = useDebounce({ value: searchInput, delay: 400 });

	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [filters, setFilters] = useState<CasesFilters>(DEFAULT_CASES_FILTERS);

	// ── DATA FETCHING ──────────────────────────────────────────────────
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
		queryKey: ["clinic-history", clinicId, debouncedSearch, filters],
		queryFn: async ({ pageParam }): Promise<GetClinicHistoricalCasesResult> => {
			const res = await getClinicHistoricalCasesAction({
				clinicId,
				cursor: pageParam as string | undefined,
				search: debouncedSearch,
				filters,
				take: 20,
			});

			if (res.serverError || res.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}
			return res?.data ?? { cases: [], nextCursor: null, totalCount: 0 };
		},
		initialPageParam: undefined as string | undefined,
		getNextPageParam: (last) => last.nextCursor ?? undefined,
		staleTime: 1000 * 60 * 2,
	});

	const handleClearFilters = useCallback(() => {
		setFilters(DEFAULT_CASES_FILTERS);
		setSearchInput("");
	}, []);

	// ── DERIVED DATA & PERMISSIONS ─────────────────────────────────────
	const flatData = useMemo(() => data?.pages.flatMap((page) => page.cases) ?? [], [data]);
	const totalCount = data?.pages[0]?.totalCount ?? 0;

	const visibleColumns = useMemo(() => {
		if (canViewFinancials) return clinicHistoricalColumns;
		return clinicHistoricalColumns.filter((col) => col.id !== "grandTotal");
	}, [canViewFinancials]);

	const hasActiveAdvancedFilters = useMemo(() => {
		return filters.statuses.length > 0 || !!filters.categoryId || !!filters.staffId || !!filters.dateRange;
	}, [filters]);

	return (
		<div className="lab-card flex-1 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 h-full">
			{/* --- ZONE A & B: COMMAND STRIP --- */}
			<div className="p-4 sm:p-5 border-b border-border bg-slate-50/50 dark:bg-white/2 flex flex-col gap-5">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					{/* Zone A: Vitals */}
					<div className="flex items-center gap-3">
						<div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
							<History className="w-5 h-5" />
						</div>
						<div>
							<h3 className="text-sm font-bold text-foreground">Clinical History</h3>
							<p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">{totalCount} Resolved Cases</p>
						</div>
					</div>

					{/* Zone B: Global Controls */}
					<div className="flex items-center gap-2 sm:gap-3">
						{/* Remake Toggle: High Contrast for Business Intelligence */}
						<div
							className={cn(
								"flex items-center gap-3 px-3 py-1.5 rounded-xl border transition-all duration-300",
								filters.isRemakeOnly ? "bg-amber-500/5 border-amber-500/30 ring-1 ring-amber-500/20" : "bg-background border-border",
							)}
						>
							<span className={cn("text-[10px] font-black uppercase tracking-wider", filters.isRemakeOnly ? "text-amber-600 dark:text-amber-500" : "text-muted-foreground")}>
								Remakes Only
							</span>
							<Switch checked={filters.isRemakeOnly} onCheckedChange={(val) => setFilters((prev) => ({ ...prev, isRemakeOnly: val }))} className="data-[state=checked]:bg-amber-500" />
						</div>

						<Button
							variant="outline"
							size="sm"
							onClick={() => setIsFilterOpen(true)}
							className={cn("h-9 rounded-xl border-border bg-background transition-all font-bold text-xs", hasActiveAdvancedFilters && "border-primary/50 bg-primary/5 text-primary")}
						>
							<Filter className="w-3.5 h-3.5 mr-2" />
							Filter
							{hasActiveAdvancedFilters && <div className="ml-2 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
						</Button>

						<Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent hover:border-border">
							<Download className="w-4 h-4 text-muted-foreground" />
						</Button>
					</div>
				</div>

				{/* Search & Active Pills */}
				<div className="flex flex-col gap-3">
					<div className="relative group flex-1">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
						<input
							type="text"
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
							placeholder="Search historical records by patient, case ID, or product..."
							className="w-full h-11 pl-10 pr-4 bg-white dark:bg-[#121214] border border-border rounded-2xl text-sm focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/20 transition-all shadow-sm"
						/>
					</div>

					{/* Zone C: Active Filter Pills (Elevated Design) */}
					{(hasActiveAdvancedFilters || debouncedSearch) && (
						<div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 animate-in slide-in-from-top-1 duration-300">
							<span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mr-1 shrink-0 ml-1">Active View:</span>

							{filters.statuses.map((s) => (
								<FilterChip key={s} label={s} onRemove={() => setFilters((prev) => ({ ...prev, statuses: prev.statuses.filter((st) => st !== s) }))} />
							))}

							{debouncedSearch && <FilterChip label={`"${debouncedSearch}"`} variant="ai" onRemove={() => setSearchInput("")} />}

							<button onClick={handleClearFilters} className="text-[10px] font-black uppercase text-rose-500 hover:text-rose-600 transition-colors ml-2 tracking-tighter">
								Reset All
							</button>
						</div>
					)}
				</div>
			</div>

			{/* --- DATA TABLE ZONE --- */}
			<div className="flex-1 min-h-0 bg-card">
				<TooltipProvider delayDuration={100}>
					<DataTable
						columns={visibleColumns}
						data={flatData}
						isLoading={isLoading}
						onRowClick={(row) => router.push(`/cases/${row.id}`)}
						fetchNextPage={fetchNextPage}
						hasNextPage={hasNextPage}
						isFetchingNextPage={isFetchingNextPage}
					/>
				</TooltipProvider>
			</div>

			{/* --- FILTER OVERLAY --- */}
			<AdvancedFiltersSheet
				mode="CLINIC_HISTORY"
				isOpen={isFilterOpen}
				onClose={() => setIsFilterOpen(false)}
				currentFilters={filters}
				onApplyFilters={(f) => setFilters(f)}
				onClearFilters={handleClearFilters}
			/>
		</div>
	);
});

// --- SUB-COMPONENT: FILTER CHIP ---
const FilterChip = memo(function FilterChip({ label, onRemove, variant = "default" }: { label: string; onRemove: () => void; variant?: "default" | "ai" }) {
	return (
		<div
			className={cn(
				"flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider shadow-sm",
				variant === "ai" ? "bg-ai/5 border-ai/20 text-ai" : "bg-background border-border text-foreground",
			)}
		>
			{label}
			<button title="dismiss filter" onClick={onRemove} className="hover:text-rose-500 transition-colors">
				<X className="w-3 h-3" />
			</button>
		</div>
	);
});
