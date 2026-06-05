'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import {
	Layers,
	Plus,
	MousePointer2,
	MoreHorizontal,
	Edit3,
	Archive,
	Package,
	FolderOpen,
	ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Replace with your actual server action
import { getWorkTypesByCategoryAction } from '@/actions/work-type'
import { handleSafeActionError } from '@/lib/safe-action-helpers'
import { WorkTypeBentoGridCard } from './worktype-bento-grid-card'

interface Props {
	categoryId: string
	labId: string
}

export function WorkTypeBentoGrid({ categoryId, labId }: Props) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	// --- 1. DATA FETCHING ---
	const { data: workTypes = [], isLoading } = useQuery({
		queryKey: ['catalog-work-types', labId, categoryId],
		queryFn: async () => {
			const res = await getWorkTypesByCategoryAction({
				caseCategoryId: categoryId,
				limit: 50,
			})
			if (res?.serverError || res?.validationErrors) {
				handleSafeActionError({
					serverError: res.serverError,
					validationErrors: res.validationErrors,
				})
				return []
			}
			return res?.data?.workTypes || [] // Assume your DTO returns _count.products as well
		},
		enabled: !!categoryId,
		staleTime: 1000 * 60 * 5,
	})

	// --- 2. URL BUILDER (The Context Shift) ---
	const navigateToProducts = (workTypeId: string) => {
		const params = new URLSearchParams(searchParams.toString())
		// Notice we KEEP the categoryId in the URL, but ADD the wtId.
		// The parent `CatalogPage` will read `wtId` and slide the context window!
		params.set('wt', workTypeId)
		params.delete('product') // Clean up deep states
		router.replace(`${pathname}?${params.toString()}`)
	}

	// --- 3. LOADING STATE ---
	if (isLoading) {
		return (
			<div className="flex flex-col h-full p-6 lg:p-10 animate-in fade-in duration-500">
				<Skeleton className="h-12 w-64 rounded-xl mb-8 bg-slate-100 dark:bg-white/5" />
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
					{Array.from({ length: 3 }).map((_, i) => (
						<Skeleton
							key={i}
							className="h-48 rounded-[24px] bg-slate-100 dark:bg-white/5"
						/>
					))}
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col h-full overflow-y-auto custom-scrollbar p-6 lg:p-10 animate-in fade-in duration-500 relative">
			{/* Ambient Category Glow */}
			<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

			{/* --- HEADER --- */}
			<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 shrink-0">
				<div>
					<div className="flex items-center gap-3 mb-1">
						<div className="w-1.5 h-6 bg-primary rounded-full" />
						<h2 className="text-2xl font-bold tracking-tight text-foreground">
							Department Structures
						</h2>
					</div>
					<p className="text-sm text-muted-foreground ml-4">
						Manage the organizational workflow groupings for this category.
					</p>
				</div>

				<Button
					className="h-10 rounded-xl bg-primary text-white shadow-premium font-bold hover:bg-primary/90 transition-all shrink-0"
					onClick={() => {
						// Open your existing CreateWorkTypeSheet!
						// It should be wired to use the active `categoryId` from the URL.
						console.log('Open Create WorkType Sheet')
					}}
				>
					<Plus className="w-4 h-4 mr-2" /> New Work Type
				</Button>
			</div>

			{/* --- EMPTY STATE --- */}
			{workTypes.length === 0 ? (
				<div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-500">
					<div className="w-16 h-16 rounded-3xl bg-slate-50 dark:bg-white/5 border border-border flex items-center justify-center text-slate-400 dark:text-zinc-500 mb-6 shadow-sm">
						<FolderOpen className="w-8 h-8" />
					</div>
					<h3 className="text-xl font-bold text-foreground mb-2">
						No Work Types Configured
					</h3>
					<p className="text-sm text-muted-foreground max-w-md leading-relaxed mb-8">
						This category is empty. Create a Work Type (e.g. "Crowns & Bridges")
						to begin adding manufacturing products to your catalog.
					</p>
					<Button
						variant="outline"
						className="rounded-xl h-11 px-6 font-bold border-border shadow-sm"
					>
						<Plus className="w-4 h-4 mr-2 text-primary" /> Create First Work
						Type
					</Button>
				</div>
			) : (
				/* --- BENTO GRID --- */
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
					{workTypes.map((wt: any) => (
						<WorkTypeBentoGridCard
							onArchive={() => {}}
							onEdit={() => {}}
							onHardDelete={() => {}}
							workType={{
								...wt,
								_count: {
									products: 10,
									caseWorkItems: 5,
								},
								casesL30D: 20,
							}}
							onManageProducts={() => {}}
							onMoveCategory={() => {}}
							key={wt.id}
						/>
					))}
				</div>
			)}
		</div>
	)
}

function Card({
	wt,
	navigateToProducts,
}: {
	wt: any
	navigateToProducts: (id: string) => void
}) {
	return (
		<div
			key={wt.id}
			className="lab-card p-6 flex flex-col group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/40 border-border bg-card"
		>
			{/* Background Graphic */}
			<Layers className="absolute -bottom-6 -right-6 w-32 h-32 text-slate-50 dark:text-white/[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-500" />

			{/* Card Header */}
			<div className="flex items-start justify-between mb-4 relative z-10">
				<div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
					<Layers className="w-5 h-5" />
				</div>

				{/* Context Menu */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 text-muted-foreground hover:text-foreground -mr-2 -mt-2 transition-colors"
						>
							<MoreHorizontal className="w-4 h-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="end"
						className="w-48 rounded-xl border-border shadow-premium dark:bg-[#121214]"
					>
						<DropdownMenuItem className="cursor-pointer font-medium text-xs py-2 hover:bg-primary/5">
							<Edit3 className="w-3.5 h-3.5 mr-2" /> Edit Details
						</DropdownMenuItem>
						<DropdownMenuSeparator className="bg-border/50" />
						<DropdownMenuItem className="cursor-pointer font-medium text-xs py-2 text-rose-600 focus:text-rose-500 focus:bg-rose-500/10">
							<Archive className="w-3.5 h-3.5 mr-2" /> Archive Group
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* Card Body */}
			<div className="space-y-1 mb-6 relative z-10">
				<h3 className="text-lg font-bold text-foreground leading-tight tracking-tight line-clamp-1">
					{wt.name}
				</h3>
				<p className="text-xs text-muted-foreground line-clamp-2 min-h-[32px] leading-relaxed">
					{wt.description || 'No description provided.'}
				</p>
			</div>

			{/* Stats / Config Flags */}
			<div className="flex items-center gap-2 mb-6 relative z-10">
				<span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-100 dark:bg-white/5 border border-border text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
					<Package className="w-3 h-3 text-primary/70" />
					{wt._count?.products || 0} Products
				</span>

				{wt.requireTeethSelection && (
					<span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-[9px] font-bold text-blue-600 dark:text-blue-500 uppercase tracking-widest">
						<MousePointer2 className="w-3 h-3" />
						Anatomy Required
					</span>
				)}
			</div>

			{/* ACTION: Drill Down */}
			<div className="mt-auto pt-4 border-t border-border relative z-10">
				<Button
					onClick={() => navigateToProducts(wt.id)}
					variant="ghost"
					className="w-full justify-between h-10 px-4 rounded-xl text-xs font-bold text-primary hover:text-white hover:bg-primary transition-all group/btn"
				>
					Manage Catalog{' '}
					<ArrowRight className="w-4 h-4 opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
				</Button>
			</div>
		</div>
	)
}
