import { Sparkles, ShieldCheck, Zap, Info } from "lucide-react";

interface StaffHealthRingProps {
	scores: {
		volume: number; // Completed cases vs. previous average (0-100)
		quality: number; // 100% minus their personal Remake Rate (0-100)
		speed: number; // Turnaround speed relative to lab target (0-100)
	};
}

export function StaffHealthRing({ scores }: StaffHealthRingProps) {
	// Mathematically calculate their overall weighted rating
	const avg = Math.round((scores.volume + scores.quality + scores.speed) / 3);

	return (
		<div className="lab-card flex-1 p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden group">
			{/* AI Sparkle Icon in Corner */}
			<div className="absolute top-4 right-4 text-ai animate-ai-pulse">
				<Sparkles className="w-5 h-5" />
			</div>

			<div className="relative w-48 h-48 mb-6 shrink-0">
				{/* SVG Radial Rings */}
				<svg className="w-full h-full transform -rotate-90">
					{/* Ring 1: Volume (Outer) - Primary Blue */}
					<circle cx="96" cy="96" r="86" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-white/5" />
					<circle
						cx="96"
						cy="96"
						r="86"
						stroke="var(--color-primary)"
						strokeWidth="8"
						fill="transparent"
						strokeDasharray={540}
						strokeDashoffset={540 - (540 * Math.max(0, Math.min(scores.volume, 100))) / 100}
						strokeLinecap="round"
						className="transition-all duration-1000 ease-out"
					/>

					{/* Ring 2: Quality (Middle) - AI Violet */}
					<circle cx="96" cy="96" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-white/5" />
					<circle
						cx="96"
						cy="96"
						r="70"
						stroke="var(--ai)"
						strokeWidth="8"
						fill="transparent"
						strokeDasharray={440}
						strokeDashoffset={440 - (440 * Math.max(0, Math.min(scores.quality, 100))) / 100}
						strokeLinecap="round"
						className="transition-all duration-1000 delay-200 ease-out"
					/>

					{/* Ring 3: Speed (Inner) - Emerald Green */}
					<circle cx="96" cy="96" r="54" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-white/5" />
					<circle
						cx="96"
						cy="96"
						r="54"
						stroke="var(--color-chart-3)"
						strokeWidth="8"
						fill="transparent"
						strokeDasharray={340}
						strokeDashoffset={340 - (340 * Math.max(0, Math.min(scores.speed, 100))) / 100}
						strokeLinecap="round"
						className="transition-all duration-1000 delay-500 ease-out"
					/>
				</svg>

				{/* Center Text (Overall Rating) */}
				<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
					<span className="text-4xl font-mono font-bold text-foreground tracking-tighter leading-none">{avg}%</span>
					<span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1.5">Rating</span>
				</div>
			</div>

			{/* THE LEGEND */}
			<div className="grid grid-cols-1 gap-2 w-full relative z-10 mb-6">
				{/* Volume */}
				<div className="flex items-center justify-between text-xs px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/2 border border-border">
					<div className="flex items-center gap-2">
						<div className="w-2 h-2 rounded-full bg-primary" />
						<span className="text-muted-foreground font-semibold">Volume (Completed)</span>
					</div>
					<span className="font-mono font-bold text-foreground">{scores.volume}%</span>
				</div>

				{/* Quality */}
				<div className="flex items-center justify-between text-xs px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/2 border border-border">
					<div className="flex items-center gap-2">
						<div className="w-2 h-2 rounded-full bg-ai" />
						<span className="text-muted-foreground font-semibold flex items-center gap-1">
							<ShieldCheck className="w-3.5 h-3.5 text-ai" /> Quality (Success Rate)
						</span>
					</div>
					<span className="font-mono font-bold text-foreground">{scores.quality}%</span>
				</div>

				{/* Speed */}
				<div className="flex items-center justify-between text-xs px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/2 border border-border">
					<div className="flex items-center gap-2">
						<div className="w-2 h-2 rounded-full bg-emerald-500" />
						<span className="text-muted-foreground font-semibold flex items-center gap-1">
							<Zap className="w-3.5 h-3.5 text-emerald-500" /> Speed (Turnaround)
						</span>
					</div>
					<span className="font-mono font-bold text-foreground">{scores.speed}%</span>
				</div>
			</div>

			{/* ── NEW: METRICS BLUEPRINT (Telemetry Education Box) ── */}
			{/* Written in clear, non-technical sentence case to explain the math */}
			<div className="w-full p-4 rounded-xl border border-border bg-slate-50/50 dark:bg-white/1 space-y-3 relative z-10">
				<div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest pb-2 border-b border-border/50">
					<Info className="w-3.5 h-3.5 text-primary" /> How we calculate this
				</div>
				<div className="space-y-2 text-[11px] text-muted-foreground leading-relaxed">
					<p>
						<strong className="text-foreground">Overall Rating:</strong> The balanced average of this employee&apos;s production output, restoration quality, and turnaround speed.
					</p>
					<p>
						<strong className="text-foreground">Volume:</strong> Completed cases in the active period versus their previous period baseline.
					</p>
					<p>
						<strong className="text-foreground">Quality:</strong> The percentage of successful, non-remake cases they completed.
					</p>
					<p>
						<strong className="text-foreground">Speed:</strong> Their average turnaround time evaluated against our laboratory standard of 3.0 days.
					</p>
				</div>
			</div>
		</div>
	);
}
