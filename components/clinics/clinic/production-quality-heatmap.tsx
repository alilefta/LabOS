"use client";

import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { memo } from "react";

interface HeatmapEntry {
	date: string;
	count: number;
	hasFailed: boolean;
}

interface Props {
	heatmapData: HeatmapEntry[];
	clinicName: string;
}

export const ProductionQualityHeatmap = memo(function ProductionQualityHeatmap({ heatmapData, clinicName }: Props) {
	// Refined color scale for high-volume clinical production
	const getColor = (volume: number) => {
		if (volume === 0) return "bg-slate-100 dark:bg-white/5";
		if (volume === 1) return "bg-primary/20";
		if (volume <= 3) return "bg-primary/40";
		if (volume <= 5) return "bg-primary/70";
		return "bg-primary shadow-[0_0_10px_rgba(37,99,235,0.3)]";
	};

	return (
		<div className="lab-card flex-1 p-6 flex flex-col w-full overflow-hidden transition-all duration-500">
			{/* --- HEADER --- */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
				<div>
					<h3 className="text-sm font-bold text-foreground tracking-tight">Production & Quality Rhythm</h3>
					<p className="text-xs text-muted-foreground mt-1">Daily case volume vs. Quality failures (Rolling 90 Days)</p>
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
					{heatmapData.map((day) => (
						<HeatmapItem key={day.date} day={day} color={getColor(day.count)} />
					))}
				</div>
			</div>

			{/* --- AI INSIGHT --- */}
			<div className="mt-4 p-4 rounded-2xl bg-ai/5 border border-ai/10 flex items-start gap-4 shrink-0 shadow-sm">
				<div className="w-8 h-8 rounded-lg bg-ai/10 flex items-center justify-center shrink-0">
					<Info className="w-4 h-4 text-ai" />
				</div>
				<p className="text-xs text-muted-foreground font-medium leading-relaxed italic">
					<span className="text-ai font-bold not-italic uppercase tracking-wider mr-1">Rhythm Analysis:</span>
					The heatmap indicates that {clinicName.split(" ")[0]} typically front-loads their cases on <span className="text-foreground font-bold">Mondays and Tuesdays</span>. Remake density
					correlates with high-volume peaks, suggesting a need for increased QC verification on those specific intake batches.
				</p>
			</div>
		</div>
	);
});

const HeatmapItem = memo(function HeatMapItem({ color, day }: { color: string; day: HeatmapEntry }) {
	return (
		<Tooltip key={day.date}>
			<TooltipTrigger asChild>
				<div
					className={cn(
						"w-full aspect-square rounded-[3px] xl:rounded-md transition-all duration-500 cursor-help relative group",
						color,
						// Highlight remake days with a physical ring
						day.hasFailed ? "ring-2 ring-rose-500 ring-offset-2 ring-offset-card z-10 scale-110" : "hover:scale-110 hover:z-20",
					)}
				>
					{/* Subtle inner glow for days with activity */}
					{day.count > 0 && !day.hasFailed && <div className="absolute inset-0 rounded-inherit bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />}
				</div>
			</TooltipTrigger>
			<TooltipContent side="top" className="glass-ai-panel p-3 border-border shadow-2xl z-50 animate-in fade-in zoom-in-95">
				<div className="space-y-1.5">
					<p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b border-border pb-1 mb-1">
						{new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(day.date))}
					</p>
					<div className="flex items-center justify-between gap-4">
						<span className="text-xs font-bold text-foreground">Cases Registered</span>
						<span className="text-xs font-mono font-black text-primary">{day.count}</span>
					</div>
					{day.hasFailed && (
						<div className="flex items-center gap-1.5 text-[10px] font-bold text-rose-500 pt-1">
							<div className="w-1 h-1 rounded-full bg-rose-500 animate-pulse" />
							<span>QUALITY FAILURE RECORDED</span>
						</div>
					)}
				</div>
			</TooltipContent>
		</Tooltip>
	);
});
