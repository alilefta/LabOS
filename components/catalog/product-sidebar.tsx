'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { Package, Search, Plus, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { memo, useCallback, useState } from 'react'
import useDebounce from '@/hooks/useDebounce'
import { handleSafeActionError } from '@/lib/safe-action-helpers'

import { getProductsByWorkTypeAction } from '@/actions/catalog/get-products'
import { CatalogRenameModal } from '../modals/catalog/catalog-rename-modal'
import { ProductItem } from './products/sidebar/product-sidebar-item'
import dynamic from 'next/dynamic'
import { ArchiveProductModal } from '../modals/catalog/products/archive-product-modal'

interface Props {
	labId: string
	workTypeId: string
	activeProductId?: string
}

const ProductEditorSheet = dynamic(
	() =>
		import('../modals/catalog/products/product-editor-sheet').then(
			(m) => m.ProductEditorSheet,
		),
	{
		ssr: false,
	},
)

export const ProductSidebar = memo(function ProductSidebar({
	labId,
	workTypeId,
	activeProductId,
}: Props) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const queryClient = useQueryClient()

	const [productEditId, setProductEditId] = useState<string | null>(null)
	const [isEditorSheetOpen, setIsEditorSheetOpen] = useState(false)

	const [renameModal, setRenameModal] = useState(false)
	const [prodToRename, setProdToRename] = useState<{
		id: string
		name: string
	} | null>(null)

	const [productToArchive, setProductToArchive] = useState<{
		id: string
		name: string
		isCurrentlyArchived: boolean
	} | null>(null)

	const [isArchiveProductModalOpen, setIsArchiveProductModalOpen] =
		useState(false)

	// Local Search State
	const [searchQuery, setSearchQuery] = useState('')
	const debouncedSearch = useDebounce({ value: searchQuery, delay: 300 })

	// Fetch Products for this specific WorkType
	const { data: products = [], isLoading } = useQuery({
		queryKey: ['catalog-products', labId, workTypeId],
		queryFn: async () => {
			const res = await getProductsByWorkTypeAction({
				workTypeId,
				showArchived: true,
			})
			if (res?.serverError || res?.validationErrors) {
				handleSafeActionError({
					serverError: res.serverError,
					validationErrors: res.validationErrors,
				})
				return []
			}
			return res?.data?.products || []
		},
		staleTime: 1000 * 60 * 5,
	})

	// Client-side filtering
	const filteredProducts = products.filter((prod) =>
		prod.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
	)

	// URL Builders
	const createProductLink = (productId: string) => {
		const params = new URLSearchParams(searchParams.toString())
		params.set('product', productId)
		return `${pathname}?${params.toString()}`
	}

	const navigateBack = () => {
		const params = new URLSearchParams(searchParams.toString())
		params.delete('wt')
		params.delete('product')
		// Retain the 'category' param so the parent view returns exactly where they left off!
		router.replace(`${pathname}?${params.toString()}`)
	}

	const handleRename = useCallback((id: string, name: string) => {
		setProdToRename({
			id,
			name,
		})
		setRenameModal(true)
	}, [])

	const handleCreateNew = useCallback(() => {
		setProductEditId(null)
		setIsEditorSheetOpen(true)
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

	const handleCloseRenameModal = useCallback(() => {
		setRenameModal(false)
		setProdToRename(null)
	}, [])

	const handleCloseEditor = useCallback(() => {
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

	return (
		<div className="flex flex-col h-full bg-slate-50/30 dark:bg-black/10 animate-in slide-in-from-right-4 fade-in duration-500">
			{/* --- THE ESCAPE HATCH --- */}
			<div className="p-3 border-b border-border/50 shrink-0 bg-background/80 backdrop-blur-md">
				<Button
					variant="ghost"
					onClick={navigateBack}
					className="w-full justify-start h-9 rounded-lg text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-slate-200 dark:hover:bg-white/5 transition-colors"
				>
					<ChevronLeft className="w-4 h-4 mr-1.5" /> Back to Departments
				</Button>
			</div>

			{/* --- HEADER --- */}
			<div className="p-5 border-b border-border shrink-0 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-2.5">
						<div className="w-7 h-7 rounded-lg bg-ai/10 flex items-center justify-center text-ai shadow-sm border border-ai/20">
							<Package className="w-3.5 h-3.5" />
						</div>
						<h2 className="text-sm font-bold text-foreground">
							Catalog Products
						</h2>
					</div>

					{/* Add Product Button */}
					<Button
						size="icon"
						variant="ghost"
						className="h-8 w-8 rounded-lg text-ai hover:bg-ai/10 hover:text-ai transition-colors"
						onClick={() => {
							handleCreateNew()
						}}
					>
						<Plus className="w-4 h-4" />
					</Button>
				</div>

				{/* Search Bar */}
				<div className="relative group">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground group-focus-within:text-ai transition-colors" />
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Search products..."
						className="w-full h-9 pl-9 pr-4 bg-white dark:bg-[#121214] border border-border rounded-xl text-xs focus:outline-none focus:border-ai focus:ring-[3px] focus:ring-ai/20 transition-all shadow-sm"
					/>
				</div>
			</div>

			{/* --- LIST BODY --- */}
			<div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
				{isLoading ? (
					Array.from({ length: 5 }).map((_, i) => (
						<div
							key={i}
							className="h-12 w-full bg-slate-100 dark:bg-white/5 rounded-xl animate-pulse mb-1.5"
						/>
					))
				) : filteredProducts.length === 0 ? (
					<div className="flex flex-col items-center justify-center text-center p-8 opacity-60">
						<Package className="w-8 h-8 text-muted-foreground mb-3" />
						<p className="text-xs font-bold text-foreground">
							No products found
						</p>
						<p className="text-[10px] text-muted-foreground mt-1 max-w-45">
							Add materials to this department to configure pricing.
						</p>
					</div>
				) : (
					filteredProducts.map((prod) => {
						const isActive = activeProductId === prod.id

						return (
							<ProductItem
								key={prod.id}
								createProductLink={createProductLink}
								handleRename={handleRename}
								isActive={isActive}
								prod={prod}
								handleEdit={handleEdit}
								onArchive={handleArchive}
							/>
						)
					})
				)}
			</div>

			<ProductEditorSheet
				isOpen={isEditorSheetOpen}
				onClose={handleCloseEditor}
				workTypeId={workTypeId}
				productIdToEdit={productEditId}
				isEdit={!!productEditId}
				onSuccess={() => {
					queryClient.invalidateQueries({
						queryKey: ['catalog-products', labId, workTypeId],
					})

					queryClient.invalidateQueries({
						queryKey: ['product-vitals', activeProductId],
					})
				}}
			/>

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
							queryKey: ['catalog-products', labId, workTypeId],
						})
						queryClient.invalidateQueries({
							queryKey: ['product-vitals', prodToRename.id],
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
							queryKey: ['catalog-products', labId, workTypeId],
						})
					}}
					isCurrentlyArchived={productToArchive.isCurrentlyArchived}
				/>
			)}
		</div>
	)
})
