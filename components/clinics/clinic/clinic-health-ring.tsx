"use client";

import { Sparkles } from "lucide-react";

export function ClinicHealthRing() {
	// Mock scores out of 100
	const scores = { volume: 85, quality: 62, logic: 94 };
	const avg = Math.round((scores.volume + scores.quality + scores.logic) / 3);

	return (
		<div className="lab-card flex-1 p-8 flex flex-col items-center justify-center relative overflow-hidden group">
			{/* AI Sparkle Icon in Corner */}
			<div className="absolute top-4 right-4 text-ai animate-ai-pulse">
				<Sparkles className="w-5 h-5" />
			</div>

			<div className="relative w-48 h-48 mb-8">
				{/* SVG Radial Rings */}
				<svg className="w-full h-full transform -rotate-90">
					{/* Ring 1: Volume (Outer) */}
					<circle cx="96" cy="96" r="86" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-white/5" />
					<circle
						cx="96"
						cy="96"
						r="86"
						stroke="var(--color-primary)"
						strokeWidth="8"
						fill="transparent"
						strokeDasharray={540}
						strokeDashoffset={540 - (540 * scores.volume) / 100}
						strokeLinecap="round"
						className="transition-all duration-1000 ease-out"
					/>

					{/* Ring 2: Quality (Middle) */}
					<circle cx="96" cy="96" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-white/5" />
					<circle
						cx="96"
						cy="96"
						r="70"
						stroke="var(--ai)"
						strokeWidth="8"
						fill="transparent"
						strokeDasharray={440}
						strokeDashoffset={440 - (440 * scores.quality) / 100}
						strokeLinecap="round"
						className="transition-all duration-1000 delay-200 ease-out"
					/>

					{/* Ring 3: Logistics (Inner) */}
					<circle cx="96" cy="96" r="54" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-white/5" />
					<circle
						cx="96"
						cy="96"
						r="54"
						stroke="var(--color-chart-3)"
						strokeWidth="8"
						fill="transparent"
						strokeDasharray={340}
						strokeDashoffset={340 - (340 * scores.logic) / 100}
						strokeLinecap="round"
						className="transition-all duration-1000 delay-500 ease-out"
					/>
				</svg>

				{/* Center Text */}
				<div className="absolute inset-0 flex flex-col items-center justify-center">
					<span className="text-4xl font-mono font-bold text-foreground">{avg}%</span>
					<span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Health</span>
				</div>
			</div>

			{/* Legend */}
			<div className="grid grid-cols-1 gap-2 w-full">
				<div className="flex items-center justify-between text-xs px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-border">
					<div className="flex items-center gap-2">
						<div className="w-2 h-2 rounded-full bg-primary" /> Volume
					</div>
					<span className="font-mono font-bold">{scores.volume}%</span>
				</div>
				<div className="flex items-center justify-between text-xs px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-border">
					<div className="flex items-center gap-2">
						<div className="w-2 h-2 rounded-full bg-ai" /> Quality
					</div>
					<span className="font-mono font-bold text-rose-500">{scores.quality}%</span>
				</div>
				<div className="flex items-center justify-between text-xs px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-border">
					<div className="flex items-center gap-2">
						<div className="w-2 h-2 rounded-full bg-emerald-500" /> Logistics
					</div>
					<span className="font-mono font-bold">{scores.logic}%</span>
				</div>
			</div>
		</div>
	);
}
