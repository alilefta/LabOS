"use client";

import { useState } from "react";
import { Sparkles, MessageSquareText, FileSearch, ArrowRight, Send, TrendingUp, AlertTriangle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onActionClick: (intent: string) => void;
}

export function AiCopilotSheet({ isOpen, onClose, onActionClick }: Props) {
	const [prompt, setPrompt] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!prompt.trim()) return;

		// Pass the typed prompt to the parent, then clear the input
		onActionClick(prompt);
		setPrompt("");
	};

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className="sm:max-w-md! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* --- HEADER --- */}
				<SheetHeader className="p-6 sm:p-8 border-b border-border bg-linear-to-br from-ai/5 to-transparent relative overflow-hidden shrink-0">
					<div className="absolute top-0 right-0 p-8 opacity-10">
						<MessageSquareText className="w-24 h-24 text-ai" />
					</div>
					<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-ai/10 flex items-center justify-center text-ai mb-4 shadow-ai-glow-light">
						<Sparkles className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
					</div>
					<SheetTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">LabOS Copilot</SheetTitle>
					<SheetDescription className="text-xs sm:text-sm text-muted-foreground font-medium max-w-[90%]">
						Ask plain-english questions to instantly filter and query your massive database.
					</SheetDescription>
				</SheetHeader>

				{/* --- SCROLLABLE BODY --- */}
				<div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar bg-slate-50/30 dark:bg-transparent relative">
					{/* Ambient AI Glow in the background */}
					<div className="absolute top-0 right-0 w-64 h-64 bg-ai/5 rounded-full blur-3xl pointer-events-none"></div>

					{/* 1. PROACTIVE LAB ANALYTICS (TOP) */}
					<div className="space-y-3 relative z-10">
						<h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
							<TrendingUp className="w-3.5 h-3.5" /> Proactive Insights
						</h3>
						<div className="p-5 rounded-2xl bg-ai/5 border border-ai/20 shadow-sm">
							<div className="flex items-start gap-3">
								<AlertTriangle className="w-4 h-4 text-ai shrink-0 mt-0.5" />
								<div>
									<p className="text-sm text-foreground leading-relaxed font-medium">
										Based on the last 30 days, your average turnaround time for Zirconia is <strong className="text-ai font-mono">3.2 Days</strong>. You have{" "}
										<strong className="text-foreground">14 cases</strong> at risk of missing the afternoon courier dispatch.
									</p>
									<Button onClick={() => onActionClick("at_risk")} className="w-full mt-4 h-9 rounded-xl bg-ai hover:bg-ai/90 text-white font-bold text-xs shadow-md transition-all">
										Show At-Risk Cases
									</Button>
								</div>
							</div>
						</div>
					</div>

					{/* 2. SUGGESTED QUERIES (MIDDLE) */}
					<div className="space-y-3 relative z-10">
						<h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
							<FileSearch className="w-3.5 h-3.5" /> Try Asking...
						</h3>

						<div className="flex flex-col gap-2.5">
							<button
								onClick={() => onActionClick("processing")}
								className="text-left text-xs sm:text-sm font-medium text-foreground hover:text-ai bg-white dark:bg-[#121214] p-4 rounded-2xl transition-all border border-border hover:border-ai/30 shadow-sm flex items-start justify-between group"
							>
								<span>&quot;Show me all cases currently in Milling/Production.&quot;</span>
								<ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-ai transition-all mt-0.5 shrink-0" />
							</button>

							<button
								onClick={() => onActionClick("zirconia")}
								className="text-left text-xs sm:text-sm font-medium text-foreground hover:text-ai bg-white dark:bg-[#121214] p-4 rounded-2xl transition-all border border-border hover:border-ai/30 shadow-sm flex items-start justify-between group"
							>
								<span>&quot;Find all Zirconia cases from Apex Dental.&quot;</span>
								<ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-ai transition-all mt-0.5 shrink-0" />
							</button>
						</div>
					</div>
				</div>

				{/* --- STICKY CHAT INPUT (BOTTOM) --- */}
				<div className="p-4 sm:p-6 border-t border-border bg-background shrink-0">
					<form onSubmit={handleSubmit} className="relative group">
						{/* Subtle glowing ring behind input on focus */}
						<div className="absolute -inset-0.5 bg-linear-to-r from-ai/40 to-primary/40 rounded-2xl blur opacity-0 group-focus-within:opacity-30 transition duration-500"></div>

						<div className="relative flex items-center w-full bg-slate-50 dark:bg-[#121214] border border-border rounded-2xl p-1 shadow-sm transition-all group-focus-within:border-ai/50 group-focus-within:bg-background">
							<input
								type="text"
								value={prompt}
								onChange={(e) => setPrompt(e.target.value)}
								placeholder="Ask anything about your cases..."
								className="flex-1 h-12 bg-transparent border-none outline-none px-4 text-sm font-medium text-foreground placeholder:text-muted-foreground/70"
							/>
							<Button
								type="submit"
								size="icon"
								disabled={!prompt.trim()}
								className={cn(
									"w-10 h-10 rounded-xl shrink-0 transition-all duration-300",
									prompt.trim() ? "bg-ai hover:bg-ai/90 text-white shadow-md shadow-ai/20 scale-100" : "bg-slate-200 dark:bg-white/5 text-muted-foreground scale-95 opacity-80",
								)}
							>
								<Send className="w-4 h-4 ml-0.5" />
							</Button>
						</div>
					</form>
					<p className="text-[10px] text-center text-muted-foreground mt-3 font-medium">LabOS AI can make mistakes. Always verify clinical data.</p>
				</div>
			</SheetContent>
		</Sheet>
	);
}
