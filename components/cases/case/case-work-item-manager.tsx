"use client";

import { memo, useCallback, useState } from "react";
import { Plus, Trash2, Layers, AlertCircle, Edit2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import { CreateCaseInput } from "@/schema/composed/case.details";
import { WorkItemEditorModal } from "@/components/modals/cases/work-items/work-item-editor-modal";
import { cn } from "@/lib/utils";
import { TeethQuadrantSummary } from "./teeth-quadrant-summary";
import { CreateCaseWorkItemInput } from "@/schema/composed/case-work-item.details";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useQueryClient } from "@tanstack/react-query";
import { ProductDetailsUI } from "@/schema/composed/product.details";
import { JawType } from "@/schema/base/enums.base";
import { WorktypeDetailsUI } from "@/schema/composed/worktype.details";

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

export const CaseWorkItemManager = memo(function CaseWorkItemManager({ categoryName }: { categoryName: string | null }) {
	const { control, watch } = useFormContext<CreateCaseInput>();
	const { fields, append, update, remove } = useFieldArray({
		control,
		name: "caseWorkItems",
	});

	const selectedCategoryId = useWatch({
		control,
		name: "caseCategoryId",
	});
	const selectedClinicId = useWatch({
		control,
		name: "clinicId",
	});

	const queryClient = useQueryClient();

	// null = closed, -1 = adding new, >= 0 = editing existing
	const [editingIndex, setEditingIndex] = useState<number | null>(null);

	const getProductName = useCallback(
		(id: string | null, selectedWorkTypeId: string | null) => {
			if (!id) return "Incomplete Work Item";
			// Example: return products.find(p => p.id === id)?.name || id;

			if (selectedWorkTypeId) {
				const products = queryClient.getQueryData<ProductDetailsUI[] | undefined>(["products", selectedWorkTypeId]);
				if (products && products.length > 0) return products?.find((p) => p.id === id)?.name || `Product ${id.substring(0, 4)}...`;
			}

			return `Product ${id.substring(0, 4)}...`;
		},
		[queryClient],
	);

	const getWorkTypeName = useCallback(
		(id: string | null, selectedCategoryId: string | null, selectedJawType: JawType | null) => {
			if (!id) return "Incomplete Work Item";
			if (selectedCategoryId) {
				const worktypes = queryClient.getQueryData<WorktypeDetailsUI[] | undefined>(["workTypes", selectedCategoryId, selectedJawType]);
				if (worktypes && worktypes.length > 0) return worktypes?.find((wt) => wt.id === id)?.name || `WorkType ${id.substring(0, 4)}...`;
			}

			return `WorkType ${id.substring(0, 4)}...`;
		},
		[queryClient],
	);

	// 2. SMART "ADD" LOGIC
	const handleAddOrEditEmpty = useCallback(() => {
		// 2. SAFE WATCH: Safely check if the first item exists and has a productId
		const firstItemProductId = watch("caseWorkItems.0.productId");
		if (fields.length === 1 && !firstItemProductId) {
			setEditingIndex(0);
		} else {
			setEditingIndex(-1);
		}
	}, [fields.length, watch]);

	const handleSaveData = useCallback(
		(data: CreateCaseWorkItemInput) => {
			if (editingIndex === -1) append(data);
			else if (editingIndex !== null) update(editingIndex, data);
			setEditingIndex(null);
		},
		[append, update, editingIndex],
	);

	// --- CRITICAL BUG FIX: RHF Flush Cycle Desync ---
	// We actively check the watch state instead of relying purely on fields.length
	// This guarantees the empty state shows up instantly when remove() is called.
	// const activeItems = fields.map((_, index) => watch(`caseWorkItems.${index}`)).filter(Boolean);
	// const isEmpty = activeItems.length === 0;

	// new
	// --- CRITICAL BUG FIX: The RHF Fallback Pattern ---
	// Using fields.length is the safest way to determine if the array is empty.
	const isEmpty = fields.length === 0;
	const getInitialDataForModal = (): CreateCaseWorkItemInput | null => {
		if (editingIndex === null || editingIndex < 0) return null;

		// Safely extract the item. If watch returns undefined (because the array is optional), return null.
		const item = watch(`caseWorkItems.${editingIndex}`);
		return item ?? null;
	};

	return (
		<section className="space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="w-6 h-6 rounded-md bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">2</div>
					<h3 className="text-[15px] font-bold text-foreground tracking-tight">Select Case Items</h3>
					<TooltipProvider>
						<Tooltip delayDuration={300}>
							<TooltipTrigger asChild>
								<div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center cursor-help transition-colors hover:bg-slate-200 dark:hover:bg-white/20">
									<Info className="w-3 h-3 text-muted-foreground" />
								</div>
							</TooltipTrigger>
							<TooltipContent className="max-w-50">Case items represent the elements or jaws of the case.</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
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
					<div className="py-12 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center bg-slate-50/50 dark:bg-white/2 animate-in fade-in zoom-in-95 duration-300">
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
						// CRITICAL RHF FIX: Fallback to `field` if `watch` is undefined during a micro-render cycle
						const watchedItem = watch(`caseWorkItems.${index}`);
						const item = watchedItem || field;

						const hasTeeth = item.selectedTeeth && item.selectedTeeth.length > 0;
						const isComplete = !!item.productId;

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
											"w-8 h-8 shrink-0 rounded-xl text-xs font-bold flex items-center justify-center border transition-colors",
											isComplete
												? "bg-slate-100 dark:bg-[#121214] text-muted-foreground border-border group-hover:text-primary group-hover:border-primary/30"
												: "bg-amber-500/20 text-amber-600 border-amber-500/20",
										)}
									>
										#{index + 1}
									</span>

									<div className="flex flex-col gap-1.5">
										<div className="flex flex-wrap items-center gap-2">
											<span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
												{getWorkTypeName(item.workTypeId ?? null, selectedCategoryId ?? null, item.jawType)} - {getProductName(item.productId ?? null, item.workTypeId ?? null)}
											</span>
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
											{/* Ensure we pass the properly formatted object array to your summary component */}
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
										{/* Mobile Edit Button */}
										<Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 sm:hidden rounded-lg">
											<Edit2 className="w-4 h-4" />
										</Button>

										{/* Delete Button */}
										<Button
											type="button"
											variant="ghost"
											size="icon"
											onClick={(e) => {
												e.stopPropagation();
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
			{selectedCategoryId && (
				<WorkItemEditorModal
					isOpen={editingIndex !== null}
					selectedCategoryId={selectedCategoryId}
					selectedCategoryName={categoryName}
					onClose={() => setEditingIndex(null)}
					initialData={getInitialDataForModal()}
					onSave={handleSaveData}
					selectedClinicId={selectedClinicId ?? null}
				/>
			)}
		</section>
	);
});
