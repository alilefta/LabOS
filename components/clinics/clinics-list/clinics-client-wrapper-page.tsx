"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Filter, Search, Plus, Sparkles, X, Users2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useDebounce from "@/hooks/useDebounce";

import { ClinicOwnerRevenueStrip } from "@/components/clinics/clinics-list/owner-strip/clinic-owner-revenue-strip";

import { ClinicsFilters, DEFAULT_CLINICS_FILTERS, GetClinicsListResult } from "@/schema/composed/clinic.details";
import { getClinicsListAction } from "@/actions/clinics/get-clinics";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { usePermissions } from "@/providers/permissions-provider";
import { ClinicPulseStrip } from "./pulse-strip/clinics-pulse-strip";
import { DataTable } from "./clinics-table/data-table";
import { columns } from "./clinics-table/columns";
import { ClinicFiltersSheet } from "./clinic-filter-sheet";
import { ClinicQuickViewSheet } from "./clinic-quick-view-sheet";
import { AmbientBlueBgGlow } from "@/components/ui/ui-utils/ambient-blue-bg-glow";
import { parseAsString, useQueryState } from "nuqs";
import dynamic from "next/dynamic";

const ClinicCopilotSheet = dynamic(() => import("./clinic-ai-copilot-sheet").then((cm) => cm.ClinicCopilotSheet), { ssr: false });

interface PageProps {
	labId: string;
}

