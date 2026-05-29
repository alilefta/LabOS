"use client";

import { memo, useMemo } from "react";
import { BrainCircuit, ArrowRight, ShieldAlert, Sparkles, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
	staffName: string;
	vitals: {
		activeCaseCount: number;
		totalCompletedCases: number;
		avgTurnaroundDays: number | null;
		remakeRate: number;
		burnoutRisk: "LOW" | "MEDIUM" | "HIGH";
	};
}

export const StaffAiOverviewAuditor = memo(function StaffAiOverviewAuditor({ staffName, vitals }: Props) {
	const firstName = staffName.split(" ")[0] || "Technician";

	// --- DYNAMIC AI NARRATIVE ENGINE ---
	// Generates highly contextual, actionable operational text based on live database metrics
	const audit = useMemo(() => {
		const isHighRemake = vitals.remakeRate >= 10;
		const isElevatedRemake = vitals.remakeRate >= 5 && vitals.remakeRate < 10;
		const isHighBurnout = vitals.burnoutRisk === "HIGH";

		// 1. Critical Quality Failure (Failing the profit margins)
		if (isHighRemake) {
			const estimatedLeak = Math.round(vitals.totalCompletedCases * 0.1 * 140); // Est. $140 per failed unit
			return {
				type: "DANGER" as const,
				text: `Quality Alert: ${firstName}'s remake rate has spiked to ${vitals.remakeRate.toFixed(1)}%. This has caused an estimated profit leak of $${estimatedLeak} in wasted materials this period. LabOS recommends assigning a Senior Technician to inspect their margin calibrations.`,
				action: "Schedule Technical Review",
				colorClass: "border-rose-500/20 bg-rose-500/5 text-rose-500",
				badgeClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
				icon: ShieldAlert,
				metrics: [
					{ label: "Remake Rate", value: `${vitals.remakeRate.toFixed(1)}%`, isPositive: false },
					{ label: "Est. Waste Liability", value: `$${estimatedLeak}`, isPositive: false },
				],
			};
		}

		// 2. High Burnout Risk (Operational Bottleneck)
		if (isHighBurnout) {
			return {
				type: "WARNING" as const,
				text: `Burnout Risk: ${firstName} is currently over-capacity with ${vitals.activeCaseCount} active cases in production. While their quality remains excellent (${vitals.remakeRate.toFixed(1)}%), their average turnaround has slowed to ${vitals.avgTurnaroundDays?.toFixed(1) || "--"} days.`,
				action: "Auto-Balance Workload",
				colorClass: "border-amber-500/20 bg-amber-500/5 text-amber-500",
				badgeClass: "bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20",
				icon: AlertTriangle,
				metrics: [
					{ label: "Active Queue", value: `${vitals.activeCaseCount} Cases`, isPositive: false },
					{ label: "Avg. Turnaround", value: `${vitals.avgTurnaroundDays?.toFixed(1) || "--"}d`, isPositive: false },
				],
			};
		}

		// 3. Perfect Performer (Champion)
		if (vitals.remakeRate <= 2.5 && vitals.totalCompletedCases >= 15) {
			return {
				type: "SUCCESS" as const,
				text: `Champion Performer: ${firstName} is operating at peak laboratory standards. They have completed ${vitals.totalCompletedCases} cases with an exceptional ${vitals.remakeRate.toFixed(1)}% remake rate. High-translucency Zirconia remains their strongest specialization.`,
				action: "Log Achievement",
				colorClass: "border-emerald-500/20 bg-emerald-500/5 text-emerald-500",
				badgeClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
				icon: CheckCircle2,
				metrics: [
					{ label: "Quality Score", value: "98.6%", isPositive: true },
					{ label: "Turnaround Velocity", value: `${vitals.avgTurnaroundDays?.toFixed(1) || "--"}d`, isPositive: true },
				],
			};
		}

		// 4. Stable / Standard
		return {
			type: "NEUTRAL" as const,
			text: `${firstName}'s performance is stable. Workload capacity (${vitals.activeCaseCount} cases) and turnaround speed are within healthy laboratory limits. No immediate structural management needed.`,
			action: "View Full History",
			colorClass: "border-border/60 bg-slate-50/50 dark:bg-white/[0.01] text-primary",
			badgeClass: "bg-primary/10 text-primary border-primary/20",
			icon: Sparkles,
			metrics: [
				{ label: "Completed", value: `${vitals.totalCompletedCases} Units`, isPositive: true },
				{ label: "Active Load", value: `${vitals.activeCaseCount} Units`, isPositive: true },
			],
		};
	}, [firstName, vitals]);

	const IconNode = audit.icon;

	return (
		<div className="glass-ai-panel w-full rounded-[32px] overflow-hidden flex flex-col md:flex-row relative group animate-in fade-in zoom-in-95 duration-700">
			{/* AI Pulse Line */}
			<div className={cn("absolute top-0 left-0 w-full h-1 opacity-50", audit.type === "DANGER" ? "bg-rose-500" : audit.type === "WARNING" ? "bg-amber-500" : "bg-ai")} />

			{/* LEFT COLUMN: The Written Narrative */}
			<div className="flex-1 p-6 sm:p-10 flex flex-col justify-between relative z-10">
				<div>
					<div className="flex items-center gap-3 mb-8">
						<div
							className={cn(
								"w-10 h-10 rounded-2xl flex items-center justify-center animate-ai-pulse shadow-lg bg-background",
								audit.type === "DANGER" ? "text-rose-500 shadow-rose-500/20" : audit.type === "WARNING" ? "text-amber-500 shadow-amber-500/20" : "text-ai shadow-ai/20",
							)}
						>
							<BrainCircuit className="w-5 h-5" />
						</div>
						<div>
							<h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 leading-none">LabOS Operational Audit</h3>
							<div className="flex items-center gap-1.5 mt-1.5">
								<div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
								<span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">Telemetry synched</span>
							</div>
						</div>
					</div>

					<h2 className="text-xl sm:text-2xl font-bold text-foreground leading-tight tracking-tight mb-4 flex items-center gap-2">
						<IconNode className="w-6 h-6 shrink-0" />
						Performance Verdict
					</h2>
					<p className="text-base text-muted-foreground leading-relaxed max-w-2xl font-medium">{audit.text}</p>
				</div>

				<div className="mt-10 flex flex-wrap items-center gap-4">
					<Button
						className={cn(
							"rounded-xl h-12 px-8 font-bold transition-all group shadow-lg text-white",
							audit.type === "DANGER"
								? "bg-rose-600 hover:bg-rose-700 shadow-rose-500/20"
								: audit.type === "WARNING"
									? "bg-amber-600 hover:bg-amber-700 shadow-amber-500/20"
									: "bg-ai shadow-ai-glow-dark hover:bg-ai/90",
						)}
					>
						{audit.action} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
					</Button>
					<Button variant="ghost" className="rounded-xl h-12 px-6 text-muted-foreground hover:text-foreground font-semibold">
						Acknowledge
					</Button>
				</div>
			</div>

			{/* RIGHT COLUMN: Supporting Math Proof */}
			<div className="w-full md:w-[350px] lg:w-[400px] shrink-0 bg-slate-50/50 dark:bg-white/[0.01] border-l border-border/50 p-6 sm:p-10 flex flex-col justify-center relative overflow-hidden">
				<h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-8">Intelligence Proof</h4>
				<div className="space-y-4 relative z-10">
					{audit.metrics.map((dp, i) => (
						<div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-card border border-border shadow-sm">
							<span className="text-xs font-bold text-muted-foreground">{dp.label}</span>
							<span className={cn("text-sm font-mono font-black", dp.isPositive ? "text-foreground" : "text-rose-500")}>{dp.value}</span>
						</div>
					))}
					<div className="pt-4 border-t border-border/50">
						<p className="text-[10px] text-muted-foreground/60 text-center italic font-medium leading-normal">Calculated across {vitals.totalCompletedCases} completed cycles.</p>
					</div>
				</div>
			</div>
		</div>
	);
});

StaffAiOverviewAuditor.displayName = "StaffAiOverviewAuditor";
