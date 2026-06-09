'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { ProductIdentityVitals } from './product-identity-vitals'
import { ProductAddonsGrid } from './product-addons-grid'
import { PricingPlanLedger } from './pricing-plan-ledger/pricing-plan-ledger'
import { CatalogRenameModal } from '@/components/modals/catalog/catalog-rename-modal'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { dehydrate, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { getProductByIdAction } from '@/actions/catalog/products/get-product'
import { QueryHydrationBoundary } from '@/providers/query-hydration-boundary'

const preloadEditorSheet = () =>
	import('../../modals/catalog/products/product-editor-sheet')
const ProductEditorSheet = dynamic(
	() =>
		import('../../modals/catalog/products/product-editor-sheet').then(
			(m) => m.ProductEditorSheet,
		),
	{
		ssr: false,
	},
)

export function ProductWorkspace({
	productId,
	labId,
	workTypeId,
}: {
	productId?: string
	labId: string
	workTypeId?: string
}) {
	const queryClient = useQueryClient()
	const searchParams = useSearchParams()

	const [productEditId, setProductEditId] = useState<string | null>(null)
	const [isEditorSheetOpen, setIsEditorSheetOpen] = useState(false)

	const [renameModal, setRenameModal] = useState(false)
	const [prodToRename, setProdToRename] = useState<{
		id: string
		name: string
	} | null>(null)

	useEffect(() => {
		preloadEditorSheet()
	}, [])

	queryClient.prefetchQuery({
		queryKey: ['product-editor-details', productEditId],
		queryFn: async () => {
			if (!productEditId) return null
			const res = await getProductByIdAction({ productId: productEditId })

			return res.data?.product ?? null
		},
	})

	const resolvedWorktypeId = useMemo(() => {
		return workTypeId ?? searchParams.get('wt')
	}, [workTypeId, searchParams])

	const handleRename = useCallback((id: string, name: string) => {
		setProdToRename({
			id,
			name,
		})
		setRenameModal(true)
	}, [])

	const handleCloseRenameModal = useCallback(() => {
		setRenameModal(false)
		setProdToRename(null)
	}, [])

	const handleEdit = useCallback((id: string) => {
		setProductEditId(id)

		setIsEditorSheetOpen(true)
	}, [])

	const handleCloseEditor = useCallback(() => {
		setIsEditorSheetOpen(false)
		setTimeout(() => {
			setProductEditId(null)
		}, 300)
	}, [])

	if (!productId) {
		return (
			<div className="p-8">
				<Skeleton className="h-100 w-full rounded-4xl bg-slate-100 dark:bg-white/5" />
			</div>
		)
	}

	return (
		<div className="flex-1 h-full overflow-y-auto custom-scrollbar p-6 lg:p-10 relative">
			{/* ZONE A: The Hero Card */}
			<ProductIdentityVitals
				productId={productId}
				onEdit={handleEdit}
				onArchiveToggle={(id, state) =>
					console.log('Toggle Archive', id, state)
				}
				onDeleteClick={() => {}}
				onRename={handleRename}
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

			{resolvedWorktypeId && (
				<QueryHydrationBoundary state={dehydrate(queryClient)}>
					<ProductEditorSheet
						isOpen={isEditorSheetOpen}
						onClose={handleCloseEditor}
						workTypeId={resolvedWorktypeId}
						productIdToEdit={productEditId}
						isEdit={!!productEditId}
						key={productEditId ?? 'new'}
					/>
				</QueryHydrationBoundary>
			)}

			{prodToRename && (
				<CatalogRenameModal
					isOpen={renameModal}
					onClose={handleCloseRenameModal}
					entityId={prodToRename.id}
					entityType="PRODUCT"
					initialName={prodToRename.name}
					key={prodToRename.id}
					onSuccess={() => {
						queryClient.invalidateQueries({
							queryKey: ['product-vitals', prodToRename.id],
						})

						queryClient.invalidateQueries({
							queryKey: ['catalog-products', labId, resolvedWorktypeId],
						})
					}}
				/>
			)}
		</div>
	)
}
