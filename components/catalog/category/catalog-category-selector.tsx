// components/shared/selectors/catalog-category-selector.tsx
'use client'

import { useState } from 'react'
import { Check, ChevronsUpDown, Loader2, Shapes } from 'lucide-react'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { handleSafeActionError } from '@/lib/safe-action-helpers'
import { getCatalogCategoriesAction } from '@/actions/catalog/get-categories'
import { FieldError } from 'react-hook-form'

interface Props {
	value: string | undefined
	onSelect: (categoryId: string, categoryName: string) => void
	fieldError?: FieldError
}

export function CatalogCategorySelector({
	value,
	onSelect,
	fieldError,
}: Props) {
	const [open, setOpen] = useState(false)

	const { data: categories = [], isFetching } = useQuery({
		queryKey: ['case-categories'],
		queryFn: async () => {
			const res = await getCatalogCategoriesAction({
				showArchivedCategories: false,
			}) // Fetch all active categories
			if (res?.serverError || res?.validationErrors) {
				handleSafeActionError({
					serverError: res.serverError,
					validationErrors: res.validationErrors,
				})
			}
			return res?.data?.categories || []
		},
		enabled: open,
		staleTime: 1000 * 60 * 60, // Categories rarely change, cache for 1 hr
	})

	const selectedCategory = categories.find((c) => c.id === value)

	return (
		<div className="flex flex-col gap-2 animate-in fade-in duration-500">
			<label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
				Parent Category <span className="text-destructive">*</span>
			</label>

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						className={cn(
							'w-full h-11 justify-between rounded-xl border-border bg-card px-4 transition-all shadow-sm',
							open
								? 'ring-[3px] ring-primary/20 border-primary outline-none'
								: 'hover:bg-slate-50 dark:hover:bg-white/5',
							fieldError &&
								'border-destructive focus:ring-destructive/20 focus:border-destructive',
						)}
					>
						<div className="flex items-center gap-3 truncate min-w-0">
							<Shapes
								className={cn(
									'w-4 h-4 shrink-0 transition-colors',
									value ? 'text-primary' : 'text-slate-400 dark:text-zinc-500',
								)}
							/>
							<span
								className={cn(
									'text-sm truncate',
									!value && 'text-muted-foreground font-normal',
								)}
							>
								{selectedCategory ? (
									<span className="font-bold text-foreground">
										{selectedCategory.name}
									</span>
								) : (
									'Select parent category...'
								)}
							</span>
						</div>
						{isFetching && !open ? (
							<Loader2 className="ml-2 h-4 w-4 shrink-0 animate-spin opacity-50" />
						) : (
							<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
						)}
					</Button>
				</PopoverTrigger>

				<PopoverContent className="p-0 rounded-2xl border-border shadow-premium overflow-hidden w-(--radix-popover-trigger-width)">
					<Command className="dark:bg-[#121214]">
						<CommandInput
							placeholder="Search categories..."
							className="py-2.5 text-[13px]"
						/>
						<CommandList className="max-h-60 custom-scrollbar pb-1">
							{isFetching && (
								<div className="p-4 text-center">
									<Loader2 className="w-5 h-5 animate-spin mx-auto text-primary" />
								</div>
							)}
							{!isFetching && categories.length === 0 && (
								<CommandEmpty className="py-6 text-center text-sm text-muted-foreground font-medium">
									No categories found. Create one first.
								</CommandEmpty>
							)}
							<CommandGroup>
								{categories.map((cat) => (
									<CommandItem
										key={cat.id}
										value={cat.name}
										onSelect={() => {
											onSelect(cat.id, cat.name)
											setOpen(false)
										}}
										className="flex items-center justify-between py-2.5 px-3 cursor-pointer hover:bg-primary/5 dark:hover:bg-primary/10 rounded-lg my-0.5 group"
									>
										<span className="text-[13px] font-bold text-foreground group-hover:text-primary transition-colors truncate">
											{cat.name}
										</span>
										{value === cat.id && (
											<Check className="w-4 h-4 text-primary animate-in zoom-in shrink-0 ml-3" />
										)}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>

			{fieldError && (
				<span className="text-[11px] font-medium text-destructive ml-1 flex items-center gap-1.5 animate-in fade-in">
					<div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse"></div>
					{fieldError.message}
				</span>
			)}
		</div>
	)
}
