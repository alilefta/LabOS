"use client";

import { useState, useEffect } from "react";
import { FileClock, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

export interface DraftSummary {
	id: string;
	caseNumber: string;
	patientName: string;
	clinicName: string | null;
	lastSavedAt: Date | string; // Handled safely in case the DB returns a stringified date
}

interface Props {
	drafts: DraftSummary[];
	onResumeDraft: (draftId: string) => void;
}

export function DraftRecoveryBanner({ drafts, onResumeDraft }: Props) {
	const [isVisible, setIsVisible] = useState(true);
	const mounted = useState(() => true);

	// // Prevent Next.js hydration mismatch on relative dates
	// useEffect(() => {
	// 	setMounted(true);
	// }, []);

	// If there are no drafts or the user dismissed the banner, render nothing
	if (!isVisible || drafts.length === 0) return null;

	const latestDraft = drafts[0];

	return (
		<div className="mb-8 p-4 sm:p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-500 relative overflow-hidden group">
			{/* Ambient Background Glow */}
			<div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full pointer-events-none transition-opacity group-hover:bg-indigo-500/20"></div>

			<div className="flex items-start sm:items-center gap-3 sm:gap-4 relative z-10">
				<div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
					<FileClock className="w-5 h-5" />
				</div>
				<div className="flex flex-col">
					<h3 className="text-sm font-bold text-foreground">Unsaved Draft Detected</h3>
					<p className="text-xs text-muted-foreground font-medium mt-0.5">
						You have a pending case for <strong className="text-foreground">{latestDraft.patientName || "an unknown patient"}</strong> saved{" "}
						{mounted ? formatDistanceToNow(new Date(latestDraft.lastSavedAt), { addSuffix: true }) : "recently"}.
					</p>
				</div>
			</div>

			<div className="flex items-center gap-2 w-full sm:w-auto relative z-10">
				<Button
					variant="ghost"
					type="button"
					size="icon"
					onClick={() => setIsVisible(false)}
					className="h-9 w-9 shrink-0 text-muted-foreground hover:text-foreground hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg hidden sm:flex"
				>
					<X className="w-4 h-4" />
				</Button>

				<Button
					type="button"
					onClick={() => onResumeDraft(latestDraft.id)}
					className="w-full sm:w-auto h-9 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md transition-all px-5"
				>
					Resume Case <ArrowRight className="w-4 h-4 ml-1.5" />
				</Button>
			</div>

			{/* Mobile Dismiss (Absolute Top Right) */}
			<button type="button" title="Dismiss" onClick={() => setIsVisible(false)} className="absolute top-3 right-3 p-1 text-muted-foreground sm:hidden">
				<X className="w-4 h-4" />
			</button>
		</div>
	);
}
