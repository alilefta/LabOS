// components/cases/new-case/drafts/patient-draft-prompt.tsx

import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight, FileClock } from "lucide-react";

interface PatientDraftPromptProps {
	caseNumber: string;
	lastSavedAt: Date;
	onResume: () => void;
	onDismiss: () => void;
}

export function PatientDraftPrompt({ caseNumber, lastSavedAt, onResume, onDismiss }: PatientDraftPromptProps) {
	return (
		<div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
			<div className="flex items-center gap-3">
				<div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
					<FileClock className="w-4 h-4" />
				</div>
				<div>
					<p className="text-sm font-bold text-foreground">Draft found for this patient</p>
					<p className="text-xs text-muted-foreground font-medium mt-0.5">
						{caseNumber} · saved {formatDistanceToNow(lastSavedAt, { addSuffix: true })}
					</p>
				</div>
			</div>
			<div className="flex items-center gap-2 shrink-0">
				<Button variant="ghost" size="sm" onClick={onDismiss} className="h-8 rounded-lg text-muted-foreground hover:text-foreground text-xs">
					Start Fresh
				</Button>
				<Button size="sm" onClick={onResume} className="h-8 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-4">
					Resume <ArrowRight className="w-3.5 h-3.5 ml-1" />
				</Button>
			</div>
		</div>
	);
}
