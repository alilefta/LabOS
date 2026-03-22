"use client";

import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardAiInsight() {
	return (
		<div className="bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-indigo-900/40 dark:to-purple-900/40 border border-transparent dark:border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden shadow-ai-glow flex-1 flex flex-col justify-between group">
			{/* Glassmorphic Background Decor */}
			<div className="absolute top-0 right-0 w-48 h-48 bg-white/10 dark:bg-indigo-500/20 blur-2xl rounded-full translate-x-12 -translate-y-12 group-hover:bg-white/20 transition-colors duration-700"></div>

			<div className="relative z-10">
				<div className="flex items-center gap-2 mb-6">
					<div className="w-2 h-2 rounded-full bg-blue-200 dark:bg-indigo-400 animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)] dark:shadow-[0_0_8px_rgba(129,140,248,1)]"></div>
					<span className="text-[11px] font-bold text-blue-100 dark:text-indigo-300 tracking-widest uppercase">LabOS Neural Engine</span>
				</div>

				<h3 className="text-xl font-bold text-white mb-3 tracking-tight">Anomaly Detected</h3>

				<p className="text-sm text-blue-50 dark:text-zinc-300 leading-relaxed font-medium mb-6">
					Analyzing <strong className="text-white font-mono bg-white/10 px-1 rounded">5,000</strong> recent cases... <br />
					<br />
					Zirconia remakes correlate highly with <span className="text-white border-b border-white/30 border-dashed">&quot;shade mismatch&quot;</span> tags originating from Avicena Clinic
					over the last 72 hours.
				</p>
			</div>

			<div className="relative z-10 mt-auto pt-6 border-t border-white/10 flex flex-col gap-3">
				<Button className="w-full bg-white text-blue-600 hover:bg-slate-100 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:border dark:border-white/10 font-bold rounded-xl h-11 transition-all shadow-lg">
					<Sparkles className="w-4 h-4 mr-2" />
					Query Root Cause
				</Button>
				<Button variant="ghost" className="w-full text-blue-100 hover:text-white hover:bg-white/10 rounded-xl h-11 text-sm font-medium">
					Dismiss
					<ArrowRight className="w-4 h-4 ml-2 opacity-50" />
				</Button>
			</div>
		</div>
	);
}
