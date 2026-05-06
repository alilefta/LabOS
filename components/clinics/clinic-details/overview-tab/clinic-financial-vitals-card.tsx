"use client";

import { DollarSign, TrendingDown, AlertCircle, Receipt } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { memo } from "react";

interface ClinicFinancialVitalsProps {
	balance: number;
	limit: number | null;
	discount: number | null;
}

export const ClinicFinancialVitalsCard = memo(function ClinicFinancialVitalsCard({ balance, limit, discount }: ClinicFinancialVitalsProps) {
	const formatMoney = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

	const percentageUsed = limit ? Math.min((balance / limit) * 100, 100) : 0;
	const isWarning = percentageUsed > 75 && percentageUsed < 100;
	const isCritical = percentageUsed >= 100;

	return (
		<div className="lab-card p-6 flex flex-col border-border relative overflow-hidden group min-h-80">
			{/* Ambient Financial Glow (Behind the content) */}
			<div
				className={cn(
					"absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] pointer-events-none transition-colors duration-1000",
					isCritical ? "bg-destructive/20" : isWarning ? "bg-amber-500/10" : "bg-emerald-500/5",
				)}
			/>

			{/* HEADER */}
			<div className="flex items-center justify-between mb-8 relative z-10">
				<div className="flex items-center gap-3">
					<div
						className={cn(
							"w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm",
							isCritical ? "bg-destructive/10 text-destructive" : isWarning ? "bg-amber-500/10 text-amber-500" : "bg-emerald-500/10 text-emerald-500",
						)}
					>
						<DollarSign className="w-5 h-5" />
					</div>
					<div>
						<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Account Ledger</h3>
						<p className="text-xs font-medium text-foreground mt-0.5">30-Day Cycle</p>
					</div>
				</div>

				{discount && discount > 0 && (
					<span className="px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
						<TrendingDown className="w-3.5 h-3.5" /> {Number(discount)}% Global Discount
					</span>
				)}
			</div>

			{/* OUTSTANDING BALANCE */}
			<div className="space-y-1 mb-auto relative z-10">
				<p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Current Outstanding</p>
				<div className="flex items-baseline gap-2">
					<p className={cn("text-4xl sm:text-5xl font-mono font-bold tracking-tighter transition-colors", isCritical ? "text-destructive" : "text-foreground")}>{formatMoney(balance)}</p>
					{limit && <p className="text-sm font-mono text-muted-foreground font-medium">/ {formatMoney(limit)} limit</p>}
				</div>
			</div>

			{/* CREDIT UTILIZATION BAR */}
			{limit ? (
				<div className="space-y-3 mt-8 relative z-10">
					<div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
						<span className={cn("transition-colors", isCritical ? "text-destructive" : isWarning ? "text-amber-500" : "text-muted-foreground")}>Credit Utilization</span>
						<span className="font-mono">{percentageUsed.toFixed(1)}%</span>
					</div>

					<Progress
						value={percentageUsed}
						className={cn("h-2.5 bg-slate-100 dark:bg-white/5 shadow-inner", isCritical ? "[&>div]:bg-destructive" : isWarning ? "[&>div]:bg-amber-500" : "[&>div]:bg-emerald-500")}
					/>

					{(isWarning || isCritical) && (
						<div
							className={cn(
								"mt-4 p-3 rounded-xl border flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2",
								isCritical ? "bg-destructive/10 border-destructive/20 text-destructive" : "bg-amber-500/5 border-amber-500/20 text-amber-600 dark:text-amber-500",
							)}
						>
							<AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
							<p className="text-[11px] font-medium leading-relaxed">
								{isCritical
									? "Credit limit exceeded. Require payment before advancing new cases to production."
									: "Approaching credit limit. Consider sending an automated statement reminder."}
							</p>
						</div>
					)}
				</div>
			) : (
				<div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
					<p className="text-xs text-muted-foreground italic">No credit limit assigned.</p>
					<Button variant="outline" size="sm" className="h-8 text-xs font-semibold rounded-lg">
						<Receipt className="w-3.5 h-3.5 mr-1.5" /> Request Payment
					</Button>
				</div>
			)}
		</div>
	);
});
