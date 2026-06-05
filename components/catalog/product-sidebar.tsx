'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import {
	Package,
	Search,
	Plus,
	MoreVertical,
	Edit3,
	Archive,
	ChevronLeft,
	Layers,
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
import { useState } from 'react'
import useDebounce from '@/hooks/useDebounce'
import { handleSafeActionError } from '@/lib/safe-action-helpers'

// Replace with your actual server action import
import { getProductsByWorkTypeAction } from '@/actions/catalog/get-products'

interface Props {
	labId: string
	workTypeId: string
	activeProductId?: string
}

export function ProductSidebar({ labId, workTypeId, activeProductId }: Props) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	// Local Search State
	const [searchQuery, setSearchQuery] = useState('')
	const debouncedSearch = useDebounce({ value: searchQuery, delay: 300 })

	// Fetch Products for this specific WorkType
	const { data: products = [], isLoading } = useQuery({
		queryKey: ['catalog-products', labId, workTypeId],
		queryFn: async () => {
			const res = await getProductsByWorkTypeAction({ workTypeId })
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
	const filteredProducts = products.filter((prod: any) =>
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
							// Open CreateProductSheet pre-filled with `workTypeId`
							console.log('Open Create Product Sheet')
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
					filteredProducts.map((prod: any) => {
						const isActive = activeProductId === prod.id

						return (
							<div
								key={prod.id}
								className={cn(
									'group relative flex items-center justify-between p-1 pr-2 rounded-xl transition-all duration-200',
									isActive
										? 'bg-ai/10 dark:bg-ai/15'
										: 'hover:bg-slate-100 dark:hover:bg-white/5',
								)}
							>
								{/* The clickable area (Link) */}
								<Link
									href={createProductLink(prod.id)}
									replace
									className="flex-1 flex items-center gap-3 p-2 outline-none min-w-0"
								>
									{/* Active Indicator Bar */}
									<div
										className={cn(
											'absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full transition-all duration-300',
											isActive
												? 'bg-ai scale-y-100'
												: 'bg-transparent scale-y-0',
										)}
									/>

									{/* Icon / Avatar */}
									<div
										className={cn(
											'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors shadow-sm',
											isActive
												? 'bg-white dark:bg-[#121214] text-ai border border-ai/20'
												: 'bg-white dark:bg-[#121214] text-muted-foreground border border-border group-hover:text-foreground',
										)}
									>
										{prod.imageUrl ? (
											<img
												src={prod.imageUrl}
												alt={prod.name}
												className="w-5 h-5 object-contain"
											/>
										) : (
											<span className="text-xs font-bold font-mono">
												{prod.name.substring(0, 2).toUpperCase()}
											</span>
										)}
									</div>

									{/* Text Details */}
									<div className="flex flex-col min-w-0 flex-1">
										<span
											className={cn(
												'text-xs font-bold truncate transition-colors',
												isActive
													? 'text-ai'
													: 'text-foreground group-hover:text-ai',
											)}
										>
											{prod.name}
										</span>
										{/* Show material/desc snippet if exists */}
										<span className="text-[9px] text-muted-foreground truncate max-w-full">
											{prod.description || 'No description'}
										</span>
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
													? 'opacity-100 text-ai hover:bg-ai/20'
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

										<DropdownMenuItem className="cursor-pointer font-medium text-xs py-2 hover:bg-ai/5">
											<Edit3 className="w-3.5 h-3.5 mr-2" /> Rename / Edit
										</DropdownMenuItem>

										<DropdownMenuSeparator className="bg-border/50" />

										<DropdownMenuItem className="cursor-pointer font-medium text-xs py-2 text-rose-600 focus:text-rose-500 focus:bg-rose-500/10">
											<Archive className="w-3.5 h-3.5 mr-2" /> Archive Product
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						)
					})
				)}
			</div>
		</div>
	)
}
