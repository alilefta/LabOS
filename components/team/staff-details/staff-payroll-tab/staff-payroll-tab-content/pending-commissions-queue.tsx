"use client";

import { Wallet, Plus, Inbox, HelpCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PendingCommissionItemDTO } from "@/schema/composed/team/payroll-ledger.dtos"; // Adjust path

interface Props {
	pendingCommissions: PendingCommissionItemDTO[];
	onPayClick: () => void;
}

export function PendingCommissionsQueue({ pendingCommissions, onPayClick }: Props) {
	const formatMoney = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

	const isEmpty = pendingCommissions.length === 0;

	return (
		<div className="lab-card flex flex-col overflow-hidden min-h-80 transition-all duration-300">
			{/* --- 1. OPERATION ACTION BAR --- */}
			<div className="p-4 sm:p-5 border-b border-border bg-slate-50/50 dark:bg-white/2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 relative z-10">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 shadow-sm">
						<Wallet className="w-4 h-4" />
					</div>
					<div>
						<h3 className="text-sm font-bold text-foreground">Pending Payout Queue</h3>
						<p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5 font-medium">Awaiting Statement Run</p>
					</div>
				</div>

				<div className="flex items-center gap-3 w-full sm:w-auto justify-end">
					{/* Glowing primary button to trigger Sprint 3's Payout Modal */}
					<Button
						type="button"
						disabled={isEmpty}
						onClick={onPayClick}
						className={cn(
							"rounded-xl h-10 px-5 font-bold text-xs transition-all shadow-sm flex items-center gap-1.5 w-full sm:w-auto justify-center",
							!isEmpty
								? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/25 scale-100 cursor-pointer"
								: "bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-zinc-500 border-border cursor-not-allowed scale-95",
						)}
					>
						<Plus className="w-4 h-4" /> Review & Issue Payout
					</Button>
				</div>
			</div>

			{/* --- 2. THE CASES LIST --- */}
			<div className="flex-1 overflow-y-auto custom-scrollbar max-h-87.5 min-h-45 p-4 sm:p-5 space-y-3 relative z-10">
				{isEmpty ? (
					// EMPTY STATE: If they are fully settled
					<div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
						<div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 border border-border flex items-center justify-center mb-3">
							<Inbox className="w-5 h-5 text-slate-400 dark:text-zinc-600" />
						</div>
						<h4 className="text-xs font-bold text-foreground"> Roster Queue Settled</h4>
						<p className="text-[10px] text-muted-foreground max-w-50 mt-1 leading-relaxed">This employee currently has zero completed or delivered cases awaiting commission payouts.</p>
					</div>
				) : (
					// LIST
					pendingCommissions.map((item) => (
						<div
							key={item.assignmentId}
							className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl border border-border bg-card hover:border-emerald-500/30 hover:bg-slate-50/50 dark:hover:bg-white/1 transition-all group shadow-sm relative overflow-hidden"
						>
							<div className="flex items-start gap-3.5 min-w-0">
								<div className="w-1.5 h-10 bg-primary/20 rounded-full mt-0.5 shrink-0" />
								<div className="flex flex-col min-w-0">
									<div className="flex items-center gap-2">
										<span className="font-mono font-bold text-sm text-foreground">#{item.caseNumber}</span>
										<span className="text-[10px] font-mono text-muted-foreground/60 uppercase">{format(new Date(item.caseCreatedAt), "MMM dd")}</span>
									</div>
									<span className="text-xs font-semibold text-muted-foreground mt-1 truncate max-w-50">
										Patient: <strong className="text-foreground">{item.patientName}</strong>
									</span>
								</div>
							</div>

							<div className="flex items-center gap-6 justify-between sm:justify-end mt-3 sm:mt-0 pl-5 sm:pl-0 border-t border-border/50 sm:border-none pt-2.5 sm:pt-0">
								{/* Raw Case Total (Muted comparison) */}
								<div className="flex flex-col items-start sm:items-end">
									<span className="text-[9px] font-bold text-muted-foreground uppercase font-sans">Case Total</span>
									<span className="text-xs font-mono font-medium text-muted-foreground/60">{formatMoney(item.caseTotal)}</span>
								</div>

								<div className="w-px h-6 bg-border hidden sm:block" />

								{/* Earned Commission (Glows Green) */}
								<div className="flex flex-col items-end min-w-20">
									<span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-500 uppercase font-sans">Com. Earned</span>
									<span className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-500">+{formatMoney(item.commissionTotal)}</span>
								</div>
							</div>
						</div>
					))
				)}
			</div>

			{/* Legend / Info Footer */}
			{!isEmpty && (
				<div className="p-4 border-t border-border bg-slate-50/50 dark:bg-white/1 flex items-start gap-2.5 shrink-0">
					<HelpCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
					<p className="text-[10px] text-muted-foreground leading-normal">
						This queue only displays cases with <strong className="text-foreground">Completed</strong> or <strong className="text-foreground">Delivered</strong> statuses where commissions
						have not yet been disbursed.
					</p>
				</div>
			)}
		</div>
	);
}
