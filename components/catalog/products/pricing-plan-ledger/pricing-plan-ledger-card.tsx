'use client'

import { memo, useCallback, useMemo } from 'react'
import {
	MoreVertical,
	Edit2,
	Archive,
	Star,
	Info,
	Type,
	Building2,
	Trash2,
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
import { PricingPlanDTO } from '@/schema/composed/catalog/pricing-plans.dtos'

interface Props {
	plan: PricingPlanDTO
	isGlobalDefault?: boolean
	onEdit: (id: string) => void
	onArchive?: (id: string, name: string, isCurrentlyArchived: boolean) => void
	onSetDefault?: (id: string) => void
	standardBasePrice?: number | null
	onRename: (id: string, name: string) => void
	onPermanentDelete: (id: string, name: string) => void
}

export const PricingPlanLedgerCard = memo(function PricingPlanLedgerCard({
	plan,
	isGlobalDefault = false,
	onEdit,
	onArchive,
	onSetDefault,
	standardBasePrice,
	onRename,
	onPermanentDelete,
}: Props) {
	const formatMoney = (val: number | null | undefined) => {
		if (val == null) return '$0.00'
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(val)
	}

	const handleEditClick = useCallback(() => {
		onEdit(plan.id)
	}, [plan.id, onEdit])

	// --- DYNAMIC FINANCIAL CALCULATIONS ---
	const financialMetrics = useMemo(() => {
		const currentPrice =
			plan.pricingStrategy === 'PERTOOTH'
				? Number(plan.toothPrice || 0)
				: plan.pricingStrategy === 'BULK'
					? Number(plan.bulkPrice || 0)
					: Number(plan.firstToothPrice || 0)

		if (isGlobalDefault || !standardBasePrice || standardBasePrice === 0) {
			return null
		}

		const diff = standardBasePrice - currentPrice
		const isDiscount = diff > 0
		const isMarkup = diff < 0
		// Ensure we don't divide by zero
		const percentDiff = Math.abs(Math.round((diff / standardBasePrice) * 100))

		return {
			diff,
			percentDiff,
			isDiscount,
			isMarkup,
			standardBasePrice,
		}
	}, [plan, isGlobalDefault, standardBasePrice])

	const isCustomClinicDeal = !!plan?.clinic?.id

	return (
		<div
			className={cn(
				'relative flex flex-col p-6 rounded-3xl border transition-all duration-300 ease-out bg-card group overflow-hidden min-h-85 ',
				isGlobalDefault
					? 'border-emerald-500/30 bg-emerald-500/2 shadow-sm scale-[1.01]'
					: 'border-border hover:border-emerald-500/40 hover:shadow-md',
				plan.isArchived && 'opacity-60 grayscale hover:grayscale-0',
			)}
		>
			{/* --- THE FIX: ARCHIVED WATERMARK --- */}
			{plan.isArchived && (
				<div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
					<div className="rotate-[-15deg] px-6 py-2 border-4 border-rose-500/30 text-rose-500/30 font-black uppercase tracking-[0.5em] text-2xl rounded-xl">
						Archived
					</div>
				</div>
			)}
			{/* Perforated Edge Accent (The Receipt Texture) */}
			<div className="absolute top-0 bottom-0 left-0 w-1.5 bg-linear-to-b from-transparent via-emerald-500/10 to-transparent border-r border-dashed border-emerald-500/20" />

			{/* Emerald Ambient Glow */}
			<div
				className={cn(
					'absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none transition-all duration-700 blur-3xl',
					isGlobalDefault
						? 'bg-emerald-500/10 scale-100'
						: 'bg-emerald-500/5 scale-90 group-hover:scale-110 group-hover:bg-emerald-500/10',
				)}
			/>

			{/* --- 1. HEADER: Swiss Typography --- */}
			<div className="mb-8 relative z-10 flex items-start justify-between pl-3">
				<div className="min-w-0 flex-1 pr-4 pt-1">
					{/* Meta Badges */}
					<div className="flex items-center gap-2 mb-4">
						<span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
							{isGlobalDefault ? 'Base Rate' : 'Special Rate'}
						</span>

						{/* Clinic-Specific Warning Badge */}
						{isCustomClinicDeal && (
							<span className="flex items-center gap-1 text-[9px] font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
								<Building2 className="w-3 h-3" /> Clinic Specific
							</span>
						)}
					</div>

					<h4 className="text-lg font-bold text-foreground leading-tight truncate capitalize">
						{plan.name}
					</h4>
				</div>

				<div className="flex items-center gap-3 shrink-0">
					<span
						className={cn(
							'px-2.5 py-1 rounded-md border text-[9px] font-black uppercase tracking-widest',
							isGlobalDefault
								? 'border-emerald-500/30 text-emerald-600 dark:text-emerald-500 bg-emerald-500/10'
								: 'border-border bg-slate-50 dark:bg-white/5 text-muted-foreground',
						)}
					>
						{plan.pricingStrategy}
					</span>

					{/* Contextual Actions Dropdown */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/10 -mr-2 transition-colors rounded-lg focus-visible:ring-1 focus-visible:ring-emerald-500"
							>
								<MoreVertical className="w-4 h-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className="w-56 rounded-xl border-border shadow-premium dark:bg-[#121214]"
						>
							<DropdownMenuLabel className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
								Ledger Actions
							</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={handleEditClick}
								className="cursor-pointer font-semibold text-xs py-2 hover:bg-emerald-500/10 hover:text-emerald-600 transition-colors"
							>
								<Edit2 className="w-3.5 h-3.5 mr-2" /> Edit Pricing Logic
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => onRename(plan.id, plan.name)}
								className="cursor-pointer font-semibold text-xs py-2 hover:bg-emerald-500/10 hover:text-emerald-600 transition-colors"
							>
								<Type className="w-3.5 h-3.5 mr-2" /> Rename Plan
							</DropdownMenuItem>

							{!isGlobalDefault && !isCustomClinicDeal && onSetDefault && (
								<DropdownMenuItem
									onClick={() => onSetDefault(plan.id)}
									className="cursor-pointer font-semibold text-xs py-2 text-emerald-600 hover:bg-emerald-500/10 transition-colors"
								>
									<Star className="w-3.5 h-3.5 mr-2" /> Set as Master Default
								</DropdownMenuItem>
							)}
							<DropdownMenuSeparator className="bg-border/50" />
							<DropdownMenuItem
								disabled={isGlobalDefault}
								onClick={() =>
									onArchive && onArchive(plan.id, plan.name, plan.isArchived)
								}
								className="cursor-pointer font-medium text-xs py-2 text-amber-600 dark:text-amber-500 focus:text-amber-600 dark:focus:text-amber-500 focus:bg-amber-500/10 transition-colors"
							>
								<Archive className="w-3.5 h-3.5 mr-2" />
								{/* --- THE FIX: DYNAMIC TOGGLE TEXT --- */}
								{plan.isArchived
									? 'Restore Pricing Plan'
									: 'Archive Pricing Plan'}
							</DropdownMenuItem>

							{/* HARD-DELETE (Always Red) */}
							<DropdownMenuItem
								onClick={() => onPermanentDelete(plan.id, plan.name)}
								className="cursor-pointer font-medium text-xs py-2 text-destructive focus:text-destructive focus:bg-destructive/10 transition-colors"
							>
								<Trash2 className="w-4 h-4 mr-2" /> Delete Permanently
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			{/* --- 2. THE DYNAMIC METRICS --- */}
			<div className="flex-1 flex flex-col relative z-10 mb-8 pl-3">
				{plan.pricingStrategy === 'PERTOOTH' && (
					<div className="flex flex-col gap-1 items-start">
						<span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
							Rate per Unit
						</span>
						{/* Tabular-nums keeps currency perfectly aligned */}
						<span className="text-4xl font-mono font-black text-foreground tracking-tighter tabular-nums">
							{formatMoney(Number(plan.toothPrice))}
						</span>
					</div>
				)}

				{plan.pricingStrategy === 'BULK' && (
					<div className="flex flex-col gap-1 items-start">
						<span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
							Flat Case Fee
						</span>
						<span className="text-4xl font-mono font-black text-foreground tracking-tighter tabular-nums">
							{formatMoney(Number(plan.bulkPrice))}
						</span>
					</div>
				)}

				{plan.pricingStrategy === 'CUSTOM' && (
					<div className="flex flex-col gap-5">
						{/* ASYMMETRIC SLASHED DISPLAY */}
						<div className="flex items-baseline gap-4 relative">
							<div className="flex flex-col">
								<span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">
									1st Unit
								</span>
								<span className="text-3xl font-mono font-black text-foreground tracking-tighter leading-none tabular-nums">
									{formatMoney(Number(plan.firstToothPrice))}
								</span>
							</div>

							<div className="text-2xl font-light text-border select-none -translate-y-1">
								/
							</div>

							<div className="flex flex-col">
								<span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">
									Additional
								</span>
								<span className="text-xl font-mono font-bold text-muted-foreground leading-none tabular-nums">
									{formatMoney(Number(plan.additionalToothPrice))}
								</span>
							</div>
						</div>

						{/* Volume Cap Bar */}
						{plan.bulkPrice && (
							<div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between shadow-sm">
								<div className="flex flex-col">
									<span className="text-[9px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-500 mb-0.5">
										Volume Cap Active
									</span>
									<span className="text-[11px] text-muted-foreground font-medium">
										Flat rate after {Number(plan.teethCountToApplyBulkPrice)}{' '}
										units
									</span>
								</div>
								<span className="text-base font-mono font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
									{formatMoney(Number(plan.bulkPrice))}
								</span>
							</div>
						)}
					</div>
				)}
			</div>

			{/* --- 3. FOOTER: Audit Info --- */}
			<div className="mt-auto pt-5 border-t border-border flex flex-col gap-4 relative z-10 pl-3">
				{/* Discount/Markup Badge */}
				{financialMetrics &&
					(financialMetrics.isDiscount || financialMetrics.isMarkup) && (
						<div className="flex items-center justify-between animate-in fade-in duration-300">
							<span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-1.5">
								Standard Base:
								<span className="font-mono text-xs text-foreground font-black ml-1 line-through opacity-50 tabular-nums">
									{formatMoney(financialMetrics.standardBasePrice)}
								</span>
							</span>
							<div
								className={cn(
									'flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md border',
									financialMetrics.isDiscount
										? 'text-emerald-600 dark:text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
										: 'text-amber-600 dark:text-amber-500 bg-amber-500/10 border-amber-500/20',
								)}
							>
								{financialMetrics.isDiscount ? (
									<>-{financialMetrics.percentDiff}% Discount</>
								) : (
									<>+{financialMetrics.percentDiff}% Premium</>
								)}
							</div>
						</div>
					)}

				<div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/2 border border-border flex items-start gap-3 shadow-sm">
					<Info className="w-4 h-4 shrink-0 mt-0.5 text-primary opacity-80" />
					<p className="text-[10px] text-muted-foreground leading-relaxed font-medium">
						Account rules are locked. Future catalog modifications will not
						retroactively alter previously invoiced cases.
					</p>
				</div>
			</div>
		</div>
	)
})

PricingPlanLedgerCard.displayName = 'PricingPlanLedgerCard'

// =============================== Alternative Design =============================
// ;('use client')

// import { memo, useCallback, useMemo } from 'react'
// import {
// 	Edit3,
// 	ShieldCheck,
// 	Building2,
// 	TrendingDown,
// 	Info,
// 	Landmark,
// 	MoreVertical,
// 	Archive,
// 	Type,
// 	Star,
// 	Calculator,
// } from 'lucide-react'
// import { cn } from '@/lib/utils'
// import { Button } from '@/components/ui/button'
// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuItem,
// 	DropdownMenuLabel,
// 	DropdownMenuSeparator,
// 	DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
// import { PricingPlanDTO } from '@/schema/composed/catalog/pricing-plans.dtos'

// interface Props {
// 	plan: PricingPlanDTO
// 	isGlobalDefault?: boolean
// 	onEdit: (id: string) => void
// 	onArchive?: (id: string, name: string, isCurrentlyArchived: boolean) => void
// 	onSetDefault?: (id: string) => void
// 	standardBasePrice?: number | null
// 	onRename: (id: string, name: string) => void
// }

// export const PricingPlanLedgerCard = memo(function PricingPlanLedgerCard({
// 	plan,
// 	isGlobalDefault = false,
// 	onEdit,
// 	onArchive,
// 	onSetDefault,
// 	standardBasePrice,
// 	onRename,
// }: Props) {
// 	const formatMoney = (val: number | null | undefined) => {
// 		if (val == null) return '$0.00'
// 		return new Intl.NumberFormat('en-US', {
// 			style: 'currency',
// 			currency: 'USD',
// 		}).format(val)
// 	}

// 	const handleEditClick = useCallback(() => {
// 		onEdit(plan.id)
// 	}, [plan.id, onEdit])

// 	// --- DYNAMIC FINANCIAL CALCULATIONS ---
// 	const financialMetrics = useMemo(() => {
// 		const currentPrice =
// 			plan.pricingStrategy === 'PERTOOTH'
// 				? Number(plan.toothPrice || 0)
// 				: plan.pricingStrategy === 'BULK'
// 					? Number(plan.bulkPrice || 0)
// 					: Number(plan.firstToothPrice || 0)

// 		if (isGlobalDefault || !standardBasePrice || standardBasePrice === 0) {
// 			return null
// 		}

// 		const diff = standardBasePrice - currentPrice
// 		const isDiscount = diff > 0
// 		const isMarkup = diff < 0
// 		const percentDiff = Math.abs(Math.round((diff / standardBasePrice) * 100))

// 		return {
// 			diff,
// 			percentDiff,
// 			isDiscount,
// 			isMarkup,
// 			standardBasePrice,
// 		}
// 	}, [plan, isGlobalDefault, standardBasePrice])

// 	const isCustomClinicDeal = !!plan?.clinic?.id

// 	return (
// 		<div
// 			className={cn(
// 				'lab-card p-6 flex flex-col group relative overflow-hidden transition-all duration-300 border-border bg-card',
// 				plan.isArchived
// 					? 'opacity-60 grayscale hover:grayscale-0'
// 					: 'hover:shadow-xl hover:border-emerald-500/40',
// 				isGlobalDefault &&
// 					!plan.isArchived &&
// 					'border-emerald-500/30 bg-emerald-500/[0.02]',
// 			)}
// 		>
// 			{/* Background Graphic (Matches WorkType / Product Cards) */}
// 			<Calculator
// 				className={cn(
// 					'absolute -bottom-6 -right-6 w-32 h-32 pointer-events-none group-hover:scale-110 transition-transform duration-500',
// 					isGlobalDefault
// 						? 'text-emerald-500/[0.03] dark:text-emerald-500/[0.05]'
// 						: 'text-slate-50 dark:text-white/[0.02]',
// 				)}
// 			/>

// 			{/* --- 1. HEADER --- */}
// 			<div className="flex items-start justify-between mb-4 relative z-10">
// 				<div
// 					className={cn(
// 						'w-10 h-10 rounded-xl border flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300',
// 						isGlobalDefault
// 							? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
// 							: 'bg-slate-100 dark:bg-[#121214] text-slate-500 dark:text-zinc-400 border-border group-hover:text-emerald-500 group-hover:border-emerald-500/20',
// 					)}
// 				>
// 					{isGlobalDefault ? (
// 						<ShieldCheck className="w-5 h-5" />
// 					) : (
// 						<Landmark className="w-5 h-5" />
// 					)}
// 				</div>

// 				{/* CONTEXT MENU */}
// 				<DropdownMenu>
// 					<DropdownMenuTrigger asChild>
// 						<Button
// 							variant="ghost"
// 							size="icon"
// 							className="h-8 w-8 text-muted-foreground hover:text-foreground -mr-2 -mt-2 transition-colors rounded-lg"
// 						>
// 							<MoreVertical className="w-4 h-4" />
// 						</Button>
// 					</DropdownMenuTrigger>
// 					<DropdownMenuContent
// 						align="end"
// 						className="w-56 rounded-xl border-border shadow-premium dark:bg-[#121214]"
// 					>
// 						<DropdownMenuLabel className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
// 							Ledger Actions
// 						</DropdownMenuLabel>
// 						<DropdownMenuItem
// 							onClick={handleEditClick}
// 							className="cursor-pointer font-medium text-xs py-2 hover:bg-emerald-500/10 hover:text-emerald-600 transition-colors"
// 						>
// 							<Edit3 className="w-3.5 h-3.5 mr-2 text-slate-400" /> Edit Pricing
// 							Logic
// 						</DropdownMenuItem>
// 						<DropdownMenuItem
// 							onClick={() => onRename(plan.id, plan.name)}
// 							className="cursor-pointer font-medium text-xs py-2 hover:bg-emerald-500/10 hover:text-emerald-600 transition-colors"
// 						>
// 							<Type className="w-3.5 h-3.5 mr-2 text-slate-400" /> Rename Plan
// 						</DropdownMenuItem>

// 						{!isGlobalDefault && !isCustomClinicDeal && onSetDefault && (
// 							<DropdownMenuItem
// 								onClick={() => onSetDefault(plan.id)}
// 								className="cursor-pointer font-medium text-xs py-2 text-emerald-600 hover:bg-emerald-500/10 transition-colors"
// 							>
// 								<Star className="w-3.5 h-3.5 mr-2" /> Set as Master Default
// 							</DropdownMenuItem>
// 						)}
// 						<DropdownMenuSeparator className="bg-border/50" />
// 						<DropdownMenuItem
// 							disabled={isGlobalDefault}
// 							onClick={() =>
// 								onArchive && onArchive(plan.id, plan.name, plan.isArchived)
// 							}
// 							className={cn(
// 								'font-medium text-xs py-2 transition-colors',
// 								isGlobalDefault
// 									? 'opacity-50 cursor-not-allowed text-rose-600'
// 									: plan.isArchived
// 										? 'cursor-pointer text-amber-600 focus:text-amber-500 focus:bg-amber-500/10'
// 										: 'cursor-pointer text-rose-600 focus:text-rose-500 focus:bg-rose-500/10',
// 							)}
// 						>
// 							<Archive className="w-3.5 h-3.5 mr-2" />
// 							{plan.isArchived ? 'Restore Plan' : 'Archive Plan'}
// 						</DropdownMenuItem>
// 					</DropdownMenuContent>
// 				</DropdownMenu>
// 			</div>

// 			{/* --- 2. BODY (Identity & Status) --- */}
// 			<div className="space-y-1 mb-6 relative z-10">
// 				<div className="flex items-center gap-2">
// 					<h3 className="text-lg font-bold text-foreground leading-tight tracking-tight line-clamp-1">
// 						{isGlobalDefault
// 							? 'Global Catalog Rate'
// 							: plan.clinic?.name || plan.name}
// 					</h3>
// 					{/* THE ARCHIVE BADGE */}
// 					{plan.isArchived && (
// 						<span className="px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-500 text-[9px] font-bold uppercase tracking-widest">
// 							Archived
// 						</span>
// 					)}
// 				</div>
// 				<p className="text-xs text-muted-foreground flex items-center gap-1.5 min-h-[16px]">
// 					{isGlobalDefault ? (
// 						<span className="flex items-center gap-1">
// 							<Landmark className="w-3 h-3" /> Standard Base Price
// 						</span>
// 					) : isCustomClinicDeal ? (
// 						<span className="flex items-center gap-1 text-primary/80">
// 							<Building2 className="w-3 h-3" /> Clinic Override Deal
// 						</span>
// 					) : (
// 						<span>General Rate</span>
// 					)}
// 				</p>
// 			</div>

// 			{/* --- 3. DATA VITALS (The Financial Logic) --- */}
// 			<div className="flex flex-col gap-2 mb-6 relative z-10 border-t border-border/50 pt-4 flex-1">
// 				<div className="flex justify-between items-center text-xs mb-2">
// 					<span className="text-muted-foreground font-medium flex items-center gap-2">
// 						Billing Strategy
// 					</span>
// 					<span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-100 dark:bg-white/5 border border-border text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
// 						{plan.pricingStrategy}
// 					</span>
// 				</div>

// 				{plan.pricingStrategy === 'PERTOOTH' && (
// 					<div className="flex justify-between items-center text-xs">
// 						<span className="text-muted-foreground font-medium flex items-center gap-2">
// 							Unit Rate (Tooth)
// 						</span>
// 						<span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
// 							{formatMoney(Number(plan.toothPrice))}
// 						</span>
// 					</div>
// 				)}

// 				{plan.pricingStrategy === 'BULK' && (
// 					<div className="flex justify-between items-center text-xs">
// 						<span className="text-muted-foreground font-medium flex items-center gap-2">
// 							Flat Case Rate
// 						</span>
// 						<span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
// 							{formatMoney(Number(plan.bulkPrice))}
// 						</span>
// 					</div>
// 				)}

// 				{plan.pricingStrategy === 'CUSTOM' && (
// 					<div className="flex flex-col gap-2">
// 						<div className="flex justify-between items-center text-xs">
// 							<span className="text-muted-foreground font-medium">
// 								1st Unit
// 							</span>
// 							<span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
// 								{formatMoney(Number(plan.firstToothPrice))}
// 							</span>
// 						</div>
// 						<div className="flex justify-between items-center text-xs">
// 							<span className="text-muted-foreground font-medium">
// 								Additional Units
// 							</span>
// 							<span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
// 								{formatMoney(Number(plan.additionalToothPrice))}
// 							</span>
// 						</div>
// 						{plan.bulkPrice && (
// 							<div className="flex justify-between items-center text-xs pt-1">
// 								<span className="text-muted-foreground font-medium">
// 									Cap (at {Number(plan.teethCountToApplyBulkPrice)} U)
// 								</span>
// 								<span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
// 									{formatMoney(Number(plan.bulkPrice))}
// 								</span>
// 							</div>
// 						)}
// 					</div>
// 				)}
// 			</div>

// 			{/* --- 4. ACTION FOOTER (Comparison) --- */}
// 			<div className="mt-auto pt-4 border-t border-border relative z-10 min-h-[48px] flex flex-col justify-center">
// 				{financialMetrics &&
// 				(financialMetrics.isDiscount || financialMetrics.isMarkup) ? (
// 					<div className="flex items-center justify-between">
// 						<div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
// 							<Landmark className="w-3.5 h-3.5" /> Base:
// 							<span className="font-mono line-through opacity-60 ml-1">
// 								{formatMoney(financialMetrics.standardBasePrice)}
// 							</span>
// 						</div>
// 						<div
// 							className={cn(
// 								'flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border',
// 								financialMetrics.isDiscount
// 									? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
// 									: 'text-amber-600 dark:text-amber-500 bg-amber-500/10 border-amber-500/20',
// 							)}
// 						>
// 							{financialMetrics.isDiscount ? (
// 								<>
// 									<TrendingDown className="w-3 h-3" />{' '}
// 									{financialMetrics.percentDiff}% SAVINGS
// 								</>
// 							) : (
// 								<>
// 									<TrendingUp className="w-3 h-3" />{' '}
// 									{financialMetrics.percentDiff}% PREMIUM
// 								</>
// 							)}
// 						</div>
// 					</div>
// 				) : (
// 					<div className="flex items-center gap-2 text-[10px] text-muted-foreground">
// 						<Info className="w-3.5 h-3.5 shrink-0 text-emerald-500 opacity-80" />
// 						<p className="leading-tight">
// 							Rates lock at Case Creation to protect historical invoices.
// 						</p>
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	)
// })

// PricingPlanLedgerCard.displayName = 'PricingPlanLedgerCard'
