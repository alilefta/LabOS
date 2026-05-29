"use client";

import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import useDebounce from "@/hooks/useDebounce";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Schemas & Actions
import { TeamFilters, DEFAULT_TEAM_FILTERS } from "@/schema/composed/team/team-filters";
import { getStaffRosterAction } from "@/actions/team/get-staff-roster-action";
import { handleSafeActionError } from "@/lib/safe-action-helpers";

import { FilterChip } from "@/components/shared/filters/filter-chip";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { usePermissions } from "@/providers/permissions-provider";
import { StaffVitalsStrip } from "./staff-vitals-strip";
import { StaffRosterGrid } from "./staff-roster-grid"; // 🔥 NEW: Import our Grid component
import { Switch } from "@/components/ui/switch";

interface Props {
	initialAction?: string; // If URL has ?action=register then show the sheet
}

const RegisterStaffMemberSheet = dynamic(() => import("../../modals/team/register-staff-member").then((cm) => cm.RegisterStaffMemberSheet), {
	ssr: false,
});

const TeamAdvancedFiltersSheet = dynamic(() => import("../../modals/team/filters/team-advanced-filter-sheet").then((cm) => cm.TeamAdvancedFiltersSheet), {
	ssr: false,
});

export function TeamClientWrapper({ initialAction }: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const { labId, canViewFinancials } = usePermissions(); // 🔥 OPTIMIZATION: Pluck permission flag directly [4]

	// ── 1. STATE MANAGEMENT ────────────────────────────────────────────
	const [searchInput, setSearchInput] = useState("");
	const debouncedSearch = useDebounce({ value: searchInput, delay: 300 });

	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [filters, setFilters] = useState<TeamFilters>(DEFAULT_TEAM_FILTERS);

	const [isRegisterSheetOpen, setIsRegisterSheetOpen] = useState(initialAction === "register");
	const [prevAction, setPrevAction] = useState(initialAction);

	// RENDER-PHASE PROP SYNC (No useEffect cascades)
	if (initialAction !== prevAction) {
		setPrevAction(initialAction);
		if (initialAction === "register") {
			setIsRegisterSheetOpen(true);
		}
	}

	const handleCloseRegisterSheet = useCallback(() => {
		setIsRegisterSheetOpen(false);

		// Safely remove '?action=register' without destroying other active search params
		const params = new URLSearchParams(window.location.search);
		if (params.has("action")) {
			params.delete("action");
			router.replace(`${pathname}?${params.toString()}`, { scroll: false });
		}
	}, [router, pathname]);

	// ── 2. DATA FETCHING ────────────────────────────────────────────────
	const { data, isLoading } = useQuery({
		queryKey: ["staff-roster", labId, debouncedSearch, filters],
		queryFn: async () => {
			const res = await getStaffRosterAction({
				searchQuery: debouncedSearch,
				filters,
			});

			if (res.serverError || res.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}
			return res?.data ?? { staff: [], totalCount: 0 };
		},
		staleTime: 1000 * 60 * 5, // Cache for 5 mins
	});

	const staffList = data?.staff || [];

	// ── 3. STABLE GRID CALLBACKS (120 FPS PROTECTION) ───────────────────
	const handleEditStaff = useCallback((id: string) => {
		console.log("Edit Staff Profile:", id);
		// Future hook: setEditStaffId(id); setIsRegisterSheetOpen(true);
	}, []);

	const handleToggleStaffStatus = useCallback((id: string, currentStatus: boolean) => {
		console.log("Toggle Active Status:", id, currentStatus);
		// Future hook: executeToggleStatus({ staffId: id, current: currentStatus });
	}, []);

	const handleResendInvitation = useCallback((id: string) => {
		console.log("Resend/Copy Invitation Token for Staff:", id);
		// Future hook: executeResendInvite({ staffId: id });
	}, []);

	const handleClearFilters = useCallback(() => {
		setFilters(DEFAULT_TEAM_FILTERS);
		setSearchInput("");
	}, []);

	const hasActiveFilters = useMemo(() => {
		return filters.roleCategories.length > 0 || filters.accessStates.length > 0 || !filters.isActive;
	}, [filters]);

	const setAccessStateFilter = (state: "ALL" | "HAS_ACCESS" | "NO_ACCESS") => {
		setFilters((prev) => {
			// We reset accessStates based on the quick toggle
			if (state === "ALL") return { ...prev, accessStates: [] };
			if (state === "HAS_ACCESS") return { ...prev, accessStates: ["ACTIVE_USER", "PENDING_INVITE"] };
			return { ...prev, accessStates: ["NO_ACCESS"] }; // NO_ACCESS
		});
	};

	// Derived state to highlight the correct Quick Segment button
	const activeAccessSegment = useMemo(() => {
		if (filters.accessStates.length === 0) return "ALL";
		if (filters.accessStates.includes("NO_ACCESS") && filters.accessStates.length === 1) return "NO_ACCESS";
		return "HAS_ACCESS";
	}, [filters.accessStates]);

	return (
		<div className="space-y-8 h-full w-full flex flex-col">
			{/* Vitals summary cards */}
			<StaffVitalsStrip />

			{/* --- 2. COMMAND TOOLBAR (Zone D & E) --- */}
			<div className="p-4 sm:p-5 border border-border bg-slate-50/50 dark:bg-white/2 rounded-2xl flex flex-col gap-4 shadow-sm relative z-10">
				<div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
					{/* Left Side: Search & Quick Segments */}
					<div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full xl:w-auto">
						{/* Search Input */}
						<div className="relative w-full sm:w-[320px] shrink-0 group">
							<Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
							<input
								type="text"
								value={searchInput}
								onChange={(e) => setSearchInput(e.target.value)}
								placeholder="Search team members..."
								className="w-full h-11 pl-11 pr-4 bg-white dark:bg-[#121214] border border-border rounded-2xl text-sm focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/20 transition-all shadow-sm"
							/>
						</div>

						{/* 🔥 NEW: The Quick Segment Toggle */}
						<div className="flex p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-border shrink-0 h-11 w-full sm:w-auto">
							{[
								{ id: "ALL", label: "Entire Team" },
								{ id: "HAS_ACCESS", label: "App Users" },
								{ id: "NO_ACCESS", label: "Floor Staff" },
							].map((segment) => (
								<button
									key={segment.id}
									onClick={() => setAccessStateFilter(segment.id as "NO_ACCESS" | "ALL" | "HAS_ACCESS")}
									className={cn(
										"flex-1 sm:flex-none px-4 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap",
										activeAccessSegment === segment.id ? "bg-white dark:bg-[#121214] text-foreground shadow-sm ring-1 ring-border" : "text-muted-foreground hover:text-foreground",
									)}
								>
									{segment.label}
								</button>
							))}
						</div>
					</div>

					{/* Right Side: Action Triggers & Archived Toggle */}
					<div className="flex items-center gap-4 justify-between sm:justify-end w-full xl:w-auto">
						{/* Include Archived Quick Switch */}
						<div className="flex items-center gap-2 px-1">
							<Switch
								checked={!filters.isActive}
								onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, isActive: !checked }))}
								className="data-[state=checked]:bg-slate-500 scale-75"
							/>
							<span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest hidden sm:inline">Show Archived</span>
							<span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest sm:hidden">Archived</span>
						</div>

						<div className="w-px h-6 bg-border mx-1 hidden sm:block" />

						<Button
							variant="outline"
							size="sm"
							onClick={() => setIsFilterOpen(true)}
							className={cn("h-10 rounded-xl border-border bg-background transition-all font-bold text-xs shrink-0", hasActiveFilters && "border-primary/50 bg-primary/5 text-primary")}
						>
							<Filter className="w-3.5 h-3.5 mr-2" />
							<span className="hidden sm:inline">Advanced</span> Filters
							{hasActiveFilters && <div className="ml-2 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
						</Button>
					</div>
				</div>

				{/* Active Filter Chips */}
				{/* 
					UX FIX: We now check against the EXACT definition of a "Default State"
					to determine if the Active View strip should appear.
				*/}
				{(filters.roleCategories.length > 0 ||
					filters.accessStates.length > 0 ||
					filters.capacityBands.length > 0 ||
					filters.qualityBands.length > 0 ||
					!filters.isActive ||
					debouncedSearch !== "") && (
					<div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 animate-in slide-in-from-top-1 duration-300 border-t border-border/50 pt-4 mt-2">
						<span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mr-2 shrink-0">Active View:</span>

						{/* 1. Quick Segment Chips (Derived from accessStates) */}
						{filters.accessStates.length > 0 && (
							<FilterChip
								label={
									filters.accessStates.includes("ACTIVE_USER") && filters.accessStates.includes("PENDING_INVITE") && filters.accessStates.length === 2
										? "App Users"
										: filters.accessStates.includes("NO_ACCESS") && filters.accessStates.length === 1
											? "Floor Staff"
											: "Custom Access Filter" // Fallback for complex combinations applied via Advanced Sheet
								}
								onRemove={() => setFilters((p) => ({ ...p, accessStates: [] }))}
							/>
						)}

						{/* 2. Archived Quick Toggle Chip */}
						{!filters.isActive && (
							<FilterChip
								label="Including Archived Staff"
								variant="danger" // Visual cue that they are viewing deleted/fired data
								onRemove={() => setFilters((p) => ({ ...p, isActive: true }))}
							/>
						)}

						{/* 3. Advanced Sheet Chips */}
						{filters.roleCategories.map((cat) => (
							<FilterChip key={cat} label={cat.replace("_", " ")} onRemove={() => setFilters((p) => ({ ...p, roleCategories: p.roleCategories.filter((c) => c !== cat) }))} />
						))}

						{filters.capacityBands.map((band) => (
							<FilterChip key={band} label={`Capacity: ${band}`} onRemove={() => setFilters((p) => ({ ...p, capacityBands: p.capacityBands.filter((b) => b !== band) }))} />
						))}

						{filters.qualityBands.map((band) => (
							<FilterChip key={band} label={`Risk: ${band}`} onRemove={() => setFilters((p) => ({ ...p, qualityBands: p.qualityBands.filter((b) => b !== band) }))} />
						))}

						{/* 4. Search Chip */}
						{debouncedSearch && <FilterChip label={`"${debouncedSearch}"`} variant="ai" onRemove={() => setSearchInput("")} />}

						{/* 5. Master Reset */}
						<button onClick={handleClearFilters} className="text-[10px] font-black uppercase text-rose-500 hover:text-rose-600 transition-colors ml-2 tracking-tighter shrink-0">
							Reset Roster
						</button>
					</div>
				)}
			</div>

			{/* --- 3. STAFF ROSTER GRID --- */}
			<div className="flex-1 w-full min-h-100">
				{isLoading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">
						{Array.from({ length: 4 }).map((_, i) => (
							<Skeleton key={i} className="h-72 rounded-2xl bg-slate-100 dark:bg-white/5 border border-border" />
						))}
					</div>
				) : (
					// INTEGRATED GRID
					<StaffRosterGrid
						staff={staffList}
						canViewFinancials={canViewFinancials} // Pass permission directly [4]
						onEdit={handleEditStaff}
						onToggleStatus={handleToggleStaffStatus}
						onInvite={handleResendInvitation}
						onCreateNew={() => setIsRegisterSheetOpen(true)}
					/>
				)}
			</div>

			<RegisterStaffMemberSheet isOpen={isRegisterSheetOpen} onClose={handleCloseRegisterSheet} />
			<TeamAdvancedFiltersSheet
				currentFilters={filters}
				isOpen={isFilterOpen}
				onApplyFilters={setFilters}
				onClearFilters={() => setFilters(DEFAULT_TEAM_FILTERS)}
				onClose={() => setIsFilterOpen(false)}
			/>
		</div>
	);
}
