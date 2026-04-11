"use client";

import { CaseCategoryDetailsUI } from "@/schema/composed/case-category.details";
import { CaseCategorySelector } from "../../case/case-inputs/case-category-selector";
import { CaseWorkItemManager } from "../../case/case-work-item-manager";
import { CreateCaseInput } from "@/schema/composed/case.details";
import { useFormContext } from "react-hook-form";
import { memo, useCallback, useState } from "react";

interface Props {
	handleOpenCreateCategorySheet: () => void;
	newCreatedCategory: CaseCategoryDetailsUI | null;
}
export const HierarchicalClinicalPicker = memo(function HierarchicalClinicalPicker({ handleOpenCreateCategorySheet, newCreatedCategory }: Props) {
	const { setValue } = useFormContext<CreateCaseInput>();
	const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);

	const handleCategorySelect = useCallback(
		(id: string, catName: string) => {
			setValue("caseCategoryId", id, { shouldValidate: true });

			setSelectedCategoryName(catName);
		},
		[setValue],
	);

	return (
		<section className="space-y-8">
			<div className="flex items-center gap-3">
				<div className="w-1.5 h-6 bg-primary rounded-full" />
				<h2 className="text-xl font-bold tracking-tight">Clinical Prescription</h2>
			</div>

			<CaseCategorySelector onCreateNew={handleOpenCreateCategorySheet} newCreatedCategory={newCreatedCategory} onSelect={handleCategorySelect} />
			<CaseWorkItemManager categoryName={selectedCategoryName} />
		</section>
	);
});
