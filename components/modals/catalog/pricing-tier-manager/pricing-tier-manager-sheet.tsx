'use client'

import { useQuery } from '@tanstack/react-query'
import {
	DollarSign,
	ShieldCheck,
	Building2,
	Plus,
	Loader2,
	X,
	AlertTriangle,
	TrendingDown,
	ArrowRight,
	Trash2,
	Edit2,
	Receipt,
} from 'lucide-react'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetClose,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { memo, useCallback } from 'react'

// Schemas & Actions
import { getPricingPlansByProductAction } from '@/actions/catalog/get-pricing-plans'
import { useClinicalCreationStore } from '@/store/use-clinical-creation-store'
import { PricingPlanDTO } from '@/schema/composed/catalog/pricing-plans.dtos'

interface Props {
	isOpen: boolean
	onClose: () => void
	productId: string
	productName: string
}

export const PricingTierManagerSheet = memo(function PricingTierManagerSheet({
	isOpen,
	onClose,
	productId,
	productName,
}: Props) {
	// ── Zustand Store Connections ───────────────────────────────────────────
	const openPricingSheet = useClinicalCreationStore(
		(state) => state.openPricingSheet,
	)

	// ── DATA FETCHING (Strictly Typed to DTO) [1] ──
	const { data: plans = [], isLoading } = useQuery({
		queryKey: ['pricing-plans', productId],
		queryFn: async () => {
			if (!productId) return []
			const res = await getPricingPlansByProductAction({ productId })

			if (res.serverError || res.validationErrors) {
				return []
			}
			return (res.data?.pricings as PricingPlanDTO[]) || []
		},
		enabled: isOpen && !!productId,
	})

	const defaultPlan = plans.find((p) => p.isDefault)
	const customPlans = plans.filter((p) => !p.isDefault)

	const formatMoney = (val: number | null | undefined) => {
		if (val === null || val === undefined) return '--'
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(val)
	}

	// Helper to calculate discount percentage against default
	const getDiscountBadge = (customPrice: number, basePrice: number) => {
		if (!basePrice || !customPrice) return null
		const diff = basePrice - customPrice
		if (diff <= 0) return null
		const pct = Math.round((diff / basePrice) * 100)

		return (
			<span className="flex items-center gap-1 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 shadow-sm">
				<TrendingDown className="w-2.5 h-2.5" /> {pct}% OFF
			</span>
		)
	}

	// ── STABILIZED INTERACTION HANDLERS ──
	const handleAddOverride = useCallback(() => {
		onClose() // Close the manager sheet first

		// Open the creation sheet with pre-populated context [3]
		openPricingSheet(
			productId,
			null, // clinicId is unassigned at this stage
			defaultPlan?.pricingStrategy || 'PERTOOTH', // Default to standard strategy
		)
	}, [productId, defaultPlan, openPricingSheet, onClose])

	return (
		<Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<SheetContent
				showCloseButton={false}
				className="sm:max-w-md! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl"
			>
				{/* --- HEADER --- */}
				<SheetHeader className="p-6 sm:p-8 border-b border-border bg-slate-50/50 dark:bg-white/2 flex flex-row items-center justify-between space-y-0 shrink-0">
					<div className="flex items-center gap-3 min-w-0">
						<div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-sm shrink-0">
							<DollarSign className="w-5 h-5" />
						</div>
						<div className="flex flex-col text-left min-w-0">
							<SheetTitle className="text-lg font-bold tracking-tight text-foreground truncate">
								{productName}
							</SheetTitle>
							<p className="text-xs text-muted-foreground mt-0.5 font-medium">
								Pricing Matrix Configuration
							</p>
						</div>
					</div>
					<SheetClose asChild>
						<Button
							variant="ghost"
							size="icon"
							className="shrink-0 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors h-8 w-8"
						>
							<X className="w-4 h-4 text-muted-foreground" />
						</Button>
					</SheetClose>
				</SheetHeader>

				{/* --- BODY --- */}
				<div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar">
					{isLoading ? (
						<div className="flex justify-center p-8">
							<Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
						</div>
					) : (
						<>
							{/* 1. THE DEFAULT BASELINE */}
							<div className="space-y-3 animate-in fade-in duration-500">
								<h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-500 flex items-center gap-2">
									<ShieldCheck className="w-4 h-4" /> Global Catalog Rate
								</h3>

								{defaultPlan ? (
									<div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 shadow-sm flex flex-col gap-4">
										<div className="flex items-start justify-between gap-2">
											<div>
												<span className="text-sm font-bold text-foreground block">
													{defaultPlan.name}
												</span>
												<span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5 block">
													{defaultPlan.pricingStrategy}
												</span>
											</div>
											<Button
												variant="outline"
												size="sm"
												className="h-7 text-[10px] font-bold border-border bg-white dark:bg-[#121214]"
											>
												Edit Rate
											</Button>
										</div>

										<div className="flex items-end justify-between pt-3 border-t border-emerald-500/10">
											<span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
												Base Price
											</span>
											<span className="text-2xl font-mono font-bold text-foreground leading-none">
												{formatMoney(
													defaultPlan.toothPrice ||
														defaultPlan.bulkPrice ||
														defaultPlan.firstToothPrice,
												)}
											</span>
										</div>
									</div>
								) : (
									<div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-3 items-start">
										<AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
										<p className="text-xs font-medium text-amber-700 dark:text-amber-500 leading-relaxed">
											No default price is set for this product. Cases cannot be
											billed until a global rate is established.
										</p>
									</div>
								)}
							</div>

							{/* 2. CUSTOM CLINIC OVERRIDES */}
							<div className="space-y-4 pt-4 border-t border-border/50">
								<div className="flex items-center justify-between">
									<h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
										<Building2 className="w-4 h-4 text-primary/70" /> Clinic
										Overrides
									</h3>
									<span className="text-[10px] font-mono font-bold text-muted-foreground bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-md border border-border">
										{customPlans.length} Active
									</span>
								</div>

								<div className="space-y-3">
									{customPlans.length === 0 ? (
										<p className="text-xs text-muted-foreground italic text-center p-4">
											No custom deals active for this product.
										</p>
									) : (
										customPlans.map((plan) => (
											<div
												key={plan.id}
												className="p-4 rounded-xl border border-border bg-card shadow-sm hover:border-emerald-500/40 transition-all duration-300 group flex flex-col gap-3"
											>
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-2 min-w-0">
														<div className="w-6 h-6 rounded bg-slate-100 dark:bg-white/5 border border-border flex items-center justify-center text-muted-foreground shrink-0">
															<Building2 className="w-3 h-3" />
														</div>
														<span className="text-sm font-bold text-foreground truncate max-w-45">
															{plan.clinic?.name || 'Deleted Clinic'}
														</span>
													</div>

													{/* Calculate Discount Badge if Strategy Matches */}
													{defaultPlan &&
														plan.pricingStrategy ===
															defaultPlan.pricingStrategy &&
														getDiscountBadge(
															Number(plan.toothPrice || plan.bulkPrice),
															Number(
																defaultPlan.toothPrice || defaultPlan.bulkPrice,
															),
														)}
												</div>

												{/* --- DYNAMIC MATH BREAKDOWN (Hole Fixed) --- [2] */}
												<div className="flex flex-col pl-8 mt-1 border-l border-border/50">
													<div className="flex items-center justify-between">
														<span className="text-[10px] font-bold text-muted-foreground uppercase">
															{plan.pricingStrategy}
														</span>

														{plan.pricingStrategy === 'PERTOOTH' && (
															<span className="text-sm font-mono font-bold text-foreground">
																{formatMoney(plan.toothPrice)} / Unit
															</span>
														)}
														{plan.pricingStrategy === 'BULK' && (
															<span className="text-sm font-mono font-bold text-foreground">
																{formatMoney(plan.bulkPrice)} Flat
															</span>
														)}
														{plan.pricingStrategy === 'CUSTOM' && (
															<span className="text-xs font-mono font-bold text-foreground">
																{formatMoney(plan.firstToothPrice)} +{' '}
																{formatMoney(plan.additionalToothPrice)}
															</span>
														)}
													</div>

													{/* Show Volume Cap if present */}
													{plan.pricingStrategy === 'CUSTOM' &&
														plan.bulkPrice && (
															<div className="flex items-center justify-between mt-1 pt-1 border-t border-dashed border-border/50 text-[10px] text-emerald-600 dark:text-emerald-500 font-medium">
																<span>Volume Cap</span>
																<span>{formatMoney(plan.bulkPrice)} (Cap)</span>
															</div>
														)}
												</div>
											</div>
										))
									)}
								</div>

								{/* Action to create new custom plan [3] */}
								<Button
									onClick={handleAddOverride} // Connected to Zustand [3]
									className="w-full h-10 rounded-xl bg-slate-100 dark:bg-white/5 text-foreground hover:bg-slate-200 dark:hover:bg-white/10 font-bold border border-border transition-all mt-4"
								>
									<Plus className="w-4 h-4 mr-2" /> Add Clinic Override
								</Button>
							</div>
						</>
					)}
				</div>
			</SheetContent>
		</Sheet>
	)
})

PricingTierManagerSheet.displayName = 'PricingTierManagerSheet'
