"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Search, Filter, ListTodo, ShieldCheck, Check, CheckSquare, Square, ArrowRightLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useDebounce from "@/hooks/useDebounce";

import { DataTable } from "@/components/shared/tables/data-table"; // Adjust path to your virtualized table
import { GetStaffActiveCasesResult } from "@/schema/composed/team/staff-active-cases.dtos";
import { getActiveCasesByStaffAction } from "@/actions/team/get-active-cases";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { FilterChip } from "@/components/shared/filters/filter-chip";
import { CasesFilters, DEFAULT_CASES_FILTERS } from "@/schema/composed/cases/cases-filters";
import { staffActiveCasesColumns } from "./staff-active-cases-column";
import { useReassignUiStore } from "@/store/team/use-reassign-ui-store";
import { StaffRoleCategory } from "@/schema/base/enums.base";
import dynamic from "next/dynamic";
import { ClinicSelectionDTO } from "@/schema/composed/clinic.details";

interface Props {
	staffId: string;
	originalStaffName: string;
	originalActiveCaseCount: number;
}

const preloadAdvancedFiltersSheet = () => import("../../../../../modals/cases/filters/advanced-filters-sheet");
const AdvancedFiltersSheet = dynamic(() => import("../../../../../modals/cases/filters/advanced-filters-sheet").then((m) => m.AdvancedFiltersSheet), { ssr: false });
const ReassignStaffCasesSheet = dynamic(() => import("../../../../../modals/team/reassign-staff-cases-sheet").then((m) => m.ReassignStaffCasesSheet), { ssr: false });

