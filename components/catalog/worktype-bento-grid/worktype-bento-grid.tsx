'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Plus, FolderOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

// Replace with your actual server action
import { handleSafeActionError } from '@/lib/safe-action-helpers'
import { WorkTypeBentoGridCard } from './worktype-bento-grid-card'
import { getWorkTypesByCategoryAction } from '@/actions/catalog/get-worktypes-by-category'

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
							className="h-48 rounded-3xl bg-slate-100 dark:bg-white/5"
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
						This category is empty. Create a Work Type (e.g. &quot;Crowns &
						Bridges&quot;) to begin adding manufacturing products to your
						catalog.
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
					{workTypes.map((wt) => (
						<WorkTypeBentoGridCard
							key={wt.id}
							workType={wt} // Passes the exact object from the new server action
							onManageProducts={navigateToProducts} // Use the routing function you built!
							// These will be wired to your Zustand store or local state later
							onEdit={(id) => console.log('Edit WT', id)}
							onMoveCategory={(id) => console.log('Move WT', id)}
							onArchive={(id) => console.log('Archive WT', id)}
							onHardDelete={(id) => console.log('Hard Delete WT', id)}
						/>
					))}
				</div>
			)}
		</div>
	)
}
