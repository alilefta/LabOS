"use client";

import { memo, useCallback, useState } from "react";
import { Filter, X, Receipt, CheckCircle2, AlertTriangle, Clock, FileText, XCircle, CalendarRange, PieChart, Building2, LucideIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import { InvoiceFilters, DEFAULT_INVOICE_FILTERS, InvoiceDateFilterField } from "@/schema/composed/invoices/invoice-filters";
import { InvoiceStatus } from "@/schema/base/enums.base"; // Adjust to your actual path
import { DatePreset } from "@/schema/composed/shared/date-preset";
import { ClinicFilterSelector } from "@/components/shared/filters/clinic-filter-selector";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	currentFilters: InvoiceFilters;
	onApplyFilters: (filters: InvoiceFilters) => void;
	onClearFilters: () => void;
	mode: "GLOBAL" | "CLINIC_LEDGER"; // Context-aware prop
}

// ── CONFIGURATION MAP ────────────────────────────────────────────────────────
const INVOICE_STATUS_REGISTRY: Record<InvoiceStatus, { label: string; color: string; icon: LucideIcon }> = {
	PAID: { label: "Paid in Full", icon: CheckCircle2, color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
	PARTIAL: { label: "Partially Paid", icon: PieChart, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
	OVERDUE: { label: "Overdue", icon: AlertTriangle, color: "bg-rose-500/10 text-rose-600 dark:text-rose-500 border-rose-500/20" },
	SENT: { label: "Sent / Pending", icon: Clock, color: "bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20" },
	DRAFT: { label: "Draft", icon: FileText, color: "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-zinc-400 border-border" },
	CANCELLED: { label: "Cancelled", icon: XCircle, color: "bg-transparent text-muted-foreground border-border border-dashed" },
};

const DATE_PRESETS: { id: DatePreset; label: string }[] = [
	{ id: "this_month", label: "This Month" },
	{ id: "last_month", label: "Last Month" },
	{ id: "last_3_months", label: "Last 3 Months" },
	{ id: "last_6_months", label: "Last 6 Months" },
	{ id: "custom", label: "Custom Range" },
];

export const InvoiceFiltersSheet = memo(function InvoiceFiltersSheet({ isOpen, onClose, currentFilters, onApplyFilters, onClearFilters, mode }: Props) {
	const [localFilters, setLocalFilters] = useState<InvoiceFilters>(currentFilters);
	const [dateError, setDateError] = useState<string | null>(null);
	const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

	// ── THE RENDER-PHASE SYNC ───────────────────────────────────────────────
	if (isOpen !== prevIsOpen) {
		setPrevIsOpen(isOpen);
		if (isOpen) {
			setLocalFilters(currentFilters);
			setDateError(null);
		}
	}

	const handleOpenChange = (open: boolean) => {
		if (open) {
			setLocalFilters(currentFilters);
			setDateError(null);
		}
		if (!open) onClose();
	};

	const showClinicSelector = mode !== "CLINIC_LEDGER";

	// ── HANDLERS ────────────────────────────────────────────────────────────
	const handleClearAll = useCallback(() => {
		setLocalFilters(DEFAULT_INVOICE_FILTERS);
		setDateError(null);
		onClearFilters();
		onClose();
	}, [onClearFilters, onClose]);

	const handleApply = () => {
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
				<SheetHeader className="p-6 sm:p-8 border-b border-border bg-emerald-500/2 flex flex-row items-center justify-between space-y-0">
					<SheetTitle className="sr-only">Invoics Filters</SheetTitle>
					<SheetDescription className="sr-only">Advanced Filters Sheet for Invoices</SheetDescription>
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-500/20">
							<Filter className="w-5 h-5" />
						</div>
						<div className="flex flex-col text-left">
							<SheetTitle className="text-xl font-bold tracking-tight text-foreground leading-none">{mode === "CLINIC_LEDGER" ? "Ledger Filters" : "Billing Database"}</SheetTitle>
							<p className="text-xs text-muted-foreground mt-1.5 font-medium italic">
								{mode === "CLINIC_LEDGER" ? "Filtering statements for this clinic." : "Refine your global financial view."}
							</p>
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
					{/* 1. UNPAID ONLY HIGHLIGHT */}
					<div className="flex items-center justify-between p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 shadow-sm">
						<div className="flex flex-col gap-0.5">
							<span className="text-[13px] font-bold text-rose-600 dark:text-rose-500">Show Unpaid Only</span>
							<span className="text-[10px] text-rose-600/70 dark:text-rose-500/70 leading-tight">Focus on Sent, Partial, and Overdue balances.</span>
						</div>
						<Switch checked={localFilters.isUnpaidOnly} onCheckedChange={(v) => setLocalFilters((prev) => ({ ...prev, isUnpaidOnly: v }))} className="data-[state=checked]:bg-rose-500" />
					</div>

					{/* 2. STATUS FILTER */}
					<div className="flex flex-col gap-2.5">
						<h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2 mb-1">
							<Receipt className="w-4 h-4 text-emerald-500/70" /> Payment Status
						</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
							{(Object.keys(INVOICE_STATUS_REGISTRY) as InvoiceStatus[]).map((statusId) => {
								const status = INVOICE_STATUS_REGISTRY[statusId];
								const isSelected = localFilters.statuses.includes(statusId);

								return (
									<button
										key={statusId}
										onClick={() =>
											setLocalFilters((prev) => ({
												...prev,
												statuses: isSelected ? prev.statuses.filter((s) => s !== statusId) : [...prev.statuses, statusId],
											}))
										}
										className={cn(
											"flex flex-col items-start gap-3 p-3.5 rounded-2xl border transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50",
											isSelected
												? "border-emerald-500 bg-emerald-500/5 ring-1 ring-emerald-500/20 shadow-sm"
												: "border-border bg-slate-50/50 dark:bg-white/2 hover:border-slate-300 dark:hover:border-white/10",
										)}
									>
										<div className="flex items-center justify-between w-full">
											<div className={cn("w-7 h-7 rounded-lg border flex items-center justify-center transition-all duration-300 shadow-sm", status.color)}>
												<status.icon className="w-3.5 h-3.5" />
											</div>
											<div
												className={cn(
													"w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300",
													isSelected ? "border-emerald-500 bg-emerald-500" : "border-slate-300 dark:border-zinc-600 bg-transparent",
												)}
											>
												{isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
											</div>
										</div>
										<span className={cn("text-xs font-bold transition-colors", isSelected ? "text-foreground" : "text-muted-foreground")}>{status.label}</span>
									</button>
								);
							})}
						</div>
					</div>

					{/* 3. DATE RANGE */}
					<div className="flex flex-col gap-2.5 pt-8 border-t border-border/50">
						<div className="flex items-center justify-between mb-1">
							<h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2">
								<CalendarRange className="w-4 h-4 text-emerald-500/70" /> Timeframe
							</h3>
						</div>

						{/* Segmented Control for Date Target */}
						<div className="flex p-1 bg-slate-100/80 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-border">
							{(["createdAt", "issuedAt", "dueDate"] as InvoiceDateFilterField[]).map((field) => {
								const isActive = localFilters.dateRange?.field === field || (!localFilters.dateRange && field === "issuedAt");
								return (
									<button
										key={field}
										onClick={() =>
											setLocalFilters((prev) => ({
												...prev,
												dateRange: {
													...prev.dateRange!,
													field,
													preset: prev.dateRange?.preset || "this_month",
													from: prev.dateRange?.from || null,
													to: prev.dateRange?.to || null,
												},
											}))
										}
										className={cn(
											"flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all",
											isActive
												? "bg-white dark:bg-[#121214] text-emerald-600 dark:text-emerald-400 shadow-sm ring-1 ring-border border-emerald-500/20"
												: "text-muted-foreground hover:text-foreground",
										)}
									>
										{field === "createdAt" ? "Created" : field === "issuedAt" ? "Issued" : "Due Date"}
									</button>
								);
							})}
						</div>

						<div className="grid grid-cols-2 gap-2 mt-3">
							{DATE_PRESETS.map((preset) => (
								<button
									key={preset.id}
									onClick={() =>
										setLocalFilters((prev) => ({
											...prev,
											dateRange: { ...prev.dateRange!, preset: preset.id, from: null, to: null, field: prev.dateRange?.field || "issuedAt" },
										}))
									}
									className={cn(
										"py-2.5 px-3 rounded-xl border text-[11px] font-bold transition-all text-center",
										localFilters.dateRange?.preset === preset.id
											? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20 shadow-inner"
											: "bg-slate-50 dark:bg-white/2 border-border text-muted-foreground hover:text-foreground hover:border-slate-300 dark:hover:border-white/10 shadow-sm",
										preset.id === "custom" && "col-span-2",
									)}
								>
									{preset.label}
								</button>
							))}
						</div>

						{/* Custom Date Inputs */}
						{localFilters.dateRange?.preset === "custom" && (
							<div className="flex gap-3 mt-4 p-4 rounded-xl border border-border bg-slate-50/50 dark:bg-white/2 animate-in fade-in slide-in-from-top-2 duration-300">
								<div className="flex-1 flex flex-col gap-1.5">
									<label htmlFor="from-date-input" className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">
										From
									</label>
									<input
										id="from-date-input"
										type="date"
										style={{ colorScheme: "dark light" }}
										value={localFilters.dateRange.from?.toISOString().split("T")[0] || ""}
										onChange={(e) =>
											setLocalFilters((prev) => ({
												...prev,
												dateRange: { ...prev.dateRange!, from: e.target.value ? new Date(e.target.value) : null },
											}))
										}
										className={cn(
											"w-full h-10 px-3 rounded-lg border bg-white dark:bg-[#121214] text-sm text-foreground focus:outline-none transition-all shadow-sm",
											dateError
												? "border-destructive focus:ring-destructive/20"
												: "border-border hover:border-slate-300 dark:hover:border-white/20 focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-500/20",
										)}
									/>
								</div>
								<div className="flex-1 flex flex-col gap-1.5">
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
												dateRange: { ...prev.dateRange!, to: e.target.value ? new Date(e.target.value) : null },
											}))
										}
										className={cn(
											"w-full h-10 px-3 rounded-lg border bg-white dark:bg-[#121214] text-sm text-foreground focus:outline-none transition-all shadow-sm",
											dateError
												? "border-destructive focus:ring-destructive/20"
												: "border-border hover:border-slate-300 dark:hover:border-white/20 focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-500/20",
										)}
									/>
								</div>
							</div>
						)}

						{dateError && (
							<div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 mt-3 animate-in fade-in">
								<p className="text-[11px] font-semibold text-destructive flex items-center gap-2">
									<span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse shrink-0" />
									{dateError}
								</p>
							</div>
						)}
					</div>

					{/* 4. EXTENSIONS (Clinic Selector for Global Mode) */}
					{showClinicSelector && (
						<div className="gap-y-2 flex flex-col pt-8 border-t border-border/50">
							<h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2 mb-1">
								<Building2 className="w-4 h-4 text-emerald-500/70" /> Filter Extensions
							</h3>
							<ClinicFilterSelector value={localFilters.clinicId} onSelect={(id) => setLocalFilters((prev) => ({ ...prev, clinicId: id }))} label={"Billed Clinic"} />
						</div>
					)}
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
						<Button onClick={handleApply} className="flex-1 rounded-xl h-11 bg-emerald-600 shadow-premium font-bold hover:bg-emerald-700 transition-all text-white">
							Apply Ledger Filters
						</Button>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
});
