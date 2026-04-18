"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Filter, Search, Plus, Sparkles, Loader2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useDebounce from "@/hooks/useDebounce";

// Import the Table and Columns we just built!
import { DataTable } from "@/components/cases/cases-table/data-table";
import { columns, CaseListDTO } from "@/components/cases/cases-table/columns";
import { AdvancedFiltersSheet } from "@/components/cases/cases-table/advanced-filters-sheet";

// --- MOCK SERVER ACTION (Replace with your actual `getCases` action) ---
// Note: You will need to update your backend getCases to accept search/status filters and return this DTO shape
async function mockGetCasesAction({ pageParam = 1, search = "", status = "" }) {
	// Simulating network latency
	await new Promise((resolve) => setTimeout(resolve, 800));

	const mockData: CaseListDTO[] = Array.from({ length: 20 }).map((_, i) => ({
		id: `case_${pageParam}_${i}`,
		caseNumber: `LAB-${4000 + pageParam * 20 + i}-AX`,
		status: status ? (status as any) : i % 3 === 0 ? "PROCESSING" : i % 5 === 0 ? "COMPLETED" : "NEW",
		deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * (i - 2)), // Mix of past and future
		patientName: `Patient ${pageParam}-${i}`,
		clinicName: "Apex Dental Design",
		primaryProduct: "Zirconia Multi-Layer",
		technician: i % 2 === 0 ? { firstName: "Sarah", lastName: "Jenkins", avatarUrl: "https://i.pravatar.cc/150?img=11" } : null,
	}));

	return {
		cases: mockData,
		nextCursor: pageParam < 5 ? pageParam + 1 : null, // Simulate 5 pages of data (100 cases)
		totalCount: 100,
	};
}

