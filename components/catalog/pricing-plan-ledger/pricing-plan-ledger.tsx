'use client'

import { useQuery } from '@tanstack/react-query'
import {
	Plus,
	Wallet,
	ShieldCheck,
	Landmark,
	Receipt,
	AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

// Zustand Store to trigger your existing CreatePricingPlanSheet!
import { useClinicalCreationStore } from '@/store/use-clinical-creation-store'
import { handleSafeActionError } from '@/lib/safe-action-helpers'
import { getPricingPlansByProductAction } from '@/actions/catalog/get-pricing-plans'
import { PricingPlanLedgerCard } from './pricing-plan-ledger-card'

// Replace with your actual server action

// We will build this component in the next step!
// import { PricingPlanLedgerCard } from "./pricing-plan-ledger-card";

interface Props {
	productId?: string
	labId: string
}

export function PricingPlanLedger({ productId, labId }: Props) {
	// Zustand Hook: Trigger the creation sheet pre-filled with the active Product ID
	const openPricingSheet = useClinicalCreationStore(
		(state) => state.openPricingSheet,
	)

	// --- 1. DATA FETCHING (TanStack Query) ---
	const { data: pricingPlans = [], isLoading } = useQuery({
		queryKey: ['catalog-pricing-plans', labId, productId],
		queryFn: async () => {
			if (!productId) return []
			const res = await getPricingPlansByProductAction({ productId, limit: 50 })
			if (res?.serverError || res?.validationErrors) {
				handleSafeActionError({
					serverError: res.serverError,
					validationErrors: res.validationErrors,
				})
				return []
			}
			return res?.data?.pricings || []
		},
		enabled: !!productId,
		staleTime: 1000 * 60 * 5,
	})

	// --- 2. SEPARATE DEFAULT VS CLINIC OVERRIDES ---
	const defaultPlan = pricingPlans.find((p: any) => p.isDefault)
	const customClinicPlans = pricingPlans.filter((p: any) => !p.isDefault)

	// --- 3. LOADING STATE ---
	if (isLoading) {
		return (
			<div className="flex flex-col h-full p-6 lg:p-10 animate-in fade-in duration-500">
				<div className="flex justify-between mb-8">
					<Skeleton className="h-12 w-64 bg-slate-100 dark:bg-white/5 rounded-xl" />
					<Skeleton className="h-10 w-44 bg-slate-100 dark:bg-white/5 rounded-xl" />
				</div>
				<div className="space-y-6">
					<Skeleton className="h-32 w-full bg-slate-100 dark:bg-white/5 rounded-2xl" />
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Skeleton className="h-44 rounded-2xl bg-slate-100 dark:bg-white/5" />
						<Skeleton className="h-44 rounded-2xl bg-slate-100 dark:bg-white/5" />
					</div>
				</div>
			</div>
		)
	}

	if (!productId) {
		return <p>nothing!!!!</p>
	}

	return (
		<div className="flex flex-col h-full overflow-y-auto custom-scrollbar p-6 lg:p-10 animate-in fade-in duration-500 relative">
			{/* Ambient Financial Emerald Glow */}
			<div className="absolute top-0 right-0 w-125 h-125 bg-emerald-500/3 rounded-full blur-[100px] pointer-events-none -z-10" />

			{/* --- HEADER --- */}
			<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 shrink-0">
				<div>
					<div className="flex items-center gap-3 mb-1">
						<div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
						<h2 className="text-2xl font-bold tracking-tight text-foreground">
							Financial Ledger
						</h2>
					</div>
					<p className="text-sm text-muted-foreground ml-4">
						Configure base lab rates and negotiated clinic overrides.
					</p>
				</div>

				<Button
					className="h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-premium font-bold transition-all shrink-0"
					onClick={() => {
						// Trigger the Sheet from the store, passing the active productId
						openPricingSheet(productId, null)
					}}
				>
					<Plus className="w-4 h-4 mr-2" /> Custom Clinic Deal
				</Button>
			</div>

			<div className="space-y-8 flex-1">
				{/* --- ZONE A: THE GLOBAL DEFAULT RATE (The Anchor) --- */}
				<div className="space-y-4">
					<div className="flex items-center gap-2 px-1">
						<Landmark className="w-4 h-4 text-emerald-500" />
						<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
							Standard Lab Rate
						</h3>
					</div>

					{defaultPlan ? (
						<PricingPlanLedgerCard
							plan={defaultPlan}
							isGlobalDefault
							onEdit={() => {}}
						/>
					) : (
						// <div className="p-6 rounded-2xl border-2 border-emerald-500/20 bg-emerald-500/2 flex items-center justify-between m-1">
						// 	<div className="flex items-center gap-4">
						// 		<div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
						// 			<ShieldCheck className="w-5 h-5" />
						// 		</div>
						// 		<div>
						// 			<h4 className="text-sm font-bold text-foreground">
						// 				Standard Catalog Price
						// 			</h4>
						// 			<p className="text-xs text-muted-foreground mt-0.5">
						// 				This price applies automatically to any clinic without a
						// 				custom contract.
						// 			</p>
						// 		</div>
						// 	</div>
						// 	<div className="text-right">
						// 		{/* Placeholder for the card's visual price */}
						// 		<p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">
						// 			PricingPlanLedgerCard (Default)
						// 		</p>
						// 		<span className="text-xs font-mono font-bold text-emerald-500">
						// 			ID: {defaultPlan.id.substring(0, 8)}
						// 		</span>
						// 	</div>
						// </div>
						<div className="p-6 rounded-2xl border-2 border-dashed border-border bg-slate-50/50 dark:bg-white/2 text-center flex flex-col items-center justify-center gap-2">
							<AlertCircle className="w-6 h-6 text-amber-500 animate-pulse" />
							<p className="text-xs font-bold text-foreground">
								No Default Rate Configured
							</p>
							<p className="text-[11px] text-muted-foreground">
								Every product must have a default rate. Click below to configure
								the catalog baseline.
							</p>
						</div>
					)}
				</div>

				{/* --- ZONE B: CUSTOM CLINIC OVERRIDES --- */}
				<div className="space-y-4">
					<div className="flex items-center gap-2 px-1">
						<Wallet className="w-4 h-4 text-primary" />
						<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
							Clinic-Specific Overrides
						</h3>
					</div>

					{customClinicPlans.length === 0 ? (
						<div className="h-32 rounded-2xl border border-dashed border-border flex flex-col items-center justify-center text-center opacity-60">
							<Receipt className="w-6 h-6 text-muted-foreground mb-2" />
							<p className="text-xs font-bold text-foreground">
								No custom clinic deals configured.
							</p>
							<p className="text-[10px] text-muted-foreground mt-1">
								Add custom rates to override the standard catalog price for
								specific accounts.
							</p>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
							{customClinicPlans.map((plan: any) => (
								<PricingPlanLedgerCard
									key={plan.id}
									plan={plan}
									onEdit={() => {}}
								/>
								// <div
								// 	key={plan.id}
								// 	className="p-4 border border-border rounded-2xl bg-card"
								// >
								// 	<p className="text-xs font-bold text-foreground">
								// 		{plan.name}
								// 	</p>
								// 	<p className="text-[10px] text-muted-foreground font-mono mt-1">
								// 		PricingPlanLedgerCard Placeholder
								// 	</p>
								// </div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
