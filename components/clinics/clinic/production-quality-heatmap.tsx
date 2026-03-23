"use client";

import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function ProductionQualityHeatmap() {
	// Generate mock days for the last 16 weeks (7x16 grid)
	const weeks = 20;
	const days = Array.from({ length: weeks * 7 }, (_, i) => ({
		id: i,
		volume: Math.floor(Math.random() * 5), // 0 to 4 cases
		hasRemake: Math.random() < 0.05, // 5% chance of remake
		date: new Date(Date.now() - (140 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
	}));

	const getColor = (volume: number) => {
		if (volume === 0) return "bg-slate-100 dark:bg-white/5";
		if (volume === 1) return "bg-primary/20";
		if (volume === 2) return "bg-primary/40";
		if (volume === 3) return "bg-primary/70";
		return "bg-primary";
	};

	return (
		<div className="lab-card flex-1 p-6 flex flex-col">
			<div className="flex items-center justify-between mb-6">
				<div>
					<h3 className="text-sm font-bold text-foreground tracking-tight">Production & Quality Rhythm</h3>
					<p className="text-xs text-muted-foreground mt-1">Daily case volume vs. Quality failures (90 Days)</p>
				</div>
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground">
						<div className="w-2.5 h-2.5 rounded-sm bg-primary/20" /> Low
						<div className="w-2.5 h-2.5 rounded-sm bg-primary" /> High
					</div>
					<div className="flex items-center gap-1.5 text-[10px] font-bold text-rose-500">
						<div className="w-2.5 h-2.5 rounded-sm border-2 border-rose-500 bg-white/10" /> Remake
					</div>
				</div>
			</div>

			<div className="flex-1 flex items-end overflow-x-auto no-scrollbar pb-2">
				<div className="grid grid-flow-col grid-rows-7 gap-1.5">
					<TooltipProvider>
						{days.map((day) => (
							<Tooltip key={day.id}>
								<TooltipTrigger asChild>
									<div
										className={cn(
											"w-4 h-4 rounded-[4px] transition-all duration-300 cursor-help",
											getColor(day.volume),
											day.hasRemake ? "ring-2 ring-rose-500 ring-offset-2 ring-offset-card" : "hover:scale-125",
										)}
									/>
								</TooltipTrigger>
								<TooltipContent side="top" className="glass-ai-panel p-2 text-[10px] font-bold">
									{day.date}: {day.volume} Cases {day.hasRemake && "• ⚠️ REMAKE TRIGGERED"}
								</TooltipContent>
							</Tooltip>
						))}
					</TooltipProvider>
				</div>
			</div>

			<div className="mt-6 p-4 rounded-xl bg-ai/5 border border-ai/10 flex items-start gap-3">
				<Info className="w-4 h-4 text-ai shrink-0 mt-0.5" />
				<p className="text-[11px] text-muted-foreground font-medium leading-normal">
					<span className="text-ai font-bold">LabOS Insight:</span> This clinic shows a recurring quality spike on <span className="text-foreground font-bold">Tuesdays</span>. This
					correlates with digital scans sent between 2:00 PM and 4:00 PM.
				</p>
			</div>
		</div>
	);
}
