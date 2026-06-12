'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
	Plus,
	Settings2,
	MoreVertical,
	Edit3,
	Archive,
	DollarSign,
	Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Replace with your actual server action
import { handleSafeActionError } from '@/lib/safe-action-helpers'
import { ProductAddonDTO } from '@/schema/composed/catalog/product.dtos'
import { getProductAddonsAction } from '@/actions/catalog/product-addons/get-product-addons'
import { ProductAddonEditorSheet } from '@/components/modals/catalog/product-addons/product-addon-editor-sheet'
import { memo, useCallback, useState } from 'react'
import { ArchiveProductAddonModal } from '@/components/modals/catalog/product-addons/archive-product-addon-modal'
import { DeleteProductAddonModal } from '@/components/modals/catalog/product-addons/delete-product-addon-modal'

interface Props {
	productId: string
	labId: string
}
const formatMoney = (val: number) =>
	new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(val)

export const ProductAddonsGrid = memo(function ProductAddonsGrid({
	productId,
	labId,
}: Props) {
	const queryClient = useQueryClient()
	const [isProductAddonEditorOpen, setIsProductAddonEditorOpen] =
		useState(false)
	const [isAddonArchiveModalOpen, setIsAddonArchiveModalOpen] = useState(false)
	const [isAddonPermanentDeleteModalOpen, setIsAddonPermanentDeleteModalOpen] =
		useState(false)

	const [productAddonIdToEdit, setProductAddonIdToEdit] = useState<
		string | null
	>(null)

	const [productAddonToArchive, setProductAddonToArchive] = useState<{
		id: string
		name: string
		isArchived: boolean
	} | null>(null)

	const [productAddonToPermanentDelete, setProductAddonToPermanentDelete] =
		useState<{
			id: string
			name: string
		} | null>(null)

	// --- DATA FETCHING ---
	const { data: addons = [], isLoading } = useQuery({
		queryKey: ['product-addons', labId, productId],
		queryFn: async () => {
			const res = await getProductAddonsAction({ productId })
			if (res?.serverError || res?.validationErrors) {
				handleSafeActionError({
					serverError: res.serverError,
					validationErrors: res.validationErrors,
				})
				return []
			}
			return (res?.data?.addons as ProductAddonDTO[]) || []
		},
		enabled: !!productId,
		staleTime: 1000 * 60 * 5,
	})

	const handleEditProductAddon = useCallback((addonId: string) => {
		setProductAddonIdToEdit(addonId)
		setIsProductAddonEditorOpen(true)
	}, [])

	const handlePermanentDeleteProductAddon = useCallback(
		(addonId: string, name: string) => {
			setProductAddonToPermanentDelete({
				id: addonId,
				name,
			})
			setIsAddonPermanentDeleteModalOpen(true)
		},
		[],
	)

	const handleCreateNewAddon = useCallback(() => {
		setIsProductAddonEditorOpen(true)
	}, [])

	const handleCloseProductAddonEditorModal = useCallback(() => {
		setIsProductAddonEditorOpen(false)
		setTimeout(() => {
			setProductAddonIdToEdit(null)
		}, 300)
	}, [])

	const handleCloseProductAddonArchiveModal = useCallback(() => {
		setIsAddonArchiveModalOpen(false)
		setTimeout(() => {
			setProductAddonToArchive(null)
		}, 300)
	}, [])

	const handleClosePermanentDeleteModal = useCallback(() => {
		setIsAddonPermanentDeleteModalOpen(false)
		setTimeout(() => {
			setProductAddonToPermanentDelete(null)
		}, 300)
	}, [])

	const handleArchiveProductAddon = useCallback(
		(addonId: string, name: string, isArchived: boolean) => {
			setProductAddonToArchive({ id: addonId, name, isArchived })
			setIsAddonArchiveModalOpen(true)
		},
		[],
	)

	if (isLoading) {
		return (
			<div className="space-y-4 animate-in fade-in duration-500 pt-6">
				<div className="flex items-center gap-2 mb-4">
					<Skeleton className="w-6 h-6 rounded-md bg-slate-100 dark:bg-white/5" />
					<Skeleton className="w-32 h-5 rounded-md bg-slate-100 dark:bg-white/5" />
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
					{Array.from({ length: 3 }).map((_, i) => (
						<Skeleton
							key={i}
							className="h-16 rounded-xl bg-slate-100 dark:bg-white/5"
						/>
					))}
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col gap-4 pt-10 pb-6 border-b border-border/50 relative z-20 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
			{/* --- HEADER --- */}
			<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
				<div>
					<div className="flex items-center gap-2 mb-1">
						<Settings2 className="w-4 h-4 text-primary" />
						<h3 className="text-lg font-bold tracking-tight text-foreground">
							Accessories & Modifications
						</h3>
					</div>
					<p className="text-[11px] text-muted-foreground ml-6">
						Flat-fee additions that can be attached to this product during case
						entry.
					</p>
				</div>

				<Button
					variant="outline"
					size="sm"
					className="h-9 rounded-xl border-border bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-primary font-bold shadow-sm transition-all"
					onClick={() => handleCreateNewAddon()}
				>
					<Plus className="w-4 h-4 mr-1.5" /> Add Accessory
				</Button>
			</div>

			{/* --- GRID BODY --- */}
			{addons.length === 0 ? (
				<div className="p-6 rounded-2xl border-2 border-dashed border-border bg-slate-50/50 dark:bg-white/2 flex flex-col items-center justify-center text-center">
					<Settings2 className="w-6 h-6 text-slate-300 dark:text-zinc-600 mb-2" />
					<p className="text-xs font-bold text-foreground">
						No accessories configured.
					</p>
					<p className="text-[10px] text-muted-foreground max-w-sm mt-1">
						If this product requires optional physical additions (e.g. clasps,
						meshes), define them here.
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
					{addons.map((addon) => (
						<div
							key={addon.id}
							className={cn(
								'flex items-center justify-between p-3.5 rounded-xl border bg-card transition-all duration-300 group',
								addon.isArchived
									? 'opacity-50 grayscale hover:grayscale-0 border-border'
									: 'border-border hover:border-primary/30 shadow-sm hover:shadow-md',
							)}
						>
							<div className="flex flex-col gap-0.5 min-w-0 pr-4">
								<span className="text-sm font-bold text-foreground truncate flex items-center gap-2">
									{addon.name}
									{addon.isArchived && (
										<span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-rose-500/10 text-rose-500 border border-rose-500/20">
											Archived
										</span>
									)}
								</span>
								<span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-500 flex items-center gap-1">
									<DollarSign className="w-3 h-3 opacity-50" />
									{formatMoney(addon.price)}
								</span>
							</div>

							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8 text-muted-foreground hover:text-foreground shrink-0 rounded-lg transition-colors focus-visible:ring-1 focus-visible:ring-primary"
									>
										<MoreVertical className="w-4 h-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align="end"
									className="w-48 rounded-xl border-border shadow-premium dark:bg-[#121214]"
								>
									{/* STANDARD ACTIONS */}
									<DropdownMenuItem
										onClick={() => handleEditProductAddon(addon.id)}
										className="cursor-pointer font-medium text-xs py-2 hover:bg-primary/5 focus:bg-primary/5"
									>
										<Edit3 className="w-3.5 h-3.5 mr-2 text-muted-foreground" />{' '}
										Edit Pricing
									</DropdownMenuItem>

									<DropdownMenuSeparator className="bg-border/50" />

									{/* SOFT-DELETE (Always Amber) */}
									<DropdownMenuItem
										onClick={() =>
											handleArchiveProductAddon(
												addon.id,
												addon.name,
												addon.isArchived,
											)
										}
										className="cursor-pointer font-medium text-xs py-2 text-amber-600 dark:text-amber-500 focus:text-amber-600 dark:focus:text-amber-500 focus:bg-amber-500/10 transition-colors"
									>
										<Archive className="w-3.5 h-3.5 mr-2" />
										{addon.isArchived
											? 'Restore Accessory'
											: 'Archive Accessory'}
									</DropdownMenuItem>

									{/* HARD-DELETE (Always Red) */}
									<DropdownMenuItem
										onClick={() =>
											handlePermanentDeleteProductAddon(addon.id, addon.name)
										}
										className="cursor-pointer font-medium text-xs py-2 text-destructive focus:text-destructive focus:bg-destructive/10 transition-colors"
									>
										<Trash2 className="w-3.5 h-3.5 mr-2" /> Delete Permanently
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					))}
				</div>
			)}

			<ProductAddonEditorSheet
				isOpen={isProductAddonEditorOpen}
				onClose={handleCloseProductAddonEditorModal}
				productId={productId}
				isEdit={!!productAddonIdToEdit}
				addonIdToEdit={productAddonIdToEdit}
				onSuccess={() => {
					queryClient.invalidateQueries({
						queryKey: ['product-addons', labId, productId],
					})

					queryClient.invalidateQueries({
						queryKey: ['product-vitals', productId],
					})
				}}
			/>

			{productAddonToArchive && (
				<ArchiveProductAddonModal
					isOpen={isAddonArchiveModalOpen}
					onClose={handleCloseProductAddonArchiveModal}
					key={productAddonToArchive.id}
					onSuccess={() => {
						queryClient.invalidateQueries({
							queryKey: ['product-vitals', productId],
						})
						queryClient.invalidateQueries({
							queryKey: ['product-addons', labId, productId],
						})
					}}
					isCurrentlyArchived={productAddonToArchive.isArchived}
					addonId={productAddonToArchive.id}
					addonName={productAddonToArchive.name}
				/>
			)}

			{productAddonToPermanentDelete && (
				<DeleteProductAddonModal
					addonId={productAddonToPermanentDelete.id}
					addonName={productAddonToPermanentDelete.name}
					isOpen={isAddonPermanentDeleteModalOpen}
					onClose={handleClosePermanentDeleteModal}
					onSuccess={() => {}}
				/>
			)}
		</div>
	)
})
