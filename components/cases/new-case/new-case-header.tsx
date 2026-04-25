"use client";

import { Check, ChevronLeft, LoaderCircle, Save, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CaseFormModeType, CreateCaseInput, UpdateCaseInput } from "@/schema/composed/case.details";
import { Control, useWatch } from "react-hook-form";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface CaseFormHeaderProps {
	mode: CaseFormModeType;
	caseNumber?: string; // Only provided in edit mode
	isSavingDraft: boolean;
	isSubmittingCase: boolean;
	onSaveDraft: () => void;
	control: Control<any>; // Using any here to accommodate both Create and Update schemas
}

export function CaseFormHeader({ control, isSavingDraft, isSubmittingCase, onSaveDraft, mode, caseNumber }: CaseFormHeaderProps) {
	// ── FORM STATE WATCHERS ──────────────────────────────────────────
	// In edit mode, patientId is immutable but we still watch it for the enablement logic
	const patientId = useWatch({ control, name: "patientId" });
	const clinicId = useWatch({ control, name: "clinicId" });
	const caseCategoryId = useWatch({ control, name: "caseCategoryId" });
	const deadline = useWatch({ control, name: "deadline" });
	const caseWorkItems = useWatch({ control, name: "caseWorkItems" });

	// ── DYNAMIC COPY ──────────────────────────────────────────────────
	const isEdit = mode === "edit";
	const title = isEdit ? `Edit Case #${caseNumber}` : "Register New Case";
	const subtitle = isEdit ? "Update clinical requirements and production logistics." : "Define patient requirements and manufacturing specs.";

	const primaryButtonLabel = isEdit ? "Save Changes" : "Review & Submit";

	// ── BUTTON LOGIC ──────────────────────────────────────────────────
	// 1. Draft requires ONLY a patient (Only applicable in create mode)
	const isSaveDraftEnabled = !isEdit && !!patientId;

	// 2. Submit requires full core logic
	const isSubmitEnabled = useMemo(() => {
		const items = caseWorkItems ?? [];
		const hasValidWorkItems = items.some((item) => item.productId && item.casePricingPlanId);

		// In Edit mode, patientId is already defined in the DB, but RHF will have it in defaultValues
		return !!patientId && !!clinicId && !!caseCategoryId && !!deadline && hasValidWorkItems;
	}, [patientId, clinicId, caseCategoryId, deadline, caseWorkItems]);

	return (
		<header className="shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 sticky top-0 z-20 bg-background/80 backdrop-blur-xl pt-4 pb-4 border-b border-border">
			{/* LEFT: Title & Context */}
			<div className="flex items-start sm:items-center gap-3 sm:gap-4">
				<Link href={isEdit ? `/cases/${(control as Control<UpdateCaseInput>)._defaultValues.caseId}` : "/cases"} className="shrink-0 mt-0.5 sm:mt-0">
					<Button
						variant="outline"
						size="icon"
						className="rounded-xl border-border bg-white dark:bg-white/5 shadow-sm hover:bg-slate-50 dark:hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-10 transition-colors"
					>
						<ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-zinc-400" />
					</Button>
				</Link>
				<div className="flex flex-col min-w-0">
					<h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground line-clamp-1">{title}</h1>
					<p className="text-xs sm:text-sm text-muted-foreground mt-0.5 line-clamp-1">{subtitle}</p>
				</div>
			</div>

			{/* RIGHT: Actions */}
			<div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto mt-1 md:mt-0">
				{/* 1. SAVE DRAFT (Only visible in create mode) */}
				{!isEdit && (
					<Button
						variant="ghost"
						onClick={onSaveDraft}
						type="button"
						disabled={!isSaveDraftEnabled || isSavingDraft}
						className="flex-1 md:flex-none rounded-xl font-semibold text-muted-foreground hover:text-foreground h-10 px-3 sm:px-4 bg-slate-50 dark:bg-white/2 md:bg-transparent border border-transparent md:border-none hover:border-border transition-all"
					>
						{isSavingDraft ? <LoaderCircle className="w-4 h-4 mr-1.5 animate-spin" /> : <Save className="w-4 h-4 mr-1.5 sm:mr-2 shrink-0" />}
						<span className="truncate">{isSavingDraft ? "Saving..." : "Save Draft"}</span>
					</Button>
				)}

				{/* 2. SUBMIT / SAVE CHANGES */}
				<Button
					disabled={!isSubmitEnabled || isSubmittingCase}
					className={cn(
						"flex-2 md:flex-none rounded-xl h-10 px-4 sm:px-6 font-bold shadow-premium transition-all",
						isEdit ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-primary text-primary-foreground hover:bg-primary/90",
					)}
					type="submit"
					form="new-case-submission-form"
				>
					{isSubmittingCase ? (
						<LoaderCircle className="w-4 h-4 mr-1.5 animate-spin" />
					) : isEdit ? (
						<Check className="w-4 h-4 mr-1.5 sm:mr-2 shrink-0" />
					) : (
						<Sparkles className="w-4 h-4 mr-1.5 sm:mr-2 shrink-0" />
					)}
					<span className="truncate">{isSubmittingCase ? (isEdit ? "Updating..." : "Submitting...") : primaryButtonLabel}</span>
				</Button>
			</div>
		</header>
	);
}