export function StaffActiveCasesTable({ staffId, originalActiveCaseCount, originalStaffName }: Props) {
	const router = useRouter();
	const queryClient = useQueryClient();

	// ── 1. FILTER STATE ────────────────────────────────────────────────────────
	const [searchInput, setSearchInput] = useState("");
	const debouncedSearch = useDebounce({ value: searchInput, delay: 400 });
	// We reuse the global cases filter schema, but we'll only expose relevant parts in the UI
	const [filters, setFilters] = useState<CasesFilters>(DEFAULT_CASES_FILTERS);
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	// The O(1) Set pattern for bulk operations [1]
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

	// ── 2. ZUSTAND REASSIGNMENT STATE ──────────────────────────────────────────
	const isReassignOpen = useReassignUiStore((s) => s.isOpen);
	const reassignCaseIds = useReassignUiStore((s) => s.caseIds);
	const reassignRoleCategory = useReassignUiStore((s) => s.roleCategory);
	const closeReassignSheet = useReassignUiStore((s) => s.closeReassignSheet);

	// ── 2. ZUSTAND REASSIGNMENT STATE ────────────────────────────────────
	const openReassignSheet = useReassignUiStore((s) => s.openReassignSheet);

	// ── 2. INFINITE QUERY FETCHING ─────────────────────────────────────────────
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
		queryKey: ["staff-active-cases", staffId, debouncedSearch, filters],
		queryFn: async ({ pageParam }): Promise<GetStaffActiveCasesResult> => {
			const res = await getActiveCasesByStaffAction({
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
		staleTime: 1000 * 30 * 5, // 30 seconds - active queues change fast
	});

	useEffect(() => {
		preloadAdvancedFiltersSheet();
	}, []);

	// ── 3. DERIVED DATA ────────────────────────────────────────────────────────
	const flatData = useMemo(() => data?.pages.flatMap((page) => page.cases) ?? [], [data]);
	const totalCount = data?.pages[0]?.totalCount ?? 0;

	const hasActiveFilters = useMemo(() => {
		return filters.statuses.length > 0 || !!filters.categoryId || filters.isRushOnly || !!filters.clinicId;
	}, [filters]);
	// ── 4. QUICK FILTER HANDLERS ───────────────────────────────────────────────
	// A quick way for a manager to say "Just show me the rush jobs on Ahmed's desk"
	const toggleRushOnly = () => setFilters((prev) => ({ ...prev, isRushOnly: !prev.isRushOnly }));

	const filteredClinicName = useMemo(() => {
		if (!filters.clinicId) return null;

		// Look up in the active table data first
		const cachedClinics = queryClient.getQueryData<{ clinics: ClinicSelectionDTO[] }>(["clinics-selection", "search", ""]);
		const clinic = cachedClinics?.clinics?.find((c) => c.id === filters.clinicId);

		return clinic ? clinic.name : "Clinic Partner";
	}, [filters.clinicId, queryClient]);

	const handleClearFilters = useCallback(() => {
		setFilters(DEFAULT_CASES_FILTERS);
		setSearchInput("");
	}, []);

	// We inject a custom checkbox column dynamically so we don't have to
	// muddy up the base columns definition with local state.
	const tableColumns = useMemo(() => {
		return [
			{
				id: "select",
				header: () => {
					const isAllSelected = flatData.length > 0 && selectedIds.size === flatData.length;
					return (
						<button
							onClick={() => {
								if (isAllSelected) setSelectedIds(new Set());
								else setSelectedIds(new Set(flatData.map((c) => c.id)));
							}}
							className="rounded hover:bg-slate-200 dark:hover:bg-white/10"
						>
							{isAllSelected ? <CheckSquare className="w-4.5 h-4.5 text-primary" /> : <Square className="w-4.5 h-4.5 text-muted-foreground" />}
						</button>
					);
				},
				cell: ({ row }) => {
					const isSelected = selectedIds.has(row.original.id);
					return (
						<button
							onClick={(e) => {
								e.stopPropagation();
								setSelectedIds((prev) => {
									const next = new Set(prev);
									if (next.has(row.original.id)) next.delete(row.original.id);
									else next.add(row.original.id);
									return next;
								});
							}}
							className={cn(
								"w-4 h-4 rounded border flex items-center justify-center transition-colors shadow-sm",
								isSelected ? "bg-primary border-primary text-white" : "bg-white dark:bg-[#121214] border-slate-300 dark:border-zinc-700",
							)}
						>
							{isSelected && <Check className="w-3 h-3 stroke-3" />}
						</button>
					);
				},
			},
			...staffActiveCasesColumns,
		];
	}, [flatData, selectedIds]);

	const handleBulkReassign = useCallback(() => {
		// Since a bulk reassign might mix cases where the tech has different roles,
		// we default to picking the role of the first selected case. The sheet will handle validation.
		const firstSelectedCase = flatData.find((c) => c.id === Array.from(selectedIds)[0]);
		if (firstSelectedCase) {
			openReassignSheet(Array.from(selectedIds), firstSelectedCase.assignedRole);
		}
	}, [selectedIds, flatData, openReassignSheet]);

	return (
		<div className="flex flex-col h-full gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-0 w-full">
			{/* --- THE WORKBENCH COMMAND STRIP --- */}
			<div className="p-4 sm:p-5 border border-border bg-slate-50/50 dark:bg-white/2 rounded-2xl flex flex-col gap-4 shadow-sm relative z-10 shrink-0">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					{/* Left: Identity & Search */}
					<div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
						<div className="hidden sm:flex items-center gap-2 pr-4 border-r border-border/50">
							<div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
								<ListTodo className="w-4 h-4" />
							</div>
							<div className="flex flex-col">
								<span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Queue</span>
								<span className="text-sm font-bold text-foreground leading-none">{totalCount} Active</span>
							</div>
						</div>

						<div className="relative w-full sm:w-80 group">
							<Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
							<input
								type="text"
								value={searchInput}
								onChange={(e) => setSearchInput(e.target.value)}
								placeholder="Search assigned cases..."
								className="w-full h-10 pl-10 pr-4 bg-white dark:bg-[#121214] border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/20 transition-all shadow-sm"
							/>
						</div>
					</div>

					{/* Right: Quick Toggles */}
					<div className="flex items-center gap-3 w-full sm:w-auto justify-end">
						<Button
							variant="outline"
							size="sm"
							onClick={toggleRushOnly}
							className={cn(
								"h-10 rounded-xl transition-all font-bold text-xs shadow-sm",
								filters.isRushOnly
									? "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-500"
									: "bg-background border-border text-muted-foreground hover:border-amber-500/30 hover:text-amber-600",
							)}
						>
							🔥 Rush Only
						</Button>

						<Button
							variant="outline"
							size="sm"
							onClick={() => setIsFilterOpen(true)} // 🔥 OPENS THE SHEET
							className={cn(
								"h-10 rounded-xl border-border bg-background transition-all font-bold text-xs shadow-sm",
								hasActiveFilters && !filters.isRushOnly && "border-primary/50 bg-primary/5 text-primary",
							)}
						>
							<Filter className="w-3.5 h-3.5 mr-2" />
							Filters
							{hasActiveFilters && !filters.isRushOnly && <div className="ml-2 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
						</Button>
					</div>
				</div>

				{/* Active Filter Chips */}
				{(hasActiveFilters || debouncedSearch) && (
					<div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 border-t border-border/50 mt-1 pt-3">
						<span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mr-1 shrink-0">Active View:</span>

						{/* --- FIX 2: RENDER CLINIC FILTER CHIP [2] --- */}
						{filters.clinicId && <FilterChip label={filteredClinicName || "Clinic Filtered"} onRemove={() => setFilters((p) => ({ ...p, clinicId: null }))} />}

						{filters.isRushOnly && <FilterChip label="Rush Only" variant="danger" onRemove={() => setFilters((p) => ({ ...p, isRushOnly: false }))} />}

						{filters.statuses.map((status) => (
							<FilterChip key={status} label={status} onRemove={() => setFilters((p) => ({ ...p, statuses: p.statuses.filter((s) => s !== status) }))} />
						))}

						{debouncedSearch && <FilterChip label={`"${debouncedSearch}"`} variant="ai" onRemove={() => setSearchInput("")} />}

						<button onClick={handleClearFilters} className="text-[10px] font-black uppercase text-rose-500 hover:text-rose-600 transition-colors ml-2 tracking-wide shrink-0">
							Clear history filters
						</button>
					</div>
				)}
			</div>

			{/* --- THE VIRTUALIZED DATA TABLE --- */}
			{/* The wrapper handles the min-height to ensure virtualization works properly */}
			<div className="flex-1 lab-card flex min-h-125 flex-col overflow-hidden shadow-sm">
				<div className="h-full w-full overflow-hidden">
					<DataTable
						columns={tableColumns}
						data={flatData}
						isLoading={isLoading}
						onRowClick={(row) => router.push(`/cases/${row.id}`)}
						fetchNextPage={fetchNextPage}
						hasNextPage={hasNextPage}
						isFetchingNextPage={isFetchingNextPage}
						minHeight={500}
						emptyState={{
							title: "Zero Past Due Accounts",
							description: "Incredible work. All of your clinic partners are currently up to date on their payments.",
							icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
						}}
					/>
				</div>
			</div>

			{/* ── 5. THE REASSIGNMENT SLIDE-OVER SHEET ── */}
			{isReassignOpen && (
				<ReassignStaffCasesSheet
					isOpen={isReassignOpen}
					onClose={closeReassignSheet}
					caseIds={reassignCaseIds}
					caseNumbers={[]} // Extracted dynamically if needed, but caseIds.length is sufficient for description
					originalStaffId={staffId}
					originalStaffName={originalStaffName}
					originalActiveCaseCount={originalActiveCaseCount}
					roleCategory={reassignRoleCategory as StaffRoleCategory}
				/>
			)}
			<AdvancedFiltersSheet
				mode="STAFF_DASHBOARD" // 🔥 CONTEXT-AWARE GATE
				isOpen={isFilterOpen}
				onClose={() => setIsFilterOpen(false)}
				currentFilters={filters}
				onApplyFilters={setFilters}
				onClearFilters={handleClearFilters}
			/>

			{/* --- STICKY REASSIGNMENT FOOTER --- */}
			{selectedIds.size > 0 && (
				<div className="absolute bottom-4 left-4 right-4 sm:left-8 sm:right-8 z-30 animate-in slide-in-from-bottom-4 duration-300">
					<div className="bg-background/90 backdrop-blur-xl border border-primary/30 shadow-[0_20px_40px_rgba(37,99,235,0.15)] rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
								<ArrowRightLeft className="w-5 h-5" />
							</div>
							<div className="flex flex-col">
								<span className="text-sm font-bold text-foreground">{selectedIds.size} cases selected</span>
								<span className="text-[10px] sm:text-xs text-muted-foreground font-medium">Ready to transfer ownership.</span>
							</div>
						</div>

						<div className="flex items-center gap-4">
							<Button variant="ghost" onClick={() => setSelectedIds(new Set())} className="font-semibold text-muted-foreground hover:text-destructive">
								Cancel
							</Button>
							<Button onClick={handleBulkReassign} className="h-11 px-8 rounded-xl bg-primary text-white font-bold shadow-premium hover:bg-primary/90 transition-all">
								Reassign Cases <ArrowRightLeft className="w-4 h-4 ml-2" />
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
