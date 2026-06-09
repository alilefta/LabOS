'use client'

import { memo, useCallback } from 'react'
import {
	Layers,
	MoreHorizontal,
	Edit3,
	FolderInput,
	Archive,
	Trash2,
	MousePointer2,
	Package,
	ArrowRight,
	AlertCircle,
	Activity,
	Type,
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
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface WorkTypeCardProps {
	workType: {
		id: string
		name: string
		description: string | null
		requireTeethSelection: boolean
		_count: {
			products: number
			caseWorkItems: number // Represents total lifetime cases
		}
	}
	onEdit: (id: string) => void
	onMoveCategory: (id: string) => void
	onArchive: (id: string) => void
	onHardDelete: (id: string) => void
	onManageProducts: (id: string) => void
	onRename: (id: string, name: string) => void
}

export const WorkTypeBentoGridCard = memo(function WorkTypeBentoGridCard({
	workType,
	onEdit,
	onMoveCategory,
	onArchive,
	onHardDelete,
	onManageProducts,
	onRename,
}: WorkTypeCardProps) {
	// Lockout logic for destructive actions
	const hasCases = workType._count.caseWorkItems > 0

	// Stable Callbacks
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

	return (
		<div className="lab-card flex flex-col p-5 group hover:border-primary/40 hover:shadow-lg transition-all duration-300 relative overflow-hidden h-full min-h-[300px]">
			{/* --- ZONE A: HEADER & ACTIONS --- */}
			<div className="flex items-start justify-between mb-4">
				<div className="flex gap-3 min-w-0 items-center">
					<div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm shrink-0">
						<Layers className="w-5 h-5" />
					</div>
					<div className="flex flex-col min-w-0">
						<h3 className="text-sm font-bold text-foreground truncate pr-2">
							{workType.name}
						</h3>
						{/* Requirement Badge directly under the name for instant context */}
						{workType.requireTeethSelection ? (
							<div className="flex items-center gap-1 mt-0.5">
								<span className="text-[9px] font-bold text-primary/80 uppercase tracking-widest flex items-center gap-1">
									<MousePointer2 className="w-2.5 h-2.5" /> Odontogram Req.
								</span>
							</div>
						) : (
							<div className="flex items-center gap-1 mt-0.5">
								<span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
									General Artifact
								</span>
							</div>
						)}
					</div>
				</div>

				{/* The Dropdown Menu */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground -mr-2 -mt-2 transition-colors rounded-lg"
						>
							<MoreHorizontal className="w-4 h-4" />
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
							onClick={() => onRename(workType.id, workType.name)}
							className="cursor-pointer font-medium text-xs py-2 hover:bg-primary/5"
						>
							<Type className="w-3.5 h-3.5 mr-2 text-slate-400" /> Rename
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
							className="cursor-pointer font-medium text-xs py-2 hover:bg-amber-500/10 text-amber-600 dark:text-amber-500 focus:text-amber-600 focus:bg-amber-500/10"
						>
							<Archive className="w-3.5 h-3.5 mr-2" /> Archive Department
						</DropdownMenuItem>

						<DropdownMenuSeparator className="bg-border/50" />

						{/* SAFTEY GUARDED DELETE ACTION */}
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
											cases. Archive instead to preserve history.
										</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						) : (
							<DropdownMenuItem
								onClick={() => onHardDelete(workType.id)}
								className="cursor-pointer font-medium text-xs py-2 text-rose-600 focus:text-rose-600 focus:bg-rose-500/10"
							>
								<Trash2 className="w-3.5 h-3.5 mr-2" /> Delete Permanently
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* --- ZONE B: BODY & DESCRIPTION --- */}
			<div className="mb-6">
				<p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed min-h-[54px]">
					{workType.description ||
						'No clinical description provided for this department.'}
				</p>
			</div>

			{/* --- ZONE C: THE METRICS LEDGER --- */}
			<div className="mt-auto p-4 rounded-xl bg-slate-50 dark:bg-white/2 border border-border">
				<div className="flex items-center justify-between mb-4">
					<span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
						<Activity className="w-3.5 h-3.5 text-primary/70" /> Structural
						Vitals
					</span>
					<span className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-wider">
						Lifetime
					</span>
				</div>

				<div className="space-y-3">
					{/* 1. Active Products */}
					<div className="flex justify-between items-end">
						<span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
							<Package className="w-3.5 h-3.5" /> Catalog Items
						</span>
						<span className="text-xs font-mono font-bold text-foreground">
							{workType._count.products} Products
						</span>
					</div>

					{/* 2. Historical Case Volume */}
					<div className="flex justify-between items-end pt-3 border-t border-border/60">
						<span className="text-xs text-muted-foreground font-medium">
							Processed Volume
						</span>
						<div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border bg-slate-100 dark:bg-white/10 text-muted-foreground border-border">
							<span className="text-xs font-mono font-bold text-foreground">
								{workType._count.caseWorkItems}
							</span>{' '}
							Cases
						</div>
					</div>
				</div>
			</div>

			{/* --- ZONE D: QUICK ACTIONS --- */}
			<div className="mt-4 pt-4 border-t border-border flex gap-2">
				<Button
					onClick={handleManage}
					className="flex-1 rounded-xl h-10 bg-primary/10 text-primary hover:bg-primary hover:text-white shadow-none font-bold text-xs transition-all flex items-center justify-center gap-2 group/btn"
				>
					Manage Products
					<ArrowRight className="w-3.5 h-3.5 opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
				</Button>
			</div>
		</div>
	)
})

WorkTypeBentoGridCard.displayName = 'WorkTypeBentoGridCard'
