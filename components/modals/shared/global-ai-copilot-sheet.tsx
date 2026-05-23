"use client";

import { useState } from "react";
import { MessageSquareText, FileSearch, ArrowRight, Send, TrendingUp, AlertTriangle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CopilotMode, COPILOT_REGISTRY } from "@/schema/composed/ai-copilot/suggestions";

interface Props {
	isOpen: boolean;
	mode: CopilotMode; // Context-aware prop
	onClose: () => void;
	onActionClick: (intent: string) => void;
}

export function GlobalAiCopilotSheet({ isOpen, mode, onClose, onActionClick }: Props) {
	const [prompt, setPrompt] = useState("");
	const config = COPILOT_REGISTRY[mode];

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!prompt.trim()) return;

		onActionClick(prompt);
		setPrompt("");
	};

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className="sm:max-w-md! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* --- HEADER (Dynamic) --- */}
				<SheetHeader className={cn("p-6 sm:p-8 border-b border-border relative overflow-hidden shrink-0 bg-linear-to-br", config.bgGradient)}>
					<div className="absolute top-0 right-0 p-8 opacity-10">
						<MessageSquareText className={config.themeColor} width={96} height={96} />
					</div>
					<div className={cn("w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center mb-4 bg-background shadow-sm border border-border", config.themeColor)}>
						<config.icon className="w-5 h-5 sm:w-6 sm:h-6" />
					</div>
					<SheetTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">{config.title}</SheetTitle>
					<SheetDescription className="text-xs sm:text-sm text-muted-foreground font-medium max-w-[90%]">{config.description}</SheetDescription>
				</SheetHeader>

				{/* --- SCROLLABLE BODY --- */}
				<div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar bg-slate-50/30 dark:bg-transparent relative">
					{/* 1. PROACTIVE INSIGHT (Dynamic) */}
					<div className="space-y-3 relative z-10">
						<h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
							<TrendingUp className="w-3.5 h-3.5" /> Proactive Insights
						</h3>
						<div className={cn("p-5 rounded-2xl border bg-background shadow-sm", `border-${config.themeColor.split("-")[1]}/20`)}>
							<div className="flex items-start gap-3">
								<AlertTriangle className={cn("w-4 h-4 shrink-0 mt-0.5", config.themeColor)} />
								<div>
									<p className="text-sm text-foreground leading-relaxed font-medium">{config.proactiveInsight}</p>
									<Button onClick={() => onActionClick("insight_action")} className={cn("w-full mt-4 h-9 rounded-xl font-bold text-xs transition-all text-white", config.glowClass)}>
										Investigate Further
									</Button>
								</div>
							</div>
						</div>
					</div>

					{/* 2. SUGGESTED QUERIES (Dynamic) */}
					<div className="space-y-3 relative z-10">
						<h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
							<FileSearch className="w-3.5 h-3.5" /> Try Asking...
						</h3>

						<div className="flex flex-col gap-2.5">
							{config.suggestions.map((suggestion) => (
								<button
									key={suggestion.id}
									onClick={() => onActionClick(suggestion.id)}
									className="text-left text-xs sm:text-sm font-medium text-foreground bg-white dark:bg-[#121214] p-4 rounded-2xl transition-all border border-border shadow-sm flex items-start justify-between group hover:border-foreground/20"
								>
									<span
										className={cn(
											"group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r",
											config.themeColor === "text-ai" ? "from-ai to-primary" : config.themeColor === "text-emerald-500" ? "from-emerald-500 to-primary" : "from-primary to-ai",
										)}
									>
										{suggestion.text}
									</span>
									<ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all mt-0.5 shrink-0" />
								</button>
							))}
						</div>
					</div>
				</div>

				{/* --- STICKY CHAT INPUT --- */}
				<div className="p-4 sm:p-6 border-t border-border bg-background shrink-0">
					<form onSubmit={handleSubmit} className="relative group">
						<div
							className={cn(
								"relative flex items-center w-full bg-slate-50 dark:bg-[#121214] border border-border rounded-2xl p-1 shadow-sm transition-all group-focus-within:bg-background",
								`group-focus-within:border-${config.themeColor.split("-")[1]}/50`,
							)}
						>
							<input
								type="text"
								value={prompt}
								onChange={(e) => setPrompt(e.target.value)}
								placeholder={`Ask anything about your ${mode.toLowerCase()}...`}
								className="flex-1 h-12 bg-transparent border-none outline-none px-4 text-sm font-medium text-foreground placeholder:text-muted-foreground/70"
							/>
							<Button
								type="submit"
								size="icon"
								disabled={!prompt.trim()}
								className={cn(
									"w-10 h-10 rounded-xl shrink-0 transition-all duration-300 text-white",
									prompt.trim() ? cn("scale-100", config.glowClass) : "bg-slate-200 dark:bg-white/5 text-muted-foreground scale-95 opacity-80",
								)}
							>
								<Send className="w-4 h-4 ml-0.5" />
							</Button>
						</div>
					</form>
				</div>
			</SheetContent>
		</Sheet>
	);
}