export function ClinicsClientWrapper({ labId }: PageProps) {
	const router = useRouter();
	// 1. URL STATE (Single Source of Truth)
	// We pass options so that setting this doesn't reload the server component

	const [quickView, setQuickView] = useQueryState("quick", parseAsString.withOptions({ shallow: true, history: "push" }));
	// ── Filter state ────────────────────────────────────────────────────────────
	const [searchInput, setSearchInput] = useState("");
	const debouncedSearch = useDebounce({ value: searchInput, delay: 400 });

	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [isAiSheetOpen, setIsAiSheetOpen] = useState(false);
	// const [quickViewClinicId, setQuickViewClinicId] = useState<string | null>(null);
	const [filters, setFilters] = useState<ClinicsFilters>(DEFAULT_CLINICS_FILTERS);
	const { canViewFinancials } = usePermissions();

	// useEffect(() => {
	// 	setQuickViewClinicId(quickView);
	// }, [quickView]);

	// Strip financial columns for standard technicians
	const visibleColumns = useMemo(() => {
		if (canViewFinancials) return columns;
		return columns.filter((col) => col.id !== "currentBalance" && col.id !== "uninvoicedCasesCount");
	}, [canViewFinancials]);

	// ── 1. Clinics list — infinite scroll ────────────────────────────────────────
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
		queryKey: ["clinics-list", labId, debouncedSearch, filters],
		queryFn: async ({ pageParam }: { pageParam: string | undefined }): Promise<GetClinicsListResult> => {
			const res = await getClinicsListAction({
				cursor: pageParam as string | undefined,
				search: debouncedSearch,
				filters,
				take: 30,
			});
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}
			return res?.data ?? { clinics: [], nextCursor: null, totalCount: 0 };
		},
		initialPageParam: undefined as string | undefined,
		getNextPageParam: (last) => last.nextCursor ?? undefined,
		staleTime: 60_000, // Clinics change less frequently than cases, safe to cache longer
	});

	// ── Derived state ────────────────────────────────────────────────────────────
	const flatData = useMemo(() => data?.pages.flatMap((page) => page.clinics) ?? [], [data]);
	const totalCount = data?.pages[0]?.totalCount ?? 0;

	const hasActiveAdvancedFilters = filters.statuses.length > 0 || filters.types.length > 0 || filters.hasOutstandingBalance;

	// ── AI copilot handler ───────────────────────────────────────────────────────
	const handleAIPromptClick = (intent: string) => {
		setIsAiSheetOpen(false);
		if (intent === "debt") {
			setFilters((prev) => ({ ...prev, pulseFilter: "credit_risk", statuses: [] }));
			setSearchInput("");
		} else if (intent === "suspended") {
			setFilters((prev) => ({ ...prev, pulseFilter: "suspended", statuses: [] }));
			setSearchInput("");
		}
	};

	const handleCloseQuickView = useCallback(() => {
		setQuickView(null);
	}, [setQuickView]);

	return (
		<div className="flex flex-col h-full animate-in fade-in duration-700 bg-background overflow-hidden relative">
			{/* ── ZONE A: STICKY GLOBAL HEADER ───────────────────────────────── */}
			<header className="shrink-0 sticky top-0 z-30 bg-background/80  border-b border-border shadow-sm">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 px-4 sm:px-6 lg:px-8 max-w-500 mx-auto w-full">
					<div>
						<h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
							<Users2 className="w-6 h-6 text-primary opacity-80" />
							Clinic Partners
						</h1>
						<p className="text-xs sm:text-sm text-muted-foreground mt-0.5 font-medium">
							Partner network — <span className="font-mono font-bold text-foreground">{totalCount.toLocaleString()}</span> registered clinics
						</p>
					</div>

					<div className="flex items-center gap-2 sm:gap-3">
						<Button
							onClick={() => setIsAiSheetOpen(true)}
							variant="outline"
							className="h-10 rounded-xl border-ai/30 bg-ai/5 hover:bg-ai/10 text-ai text-xs font-bold transition-all hidden sm:flex"
						>
							<Sparkles className="w-3.5 h-3.5 mr-2" /> Ask AI
						</Button>

						<Button
							onClick={() => setIsFilterOpen(true)}
							variant="outline"
							className={cn(
								"h-10 rounded-xl border-border bg-white dark:bg-white/5 text-xs font-bold transition-all shadow-sm",
								hasActiveAdvancedFilters && "border-primary/50 text-primary bg-primary/5",
							)}
						>
							<Filter className="w-3.5 h-3.5 mr-2 text-muted-foreground" /> Filters
							{hasActiveAdvancedFilters && <div className="ml-2 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
						</Button>

						<Button
							onClick={() => router.push("/clinics/new-clinic")}
							className="h-10 rounded-xl shadow-premium bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs px-5"
						>
							<Plus className="w-4 h-4 mr-1.5" /> New Clinic
						</Button>
					</div>
				</div>
			</header>

			{/* ── MAIN SCROLLABLE CONTENT ────────────────────────────────────── */}
			<div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 w-full">
				{/* Ambient Glow background Restricted to scroll area */}
				<AmbientBlueBgGlow />

				<div className="w-full max-w-500 mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
					<div className="shrink-0 flex flex-col gap-2">
						{/* ── ZONE B: OWNER REVENUE STRIP ─────────────────────────────────── */}
						<ClinicOwnerRevenueStrip labId={labId} />

						{/* ── ZONE C: PULSE STRIP ─────────────────────────────────────────── */}
						<ClinicPulseStrip
							// Pass data directly (requires minor prop update in your ClinicPulseStrip)
							currentFilter={filters.pulseFilter}
							onFilterChange={(newPulse) => setFilters((prev) => ({ ...prev, pulseFilter: newPulse }))}
						/>
					</div>
					{/* ── ZONE D & E: UNIFIED DATABASE TOOLBAR ───────────────────────── */}
					<div className="flex flex-col gap-4 pt-2">
						<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
							{/* Search Bar */}
							<div className="relative w-full md:max-w-md group">
								<Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
								<input
									type="text"
									value={searchInput}
									onChange={(e) => setSearchInput(e.target.value)}
									placeholder="Search by clinic name, city, or phone..."
									className="w-full h-11 pl-11 pr-4 bg-white dark:bg-[#121214] border border-border rounded-2xl text-sm focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/20 transition-all shadow-sm"
								/>
							</div>

							{/* Active Filter Tags (Zone E) */}
							<div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
								{(hasActiveAdvancedFilters || debouncedSearch) && (
									<span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mr-1 shrink-0 ml-2">Active:</span>
								)}

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

								{filters.types.map((type) => (
									<span
										key={type}
										className="px-2.5 py-1.5 bg-white dark:bg-[#121214] border border-border rounded-lg text-[11px] font-bold text-foreground flex items-center gap-2 shadow-sm animate-in zoom-in-95 shrink-0"
									>
										{type}
										<button
											title="dismiss filter"
											onClick={() => setFilters((prev) => ({ ...prev, types: prev.types.filter((t) => t !== type) }))}
											className="text-muted-foreground hover:text-destructive transition-colors"
										>
											<X className="w-3.5 h-3.5" />
										</button>
									</span>
								))}

								{filters.hasOutstandingBalance && (
									<span className="px-2.5 py-1.5 bg-destructive/10 border border-destructive/20 rounded-lg text-[11px] font-bold text-destructive flex items-center gap-2 shadow-sm animate-in zoom-in-95 shrink-0">
										With Debt
										<button
											title="dismiss filter"
											onClick={() => setFilters((prev) => ({ ...prev, hasOutstandingBalance: false }))}
											className="text-destructive/70 hover:text-foreground transition-colors"
										>
											<X className="w-3.5 h-3.5" />
										</button>
									</span>
								)}

								{debouncedSearch && (
									<span className="px-2.5 py-1.5 bg-ai/5 border border-ai/20 rounded-lg text-[10px] font-bold text-ai flex items-center gap-2 shadow-sm shrink-0">
										&quot;{debouncedSearch}&quot;
										<button title="clear search field" onClick={() => setSearchInput("")} className="hover:text-destructive transition-colors">
											<X className="w-3.5 h-3.5" />
										</button>
									</span>
								)}

								{(hasActiveAdvancedFilters || debouncedSearch) && (
									<button
										onClick={() => {
											setFilters(DEFAULT_CLINICS_FILTERS);
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
					{/* ── ZONE F: VIRTUALIZED DATA TABLE ────────────────────────── */}
					<div className="min-h-159 lab-card overflow-hidden shadow-md">
						<DataTable
							columns={visibleColumns}
							data={flatData}
							isLoading={isLoading}
							onRowClick={(row) => setQuickView(row.id)}
							fetchNextPage={fetchNextPage}
							hasNextPage={hasNextPage}
							isFetchingNextPage={isFetchingNextPage}
						/>
					</div>
				</div>
			</div>

			{/* ── OVERLAYS ──────────────────────────────────────────────────────── */}
			<ClinicFiltersSheet
				isOpen={isFilterOpen}
				onClose={() => setIsFilterOpen(false)}
				currentFilters={filters}
				onApplyFilters={setFilters}
				onClearFilters={() => setFilters(DEFAULT_CLINICS_FILTERS)}
			/>
			<ClinicCopilotSheet isOpen={isAiSheetOpen} onClose={() => setIsAiSheetOpen(false)} onActionClick={handleAIPromptClick} />

			<ClinicQuickViewSheet clinicId={quickView} isOpen={!!quickView} onClose={handleCloseQuickView} />
		</div>
	);
}
