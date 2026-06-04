import { getPricingPlansByProductAction } from '@/actions/catalog/get-pricing-plans'
import { getQueryClient } from '@/providers/get-query-client'
import { QueryHydrationBoundary } from '@/providers/query-hydration-boundary'
import { PricingPlanDTO } from '@/schema/composed/catalog/pricing-plans.dtos'
import { dehydrate } from '@tanstack/react-query'
import { ReactNode } from 'react'

interface Props {
	productId: string
	children: ReactNode
}

export async function ProductMatrixHydrationWrapper({
	productId,
	children,
}: Props) {
	const queryClient = getQueryClient()
	await queryClient.prefetchQuery({
		queryKey: ['pricing-plans', productId],
		queryFn: async () => {
			if (!productId) return []
			const res = await getPricingPlansByProductAction({ productId })

			if (res.serverError || res.validationErrors) {
				return []
			}
			return (res.data?.pricings as PricingPlanDTO[]) || []
		},
	})

	return (
		<QueryHydrationBoundary state={dehydrate(queryClient)}>
			{children}
		</QueryHydrationBoundary>
	)
}
