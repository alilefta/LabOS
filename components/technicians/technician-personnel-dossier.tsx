"use client";

import { Sparkles, DollarSign, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TechnicianPersonnelDossier() {
	return (
		<div className="lab-card flex-1 flex flex-col overflow-hidden">
			<div className="p-6 border-b border-border bg-slate-50/50 dark:bg-white/2">
				<div className="flex items-center gap-2 mb-4">
					<div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
						<DollarSign className="w-4 h-4" />
					</div>
					<h3 className="text-sm font-bold uppercase tracking-wider">Payroll Insights</h3>
				</div>

				<div className="space-y-1">
					<div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Est. Monthly Liability</div>
					<div className="text-3xl font-mono font-bold text-foreground">$124,500.00</div>
				</div>
			</div>

			<div className="p-6 flex-1 space-y-6 overflow-y-auto custom-scrollbar">
				{/* AI Insight Card */}
				<div className="glass-ai-panel p-4 rounded-2xl relative overflow-hidden group">
					<div className="flex items-center gap-2 mb-3">
						<Sparkles className="w-4 h-4 text-ai animate-ai-pulse" />
						<span className="text-[10px] font-bold uppercase text-ai">Resource Alert</span>
					</div>
					<p className="text-xs font-medium leading-relaxed mb-4">
						Elena Vance is at <span className="text-rose-500 font-bold">95% capacity</span>. Estimated burnout risk: <span className="font-bold">High</span>. AI suggests re-routing 3 new
						E-Max cases to Julian.
					</p>
					<Button variant="outline" size="sm" className="w-full text-[10px] h-8 font-bold border-ai/20 hover:bg-ai/5 hover:text-ai">
						Auto-Balance Workload
					</Button>
				</div>

				{/* Efficiency Stats */}
				<div className="grid grid-cols-2 gap-4">
					<div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-border">
						<div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground mb-1">
							<Clock className="w-3 h-3" /> AVG. TURNAROUND
						</div>
						<div className="text-lg font-mono font-bold">2.4d</div>
					</div>
					<div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-border">
						<div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground mb-1">
							<TrendingUp className="w-3 h-3" /> BONUS POOL
						</div>
						<div className="text-lg font-mono font-bold text-emerald-500">$1.2k</div>
					</div>
				</div>
			</div>
		</div>
	);
}
