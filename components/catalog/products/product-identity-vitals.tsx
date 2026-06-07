'use client'

import { memo } from 'react'
import {
	Package,
	Edit3,
	Archive,
	Image as ImageIcon,
	Layers,
	Activity,
	Building2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { ProductVitalsDTO } from '@/schema/composed/catalog/product.dtos'
import { useQuery } from '@tanstack/react-query'
import { getProductVitalsAction } from '@/actions/catalog/products/get-product-vitals'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
	onEdit: (id: string) => void
	onArchiveToggle: (id: string, currentlyArchived: boolean) => void
	productId: string
}

export const ProductIdentityVitals = memo(function ProductIdentityVitals({
	productId,
	onEdit,
	onArchiveToggle,
}: Props) {
	// Fetch the high-level product vitals (Zone A)
	const { data: product, isLoading } = useQuery({
		queryKey: ['product-vitals', productId],
		queryFn: async () => {
			const res = await getProductVitalsAction({ productId })
			return (res?.data?.product as ProductVitalsDTO) || null
		},
		enabled: !!productId,
	})

	if (isLoading || !product) {
		return (
			<div className="p-8">
				<Skeleton className="h-100 w-full rounded-4xl bg-slate-100 dark:bg-white/5" />
			</div>
		)
	}

	return (
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-500 relative z-20">
			{/* --- 1. THE HERO CARD --- */}
			<div className="lab-card p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start relative overflow-hidden group">
				{/* Background Tech Graphic */}
				<Package className="absolute -bottom-10 -right-10 w-48 h-48 text-slate-50 dark:text-white/2 pointer-events-none group-hover:scale-110 transition-transform duration-700" />

				{/* Product Image / Avatar */}
				<div className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-2xl bg-slate-100 dark:bg-[#121214] border border-border flex items-center justify-center relative overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
					{product.imageUrl ? (
						<Image
							src={product.imageUrl}
							alt={product.name}
							fill
							className="object-cover p-1 rounded-2xl transition-transform duration-500 group-hover:scale-105"
						/>
					) : (
						<div className="flex flex-col items-center gap-2 text-muted-foreground opacity-60">
							<ImageIcon className="w-8 h-8" />
						</div>
					)}
				</div>

				{/* Product Details */}
				<div className="flex-1 min-w-0 flex flex-col h-full">
					{/* Breadcrumb Context */}
					<div className="flex items-center gap-2 mb-2">
						<span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-md border border-border flex items-center gap-1.5">
							<Layers className="w-3 h-3" /> {product.workTypeName}
						</span>
						{product.isArchived && (
							<span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20">
								Archived
							</span>
						)}
					</div>

					<h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground line-clamp-2 leading-tight mb-2">
						{product.name}
					</h1>

					<p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
						{product.description || (
							<span className="italic opacity-60">
								No technical description provided.
							</span>
						)}
					</p>

					{/* Action Buttons (Pushed to bottom) */}
					<div className="mt-6 md:mt-auto flex items-center gap-3">
						<Button
							onClick={() => onEdit(product.id)}
							variant="outline"
							className="h-9 rounded-lg font-bold text-xs border-border bg-white dark:bg-white/5 shadow-sm hover:border-primary/50 hover:text-primary transition-all"
						>
							<Edit3 className="w-3.5 h-3.5 mr-2" /> Edit Details
						</Button>
						<Button
							onClick={() => onArchiveToggle(product.id, product.isArchived)}
							variant="ghost"
							className={cn(
								'h-9 rounded-lg font-bold text-xs transition-all',
								product.isArchived
									? 'text-amber-600 hover:bg-amber-500/10'
									: 'text-rose-500 hover:bg-rose-500/10',
							)}
						>
							<Archive className="w-3.5 h-3.5 mr-2" />
							{product.isArchived ? 'Unarchive Product' : 'Archive Product'}
						</Button>
					</div>
				</div>
			</div>

			{/* --- 2. OPERATIONAL VITALS STRIP --- */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				<div className="p-4 rounded-2xl bg-card border border-border flex flex-col gap-1 shadow-sm">
					<span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
						<Activity className="w-3.5 h-3.5 text-primary/70" /> In Production
					</span>
					<span className="text-2xl font-mono font-black text-foreground">
						{product.stats.activeCases}
					</span>
				</div>

				<div className="p-4 rounded-2xl bg-card border border-border flex flex-col gap-1 shadow-sm">
					<span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
						Lifetime Volume
					</span>
					<span className="text-2xl font-mono font-black text-foreground">
						{product.stats.lifetimeCases}
					</span>
				</div>

				<div className="p-4 rounded-2xl bg-card border border-border flex flex-col gap-1 shadow-sm">
					<span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
						Configured Addons
					</span>
					<span className="text-2xl font-mono font-black text-foreground">
						{product.stats.totalAddons}
					</span>
				</div>

				<div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex flex-col gap-1 shadow-sm">
					<span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-500 flex items-center gap-1.5">
						<Building2 className="w-3.5 h-3.5" /> Custom Deals
					</span>
					<span className="text-2xl font-mono font-black text-emerald-600 dark:text-emerald-400">
						{product.stats.customDeals}
					</span>
				</div>
			</div>
		</div>
	)
})
