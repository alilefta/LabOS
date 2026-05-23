"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCopilotStore } from "@/store/ai-copilot/use-copilot-store";
import { CopilotMode } from "@/schema/composed/ai-copilot/suggestions";

interface Props {
	mode: CopilotMode;
	className?: string;
}

export function AskAiButton({ mode, className }: Props) {
	const openCopilot = useCopilotStore((s) => s.openCopilot);

	// Dynamic styling based on mode to match your schemas!
	const themeClass =
		mode === "INVOICES"
			? "border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500"
			: mode === "CLINICS"
				? "border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary"
				: "border-ai/30 bg-ai/5 hover:bg-ai/10 text-ai";

	return (
		<Button onClick={() => openCopilot(mode)} variant="outline" className={cn("h-10 rounded-xl font-semibold shadow-sm transition-all hidden sm:flex", themeClass, className)}>
			<Sparkles className="w-4 h-4 mr-2" /> Ask AI
		</Button>
	);
}
