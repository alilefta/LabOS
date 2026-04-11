"use client";

import { Sparkles, AlertCircle, CheckCircle2, Info } from "lucide-react";
import { memo } from "react";

export const CaseAiAuditor = memo(function CaseAiAuditor() {
	return (
		<div className="lab-card flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-4">
			{/* Header */}
			<div className="p-5 border-b border-border bg-linear-to-br from-ai/10 to-transparent">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-ai text-white flex items-center justify-center shadow-ai-glow-dark animate-ai-pulse">
						<Sparkles className="w-4 h-4" />
					</div>
					<div>
						<h2 className="text-sm font-bold tracking-tight">AI Clinical Auditor</h2>
						<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Real-time Validation</p>
					</div>
				</div>
			</div>

			{/* Audit Feed */}
			<div className="p-5 space-y-4">
				{/* Status: Missing Info */}
				<div className="flex gap-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
					<AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
					<p className="text-[11px] font-medium text-amber-600 dark:text-amber-400 leading-normal">
						<span className="font-bold uppercase">Incomplete:</span> No IOS scan files detected for the Upper Jaw selection.
					</p>
				</div>

				{/* Status: Clinical Advice */}
				<div className="flex gap-3 p-3 rounded-xl bg-ai/5 border border-ai/10">
					<Info className="w-4 h-4 text-ai shrink-0" />
					<p className="text-[11px] font-medium text-muted-foreground leading-normal">
						<span className="text-ai font-bold uppercase">Note:</span> Zirconia cases for <span className="text-foreground">Dr. Sarah Mitchell</span> usually require a
						&quot;High-Translucency&quot; finish.
					</p>
				</div>

				{/* Status: Ready */}
				<div className="flex gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 opacity-50">
					<CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
					<p className="text-[11px] font-medium text-muted-foreground leading-normal">
						Pricing strategy: <span className="text-foreground font-bold">Bulk Discount</span> applied (3+ Teeth).
					</p>
				</div>
			</div>

			{/* Case Total Preview */}
			<div className="mt-auto p-5 border-t border-border bg-slate-50/50 dark:bg-white/2">
				<div className="flex justify-between items-center mb-1">
					<span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Est. Grand Total</span>
					<span className="text-2xl font-mono font-bold text-foreground">$1,240.00</span>
				</div>
				<p className="text-[10px] text-muted-foreground text-right italic">Includes material tax & shipping</p>
			</div>
		</div>
	);
});
