"use client";

import { useState } from "react";
import { Plus, Trash2, Layers, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormContext, useFieldArray } from "react-hook-form";
import { CreateCaseInput } from "@/schema/composed/case.details";
import { WorkItemEditorModal } from "@/components/modals/cases/work-items/work-item-editor-modal";
import { cn } from "@/lib/utils";
import { TeethQuadrantSummary } from "./teeth-quadrant-summary";
import { filterGraphicalNotStackedItems } from "recharts/types/state/selectors/axisSelectors";

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

	// null = closed, -1 = adding new, >= 0 = editing existing
	const [editingIndex, setEditingIndex] = useState<number | null>(null);

	const getProductName = (id: string | null) => {
		if (!id) return "Incomplete Work Item";
		// Example: return products.find(p => p.id === id)?.name || id;
		return `Product ${id.substring(0, 4)}...`;
	};

	// 2. SMART "ADD" LOGIC
	const handleAddOrEditEmpty = () => {
		// Check if the very first item is completely blank (from defaultValues)
		if (fields.length === 1 && !watch("caseWorkItems.0.productId")) {
			setEditingIndex(0); // Edit the blank one instead of duplicating
		} else {
			setEditingIndex(-1); // Add a new one
		}
	};

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
				{fields.length === 0 && (
					<div className="h-32 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center bg-slate-50/50 dark:bg-white/1">
						<Layers className="w-6 h-6 text-slate-300 dark:text-zinc-600 mb-2" />
						<p className="text-xs font-bold text-foreground">No work items added.</p>
						<p className="text-[10px] text-muted-foreground mt-1">Select a category above, then add items.</p>
					</div>
				)}

				{/* --- SUMMARY CARDS --- */}
				{fields.map((field, index) => {
					const item = watch(`caseWorkItems.${index}`);
					const hasTeeth = item && item.selectedTeeth && item.selectedTeeth?.length > 0;
					const isComplete = (item && !!item.productId) || false;

					// Map the object array to a sorted number array
					// const teethDisplayString = hasTeeth
					// 	? item.selectedTeeth
					// 			.map((t) => TOOTH_NUMBER_MAP[t.toothPosition || t] || "?") // Safely handle TS type
					// 			.sort((a, b) => (Number(a) || 0) - (Number(b) || 0))
					// 			.join(", ")
					// 	: "No specific teeth mapped";

					return (
						<div
							key={field.id}
							onClick={() => setEditingIndex(index)}
							className={cn(
								"p-5 bg-card border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between group shadow-sm gap-4 cursor-pointer transition-all duration-200",
								isComplete ? "border-border hover:border-primary/50 hover:shadow-md" : "border-amber-500/30 hover:border-amber-500/60 bg-amber-500/5",
							)}
						>
							<div className="flex items-start gap-4">
								<span
									className={cn(
										"w-8 h-8 shrink-0 rounded-lg text-xs font-bold flex items-center justify-center border",
										isComplete ? "bg-slate-100 dark:bg-white/5 text-muted-foreground border-border" : "bg-amber-500/20 text-amber-600 border-amber-500/20",
									)}
								>
									#{index + 1}
								</span>
								<div className="flex flex-col gap-1">
									<div className="flex flex-wrap items-center gap-2">
										<span className="text-sm font-bold text-foreground">{getProductName(item?.productId ?? null)}</span>
										<span
											className={cn(
												"text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase",
												item.jawType === "UPPER"
													? "bg-blue-500/10 text-blue-600"
													: item.jawType === "LOWER"
														? "bg-rose-500/10 text-rose-600"
														: "bg-slate-200/50 text-slate-600 dark:bg-white/10 dark:text-zinc-400",
											)}
										>
											{item.jawType}
										</span>
									</div>
									<p className={cn("text-[11px] font-medium", hasTeeth ? "text-primary font-mono" : "text-muted-foreground")}>
										{/* {hasTeeth ? `Teeth: ${teethDisplayString}` : teethDisplayString} */}
										<TeethQuadrantSummary selectedTeeth={item.selectedTeeth} />
									</p>
								</div>
							</div>

							<div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-border pt-4 sm:pt-0">
								{!isComplete ? (
									<div className="flex items-center gap-2 text-amber-600 dark:text-amber-500 text-[11px] font-bold px-3 py-1 bg-amber-500/10 rounded-md">
										<AlertCircle className="w-3.5 h-3.5" /> Requires Configuration
									</div>
								) : (
									<div className="text-left sm:text-right">
										<p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Est. Total</p>
										<p className="text-sm font-mono font-bold text-emerald-500">${Number(item.totalPrice || 0).toFixed(2)}</p>
									</div>
								)}

								<Button
									type="button"
									variant="ghost"
									size="icon"
									onClick={(e) => {
										e.stopPropagation(); // Stop the card's onClick from firing
										remove(index);
									}}
									className="h-8 w-8 text-muted-foreground hover:text-destructive bg-slate-50 dark:bg-white/5 sm:bg-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-all z-10"
								>
									<Trash2 className="w-4 h-4" />
								</Button>
							</div>
						</div>
					);
				})}
			</div>

			{/* --- THE EDITOR SHEET --- */}
			<WorkItemEditorModal
				isOpen={editingIndex !== null}
				onClose={() => setEditingIndex(null)}
				initialData={editingIndex !== null && editingIndex >= 0 ? watch(`caseWorkItems.${editingIndex}`) : null}
				onSave={(data) => {
					if (editingIndex === -1) append(data);
					else if (editingIndex !== null) update(editingIndex, data);
					setEditingIndex(null);
				}}
			/>
		</section>
	);
}
