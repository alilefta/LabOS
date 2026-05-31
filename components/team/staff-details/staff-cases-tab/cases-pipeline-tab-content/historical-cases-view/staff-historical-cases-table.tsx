// components/team/team-details/cases-tab/staff-historical-cases-table.tsx

"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Search, Filter, History } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import useDebounce from "@/hooks/useDebounce";

import { DataTable } from "@/components/shared/tables/data-table";
import { staffHistoricalCasesColumns } from "./staff-historical-cases-columns";
import { getHistoricalCasesByStaffAction } from "@/actions/team/get-historical-cases-by-staff";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { FilterChip } from "@/components/shared/filters/filter-chip";
import dynamic from "next/dynamic";
import { CasesFilters, DEFAULT_CASES_FILTERS } from "@/schema/composed/cases/cases-filters";
import { GetStaffHistoricalCasesResult } from "@/schema/composed/team/staff-historical-cases.dtos";
import { ClinicSelectionDTO } from "@/schema/composed/clinic.details";

interface Props {
	staffId: string;
}

const preloadAdvancedFiltersSheet = () => import("../../../../../modals/cases/filters/advanced-filters-sheet");
const AdvancedFiltersSheet = dynamic(() => import("../../../../../modals/cases/filters/advanced-filters-sheet").then((m) => m.AdvancedFiltersSheet), { ssr: false });

