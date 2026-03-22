"use client";

import { TrendingUp, TrendingDown, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const kpis = [
	{
		title: "Total Cases (MTD)",
		value: "1,284",
		trend: "+12.5%",
		isPositive: true,
		icon: CheckCircle2,
		iconColor: "text-primary",
		iconBg: "bg-primary/10",
	},
	{
		title: "Avg Turnaround Time",
		value: "3.2",
		unit: "days",
		trend: "-0.4 days",
		isPositive: true,
		icon: Clock,
		iconColor: "text-emerald-500",
		iconBg: "bg-emerald-500/10",
	},
	{
		title: "Remake Rate",
		value: "2.4%",
		trend: "+0.3%",
		isPositive: false,
		icon: AlertTriangle,
		iconColor: "text-destructive",
		iconBg: "bg-destructive/10",
	},
	{
		title: "Monthly Revenue",
		value: "$142,500",
		trend: "+8.2%",
		isPositive: true,
		icon: TrendingUp,
		iconColor: "text-ai",
		iconBg: "bg-ai/10",
	},
];

export function DashboardKpiCards() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			{kpis.map((kpi, i) => (
				<div key={i} className="lab-card p-6 flex flex-col relative overflow-hidden group">
					{/* Subtle hover gradient */}
					<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-black/5 dark:to-white/5 rounded-full blur-2xl -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

					<div className="flex justify-between items-start mb-4 relative z-10">
						<div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border border-background/50", kpi.iconBg, kpi.iconColor)}>
							<kpi.icon className="w-5 h-5" />
						</div>
						<span
							className={cn(
								"px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 border",
								kpi.isPositive ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-destructive/10 text-destructive border-destructive/20",
							)}
						>
							{kpi.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
							{kpi.trend}
						</span>
					</div>

					<p className="text-[13px] font-semibold text-muted-foreground mb-1 uppercase tracking-wider relative z-10">{kpi.title}</p>
					<h3 className="text-3xl font-bold text-foreground tracking-tight relative z-10">
						{kpi.value}
						{kpi.unit && <span className="text-base font-medium text-muted-foreground ml-1">{kpi.unit}</span>}
					</h3>
				</div>
			))}
		</div>
	);
}
