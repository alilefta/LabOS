"use client";

import { Wallet, LockKeyhole, Info, Receipt, Percent, Calculator, Loader2 } from "lucide-react";
import { CaseDetailsUI } from "@/schema/composed/case.details";
import { usePermissions } from "@/providers/permissions-provider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { memo } from "react";
import { useAction } from "next-safe-action/hooks";
import { recalculateCaseFinancialsAction } from "@/actions/cases/recaclulate-finanicals";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props {
	dentalCase: CaseDetailsUI;
}

export const CaseFinancialCard = memo(function CaseFinancialCard({ dentalCase }: Props) {
	const { canViewFinancials, canViewDetailedFinancials } = usePermissions();

	const queryClient = useQueryClient();

	// --- NEW: Action Hook ---
	const { execute, isExecuting } = useAction(recalculateCaseFinancialsAction, {
		onSuccess: () => {
			toast.success("Financials updated based on current data.");
			// Invalidate the case query so the UI reflects the new grandTotal
			queryClient.invalidateQueries({ queryKey: ["case", dentalCase.id] });
		},
		onError: () => toast.error("Failed to recalculate financials."),
	});

	const formatCurrency = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

	// --- 1. DATA PREP ---
	const subtotal = Number(dentalCase.grandTotal || 0);
	const discountPercent = Number(dentalCase.clinic?.discount || 0);
	const discountAmount = (subtotal * discountPercent) / 100;
	const finalTotal = subtotal - discountAmount;

	// --- 2. RESTRICTED STATE (Technicians / Couriers) ---
	if (!canViewFinancials) {
		return (
			<div className="lab-card overflow-hidden border-dashed border-slate-200 dark:border-white/5">
				<div className="p-8 flex flex-col items-center justify-center text-center opacity-40">
					<div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4">
						<LockKeyhole className="w-6 h-6 text-muted-foreground" />
					</div>
					<h3 className="text-sm font-bold text-foreground">Financials Restricted</h3>
					<p className="text-[10px] text-muted-foreground mt-1 max-w-45">Pricing and billing details are only visible to Office and Management roles.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="lab-card overflow-hidden relative animate-in fade-in slide-in-from-bottom-2 duration-500">
			{/* Decorative Background Accent */}
			<div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

			{/* HEADER */}
			<div className="px-6 py-4 border-b border-border bg-emerald-500/5 flex items-center justify-between">
				<h3 className="text-[11px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest flex items-center gap-2">
					<Wallet className="w-3.5 h-3.5" /> Financial Summary
				</h3>
				{canViewDetailedFinancials && (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Info className="w-3.5 h-3.5 text-emerald-500 opacity-50" />
							</TooltipTrigger>
							<TooltipContent className="glass-ai-panel p-2 text-[10px] max-w-48">
								This summary reflects the clinic-specific discount rates and work item totals calculated at intake.
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
			</div>

			<div className="p-6 space-y-5">
				{/* --- DETAILED BREAKDOWN (Owners / Managers / Accountants) --- */}
				{canViewDetailedFinancials ? (
					<div className="space-y-3">
						<div className="flex justify-between items-center text-sm group">
							<div className="flex items-center gap-2 text-muted-foreground">
								<Receipt className="w-3.5 h-3.5 opacity-50 group-hover:text-primary transition-colors" />
								<span>Production Subtotal</span>
							</div>
							<span className="font-mono font-bold text-foreground">{formatCurrency(subtotal)}</span>
						</div>

						<div className="flex justify-between items-center text-sm group">
							<div className="flex items-center gap-2 text-muted-foreground">
								<Percent className="w-3.5 h-3.5 opacity-50 group-hover:text-destructive transition-colors" />
								<span>Clinic Discount ({discountPercent}%)</span>
							</div>
							<span className="font-mono font-bold text-destructive">-{formatCurrency(discountAmount)}</span>
						</div>

						<div className="h-px w-full bg-border border-dashed my-2" />
					</div>
				) : (
					/* --- SIMPLE VIEW (Receptionists / Sales Reps) --- */
					<div className="pb-2">
						<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Payable</p>
					</div>
				)}

				{/* --- THE GRAND TOTAL (Visible to all authorized) --- */}
				<div className="flex flex-col gap-1">
					<div className="flex justify-between items-end">
						<span className="text-xs font-bold text-foreground uppercase tracking-widest">Grand Total</span>
						<div className="flex flex-col items-end">
							{/* If they see the breakdown, show the math. Otherwise show just the result */}
							{!canViewDetailedFinancials && <span className="text-[9px] font-bold text-muted-foreground line-through opacity-50 mb-0.5">{formatCurrency(subtotal)}</span>}
							<span className="text-3xl font-mono font-bold text-emerald-600 dark:text-emerald-400 tracking-tighter">{formatCurrency(finalTotal)}</span>
						</div>
					</div>

					{/* Status Helper */}
					<div className="mt-4 flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/2 border border-border">
						<div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
						<span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
							Invoice Status: <span className="text-foreground">Awaiting Delivery</span>
						</span>
					</div>
				</div>

				{/* --- ACTION FOOTER (Role Aware & Dynamic) --- */}
				{canViewDetailedFinancials && (
					<div className="pt-2">
						<button
							disabled={isExecuting}
							onClick={() => execute({ caseId: dentalCase.id })}
							className={cn(
								"w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border transition-all font-bold text-xs shadow-sm",
								isExecuting
									? "bg-slate-50 dark:bg-white/5 text-muted-foreground border-border cursor-not-allowed"
									: "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 active:scale-[0.98]",
							)}
						>
							{isExecuting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Calculator className="w-3.5 h-3.5" />}
							{isExecuting ? "Processing Math..." : "Recalculate Totals"}
						</button>

						{isExecuting && <p className="text-[9px] text-center text-muted-foreground mt-2 animate-pulse uppercase tracking-widest">Syncing with latest clinic settings</p>}
					</div>
				)}
			</div>
		</div>
	);
});
