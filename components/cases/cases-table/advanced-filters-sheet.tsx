"use client";

import { useState } from "react";
import { Filter, X, Building2, Truck, Activity, Check, CalendarRange } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import { CasesFilters, DateFilterField, DatePreset } from "@/schema/composed/case.details";
import { CaseStatus } from "@/schema/base/enums.base";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	currentFilters: CasesFilters;
	onApplyFilters: (filters: CasesFilters) => void;
	onClearFilters: () => void;
}

// UX FIX: Added specific `dark:text-...` colors to ensure text doesn't disappear on OLED black backgrounds.
// UX FIX: Refined the labels to sound like professional lab terminology.
const STATUS_OPTIONS: { id: CaseStatus; label: string; color: string }[] = [
	{ id: "NEW", label: "Intake / Pending", color: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20" },
	{ id: "ASSIGNED", label: "Assigned to Tech", color: "bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border-border" },
	{ id: "PROCESSING", label: "In Production", color: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20" },
	{ id: "COMPLETED", label: "QC Passed", color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20" },
	{ id: "DELIVERED", label: "Shipped & Delivered", color: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20" },
];

const DATE_PRESETS: { id: DatePreset; label: string }[] = [
	{ id: "this_month", label: "This Month" },
	{ id: "last_month", label: "Last Month" },
	{ id: "last_3_months", label: "Last 3 Months" },
	{ id: "last_6_months", label: "Last 6 Months" },
	{ id: "custom", label: "Custom Range" },
];

export function AdvancedFiltersSheet({ isOpen, onClose, currentFilters, onApplyFilters, onClearFilters }: Props) {
	const [localFilters, setLocalFilters] = useState<CasesFilters>(currentFilters);
	const [dateError, setDateError] = useState<string | null>(null);

	const handleOpenChange = (open: boolean) => {
		if (open) {
			setLocalFilters(currentFilters);
			setDateError(null);
		}
		if (!open) onClose();
	};

	const toggleStatus = (statusId: CaseStatus) => {
		setLocalFilters((prev) => ({
			...prev,
			statuses: prev.statuses.includes(statusId) ? prev.statuses.filter((s) => s !== statusId) : [...prev.statuses, statusId],
		}));
	};

	const handleApply = () => {
		// Strict validation for custom dates
		if (localFilters.dateRange?.preset === "custom") {
			const { from, to } = localFilters.dateRange;
			if (!from || !to) {
				setDateError("Please select both start and end dates.");
				return;
			}
			if (from > to) {
				setDateError("Start date cannot be after the end date.");
				return;
			}
		}

		setDateError(null);
		onApplyFilters(localFilters);
		onClose();
	};

	return (
		<Sheet open={isOpen} onOpenChange={handleOpenChange}>
			<SheetContent showCloseButton={false} className="sm:max-w-md! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* --- HEADER --- */}
				<SheetHeader className="p-6 sm:p-8 border-b border-border bg-slate-50/50 dark:bg-white/2 flex flex-row items-center justify-between space-y-0">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-ai-glow-light">
							<Filter className="w-5 h-5" />
						</div>
						<div className="flex flex-col text-left">
							<SheetTitle className="text-xl font-bold tracking-tight text-foreground leading-none">Database Filters</SheetTitle>
							<p className="text-xs text-muted-foreground mt-1.5 font-medium">Refine your clinical case view.</p>
						</div>
					</div>
					<SheetClose asChild>
						<Button
							variant="ghost"
							size="icon"
							className="rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors h-8 w-8 focus-visible:ring-1 focus-visible:ring-primary"
						>
							<X className="w-4 h-4 text-muted-foreground" />
						</Button>
					</SheetClose>
				</SheetHeader>

				{/* --- BODY --- */}
				<div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-10 custom-scrollbar">
					{/* 1. STATUS FILTER */}
					<div className="flex flex-col gap-4">
						<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-1">
							<Activity className="w-4 h-4 text-primary/70" /> Workflow Stage
						</h3>
						<div className="flex flex-col gap-2">
							{STATUS_OPTIONS.map((status) => {
								const isSelected = localFilters.statuses.includes(status.id);
								return (
									<button
										key={status.id}
										onClick={() => toggleStatus(status.id)}
										className={cn(
											"flex items-center justify-between p-3 rounded-xl border transition-all duration-200 group outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
											isSelected
												? "border-primary bg-primary/5 ring-1 ring-primary/20 shadow-sm"
												: "border-border bg-slate-50/50 dark:bg-white/2 hover:border-slate-300 dark:hover:border-white/10",
										)}
									>
										<div className="flex items-center gap-3">
											<div
												className={cn(
													"w-4 h-4 rounded-md border flex items-center justify-center transition-colors shadow-sm",
													isSelected ? "bg-primary border-primary text-white" : "border-slate-300 dark:border-zinc-600 bg-white dark:bg-[#121214]",
												)}
											>
												{isSelected && <Check className="w-3 h-3 stroke-3" />}
											</div>
											<span className={cn("text-sm font-semibold transition-colors", isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground")}>
												{status.label}
											</span>
										</div>
										<span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-md border", status.color)}>{status.id}</span>
									</button>
								);
							})}
						</div>
					</div>

					{/* 2. DATE RANGE FILTER */}
					<div className="flex flex-col gap-4 pt-8 border-t border-border/50">
						<div className="flex items-center justify-between mb-1">
							<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
								<CalendarRange className="w-4 h-4 text-primary/70" /> Timeframe
							</h3>
							{localFilters.dateRange && (
								<button
									onClick={() => {
										setLocalFilters((prev) => ({ ...prev, dateRange: null }));
										setDateError(null);
									}}
									className="text-[10px] font-bold uppercase text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-md"
								>
									<X className="w-3 h-3" /> Reset Dates
								</button>
							)}
						</div>

						{/* Step 1: Segmented Control for Field Type */}
						<div className="flex p-1 bg-slate-100/80 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-border">
							{(["createdAt", "deadline"] as DateFilterField[]).map((field) => {
								const isActive = localFilters.dateRange?.field === field || (!localFilters.dateRange && field === "createdAt");
								return (
									<button
										key={field}
										onClick={() =>
											setLocalFilters((prev) => ({
												...prev,
												dateRange: {
													preset: prev.dateRange?.preset ?? "this_month",
													from: prev.dateRange?.from ?? null,
													to: prev.dateRange?.to ?? null,
													field,
												},
											}))
										}
										className={cn(
											"flex-1 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all",
											isActive ? "bg-white dark:bg-[#121214] text-primary shadow-sm ring-1 ring-border" : "text-muted-foreground hover:text-foreground",
										)}
									>
										{field === "createdAt" ? "Created Date" : "Due Date"}
									</button>
								);
							})}
						</div>

						{/* Step 2: Presets Grid */}
						<div className="grid grid-cols-2 gap-2 mt-3">
							{DATE_PRESETS.map((preset) => (
								<button
									key={preset.id}
									onClick={() => {
										setLocalFilters((prev) => ({
											...prev,
											dateRange: {
												field: prev.dateRange?.field ?? "createdAt",
												preset: preset.id,
												from: null,
												to: null,
											},
										}));
										setDateError(null);
									}}
									className={cn(
										"py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center",
										localFilters.dateRange?.preset === preset.id
											? "bg-primary/10 border-primary/30 text-primary ring-1 ring-primary/20 shadow-inner"
											: "bg-slate-50 dark:bg-white/2 border-border text-muted-foreground hover:text-foreground hover:border-slate-300 dark:hover:border-white/10 shadow-sm",
										preset.id === "custom" && "col-span-2",
									)}
								>
									{preset.label}
								</button>
							))}
						</div>

						{/* Step 3: Custom Date Inputs */}
						{localFilters.dateRange?.preset === "custom" && (
							<div className="flex gap-3 mt-4 p-4 rounded-xl border border-border bg-slate-50/50 dark:bg-white/2 animate-in fade-in slide-in-from-top-2 duration-300">
								<div className="flex-1 space-y-1.5">
									<label htmlFor="from-date-input" className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">
										From
									</label>
									<input
										id="from-date-input"
										type="date"
										// Required to force native date pickers to adapt to dark mode
										style={{ colorScheme: "dark light" }}
										value={localFilters.dateRange.from?.toISOString().split("T")[0] || ""}
										onChange={(e) =>
											setLocalFilters((prev) => ({
												...prev,
												dateRange: {
													...prev.dateRange!,
													from: e.target.value ? new Date(e.target.value) : null,
												},
											}))
										}
										className={cn(
											"w-full h-10 px-3 rounded-lg border bg-white dark:bg-[#121214] text-sm text-foreground focus:outline-none transition-all shadow-sm",
											dateError
												? "border-destructive focus:ring-destructive/20"
												: "border-border hover:border-slate-300 dark:hover:border-white/20 focus:border-primary focus:ring-[3px] focus:ring-primary/20",
										)}
									/>
								</div>
								<div className="flex-1 space-y-1.5">
									<label htmlFor="to-date-input" className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">
										To
									</label>
									<input
										id="to-date-input"
										type="date"
										style={{ colorScheme: "dark light" }}
										value={localFilters.dateRange.to?.toISOString().split("T")[0] || ""}
										onChange={(e) =>
											setLocalFilters((prev) => ({
												...prev,
												dateRange: {
													...prev.dateRange!,
													to: e.target.value ? new Date(e.target.value) : null,
												},
											}))
										}
										className={cn(
											"w-full h-10 px-3 rounded-lg border bg-white dark:bg-[#121214] text-sm text-foreground focus:outline-none transition-all shadow-sm",
											dateError
												? "border-destructive focus:ring-destructive/20"
												: "border-border hover:border-slate-300 dark:hover:border-white/20 focus:border-primary focus:ring-[3px] focus:ring-primary/20",
										)}
									/>
								</div>
							</div>
						)}

						{/* Error Message for Custom Dates */}
						{dateError && (
							<div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 mt-3 animate-in fade-in">
								<p className="text-[11px] font-semibold text-destructive flex items-center gap-2">
									<span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse shrink-0" />
									{dateError}
								</p>
							</div>
						)}
					</div>

					{/* 3. LOGISTICS TOGGLES */}
					<div className="flex flex-col gap-4 pt-8 border-t border-border/50">
						<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-1">
							<Truck className="w-4 h-4 text-amber-500/70" /> Urgency & Logistics
						</h3>

						<div
							className={cn(
								"flex items-center justify-between p-4 rounded-xl border transition-all duration-300 shadow-sm",
								localFilters.isRushOnly
									? "border-amber-500/30 bg-amber-500/10 ring-1 ring-amber-500/20"
									: "border-border bg-slate-50 dark:bg-white/2 hover:border-slate-300 dark:hover:border-white/10",
							)}
						>
							<div className="flex flex-col gap-1">
								<span className={cn("text-[13px] font-bold transition-colors", localFilters.isRushOnly ? "text-amber-700 dark:text-amber-500" : "text-foreground")}>
									Rush Cases Only
								</span>
								<span className="text-[10px] text-muted-foreground font-medium leading-snug">Isolate cases due within the next 72 hours.</span>
							</div>
							<Switch
								checked={localFilters.isRushOnly}
								onCheckedChange={(checked) => setLocalFilters((prev) => ({ ...prev, isRushOnly: checked }))}
								className="data-[state=checked]:bg-amber-500 shadow-sm"
							/>
						</div>
					</div>

					{/* 4. CLINIC SELECTOR (Placeholder) */}
					<div className="flex flex-col gap-4 pt-8 border-t border-border/50">
						<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-1">
							<Building2 className="w-4 h-4 text-primary/70" /> Origin Clinic
						</h3>
						<Button
							variant="outline"
							className="w-full justify-start h-11 rounded-xl text-muted-foreground font-normal border-border bg-slate-50 dark:bg-white/2 hover:bg-slate-100 dark:hover:bg-white/5 shadow-sm transition-all"
						>
							Select specific clinic partner...
						</Button>
					</div>
				</div>

				{/* --- FOOTER --- */}
				<SheetFooter className="p-6 sm:p-8 border-t border-border bg-background shrink-0">
					<div className="flex w-full items-center gap-3">
						<Button
							variant="ghost"
							onClick={() => {
								onClearFilters();
								onClose();
							}}
							className="rounded-xl h-11 px-6 font-bold text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/5"
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
