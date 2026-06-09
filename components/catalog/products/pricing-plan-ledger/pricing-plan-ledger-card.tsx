'use client'

import { memo, useCallback, useMemo } from 'react'
import {
	MoreVertical,
	Edit2,
	Archive,
	Star,
	Info,
	Type,
	Building2,
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
		// Ensure we don't divide by zero
		const percentDiff = Math.abs(Math.round((diff / standardBasePrice) * 100))

		return {
			diff,
			percentDiff,
			isDiscount,
			isMarkup,
			standardBasePrice,
		}
	}, [plan, isGlobalDefault, standardBasePrice])

	const isCustomClinicDeal = !!plan?.clinic?.id

	return (
		<div
			className={cn(
				'relative flex flex-col p-6 rounded-3xl border transition-all duration-300 ease-out bg-card group overflow-hidden min-h-85',
				isGlobalDefault
					? 'border-emerald-500/30 bg-emerald-500/2 shadow-sm scale-[1.01]'
					: 'border-border hover:border-emerald-500/40 hover:shadow-md',
			)}
		>
			{/* Perforated Edge Accent (The Receipt Texture) */}
			<div className="absolute top-0 bottom-0 left-0 w-1.5 bg-linear-to-b from-transparent via-emerald-500/10 to-transparent border-r border-dashed border-emerald-500/20" />

			{/* Emerald Ambient Glow */}
			<div
				className={cn(
					'absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none transition-all duration-700 blur-3xl',
					isGlobalDefault
						? 'bg-emerald-500/10 scale-100'
						: 'bg-emerald-500/5 scale-90 group-hover:scale-110 group-hover:bg-emerald-500/10',
				)}
			/>

			{/* --- 1. HEADER: Swiss Typography --- */}
			<div className="mb-8 relative z-10 flex items-start justify-between pl-3">
				<div className="min-w-0 flex-1 pr-4">
					{/* Meta Badges */}
					<div className="flex items-center gap-2 mb-2">
						<span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
							{isGlobalDefault ? 'Base Rate' : 'Special Rate'}
						</span>

						{/* Clinic-Specific Warning Badge */}
						{isCustomClinicDeal && (
							<span className="flex items-center gap-1 text-[9px] font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
								<Building2 className="w-3 h-3" /> Clinic Specific
							</span>
						)}
					</div>

					<h4 className="text-lg font-bold text-foreground leading-tight truncate capitalize">
						{plan.name}
					</h4>
				</div>

				<div className="flex items-center gap-3 shrink-0">
					<span
						className={cn(
							'px-2.5 py-1 rounded-md border text-[9px] font-black uppercase tracking-widest',
							isGlobalDefault
								? 'border-emerald-500/30 text-emerald-600 dark:text-emerald-500 bg-emerald-500/10'
								: 'border-border bg-slate-50 dark:bg-white/5 text-muted-foreground',
						)}
					>
						{plan.pricingStrategy}
					</span>

					{/* Contextual Actions Dropdown */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/10 -mr-2 transition-colors rounded-lg focus-visible:ring-1 focus-visible:ring-emerald-500"
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
								className="cursor-pointer font-semibold text-xs py-2 hover:bg-emerald-500/10 hover:text-emerald-600 transition-colors"
							>
								<Edit2 className="w-3.5 h-3.5 mr-2" /> Edit Pricing Logic
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => onRename(plan.id, plan.name)}
								className="cursor-pointer font-semibold text-xs py-2 hover:bg-emerald-500/10 hover:text-emerald-600 transition-colors"
							>
								<Type className="w-3.5 h-3.5 mr-2" /> Rename Plan
							</DropdownMenuItem>

							{!isGlobalDefault && !isCustomClinicDeal && onSetDefault && (
								<DropdownMenuItem
									onClick={() => onSetDefault(plan.id)}
									className="cursor-pointer font-semibold text-xs py-2 text-emerald-600 hover:bg-emerald-500/10 transition-colors"
								>
									<Star className="w-3.5 h-3.5 mr-2" /> Set as Master Default
								</DropdownMenuItem>
							)}
							<DropdownMenuSeparator className="bg-border/50" />
							<DropdownMenuItem
								disabled={isGlobalDefault}
								onClick={() => onArchive && onArchive(plan.id)}
								className={cn(
									'font-semibold text-xs py-2 text-rose-600 focus:text-rose-500 focus:bg-rose-500/10 transition-colors',
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

			{/* --- 2. THE DYNAMIC METRICS --- */}
			<div className="flex-1 flex flex-col relative z-10 mb-8 pl-3">
				{plan.pricingStrategy === 'PERTOOTH' && (
					<div className="flex flex-col gap-1 items-start">
						<span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
							Rate per Unit
						</span>
						{/* Tabular-nums keeps currency perfectly aligned */}
						<span className="text-4xl font-mono font-black text-foreground tracking-tighter tabular-nums">
							{formatMoney(Number(plan.toothPrice))}
						</span>
					</div>
				)}

				{plan.pricingStrategy === 'BULK' && (
					<div className="flex flex-col gap-1 items-start">
						<span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
							Flat Case Fee
						</span>
						<span className="text-4xl font-mono font-black text-foreground tracking-tighter tabular-nums">
							{formatMoney(Number(plan.bulkPrice))}
						</span>
					</div>
				)}

				{plan.pricingStrategy === 'CUSTOM' && (
					<div className="flex flex-col gap-5">
						{/* ASYMMETRIC SLASHED DISPLAY */}
						<div className="flex items-baseline gap-4 relative">
							<div className="flex flex-col">
								<span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">
									1st Unit
								</span>
								<span className="text-3xl font-mono font-black text-foreground tracking-tighter leading-none tabular-nums">
									{formatMoney(Number(plan.firstToothPrice))}
								</span>
							</div>

							<div className="text-2xl font-light text-border select-none -translate-y-1">
								/
							</div>

							<div className="flex flex-col">
								<span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">
									Additional
								</span>
								<span className="text-xl font-mono font-bold text-muted-foreground leading-none tabular-nums">
									{formatMoney(Number(plan.additionalToothPrice))}
								</span>
							</div>
						</div>

						{/* Volume Cap Bar */}
						{plan.bulkPrice && (
							<div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between shadow-sm">
								<div className="flex flex-col">
									<span className="text-[9px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-500 mb-0.5">
										Volume Cap Active
									</span>
									<span className="text-[11px] text-muted-foreground font-medium">
										Flat rate after {Number(plan.teethCountToApplyBulkPrice)}{' '}
										units
									</span>
								</div>
								<span className="text-base font-mono font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
									{formatMoney(Number(plan.bulkPrice))}
								</span>
							</div>
						)}
					</div>
				)}
			</div>

			{/* --- 3. FOOTER: Audit Info --- */}
			<div className="mt-auto pt-5 border-t border-border flex flex-col gap-4 relative z-10 pl-3">
				{/* Discount/Markup Badge */}
				{financialMetrics &&
					(financialMetrics.isDiscount || financialMetrics.isMarkup) && (
						<div className="flex items-center justify-between animate-in fade-in duration-300">
							<span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-1.5">
								Standard Base:
								<span className="font-mono text-xs text-foreground font-black ml-1 line-through opacity-50 tabular-nums">
									{formatMoney(financialMetrics.standardBasePrice)}
								</span>
							</span>
							<div
								className={cn(
									'flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md border',
									financialMetrics.isDiscount
										? 'text-emerald-600 dark:text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
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

				<div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/2 border border-border flex items-start gap-3 shadow-sm">
					<Info className="w-4 h-4 shrink-0 mt-0.5 text-primary opacity-80" />
					<p className="text-[10px] text-muted-foreground leading-relaxed font-medium">
						Account rules are locked. Future catalog modifications will not
						retroactively alter previously invoiced cases.
					</p>
				</div>
			</div>
		</div>
	)
})

PricingPlanLedgerCard.displayName = 'PricingPlanLedgerCard'
