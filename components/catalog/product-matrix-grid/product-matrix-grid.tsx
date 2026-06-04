'use client'

import { useState, useMemo, useCallback } from 'react'
import { PackageX, Search, Plus, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductMatrixHeader } from './product-matrix-header'
import { ProductMatrixCard } from './product-matrix-card'
import { PricingTierManagerSheet } from '@/components/modals/catalog/pricing-tier-manager/pricing-tier-manager-sheet'
import { useClinicalCreationStore } from '@/store/use-clinical-creation-store'
import { useQuery } from '@tanstack/react-query'
import { getProductsByWorkTypeAction } from '@/actions/catalog/get-products'
import { handleSafeActionError } from '@/lib/safe-action-helpers'
import { CatalogProductDTO } from '@/schema/composed/catalog/catalog.dtos'
import { Skeleton } from '@/components/ui/skeleton'
import { ProductMatrixHydrationWrapper } from './product-matrix-hydration-wrapper'

interface Props {
	activeWorkTypeId: string
	activeWorktypeName?: string
}

export function ProductMatrixGrid({
	activeWorkTypeId,
	activeWorktypeName,
}: Props) {
	// ── 1. LOCAL SEARCH STATE ────────────────────────────────────────────────
	const [searchQuery, setSearchQuery] = useState('')
	const [pricingManagerProductId, setPricingManagerProductId] = useState<
		string | null
	>(null)

	// ── 1. TANSTACK QUERY ACTIVE FETCHING [2]
	const { data: products = [], isFetching } = useQuery({
		queryKey: ['products-list', activeWorkTypeId],
		queryFn: async () => {
			const res = await getProductsByWorkTypeAction({
				workTypeId: activeWorkTypeId,
			})

			if (res.serverError || res.validationErrors) {
				handleSafeActionError({
					serverError: res.serverError,
					validationErrors: res.validationErrors,
				})
				return []
			}
			return (res?.data?.products as CatalogProductDTO[]) || []
		},
		enabled: !!activeWorkTypeId,
		staleTime: 1000 * 60 * 5, // Cache for 5 minutes
	})

	// ── 2. IN-MEMORY FILTERING ──
	const filteredProducts = useMemo(() => {
		if (!searchQuery.trim()) return products
		const query = searchQuery.toLowerCase()
		return products.filter(
			(p) =>
				p.name.toLowerCase().includes(query) ||
				(p.description && p.description.toLowerCase().includes(query)),
		)
	}, [products, searchQuery])

	// ── 2. STORE CONNECTIONS (For Creation) ──────────────────────────────────
	const openProductSheet = useClinicalCreationStore(
		(state) => state.openProductSheet,
	)

	const handleCreateProduct = useCallback(() => {
		openProductSheet(activeWorkTypeId)
	}, [openProductSheet, activeWorkTypeId])

	// ── 3. STABILIZED INTERACTION CALLBACKS (120 FPS Guard) ──────────────────
	// Wrapping these in useCallback guarantees that typing in the search input
	// does NOT trigger re-renders in your ProductMatrixCards!
	const handleEditProduct = useCallback((id: string) => {
		// Trigger your openProductSheet(id) edit-state here later
		console.log('Trigger edit product sheet for ID:', id)
	}, [])

	const handleManagePricing = useCallback((id: string) => {
		setPricingManagerProductId(id)
	}, [])

	const onSearchChange = useCallback((val: string) => {
		setSearchQuery(val)
	}, [])

	const workTypeName =
		activeWorktypeName || products.length > 0 ? products[0].workTypeName : 'N/A'
	// ── 4. EMPTY STATE RENDERER ─────────────────────────────────────────────
	// ── 4. LOADING STATE (OLED Skeletons) [2]
	if (isFetching && products.length === 0) {
		return (
			<div className="flex flex-col h-full animate-in fade-in duration-300">
				<div className="flex items-center justify-between mb-8 pb-6 border-b border-border/50 shrink-0">
					<div className="flex items-center gap-4">
						<Skeleton className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-white/5 animate-pulse" />
						<div className="flex flex-col gap-2">
							<Skeleton className="h-5 w-40 bg-slate-200 dark:bg-white/5 animate-pulse" />
							<Skeleton className="h-3.5 w-20 bg-slate-100 dark:bg-white/5 animate-pulse" />
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
					{Array.from({ length: 6 }).map((_, i) => (
						<Skeleton
							key={i}
							className="h-72 rounded-3xl bg-slate-100 dark:bg-white/5 animate-pulse"
						/>
					))}
				</div>
			</div>
		)
	}

	// ── 5. EMPTY STATE RENDERER ──
	if (!isFetching && products.length === 0) {
		return (
			<div className="w-full h-full min-h-125 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500 relative">
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
				<div className="relative z-10 max-w-sm flex flex-col items-center gap-5">
					<div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-white/5 border border-border flex items-center justify-center text-slate-300 dark:text-zinc-600 shadow-sm">
						<PackageX className="w-10 h-10" />
					</div>
					<div className="space-y-2">
						<h3 className="text-xl font-bold text-foreground tracking-tight">
							Empty Department
						</h3>
						<p className="text-sm text-muted-foreground leading-relaxed">
							There are currently no products configured under{' '}
							<strong className="text-foreground">{workTypeName}</strong>.
						</p>
					</div>
					<Button
						onClick={handleCreateProduct}
						className="mt-4 rounded-xl h-11 px-8 bg-primary shadow-premium font-bold hover:bg-primary/90 transition-all text-white flex items-center gap-2"
					>
						<Plus className="w-4 h-4" /> Create First Product
					</Button>
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
			{/* --- THE COMMAND HEADER --- */}
			<ProductMatrixHeader
				workTypeName={workTypeName}
				totalItemsCount={products.length}
				activeWorkTypeId={activeWorkTypeId}
				onSearchChange={onSearchChange}
			/>

			{/* --- THE PRODUCT GRID --- */}
			{filteredProducts.length === 0 ? (
				<div className="flex-1 flex flex-col items-center justify-center py-20 text-center opacity-50 shrink-0">
					<Search className="w-8 h-8 text-muted-foreground mb-3" />
					<p className="text-sm font-bold text-foreground">No matches found</p>
					<p className="text-xs text-muted-foreground mt-1">
						Try a different search term.
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
					{filteredProducts.map((product) => (
						<ProductMatrixCard
							key={product.id}
							product={product}
							onEditProduct={handleEditProduct}
							onManagePricing={handleManagePricing}
						/>
					))}
				</div>
			)}
			<ProductMatrixHydrationWrapper productId={pricingManagerProductId || ''}>
				{/* --- THE PRICING SHEET --- */}
				<PricingTierManagerSheet
					isOpen={!!pricingManagerProductId}
					onClose={() => setPricingManagerProductId(null)}
					productId={pricingManagerProductId || ''}
					productName={
						products.find((p) => p.id === pricingManagerProductId)?.name || ''
					}
				/>
			</ProductMatrixHydrationWrapper>
		</div>
	)
}
