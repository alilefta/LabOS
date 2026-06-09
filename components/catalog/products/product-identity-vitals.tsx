'use client'

import { memo } from 'react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import {
	MoreHorizontal,
	Edit3,
	Archive,
	Trash2,
	Layers,
	Activity,
	Building2,
	Puzzle,
	CalendarClock,
	Check,
	Type,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

import { ProductVitalsDTO } from '@/schema/composed/catalog/product.dtos'
import { getProductVitalsAction } from '@/actions/catalog/products/get-product-vitals'
import { handleSafeActionError } from '@/lib/safe-action-helpers'

interface Props {
	productId: string
	onEdit: (id: string) => void
	onArchiveToggle: (id: string, currentlyArchived: boolean) => void
	onDeleteClick: (id: string) => void // Added for destructive action
	onRename: (id: string, name: string) => void
}

// Helper to generate a 2-letter monogram for products without images
const getMonogram = (name: string) => {
	const words = name.trim().split(' ')
	if (words.length >= 2) return `${words[0][0]}${words[1][0]}`.toUpperCase()
	return name.substring(0, 2).toUpperCase()
}

export const ProductIdentityVitals = memo(function ProductIdentityVitals({
	productId,
	onEdit,
	onArchiveToggle,
	onDeleteClick,
	onRename,
}: Props) {
	const { data: product, isLoading } = useQuery({
		queryKey: ['product-vitals', productId],
		queryFn: async () => {
			const res = await getProductVitalsAction({ productId })
			if (res?.serverError || res?.validationErrors) {
				handleSafeActionError({
					serverError: res.serverError,
					validationErrors: res.validationErrors,
				})
				return null
			}
			return (res?.data?.product as ProductVitalsDTO) || null
		},
		enabled: !!productId,
	})

	if (isLoading || !product) {
		return (
			<Skeleton className="h-64 w-full rounded-3xl bg-slate-100 dark:bg-white/2" />
		)
	}

	return (
		<div className="lab-card overflow-hidden flex flex-col relative animate-in fade-in slide-in-from-bottom-4 duration-500 z-20">
			{/* --- TOP SECTION: IDENTITY --- */}
			<div
				className={cn(
					'p-6 sm:p-8 flex flex-col sm:flex-row gap-6 relative transition-colors duration-500',
					product.isArchived ? 'bg-slate-50 dark:bg-white/1' : 'bg-card',
				)}
			>
				{/* Archival Overlay/Warning */}
				{product.isArchived && (
					<div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
				)}

				{/* 1. Image / Fallback Monogram */}
				<div
					className={cn(
						'w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-sm border',
						product.imageUrl
							? 'bg-white dark:bg-[#121214] border-border'
							: 'bg-linear-to-br from-primary/20 to-ai/20 border-primary/20',
					)}
				>
					{product.imageUrl ? (
						<Image
							src={product.imageUrl}
							alt={product.name}
							fill
							className="object-cover p-1.5 rounded-2xl"
						/>
					) : (
						<span className="text-3xl font-black tracking-tighter text-foreground/50 mix-blend-overlay">
							{getMonogram(product.name)}
						</span>
					)}
				</div>

				{/* 2. Metadata */}
				<div className="flex-1 min-w-0 flex flex-col justify-center relative z-10">
					{/* Badges */}
					<div className="flex flex-wrap items-center gap-2 mb-2.5">
						<span className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-border bg-slate-100 dark:bg-white/5 text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
							<Layers className="w-3 h-3" /> {product.workTypeName}
						</span>

						{product.isArchived ? (
							<span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-500 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5">
								<Archive className="w-3 h-3" /> Archived
							</span>
						) : (
							<span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-500 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5">
								<Check className="w-3 h-3" /> Active Catalog
							</span>
						)}
					</div>

					<h1
						className={cn(
							'text-2xl sm:text-3xl font-bold tracking-tight line-clamp-2 leading-tight mb-2',
							product.isArchived ? 'text-muted-foreground' : 'text-foreground',
						)}
					>
						{product.name}
					</h1>

					<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl line-clamp-3">
						{product.description || (
							<span className="italic opacity-60">
								No technical description provided for this product.
							</span>
						)}
					</p>
				</div>

				{/* 3. Contextual Actions Menu (Top Right) */}
				<div className="absolute top-6 right-6 sm:relative sm:top-0 sm:right-0">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								className="h-8 w-8 p-0 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-white/10"
							>
								<MoreHorizontal className="h-4 w-4 text-muted-foreground" />
								<span className="sr-only">Open menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className="w-48 rounded-xl border-border shadow-premium dark:bg-[#121214]"
						>
							<DropdownMenuLabel className="text-[10px] text-muted-foreground uppercase tracking-widest">
								Configuration
							</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() => onEdit(product.id)}
								className="cursor-pointer font-medium py-2 hover:bg-primary/5"
							>
								<Edit3 className="w-4 h-4 mr-2 text-muted-foreground" /> Edit
								Profile
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => onRename(product.id, product.name)}
								className="cursor-pointer font-medium py-2 hover:bg-primary/5"
							>
								<Type className="w-4 h-4 mr-2 text-muted-foreground" /> Rename
							</DropdownMenuItem>
							<DropdownMenuSeparator className="bg-border" />

							<DropdownMenuItem
								onClick={() => onArchiveToggle(product.id, product.isArchived)}
								className="cursor-pointer font-medium py-2 text-amber-600 focus:text-amber-600 focus:bg-amber-500/10"
							>
								<Archive className="w-4 h-4 mr-2" />{' '}
								{product.isArchived ? 'Restore to Catalog' : 'Archive Product'}
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => onDeleteClick(product.id)}
								className="cursor-pointer font-medium py-2 text-destructive focus:text-destructive focus:bg-destructive/10"
							>
								<Trash2 className="w-4 h-4 mr-2" /> Delete Permanently
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			{/* --- BOTTOM SECTION: OPERATIONAL VITALS (The Dashboard Strip) --- */}
			<div className="grid grid-cols-2 lg:grid-cols-4 bg-slate-50/50 dark:bg-[#09090B] border-t border-border divide-y lg:divide-y-0 lg:divide-x divide-border">
				<div className="p-4 sm:p-5 flex items-center justify-between gap-4">
					<div className="flex flex-col">
						<span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
							In Production
						</span>
						<span className="text-xl font-mono font-bold text-foreground">
							{product.stats.activeCases}
						</span>
					</div>
					<div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
						<Activity className="w-4 h-4 text-primary" />
					</div>
				</div>

				<div className="p-4 sm:p-5 flex items-center justify-between gap-4">
					<div className="flex flex-col">
						<span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
							Lifetime Volume
						</span>
						<span className="text-xl font-mono font-bold text-foreground">
							{product.stats.lifetimeCases.toLocaleString()}
						</span>
					</div>
					<div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-border">
						<CalendarClock className="w-4 h-4 text-slate-400 dark:text-zinc-500" />
					</div>
				</div>

				<div className="p-4 sm:p-5 flex items-center justify-between gap-4">
					<div className="flex flex-col">
						<span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
							Global Addons
						</span>
						<span className="text-xl font-mono font-bold text-foreground">
							{product.stats.totalAddons}
						</span>
					</div>
					<div className="w-8 h-8 rounded-lg bg-ai/10 flex items-center justify-center shrink-0 border border-ai/20">
						<Puzzle className="w-4 h-4 text-ai" />
					</div>
				</div>

				<div className="p-4 sm:p-5 flex items-center justify-between gap-4">
					<div className="flex flex-col">
						<span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
							Custom Deals
						</span>
						<span className="text-xl font-mono font-bold text-emerald-600 dark:text-emerald-500">
							{product.stats.customDeals}
						</span>
					</div>
					<div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
						<Building2 className="w-4 h-4 text-emerald-500" />
					</div>
				</div>
			</div>
		</div>
	)
})
