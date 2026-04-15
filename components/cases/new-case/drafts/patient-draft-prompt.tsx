"use client";

import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight, FileClock, X } from "lucide-react";

interface PatientDraftPromptProps {
	caseNumber: string;
	lastSavedAt: Date;
	onResume: () => void;
	onDismiss: () => void;
}

export function PatientDraftPrompt({ caseNumber, lastSavedAt, onResume, onDismiss }: PatientDraftPromptProps) {
	return (
		<div className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-500 relative overflow-hidden group shadow-sm">
			<div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/10 blur-2xl rounded-full pointer-events-none transition-opacity group-hover:bg-amber-500/20"></div>

			<div className="flex items-start sm:items-center gap-3 relative z-10">
				<div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
					<FileClock className="w-5 h-5" />
				</div>
				<div className="flex flex-col min-w-0">
					<p className="text-sm font-bold text-foreground">Draft found for this patient</p>
					<p className="text-xs text-muted-foreground font-medium mt-0.5 truncate">
						Case <span className="font-mono">{caseNumber}</span> · saved {formatDistanceToNow(lastSavedAt, { addSuffix: true })}
					</p>
				</div>
			</div>

			<div className="flex items-center gap-2 w-full sm:w-auto relative z-10">
				<Button type="button" variant="ghost" size="sm" onClick={onDismiss} className="flex-1 sm:flex-none h-9 rounded-lg text-muted-foreground hover:text-foreground text-xs font-semibold">
					Start Fresh
				</Button>
				<Button
					type="button"
					size="sm"
					onClick={onResume}
					className="flex-2 sm:flex-none h-9 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-5 shadow-sm transition-all"
				>
					Resume Draft <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
				</Button>
			</div>

			{/* Mobile dismiss icon */}
			<button type="button" title="dismiss" onClick={onDismiss} className="absolute top-3 right-3 p-1 text-muted-foreground sm:hidden">
				<X className="w-4 h-4" />
			</button>
		</div>
	);
}
