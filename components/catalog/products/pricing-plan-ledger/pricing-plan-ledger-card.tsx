'use client'

import { memo, useCallback, useMemo } from 'react'
import {
	Landmark,
	TrendingDown,
	TrendingUp,
	MoreVertical,
	Edit2,
	Archive,
	Star,
	Info,
	Type,
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
import { PricingPlanDTO } from '@/schema/composed/catalog/pricing-plans.dtos'

interface Props {
	plan: PricingPlanDTO
	isGlobalDefault?: boolean
	onEdit: (id: string) => void
	onArchive?: (id: string) => void
	onSetDefault?: (id: string) => void
	standardBasePrice?: number | null
	onRename: (id: string, name: string) => void
}

export const PricingPlanLedgerCard = memo(function PricingPlanLedgerCard({
	plan,
	isGlobalDefault = false,
	onEdit,
	onArchive,
	onSetDefault,
	standardBasePrice,
	onRename,
}: Props) {
	const formatMoney = (val: number | null | undefined) => {
		if (val == null) return '$0.00'
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(val)
	}

	const handleEditClick = useCallback(() => {
		onEdit(plan.id)
	}, [plan.id, onEdit])

	// --- DYNAMIC FINANCIAL CALCULATIONS ---
	const financialMetrics = useMemo(() => {
		const currentPrice =
			plan.pricingStrategy === 'PERTOOTH'
				? Number(plan.toothPrice || 0)
				: plan.pricingStrategy === 'BULK'
					? Number(plan.bulkPrice || 0)
					: Number(plan.firstToothPrice || 0)

		if (isGlobalDefault || !standardBasePrice || standardBasePrice === 0) {
			return null
		}

		const diff = standardBasePrice - currentPrice
		const isDiscount = diff > 0
		const isMarkup = diff < 0
		const percentDiff = Math.abs(Math.round((diff / standardBasePrice) * 100))

		return {
			diff,
			percentDiff,
			isDiscount,
			isMarkup,
			standardBasePrice,
		}
	}, [plan, isGlobalDefault, standardBasePrice])

	const isCustomClinicDeal = !!plan.clinic

	return (
		<div
			className={cn(
				'relative flex flex-col p-6 rounded-3xl border transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] bg-card group overflow-hidden min-h-[340px]',
				isGlobalDefault
					? 'border-emerald-500/30 bg-emerald-500/1 shadow-[0_8px_30px_rgba(16,185,129,0.02)] scale-[1.01]'
					: 'border-border hover:border-emerald-500/40 hover:shadow-lg',
			)}
		>
			{/* Perforated Edge Accent (The Receipt Texture) */}
			<div className="absolute top-0 bottom-0 left-0 w-1 bg-linear-to-b from-transparent via-emerald-500/20 to-transparent border-r border-dashed border-emerald-500/10" />

			{/* Emerald Ambient Glow */}
			{/* <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" /> */}
			<div
				className={cn(
					'absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none transition-colors',
					isGlobalDefault
						? 'bg-emerald-500/10'
						: 'bg-emerald-500/5 group-hover:bg-emerald-500/10',
				)}
				style={{
					background: `radial-gradient(ellipse at top, rgba(var(--glow-emerald-rgb), ${
						isGlobalDefault ? '0.1' : '0.05'
					}) 0%, transparent 60%)`,
				}}
			/>

			{/* --- 1. HEADER: Swiss Typography --- */}
			<div className="mb-8 relative z-10 flex items-start justify-between pl-2">
				<div className="min-w-0 flex-1 pr-4">
					<span className="text-[9px] font-black uppercase tracking-[0.25em] text-muted-foreground/60 block mb-1">
						{isGlobalDefault ? 'Base Rate' : 'Special Rate'}
					</span>
					<h4 className="text-base font-bold text-foreground leading-tight truncate capitalize">
						{plan.name}
					</h4>
				</div>

				<div className="flex items-center gap-3 shrink-0">
					<span className="px-2 py-0.5 rounded-md border border-border bg-slate-50 dark:bg-white/5 text-[9px] font-black uppercase tracking-widest font-mono">
						{plan.pricingStrategy}
					</span>

					{/* Dropdown Menu */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8 text-muted-foreground hover:text-foreground -mr-2 transition-colors rounded-lg"
							>
								<MoreVertical className="w-4 h-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className="w-56 rounded-xl border-border shadow-premium dark:bg-[#121214]"
						>
							<DropdownMenuLabel className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
								Ledger Actions
							</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={handleEditClick}
								className="cursor-pointer font-semibold text-xs py-2 hover:bg-emerald-500/10 hover:text-emerald-600"
							>
								<Edit2 className="w-3.5 h-3.5 mr-2" /> Edit Pricing Logic
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => onRename(plan.id, plan.name)}
								className="cursor-pointer font-semibold text-xs py-2 hover:bg-emerald-500/10 hover:text-emerald-600"
							>
								<Type className="w-3.5 h-3.5 mr-2" /> Rename Plan
							</DropdownMenuItem>
							{!isGlobalDefault && !isCustomClinicDeal && onSetDefault && (
								<DropdownMenuItem
									onClick={() => onSetDefault(plan.id)}
									className="cursor-pointer font-semibold text-xs py-2 hover:bg-emerald-500/10 hover:text-emerald-600"
								>
									<Star className="w-3.5 h-3.5 mr-2" /> Set as Master Default
								</DropdownMenuItem>
							)}
							<DropdownMenuSeparator className="bg-border/50" />
							<DropdownMenuItem
								disabled={isGlobalDefault}
								onClick={() => onArchive && onArchive(plan.id)}
								className={cn(
									'font-semibold text-xs py-2 text-rose-600 focus:text-rose-500 focus:bg-rose-500/10',
									isGlobalDefault
										? 'opacity-50 cursor-not-allowed'
										: 'cursor-pointer',
								)}
							>
								<Archive className="w-3.5 h-3.5 mr-2" /> Archive Plan
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			{/* --- 2. THE DYNAMIC METRICS: "The Stamped Receipt" --- */}
			<div className="flex-1 flex flex-col relative z-10 mb-8 pl-2">
				{plan.pricingStrategy === 'PERTOOTH' && (
					<div className="flex flex-col gap-1 items-start">
						<span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
							Rate per Unit
						</span>
						<span className="text-4xl font-mono font-black text-foreground tracking-tighter">
							{formatMoney(Number(plan.toothPrice))}
						</span>
					</div>
				)}

				{plan.pricingStrategy === 'BULK' && (
					<div className="flex flex-col gap-1 items-start">
						<span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
							Flat Case Fee
						</span>
						<span className="text-4xl font-mono font-black text-foreground tracking-tighter">
							{formatMoney(Number(plan.bulkPrice))}
						</span>
					</div>
				)}

				{plan.pricingStrategy === 'CUSTOM' && (
					<div className="flex flex-col gap-4">
						{/* ASYMMETRIC SLASHED DISPLAY (The Creative Highlight) */}
						<div className="flex items-baseline gap-4 relative">
							<div className="flex flex-col">
								<span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">
									1st Unit
								</span>
								<span className="text-3xl font-mono font-black text-foreground tracking-tighter leading-none">
									{formatMoney(Number(plan.firstToothPrice))}
								</span>
							</div>

							<div className="text-2xl font-light text-border select-none -translate-y-1">
								/
							</div>

							<div className="flex flex-col">
								<span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">
									Addtional Tooth
								</span>
								<span className="text-xl font-mono font-bold text-muted-foreground leading-none">
									{formatMoney(Number(plan.additionalToothPrice))}
								</span>
							</div>
						</div>

						{/* Volume Cap Bar */}
						{plan.bulkPrice && (
							<div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between shadow-inner">
								<div className="flex flex-col">
									<span className="text-[9px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-500">
										Volume Cap Active
									</span>
									<span className="text-[10px] text-muted-foreground font-medium mt-0.5">
										Price after {Number(plan.teethCountToApplyBulkPrice)} units
									</span>
								</div>
								<span className="text-md font-mono font-black text-emerald-600 dark:text-emerald-400">
									{formatMoney(Number(plan.bulkPrice))}
								</span>
							</div>
						)}
					</div>
				)}
			</div>

			{/* --- 3. FOOTER: Barcode Comparison --- */}
			<div className="mt-auto pt-6 border-t border-border flex flex-col gap-4 relative z-10 pl-2">
				{financialMetrics &&
					(financialMetrics.isDiscount || financialMetrics.isMarkup) && (
						<div className="flex items-center justify-between animate-in fade-in duration-300">
							<span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-1.5">
								Standard Catalog Base:{' '}
								<span className="font-mono text-xs text-foreground font-black ml-1 line-through opacity-50">
									{formatMoney(financialMetrics.standardBasePrice)}
								</span>
							</span>
							<div
								className={cn(
									'flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md border',
									financialMetrics.isDiscount
										? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
										: 'text-amber-600 dark:text-amber-500 bg-amber-500/10 border-amber-500/20',
								)}
							>
								{financialMetrics.isDiscount ? (
									<>-{financialMetrics.percentDiff}% Discount</>
								) : (
									<>+{financialMetrics.percentDiff}% Premium</>
								)}
							</div>
						</div>
					)}

				<div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/2 border border-border text-[10px] text-muted-foreground flex items-start gap-2.5">
					<Info className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
					<p className="leading-relaxed font-medium">
						Account rules are locked. Future catalog modifications will not
						retroactively alter previously registered cases.
					</p>
				</div>
			</div>
		</div>
	)
})

PricingPlanLedgerCard.displayName = 'PricingPlanLedgerCard'
