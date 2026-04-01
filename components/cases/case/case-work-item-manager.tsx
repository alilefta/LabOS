"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Trash2, Layers, AlertCircle, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormContext, useFieldArray } from "react-hook-form";
import { CreateCaseInput } from "@/schema/composed/case.details";
import { WorkItemEditorModal } from "@/components/modals/cases/work-items/work-item-editor-modal";
import { cn } from "@/lib/utils";
import { TeethQuadrantSummary } from "./teeth-quadrant-summary";
import { CreateCaseWorkItemInput } from "@/schema/composed/case-work-item.details";

// 1. UNIVERSAL NUMBERING DICTIONARY
// Maps the long Prisma Enum to the Universal Tooth Number (1-32)
// const TOOTH_NUMBER_MAP: Record<string, number> = {
// 	UpperRightThirdMolar: 1,
// 	UpperRightSecondMolar: 2,
// 	UpperRightFirstMolar: 3,
// 	UpperRightSecondPremolar: 4,
// 	UpperRightFirstPremolar: 5,
// 	UpperRightCanine: 6,
// 	UpperRightLateralIncisor: 7,
// 	UpperRightCentralIncisor: 8,
// 	UpperLeftCentralIncisor: 9,
// 	UpperLeftLateralIncisor: 10,
// 	UpperLeftCanine: 11,
// 	UpperLeftFirstPremolar: 12,
// 	UpperLeftSecondPremolar: 13,
// 	UpperLeftFirstMolar: 14,
// 	UpperLeftSecondMolar: 15,
// 	UpperLeftThirdMolar: 16,
// 	LowerLeftThirdMolar: 17,
// 	LowerLeftSecondMolar: 18,
// 	LowerLeftFirstMolar: 19,
// 	LowerLeftSecondPremolar: 20,
// 	LowerLeftFirstPremolar: 21,
// 	LowerLeftCanine: 22,
// 	LowerLeftLateralIncisor: 23,
// 	LowerLeftCentralIncisor: 24,
// 	LowerRightCentralIncisor: 25,
// 	LowerRightLateralIncisor: 26,
// 	LowerRightCanine: 27,
// 	LowerRightFirstPremolar: 28,
// 	LowerRightSecondPremolar: 29,
// 	LowerRightFirstMolar: 30,
// 	LowerRightSecondMolar: 31,
// 	LowerRightThirdMolar: 32,
// };

