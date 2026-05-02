"use client";

import { Check, ChevronLeft, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { Control, useWatch, useFormState } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UpdateCaseInput } from "@/schema/composed/case.details";

interface EditCaseFormHeaderProps {
	caseId: string; // <-- PRO-TIP: Pass this explicitly from the parent!
	caseNumber: string;
	isSubmittingCase: boolean;
	control: Control<UpdateCaseInput>;
}

export function EditCaseFormHeader({ control, isSubmittingCase, caseNumber, caseId }: EditCaseFormHeaderProps) {
	// ── 1. FORM METADATA ──────────────────────────────────────────────
	// Capture isDirty so we don't allow saving if nothing was changed
	const { isDirty, isValidating } = useFormState({ control });

	// ── 2. FORM STATE WATCHERS ────────────────────────────────────────
	const clinicId = useWatch({ control, name: "clinicId" });
	const caseCategoryId = useWatch({ control, name: "caseCategoryId" });
	const deadline = useWatch({ control, name: "deadline" });
	const caseWorkItems = useWatch({ control, name: "caseWorkItems" });

	// ── 3. VALIDATION LOGIC ───────────────────────────────────────────
	const isSubmitEnabled = useMemo(() => {
		const items = caseWorkItems ?? [];
		const hasValidWorkItems = items.some((item) => item.productId && item.casePricingPlanId);

		return !!clinicId && !!caseCategoryId && !!deadline && hasValidWorkItems && isDirty && !isValidating;
	}, [clinicId, caseCategoryId, deadline, caseWorkItems, isDirty, isValidating]);

	return (
		<header className="shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 sticky top-0 z-30 bg-background/80 backdrop-blur-xl pt-4 pb-4 px-4 sm:px-8 border-b border-border shadow-sm">
			{/* LEFT: Title & Context */}
			<div className="flex items-start sm:items-center gap-3 sm:gap-4">
				<Link href={`/cases/${caseId}`} className="shrink-0 mt-0.5 sm:mt-0">
					<Button
						variant="outline"
						size="icon"
						className="rounded-xl border-border bg-white dark:bg-white/5 shadow-sm hover:bg-slate-50 dark:hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-10 transition-colors"
					>
						<ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-zinc-400" />
					</Button>
				</Link>
				<div className="flex flex-col min-w-0">
					<h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground line-clamp-1">Edit Case #{caseNumber}</h1>
					<p className="text-xs sm:text-sm text-muted-foreground mt-0.5 line-clamp-1">Update clinical requirements and production logistics.</p>
				</div>
			</div>

			{/* RIGHT: Action */}
			<div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto mt-1 md:mt-0">
				{/* SUBMIT / SAVE CHANGES */}
				<Button
					disabled={!isSubmitEnabled || isSubmittingCase}
					className={cn(
						"flex-2 md:flex-none rounded-xl h-10 px-4 sm:px-6 font-bold shadow-premium transition-all",
						// Only show the bright emerald if it's actually dirty and ready to save!
						isSubmitEnabled ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-zinc-500 cursor-not-allowed",
					)}
					type="submit"
					form="edit-case-submission-form"
				>
					{isSubmittingCase ? <LoaderCircle className="w-4 h-4 mr-1.5 animate-spin" /> : <Check className="w-4 h-4 mr-1.5 sm:mr-2 shrink-0" />}
					<span className="truncate">{isSubmittingCase ? "Saving Changes..." : "Save Changes"}</span>
				</Button>
			</div>
		</header>
	);
}
