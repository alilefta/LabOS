'use client'

import { useState, useCallback, useMemo, useEffect, memo } from 'react'
import Link from 'next/link'
import {
	ChevronRight,
	Layers,
	AlertCircle,
	Plus,
	FolderPlus,
	Compass,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useClinicalCreationStore } from '@/store/use-clinical-creation-store'
import { CatalogTreeDTO } from '@/schema/composed/catalog/catalog.dtos'

interface Props {
	tree: CatalogTreeDTO
	activeWorkTypeId?: string
	onAddCategory?: () => void // Triggered from the sidebar's empty state
}

export const CatalogBrowserTree = memo(function CatalogBrowserTree({
	tree,
	activeWorkTypeId,
	onAddCategory,
}: Props) {
	const openWorkTypeSheet = useClinicalCreationStore(
		(state) => state.openWorkTypeSheet,
	)

	// ── 1. ONBOARDING METRICS ───────────────────────────────────────────────
	// Calculate the total number of work types across the entire lab
	const totalWorkTypesCount = useMemo(() => {
		return tree.reduce((sum, cat) => sum + cat.workTypes.length, 0)
	}, [tree])

	// State B: Categories exist, but 0 departments (skeleton database)
	const isSkeletonState = tree.length > 0 && totalWorkTypesCount === 0

	// ── 2. ACCORDION STATE ──────────────────────────────────────────────────
	const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
		new Set(),
	)

	// Auto-expand logic based on database state
	useEffect(() => {
		if (isSkeletonState) {
			// FORCE-EXPAND ALL: If the lab has no departments, open all folders so they see the skeleton
			setExpandedCategories(new Set(tree.map((c) => c.id)))
		} else if (activeWorkTypeId) {
			// CONTEXT HYDRATION: Open the folder containing the active URL param
			const parentCategory = tree.find((cat) =>
				cat.workTypes.some((wt) => wt.id === activeWorkTypeId),
			)

			if (parentCategory) {
				setExpandedCategories((prev) => {
					const next = new Set(prev)
					next.add(parentCategory.id)
					return next
				})
			}
		}
	}, [activeWorkTypeId, isSkeletonState, tree])

	const toggleCategory = useCallback((categoryId: string) => {
		setExpandedCategories((prev) => {
			const next = new Set(prev)
			if (next.has(categoryId)) next.delete(categoryId)
			else next.add(categoryId)
			return next
		})
	}, [])

	// ── 3. STATE A: THE EMPTY LAB ONBOARDING ────────────────────────────────
	if (tree.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-border rounded-2xl bg-slate-50/50 dark:bg-white/1 animate-in fade-in zoom-in-95 duration-500">
				<div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 shadow-sm animate-pulse">
					<FolderPlus className="w-6 h-6" />
				</div>
				<h4 className="text-sm font-bold text-foreground">
					Step 1: Create Category
				</h4>
				<p className="text-[11px] text-muted-foreground mt-1.5 max-w-50 leading-relaxed">
					Your manufacturing catalog is empty. Let's create your first clinical
					department (e.g. Fixed Prosthetics).
				</p>
				{onAddCategory && (
					<Button
						type="button"
						onClick={onAddCategory}
						className="mt-5 h-9 rounded-xl bg-primary text-primary-foreground font-bold text-[11px] px-4 shadow-premium"
					>
						<Plus className="w-3.5 h-3.5 mr-1.5" /> Create Category
					</Button>
				)}
			</div>
		)
	}

	return (
		<div className="flex flex-col gap-1.5 w-full animate-in fade-in slide-in-from-left-4 duration-500">
			{/* --- EYE-TRACKING WAYFINDING DOT (Only if no active selection) --- */}
			{!activeWorkTypeId && !isSkeletonState && (
				<div className="p-3 rounded-xl bg-primary/5 border border-primary/10 flex items-center gap-2 mb-2 animate-in slide-in-from-top-2">
					<Compass className="w-4 h-4 text-primary shrink-0 animate-spin-slow" />
					<p className="text-[10px] text-muted-foreground font-medium">
						Click a <strong className="text-foreground">Department</strong>{' '}
						below to manage its inventory.
					</p>
				</div>
			)}

			{tree.map((category) => {
				const isOpen = expandedCategories.has(category.id)
				const isEmptyCategory = category.workTypes.length === 0

				return (
					<div key={category.id} className="flex flex-col w-full">
						{/* --- CATEGORY HEADER (Folder) --- */}
						<button
							onClick={() => toggleCategory(category.id)}
							className={cn(
								'flex items-center gap-3 w-full p-2.5 rounded-xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 group text-left',
								isOpen
									? 'bg-slate-50 dark:bg-white/2'
									: 'hover:bg-slate-50 dark:hover:bg-white/2',
							)}
						>
							<ChevronRight
								className={cn(
									'w-4 h-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]',
									isOpen
										? 'rotate-90 text-foreground'
										: 'text-muted-foreground group-hover:text-foreground',
								)}
							/>

							{category.imageUrl ? (
								<img
									src={category.imageUrl}
									alt={category.name}
									className="w-6 h-6 object-contain rounded-md"
								/>
							) : (
								<div className="w-6 h-6 rounded-md bg-slate-100 dark:bg-white/5 border border-border flex items-center justify-center text-[10px] font-bold text-muted-foreground uppercase">
									{category.name.charAt(0)}
								</div>
							)}

							<span
								className={cn(
									'text-sm font-bold truncate flex-1 transition-colors duration-300',
									isOpen
										? 'text-foreground'
										: 'text-muted-foreground group-hover:text-foreground',
								)}
							>
								{category.name}
							</span>
						</button>

						{/* --- WORK TYPES LIST (CSS Grid Slide-down) --- */}
						<div
							className={cn(
								'grid transition-all duration-300 ease-in-out',
								isOpen
									? 'grid-rows-[1fr] opacity-100 mt-1'
									: 'grid-rows-[0fr] opacity-0 mt-0',
							)}
						>
							<div className="overflow-hidden min-h-0">
								<div className="flex flex-col gap-1 relative pb-2">
									{/* Vertical Guideline */}
									<div className="absolute top-0 bottom-3 left-4.75 w-px bg-border/50" />

									{isEmptyCategory ? (
										/* --- SKELETON INLINE ACTION --- */
										<div className="pl-10 pr-3 py-1 flex items-center justify-between gap-4 text-muted-foreground">
											<div className="flex items-center gap-1.5 opacity-60">
												<AlertCircle className="w-3.5 h-3.5 shrink-0" />
												<span className="text-[10px] font-medium italic">
													Empty
												</span>
											</div>
											<Button
												type="button"
												variant="ghost"
												onClick={() =>
													openWorkTypeSheet(category.id, category.name)
												}
												className="h-7 px-2.5 rounded-lg border border-dashed border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 font-bold text-[10px] transition-all"
											>
												<Plus className="w-3 h-3 mr-1" /> Add Dept
											</Button>
										</div>
									) : (
										category.workTypes.map((wt) => {
											const isActive = activeWorkTypeId === wt.id
											const hasMissingProducts = wt.productCount === 0

											return (
												<Link
													key={wt.id}
													href={`/catalog?workTypeId=${wt.id}`}
													replace
													className={cn(
														'flex items-center justify-between pl-10 pr-3 py-2 rounded-xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 relative group/wt',
														isActive
															? 'bg-primary/10 text-primary'
															: 'text-slate-500 dark:text-zinc-400 hover:text-foreground hover:bg-slate-50 dark:hover:bg-white/2',
													)}
												>
													{/* Glowing Active Marker */}
													{isActive && (
														<div className="absolute left-[18.5px] top-1/2 -translate-y-1/2 w-0.5 h-1/2 bg-primary rounded-full shadow-[0_0_8px_var(--color-primary)]" />
													)}

													<span
														className={cn(
															'text-xs font-bold truncate pr-2',
															isActive && 'text-primary',
														)}
													>
														{wt.name}
													</span>

													{/* Count Badge (Warns in Amber if 0) */}
													<span
														className={cn(
															'text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md border shrink-0 transition-all',
															hasMissingProducts
																? 'bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20'
																: isActive
																	? 'bg-primary/20 text-primary border-primary/30'
																	: 'bg-slate-100 dark:bg-white/5 text-muted-foreground border-border group-hover/wt:border-slate-300 dark:group-hover/wt:border-white/10',
														)}
													>
														{wt.productCount}
													</span>
												</Link>
											)
										})
									)}
								</div>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
})

CatalogBrowserTree.displayName = 'CatalogBrowserTree'
