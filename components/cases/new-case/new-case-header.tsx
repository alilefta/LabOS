"use client";

import { ChevronLeft, Save, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function NewCaseHeader({ isSubmitForReviewEnabled, onSaveDraft }: { isSubmitForReviewEnabled: boolean; onSaveDraft: () => void }) {
	return (
		<header className="shrink-0 flex items-center justify-between mb-8 sticky top-0 z-20 bg-background/80 backdrop-blur-md pb-4 border-b border-border/50">
			<div className="flex items-center gap-4">
				<Link href="/cases">
					<Button variant="outline" size="icon" className="rounded-xl border-border bg-transparent">
						<ChevronLeft className="w-4 h-4" />
					</Button>
				</Link>
				<div>
					<h1 className="text-2xl font-bold tracking-tight text-foreground">Register New Case</h1>
					<p className="text-sm text-muted-foreground mt-0.5">Define patient requirements and manufacturing specs.</p>
				</div>
			</div>

			<div className="flex items-center gap-3">
				<Button variant="ghost" onClick={onSaveDraft} className="rounded-xl font-semibold text-muted-foreground hover:text-foreground">
					<Save className="w-4 h-4 mr-2" /> Save Draft
				</Button>
				<Button
					// disabled={isSubmitForReviewEnabled} // to be activated later
					className="rounded-xl bg-primary text-primary-foreground px-6 font-bold shadow-premium hover:bg-primary/90"
					type="submit"
					form="new-case-submission-form"
				>
					<Sparkles className="w-4 h-4 mr-2" /> Review & Submit
				</Button>
			</div>
		</header>
	);
}
