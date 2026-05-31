"use client";

import { Percent, Wallet, TrendingUp, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { StaffPayrollVitalsDTO } from "@/schema/composed/team/payroll-ledger.dtos";

interface Props {
	vitals: StaffPayrollVitalsDTO;
}

export function StaffCompensationVitals({ vitals }: Props) {
	const formatMoney = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

	const isPercentage = vitals.commissionType === "PERCENTAGE";
	const hasPending = vitals.totalPending > 0;

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-2 duration-500">
			{/* --- CARD 1: COMPENSATION BASIS --- */}
			<div className="lab-card p-6 flex flex-col justify-between relative overflow-hidden group min-h-36">
				<div className="flex items-center justify-between mb-4 relative z-10 w-full">
					<h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
						{isPercentage ? <Percent className="w-4 h-4 text-emerald-500" /> : <DollarSign className="w-4 h-4 text-emerald-500" />}
						Compensation Basis
					</h3>
					<span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold uppercase tracking-widest border border-emerald-500/20 shadow-sm">
						{vitals.commissionType === "PERCENTAGE" ? "Percentage" : "Fixed Rate"}
					</span>
				</div>

				<div className="mt-auto relative z-10">
					<p className="text-3xl font-mono font-black text-foreground tracking-tighter">{isPercentage ? `${vitals.commissionValue}%` : formatMoney(vitals.commissionValue)}</p>
					<p className="text-[11px] text-muted-foreground font-medium mt-1">{isPercentage ? "Of grand total per completed case assigned." : "Flat fee paid per completed case unit."}</p>
				</div>
			</div>

			{/* --- CARD 2: PENDING UNPAID PAYOUTS (The Liability) --- */}
			<div
				className={cn(
					"lab-card p-6 flex flex-col justify-between relative overflow-hidden group min-h-36 transition-colors duration-1000",
					hasPending ? "bg-emerald-500/2 border-emerald-500/20" : "border-border",
				)}
			>
				{hasPending && (
					<div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/20 transition-colors animate-pulse" />
				)}

				<div className="flex items-center justify-between mb-4 relative z-10 w-full">
					<h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
						<Wallet className="w-4 h-4 text-emerald-500" />
						Pending Payout
					</h3>
					{hasPending && (
						<span className="px-2 py-0.5 rounded-md bg-emerald-500 text-white border border-emerald-600 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-md shadow-emerald-500/15">
							<div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
							{vitals.pendingCasesCount} Cases
						</span>
					)}
				</div>

				<div className="mt-auto relative z-10">
					<p className={cn("text-3xl font-mono font-black tracking-tighter transition-colors", hasPending ? "text-emerald-600 dark:text-emerald-500" : "text-foreground")}>
						{formatMoney(vitals.totalPending)}
					</p>
					<p className="text-[11px] text-muted-foreground font-medium mt-1">{hasPending ? "Earned commissions awaiting statement run." : "All completed cases fully settled."}</p>
				</div>
			</div>

			{/* --- CARD 3: YEAR-TO-DATE EARNINGS --- */}
			<div className="lab-card p-6 flex flex-col justify-between relative overflow-hidden group min-h-36">
				<div className="flex items-center justify-between mb-4 relative z-10 w-full">
					<h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
						<TrendingUp className="w-4 h-4 text-emerald-500" />
						YTD Earnings
					</h3>
					<span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-muted-foreground border border-border text-[9px] font-bold uppercase tracking-widest">Jan - Dec</span>
				</div>

				<div className="mt-auto relative z-10">
					<p className="text-3xl font-mono font-bold text-foreground tracking-tighter">{formatMoney(vitals.totalYtdEarnings)}</p>
					<p className="text-[11px] text-muted-foreground font-medium mt-1">Total net payouts logged in the current calendar year.</p>
				</div>
			</div>
		</div>
	);
}
