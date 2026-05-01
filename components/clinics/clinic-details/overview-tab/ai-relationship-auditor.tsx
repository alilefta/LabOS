"use client";

import { BrainCircuit, ArrowRight, ShieldAlert, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AiRelationshipAuditorProps {
	clinicName: string;
	// In production, these would be derived from your backend analytics engine
	insightType: "POSITIVE" | "WARNING" | "NEUTRAL";
	insightText: string;
	recommendedAction: string;
	dataPoints: { label: string; value: string; isPositive: boolean }[];
}

export function AiRelationshipAuditor({ clinicName, insightType, insightText, recommendedAction, dataPoints }: AiRelationshipAuditorProps) {
	return (
		<div className="glass-ai-panel w-full rounded-[32px] overflow-hidden flex flex-col md:flex-row relative group">
			{/* AI Pulse Background */}
			<div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-ai/50 to-transparent opacity-50" />

			{/* LEFT COLUMN: The Insight */}
			<div className="flex-1 p-6 sm:p-8 flex flex-col justify-between relative z-10">
				<div>
					<div className="flex items-center gap-3 mb-6">
						<div className="w-8 h-8 rounded-full bg-ai/10 flex items-center justify-center text-ai animate-ai-pulse shadow-[0_0_15px_rgba(139,92,246,0.2)]">
							<BrainCircuit className="w-4 h-4" />
						</div>
						<h3 className="text-[11px] font-bold uppercase tracking-widest text-ai">LabOS Neural Engine</h3>
					</div>

					<h2 className="text-xl sm:text-2xl font-bold text-foreground leading-snug tracking-tight mb-2">Relationship Audit: {clinicName}</h2>
					<p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{insightText}</p>
				</div>

				<div className="mt-8 flex items-center gap-4">
					<Button className="rounded-xl h-11 px-6 bg-ai text-white shadow-ai-glow-dark font-bold hover:bg-ai/90 transition-all">
						{recommendedAction} <ArrowRight className="w-4 h-4 ml-2" />
					</Button>
					<Button variant="ghost" className="rounded-xl h-11 px-4 text-muted-foreground hover:text-foreground font-semibold">
						Dismiss Insight
					</Button>
				</div>
			</div>

			{/* RIGHT COLUMN: The Data Proof */}
			<div className="w-full md:w-[350px] lg:w-[400px] shrink-0 bg-slate-50/50 dark:bg-black/20 border-l border-border/50 p-6 sm:p-8 flex flex-col justify-center">
				<h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-6">Supporting Metrics (90 Days)</h4>
				<div className="space-y-4">
					{dataPoints.map((dp, i) => (
						<div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-card border border-border shadow-sm">
							<span className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
								{dp.isPositive ? <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> : <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />}
								{dp.label}
							</span>
							<span className={cn("text-sm font-mono font-bold", dp.isPositive ? "text-foreground" : "text-rose-500 dark:text-rose-400")}>{dp.value}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
