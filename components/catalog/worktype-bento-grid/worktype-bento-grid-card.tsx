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
	TrendingUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
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
		casesL30D: number
		isArchived: boolean
	}
	onEdit: (id: string) => void
	onMoveCategory: (id: string, name: string) => void
	onArchive: (id: string, name: string, isCurrentlyArchived: boolean) => void
	onHardDelete: (id: string, name: string) => void
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
	const isArchived = workType.isArchived

	// Stable Callbacks
	const handleEdit = useCallback(
		() => onEdit(workType.id),
		[workType.id, onEdit],
	)
	const handleMove = useCallback(
		() => onMoveCategory(workType.id, workType.name),
		[workType.id, onMoveCategory, workType.name],
	)
	const handleArchive = useCallback(
		() => onArchive(workType.id, workType.name, workType.isArchived),
		[workType.id, onArchive, workType.isArchived, workType.name],
	)
	const handleManage = useCallback(
		() => onManageProducts(workType.id),
		[workType.id, onManageProducts],
	)

	return (
		<div
			className={cn(
				'lab-card flex flex-col group relative overflow-hidden transition-all duration-300 border-border bg-card',
				// 1. Replaced `grayscale` with specific color mutations to keep Badges vibrant!
				isArchived
					? 'bg-slate-50/50 dark:bg-[#09090B] border-dashed border-border/60 hover:border-primary/20'
					: 'hover:shadow-xl hover:border-primary/40 transform-gpu',
			)}
		>
			{/* --- ZONE A: HEADER & ACTIONS (z-20 so it sits above the clickable card body) --- */}
			<div className="flex items-start justify-between p-6 pb-2 relative z-20">
				<div className="flex gap-3 min-w-0 items-start">
					<div
						className={cn(
							'w-10 h-10 rounded-xl border flex items-center justify-center shadow-sm transition-transform duration-300 shrink-0',
							isArchived
								? 'bg-slate-100 dark:bg-white/5 border-border text-slate-400'
								: 'bg-primary/10 border-primary/20 text-primary ',
						)}
					>
						<Layers className="w-5 h-5" />
					</div>

					{/* 2. Moved Badges UP to the Header for instant recognition */}
					<div className="flex flex-col min-w-0 pt-0.5">
						<div className="flex items-center gap-2 mb-1.5">
							<h3
								className={cn(
									'text-sm font-bold truncate pr-2 transition-colors',
									isArchived ? 'text-muted-foreground' : 'text-foreground',
								)}
							>
								{workType.name}
							</h3>
							{isArchived && (
								<span className="shrink-0 px-1.5 py-0.5 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-500 text-[9px] font-black uppercase tracking-widest shadow-sm">
									Archived
								</span>
							)}
						</div>

						{workType.requireTeethSelection ? (
							<div className="flex items-center gap-1">
								<span className="text-[9px] font-bold text-primary/80 uppercase tracking-widest flex items-center gap-1">
									<MousePointer2 className="w-2.5 h-2.5" /> Odontogram Req.
								</span>
							</div>
						) : (
							<div className="flex items-center gap-1">
								<span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
									General Artifact
								</span>
							</div>
						)}
					</div>
				</div>

				{/* 3. The Dropdown Menu (With Inline Safety Lockout) */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground -mr-2 -mt-2 transition-colors rounded-lg focus-visible:ring-1 focus-visible:ring-primary"
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

						<DropdownMenuSeparator className="bg-border/50" />

						<DropdownMenuItem
							onClick={handleArchive}
							className={cn(
								'cursor-pointer font-medium text-xs py-2 transition-colors',
								isArchived
									? 'text-amber-600 focus:text-amber-600 focus:bg-amber-500/10'
									: 'text-rose-600 focus:text-rose-600 focus:bg-rose-500/10',
							)}
						>
							<Archive className="w-4 h-4 mr-2" />
							{isArchived ? 'Restore / Unarchive' : 'Archive Department'}
						</DropdownMenuItem>

						{/* SAFTEY GUARDED DELETE ACTION (Inline, no buggy tooltip) */}
						{hasCases ? (
							<div className="px-2 py-2 mt-1 mx-1 rounded-lg bg-rose-500/5 border border-rose-500/10">
								<p className="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
									<AlertCircle className="w-3 h-3" /> Lockout
								</p>
								<p className="text-[10px] text-muted-foreground leading-snug">
									Cannot delete. Tied to{' '}
									<strong className="text-foreground">
										{workType._count.caseWorkItems}
									</strong>{' '}
									records.
								</p>
							</div>
						) : (
							<DropdownMenuItem
								onClick={() => onHardDelete(workType.id, workType.name)}
								className="cursor-pointer font-medium text-xs py-2 text-rose-600 focus:text-rose-600 focus:bg-rose-500/10 mt-1"
							>
								<Trash2 className="w-3.5 h-3.5 mr-2" /> Delete Permanently
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* 4. THE FULL-CARD CLICKABLE AREA */}
			<div className="flex-1 flex flex-col text-left outline-none px-6 pb-6 relative z-10">
				{/* --- ZONE B: BODY & DESCRIPTION --- */}
				<div className={cn('mb-6 flex-1', isArchived && 'opacity-60')}>
					<p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed min-h-13.5 pt-2">
						{workType.description ||
							'No clinical description provided for this department.'}
					</p>
				</div>

				{/* --- ZONE C: THE METRICS LEDGER (With restored L30D metric!) --- */}
				<div
					className={cn(
						'w-full p-4 rounded-xl border transition-colors duration-300',
						isArchived
							? 'bg-slate-50/50 dark:bg-white/1 border-border/50'
							: 'bg-slate-50 dark:bg-white/2 border-border group-hover:border-primary/20',
					)}
				>
					<div className="flex items-center justify-between mb-4">
						<span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
							<Activity className="w-3.5 h-3.5 text-primary/70" /> Structural
							Vitals
						</span>
					</div>

					<div className="space-y-3">
						{/* 1. Active Products */}
						<div className="flex justify-between items-end">
							<span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
								<Package className="w-3.5 h-3.5" /> Catalog Items
							</span>
							<span
								className={cn(
									'text-xs font-mono font-bold',
									isArchived ? 'text-muted-foreground' : 'text-foreground',
								)}
							>
								{workType._count.products}
							</span>
						</div>

						{/* 2. 30-Day Trend (Restored) */}
						<div className="flex justify-between items-end pt-3 border-t border-border/60">
							<span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
								<TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Volume
								(L30D)
							</span>
							<span
								className={cn(
									'text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border',
									isArchived
										? 'bg-slate-100 dark:bg-white/5 text-muted-foreground border-border'
										: 'text-emerald-600 dark:text-emerald-500 bg-emerald-500/10 border-emerald-500/20 shadow-sm',
								)}
							>
								{workType.casesL30D} Cases
							</span>
						</div>

						{/* 3. Historical Case Volume */}
						<div className="flex justify-between items-end pt-3 border-t border-border/60">
							<span className="text-xs text-muted-foreground font-medium">
								Lifetime Processed
							</span>
							<span
								className={cn(
									'text-[10px] font-mono font-bold',
									isArchived ? 'text-muted-foreground' : 'text-foreground',
								)}
							>
								{workType._count.caseWorkItems} Total
							</span>
						</div>
					</div>
				</div>

				{/* --- ZONE D: QUICK ACTIONS --- */}
				<div className="mt-4 pt-4 border-t border-border w-full flex gap-2">
					<Button
						onClick={handleManage}
						className={cn(
							'w-full flex items-center justify-between h-10 px-4 rounded-xl text-xs font-bold transition-all group cursor-pointer',
							isArchived
								? 'text-muted-foreground bg-slate-100 dark:bg-white/5'
								: 'text-primary bg-primary/10 group-hover:bg-primary group-hover:text-white shadow-sm',
						)}
					>
						Manage Catalog{' '}
						<ArrowRight className="w-4 h-4 opacity-50  group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
					</Button>
				</div>
			</div>
		</div>
	)
})
