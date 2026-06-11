import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { getServerSession } from '@/lib/get-session'
import { cn } from '@/lib/utils'
import { AmbientBgGlow } from '@/components/ui/ui-utils/animated-ambient-bg-glow'

import { CategorySidebar } from '@/components/catalog/category-sidebar'
import { ProductSidebar } from '@/components/catalog/product-sidebar'
import { WorkTypeBentoGrid } from '@/components/catalog/worktype-bento-grid/worktype-bento-grid'
import { CatalogEmptyState } from '@/components/catalog/catalog-empty-state'
import { ProductWorkspace } from '@/components/catalog/products/product-workspace'

// --- VALIDATION SCHEMA FOR URL STATE ---
// This ensures that if a user tampers with the URL (e.g., ?category=junk),
// it falls back gracefully rather than crashing the database queries.
const CatalogSearchParamsSchema = z.object({
	category: z.string().uuid().optional(),
	wt: z.string().uuid().optional(),
	product: z.string().uuid().optional(),
})

interface Props {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function CatalogPage({ searchParams }: Props) {
	// 1. Session & Auth Guard
	const session = await getServerSession()
	if (!session || !session.user.labId) {
		redirect('/sign-in')
	}

	const labId = session.user.labId

	// 2. Resolve and Validate URL Parameters
	const params = await searchParams
	const parsedParams = CatalogSearchParamsSchema.safeParse(params)

	// If the URL parameters are malformed (not UUIDs), we ignore them
	const categoryId = parsedParams.success
		? parsedParams.data.category
		: undefined
	const workTypeId = parsedParams.success ? parsedParams.data.wt : undefined
	const productId = parsedParams.success ? parsedParams.data.product : undefined

	// 3. Determine the "Depth" of Navigation
	// This boolean logic drives the responsive CSS architecture
	const isLevel1_Root = !categoryId && !workTypeId && !productId
	const isLevel2_Category = !!categoryId && !workTypeId && !productId
	const isLevel3_WorkType = !!workTypeId && !productId
	const isLevel4_Product = !!workTypeId && !!productId

	// Mobile visibility logic based on depth
	// On mobile, the "Left Pane" is hidden if we are viewing Right Pane content
	const showLeftPaneOnMobile = isLevel1_Root || isLevel3_WorkType
	// On mobile, the "Right Pane" is hidden if we are viewing Left Pane content
	const showRightPaneOnMobile = isLevel2_Category || isLevel4_Product

	return (
		<div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in duration-700 bg-background relative overflow-hidden">
			<div className="flex-1 min-h-0 relative z-10 w-full">
				<AmbientBgGlow variant="primary" />

				{/* THE SPLIT-SCREEN CANVAS */}
				<div className="flex h-full w-full max-w-[2000px] mx-auto border-t border-border/50">
					{/* ── LEFT PANE: The Directory (30%) ── */}
					<div
						className={cn(
							'w-full lg:w-[320px] xl:w-[380px] shrink-0 border-r border-border h-full bg-slate-50/30 dark:bg-black/10',
							// Responsive Logic: Always flex on LG. On mobile, flex ONLY if it's the active view.
							showLeftPaneOnMobile
								? 'flex flex-col'
								: 'hidden lg:flex lg:flex-col',
						)}
					>
						<Suspense
							fallback={
								<div className="p-8 text-center text-muted-foreground text-xs animate-pulse">
									Loading Directory...
								</div>
							}
						>
							{!workTypeId ? (
								// Level 1: Showing Categories
								<CategorySidebar labId={labId} activeCategoryId={categoryId} />
							) : (
								// <div className="p-8 border-2 border-dashed border-primary/20 m-4 rounded-2xl flex items-center justify-center text-xs font-bold text-muted-foreground">
								// 	Category Sidebar Placeholder
								// </div>
								// Level 3: Showing Products (Context Shifted)
								<ProductSidebar
									labId={labId}
									workTypeId={workTypeId}
									activeProductId={productId}
								/>
								// <div className="p-8 border-2 border-dashed border-ai/20 m-4 rounded-2xl flex items-center justify-center text-xs font-bold text-muted-foreground">
								// 	Product Sidebar Placeholder
								// </div>
							)}
						</Suspense>
					</div>

					{/* ── RIGHT PANE: The Inspector (70%) ── */}
					<div
						className={cn(
							'flex-1 h-full relative overflow-y-auto custom-scrollbar bg-background',
							// Responsive Logic: Always flex on LG. On mobile, flex ONLY if it's the active view.
							showRightPaneOnMobile
								? 'flex flex-col'
								: 'hidden lg:flex lg:flex-col',
						)}
					>
						<Suspense
							fallback={
								<div className="p-8 text-center text-muted-foreground text-xs animate-pulse">
									Loading Workspace...
								</div>
							}
						>
							{isLevel1_Root || isLevel3_WorkType ? (
								<CatalogEmptyState
									type={isLevel1_Root ? 'category' : 'product'}
								/>
							) : isLevel2_Category ? (
								<WorkTypeBentoGrid categoryId={categoryId} labId={labId} />
							) : (
								<ProductWorkspace
									productId={productId}
									labId={labId}
									workTypeId={workTypeId}
								/>
							)}
						</Suspense>
					</div>
				</div>
			</div>
		</div>
	)
}
