"use client";

import { useState } from "react";
import { Filter, X, Building2, Check, DollarSign, Activity, Settings2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import { ClinicStatus, ClinicType } from "@/schema/base/enums.base";
import { ClinicsFilters } from "@/schema/composed/clinic.details";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	currentFilters: ClinicsFilters;
	onApplyFilters: (filters: ClinicsFilters) => void;
	onClearFilters: () => void;
}

// Ensure these match your Prisma enums exactly
const STATUS_OPTIONS = [
	{ id: "ACTIVE", label: "Active Partners", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-500/20" },
	{ id: "INACTIVE", label: "Inactive", color: "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 border-border" },
	{ id: "SUSPENDED", label: "Suspended", color: "bg-destructive/10 text-destructive border-destructive/20" },
];

const TYPE_OPTIONS = [
	{ id: "SOLO", label: "Solo Practitioner" },
	{ id: "CLINIC", label: "Multi-Dentist Clinic" },
	{ id: "HOSPITAL", label: "Hospital Dept." },
	{ id: "UNIVERSITY", label: "University / Teaching" },
];

export function ClinicFiltersSheet({ isOpen, onClose, currentFilters, onApplyFilters, onClearFilters }: Props) {
	// Local state so the user can fiddle before hitting "Apply"
	const [localFilters, setLocalFilters] = useState<ClinicsFilters>(currentFilters);

	const handleOpenChange = (open: boolean) => {
		if (open) setLocalFilters(currentFilters);
		if (!open) onClose();
	};

	const toggleStatus = (statusId: string) => {
		setLocalFilters((prev) => ({
			...prev,
			// Type casting to ensure it matches the strict Zod schema
			statuses: prev.statuses.includes(statusId as ClinicStatus) ? prev.statuses.filter((s) => s !== statusId) : [...prev.statuses, statusId as ClinicStatus],
		}));
	};

	const toggleType = (typeId: string) => {
		setLocalFilters((prev) => ({
			...prev,
			types: prev.types.includes(typeId as ClinicType) ? prev.types.filter((t) => t !== typeId) : [...prev.types, typeId as ClinicType],
		}));
	};

	const handleApply = () => {
		onApplyFilters(localFilters);
		onClose();
	};

	return (
		<Sheet open={isOpen} onOpenChange={handleOpenChange}>
			<SheetContent showCloseButton={false} className="sm:max-w-md! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* --- HEADER --- */}
				<SheetHeader className="p-6 sm:p-8 border-b border-border bg-slate-50/50 dark:bg-white/2 flex flex-row items-center justify-between space-y-0 shrink-0">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-ai-glow-light">
							<Filter className="w-5 h-5" />
						</div>
						<div className="flex flex-col text-left">
							<SheetTitle className="text-xl font-bold tracking-tight text-foreground leading-none">Database Filters</SheetTitle>
							<p className="text-xs text-muted-foreground mt-1.5 font-medium">Refine your partner network view.</p>
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
							<Activity className="w-4 h-4 text-primary/70" /> Account Status
						</h3>
						<div className="flex flex-col gap-2">
							{STATUS_OPTIONS.map((status) => {
								const isSelected = localFilters.statuses.includes(status.id as ClinicStatus);
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

					{/* 2. CLINIC TYPE FILTER */}
					<div className="flex flex-col gap-4 pt-8 border-t border-border/50">
						<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-1">
							<Building2 className="w-4 h-4 text-primary/70" /> Facility Type
						</h3>
						<div className="grid grid-cols-2 gap-3">
							{TYPE_OPTIONS.map((type) => {
								const isSelected = localFilters.types.includes(type.id as ClinicType);
								return (
									<button
										key={type.id}
										onClick={() => toggleType(type.id)}
										className={cn(
											"py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center",
											isSelected
												? "bg-primary/10 border-primary/30 text-primary ring-1 ring-primary/20 shadow-inner"
												: "bg-slate-50 dark:bg-white/2 border-border text-muted-foreground hover:text-foreground hover:border-slate-300 dark:hover:border-white/10 shadow-sm",
										)}
									>
										{type.label}
									</button>
								);
							})}
						</div>
					</div>

					{/* 3. FINANCIAL EXPOSURE TOGGLE */}
					<div className="flex flex-col gap-4 pt-8 border-t border-border/50">
						<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-1">
							<Settings2 className="w-4 h-4 text-destructive/70" /> Risk Management
						</h3>

						<div
							className={cn(
								"flex items-center justify-between p-4 rounded-xl border transition-all duration-300 shadow-sm",
								localFilters.hasOutstandingBalance
									? "border-destructive/30 bg-destructive/10 ring-1 ring-destructive/20"
									: "border-border bg-slate-50 dark:bg-white/2 hover:border-slate-300 dark:hover:border-white/10",
							)}
						>
							<div className="flex flex-col gap-1 pr-4">
								<span className={cn("text-[13px] font-bold transition-colors flex items-center gap-1.5", localFilters.hasOutstandingBalance ? "text-destructive" : "text-foreground")}>
									<DollarSign className="w-4 h-4" /> Has Outstanding Debt
								</span>
								<span className={cn("text-[10px] font-medium leading-snug", localFilters.hasOutstandingBalance ? "text-destructive/80" : "text-muted-foreground")}>
									Show only clinics with a current balance greater than $0.00.
								</span>
							</div>
							<Switch
								checked={localFilters.hasOutstandingBalance}
								onCheckedChange={(checked) => setLocalFilters((prev) => ({ ...prev, hasOutstandingBalance: checked }))}
								className="data-[state=checked]:bg-destructive shadow-sm shrink-0"
							/>
						</div>
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
							className="rounded-xl h-11 px-6 font-bold text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:bg-white/5"
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
