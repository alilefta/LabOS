'use client'

import { memo, useCallback } from 'react'
import Image from 'next/image'
import {
	MoreHorizontal,
	Settings2,
	AlertTriangle,
	ShieldCheck,
	Box,
	Zap,
	RotateCcw,
	Archive,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CatalogProductDTO } from '@/schema/composed/catalog/catalog.dtos'

interface Props {
	product: CatalogProductDTO
	onEditProduct: (productId: string) => void
	onManagePricing: (productId: string) => void
}

export const ProductMatrixCard = memo(function ProductMatrixCard({
	product,
	onEditProduct,
	onManagePricing,
}: Props) {
	const plan = product.defaultPricingPlan
	const isMissingPrice = !plan
	const isArchived = product.isArchived // Soft-delete flag [4]

	// Universal Currency Formatter
	const formatMoney = (val: number | null | undefined) => {
		if (val === null || val === undefined) return '--'
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(val)
	}

	// Stable Callbacks
	const handleEditClick = useCallback(() => {
		if (!isArchived) onEditProduct(product.id)
	}, [product.id, onEditProduct, isArchived])

	const handlePricingClick = useCallback(() => {
		if (!isArchived) onManagePricing(product.id)
	}, [product.id, onManagePricing, isArchived])

	return (
		<div
			className={cn(
				'lab-card p-5 sm:p-6 flex flex-col group transition-all duration-300 relative overflow-hidden h-full',
				isMissingPrice
					? 'border-amber-500/40 bg-amber-500/2'
					: 'hover:border-primary/40 bg-card hover:shadow-md',
				isArchived && 'opacity-45 grayscale-40 blur-[0.2px]', // THE GHOST CARD OVERLAY [4]
			)}
		>
			{/* --- DANGER GLOW (If Missing Price & Active) --- */}
			{isMissingPrice && !isArchived && (
				<div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none animate-pulse" />
			)}

			{/* --- HEADER: Identity & Actions --- */}
			<div className="flex items-start justify-between mb-5 relative z-10 w-full">
				<div className="flex items-center gap-4 min-w-0">
					{product.imageUrl ? (
						<div className="relative w-12 h-12 rounded-xl overflow-hidden border border-border shadow-sm shrink-0 bg-slate-50 dark:bg-[#121214]">
							<Image
								src={product.imageUrl}
								alt={product.name}
								fill
								className="object-cover p-0.5 rounded-xl"
							/>
						</div>
					) : (
						<div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 border border-border flex items-center justify-center text-slate-400 dark:text-zinc-500 shrink-0 shadow-sm">
							<Box className="w-5 h-5" />
						</div>
					)}
					<div className="flex flex-col min-w-0 pr-2">
						<h3
							className={cn(
								'text-sm font-bold leading-tight line-clamp-2',
								isArchived && 'text-muted-foreground',
							)}
							title={product.name}
						>
							{product.name}
						</h3>
						<span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mt-1">
							{isArchived
								? 'Archived SKU'
								: `ID: ${product.id.substring(0, 8)}`}
						</span>
					</div>
				</div>

				{/* Options Dropdown (Remains active even on archived card so users can Restore!) [2] */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 text-muted-foreground hover:text-foreground shrink-0 -mt-1 -mr-1"
						>
							<MoreHorizontal className="w-4 h-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="end"
						className="w-48 rounded-xl border-border shadow-premium dark:bg-[#121214]"
					>
						<DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-widest">
							Options
						</DropdownMenuLabel>
						<DropdownMenuItem
							disabled={isArchived}
							onClick={handleEditClick}
							className="cursor-pointer font-medium py-2 hover:bg-primary/5"
						>
							Edit Product Details
						</DropdownMenuItem>
						<DropdownMenuSeparator className="bg-border" />

						{/* Dynamic Archive / Restore Option [2, 4] */}
						{isArchived ? (
							<DropdownMenuItem className="cursor-pointer font-semibold py-2 text-emerald-500 hover:bg-emerald-500/10">
								<RotateCcw className="w-3.5 h-3.5 mr-2" /> Restore Product
							</DropdownMenuItem>
						) : (
							<DropdownMenuItem className="cursor-pointer font-semibold py-2 text-amber-500 hover:bg-amber-500/10">
								<Archive className="w-3.5 h-3.5 mr-2" /> Archive Product
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* --- BODY: Description --- */}
			<div className="mb-6 relative z-10 flex-1">
				<p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed font-medium">
					{product.description || (
						<span className="italic opacity-60">
							No technical description provided.
						</span>
					)}
				</p>
			</div>

			{/* --- FOOTER: Pricing Engine --- */}
			<div className="mt-auto relative z-10 space-y-3 w-full">
				{isMissingPrice ? (
					<div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
						<AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
						<div className="flex flex-col">
							<span className="text-[11px] font-bold text-amber-700 dark:text-amber-500 uppercase tracking-widest mb-0.5">
								Missing Base Price
							</span>
							<span className="text-[10px] text-amber-600/80 dark:text-amber-400/80 leading-snug">
								No active pricing plan found.
							</span>
						</div>
					</div>
				) : (
					<div className="flex flex-col gap-2 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 shadow-inner group-hover:bg-emerald-500/10 transition-colors duration-300">
						<div className="flex items-center justify-between mb-1">
							<span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
								<ShieldCheck className="w-3.5 h-3.5" /> Base Rate
							</span>
							<span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-white dark:bg-[#121214] border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider shadow-sm">
								{plan.strategy}
							</span>
						</div>

						<div className="flex flex-col gap-2.5 w-full pt-1">
							{plan.strategy === 'PERTOOTH' && (
								<div className="flex items-end justify-between">
									<span className="text-2xl font-mono font-bold text-foreground leading-none">
										{formatMoney(plan.toothPrice)}
									</span>
									<span className="text-[10px] text-muted-foreground font-medium uppercase">
										Per Unit
									</span>
								</div>
							)}
							{plan.strategy === 'BULK' && (
								<div className="flex items-end justify-between">
									<span className="text-2xl font-mono font-bold text-foreground leading-none">
										{formatMoney(plan.bulkPrice)}
									</span>
									<span className="text-[10px] text-muted-foreground font-medium uppercase">
										Flat Fee
									</span>
								</div>
							)}
							{plan.strategy === 'CUSTOM' && (
								<div className="flex flex-col w-full gap-2">
									<div className="grid grid-cols-2 gap-2">
										<div className="p-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-border flex flex-col">
											<span className="text-[9px] font-bold text-muted-foreground uppercase">
												1st Unit
											</span>
											<span className="text-sm font-mono font-black text-foreground mt-0.5">
												{formatMoney(plan.firstToothPrice)}
											</span>
										</div>
										<div className="p-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-border flex flex-col">
											<span className="text-[9px] font-bold text-muted-foreground uppercase">
												Addt'l
											</span>
											<span className="text-sm font-mono font-black text-foreground mt-0.5">
												{formatMoney(plan.toothPrice)}
											</span>
										</div>
									</div>

									{plan.bulkPrice && plan.teethCountToApplyBulkPrice && (
										<div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
											<div className="flex flex-col">
												<span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-500 uppercase">
													Volume Cap
												</span>
												<span className="text-[10px] text-muted-foreground font-medium">
													At {plan.teethCountToApplyBulkPrice} units
												</span>
											</div>
											<span className="text-xs font-mono font-black text-emerald-600 dark:text-emerald-400">
												{formatMoney(plan.bulkPrice)}
											</span>
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				)}

				{/* Quick Actions & Meta */}
				<div className="flex items-center justify-between pt-1">
					<div className="flex items-center gap-2">
						{/* ⚡ ACTIVE CASES VELOCITY BADGE (High Value) [3] */}
						{product.activeCasesCount && product.activeCasesCount > 0 && (
							<span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 flex items-center gap-0.5">
								<Zap className="w-2.5 h-2.5 fill-current" />{' '}
								{product.activeCasesCount} Active
							</span>
						)}

						<span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-60">
							{product.customClinicDealsCount > 0
								? `${product.customClinicDealsCount} Overrides`
								: 'No Overrides'}
						</span>
					</div>

					<Button
						variant="ghost"
						size="sm"
						disabled={isArchived} // Cannot edit pricing of a retired product [4]
						onClick={handlePricingClick}
						className="h-8 text-[11px] font-bold text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all -mr-2"
					>
						<Settings2 className="w-3.5 h-3.5 mr-1.5" /> Pricing
					</Button>
				</div>
			</div>
		</div>
	)
})

ProductMatrixCard.displayName = 'ProductMatrixCard'
