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

const STATUS_OPTIONS: { id: CaseStatus; label: string; color: string }[] = [
	{ id: "NEW", label: "Intake / New", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
	{ id: "ASSIGNED", label: "Assigned", color: "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-zinc-300 border-border" },
	{ id: "PROCESSING", label: "Milling / Prod", color: "bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20" },
	{ id: "COMPLETED", label: "Completed", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
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
						<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
							<Filter className="w-5 h-5" />
						</div>
						<SheetTitle className="text-xl font-bold tracking-tight text-foreground">Advanced Filters</SheetTitle>
					</div>
					<SheetClose asChild>
						<Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
							<X className="w-5 h-5 text-muted-foreground" />
						</Button>
					</SheetClose>
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
												: "border-border bg-slate-50 dark:bg-white/2 hover:border-slate-300 dark:hover:border-white/10",
										)}
									>
										<div className="flex items-center gap-3">
											<div
												className={cn(
													"w-4 h-4 rounded border flex items-center justify-center transition-colors",
													isSelected ? "bg-primary border-primary text-white" : "border-slate-300 dark:border-zinc-600 bg-white dark:bg-[#121214]",
												)}
											>
												{isSelected && <Check className="w-3 h-3 stroke-3" />}
											</div>
											<span className="text-sm font-semibold text-foreground">{status.label}</span>
										</div>
										<span className={cn("w-2 h-2 rounded-full", status.color.split(" ")[0])} />
									</button>
								);
							})}
						</div>
					</div>

					{/* 2. DATE RANGE FILTER */}
					<div className="space-y-4 pt-6 border-t border-border">
						<div className="flex items-center justify-between">
							<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
								<CalendarRange className="w-3.5 h-3.5" /> Date Parameters
							</h3>
							{localFilters.dateRange && (
								<button
									onClick={() => {
										setLocalFilters((prev) => ({ ...prev, dateRange: null }));
										setDateError(null);
									}}
									className="text-[10px] font-bold uppercase text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
								>
									<X className="w-3 h-3" /> Clear
								</button>
							)}
						</div>

						{/* Step 1: Segmented Control for Field Type */}
						<div className="flex p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-border">
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
											"flex-1 py-2 rounded-lg text-xs font-bold transition-all",
											isActive ? "bg-white dark:bg-[#121214] text-primary shadow-sm ring-1 ring-border" : "text-muted-foreground hover:text-foreground",
										)}
									>
										{field === "createdAt" ? "Created Date" : "Deadline Date"}
									</button>
								);
							})}
						</div>

						{/* Step 2: Presets Grid */}
						<div className="grid grid-cols-2 gap-2 mt-2">
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
											? "bg-primary/10 border-primary/30 text-primary ring-1 ring-primary/20"
											: "bg-slate-50 dark:bg-white/2 border-border text-muted-foreground hover:text-foreground hover:border-slate-300 dark:hover:border-white/10",
										preset.id === "custom" && "col-span-2", // Make Custom span full width
									)}
								>
									{preset.label}
								</button>
							))}
						</div>

						{/* Step 3: Custom Date Inputs */}
						{localFilters.dateRange?.preset === "custom" && (
							<div className="flex gap-3 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
								<div className="flex-1 space-y-1.5">
									<label htmlFor="from-date-input" className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">
										From
									</label>
									<input
										id="from-date-input"
										type="date"
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
											"w-full h-10 px-3 rounded-xl border bg-slate-50 dark:bg-[#121214] text-sm text-foreground focus:outline-none transition-all",
											dateError ? "border-destructive focus:ring-destructive/20" : "border-border focus:ring-[3px] focus:ring-primary/20 focus:border-primary",
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
											"w-full h-10 px-3 rounded-xl border bg-slate-50 dark:bg-[#121214] text-sm text-foreground focus:outline-none transition-all",
											dateError ? "border-destructive focus:ring-destructive/20" : "border-border focus:ring-[3px] focus:ring-primary/20 focus:border-primary",
										)}
									/>
								</div>
							</div>
						)}

						{/* Error Message for Custom Dates */}
						{dateError && (
							<p className="text-[11px] font-medium text-destructive flex items-center gap-1.5 mt-2 animate-in fade-in">
								<span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
								{dateError}
							</p>
						)}
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

					{/* 4. CLINIC SELECTOR (Placeholder) */}
					<div className="space-y-4 pt-6 border-t border-border">
						<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
							<Building2 className="w-3.5 h-3.5" /> Origin Clinic
						</h3>
						<Button variant="outline" className="w-full justify-start h-11 rounded-xl text-muted-foreground font-normal border-border bg-slate-50 dark:bg-white/2">
							Select specific clinic partner...
						</Button>
					</div>
				</div>

				{/* --- FOOTER --- */}
				<SheetFooter className="p-6 sm:p-8 border-t border-border bg-slate-50/30 dark:bg-white/1">
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
						<Button onClick={handleApply} className="flex-1 rounded-xl h-11 bg-primary shadow-premium font-bold hover:bg-primary/90 transition-all text-primary-foreground">
							Apply Filters
						</Button>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
