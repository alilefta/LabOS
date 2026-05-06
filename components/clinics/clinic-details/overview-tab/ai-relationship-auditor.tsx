"use client";

import { BrainCircuit, ArrowRight, ShieldAlert, TrendingUp, Activity, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { memo, useMemo } from "react";

interface Props {
	clinicName: string;
	scores: { volume: number; quality: number; logic: number };
	meta: {
		period: string;
		currentCases: number;
		previousCases: number;
		totalCasesInPeriod: number;
		labFaultRemakes: number;
		clinicFaultRemakes: number;
		invoicesEvaluated: number;
	};
}

export const AiRelationshipAuditor = memo(function AiRelationshipAuditor({ clinicName, scores, meta }: Props) {
	// --- THE NARRATIVE ENGINE ---
	// This logic simulates "AI" by generating text based on the metadata
	const audit = useMemo(() => {
		const totalRemakes = meta.labFaultRemakes + meta.clinicFaultRemakes;
		const remakeRate = meta.totalCasesInPeriod > 0 ? (totalRemakes / meta.totalCasesInPeriod) * 100 : 0;

		// 1. Critical Quality Issue
		if (remakeRate > 15 || scores.quality < 80) {
			return {
				type: "WARNING" as const,
				text: `${clinicName} is experiencing a high remake rate (${remakeRate.toFixed(1)}%). Analysis shows ${meta.clinicFaultRemakes} issues were clinic-side. Recommend reviewing their digital impression protocol.`,
				action: "Review Technical Prefs",
				metrics: [
					{ label: "Remake Rate", value: `${remakeRate.toFixed(1)}%`, isPositive: false },
					{ label: "Clinic Errors", value: `${meta.clinicFaultRemakes} Cases`, isPositive: false },
				],
			};
		}

		// 2. Significant Growth
		if (scores.volume >= 100 && meta.currentCases > 5) {
			return {
				type: "POSITIVE" as const,
				text: `${clinicName} has shown strong volume retention this period. They have submitted ${meta.currentCases} cases with a perfect ${scores.logic}% on-time payment record.`,
				action: "Send Appreciation",
				metrics: [
					{ label: "Growth Trend", value: `+${scores.volume}%`, isPositive: true },
					{ label: "Payment Health", value: `${scores.logic}%`, isPositive: true },
				],
			};
		}

		// 3. Low Volume / Churn Risk
		if (meta.currentCases < meta.previousCases && meta.previousCases > 0) {
			return {
				type: "NEUTRAL" as const,
				text: `Volume from ${clinicName} has dipped by ${100 - scores.volume}% compared to the previous period. Consider an outreach call to check if they are routing cases to a competitor.`,
				action: "Schedule Call",
				metrics: [
					{ label: "Prev. Period", value: `${meta.previousCases} Cases`, isPositive: true },
					{ label: "Current", value: `${meta.currentCases} Cases`, isPositive: false },
				],
			};
		}

		// Default
		return {
			type: "NEUTRAL" as const,
			text: `Relationship with ${clinicName} is stable. Quality and payment logic are within standard lab tolerances. No immediate intervention required.`,
			action: "View Full History",
			metrics: [
				{ label: "Total Period Cases", value: meta.totalCasesInPeriod.toString(), isPositive: true },
				{ label: "Invoices Checked", value: meta.invoicesEvaluated.toString(), isPositive: true },
			],
		};
	}, [clinicName, scores, meta]);

	return (
		<div className="glass-ai-panel w-full rounded-[32px] overflow-hidden flex flex-col md:flex-row relative group animate-in fade-in zoom-in-95 duration-700">
			{/* AI Pulse Background - Color shifts based on audit type */}
			<div className={cn("absolute top-0 left-0 w-full h-1 opacity-50", audit.type === "POSITIVE" ? "bg-emerald-500" : audit.type === "WARNING" ? "bg-amber-500" : "bg-ai")} />

			{/* LEFT COLUMN: The Insight */}
			<div className="flex-1 p-6 sm:p-10 flex flex-col justify-between relative z-10">
				<div>
					<div className="flex items-center gap-3 mb-8">
						<div
							className={cn(
								"w-10 h-10 rounded-2xl flex items-center justify-center animate-ai-pulse shadow-lg",
								audit.type === "POSITIVE"
									? "bg-emerald-500/10 text-emerald-500 shadow-emerald-500/20"
									: audit.type === "WARNING"
										? "bg-amber-500/10 text-amber-500 shadow-amber-500/20"
										: "bg-ai/10 text-ai shadow-ai/20",
							)}
						>
							<BrainCircuit className="w-5 h-5" />
						</div>
						<div>
							<h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">LabOS Neural Audit</h3>
							<div className="flex items-center gap-2">
								<div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
								<span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">Real-time analysis active</span>
							</div>
						</div>
					</div>

					<h2 className="text-2xl font-bold text-foreground leading-tight tracking-tight mb-4">
						{audit.type === "POSITIVE" && <Zap className="inline w-6 h-6 mr-2 text-amber-500 fill-current" />}
						{audit.type === "WARNING" && <ShieldAlert className="inline w-6 h-6 mr-2 text-rose-500" />}
						Partner Health Verdict
					</h2>
					<p className="text-base text-muted-foreground leading-relaxed max-w-2xl font-medium">{audit.text}</p>
				</div>

				<div className="mt-10 flex flex-wrap items-center gap-4">
					<Button
						className={cn(
							"rounded-xl h-12 px-8 font-bold transition-all group shadow-lg",
							audit.type === "WARNING" ? "bg-amber-600 hover:bg-amber-700 text-white" : "bg-ai text-white shadow-ai-glow-dark hover:bg-ai/90",
						)}
					>
						{audit.action} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
					</Button>
					<Button variant="ghost" className="rounded-xl h-12 px-6 text-muted-foreground hover:text-foreground font-semibold">
						Dismiss Audit
					</Button>
				</div>
			</div>

			{/* RIGHT COLUMN: The Data Proof */}
			<div className="w-full md:w-[350px] lg:w-[400px] shrink-0 bg-slate-50/50 dark:bg-white/[0.02] border-l border-border/50 p-6 sm:p-10 flex flex-col justify-center relative overflow-hidden">
				{/* Decorative background monogram */}
				<Activity className="absolute -right-8 -bottom-8 w-48 h-48 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

				<h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-8">Intelligence Proof</h4>
				<div className="space-y-4 relative z-10">
					{audit.metrics.map((dp, i) => (
						<div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-card border border-border shadow-sm group-hover:border-primary/20 transition-colors">
							<span className="text-xs font-bold text-muted-foreground flex items-center gap-2.5">
								{dp.isPositive ? <TrendingUp className="w-4 h-4 text-emerald-500" /> : <ShieldAlert className="w-4 h-4 text-rose-500" />}
								{dp.label}
							</span>
							<span className={cn("text-sm font-mono font-black", dp.isPositive ? "text-foreground" : "text-rose-500")}>{dp.value}</span>
						</div>
					))}
					<div className="pt-4">
						<p className="text-[10px] text-muted-foreground/60 text-center italic font-medium">
							Analyzed {meta.totalCasesInPeriod} cases across {meta.period.toUpperCase()}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
});
