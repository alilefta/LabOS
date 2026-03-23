"use client";

import { Sparkles, Send, BrainCircuit, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
	technicianName: string;
}

export function TechnicianAiCopilot({ technicianName }: Props) {
	return (
		<div className="lab-card flex-1 flex flex-col overflow-hidden relative group">
			{/* AI Header */}
			<div className="p-5 border-b border-border bg-linear-to-r from-ai/10 to-transparent flex items-center gap-3">
				<div className="w-8 h-8 rounded-lg bg-ai text-white flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)]">
					<BrainCircuit className="w-4 h-4" />
				</div>
				<div>
					<h2 className="text-sm font-bold text-foreground tracking-tight">Performance Copilot</h2>
					<p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">Deep Audit: {technicianName}</p>
				</div>
			</div>

			{/* Chat History Area */}
			<div className="flex-1 p-5 overflow-y-auto custom-scrollbar flex flex-col gap-4">
				{/* Assistant Message */}
				<div className="bg-slate-50 dark:bg-white/5 border border-border rounded-2xl rounded-tl-sm p-4 shadow-sm animate-in fade-in slide-in-from-left-2">
					<p className="text-sm text-foreground leading-relaxed">I've analyzed {technicianName.split(" ")[0]}'s performance data for Q1. What would you like to explore?</p>
					<div className="mt-4 flex flex-col gap-2">
						{["Calculate ROI for this technician", "Show remake trends vs last month", "Predict next payroll with bonuses"].map((prompt, i) => (
							<button
								key={i}
								className="text-left text-[11px] text-muted-foreground hover:text-ai hover:bg-ai/5 p-2.5 rounded-xl transition-all border border-transparent hover:border-ai/20 flex items-center gap-2 group"
							>
								<MessageSquare className="w-3 h-3 text-ai/50 group-hover:text-ai" />
								{prompt}
							</button>
						))}
					</div>
				</div>

				{/* Potential Output (e.g., Mini Chart Response) */}
				<div className="flex justify-end">
					<div className="bg-primary/10 border border-primary/20 text-primary-foreground text-xs px-4 py-2 rounded-2xl rounded-tr-sm">Compare her speed to Julian Chen.</div>
				</div>
			</div>

			{/* Message Input */}
			<div className="p-4 border-t border-border bg-slate-50/50 dark:bg-white/2">
				<div className="relative">
					<input
						type="text"
						placeholder={`Ask about ${technicianName.split(" ")[0]}...`}
						className="w-full h-11 pl-4 pr-12 bg-white dark:bg-[#121214] border border-border rounded-xl text-sm focus:outline-none focus:border-ai focus:ring-1 focus:ring-ai transition-all shadow-premium"
					/>
					<Button size="icon" className="absolute right-1.5 top-1.5 w-8 h-8 rounded-lg bg-ai hover:bg-ai/90 text-white shadow-ai-glow-dark">
						<Send className="w-3.5 h-3.5" />
					</Button>
				</div>
			</div>
		</div>
	);
}
