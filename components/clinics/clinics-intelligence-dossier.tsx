"use client";

import { Sparkles, Phone, Mail, FileText, ChevronRight, AlertTriangle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ClinicsIntelligenceDossier() {
	return (
		<div className="lab-card flex-1 flex flex-col overflow-hidden relative group">
			{/* Profile Header */}
			<div className="p-6 text-center border-b border-border bg-slate-50/30 dark:bg-white/1">
				<div className="relative inline-block mb-4">
					<div className="w-20 h-20 rounded-[24px] bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold border border-primary/20 shadow-ai-glow-light dark:shadow-ai-glow-dark">
						AD
					</div>
					<div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-4 border-card flex items-center justify-center">
						<div className="w-2 h-2 rounded-full bg-white animate-pulse" />
					</div>
				</div>
				<h2 className="text-xl font-bold text-foreground tracking-tight">Apex Dental Design</h2>
				<p className="text-sm text-muted-foreground font-medium mb-4">Partner since Jan 2024</p>

				<div className="flex items-center justify-center gap-2">
					<Button variant="outline" size="sm" className="h-8 rounded-lg text-xs font-semibold px-3">
						<Mail className="w-3.5 h-3.5 mr-1.5" /> Email
					</Button>
					<Button variant="outline" size="sm" className="h-8 rounded-lg text-xs font-semibold px-3">
						<Phone className="w-3.5 h-3.5 mr-1.5" /> Call
					</Button>
				</div>
			</div>

			{/* AI Health Summary Card */}
			<div className="p-5">
				<div className="glass-ai-panel p-5 rounded-2xl relative overflow-hidden group/ai transition-all hover:shadow-ai-glow-light dark:hover:shadow-ai-glow-dark">
					{/* Subtle AI Glow Background */}
					<div className="absolute -top-10 -left-10 w-24 h-24 bg-ai/10 rounded-full blur-2xl pointer-events-none" />

					<div className="flex items-center gap-2 mb-3">
						<div className="w-7 h-7 rounded-lg bg-ai/20 flex items-center justify-center text-ai animate-ai-pulse">
							<Sparkles className="w-4 h-4" />
						</div>
						<span className="text-[10px] font-bold uppercase tracking-widest text-ai">Neural Health Audit</span>
					</div>

					<p className="text-sm font-medium leading-relaxed text-foreground mb-4">
						Apex is currently at <span className="text-emerald-500 font-bold">98% efficiency</span>. However, we detected a <span className="text-ai text-glow-ai">12% increase</span> in
						<span className="font-bold"> Zirconia Remakes</span> over 48 hours.
					</p>

					<div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl flex items-start gap-3">
						<AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
						<p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium leading-normal">Action Required: Review scan margins for Case #L-4492 from this clinic.</p>
					</div>
				</div>
			</div>

			{/* Metrics List */}
			<div className="px-5 space-y-3 flex-1 overflow-y-auto custom-scrollbar pb-6">
				<h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Performance Details</h4>

				{[
					{ label: "Avg. Turnaround", value: "3.2 Days", trend: "-0.5", icon: TrendingUp, good: true },
					{ label: "Remake Rate", value: "1.4%", trend: "+0.2", icon: AlertTriangle, good: false },
					{ label: "Digital Readiness", value: "94%", trend: "+2.0", icon: Sparkles, good: true },
				].map((stat, i) => (
					<div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 dark:bg-white/2 border border-border">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground">
								<stat.icon className="w-4 h-4" />
							</div>
							<span className="text-xs font-semibold text-foreground">{stat.label}</span>
						</div>
						<div className="text-right">
							<div className="text-sm font-mono font-bold text-foreground">{stat.value}</div>
							<div className={cn("text-[10px] font-bold", stat.good ? "text-emerald-500" : "text-rose-500")}>{stat.trend}</div>
						</div>
					</div>
				))}

				<Button variant="ghost" className="w-full text-xs font-bold text-muted-foreground hover:text-primary transition-colors h-10 rounded-xl mt-4">
					View Complete Financial Ledger <ChevronRight className="w-4 h-4 ml-1" />
				</Button>
			</div>
		</div>
	);
}
