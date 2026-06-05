'use client'

import { useState, useCallback, useMemo, useEffect, memo } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import {
	ChevronRight,
	Layers,
	AlertCircle,
	Plus,
	FolderPlus,
	Compass,
	MoreHorizontal,
	Edit3,
	Archive,
	Trash2,
	Zap,
	RotateCcw,
	Lock,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useClinicalCreationStore } from '@/store/use-clinical-creation-store'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CatalogTreeDTO } from '@/schema/composed/catalog/catalog.dtos'

interface Props {
	tree: CatalogTreeDTO
	activeWorkTypeId?: string
	onAddCategory?: () => void
}

export const CatalogBrowserTree = memo(function CatalogBrowserTree({
	tree,
	activeWorkTypeId,
	onAddCategory,
}: Props) {
	const router = useRouter()
	const searchParams = useSearchParams()
	const openWorkTypeSheet = useClinicalCreationStore(
		(state) => state.openWorkTypeSheet,
	)

	// ── 1. THE "GHOST VIEW" RECONCILIATION ──
	// Read if we should show archived items directly from the URL [3]
	const showArchived = searchParams.get('showArchived') === 'true'

	// Filter the tree locally based on the archived toggle [3]
	const visibleTree = useMemo(() => {
		return tree
			.filter((cat) => showArchived || !cat.isArchived)
			.map((cat) => ({
				...cat,
				workTypes: cat.workTypes.filter((wt) => showArchived || !wt.isArchived),
			}))
	}, [tree, showArchived])

	// Calculate total active work types
	const totalWorkTypesCount = useMemo(() => {
		return visibleTree.reduce((sum, cat) => sum + cat.workTypes.length, 0)
	}, [visibleTree])

	const isSkeletonState = visibleTree.length > 0 && totalWorkTypesCount === 0

	// ── 2. ACCORDION STATE ──
	const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
		new Set(),
	)

	useEffect(() => {
		if (isSkeletonState) {
			setExpandedCategories(new Set(visibleTree.map((c) => c.id)))
		} else if (activeWorkTypeId) {
			const parentCategory = visibleTree.find((cat) =>
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
	}, [activeWorkTypeId, isSkeletonState, visibleTree])

	const toggleCategory = useCallback((categoryId: string) => {
		setExpandedCategories((prev) => {
			const next = new Set(prev)
			if (next.has(categoryId)) next.delete(categoryId)
			else next.add(categoryId)
			return next
		})
	}, [])

	// ── 3. STATE A: THE EMPTY LAB ONBOARDING ──
	if (visibleTree.length === 0) {
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
					department.
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
			{!activeWorkTypeId && !isSkeletonState && (
				<div className="p-3 rounded-xl bg-primary/5 border border-primary/10 flex items-center gap-2 mb-2 animate-in slide-in-from-top-2">
					<Compass className="w-4 h-4 text-primary shrink-0 animate-spin-slow" />
					<p className="text-[10px] text-muted-foreground font-medium">
						Click a <strong className="text-foreground">Department</strong>{' '}
						below to manage its inventory.
					</p>
				</div>
			)}

			{visibleTree.map((category) => {
				const isOpen = expandedCategories.has(category.id)
				const isEmptyCategory = category.workTypes.length === 0
				const isCatArchived = category.isArchived

				return (
					<div
						key={category.id}
						className="flex flex-col w-full group/row relative"
					>
						{/* --- FOLDER HEADER (Category) --- */}
						<div
							className={cn(
								'flex items-center justify-between w-full p-2.5 rounded-xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 group/header relative',
								isOpen
									? 'bg-slate-50 dark:bg-white/2'
									: 'hover:bg-slate-50 dark:hover:bg-white/2',
								isCatArchived && 'opacity-40 grayscale blur-[0.3px]', // Ghost state [4]
							)}
						>
							<button
								type="button"
								onClick={() => toggleCategory(category.id)}
								className="flex items-center gap-3 flex-1 min-w-0 text-left outline-none"
							>
								<ChevronRight
									className={cn(
										'w-4 h-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]',
										isOpen
											? 'rotate-90 text-foreground'
											: 'text-muted-foreground group-hover/header:text-foreground',
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
											: 'text-muted-foreground group-hover/header:text-foreground',
									)}
								>
									{category.name}
								</span>
							</button>

							{/* --- CONTEXT DROP MENU (Hover-Triggered) --- [2] */}
							<div className="flex items-center gap-2 opacity-0 group-hover/row:opacity-100 focus-within:opacity-100 transition-opacity duration-200 relative z-20 shrink-0">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="ghost"
											size="icon"
											className="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground"
										>
											<MoreHorizontal className="w-4 h-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										align="end"
										className="w-44 rounded-xl border-border shadow-premium dark:bg-[#121214]"
									>
										<DropdownMenuLabel className="text-[10px] text-muted-foreground uppercase tracking-widest">
											Category Tools
										</DropdownMenuLabel>
										<DropdownMenuItem className="cursor-pointer font-semibold text-xs py-2">
											<Edit3 className="w-3.5 h-3.5 mr-2" /> Rename
										</DropdownMenuItem>

										{isCatArchived ? (
											<DropdownMenuItem className="cursor-pointer font-semibold text-xs py-2 text-emerald-500">
												<RotateCcw className="w-3.5 h-3.5 mr-2" /> Restore
											</DropdownMenuItem>
										) : (
											<DropdownMenuItem className="cursor-pointer font-semibold text-xs py-2 text-amber-500">
												<Archive className="w-3.5 h-3.5 mr-2" /> Archive
											</DropdownMenuItem>
										)}

										<DropdownMenuSeparator />
										{/* Hard Delete is physically disabled if contains children (Cascading protection) [2] */}
										<DropdownMenuItem
											disabled={!isEmptyCategory}
											className="cursor-pointer font-semibold text-xs py-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
										>
											<Trash2 className="w-3.5 h-3.5 mr-2" /> Hard Delete
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>

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
											const isWtArchived = wt.isArchived

											return (
												<div
													key={wt.id}
													className="group/wt-row flex items-center justify-between relative w-full"
												>
													<Link
														href={`/catalog?workTypeId=${wt.id}`}
														replace
														className={cn(
															'flex-1 flex items-center justify-between pl-10 pr-12 py-2 rounded-xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 relative',
															isActive
																? 'bg-primary/10 text-primary'
																: 'text-slate-500 dark:text-zinc-400 hover:text-foreground hover:bg-slate-50 dark:hover:bg-white/2',
															isWtArchived &&
																'opacity-40 grayscale blur-[0.3px]', // Ghost state [4]
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

														{/* Status/Metrics Badges */}
														<div className="flex items-center gap-1.5 shrink-0 relative z-10">
															{/* ⚡ VELOCITY BADGE (Mock/Dynamic Case count) [3] */}
															{wt.casesCount && wt.casesCount > 0 && (
																<span className="text-[9px] font-mono font-bold px-1 py-0.5 rounded bg-primary/5 text-primary border border-primary/10 flex items-center gap-0.5">
																	<Zap className="w-2.5 h-2.5 fill-current" />{' '}
																	{wt.casesCount}
																</span>
															)}

															{/* Product Count Badge */}
															<span
																className={cn(
																	'text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md border transition-all',
																	hasMissingProducts
																		? 'bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20'
																		: isActive
																			? 'bg-primary/20 text-primary border-primary/30'
																			: 'bg-slate-100 dark:bg-white/5 text-muted-foreground border-border group-hover/wt-row:border-slate-300 dark:group-hover/wt-row:border-white/10',
																)}
															>
																{wt.productCount}
															</span>
														</div>
													</Link>

													{/* --- WORKTYPE HOVER TOOLS --- [2] */}
													<div className="absolute right-2 z-20 opacity-0 group-hover/wt-row:opacity-100 focus-within:opacity-100 transition-opacity">
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	variant="ghost"
																	size="icon"
																	className="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground"
																>
																	<MoreHorizontal className="w-3.5 h-3.5" />
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent
																align="end"
																className="w-44 rounded-xl border-border shadow-premium dark:bg-[#121214]"
															>
																<DropdownMenuLabel className="text-[10px] text-muted-foreground uppercase tracking-widest">
																	Department Tools
																</DropdownMenuLabel>
																<DropdownMenuItem className="cursor-pointer font-semibold text-xs py-2">
																	<Edit3 className="w-3.5 h-3.5 mr-2" /> Rename
																</DropdownMenuItem>

																{isWtArchived ? (
																	<DropdownMenuItem className="cursor-pointer font-semibold text-xs py-2 text-emerald-500">
																		<RotateCcw className="w-3.5 h-3.5 mr-2" />{' '}
																		Restore
																	</DropdownMenuItem>
																) : (
																	<DropdownMenuItem className="cursor-pointer font-semibold text-xs py-2 text-amber-500">
																		<Archive className="w-3.5 h-3.5 mr-2" />{' '}
																		Archive
																	</DropdownMenuItem>
																)}

																<DropdownMenuSeparator />
																{/* Hard Delete is physically disabled if contains children [2] */}
																<DropdownMenuItem
																	disabled={!hasMissingProducts}
																	className="cursor-pointer font-semibold text-xs py-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
																>
																	<Trash2 className="w-3.5 h-3.5 mr-2" /> Hard
																	Delete
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</div>
												</div>
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
