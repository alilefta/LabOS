"use client";

import { useMemo, memo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Layers, Clock, Wrench, Info, Inbox } from "lucide-react";

const COLORS = [
	"var(--color-primary)", // Zirconia (Cobalt Blue)
	"var(--color-ai)", // E-Max (Royal Violet)
	"var(--color-chart-3)", // Acrylic / Removables (Emerald)
	"var(--color-chart-4)", // Alloys / Metals (Amber)
	"var(--color-chart-5)", // Ortho / PMMA (Rose Red)
];

interface SpecialtyMetric {
	name: string; // e.g. "Zirconia Monolithic"
	value: number; // percentage of their workload (e.g. 60)
	unitCount: number; // total units they completed (e.g. 142)
	avgTurnaroundDays: number; // their personal speed for this specific material (e.g. 2.1)
}

interface Props {
	data: SpecialtyMetric[];
}

export const StaffSpecialtyDonut = memo(function StaffSpecialtyDonut({ data }: Props) {
	const isEmpty = data.length === 0;

	// 1. Identify the "Dominant Specialty" for the center text of the Donut
	const dominantSpecialty = useMemo(() => {
		if (isEmpty) return null;
		return [...data].sort((a, b) => b.value - a.value)[0];
	}, [data, isEmpty]);

	// const totalUnits = useMemo(() => {
	// 	return data.reduce((sum, item) => sum + item.unitCount, 0);
	// }, [data]);

	// --- 1. OPTIMISTIC EMPTY STATE ---
	if (isEmpty) {
		return (
			<div className="lab-card flex-1 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group min-h-90">
				<div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 border border-border flex items-center justify-center text-slate-400 dark:text-zinc-500 mb-4">
					<Inbox className="w-6 h-6" />
				</div>
				<h4 className="text-sm font-bold text-foreground">No production history</h4>
				<p className="text-xs text-muted-foreground mt-1 max-w-50 leading-relaxed">This technician has not yet completed any case assignments in this timeframe.</p>
			</div>
		);
	}

	return (
		<div className="lab-card flex-1 p-6 sm:p-8 flex flex-col relative overflow-hidden group min-h-90">
			{/* Ambient Neural Glow */}
			<div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/10 transition-colors duration-500" />

			{/* --- HEADER --- */}
			<div className="flex items-center justify-between mb-2 relative z-10 shrink-0">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
						<Layers className="w-4 h-4" />
					</div>
					<div>
						<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Material Focus</h3>
						<p className="text-xs font-bold text-foreground">Production Profile</p>
					</div>
				</div>
			</div>

			{/* --- THE DONUT CANVAS --- */}
			<div className="flex-1 w-full relative min-h-35] -mt-2 shrink-0">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={3} dataKey="value" stroke="none" animationDuration={800}>
							{data.map((_, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity outline-none cursor-pointer" />
							))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>

				{/* Center Text: Displays their absolute specialty */}
				<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-2">
					<span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Specialty</span>
					<span className="text-sm font-bold text-foreground max-w-22.5 truncate text-center leading-none mt-1">{dominantSpecialty?.name.split(" ")[0] || "None"}</span>
					{dominantSpecialty && (
						<span className="text-[9px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded mt-1.5 border border-primary/10">{dominantSpecialty.value}% Share</span>
					)}
				</div>
			</div>

			{/* --- THE DEEP STATISTICS LEDGER (Tabular & Scannable) --- */}
			<div className="space-y-2 mt-4 relative z-10 border-t border-border/50 pt-4 shrink-0">
				{/* Table Header */}
				<div className="flex items-center justify-between text-[9px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1">
					<span>Material / Product</span>
					<div className="flex items-center gap-6">
						<span className="flex items-center gap-1">
							<Wrench className="w-3 h-3" /> Units
						</span>
						<span className="flex items-center gap-1 w-12 justify-end">
							<Clock className="w-3 h-3" /> Speed
						</span>
					</div>
				</div>

				{/* Table Rows (Max 3 visible to prevent height blowouts) */}
				{data.slice(0, 3).map((item, i) => (
					<div key={item.name} className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/1 transition-colors">
						<div className="flex items-center gap-2 min-w-0">
							<div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
							<span className="text-xs font-bold text-foreground truncate max-w-30 sm:max-w-37.5">{item.name}</span>
						</div>

						<div className="flex items-center gap-6 shrink-0">
							<span className="text-xs font-mono font-bold text-slate-600 dark:text-zinc-400 w-8 text-right">{item.unitCount}</span>
							<span className="text-xs font-mono font-bold text-foreground w-12 text-right">{item.avgTurnaroundDays ? `${item.avgTurnaroundDays.toFixed(1)}d` : "--"}</span>
						</div>
					</div>
				))}
			</div>

			{/* ── NEW: TELEMETRY BLUEPRINT ── */}
			{/* Written in clear, non-technical sentence case to explain the data */}
			<div className="w-full p-4 rounded-xl border border-border bg-slate-50/50 dark:bg-white/1 space-y-3 relative z-10 mt-6">
				<div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest pb-2 border-b border-border/50">
					<Info className="w-3.5 h-3.5 text-primary" /> Understanding focus
				</div>
				<div className="space-y-2 text-[11px] text-muted-foreground leading-relaxed">
					<p>
						<strong className="text-foreground">Specialty Mix:</strong> Visualizes which physical materials this technician has actually processed. It maps their hands-on skills based on
						finished case units.
					</p>
					<p>
						<strong className="text-foreground">Speed per Product:</strong> Displays their average turnaround time (in days) calculated specifically for *each individual material*, helping
						you identify their fastest manufacturing lanes.
					</p>
				</div>
			</div>
		</div>
	);
});

StaffSpecialtyDonut.displayName = "StaffSpecialtyDonut";
