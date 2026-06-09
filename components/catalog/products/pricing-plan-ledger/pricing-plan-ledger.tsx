'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
	Plus,
	Wallet,
	Landmark,
	Receipt,
	AlertCircle,
	Building2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'

// Zustand Store & Handlers
import { handleSafeActionError } from '@/lib/safe-action-helpers'
import { getPricingPlansByProductAction } from '@/actions/catalog/get-pricing-plans'
import { PricingPlanLedgerCard } from './pricing-plan-ledger-card'
import { PricingPlanDTO } from '@/schema/composed/catalog/pricing-plans.dtos'
import dynamic from 'next/dynamic'
import { CatalogRenameModal } from '@/components/modals/catalog/catalog-rename-modal'

interface Props {
	productId?: string
	labId: string
}

const PricingPlanEditorSheet = dynamic(
	() =>
		import('../../../modals/pricing/custom-pricing-per-clinic/pricing-plan-editor-sheet').then(
			(m) => m.PricingPlanEditorSheet,
		),
	{
		ssr: false,
	},
)

type SheetPlanDetails = {
	planId: string | 'new'
	clinic: {
		id: string
		name: string
	} | null
}

export const PricingPlanLedger = memo(function PricingPlanLedger({
	productId,
	labId,
}: Props) {
	const queryClient = useQueryClient()

	const [sheetPlan, setSheetPlan] = useState<SheetPlanDetails | null>(null)
	const [isSheetOpen, setIsSheetOpen] = useState(false)

	const [renameModal, setRenameModal] = useState(false)
	const [planToRename, setPlanToRename] = useState<{
		id: string
		name: string
	} | null>(null)

	// --- 1. DATA FETCHING ---
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

	// --- 2. DERIVED STATE & GROUPING ENGINE ---
	const generalPlans = pricingPlans.filter((p) => !p.clinic)
	const customClinicPlans = pricingPlans.filter((p) => p.clinic)

	const defaultPlan = useMemo(() => {
		return generalPlans.find((p) => p.isDefault)
	}, [generalPlans])

	const standardBasePrice = useMemo(() => {
		if (!defaultPlan) return null
		if (defaultPlan.pricingStrategy === 'PERTOOTH')
			return defaultPlan.toothPrice
		if (defaultPlan.pricingStrategy === 'BULK') return defaultPlan.bulkPrice
		if (defaultPlan.pricingStrategy === 'CUSTOM')
			return defaultPlan.firstToothPrice
		return 0
	}, [defaultPlan])

	// 🔥 THE ATOMIC GROUPING: Group custom deals by Clinic Name
	const groupedClinicPlans = useMemo(() => {
		const groups = new Map<
			string,
			{ clinicName: string; plans: PricingPlanDTO[] }
		>()

		customClinicPlans.forEach((plan) => {
			const clinicId = plan.clinic?.id || 'unknown'
			const clinicName = plan.clinic?.name || 'Unassigned Clinic'

			const existing = groups.get(clinicId) || { clinicName, plans: [] }
			existing.plans.push(plan)
			groups.set(clinicId, existing)
		})

		return Array.from(groups.entries())
	}, [customClinicPlans])

	const handleCreateNew = useCallback(
		(clinicId?: string, clinicName?: string) => {
			if (clinicId) {
				setSheetPlan({
					planId: 'new',
					clinic: {
						id: clinicId,
						name: clinicName ?? 'N/A',
					},
				}) // Use "new" as a flag for creation mode
			} else {
				setSheetPlan({
					planId: 'new',
					clinic: null,
				})
			}
			setIsSheetOpen(true)
		},
		[],
	)

	const handleEdit = useCallback(
		(id: string, clinicId?: string, clinicName?: string) => {
			if (clinicId) {
				setSheetPlan({
					planId: id,
					clinic: {
						id: clinicId,
						name: clinicName ?? 'N/A',
					},
				})
			} else {
				setSheetPlan({
					planId: id,
					clinic: null,
				})
			}
			setIsSheetOpen(true)
		},
		[],
	)

	const handleClose = useCallback(() => {
		setIsSheetOpen(false)
		setTimeout(() => {
			setSheetPlan(null)
		}, 300)
	}, [])

	const planIdToEdit =
		sheetPlan && sheetPlan.planId !== 'new' ? sheetPlan.planId : null

	const handleRename = useCallback((id: string, name: string) => {
		setPlanToRename({
			id,
			name,
		})
		setRenameModal(true)
	}, [])

	const handleCloseRenameModal = useCallback(() => {
		setRenameModal(false)
		setPlanToRename(null)
	}, [])

	// --- 3. LOADING STATE ---
	if (isLoading) {
		return (
			<div className="flex flex-col h-full animate-in fade-in duration-500">
				<Skeleton className="h-12 w-64 bg-slate-100 dark:bg-white/5 rounded-xl mb-8" />
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
					<Skeleton className="h-44 rounded-2xl bg-slate-100 dark:bg-white/5" />
					<Skeleton className="h-44 rounded-2xl bg-slate-100 dark:bg-white/5" />
				</div>
			</div>
		)
	}

	if (!productId) return null

	return (
		<div className="flex flex-col h-full overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-right-4 duration-500 relative bg-background">
			<div className="absolute top-0 right-0 w-125 h-125 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

			{/* --- HEADER --- */}
			<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 shrink-0 relative z-10">
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
			</div>

			<div className="space-y-10 flex-1 relative z-10">
				{/* --- ZONE A: GENERAL PRICING PLANS --- */}
				<div className="space-y-4">
					<div className="flex items-center justify-between px-1">
						<div className="flex items-center gap-2">
							<Landmark className="w-4 h-4 text-emerald-500" />
							<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
								Global Catalog Rates
							</h3>
						</div>
						<Button
							variant="outline"
							className="h-8 text-xs rounded-lg font-bold border-emerald-500/20 text-emerald-600 hover:bg-emerald-500/5 shadow-sm"
							onClick={() => handleCreateNew()}
						>
							<Plus className="w-3.5 h-3.5 mr-1.5" /> Add General Rate
						</Button>
					</div>

					{generalPlans.length === 0 ? (
						<div className="p-8 rounded-3xl border-2 border-dashed border-rose-500/30 bg-rose-500/2 text-center flex flex-col items-center justify-center gap-3">
							<AlertCircle className="w-8 h-8 text-rose-500 animate-pulse" />
							<p className="text-sm font-bold text-foreground">
								No General Rates Configured
							</p>
							<p className="text-[11px] text-muted-foreground max-w-md">
								You must have at least one general rate to bill cases for this
								product.
							</p>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
							{generalPlans.map((plan) => (
								<PricingPlanLedgerCard
									key={plan.id}
									plan={plan}
									isGlobalDefault={plan.isDefault}
									onEdit={handleEdit}
									onRename={handleRename}
								/>
							))}
						</div>
					)}
				</div>

				{/* --- ZONE B: CUSTOM CLINIC OVERRIDES (GROUPED) --- */}
				<div className="space-y-6 pt-6 border-t border-border/50">
					<div className="flex items-center justify-between px-1">
						<div className="flex items-center gap-2">
							<Wallet className="w-4 h-4 text-primary" />
							<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
								Clinic-Specific Overrides
							</h3>
						</div>
						<Button
							variant="outline"
							className="h-8 text-xs rounded-lg font-bold border-primary/20 text-primary hover:bg-primary/5 shadow-sm"
							onClick={() => handleCreateNew()}
							disabled={!defaultPlan}
						>
							<Plus className="w-3.5 h-3.5 mr-1.5" /> Add Custom Deal
						</Button>
					</div>

					{groupedClinicPlans.length === 0 ? (
						<div className="h-32 rounded-2xl border border-dashed border-border flex flex-col items-center justify-center text-center opacity-60">
							<Receipt className="w-6 h-6 text-muted-foreground mb-2" />
							<p className="text-xs font-bold text-foreground">
								No clinic overrides configured.
							</p>
							<p className="text-[10px] text-muted-foreground mt-1 max-w-55 leading-relaxed">
								Click the button above to negotiate a special rate for a
								specific account.
							</p>
						</div>
					) : (
						// Loop over the grouped clinics instead of a flat list!
						<div className="space-y-8 pl-1">
							{groupedClinicPlans.map(([clinicId, group]) => (
								<div key={clinicId} className="space-y-3 relative">
									{/* Clinic Sub-Header */}
									<div className="flex items-center justify-between border-b border-border/50 pb-2">
										<div className="flex items-center gap-2 text-muted-foreground">
											<Building2 className="w-3.5 h-3.5 text-slate-400" />
											<span className="text-xs font-bold text-slate-700 dark:text-zinc-300">
												{group.clinicName}
											</span>
										</div>

										{/* CONTEXTUAL TRIGGER: Opens the sheet pre-filled for this specific clinic! */}
										<div className="flex items-center gap-3">
											<Button
												variant="ghost"
												size="icon"
												onClick={() =>
													handleCreateNew(clinicId, group.clinicName)
												} // Pass the clinicId and Name!
												className="w-6 h-6 rounded-md hover:bg-emerald-500/10 text-emerald-600 hover:text-emerald-700 transition-colors"
												title={`Add another rate for ${group.clinicName}`}
											>
												<Plus className="w-3.5 h-3.5" />
											</Button>
											<span className="text-[9px] font-mono font-bold text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10 shadow-sm">
												{group.plans.length} Custom Rate
												{group.plans.length === 1 ? '' : 's'}
											</span>
										</div>
									</div>
									{/* Embedded Grid just for this Clinic's custom deals */}
									<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
										{group.plans.map((plan) => (
											<PricingPlanLedgerCard
												key={plan.id}
												plan={plan}
												standardBasePrice={standardBasePrice}
												onEdit={(id) =>
													handleEdit(id, clinicId, group.clinicName)
												}
												onRename={handleRename}
											/>
										))}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
			{sheetPlan && (
				<PricingPlanEditorSheet
					activeProductId={productId}
					clinicId={sheetPlan?.clinic?.id}
					clinicName={sheetPlan?.clinic?.name}
					isOpen={isSheetOpen}
					isEdit={!!planIdToEdit}
					onClose={handleClose}
					planIdToEdit={planIdToEdit}
					key={sheetPlan?.planId ?? 'new'}
				/>
			)}
			{planToRename && (
				<CatalogRenameModal
					isOpen={renameModal}
					onClose={handleCloseRenameModal}
					entityId={planToRename.id}
					entityType="PRICING_PLAN"
					initialName={planToRename.name}
					key={planToRename.id}
					onSuccess={() => {
						queryClient.invalidateQueries({
							queryKey: ['catalog-pricing-plans', labId, productId],
						})
					}}
				/>
			)}
		</div>
	)
})
