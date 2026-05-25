"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import { Check, Building2, ChevronLeft, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { UnbilledCaseDTO } from "@/schema/composed/invoices/new.invoice.dtos";

interface Props {
	cases: UnbilledCaseDTO[];
	selectedIds: Set<string>;
	isClinicSelected: boolean;
	selectedClinicName: string | null;
	totals: {
		subtotal: number;
		discountAmount: number;
		grandTotal: number;
		selectedCount: number;
	};
	onToggle: (id: string) => void;
	onToggleAll: (allIds: string[], checkAll: boolean) => void;
	onGenerate: () => void;
	isLoading: boolean;
}

export function ReconciliationLedger({ cases, selectedIds, totals, onToggle, onToggleAll, isClinicSelected, selectedClinicName, onGenerate, isLoading }: Props) {
	const allCaseIds = useMemo(() => cases.map((c) => c.id), [cases]);
	const isAllSelected = cases.length > 0 && selectedIds.size === cases.length;

	const formatMoney = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

	// ── 1. STATE A: NO CLINIC SELECTED ────────────────
	if (!isClinicSelected) {
		return (
			<div className="flex-1 w-full h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-500 relative overflow-hidden rounded-[24px] bg-slate-50 dark:bg-[#121214] border border-border shadow-sm">
				{/* High-Performance Radial Glow */}
				<div
					className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
					style={{ background: `radial-gradient(circle at center, rgba(var(--glow-primary-rgb), 0.15) 0%, transparent 60%)` }}
				/>

				<div className="relative z-10 max-w-sm flex flex-col items-center gap-4">
					<div className="w-16 h-16 rounded-3xl bg-white dark:bg-[#09090B] border border-border flex items-center justify-center text-slate-400 dark:text-zinc-500 shadow-sm transition-transform duration-500 hover:scale-110">
						<Building2 className="w-8 h-8" />
					</div>
					<div className="space-y-1.5">
						<h3 className="text-lg font-bold text-foreground tracking-tight">Awaiting clinic selection</h3>
						<p className="text-xs text-muted-foreground leading-relaxed">
							Please select a clinic partner from the left panel to load their unbilled production queue and begin building the invoice.
						</p>
					</div>
					<div className="hidden xl:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary mt-2 animate-pulse">
						<ChevronLeft className="w-3.5 h-3.5" /> Select partner on left
					</div>
				</div>
			</div>
		);
	}

	// ── 2. STATE B: CLINIC SELECTED, BUT 0 PENDING CASES ──────
	if (cases.length === 0) {
		return (
			<div className="flex-1 w-full h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-500 relative overflow-hidden rounded-[24px] bg-slate-50 dark:bg-[#121214] border border-border shadow-sm">
				{/* High-Performance Emerald Radial Glow */}
				<div
					className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
					style={{ background: `radial-gradient(circle at center, rgba(var(--glow-emerald-rgb), 0.15) 0%, transparent 60%)` }}
				/>

				<div className="relative z-10 max-w-sm flex flex-col items-center gap-4">
					<div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
						<CheckCircle2 className="w-8 h-8" />
					</div>
					<div className="space-y-1.5">
						<h3 className="text-lg font-bold text-foreground tracking-tight">All accounts settled</h3>
						<p className="text-xs text-muted-foreground leading-relaxed">
							<strong className="text-foreground">{selectedClinicName}</strong> currently has no completed or delivered cases awaiting billing.
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col h-full relative z-10 animate-in fade-in slide-in-from-right-4 duration-700">
			{/* --- LEDGER HEADER --- */}
			<div className="flex items-center justify-between mb-4 px-2 shrink-0">
				<div>
					<h3 className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Select unbilled cases</h3>
					<p className="text-xs text-muted-foreground mt-0.5 font-medium">Check the items you want to include on this statement.</p>
				</div>

				<button
					type="button"
					onClick={() => onToggleAll(allCaseIds, !isAllSelected)}
					className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-slate-50 dark:hover:bg-white/5 transition-all group shadow-sm text-xs font-semibold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
				>
					<div
						className={cn(
							"w-4 h-4 rounded-md border flex items-center justify-center transition-all",
							isAllSelected ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-300 dark:border-zinc-700 bg-white dark:bg-[#121214]",
						)}
					>
						{isAllSelected && <Check className="w-3 h-3 stroke-[3]" />}
					</div>
					<span>{isAllSelected ? "Deselect All" : "Select All"}</span>
				</button>
			</div>

			{/* --- THE SCROLLABLE CASES LIST --- */}
			<div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2 min-h-0 relative z-10 pb-4">
				{cases.map((c) => {
					const isChecked = selectedIds.has(c.id);
					const firstItem = c.workItems[0];
					const extraCount = c.workItems.length - 1;

					return (
						<button
							key={c.id}
							type="button"
							onClick={() => onToggle(c.id)}
							className={cn(
								"w-full text-left p-4 bg-card border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group transition-all duration-200 cursor-pointer shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
								isChecked ? "border-emerald-500/50 bg-emerald-500/[0.02] shadow-[0_4px_15px_rgba(16,185,129,0.05)]" : "border-border hover:border-emerald-500/40",
							)}
						>
							<div className="flex items-start gap-4">
								<div
									className={cn(
										"w-5 h-5 mt-0.5 rounded flex items-center justify-center transition-all shrink-0 shadow-sm",
										isChecked
											? "bg-emerald-600 border-emerald-600 text-white scale-105"
											: "border border-slate-300 dark:border-white/10 bg-white dark:bg-[#121214] group-hover:border-emerald-500/50",
									)}
								>
									{isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
								</div>

								<div>
									<div className="flex items-center gap-2 mb-1">
										<span className="font-mono font-bold text-sm text-foreground">#{c.caseNumber}</span>
										<span className="text-[10px] text-muted-foreground font-medium">{format(new Date(c.createdAt), "MMM dd, yyyy")}</span>
									</div>
									<p className="text-sm font-semibold text-foreground">{c.patientName}</p>
								</div>
							</div>

							<div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pl-9 sm:pl-0 border-t border-border/50 pt-3 sm:border-0 sm:pt-0 mt-2 sm:mt-0">
								<div className="flex items-center gap-2">
									{firstItem && (
										<div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-border transition-colors group-hover:border-border/80">
											<span
												className={cn(
													"text-[9px] font-black px-1 rounded uppercase tracking-tighter",
													firstItem.jawType === "UPPER"
														? "text-blue-500 bg-blue-500/10"
														: firstItem.jawType === "LOWER"
															? "text-rose-500 bg-rose-500/10"
															: "text-slate-500 bg-slate-500/10",
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
													className="h-6 px-2 rounded-md border border-dashed border-border flex items-center justify-center text-[10px] font-bold text-muted-foreground hover:border-emerald-500 hover:text-emerald-600 cursor-help transition-colors bg-white dark:bg-[#121214]"
												>
													+{extraCount} more
												</div>
											</TooltipTrigger>
											<TooltipContent className="bg-card p-3 border-border shadow-2xl z-50 rounded-xl">
												<div className="space-y-2">
													<p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-1">Additional Items</p>
													{c.workItems.slice(1).map((item, i) => (
														<div key={i} className="flex items-center gap-3 text-xs font-medium">
															<span className="font-mono text-emerald-500 w-10 text-[10px]">{item.jawType}</span>
															<span className="text-foreground truncate max-w-[120px]">{item.productName}</span>
															<span className="text-muted-foreground font-mono">({item.teethCount}U)</span>
														</div>
													))}
												</div>
											</TooltipContent>
										</Tooltip>
									)}
								</div>

								<div className="text-right min-w-[80px] shrink-0">
									<span className={cn("text-lg font-mono font-bold transition-colors", isChecked ? "text-emerald-600 dark:text-emerald-500" : "text-foreground")}>
										{formatMoney(c.grandTotal || 0)}
									</span>
								</div>
							</div>
						</button>
					);
				})}
			</div>

			{/* --- THE STICKY LIVE RECEIPT FOOTER --- */}
			{cases.length > 0 && (
				<div className="shrink-0 pt-4 mt-2 z-20 relative">
					{/* Solid Card Boundary to prevent blending into the parent background */}
					<div className="bg-white dark:bg-[#09090B] border border-border shadow-[0_-10px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.4)] rounded-[24px] p-6 lg:p-8 flex flex-col md:flex-row md:items-end justify-between gap-6 transition-all duration-500 relative overflow-hidden">
						{/* Performance-Friendly Embedded Glow */}
						{totals.selectedCount > 0 && (
							<div
								className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 transition-opacity duration-500"
								style={{ background: `radial-gradient(ellipse at bottom right, rgba(var(--glow-emerald-rgb), 0.15) 0%, transparent 60%)` }}
							/>
						)}

						{/* Context */}
						<div className="flex items-center gap-3 relative z-10">
							<div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 shrink-0">
								<Check className="w-5 h-5" />
							</div>
							<div className="flex flex-col">
								<span className="text-sm font-bold text-foreground">
									{totals.selectedCount} of {cases.length} selected
								</span>
								<span className="text-[10px] sm:text-xs text-muted-foreground font-medium">Unchecked cases stay in the unbilled queue</span>
							</div>
						</div>

						{/* Math & Action */}
						<div className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-8 justify-between md:justify-end w-full md:w-auto relative z-10">
							<div className="flex items-center gap-6 justify-between sm:justify-start w-full sm:w-auto">
								<div className="flex flex-col items-start sm:items-end">
									<span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Subtotal</span>
									<span className="text-sm font-mono font-semibold text-foreground">{formatMoney(totals.subtotal)}</span>
								</div>

								{totals.discountAmount > 0 && (
									<div className="flex flex-col items-center sm:items-end animate-in fade-in slide-in-from-right-2 duration-300">
										<span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest mb-1">Discount Applied</span>
										<span className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400">-{formatMoney(totals.discountAmount)}</span>
									</div>
								)}

								<div className="hidden sm:block w-px h-8 bg-border" />

								<div className="flex flex-col items-end">
									<span className="text-[10px] font-black text-foreground uppercase tracking-widest mb-0.5">Statement Total</span>
									<span className="text-2xl sm:text-3xl font-mono font-black text-emerald-600 dark:text-emerald-400 leading-none">{formatMoney(totals.grandTotal)}</span>
								</div>
							</div>

							<Button
								type="button"
								onClick={onGenerate}
								disabled={totals.selectedCount === 0 || isLoading}
								className={cn(
									"rounded-xl h-12 sm:h-14 px-8 font-bold shadow-sm transition-all text-sm shrink-0 w-full sm:w-auto outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
									totals.selectedCount > 0
										? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-[0_0_20px_rgba(16,185,129,0.2)] scale-100"
										: "bg-slate-100 dark:bg-[#121214] text-slate-400 dark:text-zinc-500 cursor-not-allowed scale-95 border border-border",
								)}
							>
								Generate Invoice
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
