"use client";

import { DollarSign, TrendingUp, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function SalaryCommissionCalculator() {
	const data = {
		base: 4500,
		commission: 1240,
		bonus: 500,
		target: 8000,
	};

	const currentTotal = data.base + data.commission + data.bonus;
	const progress = (currentTotal / data.target) * 100;

	return (
		<div className="lab-card p-6 flex flex-col relative overflow-hidden">
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">MTD Earnings Estimate</h3>
				<div className="flex items-center gap-1 text-emerald-500 font-bold text-xs">
					<TrendingUp className="w-3 h-3" /> +12% vs LY
				</div>
			</div>

			<div className="flex items-baseline gap-2 mb-6">
				<span className="text-4xl font-mono font-bold text-foreground">${currentTotal.toLocaleString()}</span>
				<span className="text-sm text-muted-foreground font-medium">/ ${data.target.toLocaleString()} Goal</span>
			</div>

			{/* Modern Stacked Progress Bar */}
			<div className="space-y-4 mb-8">
				<div className="h-3 w-full bg-slate-100 dark:bg-white/5 rounded-full flex overflow-hidden p-0.5">
					<div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: "50%" }} />
					<div className="h-full bg-ai rounded-full transition-all duration-1000 ml-0.5" style={{ width: "15%" }} />
					<div className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ml-0.5" style={{ width: "8%" }} />
				</div>

				<div className="grid grid-cols-3 gap-2">
					<div className="flex flex-col">
						<span className="text-[10px] font-bold text-muted-foreground uppercase">Base</span>
						<span className="text-sm font-mono font-bold">${data.base}</span>
					</div>
					<div className="flex flex-col border-l border-border pl-4">
						<span className="text-[10px] font-bold text-ai uppercase">Commission</span>
						<span className="text-sm font-mono font-bold">${data.commission}</span>
					</div>
					<div className="flex flex-col border-l border-border pl-4">
						<span className="text-[10px] font-bold text-emerald-500 uppercase">Bonus</span>
						<span className="text-sm font-mono font-bold">${data.bonus}</span>
					</div>
				</div>
			</div>

			<div className="mt-auto p-4 rounded-xl bg-slate-50 dark:bg-white/2 border border-border flex items-start gap-3">
				<Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
				<p className="text-[11px] text-muted-foreground leading-relaxed">
					Elena has reached her <span className="text-foreground font-bold">Quality Milestone</span>. The current bonus includes a 5% multiplier for a zero-remake week.
				</p>
			</div>
		</div>
	);
}
