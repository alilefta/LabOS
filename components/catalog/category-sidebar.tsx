'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import {
	LayoutGrid,
	MoreVertical,
	Plus,
	Search,
	Archive,
	Edit3,
	Type,
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

interface Props {
	labId: string
	activeCategoryId?: string
}

export function CategorySidebar({ labId, activeCategoryId }: Props) {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const queryClient = useQueryClient()

	const [renameModal, setRenameModal] = useState(false)
	const [catToRename, setCatToRename] = useState<{
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
				showArchivedCategories: false,
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

					{/* Add Category Button (Triggers your existing Sheet!) */}
					<Button
						size="icon"
						variant="ghost"
						className="h-8 w-8 rounded-lg text-primary hover:bg-primary/10 hover:text-primary transition-colors"
						onClick={() => {
							// Open your existing CreateCategorySheet via global store or prop
							console.log('Open Create Category Sheet')
						}}
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
			<div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
				{isLoading ? (
					// Skeleton Loading State
					Array.from({ length: 5 }).map((_, i) => (
						<div
							key={i}
							className="h-12 w-full bg-slate-100 dark:bg-white/5 rounded-xl animate-pulse mb-1.5"
						/>
					))
				) : filteredCategories.length === 0 ? (
					// Empty State
					<div className="flex flex-col items-center justify-center text-center p-8 opacity-60">
						<LayoutGrid className="w-8 h-8 text-muted-foreground mb-3" />
						<p className="text-xs font-bold text-foreground">
							No categories found
						</p>
						{searchQuery && (
							<p className="text-[10px] text-muted-foreground mt-1">
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
							/>
						)
					})
				)}
			</div>

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
		</div>
	)
}

interface CategoryItemProps {
	isActive: boolean
	createCategoryLink: (id: string) => string
	cat: CatalogCategoryDTO
	handleRename: (id: string, name: string) => void
}
const CategoryItem = memo(function CategoryItem({
	cat,
	createCategoryLink,
	isActive,
	handleRename,
}: CategoryItemProps) {
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
						'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors shadow-sm',
						isActive
							? 'bg-white dark:bg-[#121214] text-primary border border-primary/20'
							: 'bg-white dark:bg-[#121214] text-muted-foreground border border-border group-hover:text-foreground',
					)}
				>
					{/* Fallback to text initials if no image is uploaded */}
					{cat.imageUrl ? (
						<img
							src={cat.imageUrl}
							alt={cat.name}
							className="w-5 h-5 object-contain"
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
							'h-7 w-7 rounded-lg transition-opacity shrink-0',
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

					<DropdownMenuItem
						className="cursor-pointer font-medium text-xs py-2 hover:bg-primary/5"
						onClick={() => handleRename(cat.id, cat.name)}
					>
						<Type className="w-3.5 h-3.5 mr-2" /> Rename Category
					</DropdownMenuItem>
					<DropdownMenuItem className="cursor-pointer font-medium text-xs py-2 hover:bg-primary/5">
						<Edit3 className="w-3.5 h-3.5 mr-2" /> Edit Category
					</DropdownMenuItem>

					<DropdownMenuSeparator className="bg-border/50" />

					<DropdownMenuItem className="cursor-pointer font-medium text-xs py-2 text-rose-600 focus:text-rose-500 focus:bg-rose-500/10">
						<Archive className="w-3.5 h-3.5 mr-2" /> Archive Category
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
})
