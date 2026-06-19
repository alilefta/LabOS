'use client'

import { memo, useCallback, useState } from 'react'
import { toast } from 'sonner'
import {
	FolderInput,
	ArrowRight,
	Loader2,
	LayoutGrid,
	Check,
} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'

import { CaseCategoryDetailsUI } from '@/schema/composed/case-category.details'
import { getCaseCategoriesAction } from '@/actions/case-category'
import { handleSafeActionError } from '@/lib/safe-action-helpers'
import { moveWorkTypeAction } from '@/actions/catalog/worktypes/move-worktype'
import { useAction } from 'next-safe-action/hooks'

interface MoveWorkTypeModalProps {
	isOpen: boolean
	onClose: () => void
	workTypeId: string
	workTypeName: string
	currentCategoryId: string
	currentCategoryName: string
	onSuccess?: (newCatId: string) => void
}

export const MoveWorkTypeModal = memo(function MoveWorkTypeModal({
	isOpen,
	onClose,
	workTypeId,
	workTypeName,
	currentCategoryId,
	currentCategoryName,
	onSuccess,
}: MoveWorkTypeModalProps) {
	// Local State for the selected destination
	const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
		null,
	)

	// Reset selection when modal closes
	const handleOpenChange = useCallback(
		(open: boolean) => {
			if (!open) setSelectedCategoryId(null)
			onClose()
		},
		[onClose],
	)

	// --- 1. FETCH AVAILABLE CATEGORIES ---
	const { data: categories = [], isLoading } = useQuery({
		queryKey: ['case-categories', 'active'],
		queryFn: async () => {
			const res = await getCaseCategoriesAction({ limit: 50 })
			if (res?.serverError || res?.validationErrors) {
				handleSafeActionError({
					serverError: res.serverError,
					validationErrors: res.validationErrors,
				})
				return []
			}
			return (res.data?.categories as CaseCategoryDetailsUI[]) || []
		},
		enabled: isOpen,
	})

	// Filter out the category where the WorkType currently lives
	const availableCategories = categories.filter(
		(c) => c.id !== currentCategoryId,
	)
	const targetCategoryName = availableCategories.find(
		(c) => c.id === selectedCategoryId,
	)?.name

	// --- 2. SERVER ACTION ---

	const { executeAsync: moveWorkType, isExecuting } = useAction(
		moveWorkTypeAction,
		{
			onSuccess: ({ data }) => {
				toast.success(`${workTypeName} successfully moved.`)
				if (onSuccess) onSuccess(data.workType.caseCategoryId)
				handleOpenChange(false)
			},
			onError: ({ error }) => {
				toast.error(error.serverError?.message || 'Failed to move work type.')
			},
		},
	)

	const handleConfirm = useCallback(async () => {
		if (!selectedCategoryId) return

		console.log(
			`Moving WorkType ${workTypeId} to Category ${selectedCategoryId}`,
		)

		await moveWorkType({ workTypeId, newCategoryId: selectedCategoryId })
	}, [selectedCategoryId, workTypeId, moveWorkType])

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogContent
				className="sm:max-w-md p-0 overflow-hidden border-border bg-card shadow-2xl rounded-3xl flex flex-col max-h-[90vh]"
				showCloseButton={false}
			>
				{/* --- HEADER --- */}
				<DialogHeader className="p-8 pb-4 flex flex-col items-center text-center bg-linear-to-b from-primary/10 via-primary/5 to-transparent relative border-b border-border/50 shrink-0">
					<div className="w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm mb-4 relative z-10 text-primary bg-primary/10 border-primary/20">
						<FolderInput className="w-7 h-7" />
					</div>

					<div className="relative z-10">
						<DialogTitle className="text-xl font-bold tracking-tight text-foreground">
							Move Department
						</DialogTitle>
						<DialogDescription className="text-xs text-muted-foreground font-medium mt-1.5 px-4 leading-relaxed">
							Transfer{' '}
							<span className="font-bold text-foreground">
								&quot;{workTypeName}&quot;
							</span>{' '}
							to a different parent category in your catalog.
						</DialogDescription>
					</div>
				</DialogHeader>

				{/* --- BODY --- */}
				<div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
					{/* Context Visualizer */}
					<div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-[#121214] border border-border shadow-sm">
						<div className="flex flex-col items-center flex-1 text-center">
							<span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
								Current Parent
							</span>
							<span className="text-xs font-semibold text-foreground line-clamp-1">
								{currentCategoryName}
							</span>
						</div>
						<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
							<ArrowRight className="w-4 h-4 text-primary" />
						</div>
						<div className="flex flex-col items-center flex-1 text-center">
							<span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
								New Parent
							</span>
							<span
								className={cn(
									'text-xs font-semibold line-clamp-1',
									targetCategoryName
										? 'text-primary'
										: 'text-muted-foreground italic',
								)}
							>
								{targetCategoryName || 'Select below...'}
							</span>
						</div>
					</div>

					{/* Category Selector List */}
					<div className="flex flex-col gap-3">
						<label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1 flex items-center gap-2">
							<LayoutGrid className="w-3.5 h-3.5" /> Destination Category
						</label>

						<div className="border border-border rounded-2xl overflow-hidden shadow-sm">
							<Command className="dark:bg-[#121214]">
								<CommandInput
									placeholder="Search categories..."
									className="py-3 text-[13px] border-b border-border/50"
								/>
								<CommandList className="max-h-48 custom-scrollbar">
									{isLoading && (
										<div className="p-4 flex justify-center">
											<Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
										</div>
									)}

									{!isLoading && availableCategories.length === 0 && (
										<CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
											No other categories available.
										</CommandEmpty>
									)}

									<CommandGroup>
										{availableCategories.map((category) => {
											const isSelected = selectedCategoryId === category.id
											return (
												<CommandItem
													key={category.id}
													value={category.name}
													onSelect={() => setSelectedCategoryId(category.id)}
													className={cn(
														'flex items-center justify-between py-3 px-4 cursor-pointer transition-colors my-0.5',
														isSelected
															? "bg-primary/10 data-[selected='true']:bg-primary/10"
															: "hover:bg-primary/5 data-[selected='true']:bg-primary/5",
													)}
												>
													<span
														className={cn(
															'text-sm font-semibold truncate',
															isSelected ? 'text-primary' : 'text-foreground',
														)}
													>
														{category.name}
													</span>
													{isSelected && (
														<Check className="w-4 h-4 text-primary animate-in zoom-in shrink-0 ml-3" />
													)}
												</CommandItem>
											)
										})}
									</CommandGroup>
								</CommandList>
							</Command>
						</div>
					</div>
				</div>

				{/* --- FOOTER --- */}
				<DialogFooter className="p-6 border-t border-border bg-slate-50/50 dark:bg-white/1 shrink-0">
					<div className="flex w-full items-center gap-3">
						<DialogClose asChild>
							<Button
								variant="ghost"
								disabled={isExecuting}
								className="rounded-xl h-11 px-6 font-semibold flex-1 hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent"
							>
								Cancel
							</Button>
						</DialogClose>
						<Button
							onClick={handleConfirm}
							disabled={isExecuting || !selectedCategoryId}
							className={cn(
								'flex-1 rounded-xl h-11 font-bold transition-all flex items-center justify-center gap-2',
								selectedCategoryId
									? 'bg-primary text-primary-foreground shadow-premium hover:bg-primary/90'
									: 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-zinc-500 cursor-not-allowed',
							)}
						>
							{isExecuting ? (
								<Loader2 className="animate-spin w-4 h-4" />
							) : (
								'Move Department'
							)}
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
})

MoveWorkTypeModal.displayName = 'MoveWorkTypeModal'