export function CaseWorkItemManager() {
	const { control, watch } = useFormContext<CreateCaseInput>();
	const { fields, append, update, remove } = useFieldArray({
		control,
		name: "caseWorkItems",
	});

	const selectedCategoryId = watch("caseCategoryId");

	useEffect(() => {
		console.log("Current Case Category Id", selectedCategoryId);
	}, [selectedCategoryId]);

	// null = closed, -1 = adding new, >= 0 = editing existing
	const [editingIndex, setEditingIndex] = useState<number | null>(null);

	const getProductName = (id: string | null) => {
		if (!id) return "Incomplete Work Item";
		// Example: return products.find(p => p.id === id)?.name || id;
		return `Product ${id.substring(0, 4)}...`;
	};

	// 2. SMART "ADD" LOGIC
	// SMART "ADD" LOGIC
	const handleAddOrEditEmpty = () => {
		// Check if the very first item is completely blank (from defaultValues)
		if (fields.length === 1 && !watch("caseWorkItems.0.productId")) {
			setEditingIndex(0); // Edit the blank one instead of duplicating
		} else {
			setEditingIndex(-1); // Add a new one
		}
	};

	const handleSaveData = useCallback(
		(data: CreateCaseWorkItemInput) => {
			if (editingIndex === -1) append(data);
			else if (editingIndex !== null) update(editingIndex, data);
			setEditingIndex(null);
		},
		[append, update, editingIndex],
	);

	useEffect(() => {
		console.group("Current Fields:", fields, "Current Category:", selectedCategoryId);
	}, [watch("caseWorkItems")]);

	// --- CRITICAL BUG FIX: RHF Flush Cycle Desync ---
	// We actively check the watch state instead of relying purely on fields.length
	// This guarantees the empty state shows up instantly when remove() is called.
	const activeItems = fields.map((_, index) => watch(`caseWorkItems.${index}`)).filter(Boolean);
	const isEmpty = activeItems.length === 0;

	return (
		<section className="space-y-4">
			<div className="flex items-center justify-between">
				<h3 className="text-[13px] font-semibold text-slate-700 dark:text-zinc-300">2. Case Work Items</h3>
				<Button
					type="button"
					variant="outline"
					size="sm"
					disabled={!selectedCategoryId}
					onClick={handleAddOrEditEmpty}
					className="rounded-xl border-dashed border-primary/50 text-primary hover:bg-primary/5 font-bold"
				>
					<Plus className="w-4 h-4 mr-2" /> Add Work Item
				</Button>
			</div>

			<div className="space-y-3">
				{/* --- EMPTY STATE --- */}
				{isEmpty && (
					<div className="h-32 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center bg-slate-50/50 dark:bg-white/2 animate-in fade-in zoom-in-95 duration-300">
						<div className="w-10 h-10 rounded-xl bg-white dark:bg-[#121214] border border-border shadow-sm flex items-center justify-center mb-3">
							<Layers className="w-5 h-5 text-slate-400 dark:text-zinc-500" />
						</div>
						<p className="text-sm font-bold text-foreground">No work items added.</p>
						<p className="text-[11px] text-muted-foreground mt-1">Select a category above, then add items.</p>
					</div>
				)}

				{/* --- SUMMARY CARDS --- */}
				{!isEmpty &&
					fields.map((field, index) => {
						const item = watch(`caseWorkItems.${index}`);
						// 2. CRITICAL BUG FIX: Safe return during array flush cycles
						if (!item) return null;

						const hasTeeth = item && item.selectedTeeth && item.selectedTeeth?.length > 0;
						const isComplete = (item && !!item.productId) || false;

						return (
							<div
								key={field.id}
								onClick={() => setEditingIndex(index)}
								className={cn(
									"p-4 sm:p-5 bg-card border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between group shadow-sm gap-4 cursor-pointer transition-all duration-200 relative overflow-hidden",
									isComplete ? "border-border hover:border-primary/40 hover:shadow-md" : "border-amber-500/30 hover:border-amber-500/60 bg-amber-500/5",
								)}
							>
								{/* Hover Edit Indicator (Subtle Desktop UX) */}
								<div className="absolute top-0 right-0 bottom-0 w-8 bg-linear-to-l from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block" />

								<div className="flex items-start gap-4">
									<span
										className={cn(
											"w-8 h-8 shrink-0 rounded-xl text-xs font-bold flex items-center justify-center border",
											isComplete
												? "bg-slate-100 dark:bg-[#121214] text-muted-foreground border-border group-hover:text-primary group-hover:border-primary/30 transition-colors"
												: "bg-amber-500/20 text-amber-600 border-amber-500/20",
										)}
									>
										#{index + 1}
									</span>

									<div className="flex flex-col gap-1.5">
										<div className="flex flex-wrap items-center gap-2">
											<span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{getProductName(item.productId ?? null)}</span>
											<span
												className={cn(
													"text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider",
													item.jawType === "UPPER"
														? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
														: item.jawType === "LOWER"
															? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
															: "bg-slate-200/50 text-slate-600 dark:bg-white/10 dark:text-zinc-400",
												)}
											>
												{item.jawType}
											</span>
										</div>
										<div className={cn("text-[11px] font-medium", hasTeeth ? "text-primary font-mono" : "text-muted-foreground")}>
											<TeethQuadrantSummary selectedTeeth={item.selectedTeeth} />
										</div>
									</div>
								</div>

								<div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto border-t sm:border-t-0 border-border pt-4 sm:pt-0 mt-2 sm:mt-0 relative z-10">
									{!isComplete ? (
										<div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-500 text-[11px] font-bold px-2.5 py-1 bg-amber-500/10 rounded-md">
											<AlertCircle className="w-3.5 h-3.5" /> Config Required
										</div>
									) : (
										<div className="text-left sm:text-right">
											<p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Est. Total</p>
											<p className="text-sm font-mono font-bold text-emerald-500">${Number(item.totalPrice || 0).toFixed(2)}</p>
										</div>
									)}

									<div className="flex items-center gap-1">
										{/* Mobile Edit Button (Visible only on small screens for better touch targets) */}
										<Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 sm:hidden rounded-lg">
											<Edit2 className="w-4 h-4" />
										</Button>

										{/* Delete Button: Always visible, subtle until hovered */}
										<Button
											type="button"
											variant="ghost"
											size="icon"
											onClick={(e) => {
												e.stopPropagation(); // Prevents opening the modal when clicking delete
												remove(index);
											}}
											className="h-8 w-8 rounded-lg text-slate-400 dark:text-zinc-600 hover:text-destructive hover:bg-destructive/10 bg-slate-50 dark:bg-white/2 sm:bg-transparent transition-all"
										>
											<Trash2 className="w-4 h-4" />
										</Button>
									</div>
								</div>
							</div>
						);
					})}
			</div>

			{/* --- THE EDITOR SHEET --- */}
			<WorkItemEditorModal
				isOpen={editingIndex !== null}
				selectedCategoryId={selectedCategoryId}
				onClose={() => setEditingIndex(null)}
				initialData={editingIndex !== null && editingIndex >= 0 ? watch(`caseWorkItems.${editingIndex}`) : null}
				onSave={handleSaveData}
			/>
		</section>
	);
}
