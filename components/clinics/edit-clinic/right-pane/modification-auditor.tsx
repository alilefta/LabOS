"use client";

import { Control, useWatch } from "react-hook-form";
import { BrainCircuit, AlertTriangle, ShieldAlert, CheckCircle2, TrendingDown } from "lucide-react";
import { UpdateClinicInput } from "@/schema/composed/clinic.details";
import { cn } from "@/lib/utils";

interface Props {
	control: Control<UpdateClinicInput>;
	initialData: UpdateClinicInput;
	currentBalance: number;
}

export function ModificationAuditor({ control, initialData, currentBalance }: Props) {
	// Watch form state to generate real-time diffs
	const newLimit = useWatch({ control, name: "creditLimit" }) ?? 0;
	const newStatus = useWatch({ control, name: "status" });
	const newDiscount = useWatch({ control, name: "discount" }) ?? 0;

	// Logic Checks
	const isLimitReduced = newLimit < (initialData.creditLimit ?? 0);
	const isLimitBelowBalance = newLimit > 0 && newLimit < currentBalance;
	const isSuspending = initialData.status !== "SUSPENDED" && newStatus === "SUSPENDED";
	const isDiscountIncreased = newDiscount > (initialData.discount ?? 0);

	const formatMoney = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

	return (
		<div className="lab-card flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-4 duration-700 delay-150 border-primary/20 bg-primary/[0.02]">
			<div className="p-5 border-b border-border bg-linear-to-r from-primary/10 to-transparent flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-ai-glow-light">
						<BrainCircuit className="w-5 h-5" />
					</div>
					<div>
						<h2 className="text-sm font-bold tracking-tight text-foreground">Modification Impact</h2>
						<p className="text-[10px] font-bold text-primary uppercase tracking-widest">Live Security Audit</p>
					</div>
				</div>
			</div>

			<div className="p-6 space-y-4">
				{/* 1. Base Security State */}
				{!isLimitBelowBalance && !isSuspending && !isDiscountIncreased && !isLimitReduced && (
					<div className="flex gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-border">
						<CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
						<p className="text-[11px] font-medium text-muted-foreground leading-relaxed">Monitoring your changes. Currently, no structural business risks detected.</p>
					</div>
				)}

				{/* 2. Critical: Limit Below Balance */}
				{isLimitBelowBalance && (
					<div className="flex gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 animate-in slide-in-from-top-2">
						<ShieldAlert className="w-4 h-4 text-destructive shrink-0 mt-0.5 animate-pulse" />
						<div className="flex flex-col gap-1">
							<strong className="text-[10px] font-bold uppercase tracking-widest text-destructive">Credit Violation</strong>
							<p className="text-[11px] text-destructive/90 leading-relaxed font-medium">
								You are setting a limit of <span className="font-mono font-bold">{formatMoney(newLimit)}</span>, but the clinic currently owes{" "}
								<span className="font-mono font-bold">{formatMoney(currentBalance)}</span>. This will instantly freeze their production pipeline.
							</p>
						</div>
					</div>
				)}

				{/* 3. High Warning: Suspension */}
				{isSuspending && (
					<div className="flex gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 animate-in slide-in-from-top-2">
						<AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
						<div className="flex flex-col gap-1">
							<strong className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-500">Service Interruption</strong>
							<p className="text-[11px] text-amber-700 dark:text-amber-400 leading-relaxed font-medium">
								Suspending this account will notify the clinical staff. Any active cases currently in production should be evaluated manually by the lab manager.
							</p>
						</div>
					</div>
				)}

				{/* 4. Insight: Discount Increased */}
				{isDiscountIncreased && (
					<div className="flex gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20 animate-in slide-in-from-top-2">
						<TrendingDown className="w-4 h-4 text-primary shrink-0 mt-0.5" />
						<div className="flex flex-col gap-1">
							<strong className="text-[10px] font-bold uppercase tracking-widest text-primary">Margin Reduction</strong>
							<p className="text-[11px] text-primary/80 leading-relaxed font-medium">
								Discount increased from {initialData.discount ?? 0}% to {newDiscount}%. This change will not retroactively apply to existing unpaid invoices.
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