export default function CasesPage() {
	const router = useRouter();

	// --- 1. FILTER STATES (The Table's Brain) ---
	const [searchInput, setSearchInput] = useState("");
	const debouncedSearch = useDebounce({ value: searchInput, delay: 400 });

	// Active filters applied by the user or the AI Copilot
	const [activeStatus, setActiveStatus] = useState<string | null>(null);

	// --- 2. INFINITE QUERY FETCHING ---
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
		queryKey: ["cases-list", debouncedSearch, activeStatus],
		initialPageParam: 1,
		queryFn: async ({ pageParam }) => {
			// Replace with: await getCasesAction({ page: pageParam, search: debouncedSearch, status: activeStatus })
			return mockGetCasesAction({ pageParam, search: debouncedSearch, status: activeStatus || "" });
		},
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	const [isFilterOpen, setIsFilterOpen] = useState(false);

	const [filters, setFilters] = useState<any>({
		statuses: [],
		dateRange: "all",
		isRushOnly: false,
		clinicId: null,
	});

	// // --- 2. INFINITE QUERY FETCHING ---
	// // Make sure you update your query key to include the entire filters object!
	// const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
	// 	queryKey: ["cases-list", debouncedSearch, filters],
	// 	// ... rest of the query
	// });

	// --- 3. AI COPILOT SIMULATION ---
	const handleAIPromptClick = (intent: string) => {
		if (intent === "processing") {
			setActiveStatus("PROCESSING");
			setSearchInput("");
		} else if (intent === "zirconia") {
			setSearchInput("Zirconia");
			setActiveStatus(null);
		}
	};

	// Helper to check if any filters are active for the UI badges
	const hasActiveFilters = filters.statuses.length > 0 || filters.dateRange !== "all" || filters.isRushOnly || filters.clinicId;

	// Flatten the pages array from React Query into a single array for the virtualized table
	const flatData = useMemo(() => {
		return data?.pages.flatMap((page) => page.cases) || [];
	}, [data]);

	const totalCount = data?.pages[0]?.totalCount || 0;

	return (
		<div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in duration-700">
			{/* --- HEADER AREA --- */}
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
				<div>
					<h1 className="text-3xl font-bold tracking-tight text-foreground">Cases Database</h1>
					<p className="text-sm text-muted-foreground mt-1">
						Manage and query <span className="font-mono font-bold text-foreground">{totalCount.toLocaleString()}</span> active and historical cases.
					</p>
				</div>
				<div className="flex items-center gap-3">
					<Button
						onClick={() => setIsFilterOpen(true)} // <-- Add onClick trigger
						variant="outline"
						className={cn(
							"h-10 rounded-xl border-border bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-foreground font-semibold shadow-sm transition-colors",
							hasActiveFilters && "border-primary/50 text-primary bg-primary/5 hover:bg-primary/10", // Give visual feedback if filters are active!
						)}
					>
						<Filter className="w-4 h-4 mr-2" />
						Advanced Filters
						{hasActiveFilters && <span className="ml-2 w-2 h-2 rounded-full bg-primary animate-pulse" />}
					</Button>
					<Button onClick={() => router.push("/cases/new")} className="h-10 rounded-xl shadow-premium bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6">
						<Plus className="w-4 h-4 mr-2" />
						Create Case
					</Button>
				</div>
			</div>

			{/* --- SPLIT SCREEN ARCHITECTURE --- */}
			<div className="flex-1 flex flex-col xl:flex-row gap-6 min-h-0">
				{/* LEFT PANE: 70% Width (The Data Grid) */}
				<div className="flex-1 lab-card flex flex-col overflow-hidden shadow-sm">
					{/* Table Toolbar */}
					<div className="p-4 border-b border-border bg-slate-50/80 dark:bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
						<div className="relative w-full sm:max-w-sm group">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
							<input
								type="text"
								value={searchInput}
								onChange={(e) => setSearchInput(e.target.value)}
								placeholder="Search Case ID, Clinic, or Patient..."
								className="w-full h-10 pl-10 pr-4 bg-white dark:bg-[#121214] border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/20 transition-all shadow-sm"
							/>
						</div>

						{/* Active Filter Tags */}
						{/* Active Filter Tags */}
						<div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
							{(hasActiveFilters || debouncedSearch) && <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mr-1 shrink-0">Active Filters:</span>}

							{/* Render Badges for Statuses */}
							{filters.statuses.map((status) => (
								<span
									key={status}
									className="px-2.5 py-1.5 bg-white dark:bg-white/5 border border-border rounded-lg text-[11px] font-bold text-foreground flex items-center gap-2 shadow-sm animate-in zoom-in-95 shrink-0"
								>
									Status: {status}
									<button
										onClick={() => setFilters((prev) => ({ ...prev, statuses: prev.statuses.filter((s) => s !== status) }))}
										className="text-muted-foreground hover:text-destructive transition-colors"
									>
										<X className="w-3.5 h-3.5" />
									</button>
								</span>
							))}

							{/* Render Badge for Rush */}
							{filters.isRushOnly && (
								<span className="px-2.5 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-[11px] font-bold text-amber-700 dark:text-amber-500 flex items-center gap-2 shadow-sm animate-in zoom-in-95 shrink-0">
									Priority: Rush Only
									<button onClick={() => setFilters((prev) => ({ ...prev, isRushOnly: false }))} className="text-amber-600/70 hover:text-destructive transition-colors">
										<X className="w-3.5 h-3.5" />
									</button>
								</span>
							)}

							{debouncedSearch && (
								<span className="px-2.5 py-1.5 bg-white dark:bg-white/5 border border-border rounded-lg text-[11px] font-bold text-foreground flex items-center gap-2 shadow-sm animate-in zoom-in-95 shrink-0">
									Search: "{debouncedSearch}"
									<button onClick={() => setSearchInput("")} className="text-muted-foreground hover:text-destructive transition-colors">
										<X className="w-3.5 h-3.5" />
									</button>
								</span>
							)}
						</div>
					</div>

					{/* 
					  THE VIRTUALIZED TABLE COMPONENT 
					  It handles its own scrolling, so it perfectly fills this flex-1 container!
					*/}
					<div className="flex-1 overflow-hidden relative">
						<DataTable
							columns={columns}
							data={flatData}
							isLoading={isLoading}
							onRowClick={(row) => router.push(`/cases/${row.id}`)}
							fetchNextPage={() => fetchNextPage()}
							hasNextPage={hasNextPage}
							isFetchingNextPage={isFetchingNextPage}
						/>
					</div>
				</div>

				{/* RIGHT PANE: 30% Width (AI Query Sidebar) */}
				<div className="w-full xl:w-[300px] shrink-0 flex flex-col gap-6">
					<div className="lab-card flex-1 flex flex-col overflow-hidden relative group">
						{/* Glowing Header */}
						<div className="p-5 border-b border-border bg-gradient-to-r from-ai/10 to-transparent flex items-center gap-3 shrink-0">
							<div className="w-10 h-10 rounded-xl bg-ai/10 text-ai flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)]">
								<Sparkles className="w-5 h-5" />
							</div>
							<div>
								<h2 className="text-base font-bold text-foreground tracking-tight">AI Data Copilot</h2>
								<p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest mt-0.5">Context: {totalCount.toLocaleString()} Cases</p>
							</div>
						</div>

						{/* Chat/Query Output Area */}
						<div className="flex-1 p-5 overflow-y-auto custom-scrollbar flex flex-col justify-end bg-slate-50/30 dark:bg-transparent relative">
							{/* Ambient AI Glow in the background */}
							<div className="absolute bottom-0 right-0 w-64 h-64 bg-ai/5 rounded-full blur-3xl pointer-events-none"></div>

							<div className="bg-white dark:bg-[#121214] border border-border rounded-2xl rounded-tr-sm p-4 text-sm text-foreground shadow-sm relative z-10">
								<p className="mb-4 font-medium leading-relaxed">How can I help you query the database today?</p>

								<div className="flex flex-col gap-2.5">
									{/* Interactive Prompt 1 */}
									<button
										onClick={() => handleAIPromptClick("processing")}
										className="text-left text-xs font-medium text-muted-foreground hover:text-ai hover:bg-ai/5 p-2.5 rounded-xl transition-all border border-transparent hover:border-ai/20 flex items-center justify-between group/btn"
									>
										<span>"Show me all cases currently in Milling/Production."</span>
										<Sparkles className="w-3 h-3 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
									</button>

									{/* Interactive Prompt 2 */}
									<button
										onClick={() => handleAIPromptClick("zirconia")}
										className="text-left text-xs font-medium text-muted-foreground hover:text-ai hover:bg-ai/5 p-2.5 rounded-xl transition-all border border-transparent hover:border-ai/20 flex items-center justify-between group/btn"
									>
										<span>"Search for all Zirconia cases."</span>
										<Sparkles className="w-3 h-3 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
									</button>
								</div>
							</div>
						</div>

						{/* Input Area */}
						<div className="p-4 border-t border-border bg-slate-50/80 dark:bg-white/[0.02] shrink-0">
							<div className="relative">
								<input
									type="text"
									placeholder="Ask LabOS in plain English..."
									className="w-full h-12 pl-4 pr-12 bg-white dark:bg-[#121214] border border-border rounded-xl text-sm focus:outline-none focus:border-ai focus:ring-[3px] focus:ring-ai/20 transition-all shadow-sm"
								/>
								<Button size="icon" className="absolute right-1.5 top-1.5 w-9 h-9 rounded-lg bg-ai hover:bg-ai/90 text-white shadow-md transition-all hover:scale-105">
									<Sparkles className="w-4 h-4" />
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<AdvancedFiltersSheet
				isOpen={isFilterOpen}
				onClose={() => setIsFilterOpen(false)}
				currentFilters={filters}
				onApplyFilters={(newFilters) => setFilters(newFilters)}
				onClearFilters={() => setFilters({ statuses: "", dateRange: "all", isRushOnly: false, clinicId: null })}
			/>
		</div>
	);
}
