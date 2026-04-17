import { AlertCircle, CheckCircle2, ChevronRight, FileCheck, FlaskConical, Microscope, PackageCheck, Send, ShieldCheck, Sparkles, Truck } from "lucide-react";

export function NeuralAuditorCard() {
	return (
		<div className="bg-gradient-to-br from-ai/10 to-transparent border border-ai/20 rounded-[24px] p-6 shadow-ai-glow-light relative overflow-hidden group">
			<div className="absolute top-0 right-0 w-64 h-64 bg-ai/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none group-hover:bg-ai/20 transition-all duration-700"></div>

			<div className="flex items-start gap-4 relative z-10">
				<div className="w-12 h-12 rounded-2xl bg-ai/10 flex items-center justify-center text-ai shrink-0 border border-ai/20 shadow-inner">
					<Sparkles className="w-6 h-6 animate-pulse" />
				</div>
				<div className="flex-1 min-w-0">
					<div className="flex items-center justify-between mb-1">
						<h3 className="text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
							Neural Auditor <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] border border-emerald-500/20">Clear</span>
						</h3>
						<span className="text-[10px] text-muted-foreground font-medium">Scanned 2 mins ago</span>
					</div>
					<p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
						Clinical parameters verified. Material selection (Zirconia) is optimal for the prescribed posterior span. Margin lines on the attached STL appear fully defined. No historical
						remake correlation detected for this clinic/product combination.
					</p>
					<div className="mt-4 flex gap-3">
						<button className="text-[11px] font-bold text-ai hover:text-ai/80 transition-colors uppercase tracking-wider flex items-center gap-1">
							View detailed analysis <ChevronRight className="w-3 h-3" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
