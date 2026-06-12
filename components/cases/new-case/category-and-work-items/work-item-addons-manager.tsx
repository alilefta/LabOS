'use client'

import { memo, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PackagePlus, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ProductAddonDTO } from '@/schema/composed/catalog/product.dtos'
import { getProductAddonsAction } from '@/actions/catalog/product-addons/get-product-addons'

interface Props {
	productId: string | null
	selectedAddonIds: string[]
	onAddonsChange: (addonIds: string[]) => void
	// Optional: Pass an updater back to the parent so it knows the prices to add to the Grand Total
	onAddonPricesLoaded?: (addons: ProductAddonDTO[]) => void
}

export const WorkItemAddonsManager = memo(function WorkItemAddonsManager({
	productId,
	selectedAddonIds,
	onAddonsChange,
	onAddonPricesLoaded,
}: Props) {
	// 1. Fetch available addons ONLY if a product is selected
	const { data: availableAddons = [], isFetching } = useQuery({
		queryKey: ['case-creation', 'product-addons', productId],
		queryFn: async () => {
			if (!productId) return []
			const res = await getProductAddonsAction({
				productId,
				showArchived: false,
			})
			if (res.serverError || res.validationErrors) return []

			const addons = (res.data?.addons as ProductAddonDTO[]) || []

			// Let the parent modal know the prices so it can update the live receipt!
			if (onAddonPricesLoaded) onAddonPricesLoaded(addons)

			return addons
		},
		enabled: !!productId,
		staleTime: 1000 * 60 * 8, // 8 minutes
	})

	// 2. Stable Toggle Handler
	const toggleAddon = useCallback(
		(addonId: string) => {
			onAddonsChange(
				selectedAddonIds.includes(addonId)
					? selectedAddonIds.filter((id) => id !== addonId)
					: [...selectedAddonIds, addonId],
			)
		},
		[selectedAddonIds, onAddonsChange],
	)

	// 3. UI States
	if (!productId) return null // Don't show anything if no product is selected yet

	if (isFetching && availableAddons.length === 0) {
		return (
			<div className="pt-6 border-t border-border/50 animate-in fade-in duration-300">
				<div className="flex items-center gap-2 mb-3">
					<PackagePlus className="w-4 h-4 text-primary opacity-50" />
					<h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground opacity-50">
						Checking Accessories...
					</h4>
				</div>
				<div className="flex gap-2">
					<div className="h-8 w-24 bg-slate-100 dark:bg-white/5 rounded-lg animate-pulse" />
					<div className="h-8 w-32 bg-slate-100 dark:bg-white/5 rounded-lg animate-pulse" />
				</div>
			</div>
		)
	}

	if (availableAddons.length === 0) return null // If this product has no addons, silently stay hidden

	return (
		<div className="pt-6 border-t border-border/50 animate-in fade-in slide-in-from-bottom-2 duration-500">
			<div className="flex items-center justify-between mb-3">
				<div className="flex items-center gap-2">
					<PackagePlus className="w-4 h-4 text-amber-500" />
					<h4 className="text-[11px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-500">
						Optional Accessories
					</h4>
				</div>
				<span className="text-[9px] font-mono font-bold text-muted-foreground bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded border border-border">
					{selectedAddonIds.length} Selected
				</span>
			</div>

			{/* The "Tag Cloud" Interface */}
			<div className="flex flex-wrap gap-2">
				{availableAddons.map((addon) => {
					const isSelected = selectedAddonIds.includes(addon.id)
					return (
						<button
							key={addon.id}
							type="button"
							onClick={() => toggleAddon(addon.id)}
							className={cn(
								'flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50',
								isSelected
									? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-500 shadow-sm ring-1 ring-amber-500/20 scale-[1.02]'
									: 'bg-slate-50 dark:bg-white/2 border-border text-muted-foreground hover:border-amber-500/40 hover:text-foreground',
							)}
						>
							<div
								className={cn(
									'w-4 h-4 rounded-md border flex items-center justify-center transition-colors shadow-sm',
									isSelected
										? 'bg-amber-500 border-amber-500 text-white'
										: 'bg-white dark:bg-[#121214] border-slate-300 dark:border-zinc-700',
								)}
							>
								{isSelected && <Check className="w-3 h-3 stroke-3" />}
							</div>
							{addon.name}
							<span className="opacity-60 font-mono ml-1">+${addon.price}</span>
						</button>
					)
				})}
			</div>
		</div>
	)
})
