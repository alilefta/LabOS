"use client";

import { Search, MoreHorizontal, ArrowUpRight, TrendingUp } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock data for the "Performance Radar"
const CLINICS_DATA = [
	{ id: "1", name: "Apex Dental Design", city: "New York", health: 98, cases: 42, ltv: 124500, trend: [20, 40, 35, 50, 45, 60, 55] },
	{ id: "2", name: "Smile Institute", city: "Miami", health: 82, cases: 18, ltv: 82300, trend: [50, 45, 40, 35, 30, 25, 20] },
	{ id: "3", name: "Bright Tooth Clinic", city: "Chicago", health: 64, cases: 12, ltv: 45000, trend: [10, 15, 12, 25, 30, 28, 35] },
	{ id: "4", name: "Metropolitan Dental", city: "Seattle", health: 94, cases: 31, ltv: 98200, trend: [30, 32, 35, 40, 38, 42, 45] },
];

export function ClinicsPerformanceTable() {
	return (
		<div className="lab-card flex-1 flex flex-col overflow-hidden">
			{/* Table Toolbar */}
			<div className="p-4 border-b border-border bg-slate-50/50 dark:bg-white/2 flex items-center justify-between gap-4">
				<div className="relative w-full max-w-sm">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
					<input
						type="text"
						placeholder="Search Clinics or LTV..."
						className="w-full h-9 pl-9 pr-4 bg-white dark:bg-[#121214] border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
					/>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2">Sorted by Revenue</span>
				</div>
			</div>

			{/* Header Row */}
			<div className="grid grid-cols-12 px-6 py-3 border-b border-border bg-slate-50/30 dark:bg-white/1 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
				<div className="col-span-4">Clinic Partner</div>
				<div className="col-span-2 text-center">Health</div>
				<div className="col-span-2 text-center">Active Cases</div>
				<div className="col-span-2 text-center">30D Trend</div>
				<div className="col-span-2 text-right">LTV (USD)</div>
			</div>

			{/* Data Rows */}
			<div className="flex-1 overflow-y-auto custom-scrollbar">
				{CLINICS_DATA.map((clinic) => (
					<div key={clinic.id} className="row-hover grid grid-cols-12 px-6 py-4 border-b border-border items-center">
						{/* Clinic Info */}
						<div className="col-span-4 flex items-center gap-3">
							<Avatar className="w-10 h-10 rounded-xl border border-border shadow-sm">
								<AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">{clinic.name.substring(0, 2).toUpperCase()}</AvatarFallback>
							</Avatar>
							<div className="flex flex-col">
								<span className="text-sm font-bold text-foreground leading-none mb-1">{clinic.name}</span>
								<span className="text-xs text-muted-foreground font-medium">{clinic.city}</span>
							</div>
						</div>

						{/* Health Badge */}
						<div className="col-span-2 flex justify-center">
							<div
								className={cn(
									"px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5",
									clinic.health > 90
										? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
										: clinic.health > 70
											? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
											: "bg-rose-500/10 text-rose-500 border border-rose-500/20",
								)}
							>
								<div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", clinic.health > 90 ? "bg-emerald-500" : clinic.health > 70 ? "bg-amber-500" : "bg-rose-500")} />
								{clinic.health}%
							</div>
						</div>

						{/* Active Cases */}
						<div className="col-span-2 text-center font-mono font-bold text-sm text-foreground">{clinic.cases}</div>

						{/* Trend Sparkline */}
						<div className="col-span-2 h-10 px-4">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={clinic.trend.map((val, i) => ({ val, i }))}>
									<Line
										type="monotone"
										dataKey="val"
										stroke={clinic.health > 90 ? "var(--color-chart-3)" : clinic.health > 70 ? "var(--color-chart-4)" : "var(--color-chart-5)"}
										strokeWidth={2}
										dot={false}
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>

						{/* LTV */}
						<div className="col-span-2 text-right font-mono font-bold text-sm text-foreground">${clinic.ltv.toLocaleString()}</div>
					</div>
				))}
			</div>
		</div>
	);
}
