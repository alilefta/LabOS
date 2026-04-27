"use client";

import { memo, useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";

import { CaseCategorySelector } from "../../case/case-inputs/case-category-selector";
import { CaseWorkItemManager } from "../../case/case-work-item-manager";
import { CaseFormModeType, CreateCaseInput, UpdateCaseInput } from "@/schema/composed/case.details";
import { CaseCategoryDetailsUI } from "@/schema/composed/case-category.details";

interface Props {
	mode: CaseFormModeType;
	handleOpenCreateCategorySheet: () => void;
	newCreatedCategory: CaseCategoryDetailsUI | null;
}

export const HierarchicalClinicalPicker = memo(function HierarchicalClinicalPicker({ mode, handleOpenCreateCategorySheet, newCreatedCategory }: Props) {
	const { setValue } = useFormContext<CreateCaseInput | UpdateCaseInput>();

	// Local state to track name for the Manager display
	const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);

	const handleCategorySelect = useCallback(
		(id: string, catName: string) => {
			setValue("caseCategoryId", id, { shouldValidate: true, shouldDirty: true });
			setSelectedCategoryName(catName);
		},
		[setValue],
	);

	return (
		<section className="space-y-8">
			<div className="flex items-center gap-3">
				<div className="w-1.5 h-6 bg-primary rounded-full" />
				<h2 className="text-xl font-bold tracking-tight text-foreground">Clinical Prescription</h2>
			</div>

			<CaseCategorySelector mode={mode} onCreateNew={handleOpenCreateCategorySheet} newCreatedCategory={newCreatedCategory} onSelect={handleCategorySelect} />

			<CaseWorkItemManager mode={mode} categoryName={selectedCategoryName} />
		</section>
	);
});
