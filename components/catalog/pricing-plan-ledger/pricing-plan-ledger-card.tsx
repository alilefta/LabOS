'use client'

import { memo, useCallback, useMemo } from 'react'
import {
	Edit2,
	ShieldCheck,
	Building2,
	TrendingDown,
	Info,
	Landmark,
	DollarSign,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { CasePricingPlanDetailsUI } from '@/schema/composed/case-pricing-plan.details'
import { PricingPlanDTO } from '@/schema/composed/catalog/pricing-plans.dtos'

interface Props {
	plan: PricingPlanDTO
	isGlobalDefault?: boolean
	onEdit: (id: string) => void
	// The standard base price passed down to calculate the comparative discount
	standardBasePrice?: number | null
}

export const PricingPlanLedgerCard = memo(function PricingPlanLedgerCard({
	plan,
	isGlobalDefault = false,
	onEdit,
	standardBasePrice,
}: Props) {
	const formatMoney = (val: number | null | undefined) => {
		if (val == null) return '$0.00'
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(val)
	}

	// Stable callback to prevent inline function recreation (Crucial for 120fps)
	const handleEditClick = useCallback(() => {
		onEdit(plan.id)
	}, [plan.id, onEdit])

	// --- 1. THE DYNAMIC FINANCIAL CALCULATIONS ---
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

		// Calculate the exact discount percentage compared to the global standard
		const savings = standardBasePrice - currentPrice
		const discountPercent = Math.round((savings / standardBasePrice) * 100)

		return {
			savings,
			discountPercent,
			standardBasePrice,
		}
	}, [plan, isGlobalDefault, standardBasePrice])

	return (
		<div
			className={cn(
				'lab-card p-6 group transition-all duration-300 flex flex-col h-full relative overflow-hidden bg-card',
				isGlobalDefault
					? 'border-emerald-500/30 bg-emerald-500/1 shadow-[0_4px_30px_rgba(16,185,129,0.02)]'
					: 'border-border hover:border-emerald-500/40',
			)}
		>
			{/* Emerald Ambient Lighting Glow */}
			<div
				className={cn(
					'absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl pointer-events-none transition-colors',
					isGlobalDefault
						? 'bg-emerald-500/10'
						: 'bg-emerald-500/5 group-hover:bg-emerald-500/10',
				)}
			/>

			{/* --- 1. HEADER: Scope & Strategy --- */}
			<div className="mb-6 relative z-10 flex items-start justify-between">
				<div className="min-w-0 flex-1 pr-4">
					<h4 className="text-sm font-bold text-foreground leading-tight truncate">
						{isGlobalDefault
							? 'Global Catalog Rate'
							: plan.clinic?.name || plan.name}
					</h4>

					<p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-1.5 mt-1.5">
						{isGlobalDefault ? (
							<>
								<Landmark className="w-3.5 h-3.5 text-emerald-500" />
								<span>Standard Base Price</span>
							</>
						) : (
							<>
								<Building2 className="w-3.5 h-3.5 text-primary/70" />
								<span>Clinic Override Deal</span>
							</>
						)}
					</p>
				</div>

				<div className="flex flex-col items-end gap-2 shrink-0">
					<span
						className={cn(
							'px-2 py-0.5 rounded-md border text-[9px] font-bold uppercase tracking-widest shadow-sm',
							isGlobalDefault
								? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
								: 'bg-slate-100 dark:bg-white/5 text-muted-foreground border-border',
						)}
					>
						{plan.pricingStrategy}
					</span>

					{/* Edit Button */}
					<Button
						variant="ghost"
						size="icon"
						onClick={handleEditClick}
						className="w-7 h-7 text-muted-foreground hover:text-emerald-600 hover:bg-emerald-500/10 rounded-lg transition-colors"
					>
						<Edit2 className="w-3.5 h-3.5" />
					</Button>
				</div>
			</div>

			{/* --- 2. DYNAMIC LEDGER VALUE DISPLAY --- */}
			<div className="flex-1 flex flex-col gap-3 relative z-10 mb-6 justify-center">
				{plan.pricingStrategy === 'PERTOOTH' && (
					<div className="p-4 rounded-xl bg-slate-50 dark:bg-[#09090B] border border-border shadow-inner flex items-center justify-between">
						<span className="text-[11px] font-bold text-muted-foreground uppercase">
							Unit Rate (Tooth)
						</span>
						<span className="text-2xl font-mono font-bold text-foreground">
							{formatMoney(Number(plan.toothPrice))}
						</span>
					</div>
				)}

				{plan.pricingStrategy === 'BULK' && (
					<div className="p-4 rounded-xl bg-slate-50 dark:bg-[#09090B] border border-border shadow-inner flex items-center justify-between">
						<span className="text-[11px] font-bold text-muted-foreground uppercase">
							Flat Case Rate
						</span>
						<span className="text-2xl font-mono font-bold text-foreground">
							{formatMoney(Number(plan.bulkPrice))}
						</span>
					</div>
				)}

				{plan.pricingStrategy === 'CUSTOM' && (
					<div className="space-y-3">
						<div className="grid grid-cols-2 gap-3">
							<div className="p-3 rounded-xl bg-slate-50 dark:bg-[#09090B] border border-border">
								<span className="text-[9px] font-bold text-muted-foreground uppercase block mb-1">
									1st Unit
								</span>
								<span className="text-lg font-mono font-bold text-foreground">
									{formatMoney(Number(plan.firstToothPrice))}
								</span>
							</div>
							<div className="p-3 rounded-xl bg-slate-50 dark:bg-[#09090B] border border-border">
								<span className="text-[9px] font-bold text-muted-foreground uppercase block mb-1">
									Additional
								</span>
								<span className="text-lg font-mono font-bold text-foreground">
									{formatMoney(Number(plan.additionalToothPrice))}
								</span>
							</div>
						</div>

						{/* Volume Cap Integration */}
						{plan.bulkPrice && (
							<div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between">
								<div className="flex flex-col">
									<span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-500 uppercase">
										Volume Cap
									</span>
									<span className="text-[10px] text-muted-foreground font-medium">
										Triggered at {Number(plan.teethCountToApplyBulkPrice)} units
									</span>
								</div>
								<span className="text-md font-mono font-bold text-emerald-600 dark:text-emerald-400">
									{formatMoney(Number(plan.bulkPrice))}
								</span>
							</div>
						)}
					</div>
				)}
			</div>

			{/* --- 3. FOOTER: Comparison & Tooltips --- */}
			<div className="mt-auto pt-4 border-t border-border flex flex-col gap-3 relative z-10">
				{/* Visual discount comparison for custom clinic deals */}
				{financialMetrics && financialMetrics.discountPercent > 0 && (
					<div className="flex items-center justify-between animate-in fade-in duration-300">
						<div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
							<Landmark className="w-3.5 h-3.5" /> Std Base:
							<span className="font-mono line-through opacity-60 ml-1">
								{formatMoney(financialMetrics.standardBasePrice)}
							</span>
						</div>
						<div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
							<TrendingDown className="w-3 h-3" />{' '}
							{financialMetrics.discountPercent}% SAVINGS
						</div>
					</div>
				)}

				<div className="p-3 rounded-lg bg-slate-100 dark:bg-white/5 border border-border text-[10px] text-muted-foreground flex items-start gap-2">
					<Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-primary" />
					<p className="leading-normal">
						Calculated using{' '}
						<strong className="text-foreground">{plan.pricingStrategy}</strong>{' '}
						logic. Custom rates lock at Case Creation to protect historical
						invoices.
					</p>
				</div>
			</div>
		</div>
	)
})

PricingPlanLedgerCard.displayName = 'PricingPlanLedgerCard'
