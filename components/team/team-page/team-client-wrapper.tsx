"use client";

import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import useDebounce from "@/hooks/useDebounce";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Schemas & Actions
import { TeamFilters, DEFAULT_TEAM_FILTERS } from "@/schema/composed/team/team.dtos";
import { getStaffRosterAction } from "@/actions/team/get-staff-roster-action";
import { handleSafeActionError } from "@/lib/safe-action-helpers";

import { FilterChip } from "@/components/shared/filters/filter-chip";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { usePermissions } from "@/providers/permissions-provider";
import { StaffVitalsStrip } from "./staff-vitals-strip";
import { StaffRosterGrid } from "./staff-roster-grid"; // 🔥 NEW: Import our Grid component

interface Props {
	initialAction?: string; // If URL has ?action=register then show the sheet
}

const RegisterStaffMemberSheet = dynamic(() => import("../../modals/team/register-staff-member").then((cm) => cm.RegisterStaffMemberSheet), {
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
		if (initialAction === "adjust") {
			setIsRegisterSheetOpen(true);
		}
	}

	const handleCloseRegisterSheet = useCallback(() => {
		setIsRegisterSheetOpen(false);
		router.replace(pathname); // Wipes '?action=adjust' from address bar
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
	// Wrapping these in useCallback guarantees that typing in the search bar
	// WILL NOT cause the non-changing StaffCards to re-render! [s3]
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

	return (
		<div className="space-y-8 h-full w-full flex flex-col">
			{/* Vitals summary cards */}
			<StaffVitalsStrip />

			{/* --- 2. COMMAND TOOLBAR (Zone D & E) --- */}
			<div className="p-4 sm:p-5 border border-border bg-slate-50/50 dark:bg-white/[0.02] rounded-2xl flex flex-col gap-4 shadow-sm relative z-10">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					{/* Search Input */}
					<div className="relative w-full sm:max-w-md group">
						<Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
						<input
							type="text"
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
							placeholder="Search team members by name, job title, or role..."
							className="w-full h-11 pl-11 pr-4 bg-white dark:bg-[#121214] border border-border rounded-2xl text-sm focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/20 transition-all shadow-sm"
						/>
					</div>

					{/* Action Triggers */}
					<div className="flex items-center gap-3">
						<Button
							variant="outline"
							size="sm"
							onClick={() => setIsFilterOpen(true)}
							className={cn("h-10 rounded-xl border-border bg-background transition-all font-bold text-xs", hasActiveFilters && "border-primary/50 bg-primary/5 text-primary")}
						>
							<Filter className="w-3.5 h-3.5 mr-2" />
							Filter
							{hasActiveFilters && <div className="ml-2 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
						</Button>
					</div>
				</div>

				{/* Active Filter Chips */}
				{(hasActiveFilters || debouncedSearch) && (
					<div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 animate-in slide-in-from-top-1 duration-300">
						<span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mr-1 shrink-0 ml-1">Active:</span>

						{filters.roleCategories.map((cat) => (
							<FilterChip key={cat} label={cat.replace("_", " ")} onRemove={() => setFilters((p) => ({ ...p, roleCategories: p.roleCategories.filter((c) => c !== cat) }))} />
						))}

						{filters.accessStates.map((state) => (
							<FilterChip key={state} label={state.replace("_", " ")} onRemove={() => setFilters((p) => ({ ...p, accessStates: p.accessStates.filter((s) => s !== state) }))} />
						))}

						{debouncedSearch && <FilterChip label={`"${debouncedSearch}"`} variant="ai" onRemove={() => setSearchInput("")} />}

						<button onClick={handleClearFilters} className="text-[10px] font-black uppercase text-rose-500 hover:text-rose-600 transition-colors ml-2 tracking-tighter shrink-0">
							Reset Roster
						</button>
					</div>
				)}
			</div>

			{/* --- 3. STAFF ROSTER GRID --- */}
			<div className="flex-1 w-full min-h-[400px]">
				{isLoading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">
						{Array.from({ length: 4 }).map((_, i) => (
							<Skeleton key={i} className="h-72 rounded-[20px] bg-slate-100 dark:bg-white/5 border border-border" />
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
		</div>
	);
}
