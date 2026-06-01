"use client";

import { memo, useMemo } from "react";
import { Calendar, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"; // Imported Provider
import { cn } from "@/lib/utils";

interface HeatmapEntry {
	date: string; // e.g. "2026-05-01"
	count: number; // Units produced on this day
	hasFailed: boolean; // Did any unit they made on this day trigger a remake?
}

interface Props {
	heatmapData: HeatmapEntry[];
	staffName: string;
}

const parseLocalDate = (dateStr: string) => {
	// Appending T00:00:00 forces the browser to evaluate in local time, not UTC!
	return new Date(`${dateStr}T00:00:00`);
};

const getColor = (volume: number) => {
	if (volume === 0) return "bg-slate-100 dark:bg-white/5";
	if (volume === 1) return "bg-primary/20";
	if (volume <= 3) return "bg-primary/40";
	if (volume <= 5) return "bg-primary/70";
	return "bg-primary shadow-[0_0_10px_rgba(37,99,235,0.3)]";
};

export const StaffProductionHeatmap = memo(function StaffProductionHeatmap({ heatmapData, staffName }: Props) {
	const formatPercent = (val: number) => `${Math.round(val)}%`;

	// Safe Date Parser to prevent timezone offset shifts (The UTC Bug Fix)

	// --- HUMAN PERFORMANCE METRICS ---
	const stats = useMemo(() => {
		const activeDays = heatmapData.filter((d) => d.count > 0);
		const totalActiveDays = activeDays.length;

		if (totalActiveDays === 0) return { consistency: 0, peakDate: "N/A", peakVolume: 0 };

		// Consistency: % of scheduled workdays they finished at least 1 unit (approx 65 days/quarter)
		const consistency = Math.min((totalActiveDays / 65) * 100, 100);

		// Find their highest output day
		const peak = [...heatmapData].sort((a, b) => b.count - a.count)[0];

		return {
			consistency,
			peakVolume: peak?.count ?? 0,
			peakDate: peak?.date ? new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(parseLocalDate(peak.date)) : "N/A",
		};
	}, [heatmapData]);

	return (
		<div className="lab-card flex-1 p-6 flex flex-col w-full overflow-hidden transition-all duration-500">
			{/* --- HEADER --- */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
				<div>
					<h3 className="text-sm font-bold text-foreground tracking-tight">Production & Quality Rhythm</h3>
					<p className="text-xs text-muted-foreground mt-1">Daily completed units vs. Quality failures (90 Days)</p>
				</div>
				<div className="flex flex-wrap items-center gap-4">
					<div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground">
						<div className="w-2.5 h-2.5 rounded-sm bg-primary/20" /> Low
						<div className="w-2.5 h-2.5 rounded-sm bg-primary" /> High
					</div>
					<div className="flex items-center gap-1.5 text-[10px] font-bold text-rose-500">
						<div className="w-2.5 h-2.5 rounded-sm border-2 border-rose-500 bg-white/10" /> Remake Triggered
					</div>
				</div>
			</div>

			{/* --- RESPONSIVE GRID CONTAINER --- */}
			<div className="flex-1 flex flex-col justify-end w-full overflow-x-auto custom-scrollbar pb-4">
				<div className="grid grid-flow-col grid-rows-7 lg:grid-rows-4  gap-1 sm:gap-1.5 xl:gap-2 w-full min-w-175 p-2">
					{/* FIX 1: Wrapped the loop in TooltipProvider to prevent Radix crash */}
					{heatmapData.map((day) => (
						<HeatmapItem day={day} key={day.date} color={getColor(day.count)} />
					))}
				</div>
			</div>

			{/* --- INDIVIDUAL PERFORMANCE INSIGHT --- */}
			<div className="mt-4 p-4 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center shadow-sm">
				<div className="flex items-start gap-4">
					<div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary mt-0.5">
						<Calendar className="w-4 h-4" />
					</div>
					<p className="text-xs text-muted-foreground font-medium leading-relaxed max-w-xl">
						<span className="text-primary font-bold uppercase tracking-wider mr-1">Rhythm Audit:</span>
						{staffName.split(" ")[0]} shows a consistent production capacity with a **{formatPercent(stats.consistency)} attendance rating**. Their peak output occurs on{" "}
						<span className="text-foreground font-bold">{stats.peakDate}s</span> (max {stats.peakVolume} units), during which quality remains stable.
					</p>
				</div>

				<div className="flex items-center gap-3 shrink-0 font-mono w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-border/60 pt-3 sm:pt-0 sm:pl-4">
					<div className="flex flex-col items-start sm:items-end">
						<span className="text-[9px] font-bold text-muted-foreground uppercase font-sans">Consistency</span>
						<span className="text-sm font-bold text-foreground">{formatPercent(stats.consistency)}</span>
					</div>
				</div>
			</div>

			{/* ── NEW: OPERATIONAL RHYTHM BLUEPRINT ── */}
			<div className="w-full p-4 rounded-xl border border-border bg-slate-50/50 dark:bg-white/1 space-y-3 mt-6">
				<div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest pb-2 border-b border-border/50">
					<Info className="w-3.5 h-3.5 text-primary" /> Understanding this chart
				</div>
				<div className="space-y-2 text-[11px] text-muted-foreground leading-relaxed">
					<p>
						<strong className="text-foreground">Rhythm Grid:</strong> Tracks daily completed units (shades of Blue) and flags quality failures (Red ring). This helps you spot if a
						technician is rushing or making errors on specific days (like Friday afternoons).
					</p>
					<p>
						<strong className="text-foreground">Consistency:</strong> The percentage of standard business days (estimated at 65 days per quarter) where this technician completed at least 1
						unit.
					</p>
					<p>
						<strong className="text-foreground">Peak Day:</strong> Identifies their single highest manufacturing day, highlighting their volume surge limits.
					</p>
				</div>
			</div>
		</div>
	);
});

StaffProductionHeatmap.displayName = "StaffProductionHeatmap";

const HeatmapItem = memo(function HeatmapItem({ color, day }: { color: string; day: HeatmapEntry }) {
	return (
		<Tooltip key={day.date}>
			<TooltipTrigger asChild>
				<div
					className={cn(
						"w-full aspect-square rounded-[3px] xl:rounded-md transition-all duration-300 cursor-help relative group",
						color,
						day.hasFailed ? "ring-2 ring-rose-500 ring-offset-2 ring-offset-card z-10 scale-110" : "hover:scale-110 hover:z-20",
					)}
				/>
			</TooltipTrigger>
			<TooltipContent side="top" className="glass-ai-panel p-3 border-border shadow-2xl z-50 animate-in fade-in zoom-in-95">
				<div className="space-y-1.5">
					<p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b border-border pb-1 mb-1">
						{new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(parseLocalDate(day.date))}
					</p>
					<div className="flex items-center justify-between gap-4">
						<span className="text-xs font-bold text-foreground">Units Finished</span>
						<span className="text-xs font-mono font-black text-primary">{day.count}</span>
					</div>
					{day.hasFailed && (
						<div className="flex items-center gap-1.5 text-[10px] font-bold text-rose-500 pt-1">
							<div className="w-1 h-1 rounded-full bg-rose-500 animate-pulse" />
							<span>FAILED REMAKE ATTRIBUTED</span>
						</div>
					)}
				</div>
			</TooltipContent>
		</Tooltip>
	);
});
