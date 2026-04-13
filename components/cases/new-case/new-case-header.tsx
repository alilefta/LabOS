"use client";

import { ChevronLeft, LoaderCircle, Save, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
	isSubmitForReviewEnabled: boolean;
	isSaveDraftEnabled: boolean;
	isSavingDraft: boolean;
	isSubmittingCase: boolean;
	onSaveDraft: () => void;
	onSubmitCaseForReview: () => void;
}

export function NewCaseHeader({ isSubmitForReviewEnabled, isSaveDraftEnabled, isSavingDraft, isSubmittingCase, onSaveDraft, onSubmitCaseForReview }: Props) {
	return (
		<header className="shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 sticky top-0 z-20 bg-background/80 backdrop-blur-xl pt-4 pb-4 border-b border-border">
			{/* LEFT: Title & Context */}
			<div className="flex items-start sm:items-center gap-3 sm:gap-4">
				<Link href="/cases" className="shrink-0 mt-0.5 sm:mt-0">
					<Button
						variant="outline"
						size="icon"
						className="rounded-xl border-border bg-white dark:bg-white/5 shadow-sm hover:bg-slate-50 dark:hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-10 transition-colors"
					>
						<ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-zinc-400" />
					</Button>
				</Link>
				<div className="flex flex-col min-w-0">
					{/* line-clamp-1 prevents the title/subtitle from wrapping awkwardly on extremely small screens like iPhone SE */}
					<h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground line-clamp-1">Register New Case</h1>
					<p className="text-xs sm:text-sm text-muted-foreground mt-0.5 line-clamp-1">Define patient requirements and manufacturing specs.</p>
				</div>
			</div>

			{/* RIGHT: Actions (Stacked & stretched on mobile, inline on desktop) */}
			<div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto mt-1 md:mt-0">
				<Button
					variant="ghost"
					onClick={onSaveDraft}
					type="button"
					// disabled={!isSaveDraftEnabled || isSavingDraft}
					className="flex-1 md:flex-none rounded-xl font-semibold text-muted-foreground hover:text-foreground h-10 px-3 sm:px-4 bg-slate-50 dark:bg-white/2 md:bg-transparent border border-transparent md:border-none hover:border-border transition-all"
				>
					{isSavingDraft ? <LoaderCircle className="w-4 h-4 mr-1.5 animate-spin" /> : <Save className="w-4 h-4 mr-1.5 sm:mr-2 shrink-0" />}
					<span className="truncate">{isSavingDraft ? "Saving..." : "Save Draft"}</span>
				</Button>

				<Button
					disabled={!isSubmitForReviewEnabled || isSubmittingCase}
					className="flex-2 md:flex-none rounded-xl bg-primary text-primary-foreground h-10 px-4 sm:px-6 font-bold shadow-premium hover:bg-primary/90 transition-all"
					type="submit"
					form="new-case-submission-form"
					onClick={onSubmitCaseForReview}
				>
					{isSubmittingCase ? <LoaderCircle className="w-4 h-4 mr-1.5 animate-spin" /> : <Sparkles className="w-4 h-4 mr-1.5 sm:mr-2 shrink-0" />}
					<span className="truncate">{isSubmittingCase ? "Submitting..." : "Review & Submit"}</span>
				</Button>
			</div>
		</header>
	);
}
