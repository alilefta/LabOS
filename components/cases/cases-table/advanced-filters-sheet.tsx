"use client";

import { useState } from "react";
import { Filter, X, CalendarClock, Building2, Truck, Activity, Check } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

// Types mapping to your existing state
export interface FilterState {
	statuses: string[];
	dateRange: "all" | "today" | "next_7" | "overdue";
	isRushOnly: boolean;
	clinicId: string | null;
}

interface Props {
	isOpen: boolean;
	onClose: () => void;
	currentFilters: FilterState;
	onApplyFilters: (filters: FilterState) => void;
	onClearFilters: () => void;
}

const STATUS_OPTIONS = [
	{ id: "NEW", label: "Intake / New", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
	{ id: "ASSIGNED", label: "Assigned", color: "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-zinc-300 border-border" },
	{ id: "PROCESSING", label: "Milling / Prod", color: "bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20" },
	{ id: "QC", label: "QC Check", color: "bg-ai/10 text-ai border-ai/20" },
	{ id: "COMPLETED", label: "Completed", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
];

export function AdvancedFiltersSheet({ isOpen, onClose, currentFilters, onApplyFilters, onClearFilters }: Props) {
	// We use local state so the user can fiddle with filters before hitting "Apply"
	const [localFilters, setLocalFilters] = useState<FilterState>(currentFilters);

	// Sync local state when opened
	const handleOpenChange = (open: boolean) => {
		if (open) setLocalFilters(currentFilters);
		if (!open) onClose();
	};

	const toggleStatus = (statusId: string) => {
		setLocalFilters((prev) => ({
			...prev,
			statuses: prev.statuses.includes(statusId) ? prev.statuses.filter((s) => s !== statusId) : [...prev.statuses, statusId],
		}));
	};

	return (
		<Sheet open={isOpen} onOpenChange={handleOpenChange}>
			<SheetContent className="sm:max-w-md! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* --- HEADER --- */}
				<SheetHeader className="p-6 sm:p-8 border-b border-border bg-slate-50/50 dark:bg-white/[0.02] flex flex-row items-center justify-between space-y-0">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
							<Filter className="w-5 h-5" />
						</div>
						<SheetTitle className="text-xl font-bold tracking-tight text-foreground">Advanced Filters</SheetTitle>
					</div>
					<Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
						<X className="w-5 h-5 text-muted-foreground" />
					</Button>
				</SheetHeader>

				{/* --- BODY --- */}
				<div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar">
					{/* 1. STATUS FILTER */}
					<div className="space-y-4">
						<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
							<Activity className="w-3.5 h-3.5" /> Production Status
						</h3>
						<div className="flex flex-col gap-2">
							{STATUS_OPTIONS.map((status) => {
								const isSelected = localFilters.statuses.includes(status.id);
								return (
									<button
										key={status.id}
										onClick={() => toggleStatus(status.id)}
										className={cn(
											"flex items-center justify-between p-3 rounded-xl border transition-all duration-200 group",
											isSelected
												? "border-primary bg-primary/5 ring-1 ring-primary/20 shadow-sm"
												: "border-border bg-slate-50 dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/10",
										)}
									>
										<div className="flex items-center gap-3">
											<div
												className={cn(
													"w-4 h-4 rounded border flex items-center justify-center transition-colors",
													isSelected ? "bg-primary border-primary text-white" : "border-slate-300 dark:border-zinc-600 bg-white dark:bg-[#121214]",
												)}
											>
												{isSelected && <Check className="w-3 h-3 stroke-[3]" />}
											</div>
											<span className="text-sm font-semibold text-foreground">{status.label}</span>
										</div>
										<span className={cn("w-2 h-2 rounded-full", status.color.split(" ")[0])} />
									</button>
								);
							})}
						</div>
					</div>

					{/* 2. DEADLINE FILTER */}
					<div className="space-y-4 pt-6 border-t border-border">
						<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
							<CalendarClock className="w-3.5 h-3.5" /> Target Deadline
						</h3>
						<div className="grid grid-cols-2 gap-3">
							{[
								{ id: "all", label: "Any Time" },
								{ id: "today", label: "Due Today" },
								{ id: "next_7", label: "Next 7 Days" },
								{ id: "overdue", label: "Overdue", isDanger: true },
							].map((range) => (
								<button
									key={range.id}
									onClick={() => setLocalFilters((prev) => ({ ...prev, dateRange: range.id as any }))}
									className={cn(
										"py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center",
										localFilters.dateRange === range.id
											? range.isDanger
												? "bg-destructive/10 border-destructive/30 text-destructive ring-1 ring-destructive/20"
												: "bg-primary/10 border-primary/30 text-primary ring-1 ring-primary/20"
											: "bg-slate-50 dark:bg-white/[0.02] border-border text-muted-foreground hover:text-foreground hover:border-slate-300 dark:hover:border-white/10",
									)}
								>
									{range.label}
								</button>
							))}
						</div>
					</div>

					{/* 3. LOGISTICS TOGGLES */}
					<div className="space-y-4 pt-6 border-t border-border">
						<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
							<Truck className="w-3.5 h-3.5" /> Logistics
						</h3>

						<div className="flex items-center justify-between p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 shadow-sm">
							<div className="flex flex-col gap-0.5">
								<span className="text-[13px] font-bold text-amber-700 dark:text-amber-500">Rush Cases Only</span>
								<span className="text-[10px] text-amber-600/70 dark:text-amber-500/70 leading-snug">Show only cases due within 72 hours.</span>
							</div>
							<Switch
								checked={localFilters.isRushOnly}
								onCheckedChange={(checked) => setLocalFilters((prev) => ({ ...prev, isRushOnly: checked }))}
								className="data-[state=checked]:bg-amber-500"
							/>
						</div>
					</div>

					{/* 4. CLINIC SELECTOR (Placeholder for future) */}
					<div className="space-y-4 pt-6 border-t border-border">
						<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
							<Building2 className="w-3.5 h-3.5" /> Origin Clinic
						</h3>
						<Button variant="outline" className="w-full justify-start h-11 rounded-xl text-muted-foreground font-normal border-border bg-slate-50 dark:bg-white/[0.02]">
							Select specific clinic partner...
						</Button>
					</div>
				</div>

				{/* --- FOOTER --- */}
				<SheetFooter className="p-6 sm:p-8 border-t border-border bg-slate-50/30 dark:bg-white/[0.01]">
					<div className="flex w-full items-center gap-3">
						<Button
							variant="ghost"
							onClick={() => {
								onClearFilters();
								onClose();
							}}
							className="rounded-xl h-11 px-6 font-semibold text-muted-foreground hover:text-foreground"
						>
							Clear
						</Button>
						<Button
							onClick={() => {
								onApplyFilters(localFilters);
								onClose();
							}}
							className="flex-1 rounded-xl h-11 bg-primary shadow-premium font-bold hover:bg-primary/90 transition-all text-primary-foreground"
						>
							Apply Filters
						</Button>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
