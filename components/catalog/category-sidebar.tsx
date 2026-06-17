'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import {
	LayoutGrid,
	MoreVertical,
	Plus,
	Search,
	Archive,
	Edit3,
	Type,
	Trash2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { memo, useCallback, useState } from 'react'
import useDebounce from '@/hooks/useDebounce'

// Replace with your actual server action import
import { handleSafeActionError } from '@/lib/safe-action-helpers'
import { getCatalogCategoriesAction } from '@/actions/catalog/get-categories'
import { CatalogCategoryDTO } from '@/schema/composed/catalog/catalog.dtos'
import { CatalogRenameModal } from '../modals/catalog/catalog-rename-modal'
import { CategoryEditorSheet } from '../modals/catalog/categories/category-editor-sheet'
import { ArchiveCategoryModal } from '../modals/catalog/categories/archive-category-modal'
import { DeleteCategoryModal } from '../modals/catalog/categories/delete-category-modal'
import { usePermissions } from '@/providers/permissions-provider'
import Image from 'next/image'

interface Props {
	labId: string
	activeCategoryId?: string
}

export const CategorySidebar = memo(function CategorySidebar({
	labId,
	activeCategoryId,
}: Props) {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const queryClient = useQueryClient()

	const [renameModal, setRenameModal] = useState(false)
	const [isEditorSheetOpen, setIsEditorSheetOpen] = useState(false)

	const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false)
	const [isPermanentDeleteModalOpen, setIsPermanentDeleteModalOpen] =
		useState(false)

	const [catToRename, setCatToRename] = useState<{
		id: string
		name: string
	} | null>(null)

	const [catToEdit, setCatToEdit] = useState<{
		id: string
		name: string
	} | null>(null)

	const [catToArchive, setCatToArchive] = useState<{
		id: string
		name: string
		isArchived: boolean
	} | null>(null)

	const [catToPermanentDelete, setCatToPermanentDelete] = useState<{
		id: string
		name: string
	} | null>(null)

	// Local Search State
	const [searchQuery, setSearchQuery] = useState('')
	const debouncedSearch = useDebounce({ value: searchQuery, delay: 300 })

	// Fetch Categories (Using TanStack for client-side caching & fast refetching)
	const { data: categories = [], isLoading } = useQuery({
		queryKey: ['catalog-categories', labId],
		queryFn: async () => {
			const res = await getCatalogCategoriesAction({
				showArchivedCategories: true,
			}) // Ensure this action fetches categories for the lab
			if (res?.serverError || res?.validationErrors) {
				handleSafeActionError({
					serverError: res.serverError,
					validationErrors: res.validationErrors,
				})
				return []
			}
			// Map to match your DTO shape
			return (res?.data?.categories as CatalogCategoryDTO[]) || []
		},
		staleTime: 1000 * 60 * 5, // 5 minutes
	})

	// Client-side filtering (since categories list is usually small, < 20 items)
	const filteredCategories = categories.filter((cat) =>
		cat.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
	)

	// URL Builder helper for deep linking
	const createCategoryLink = (categoryId: string) => {
		const params = new URLSearchParams(searchParams.toString())
		params.set('category', categoryId)
		params.delete('wt')
		params.delete('product')
		return `${pathname}?${params.toString()}`
	}

	const handleRename = useCallback((id: string, name: string) => {
		setCatToRename({
			id,
			name,
		})
		setRenameModal(true)
	}, [])

	const handleCloseRenameModal = useCallback(() => {
		setRenameModal(false)
		setCatToRename(null)
	}, [])

	const handleCloseEditorSheet = useCallback(() => {
		setIsEditorSheetOpen(false)
		setCatToEdit(null)
	}, [])

	const handleCloseArchiveModal = useCallback(() => {
		setIsArchiveModalOpen(false)
		setCatToArchive(null)
	}, [])

	const handleClosePermanentDeleteModal = useCallback(() => {
		setIsPermanentDeleteModalOpen(false)
		setCatToPermanentDelete(null)
	}, [])

	const handleCreateNewCategory = useCallback(() => {
		setIsEditorSheetOpen(true)
		setCatToEdit(null)
	}, [])

	const handleEditCategory = useCallback((id: string, name: string) => {
		setIsEditorSheetOpen(true)
		setCatToEdit({
			id,
			name,
		})
	}, [])

	const handleArchiveCategory = useCallback(
		(id: string, name: string, isArchived: boolean) => {
			setIsArchiveModalOpen(true)
			setCatToArchive({
				id,
				name,
				isArchived,
			})
		},
		[],
	)

	const handlePermanentDeleteCategory = useCallback(
		(id: string, name: string) => {
			setIsPermanentDeleteModalOpen(true)
			setCatToPermanentDelete({
				id,
				name,
			})
		},
		[],
	)
	return (
		<div className="flex flex-col h-full bg-slate-50/30 dark:bg-black/10 animate-in fade-in duration-500">
			{/* --- HEADER --- */}
			<div className="p-5 border-b border-border shrink-0 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-2.5">
						<div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
							<LayoutGrid className="w-3.5 h-3.5" />
						</div>
						<h2 className="text-sm font-bold text-foreground">
							Clinical Categories
						</h2>
					</div>

					{/* Add Category Button */}
					<Button
						size="icon"
						variant="ghost"
						className="h-8 w-8 rounded-lg text-primary hover:bg-primary/10 hover:text-primary transition-colors"
						onClick={handleCreateNewCategory}
					>
						<Plus className="w-4 h-4" />
					</Button>
				</div>

				{/* Search Bar */}
				<div className="relative group">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Search departments..."
						className="w-full h-9 pl-9 pr-4 bg-white dark:bg-[#121214] border border-border rounded-xl text-xs focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/20 transition-all shadow-sm"
					/>
				</div>
			</div>

			{/* --- LIST BODY --- */}
			<div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1 relative">
				{isLoading ? (
					// Skeleton Loading State
					Array.from({ length: 5 }).map((_, i) => (
						<div
							key={i}
							className="h-12 w-full bg-slate-100 dark:bg-white/2 rounded-xl animate-pulse mb-1.5"
						/>
					))
				) : filteredCategories.length === 0 ? (
					// Empty State
					<div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 opacity-60 animate-in fade-in zoom-in-95 duration-300">
						<LayoutGrid className="w-8 h-8 text-muted-foreground mb-3" />
						<p className="text-xs font-bold text-foreground">
							No categories found
						</p>
						{searchQuery && (
							<p className="text-[10px] text-muted-foreground mt-1 animate-pulse">
								Clear your search to see all items.
							</p>
						)}
					</div>
				) : (
					// Category List
					filteredCategories.map((cat) => {
						const isActive = activeCategoryId === cat.id

						return (
							<CategoryItem
								key={cat.id}
								cat={cat}
								createCategoryLink={createCategoryLink}
								handleRename={handleRename}
								isActive={isActive}
								handleEdit={handleEditCategory}
								handleArchive={handleArchiveCategory}
								handlePermanentDelete={handlePermanentDeleteCategory}
							/>
						)
					})
				)}
			</div>

			{/* --- MODALS --- */}
			{catToRename && (
				<CatalogRenameModal
					isOpen={renameModal}
					onClose={handleCloseRenameModal}
					entityId={catToRename.id}
					entityType="CATEGORY"
					initialName={catToRename.name}
					key={catToRename.id}
					onSuccess={() => {
						queryClient.invalidateQueries({
							queryKey: ['catalog-categories', labId],
						})
						queryClient.invalidateQueries({
							queryKey: ['catalog-work-types', labId, catToRename.id],
						})
					}}
				/>
			)}

			<CategoryEditorSheet
				isOpen={isEditorSheetOpen}
				onClose={handleCloseEditorSheet}
				categoryIdToEdit={catToEdit?.id}
				isEdit={!!catToEdit}
				onSuccess={() => {
					queryClient.invalidateQueries({
						queryKey: ['catalog-categories', labId],
					})
				}}
			/>

			{catToArchive && (
				<ArchiveCategoryModal
					categoryId={catToArchive.id}
					categoryName={catToArchive.name}
					isCurrentlyArchived={catToArchive.isArchived}
					isOpen={isArchiveModalOpen}
					onClose={handleCloseArchiveModal}
					onSuccess={() => {
						queryClient.invalidateQueries({
							queryKey: ['catalog-categories', labId],
						})
					}}
				/>
			)}

			{catToPermanentDelete && (
				<DeleteCategoryModal
					categoryId={catToPermanentDelete.id}
					categoryName={catToPermanentDelete.name}
					isOpen={isPermanentDeleteModalOpen}
					onClose={handleClosePermanentDeleteModal}
					onSuccess={() => {
						queryClient.invalidateQueries({
							queryKey: ['catalog-categories', labId],
						})
					}}
				/>
			)}
		</div>
	)
})
interface CategoryItemProps {
	isActive: boolean
	createCategoryLink: (id: string) => string
	cat: CatalogCategoryDTO
	handleRename: (id: string, name: string) => void
	handleEdit: (id: string, name: string) => void
	handlePermanentDelete: (id: string, name: string) => void
	handleArchive: (id: string, name: string, isArchived: boolean) => void
}
const CategoryItem = memo(function CategoryItem({
	cat,
	createCategoryLink,
	isActive,
	handleRename,
	handleEdit,
	handleArchive,
	handlePermanentDelete,
}: CategoryItemProps) {
	const { canManageCatalog } = usePermissions()

	const handleRenameCategory = useCallback(
		() => handleRename(cat.id, cat.name),
		[handleRename, cat.id, cat.name],
	)
	const handleEditCategory = useCallback(
		() => handleEdit(cat.id, cat.name),
		[handleEdit, cat.id, cat.name],
	)
	const handleArchiveCategory = useCallback(
		() => handleArchive(cat.id, cat.name, cat.isArchived),
		[handleArchive, cat.id, cat.name, cat.isArchived],
	)
	const handlePermanentDeleteCategory = useCallback(
		() => handlePermanentDelete(cat.id, cat.name),
		[handlePermanentDelete, cat.id, cat.name],
	)

	return (
		<div
			key={cat.id}
			className={cn(
				'group relative flex items-center justify-between p-1 pr-2 rounded-xl transition-all duration-200',
				isActive
					? 'bg-primary/10 dark:bg-primary/15'
					: 'hover:bg-slate-100 dark:hover:bg-white/5',
			)}
		>
			{/* The clickable area (Link) */}
			<Link
				href={createCategoryLink(cat.id)}
				replace // Doesn't bloat browser history
				className="flex-1 flex items-center gap-3 p-2 outline-none"
			>
				{/* Active Indicator Bar */}
				<div
					className={cn(
						'absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full transition-all duration-300',
						isActive ? 'bg-primary scale-y-100' : 'bg-transparent scale-y-0',
					)}
				/>

				{/* Category Icon (If exists, else fallback) */}
				<div
					className={cn(
						'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors shadow-sm relative overflow-hidden', // Added overflow-hidden to constrain Image
						isActive
							? 'bg-white dark:bg-[#121214] text-primary border border-primary/20'
							: 'bg-white dark:bg-[#121214] text-muted-foreground border border-border group-hover:text-foreground',
					)}
				>
					{cat.imageUrl ? (
						<Image
							src={cat.imageUrl}
							alt={cat.name}
							fill
							sizes="32px"
							className="object-contain p-1" // Added padding so it doesn't touch the borders
						/>
					) : (
						<span className="text-xs font-bold font-mono">
							{cat.name.substring(0, 2).toUpperCase()}
						</span>
					)}
				</div>

				{/* Text Details */}
				<div className="flex flex-col min-w-0">
					<span
						className={cn(
							'text-xs font-bold truncate transition-colors',
							isActive
								? 'text-primary'
								: 'text-foreground group-hover:text-primary',
						)}
					>
						{cat.name}
					</span>
					{/* Status Badge if inactive */}
					{cat.isArchived && (
						<span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest mt-0.5">
							Archived
						</span>
					)}
				</div>
			</Link>

			{/* Context Menu (3-dots) */}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className={cn(
							'h-7 w-7 rounded-lg transition-opacity shrink-0 focus-visible:ring-1 focus-visible:ring-primary',
							isActive
								? 'opacity-100 text-primary hover:bg-primary/20'
								: 'opacity-0 group-hover:opacity-100 text-muted-foreground hover:bg-slate-200 dark:hover:bg-white/10',
						)}
					>
						<MoreVertical className="w-3.5 h-3.5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="start"
					side="right"
					className="w-48 rounded-xl border-border shadow-premium dark:bg-[#121214]"
				>
					<DropdownMenuLabel className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
						Options
					</DropdownMenuLabel>

					{/* Standard Actions */}
					<DropdownMenuItem
						className="cursor-pointer font-medium text-xs py-2 hover:bg-primary/5 focus:bg-primary/5"
						onClick={handleRenameCategory}
					>
						<Type className="w-3.5 h-3.5 mr-2 text-muted-foreground" /> Rename
						Category
					</DropdownMenuItem>
					<DropdownMenuItem
						className="cursor-pointer font-medium text-xs py-2 hover:bg-primary/5 focus:bg-primary/5"
						onClick={handleEditCategory}
					>
						<Edit3 className="w-3.5 h-3.5 mr-2 text-muted-foreground" /> Edit
						Category
					</DropdownMenuItem>

					<DropdownMenuSeparator className="bg-border/50" />

					{/* Soft Delete (Amber) */}
					{canManageCatalog && (
						<DropdownMenuItem
							onClick={handleArchiveCategory}
							className="cursor-pointer font-medium text-xs py-2 text-amber-600 dark:text-amber-500 focus:text-amber-600 dark:focus:text-amber-500 focus:bg-amber-500/10 transition-colors"
						>
							<Archive className="w-3.5 h-3.5 mr-2" />
							{cat.isArchived ? 'Restore Category' : 'Archive Category'}
						</DropdownMenuItem>
					)}

					{/* HARD-DELETE (Always Red) */}
					{canManageCatalog && (
						<DropdownMenuItem
							onClick={handlePermanentDeleteCategory}
							className="cursor-pointer font-medium text-xs py-2 text-destructive focus:text-destructive focus:bg-destructive/10 transition-colors"
						>
							<Trash2 className="w-3.5 h-3.5 mr-2" /> Delete Permanently
						</DropdownMenuItem>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
})
