"use client";

import { useState } from "react";
import { Plus, Trash2, Layers, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormContext, useFieldArray } from "react-hook-form";
import { CreateCaseInput } from "@/schema/composed/case.details";
import { WorkItemEditorModal } from "@/components/modals/cases/work-items/work-item-editor-modal";
// import { WorkItemEditorSheet } from "./work-item-editor-sheet"; // We will build this next

export function CaseWorkItemManager() {
	const { control, watch } = useFormContext<CreateCaseInput>();
	const { fields, append, update, remove } = useFieldArray({
		control,
		name: "caseWorkItems",
	});

	const selectedCategoryId = watch("caseCategoryId");

	// null = closed, -1 = adding new, >= 0 = editing existing
	const [editingIndex, setEditingIndex] = useState<number | null>(null);

	return (
		<section className="space-y-4">
			<div className="flex items-center justify-between">
				<h3 className="text-[13px] font-semibold text-slate-700 dark:text-zinc-300">2. Case Work Items</h3>
				<Button
					type="button"
					variant="outline"
					size="sm"
					disabled={!selectedCategoryId}
					onClick={() => setEditingIndex(-1)}
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
					const hasTeeth = item.selectedTeeth?.length > 0;

					return (
						<div key={field.id} className="p-4 bg-card border border-border rounded-2xl flex items-center justify-between group hover:border-primary/40 transition-colors shadow-sm">
							<div className="flex items-center gap-4">
								<span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 text-muted-foreground text-xs font-bold flex items-center justify-center border border-border">
									#{index + 1}
								</span>
								<div>
									<div className="flex items-center gap-2">
										<span className="text-sm font-bold text-foreground">{item.productId ? `Product ID: ${item.productId}` : "Incomplete Work Item"}</span>
										<span className="text-[9px] font-bold text-muted-foreground bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded-md uppercase">{item.jawType}</span>
									</div>
									<p className="text-[11px] text-primary font-mono font-medium mt-1">{hasTeeth ? `Teeth: ${item.selectedTeeth.join(", ")}` : "No teeth mapped"}</p>
								</div>
							</div>

							<div className="flex items-center gap-4">
								<div className="text-right">
									<p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Est. Total</p>
									<p className="text-sm font-mono font-bold text-emerald-500">${Number(item.totalPrice || 0).toFixed(2)}</p>
								</div>
								<div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
									<Button type="button" variant="ghost" size="icon" onClick={() => setEditingIndex(index)} className="h-8 w-8 text-muted-foreground hover:text-primary">
										<Edit2 className="w-4 h-4" />
									</Button>
									<Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
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
				onClose={() => setEditingIndex(null)}
				// Provide existing data if editing, or defaults if adding new
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
