"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

// Simplified Tooth Map (Example for Upper Right)
const teethData = [
	{ id: "UpperRightThirdMolar", label: "18", x: 10, y: 10 },
	{ id: "UpperRightSecondMolar", label: "17", x: 40, y: 15 },
	{ id: "UpperRightFirstMolar", label: "16", x: 70, y: 25 },
	// ... rest of the teeth
];

export function DentalChartSelection() {
	const [selectedTeeth, setSelectedTeeth] = useState<string[]>([]);

	const toggleTooth = (id: string) => {
		setSelectedTeeth((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
	};

	return (
		<div className="lab-card p-8 flex flex-col items-center">
			<div className="mb-8 text-center">
				<h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Teeth Selection</h3>
				<p className="text-xs text-slate-400 mt-1">Select affected teeth to define work items</p>
			</div>

			{/* DENTAL ARCH VISUALIZER */}
			<div className="relative w-full max-w-2xl bg-slate-50/50 dark:bg-white/2 rounded-3xl p-10 border border-dashed border-border">
				{/* We would use a real SVG Path here, but for UI precision: */}
				<div className="grid grid-cols-8 gap-4 justify-items-center">
					{/* Top Arch Row */}
					{teethData.map((tooth) => (
						<button
							key={tooth.id}
							type="button"
							onClick={() => toggleTooth(tooth.id)}
							className={cn(
								"w-12 h-14 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300 group",
								selectedTeeth.includes(tooth.id)
									? "bg-primary border-primary shadow-ai-glow-light text-white scale-110 z-10"
									: "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
							)}
						>
							<span className="text-[10px] font-bold uppercase mb-1 opacity-50 group-hover:opacity-100">UR</span>
							<span className="text-lg font-mono font-bold leading-none">{tooth.label}</span>
						</button>
					))}
				</div>

				{/* Selected Summary Badge */}
				{selectedTeeth.length > 0 && (
					<div className="mt-8 flex flex-wrap gap-2 justify-center animate-in fade-in zoom-in-95">
						{selectedTeeth.map((t) => (
							<span key={t} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">
								{t.replace(/([A-Z])/g, " $1").trim()}
							</span>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
