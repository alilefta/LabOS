// app/(main)/catalog/page.tsx

import { redirect } from 'next/navigation'
import { Layers } from 'lucide-react'
import { z } from 'zod'


// Data Access (Tree Only!) [3]
import { getCatalogTree } from '@/data/catalog/get-catalog'

// Client Components
import { ProductMatrixGrid } from '@/components/catalog/product-matrix-grid/product-matrix-grid'
import { CatalogBrowserTree } from '@/components/catalog/catalog-browser-tree'
import { CatalogClientHeader } from '@/components/catalog/catalog-client-header'
import { getQueryClient } from '@/providers/get-query-client'
import { CatalogProductDTO } from '@/schema/composed/catalog/catalog.dtos'
import { getProductsByWorkTypeAction } from '@/actions/catalog/get-products'
import { QueryHydrationBoundary } from '@/providers/query-hydration-boundary'
import { dehydrate } from '@tanstack/react-query'
import { requireTenantContext } from '@/platform/organizations/tenant-context'
import { toLegacyLabRole } from '@/platform/organizations/legacy-role-compatibility'

export const metadata = {
	title: 'Catalog & Pricing Matrix | LabOS',
	description:
		'Manage clinical categories, work types, and global pricing structures.',
}

const CatalogSearchParamsSchema = z.object({
	workTypeId: z.string().uuid().optional().catch(undefined),
})

export default async function CatalogPage({
	searchParams,
}: {
	searchParams: Promise<{ workTypeId?: string }>
}) {
	// --- 1. SECURITY & TENANT ---
	const tenant = await requireTenantContext()
	const legacyRole = toLegacyLabRole(tenant.memberRole)
	if (legacyRole !== 'OWNER' && legacyRole !== 'MANAGER') {
		redirect('/dashboard?error=unauthorized_catalog')
	}

	const { labId } = tenant

	// --- 2. PARAM RESOLUTION ---
	const params = await searchParams
	const parsedParams = CatalogSearchParamsSchema.safeParse(params)
	const activeWorkTypeId = parsedParams.success
		? parsedParams.data.workTypeId
		: undefined

	// --- 3. DATA HYDRATION (Tree Only) --- [3]
	const treeResult = await getCatalogTree(labId)

	if (!treeResult.success) {
		throw new Error('Failed to load Catalog Framework.')
	}

	const catalogTree = treeResult.data
	// const workTypeName = catalogTree.filter((cat) => {
	// 	const worktypes = cat.workTypes
	// 	if (cat.workTypes.includes((wo) => wo.id === activeWorkTypeId)) {
	// 		return true
	// 	}
	// })

	// console.log(workTypeName)

	const queryClient = getQueryClient()
	await queryClient.prefetchQuery({
		queryKey: ['products-list', activeWorkTypeId],
		queryFn: async () => {
			if (!activeWorkTypeId) return []
			const res = await getProductsByWorkTypeAction({
				workTypeId: activeWorkTypeId,
			})

			return (res?.data?.products as CatalogProductDTO[]) || []
		},
		staleTime: 1000 * 60 * 5, // Cache for 5 minutes
	})

	return (
		<div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in duration-700 bg-background overflow-hidden relative">
			{/* --- HEADER --- */}
			<header className="shrink-0 sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border shadow-sm">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 px-4 sm:px-6 lg:px-8 max-w-[2000px] mx-auto w-full">
					<div>
						<h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
							<Layers className="w-6 h-6 text-primary opacity-80" />
							Catalog & Pricing Matrix
						</h1>
						<p className="text-xs sm:text-sm text-muted-foreground mt-0.5 font-medium">
							Manage clinical categories, work types, and global pricing
							structures.
						</p>
					</div>

					<CatalogClientHeader isCategoriesEmpty={catalogTree.length === 0} />
				</div>
			</header>

			{/* --- SPLIT CANVAS WORKSPACE --- */}
			<div className="flex-1 min-h-0 relative z-10 w-full">
				<div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10 dark:block hidden" />

				<div className="flex flex-col lg:flex-row h-full max-w-[2000px] mx-auto">
					{/* LEFT PANE: The Hierarchy Browser */}
					<div className="w-full lg:w-80 xl:w-96 shrink-0 h-full overflow-y-auto custom-scrollbar border-r border-border/50 bg-slate-50/30 dark:bg-white/[0.01]">
						<div className="p-4 sm:p-6 lg:p-8">
							<h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-6">
								Department Tree
							</h3>
							<CatalogBrowserTree
								tree={catalogTree}
								activeWorkTypeId={activeWorkTypeId}
							/>
						</div>
					</div>

					{/* RIGHT PANE: The Product Matrix (Stays locked while fetching) */}
					<div className="flex-1 h-full overflow-y-auto custom-scrollbar relative bg-background">
						<div className="p-4 sm:p-6 lg:p-8 pb-32">
							{!activeWorkTypeId ? (
								<div className="h-[400px] flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
									<div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-white/5 border border-border flex items-center justify-center mb-6 shadow-sm">
										<Layers className="w-8 h-8 text-slate-300 dark:text-zinc-600" />
									</div>
									<h2 className="text-xl font-bold text-foreground tracking-tight">
										Select a Work Type
									</h2>
									<p className="text-sm text-muted-foreground mt-2 max-w-md leading-relaxed">
										Choose a specific department from the tree on the left to
										view and manage its products and base pricing.
									</p>
								</div>
							) : (
								<QueryHydrationBoundary state={dehydrate(queryClient)}>
									<ProductMatrixGrid
										activeWorkTypeId={activeWorkTypeId}
										// activeWorktypeName={workTypeName}
									/>
								</QueryHydrationBoundary>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
