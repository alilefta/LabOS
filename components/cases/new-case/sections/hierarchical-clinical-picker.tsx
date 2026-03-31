"use client";

import { CaseCategoryDetailsUI } from "@/schema/composed/case-category.details";
import { CaseCategorySelector } from "../../case/case-category-selector";
import { CaseWorkItemManager } from "../../case/case-work-item-manager";
import { CreateCaseInput } from "@/schema/composed/case.details";
import { useFormContext } from "react-hook-form";
import { useCallback } from "react";

interface Props {
	handleOpenCreateCategorySheet: () => void;
	newCreatedCategory: CaseCategoryDetailsUI | null;
}
export function HierarchicalClinicalPicker({ handleOpenCreateCategorySheet, newCreatedCategory }: Props) {
	const form = useFormContext<CreateCaseInput>();

	const handleCategorySelect = useCallback(
		(id: string) => {
			form.setValue("caseCategoryId", id, { shouldValidate: true });
		},
		[form],
	);

	return (
		<section className="space-y-8">
			<div className="flex items-center gap-3">
				<div className="w-1.5 h-6 bg-primary rounded-full" />
				<h2 className="text-xl font-bold tracking-tight">Clinical Prescription</h2>
			</div>

			<CaseCategorySelector onCreateNew={handleOpenCreateCategorySheet} newCreatedCategory={newCreatedCategory} onSelect={(id) => handleCategorySelect(id)} />
			<CaseWorkItemManager />
		</section>
	);
}
