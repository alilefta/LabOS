"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import { Box, Check, Layers, AlertCircle, Sparkles, HelpCircle, BadgeCheck, Building2, ChevronLeft, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { UnbilledCaseDTO } from "@/schema/composed/invoices/new.invoice.dtos";

interface Props {
	cases: UnbilledCaseDTO[];
	selectedIds: Set<string>;
	isClinicSelected: boolean; // <-- NEW PROP
	selectedClinicName: string | null; // <-- NEW PROP
	totals: {
		subtotal: number;
		discountAmount: number;
		grandTotal: number;
		selectedCount: number;
	};
	onToggle: (id: string) => void;
	onToggleAll: (allIds: string[], checkAll: boolean) => void;
}
export function ReconciliationLedger({ cases, selectedIds, totals, onToggle, onToggleAll, isClinicSelected, selectedClinicName }: Props) {
	const allCaseIds = useMemo(() => cases.map((c) => c.id), [cases]);
	const isAllSelected = cases.length > 0 && selectedIds.size === cases.length;

	const formatMoney = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);
	// ── 1. STATE A: NO CLINIC SELECTED (Awaiting Context) ────────────────
	if (!isClinicSelected) {
		return (
			<div className="flex-1 w-full h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-500 relative">
				{/* Ambient Glow */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

				<div className="relative z-10 max-w-sm flex flex-col items-center gap-4">
					<div className="w-16 h-16 rounded-3xl bg-slate-50 dark:bg-white/5 border border-border flex items-center justify-center text-slate-400 dark:text-zinc-500 shadow-sm transition-transform duration-500 hover:scale-110">
						<Building2 className="w-8 h-8" />
					</div>
					<div className="space-y-1.5">
						<h3 className="text-lg font-bold text-foreground">Awaiting clinic selection</h3>
						<p className="text-xs text-muted-foreground leading-relaxed">
							Please select a clinic partner from the left panel to load their unbilled production queue and begin building the invoice.
						</p>
					</div>

					{/* Desktop visual arrow helper */}
					<div className="hidden xl:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary mt-2 animate-pulse">
						<ChevronLeft className="w-3.5 h-3.5" /> Select partner on left
					</div>
				</div>
			</div>
		);
	}

	// ── 2. STATE B: CLINIC SELECTED, BUT 0 PENDING CASES (Reconciled) ──────
	if (cases.length === 0) {
		return (
			<div className="flex-1 w-full h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-500 relative">
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

				<div className="relative z-10 max-w-sm flex flex-col items-center gap-4">
					<div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
						<CheckCircle2 className="w-8 h-8" />
					</div>
					<div className="space-y-1.5">
						<h3 className="text-lg font-bold text-foreground">All accounts settled</h3>
						<p className="text-xs text-muted-foreground leading-relaxed">
							<strong className="text-foreground">{selectedClinicName}</strong> currently has no completed or delivered cases awaiting billing.
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col h-full relative">
			{/* --- LEDGER HEADER / SELECTION BAR --- */}
			<div className="flex items-center justify-between mb-4 px-2 shrink-0">
				<div>
					<h3 className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Select unbilled cases</h3>
					<p className="text-xs text-muted-foreground mt-0.5 font-medium">Check the items you want to include on this statement.</p>
				</div>

				{/* SELECT ALL INTERACTIVE TOGGLE */}
				{cases.length > 0 && (
					<button
						type="button"
						onClick={() => onToggleAll(allCaseIds, !isAllSelected)}
						className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-slate-50 dark:hover:bg-white/5 transition-all group shadow-sm text-xs font-semibold text-foreground"
					>
						<div
							className={cn(
								"w-4 h-4 rounded-md border flex items-center justify-center transition-all",
								isAllSelected ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-300 dark:border-zinc-700 bg-white dark:bg-[#121214]",
							)}
						>
							{isAllSelected && <Check className="w-3 h-3 stroke-[3]" />}
						</div>
						<span>Select all cases</span>
					</button>
				)}
			</div>

			{/* --- THE SCROLLABLE CASES LIST --- */}
			<div className="flex-1 space-y-3 pb-24">
				{cases.map((c) => {
					const isChecked = selectedIds.has(c.id);
					const firstItem = c.workItems[0];
					const extraCount = c.workItems.length - 1;

					return (
						<div
							key={c.id}
							onClick={() => onToggle(c.id)}
							className={cn(
								"p-4 bg-card border rounded-2xl flex items-center justify-between group hover:border-emerald-500/40 transition-colors cursor-pointer shadow-sm relative overflow-hidden",
								isChecked ? "border-emerald-500/50 bg-emerald-500/[0.01]" : "border-border",
							)}
						>
							{/* Highlight overlay on hover */}
							<div className="absolute inset-0 bg-gradient-to-r from-emerald-500/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

							<div className="flex items-center gap-4 relative z-10">
								{/* Custom Checkbox */}
								<div
									className={cn(
										"w-5 h-5 rounded-lg border flex items-center justify-center transition-all shrink-0 shadow-sm",
										isChecked
											? "bg-emerald-600 border-emerald-600 text-white shadow-emerald-500/20 scale-105"
											: "border-slate-200 dark:border-white/10 bg-white dark:bg-[#121214] group-hover:border-emerald-500/50",
									)}
								>
									{isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
								</div>

								{/* Case Context */}
								<div>
									<div className="flex items-center gap-2">
										<span className="font-mono font-bold text-sm text-foreground">#{c.caseNumber}</span>
										<span className="text-[10px] text-muted-foreground font-medium">{format(new Date(c.createdAt), "MMM dd, yyyy")}</span>
									</div>
									<p className="text-sm font-semibold text-foreground mt-0.5">{c.patientName}</p>
								</div>
							</div>

							{/* Clinical Prescription Badge / Pill UI */}
							<div className="flex items-center gap-6 relative z-10">
								{firstItem && (
									<div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-50 dark:bg-white/5 border border-border">
										<span
											className={cn(
												"text-[9px] font-black px-1 rounded uppercase tracking-tighter",
												firstItem.jawType === "UPPER" ? "text-blue-500 bg-blue-500/5" : "text-rose-500 bg-rose-500/5",
											)}
										>
											{firstItem.jawType}
										</span>
										<span className="text-xs font-semibold text-foreground truncate max-w-[120px]">{firstItem.productName}</span>
										<span className="text-[10px] font-mono font-bold text-muted-foreground">({firstItem.teethCount}U)</span>
									</div>
								)}

								{extraCount > 0 && (
									<Tooltip>
										<TooltipTrigger asChild>
											<div
												onClick={(e) => e.stopPropagation()}
												className="h-6 px-2 rounded-md border border-dashed border-border flex items-center justify-center text-[10px] font-bold text-muted-foreground hover:border-emerald-500 hover:text-emerald-600 cursor-help transition-colors"
											>
												+{extraCount} more
											</div>
										</TooltipTrigger>
										<TooltipContent className="glass-ai-panel p-3 border-border shadow-2xl z-50">
											<div className="space-y-2">
												<p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-1">Additional Items</p>
												{c.workItems.slice(1).map((item, i) => (
													<div key={i} className="flex items-center gap-3 text-xs font-medium">
														<span className="font-mono text-primary w-10">{item.jawType}</span>
														<span className="text-foreground truncate max-w-[120px]">{item.productName}</span>
														<span className="text-muted-foreground">({item.teethCount}U)</span>
													</div>
												))}
											</div>
										</TooltipContent>
									</Tooltip>
								)}

								{/* Case Total Price */}
								<div className="text-right min-w-[80px]">
									<span className="text-sm font-mono font-bold text-foreground">{formatMoney(c.grandTotal)}</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{/* --- THE STICKY LIVE RECEIPT FOOTER --- */}
			{/* 
				Anchored exactly to the bottom of the right scroll container. 
				Has a deep glassmorphic backdrop filter.
			*/}
			{/* --- THE STICKY LIVE RECEIPT FOOTER --- */}
			<div className="absolute bottom-0 -mx-4 sm:-mx-6 lg:-mx-8 left-0 right-0 z-20 bg-background/80 backdrop-blur-xl border-t border-border p-5 sm:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
				<div className="max-w-[2000px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500">
							<Check className="w-5 h-5" />
						</div>
						<div className="flex flex-col">
							<span className="text-xs font-bold text-foreground">
								{totals.selectedCount} of {cases.length} cases selected
							</span>
							<span className="text-[10px] text-muted-foreground font-medium">Unchecked cases stay in the unbilled queue</span>
						</div>
					</div>

					<div className="flex items-center gap-6 md:gap-8 justify-between md:justify-end">
						<div className="flex flex-col items-end">
							<span className="text-[9px] font-bold text-muted-foreground uppercase">Subtotal</span>
							<span className="text-sm font-mono font-semibold text-foreground">{formatMoney(totals.subtotal)}</span>
						</div>

						{totals.discountAmount > 0 && (
							<div className="flex flex-col items-end animate-in fade-in slide-in-from-right-2 duration-300">
								<span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-500 uppercase">Discount Applied</span>
								<span className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400">-{formatMoney(totals.discountAmount)}</span>
							</div>
						)}

						<div className="w-px h-8 bg-border" />

						<div className="flex flex-col items-end mr-4">
							<span className="text-[10px] font-black text-foreground uppercase tracking-wider">Total Due</span>
							<span className="text-2xl font-mono font-black text-emerald-600 dark:text-emerald-400">{formatMoney(totals.grandTotal)}</span>
						</div>

						<Button
							type="submit"
							form="new-case-submission-form"
							disabled={totals.selectedCount === 0}
							className={cn(
								"rounded-xl h-11 px-6 font-bold shadow-sm transition-all text-sm shrink-0",
								totals.selectedCount > 0
									? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/20 scale-100"
									: "bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-zinc-500 cursor-not-allowed scale-95",
							)}
						>
							Generate Statement
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
