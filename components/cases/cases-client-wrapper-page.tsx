"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Filter, Search, Plus, Sparkles, X, List, LayoutGrid } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useDebounce from "@/hooks/useDebounce";

import { OwnerRevenueStrip } from "@/components/cases/owner-strip/owner-strip";
import { PulseStrip } from "@/components/cases/pulse-strip/pulse-strip";

import { DataTable } from "@/components/cases/cases-table/data-table";
import { columns } from "@/components/cases/cases-table/columns";
import { AdvancedFiltersSheet } from "@/components/cases/cases-table/advanced-filters-sheet";
import { AiCopilotSheet } from "@/components/cases/cases-table/ai-copilot-sheet";
import { CasesFilters, DEFAULT_CASES_FILTERS, GetCasesListResult } from "@/schema/composed/case.details";
import { getCasesListAction, getCasesPulseAction, getCasesRevenueAction } from "@/actions/cases/get-cases";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { usePermissions } from "@/providers/permissions-provider";
import { updateCaseStatusAction } from "@/actions/cases/update-case";
import { useAction } from "next-safe-action/hooks";
import { CaseStatus } from "@/schema/base/enums.base";
import { toast } from "sonner";
import { KanbanBoard } from "./kanban/kanban-board";
import { KanbanWrapper } from "./kanban/kanban-wrapper";

interface PageProps {
	labId: string;
}

