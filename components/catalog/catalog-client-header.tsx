'use client'

import { memo, useState } from 'react'
import { Plus, Shapes, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Modals
import { CreateCategorySheet } from '@/components/modals/case-category/create-case-category-sheet'
import { CreateWorkTypeSheet } from '@/components/modals/work-type/create-work-type-sheet'
import { useClinicalCreationStore } from '@/store/use-clinical-creation-store'

interface Props {
	isCategoriesEmpty: boolean
}

export const CatalogClientHeader = memo(function CatalogClientHeader({
	isCategoriesEmpty,
}: Props) {
	const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false)
	const openWorkTypeSheet = useClinicalCreationStore(
		(state) => state.openWorkTypeSheet,
	)

	return (
		<>
			{/* --- ACTION BUTTONS --- */}
			<div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto mt-2 md:mt-0 justify-end">
				{/* 1. NEW CATEGORY (Always active) */}
				<Button
					variant="outline"
					onClick={() => setIsCategorySheetOpen(true)}
					className="h-10 rounded-xl border-border bg-white dark:bg-white/5 text-foreground font-semibold shadow-sm hover:bg-slate-50 dark:hover:bg-white/10 transition-all flex-1 sm:flex-none px-4"
				>
					<Shapes className="w-4 h-4 mr-2 text-muted-foreground" />
					<span className="truncate">New Category</span>
				</Button>

				{/* 2. NEW WORK TYPE (Disabled until at least 1 Category exists) [1] */}
				<Button
					onClick={() => openWorkTypeSheet()}
					disabled={isCategoriesEmpty}
					className={cn(
						'h-10 rounded-xl font-bold transition-all flex-1 sm:flex-none px-6',
						isCategoriesEmpty
							? 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-zinc-500 cursor-not-allowed border border-border/50 shadow-none'
							: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-premium',
					)}
				>
					<Layers className="w-4 h-4 mr-1.5" />
					<span className="truncate">New Work Type</span>
				</Button>
			</div>

			{/* --- GLOBAL SHEETS --- */}
			<CreateCategorySheet
				isOpen={isCategorySheetOpen}
				onClose={() => setIsCategorySheetOpen(false)}
			/>

			<CreateWorkTypeSheet />
		</>
	)
})

CatalogClientHeader.displayName = 'CatalogClientHeader'
