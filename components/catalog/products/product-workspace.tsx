'use client'

import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton'
import { ProductIdentityVitals } from './product-identity-vitals'
import { ProductAddonsGrid } from './product-addons-grid'
import { getProductVitalsAction } from '@/actions/catalog/products/get-product-vitals'
import { PricingPlanLedger } from './pricing-plan-ledger/pricing-plan-ledger'

export function ProductWorkspace({
	productId,
	labId,
}: {
	productId?: string
	labId: string
}) {
	if (!productId) {
		return (
			<div className="p-8">
				<Skeleton className="h-[400px] w-full rounded-[32px] bg-slate-100 dark:bg-white/5" />
			</div>
		)
	}

	return (
		<div className="flex-1 h-full overflow-y-auto custom-scrollbar p-6 lg:p-10 relative">
			{/* ZONE A: The Hero Card */}
			<ProductIdentityVitals
				productId={productId}
				onEdit={(id) => console.log('Edit', id)}
				onArchiveToggle={(id, state) =>
					console.log('Toggle Archive', id, state)
				}
			/>

			{/* ZONE B: Accessories */}
			<ProductAddonsGrid
				productId={productId}
				onAddAccessory={(id) => console.log('Open Addon Modal', id)}
				onEditAccessory={(id) => console.log('Edit Addon', id)}
				onArchiveAccessory={(id, state) =>
					console.log('Archive Addon', id, state)
				}
			/>

			{/* ZONE C: The Financial Ledger (Spacing added automatically via padding) */}
			<div className="pt-10">
				<PricingPlanLedger productId={productId} labId={labId} />
			</div>
		</div>
	)
}
