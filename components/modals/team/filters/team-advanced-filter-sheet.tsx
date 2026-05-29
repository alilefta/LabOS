"use client";

import { useState } from "react";
import { Filter, X, Users2, Activity, ShieldAlert, Check } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import { TeamFilters, DEFAULT_TEAM_FILTERS, SystemAccessState, CapacityBand, QualityRiskBand } from "@/schema/composed/team/team-filters"; // Adjust import path
import { StaffRoleCategory } from "@/schema/base/enums.base";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	currentFilters: TeamFilters;
	onApplyFilters: (filters: TeamFilters) => void;
	onClearFilters: () => void;
}

// ── CONFIGURATION MAPS ────────────────────────────────────────────────────────

const ACCESS_OPTIONS: { id: SystemAccessState; label: string; desc: string; color: string }[] = [
	{ id: "ACTIVE_USER", label: "Active User", desc: "Has portal access", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
	{ id: "PENDING_INVITE", label: "Pending Invite", desc: "Awaiting activation", color: "bg-ai/10 text-ai border-ai/20" },
	{ id: "NO_ACCESS", label: "No Access", desc: "Operational staff only", color: "bg-slate-100 dark:bg-white/5 text-muted-foreground border-border" },
];

const CAPACITY_OPTIONS: { id: CapacityBand; label: string; color: string }[] = [
	{ id: "AVAILABLE", label: "Available (0-3)", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
	{ id: "OPTIMAL", label: "Optimal (4-8)", color: "text-primary bg-primary/10 border-primary/20" },
	{ id: "HEAVY", label: "Heavy (9-14)", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
	{ id: "OVERLOADED", label: "Overloaded (15+)", color: "text-rose-500 bg-rose-500/10 border-rose-500/20" },
];

const QUALITY_OPTIONS: { id: QualityRiskBand; label: string; color: string }[] = [
	{ id: "EXCELLENT", label: "Excellent", color: "text-emerald-500 border-emerald-500/20" },
	{ id: "AVERAGE", label: "Average", color: "text-primary border-primary/20" },
	{ id: "ELEVATED", label: "Elevated Risk", color: "text-amber-500 border-amber-500/20" },
	{ id: "CRITICAL", label: "Critical Risk", color: "text-rose-500 border-rose-500/20" },
];

// Simplified Roles for UI presentation
const ROLE_GROUPS = [
	{ id: "TECHNICIAN", label: "Technician" },
	{ id: "SENIOR_TECHNICIAN", label: "Senior Tech" },
	{ id: "QC_INSPECTOR", label: "QC Inspector" },
	{ id: "COURIER", label: "Courier" },
	{ id: "MANAGER", label: "Manager" },
];

export function TeamAdvancedFiltersSheet({ isOpen, onClose, currentFilters, onApplyFilters, onClearFilters }: Props) {
	// ── STATE ────────────────────────────────────────────────────────────────
	const [localFilters, setLocalFilters] = useState<TeamFilters>(currentFilters);

	// RENDER-PHASE SYNC (Prevents useEffect cascading warning)
	const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
	if (isOpen !== prevIsOpen) {
		setPrevIsOpen(isOpen);
		if (isOpen) {
			setLocalFilters(currentFilters);
		}
	}

	// ── HANDLERS ─────────────────────────────────────────────────────────────
	type ArrayFilterKey = {
		[K in keyof TeamFilters]: TeamFilters[K] extends unknown[] ? K : never;
	}[keyof TeamFilters];

	// 2. The strictly typed toggle function
	const toggleArrayFilter = <K extends ArrayFilterKey>(
		key: K,
		value: TeamFilters[K][number], // Extracts the exact element type (e.g., StaffRoleCategory)
	) => {
		setLocalFilters((prev) => {
			// TypeScript safely allows us to cast to an array of the generic element type
			const currentArray = prev[key] as Array<TeamFilters[K][number]>;

			return {
				...prev,
				[key]: currentArray.includes(value) ? currentArray.filter((v) => v !== value) : [...currentArray, value],
			};
		});
	};

	const handleClearAll = () => {
		setLocalFilters(DEFAULT_TEAM_FILTERS);
		onClearFilters();
		onClose();
	};

	const handleApply = () => {
		onApplyFilters(localFilters);
		onClose();
	};

	return (
		<Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<SheetContent showCloseButton={false} className="sm:max-w-md! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* --- HEADER --- */}
				<SheetHeader className="p-6 sm:p-8 border-b border-border bg-primary/5 flex flex-row items-center justify-between space-y-0 shrink-0">
					<SheetTitle className="sr-only">Roster Filters</SheetTitle>
					<SheetDescription className="sr-only">Advanced Filters Sheet for Production Team</SheetDescription>
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
							<Filter className="w-5 h-5" />
						</div>
						<div className="flex flex-col text-left">
							<SheetTitle className="text-xl font-bold tracking-tight text-foreground leading-none">Roster Filters</SheetTitle>
							<p className="text-xs text-muted-foreground mt-1.5 font-medium italic">Refine workforce by capacity and role.</p>
						</div>
					</div>
					<SheetClose asChild>
						<Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors h-8 w-8">
							<X className="w-4 h-4 text-muted-foreground" />
						</Button>
					</SheetClose>
				</SheetHeader>

				{/* --- BODY --- */}
				<div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-10 custom-scrollbar">
					{/* 1. HR STATUS HIGHLIGHT */}
					<div
						className={cn(
							"flex items-center justify-between p-4 rounded-xl border transition-colors",
							!localFilters.isActive ? "border-slate-400/30 bg-slate-100 dark:bg-white/5" : "border-border bg-slate-50 dark:bg-[#121214]",
						)}
					>
						<div className="flex flex-col gap-0.5">
							<span className={cn("text-[13px] font-bold", !localFilters.isActive ? "text-slate-500" : "text-foreground")}>Include Archived Staff</span>
							<span className="text-[10px] text-muted-foreground leading-tight max-w-50">Show terminated or inactive employees.</span>
						</div>
						<Switch checked={!localFilters.isActive} onCheckedChange={(v) => setLocalFilters((prev) => ({ ...prev, isActive: !v }))} className="data-[state=checked]:bg-slate-500" />
					</div>

					{/* 2. OPERATIONAL CAPACITY */}
					<div className="flex flex-col gap-3">
						<h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2 mb-1">
							<Activity className="w-4 h-4 text-primary/70" /> Live Workload
						</h3>
						<div className="grid grid-cols-2 gap-2">
							{CAPACITY_OPTIONS.map((cap) => {
								const isSelected = localFilters.capacityBands.includes(cap.id);
								return (
									<button
										key={cap.id}
										onClick={() => toggleArrayFilter("capacityBands", cap.id)}
										className={cn(
											"p-2.5 rounded-xl border text-[11px] font-bold transition-all text-center",
											isSelected
												? cn("ring-1 shadow-inner", cap.color)
												: "bg-slate-50 dark:bg-white/2 border-border text-muted-foreground hover:text-foreground hover:border-slate-300 dark:hover:border-white/10 shadow-sm",
										)}
									>
										{cap.label}
									</button>
								);
							})}
						</div>
					</div>

					{/* 3. QUALITY / RISK BANDS */}
					<div className="flex flex-col gap-3 pt-8 border-t border-border/50">
						<h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2 mb-1">
							<ShieldAlert className="w-4 h-4 text-primary/70" /> Clinical Quality
						</h3>
						<div className="flex p-1 bg-slate-100/80 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-border overflow-x-auto no-scrollbar">
							{QUALITY_OPTIONS.map((quality) => {
								const isSelected = localFilters.qualityBands.includes(quality.id);
								return (
									<button
										key={quality.id}
										onClick={() => toggleArrayFilter("qualityBands", quality.id)}
										className={cn(
											"flex-1 py-2 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap",
											isSelected ? cn("bg-white dark:bg-[#121214] shadow-sm ring-1 ring-border", quality.color) : "text-muted-foreground hover:text-foreground",
										)}
									>
										{quality.label}
									</button>
								);
							})}
						</div>
					</div>

					{/* 4. IDENTITY & ROLES */}
					<div className="flex flex-col gap-4 pt-8 border-t border-border/50">
						<h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2 mb-1">
							<Users2 className="w-4 h-4 text-primary/70" /> Roles & Access
						</h3>

						{/* Job Roles */}
						<div className="flex flex-wrap gap-2">
							{ROLE_GROUPS.map((role) => {
								const isSelected = localFilters.roleCategories.includes(role.id as StaffRoleCategory);
								return (
									<button
										key={role.id}
										onClick={() => toggleArrayFilter("roleCategories", role.id as StaffRoleCategory)}
										className={cn(
											"px-3 py-1.5 rounded-lg border text-[11px] font-bold transition-all",
											isSelected
												? "bg-primary text-white border-primary shadow-sm"
												: "bg-card border-border text-muted-foreground hover:border-slate-300 dark:hover:border-white/20",
										)}
									>
										{role.label}
									</button>
								);
							})}
						</div>

						{/* System Access States */}
						<div className="flex flex-col gap-2 mt-4">
							{ACCESS_OPTIONS.map((access) => {
								const isSelected = localFilters.accessStates.includes(access.id);
								return (
									<button
										key={access.id}
										onClick={() => toggleArrayFilter("accessStates", access.id)}
										className={cn(
											"flex items-center justify-between p-3 rounded-2xl border transition-all duration-300 group outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
											isSelected
												? "border-primary bg-primary/5 ring-1 ring-primary/20 shadow-sm"
												: "border-border bg-slate-50/50 dark:bg-white/2 hover:border-slate-300 dark:hover:border-white/10",
										)}
									>
										<div className="flex items-center gap-3">
											<div
												className={cn(
													"w-3.5 h-3.5 rounded-sm border flex items-center justify-center transition-colors",
													isSelected ? "bg-primary border-primary text-white" : "border-slate-300 dark:border-zinc-600 bg-transparent",
												)}
											>
												{isSelected && <Check className="w-2.5 h-2.5 stroke-3" />}
											</div>
											<div className="flex flex-col items-start">
												<span className={cn("text-xs font-bold transition-colors", isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground")}>
													{access.label}
												</span>
											</div>
										</div>
										<span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-md border tracking-widest uppercase", access.color)}>{access.id.replace("_", " ")}</span>
									</button>
								);
							})}
						</div>
					</div>
				</div>

				{/* --- FOOTER --- */}
				<SheetFooter className="p-6 sm:p-8 border-t border-border bg-background shrink-0">
					<div className="flex w-full items-center gap-3">
						<Button
							variant="ghost"
							onClick={handleClearAll}
							className="rounded-xl h-11 px-6 font-bold text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors"
						>
							Clear All
						</Button>
						<Button onClick={handleApply} className="flex-1 rounded-xl h-11 bg-primary shadow-premium font-bold hover:bg-primary/90 transition-all text-white">
							Apply Filters
						</Button>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
