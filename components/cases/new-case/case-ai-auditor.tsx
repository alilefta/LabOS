"use client";

import { Sparkles, AlertCircle, CheckCircle2, Info, ChevronUp, ChevronDown } from "lucide-react";
import { memo, useState } from "react";
import { cn } from "@/lib/utils";

export const CaseAiAuditor = memo(function CaseAiAuditor() {
	// State to handle mobile expansion
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div
			className={cn(
				"bg-card/95 xl:bg-card backdrop-blur-xl xl:backdrop-blur-none border-t xl:border border-border xl:rounded-2xl flex flex-col overflow-hidden transition-all duration-500 ease-in-out",
				// On mobile, it looks like a bottom sheet. On desktop, it's a lab-card.
				"rounded-t-3xl xl:rounded-t-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.5)] xl:shadow-sm",
			)}
		>
			{/* --- MOBILE HEADER / COLLAPSED VIEW --- */}
			{/* Hidden on desktop. Visible on mobile. Acts as the toggle button. */}
			<div className="xl:hidden flex items-center justify-between p-5 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-white/2 transition-colors" onClick={() => setIsExpanded(!isExpanded)}>
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-xl bg-ai/10 text-ai flex items-center justify-center shadow-ai-glow-light animate-ai-pulse shrink-0">
						<Sparkles className="w-5 h-5" />
					</div>
					<div className="flex flex-col">
						<span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Est. Total</span>
						<span className="text-xl font-mono font-bold text-foreground leading-none mt-0.5">$1,240.00</span>
					</div>
				</div>
				<div className="flex items-center gap-3">
					{/* Status Indicator Bubble */}
					<span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-500 bg-amber-500/10 px-2.5 py-1.5 rounded-lg border border-amber-500/20">
						<AlertCircle className="w-3.5 h-3.5" /> 1 Alert
					</span>
					{isExpanded ? <ChevronDown className="w-5 h-5 text-muted-foreground" /> : <ChevronUp className="w-5 h-5 text-muted-foreground" />}
				</div>
			</div>

			{/* --- DESKTOP HEADER --- */}
			{/* Hidden on mobile. Static header for the sidebar. */}
			<div className="hidden xl:flex p-6 border-b border-border bg-linear-to-br from-ai/5 to-transparent items-center gap-3">
				<div className="w-10 h-10 rounded-xl bg-ai/10 text-ai flex items-center justify-center shadow-ai-glow-light animate-ai-pulse shrink-0">
					<Sparkles className="w-5 h-5" />
				</div>
				<div>
					<h2 className="text-base font-bold tracking-tight text-foreground">AI Clinical Auditor</h2>
					<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">Real-time Validation</p>
				</div>
			</div>

			{/* --- AUDIT FEED (COLLAPSIBLE ON MOBILE) --- */}
			<div
				className={cn(
					"flex-col transition-all duration-500 ease-in-out overflow-y-auto custom-scrollbar xl:flex",
					isExpanded ? "flex max-h-[50vh] border-t border-border/50" : "hidden xl:flex max-h-none",
				)}
			>
				<div className="p-5 sm:p-6 space-y-4">
					{/* Status: Missing Info */}
					<div className="flex gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 shadow-sm">
						<AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
						<p className="text-xs font-medium text-amber-700 dark:text-amber-400 leading-relaxed">
							<span className="font-bold uppercase tracking-wider text-[10px] block mb-1">Incomplete Configuration</span>
							No IOS scan files detected for the Upper Jaw selection.
						</p>
					</div>

					{/* Status: Clinical Advice */}
					<div className="flex gap-3 p-4 rounded-xl bg-ai/5 border border-ai/20 shadow-sm">
						<Info className="w-4 h-4 text-ai shrink-0 mt-0.5" />
						<p className="text-xs font-medium text-slate-600 dark:text-zinc-300 leading-relaxed">
							<span className="font-bold uppercase tracking-wider text-[10px] text-ai block mb-1">Clinical Note</span>
							Zirconia cases for <strong className="text-foreground font-semibold">Dr. Sarah Mitchell</strong> usually require a &quot;High-Translucency&quot; finish.
						</p>
					</div>

					{/* Status: Ready */}
					<div className="flex gap-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 opacity-70">
						<CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
						<p className="text-xs font-medium text-slate-600 dark:text-zinc-400 leading-relaxed">
							<span className="font-bold uppercase tracking-wider text-[10px] text-emerald-600 dark:text-emerald-500 block mb-1">Pricing Applied</span>
							Strategy: <strong className="text-foreground">Bulk Discount</strong> applied (3+ Teeth).
						</p>
					</div>
				</div>

				{/* --- DESKTOP CASE TOTAL PREVIEW --- */}
				{/* Hidden on mobile because the mobile header already shows the price! */}
				<div className="hidden xl:block mt-auto p-6 border-t border-border bg-slate-50/50 dark:bg-white/2">
					<div className="flex justify-between items-center mb-1.5">
						<span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Est. Grand Total</span>
						<span className="text-3xl font-mono font-bold text-foreground tracking-tight">$1,240.00</span>
					</div>
					<p className="text-[11px] text-muted-foreground text-right font-medium">Includes material tax & shipping</p>
				</div>
			</div>
		</div>
	);
});