export default function CasesClientWrapperPage({ labId }: PageProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// ── Filter state ────────────────────────────────────────────────────────────
	const [searchInput, setSearchInput] = useState("");
	const debouncedSearch = useDebounce({ value: searchInput, delay: 400 });
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [isAiSheetOpen, setIsAiSheetOpen] = useState(false);
	const [filters, setFilters] = useState<CasesFilters>(DEFAULT_CASES_FILTERS);

	// ── VIEW SWITCHER LOGIC ──────────────────────────────────────────────────
	const view = searchParams.get("view") || "table";

	const setView = (newView: "table" | "board") => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("view", newView);
		router.replace(`${pathname}?${params.toString()}`);
	};

	const { canViewFinancials } = usePermissions();

	// If they can't see financials, we strip the grandTotal column before
	// it even hits the DataTable component.
	const visibleColumns = useMemo(() => {
		if (canViewFinancials) return columns;
		return columns.filter((col) => col.id !== "grandTotal");
	}, [canViewFinancials]);

	// ── 1. Cases list — infinite scroll ─────────────────────────────────────────

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, refetch } = useInfiniteQuery({
		queryKey: ["cases-list", labId, debouncedSearch, filters],
		queryFn: async ({ pageParam }: { pageParam: string | undefined }): Promise<GetCasesListResult> => {
			const res = await getCasesListAction({
				cursor: pageParam as string | undefined,
				search: debouncedSearch,
				filters,
				take: 30,
			});
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}
			return res?.data ?? { cases: [], nextCursor: null, totalCount: 0 };
		},
		initialPageParam: undefined as string | undefined,
		getNextPageParam: (last) => last.nextCursor ?? undefined,
		staleTime: 20_000,
	});

	// ── 2. Pulse strip counts ────────────────────────────────────────────────────
	// Separate query — short stale time so the strip stays fresh as cases move
	// through statuses. Does not depend on table filters intentionally:
	// pulse counts always reflect the full lab state, not the current table view.
	const { data: pulseData, isLoading: isPulseLoading } = useQuery({
		queryKey: ["cases-pulse", labId],
		queryFn: async () => {
			const res = await getCasesPulseAction();
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({
					serverError: res.serverError,
					validationErrors: res.validationErrors,
				});
			}
			return res?.data ?? null;
		},
		staleTime: 30_000,
		refetchInterval: 60_000, // auto-refresh every 60s
	});

	// ── 3. Revenue strip — owner/manager only ───────────────────────────────────
	const { data: revenueData, isLoading: isRevenueLoading } = useQuery({
		queryKey: ["cases-revenue", labId],
		queryFn: async () => {
			const res = await getCasesRevenueAction();
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({
					serverError: res.serverError,
					validationErrors: res.validationErrors,
				});
			}
			return res?.data ?? null;
		},
		staleTime: 60_000,
		enabled: canViewFinancials, // never fires for STAFF/ADMIN
	});

	// ── 4. KANBAN STATUS MUTATION ────────────────────────────────────────────
	const { executeAsync: updateStatus } = useAction(updateCaseStatusAction, {
		onSuccess: () => {
			// Instantly refetch all lists to reflect the new column state
			refetch();
			router.refresh();
		},
		onError: ({ error }) => handleSafeActionError(error),
	});

	const handleStatusChange = useCallback(
		async (caseId: string, newStatus: CaseStatus) => {
			const promise = updateStatus({ caseId, newStatus });
			toast.promise(promise, {
				loading: "Moving case...",
				success: "Production stage updated.",
				error: "Failed to move case.",
			});
		},
		[updateStatus],
	);

	// ── Derived state ────────────────────────────────────────────────────────────
	const flatData = useMemo(() => data?.pages.flatMap((page) => page.cases) ?? [], [data]);
	const totalCount = data?.pages[0]?.totalCount ?? 0;

	const hasActiveAdvancedFilters = filters.statuses.length > 0 || filters.dateRange !== null || filters.isRushOnly || !!filters.clinicId || !!filters.staffId || !!filters.categoryId;

	// ── AI copilot handler ───────────────────────────────────────────────────────
	const handleAIPromptClick = (intent: string) => {
		setIsAiSheetOpen(false);
		if (intent === "processing") {
			setFilters((prev) => ({ ...prev, pulseFilter: "processing", statuses: [] }));
			setSearchInput("");
		} else if (intent === "zirconia") {
			setSearchInput("Zirconia");
			setFilters((prev) => ({ ...prev, pulseFilter: "all", statuses: [] }));
		}
	};

	// ── Date range label helper — used in the filter tag ────────────────────────
	const dateRangeLabel = (): string => {
		if (!filters.dateRange) return "";
		const field = filters.dateRange.field === "createdAt" ? "Created" : "Deadline";
		const presetLabels: Record<string, string> = {
			this_month: "This Month",
			last_month: "Last Month",
			last_3_months: "Last 3 Months",
			last_6_months: "Last 6 Months",
			custom: filters.dateRange.from && filters.dateRange.to ? `${filters.dateRange.from.toLocaleDateString()} → ${filters.dateRange.to.toLocaleDateString()}` : "Custom",
		};
		return `${field}: ${presetLabels[filters.dateRange.preset]}`;
	};
	return (
		<div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in duration-700 overflow-hidden">
			{/* ── ZONE A: GLOBAL HEADER ─────────────────────────────────────────── */}
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 shrink-0">
				<div>
					<h1 className="text-3xl font-bold tracking-tight text-foreground">Cases</h1>
					<p className="text-sm text-muted-foreground mt-1">
						Production floor — <span className="font-mono font-bold text-foreground">{totalCount.toLocaleString()}</span> active cases
					</p>
				</div>

				<div className="flex items-center gap-3">
					{/* THE VIEW SWITCHER (Segmented Control style) */}
					<div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl border border-border shadow-inner">
						<button
							onClick={() => setView("table")}
							className={cn(
								"flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
								view === "table" ? "bg-white dark:bg-[#121214] text-primary shadow-sm ring-1 ring-border" : "text-muted-foreground hover:text-foreground",
							)}
						>
							<List className="w-3.5 h-3.5" /> List
						</button>
						<button
							onClick={() => setView("board")}
							className={cn(
								"flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
								view === "board" ? "bg-white dark:bg-[#121214] text-primary shadow-sm ring-1 ring-border" : "text-muted-foreground hover:text-foreground",
							)}
						>
							<LayoutGrid className="w-3.5 h-3.5" /> Board
						</button>
					</div>

					<Button
						onClick={() => setIsAiSheetOpen(true)}
						variant="outline"
						className="h-10 rounded-xl border-ai/30 bg-ai/5 hover:bg-ai/10 text-ai font-semibold shadow-sm transition-all hidden sm:flex"
					>
						<Sparkles className="w-4 h-4 mr-2" /> Ask AI
					</Button>

					<Button
						onClick={() => setIsFilterOpen(true)}
						variant="outline"
						className={cn(
							"h-10 rounded-xl border-border bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-foreground font-semibold shadow-sm",
							hasActiveAdvancedFilters && "border-primary/50 text-primary bg-primary/5 hover:bg-primary/10",
						)}
					>
						<Filter className="w-4 h-4 mr-2 text-muted-foreground" /> Filters
						{hasActiveAdvancedFilters && <span className="ml-2 w-2 h-2 rounded-full bg-primary animate-pulse" />}
					</Button>

					<Button onClick={() => router.push("/cases/new-case")} className="h-10 rounded-xl shadow-premium bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6">
						<Plus className="w-4 h-4 mr-2" /> New Case
					</Button>
				</div>
			</div>

			{/* ── SCROLLABLE WRAPPER ────────────────────────────────────────────── */}
			<div className="flex-1 flex flex-col min-h-0 overflow-y-auto custom-scrollbar pb-6 pr-1 pt-2">
				{/* ── ZONE B: OWNER REVENUE STRIP ─────────────────────────────────── */}
				<OwnerRevenueStrip data={revenueData ?? null} isLoading={isRevenueLoading} />

				{/* ── ZONE C: PULSE STRIP ─────────────────────────────────────────── */}
				<PulseStrip
					stats={pulseData ?? null}
					isLoading={isPulseLoading}
					currentFilter={filters.pulseFilter}
					onFilterChange={(newPulse) => setFilters((prev) => ({ ...prev, pulseFilter: newPulse }))}
				/>

				{/* ── ZONE D & E: UNIFIED DATABASE TOOLBAR ───────────────────────── */}
				{/* By placing this here, it stays consistent whether you see the List or Board */}
				<div className="flex flex-col gap-4 mb-4 mt-2 shrink-0">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
						{/* Search Bar (Zone D) */}
						<div className="relative w-full sm:max-w-md group">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
							<input
								type="text"
								value={searchInput}
								onChange={(e) => setSearchInput(e.target.value)}
								placeholder="Search by case ID, patient, clinic..."
								className="w-full h-11 pl-10 pr-4 bg-white dark:bg-[#121214] border border-border rounded-2xl text-sm focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/20 transition-all shadow-sm"
							/>
						</div>

						{/* Active Filter Tags (Zone E) */}
						<div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
							{(hasActiveAdvancedFilters || debouncedSearch) && <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mr-1 shrink-0 ml-2">Active:</span>}

							{filters.statuses.map((status) => (
								<span
									key={status}
									className="px-2.5 py-1.5 bg-white dark:bg-[#121214] border border-border rounded-lg text-[11px] font-bold text-foreground flex items-center gap-2 shadow-sm animate-in zoom-in-95 shrink-0"
								>
									{status}
									<button
										title="dismiss filter"
										onClick={() => setFilters((prev) => ({ ...prev, statuses: prev.statuses.filter((s) => s !== status) }))}
										className="text-muted-foreground hover:text-destructive transition-colors"
									>
										<X className="w-3.5 h-3.5" />
									</button>
								</span>
							))}

							{filters.dateRange && (
								<span className="px-2.5 py-1.5 bg-white dark:bg-[#121214] border border-border rounded-lg text-[11px] font-bold text-foreground flex items-center gap-2 shadow-sm animate-in zoom-in-95 shrink-0">
									{dateRangeLabel()}
									<button
										title="dismiss filter"
										onClick={() => setFilters((prev) => ({ ...prev, dateRange: null }))}
										className="text-muted-foreground hover:text-destructive transition-colors"
									>
										<X className="w-3.5 h-3.5" />
									</button>
								</span>
							)}

							{filters.isRushOnly && (
								<span className="px-2.5 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-[11px] font-bold text-amber-600 dark:text-amber-500 flex items-center gap-2 shadow-sm animate-in zoom-in-95 shrink-0">
									Rush Only{" "}
									<button
										title="dismiss filter"
										onClick={() => setFilters((prev) => ({ ...prev, isRushOnly: false }))}
										className="text-amber-600/70 hover:text-destructive transition-colors"
									>
										<X className="w-3.5 h-3.5" />
									</button>
								</span>
							)}

							{debouncedSearch && (
								<span className="px-2.5 py-1.5 bg-ai/5 border border-ai/20 rounded-lg text-[11px] font-bold text-ai flex items-center gap-2 shadow-sm animate-in zoom-in-95 shrink-0">
									&quot;{debouncedSearch}&quot;{" "}
									<button title="dismiss filter" onClick={() => setSearchInput("")} className="text-ai/70 hover:text-destructive transition-colors">
										<X className="w-3.5 h-3.5" />
									</button>
								</span>
							)}

							{(hasActiveAdvancedFilters || debouncedSearch) && (
								<button
									onClick={() => {
										setFilters(DEFAULT_CASES_FILTERS);
										setSearchInput("");
									}}
									className="text-[11px] text-muted-foreground hover:text-destructive transition-colors shrink-0 ml-2 font-bold uppercase tracking-tighter"
								>
									Clear all
								</button>
							)}
						</div>
					</div>
				</div>

				{/* ── ZONE F: DYNAMIC CONTENT CANVAS ───────────────────────────────── */}
				<div className="flex-1 min-h-125">
					{view === "table" ? (
						<div className="h-full lab-card overflow-hidden shadow-sm">
							<DataTable
								columns={visibleColumns}
								data={flatData}
								isLoading={isLoading}
								onRowClick={(row) => router.push(`/cases/${row.id}`)}
								fetchNextPage={fetchNextPage}
								hasNextPage={hasNextPage}
								isFetchingNextPage={isFetchingNextPage}
							/>
						</div>
					) : (
						<div className="h-full animate-in fade-in slide-in-from-right-4 duration-500">
							{/* <KanbanBoard data={flatData} onStatusChange={handleStatusChange} /> */}
							<KanbanWrapper serverData={flatData} onStatusChangeAction={handleStatusChange} />
						</div>
					)}
				</div>
			</div>

			{/* ── OVERLAYS ──────────────────────────────────────────────────────── */}
			<AdvancedFiltersSheet
				isOpen={isFilterOpen}
				onClose={() => setIsFilterOpen(false)}
				currentFilters={filters}
				onApplyFilters={setFilters}
				onClearFilters={() => setFilters(DEFAULT_CASES_FILTERS)}
			/>
			<AiCopilotSheet isOpen={isAiSheetOpen} onClose={() => setIsAiSheetOpen(false)} onActionClick={handleAIPromptClick} />
		</div>
	);
}
