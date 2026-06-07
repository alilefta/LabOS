'use client'

import { memo, useCallback, useMemo } from 'react'
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

interface WorkTypeCardProps {
	workType: {
		id: string
		name: string
		description: string | null
		requireTeethSelection: boolean
		isArchived: boolean
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

	// Operational Vitals Logic
	const isHighVelocity = workType.casesL30D >= 25
	const isIdle = workType.casesL30D === 0

	return (
		<div
			className={cn(
				'relative flex flex-col p-6 rounded-[24px] border transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] bg-card group overflow-hidden min-h-[340px]',
				workType.isArchived
					? 'opacity-60 grayscale hover:grayscale-0 border-border'
					: 'border-border hover:border-primary/40 hover:shadow-lg',
			)}
		>
			{/* Perforated Edge Accent (The Ticket Texture) */}
			<div className="absolute top-0 bottom-0 left-0 w-[4px] bg-linear-to-b from-transparent via-primary/20 to-transparent border-r border-dashed border-primary/10" />

			{/* Background Tech Graphic */}
			<Layers className="absolute -bottom-6 -right-6 w-32 h-32 text-slate-50 dark:text-white/[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-500" />

			{/* --- HEADER --- */}
			<div className="mb-6 relative z-10 flex items-start justify-between pl-2">
				<div className="min-w-0 flex-1 pr-4">
					<span className="text-[9px] font-black uppercase tracking-[0.25em] text-muted-foreground/60 block mb-1">
						Workflow Department
					</span>
					<div className="flex items-center gap-2">
						<h3 className="text-base font-bold text-foreground leading-tight truncate">
							{workType.name}
						</h3>
						{workType.isArchived && (
							<span className="px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-500 text-[8px] font-bold uppercase tracking-widest shrink-0">
								Archived
							</span>
						)}
					</div>
				</div>

				<div className="flex items-center gap-3 shrink-0">
					{/* Status Indicator */}
					{isHighVelocity && (
						<span className="px-2 py-0.5 rounded-md border border-amber-500/20 bg-amber-500/5 text-[8px] font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest animate-pulse">
							High Load
						</span>
					)}

					{/* Context Menu */}
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
								className="cursor-pointer font-semibold text-xs py-2 hover:bg-primary/5"
							>
								<Edit3 className="w-3.5 h-3.5 mr-2 text-slate-400" /> Edit
								Details
							</DropdownMenuItem>

							<DropdownMenuItem
								onClick={handleMove}
								className="cursor-pointer font-semibold text-xs py-2 hover:bg-primary/5"
							>
								<FolderInput className="w-3.5 h-3.5 mr-2 text-slate-400" /> Move
								to Category
							</DropdownMenuItem>

							<DropdownMenuItem
								onClick={handleArchive}
								className="cursor-pointer font-semibold text-xs py-2 hover:bg-primary/5"
							>
								<Archive className="w-3.5 h-3.5 mr-2 text-slate-400" />{' '}
								{workType.isArchived
									? 'Restore Department'
									: 'Archive Department'}
							</DropdownMenuItem>

							<DropdownMenuSeparator className="bg-border/50" />

							{/* --- SAFETY GUARDED DELETE ACTION --- */}
							{hasCases ? (
								<TooltipProvider delayDuration={150}>
									<Tooltip>
										<TooltipTrigger asChild>
											<div className="w-full">
												<DropdownMenuItem
													disabled
													className="w-full cursor-not-allowed opacity-50 font-semibold text-xs py-2 text-rose-500 flex items-center"
												>
													<Trash2 className="w-3.5 h-3.5 mr-2" /> Delete
													Permanently
												</DropdownMenuItem>
											</div>
										</TooltipTrigger>
										<TooltipContent
											side="left"
											className="bg-rose-600 text-white border-none p-3 shadow-xl max-w-[220px] z-50"
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
									className="cursor-pointer font-semibold text-xs py-2 text-rose-600 focus:text-rose-500 focus:bg-rose-500/10"
								>
									<Trash2 className="w-3.5 h-3.5 mr-2" /> Delete Permanently
								</DropdownMenuItem>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			{/* --- BODY: Description --- */}
			<div className="space-y-1 mb-6 relative z-10 pl-2">
				<p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 min-h-[48px]">
					{workType.description || 'No departmental description provided.'}
				</p>
			</div>

			{/* --- DYNAMIC OPERATIONAL VITALS (Asymmetric Bento Grid) --- */}
			<div className="grid grid-cols-[1.2fr_1fr] gap-3 my-4 relative z-10 border-t border-border/50 pt-4 pl-2">
				{/* Active Products Block */}
				<div className="p-3 rounded-xl bg-slate-50 dark:bg-[#09090B] border border-border flex flex-col">
					<span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-1 flex items-center gap-1.5">
						<Package className="w-3 h-3 text-primary" /> Products
					</span>
					<span className="text-xl font-mono font-black text-foreground">
						{workType._count.products}
					</span>
					<span className="text-[9px] text-muted-foreground mt-1">
						Configured items
					</span>
				</div>

				{/* 30-Day Case Velocity Block */}
				<div className="p-3 rounded-xl bg-slate-50 dark:bg-[#09090B] border border-border flex flex-col">
					<span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-1 flex items-center gap-1.5">
						<TrendingUp className="w-3 h-3 text-emerald-500" /> Velocity
					</span>
					<span
						className={cn(
							'text-xl font-mono font-black',
							isIdle ? 'text-muted-foreground' : 'text-emerald-500',
						)}
					>
						{workType.casesL30D}
					</span>
					<span className="text-[9px] text-muted-foreground mt-1">
						Cases (L30D)
					</span>
				</div>
			</div>

			{/* --- FOOTER: The Action Bar --- */}
			<div className="mt-auto pt-4 border-t border-border relative z-10 pl-2 flex flex-col gap-3">
				{workType.requireTeethSelection && (
					<div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-500/5 border border-blue-500/10 px-2.5 py-1 rounded-md w-fit">
						<MousePointer2 className="w-3 h-3" />
						Anatomy Map Required
					</div>
				)}

				<Button
					onClick={handleManage}
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
