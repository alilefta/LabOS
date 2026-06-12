'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { ProductIdentityVitals } from './product-identity-vitals'
import { ProductAddonsGrid } from './product-addons-grid'
import { PricingPlanLedger } from './pricing-plan-ledger/pricing-plan-ledger'
import { CatalogRenameModal } from '@/components/modals/catalog/catalog-rename-modal'
import { useCallback, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { DeleteProductModal } from '@/components/modals/catalog/products/delete-product-modal'
import { ArchiveProductModal } from '@/components/modals/catalog/products/archive-product-modal'

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
	const pathName = usePathname()
	const router = useRouter()

	const [productEditId, setProductEditId] = useState<string | null>(null)
	const [isEditorSheetOpen, setIsEditorSheetOpen] = useState(false)
	const [isArchiveProductModalOpen, setIsArchiveProductModalOpen] =
		useState(false)

	const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] =
		useState(false)

	const [isRenameModalOpen, setIsRenameModalOpen] = useState(false)

	const [productToArchive, setProductToArchive] = useState<{
		id: string
		name: string
		isCurrentlyArchived: boolean
	} | null>(null)

	const [productToPermanentDelete, setProductToPermanentDelete] = useState<{
		id: string
		name: string
	} | null>(null)

	const [prodToRename, setProdToRename] = useState<{
		id: string
		name: string
	} | null>(null)

	const resolvedWorktypeId = useMemo(() => {
		return workTypeId ?? searchParams.get('wt')
	}, [workTypeId, searchParams])

	const handleRename = useCallback((id: string, name: string) => {
		setProdToRename({
			id,
			name,
		})
		setIsRenameModalOpen(true)
	}, [])

	const handleCloseRenameModal = useCallback(() => {
		setIsRenameModalOpen(false)
		setProdToRename(null)
	}, [])

	const handleEdit = useCallback((id: string) => {
		setProductEditId(id)
		setIsEditorSheetOpen(true)
	}, [])

	const handleArchive = useCallback(
		(id: string, name: string, isCurrentlyArchived: boolean) => {
			setProductToArchive({
				id,
				name,
				isCurrentlyArchived,
			})
			setIsArchiveProductModalOpen(true)
		},
		[],
	)

	const handlePermanentDelete = useCallback((id: string, name: string) => {
		setProductToPermanentDelete({
			id,
			name,
		})
		setIsDeleteProductModalOpen(true)
	}, [])

	const handleCloseProductEditor = useCallback(() => {
		setIsEditorSheetOpen(false)
		setTimeout(() => {
			setProductEditId(null)
		}, 300)
	}, [])

	const handleCloseArchiveProductModal = useCallback(() => {
		setIsArchiveProductModalOpen(false)
		setTimeout(() => {
			setProductToArchive(null)
		}, 300)
	}, [])
	const handleClosePermanentDeleteProductModal = useCallback(() => {
		setIsDeleteProductModalOpen(false)
		setTimeout(() => {
			setProductToPermanentDelete(null)
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
				onArchiveToggle={handleArchive}
				onDeleteClick={handlePermanentDelete}
				onRename={handleRename}
			/>

			{/* ZONE B: Accessories */}
			<ProductAddonsGrid productId={productId} labId={labId} />

			{/* ZONE C: The Financial Ledger (Spacing added automatically via padding) */}
			<div className="pt-10">
				<PricingPlanLedger productId={productId} labId={labId} />
			</div>

			{resolvedWorktypeId && (
				<ProductEditorSheet
					isOpen={isEditorSheetOpen}
					onClose={handleCloseProductEditor}
					workTypeId={resolvedWorktypeId}
					productIdToEdit={productEditId}
					isEdit={!!productEditId}
					key={productEditId}
					onSuccess={() => {
						queryClient.invalidateQueries({
							queryKey: ['catalog-products', labId, workTypeId],
						})
						queryClient.invalidateQueries({
							queryKey: ['product-vitals', productId],
						})
					}}
				/>
			)}

			{prodToRename && (
				<CatalogRenameModal
					isOpen={isRenameModalOpen}
					onClose={handleCloseRenameModal}
					entityId={prodToRename.id}
					entityType="PRODUCT"
					initialName={prodToRename.name}
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

			{productToArchive && (
				<ArchiveProductModal
					isOpen={isArchiveProductModalOpen}
					onClose={handleCloseArchiveProductModal}
					productId={productToArchive.id}
					productName={productToArchive.name}
					key={productToArchive.id}
					onSuccess={() => {
						queryClient.invalidateQueries({
							queryKey: ['product-vitals', productToArchive.id],
						})

						queryClient.invalidateQueries({
							queryKey: ['catalog-products', labId, resolvedWorktypeId],
						})
					}}
					isCurrentlyArchived={productToArchive.isCurrentlyArchived}
				/>
			)}

			{productToPermanentDelete && (
				<DeleteProductModal
					isOpen={isDeleteProductModalOpen}
					onClose={handleClosePermanentDeleteProductModal}
					productId={productToPermanentDelete.id}
					productName={productToPermanentDelete.name}
					key={productToPermanentDelete.id}
					onSuccess={() => {
						router.push(pathName + `?wt=` + workTypeId)
					}}
				/>
			)}
		</div>
	)
}
