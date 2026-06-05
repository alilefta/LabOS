'use client'

import { memo, useCallback } from 'react'
import {
	Layers,
	MoreVertical,
	Edit3,
	FolderInput,
	Archive,
	Trash2,
	MousePointer2,
	Package,
	TrendingUp,
	Info,
	ArrowRight,
	AlertCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface WorkTypeCardProps {
	workType: {
		id: string
		name: string
		description: string | null
		requireTeethSelection: boolean
		_count: {
			products: number
			caseWorkItems: number // Represents total cases this worktype was used in
		}
		casesL30D: number // Cases processed in the last 30 days
	}
	onEdit: (id: string) => void
	onMoveCategory: (id: string) => void
	onArchive: (id: string) => void
	onHardDelete: (id: string) => void
	onManageProducts: (id: string) => void
}

export const WorkTypeBentoGridCard = memo(function WorkTypeBentoGridCard({
	workType,
	onEdit,
	onMoveCategory,
	onArchive,
	onHardDelete,
	onManageProducts,
}: WorkTypeCardProps) {
	const hasCases = workType._count.caseWorkItems > 0

	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	// Stable Callbacks for 120 FPS performance
	const handleEdit = useCallback(
		() => onEdit(workType.id),
		[workType.id, onEdit],
	)
	const handleMove = useCallback(
		() => onMoveCategory(workType.id),
		[workType.id, onMoveCategory],
	)
	const handleArchive = useCallback(
		() => onArchive(workType.id),
		[workType.id, onArchive],
	)
	const handleManage = useCallback(
		() => onManageProducts(workType.id),
		[workType.id, onManageProducts],
	)

	// --- 2. URL BUILDER (The Context Shift) ---
	const navigateToProducts = (workTypeId: string) => {
		const params = new URLSearchParams(searchParams.toString())
		// Notice we KEEP the categoryId in the URL, but ADD the wtId.
		// The parent `CatalogPage` will read `wtId` and slide the context window!
		params.set('wt', workTypeId)
		params.delete('product') // Clean up deep states
		router.replace(`${pathname}?${params.toString()}`)
	}

	return (
		<div className="lab-card p-6 flex flex-col group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/40 border-border bg-card">
			{/* Background Tech Graphic */}
			<Layers className="absolute -bottom-6 -right-6 w-32 h-32 text-slate-50 dark:text-white/[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-500" />

			{/* --- HEADER --- */}
			<div className="flex items-start justify-between mb-4 relative z-10">
				<div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
					<Layers className="w-5 h-5" />
				</div>

				{/* CONTEXT MENU */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 text-muted-foreground hover:text-foreground -mr-2 -mt-2 transition-colors rounded-lg"
						>
							<MoreVertical className="w-4 h-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="end"
						className="w-56 rounded-xl border-border shadow-premium dark:bg-[#121214]"
					>
						<DropdownMenuLabel className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
							Department Actions
						</DropdownMenuLabel>

						<DropdownMenuItem
							onClick={handleEdit}
							className="cursor-pointer font-medium text-xs py-2 hover:bg-primary/5"
						>
							<Edit3 className="w-3.5 h-3.5 mr-2 text-slate-400" /> Edit Details
						</DropdownMenuItem>

						<DropdownMenuItem
							onClick={handleMove}
							className="cursor-pointer font-medium text-xs py-2 hover:bg-primary/5"
						>
							<FolderInput className="w-3.5 h-3.5 mr-2 text-slate-400" /> Move
							to Category
						</DropdownMenuItem>

						<DropdownMenuItem
							onClick={handleArchive}
							className="cursor-pointer font-medium text-xs py-2 hover:bg-primary/5"
						>
							<Archive className="w-3.5 h-3.5 mr-2 text-slate-400" /> Archive
							Group
						</DropdownMenuItem>

						<DropdownMenuSeparator className="bg-border/50" />

						{/* --- SAFTEY GUARDED DELETE ACTION --- */}
						{hasCases ? (
							<TooltipProvider delayDuration={150}>
								<Tooltip>
									<TooltipTrigger asChild>
										<div className="w-full">
											<DropdownMenuItem
												disabled
												className="w-full cursor-not-allowed opacity-50 font-medium text-xs py-2 text-rose-500 flex items-center"
											>
												<Trash2 className="w-3.5 h-3.5 mr-2" /> Delete
												Permanently
											</DropdownMenuItem>
										</div>
									</TooltipTrigger>
									<TooltipContent
										side="left"
										className="bg-rose-600 text-white border-none p-3 shadow-xl max-w-[220px]"
									>
										<p className="text-[9px] font-black uppercase tracking-widest mb-1 opacity-85 flex items-center gap-1.5">
											<AlertCircle className="w-3.5 h-3.5" /> Database Lockout
										</p>
										<p className="text-[10px] leading-relaxed font-bold">
											Cannot delete this Work Type because it is actively
											referenced by{' '}
											<span className="font-mono">
												{workType._count.caseWorkItems}
											</span>{' '}
											cases. Archive instead to preserve financial history.
										</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						) : (
							<DropdownMenuItem
								onClick={() => onHardDelete(workType.id)}
								className="cursor-pointer font-medium text-xs py-2 text-rose-600 focus:text-rose-500 focus:bg-rose-500/10"
							>
								<Trash2 className="w-3.5 h-3.5 mr-2" /> Delete Permanently
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* --- BODY --- */}
			<div className="space-y-1 mb-6 relative z-10">
				<h3 className="text-lg font-bold text-foreground leading-tight tracking-tight line-clamp-1">
					{workType.name}
				</h3>
				<p className="text-xs text-muted-foreground line-clamp-2 min-h-[32px] leading-relaxed">
					{workType.description || 'No description provided.'}
				</p>
			</div>

			{/* --- DATA VITALS --- */}
			<div className="flex flex-col gap-2 mb-6 relative z-10 border-t border-border/50 pt-4">
				<div className="flex justify-between items-center text-xs">
					<span className="text-muted-foreground font-medium flex items-center gap-2">
						<Package className="w-3.5 h-3.5 text-primary" /> Active Products
					</span>
					<span className="font-mono font-bold text-foreground">
						{workType._count.products}
					</span>
				</div>

				<div className="flex justify-between items-center text-xs">
					<span className="text-muted-foreground font-medium flex items-center gap-2">
						<TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Volume
						(L30D)
					</span>
					<span className="font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
						{workType.casesL30D} Cases
					</span>
				</div>

				{workType.requireTeethSelection && (
					<div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-500 pt-1">
						<MousePointer2 className="w-3 h-3" />
						Teeth Mapping Required
					</div>
				)}
			</div>

			{/* --- ACTION FOOTER --- */}
			<div className="mt-auto pt-4 border-t border-border relative z-10">
				<Button
					onClick={() => navigateToProducts(workType.id)}
					variant="ghost"
					className="w-full justify-between h-10 px-4 rounded-xl text-xs font-bold text-primary hover:text-white hover:bg-primary transition-all group/btn"
				>
					Manage Catalog{' '}
					<ArrowRight className="w-4 h-4 opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
				</Button>
			</div>
		</div>
	)
})

WorkTypeBentoGridCard.displayName = 'WorkTypeBentoGridCard'