export function StaffHistoricalCasesTable({ staffId }: Props) {
	const router = useRouter();
	const queryClient = useQueryClient();

	// ── 1. FILTER & SEARCH STATE ──────────────────────────────────────
	const [searchInput, setSearchInput] = useState("");
	const debouncedSearch = useDebounce({ value: searchInput, delay: 400 });
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [filters, setFilters] = useState<CasesFilters>(DEFAULT_CASES_FILTERS);

	// ── 2. DATA FETCHING (INFINITE SCROLL) ─────────────────────────────
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
		queryKey: ["staff-historical-cases", staffId, debouncedSearch, filters],
		queryFn: async ({ pageParam }): Promise<GetStaffHistoricalCasesResult> => {
			const res = await getHistoricalCasesByStaffAction({
				staffId,
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
		staleTime: 1000 * 60 * 5,
	});

	// ── 3. DERIVED DATA ───────────────────────────────────────────────
	const flatData = useMemo(() => data?.pages.flatMap((page) => page.cases) ?? [], [data]);

	const hasActiveFilters = useMemo(() => {
		return filters.statuses.length > 0 || !!filters.categoryId || filters.isRemakeOnly || !!filters.clinicId;
	}, [filters]);

	// Resolves the filtered Clinic's name directly from the React Query Cache [2]
	// This prevents having to perform a heavy database lookup for the chip!
	const filteredClinicName = useMemo(() => {
		if (!filters.clinicId) return null;

		// Look up in the active table data first
		const cachedClinics = queryClient.getQueryData<{ clinics: ClinicSelectionDTO[] }>(["clinics-selection", "search", ""]);
		const clinic = cachedClinics?.clinics?.find((c) => c.id === filters.clinicId);

		return clinic ? clinic.name : "Clinic Partner";
	}, [filters.clinicId, queryClient]);

	useEffect(() => {
		preloadAdvancedFiltersSheet();
	}, []);

	const handleClearAll = useCallback(() => {
		setFilters(DEFAULT_CASES_FILTERS);
		setSearchInput("");
	}, []);

	return (
		<div className="flex flex-col h-full gap-4 min-h-0 w-full animate-in fade-in duration-300">
			{/* --- HISTORICAL TOOLBAR --- */}
			<div className="p-4 sm:p-5 border border-border bg-slate-50/50 dark:bg-white/2 rounded-2xl flex flex-col gap-4 shadow-sm relative z-10 shrink-0">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					{/* Search Bar */}
					<div className="relative w-full sm:max-w-md group">
						<Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
						<input
							type="text"
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
							placeholder="Search completed logs..."
							className="w-full h-10 pl-10 pr-4 bg-white dark:bg-[#121214] border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/20 transition-all shadow-sm"
						/>
					</div>

					{/* Actions */}
					<div className="flex items-center gap-3 w-full sm:w-auto justify-end">
						{/* QUICK TOGGLE: Remakes Only */}
						<div
							className={cn(
								"flex items-center gap-3 px-3 py-1.5 rounded-xl border transition-all duration-300 h-10",
								filters.isRemakeOnly ? "bg-amber-500/5 border-amber-500/30 ring-1 ring-amber-500/20" : "bg-background border-border",
							)}
						>
							<span className={cn("text-[10px] font-bold uppercase tracking-widest", filters.isRemakeOnly ? "text-amber-600 dark:text-amber-500" : "text-muted-foreground")}>
								Remakes Only
							</span>
							<Switch
								checked={filters.isRemakeOnly}
								onCheckedChange={(val) => setFilters((prev) => ({ ...prev, isRemakeOnly: val }))}
								className="data-[state=checked]:bg-amber-500 scale-90"
							/>
						</div>

						<Button
							variant="outline"
							size="sm"
							onClick={() => setIsFilterOpen(true)}
							className={cn("h-10 rounded-xl border-border bg-background transition-all font-bold text-xs shadow-sm", hasActiveFilters && "border-primary/50 bg-primary/5 text-primary")}
						>
							<Filter className="w-3.5 h-3.5 mr-2" />
							Filters
							{hasActiveFilters && <div className="ml-2 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
						</Button>
					</div>
				</div>

				{/* Active Filter Chips */}
				{(hasActiveFilters || debouncedSearch) && (
					<div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 border-t border-border/50 mt-1 pt-3">
						<span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mr-1 shrink-0">Active View:</span>

						{/* --- FIX 2: RENDER CLINIC FILTER CHIP [2] --- */}
						{filters.clinicId && <FilterChip label={filteredClinicName || "Clinic Filtered"} onRemove={() => setFilters((p) => ({ ...p, clinicId: null }))} />}

						{filters.isRemakeOnly && <FilterChip label="Remakes Only" variant="danger" onRemove={() => setFilters((p) => ({ ...p, isRemakeOnly: false }))} />}

						{filters.statuses.map((status) => (
							<FilterChip key={status} label={status} onRemove={() => setFilters((p) => ({ ...p, statuses: p.statuses.filter((s) => s !== status) }))} />
						))}

						{debouncedSearch && <FilterChip label={`"${debouncedSearch}"`} variant="ai" onRemove={() => setSearchInput("")} />}

						<button onClick={handleClearAll} className="text-[10px] font-black uppercase text-rose-500 hover:text-rose-600 transition-colors ml-2 tracking-wide shrink-0">
							Clear history filters
						</button>
					</div>
				)}
			</div>

			{/* --- THE VIRTUALIZED DATA TABLE --- */}
			<div className="flex-1 min-h-125 lab-card overflow-hidden shadow-sm">
				<div className="h-full w-full overflow-hidden">
					<DataTable
						columns={staffHistoricalCasesColumns}
						data={flatData}
						isLoading={isLoading}
						onRowClick={(row) => router.push(`/cases/${row.id}`)}
						fetchNextPage={fetchNextPage}
						hasNextPage={hasNextPage}
						isFetchingNextPage={isFetchingNextPage}
						minHeight={500}
						emptyState={{
							title: "No Completed Records",
							description: "Adjust your search queries or date parameters to review older case histories.",
							icon: <History className="w-8 h-8 text-slate-400" />,
						}}
					/>
				</div>
			</div>
			<AdvancedFiltersSheet
				mode="STAFF_HISTORICAL" // 🔥 CONTEXT-AWARE GATE
				isOpen={isFilterOpen}
				onClose={() => setIsFilterOpen(false)}
				currentFilters={filters}
				onApplyFilters={setFilters}
				onClearFilters={handleClearAll}
			/>
		</div>
	);
}
