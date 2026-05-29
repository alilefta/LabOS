"use client";

import { memo, useMemo } from "react";
import { Wrench, DollarSign, Award, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CommissionType } from "@/schema/base/enums.base";
import { StaffBurnoutRisk } from "@/schema/composed/team/staff-dossier.dtos";

interface Props {
	activeCaseCount: number;
	burnoutRisk: StaffBurnoutRisk;
	commissionType: CommissionType;
	commissionValue: number | null;
	canViewFinancials: boolean;
}

export const StaffPerformanceVitalsCard = memo(function StaffPerformanceVitalsCard({ activeCaseCount, burnoutRisk, commissionType, commissionValue, canViewFinancials }: Props) {
	// Max capacity standard in high-end labs is 15 cases per tech
	const maxCapacity = 15;
	const capacityPct = Math.min((activeCaseCount / maxCapacity) * 100, 100);

	// Dynamic Color Registry based on stress levels
	const theme = useMemo(() => {
		if (burnoutRisk === "HIGH") {
			return {
				text: "text-rose-500 dark:text-rose-400",
				bg: "bg-rose-500/10 border-rose-500/20",
				bar: "[&>div]:bg-rose-500",
				label: "Burnout Risk",
			};
		}
		if (burnoutRisk === "MEDIUM") {
			return {
				text: "text-amber-500 dark:text-amber-500",
				bg: "bg-amber-500/10 border-amber-500/20",
				bar: "[&>div]:bg-amber-500",
				label: "High Workload",
			};
		}
		return {
			text: "text-primary dark:text-primary",
			bg: "bg-primary/10 border-primary/20",
			bar: "[&>div]:bg-primary",
			label: "Optimal Load",
		};
	}, [burnoutRisk]);

	return (
		<div className="lab-card p-6 sm:p-8 flex flex-col relative overflow-hidden group min-h-90">
			{/* Ambient Status Glow (Behind content) */}
			<div
				className={cn(
					"absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-10 pointer-events-none transition-all duration-1000",
					burnoutRisk === "HIGH" ? "bg-rose-500" : burnoutRisk === "MEDIUM" ? "bg-amber-500" : "bg-primary",
				)}
			/>

			{/* HEADER */}
			<div className="flex items-center justify-between mb-6 relative z-10 shrink-0">
				<div className="flex items-center gap-3">
					<div className={cn("w-8 h-8 rounded-lg flex items-center justify-center border", theme.bg, theme.text)}>
						<Wrench className="w-4 h-4" />
					</div>
					<div>
						<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Floor Capacity</h3>
						<p className="text-xs font-medium text-foreground mt-0.5">Active Queue</p>
					</div>
				</div>
			</div>

			{/* ACTIVE CASES STAT */}
			<div className="space-y-1 mb-6 relative z-10 shrink-0">
				<p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Assigned cases</p>
				<div className="flex items-baseline gap-1.5">
					<p className={cn("text-3xl font-mono font-bold tracking-tighter transition-colors", theme.text)}>{activeCaseCount}</p>
					<p className="text-xs text-muted-foreground font-semibold">/ {maxCapacity} units max</p>
				</div>
			</div>

			{/* CAPACITY BAR */}
			<div className="space-y-2 mb-6 relative z-10 shrink-0">
				<div className="flex justify-between items-end text-xs font-semibold">
					<span className={cn("transition-colors text-[11px] uppercase font-bold tracking-wider", theme.text)}>{theme.label}</span>
					<span className="font-mono text-muted-foreground">{Math.round(capacityPct)}%</span>
				</div>
				<Progress value={capacityPct} className={cn("h-2 bg-slate-100 dark:bg-white/5 shadow-inner", theme.bar)} />
			</div>

			{/* ROLE-GUARDED FINANCIAL LEDGER */}
			{canViewFinancials && (
				<div className="p-3 rounded-xl bg-emerald-500/2 border border-emerald-500/10 flex items-center justify-between relative z-10 animate-in zoom-in-95 duration-300 shrink-0">
					<div className="flex items-center gap-2.5 min-w-0">
						<div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
							<DollarSign className="w-4 h-4" />
						</div>
						<div className="flex flex-col min-w-0">
							<span className="text-[9px] font-bold text-muted-foreground uppercase">Commission Basis</span>
							<span className="text-xs font-bold text-foreground truncate">{commissionType === "PERCENTAGE" ? "Percentage Cut" : "Fixed Rate"}</span>
						</div>
					</div>
					<div className="text-right shrink-0 font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400">
						{commissionType === "PERCENTAGE" ? `${commissionValue ?? 0}%` : `$${commissionValue ?? 0}`}
					</div>
				</div>
			)}

			{/* Standard Client Standing Card (For non-financial roles) */}
			{!canViewFinancials && (
				<div className="p-3 rounded-xl bg-primary/5 border border-primary/10 flex items-center gap-2.5 relative z-10 shrink-0">
					<Award className="w-5 h-5 text-primary shrink-0" />
					<div className="flex flex-col">
						<span className="text-[10px] font-bold text-primary uppercase tracking-widest">Efficiency Status</span>
						<span className="text-xs text-muted-foreground font-medium leading-tight mt-0.5">Technician maintains standard laboratory turnaround.</span>
					</div>
				</div>
			)}

			{/* ── NEW: CAPACITY PROTOCOL (Telemetry Education Box) ── */}
			<div className="w-full p-4 rounded-xl border border-border bg-slate-50/50 dark:bg-white/1 space-y-3 relative z-10 mt-6 flex-1">
				<div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest pb-2 border-b border-border/50">
					<Info className="w-3.5 h-3.5 text-primary" /> Capacity Protocol
				</div>
				<div className="space-y-2 text-[11px] text-muted-foreground leading-relaxed">
					<p>
						<strong className="text-foreground">Maximum Workload:</strong> We cap a technician&apos;s active queue at 15 cases. Exceeding this creates a severe bottleneck.
					</p>
					<p>
						<strong className="text-foreground">Stress Thresholds:</strong> A workload of 8-14 cases is flagged as <span className="text-amber-500 font-bold">Heavy</span>. At 15 cases, the
						profile triggers a <span className="text-rose-500 font-bold">Burnout Risk</span>.
					</p>
				</div>
			</div>
		</div>
	);
});

StaffPerformanceVitalsCard.displayName = "StaffPerformanceVitalsCard";
