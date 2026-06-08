'use client'

import { memo } from 'react'
import Link from 'next/link'
import {
	Phone,
	Mail,
	Star,
	Plus,
	MoreHorizontal,
	ShieldAlert,
	Activity,
	PackageCheck,
	Layers,
	DollarSign,
	TrendingUp,
	TrendingDown,
	UserMinus,
	Edit2,
	UserCheck,
	Medal,
} from 'lucide-react'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { DentistPersonaDTO } from '@/schema/composed/clinics/clinic-dentists.dtos'
import { sanitizeDentistName } from '@/lib/formatters/names-formatters'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
interface Props {
	dentist: DentistPersonaDTO
	clinicId: string
	canViewFinancials: boolean
	onToggleStatus: (id: string, current: boolean) => void
	onEdit: (id: string) => void
	onSetDefault: (id: string) => void
}

export const DentistPersonaCard = memo(function DentistPersonaCard({
	dentist,
	clinicId,
	canViewFinancials,
	onEdit,
	onToggleStatus,
	onSetDefault,
}: Props) {
	// Robust initials generator
	const initials =
		dentist.name
			.split(' ')
			.filter((n) => n.length > 0)
			.map((n) => n[0])
			.join('')
			.substring(0, 2)
			.toUpperCase() || 'DR'

	// Risk Thresholds
	const isHighRisk = dentist.metrics.remakeRate >= 10
	const isElevatedRisk =
		dentist.metrics.remakeRate >= 5 && dentist.metrics.remakeRate < 10

	// Growth Trend
	const averageMonthlyVolume = Math.round(dentist.metrics.casesL90D / 3)
	const isGrowing =
		dentist.metrics.casesL30D > averageMonthlyVolume &&
		dentist.metrics.casesL30D > 0
	const isShrinking =
		dentist.metrics.casesL30D < averageMonthlyVolume && averageMonthlyVolume > 0

	const formatCurrency = (val: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(val)
	}

	// --- GPU-ACCELERATED GLOW LOGIC ---
	let glowVar = null
	if (isHighRisk) {
		glowVar = '--glow-destructive-rgb'
	} else if (isGrowing) {
		glowVar = '--glow-emerald-rgb'
	}

	return (
		<div className="lab-card flex flex-col p-5 group hover:border-primary/40 hover:shadow-lg transition-all duration-300 relative overflow-hidden h-full min-h-90 transform-gpu will-change-transform">
			{/* Ambient Growth Glow */}
			{/* THE PERFORMANCE FIX: Radial Gradient replacing Blur */}
			{glowVar && (
				<div
					className="absolute inset-0 pointer-events-none transition-[background] duration-1000 ease-in-out z-0 group-hover:opacity-100 opacity-60"
					style={{
						background: `radial-gradient(circle at top right, rgba(var(${glowVar}), 0.12) 0%, transparent 60%)`,
					}}
				/>
			)}

			{/* --- ZONE A: IDENTITY & BADGES --- */}
			<div className="flex items-start justify-between mb-5 relative z-10">
				<div className="flex gap-3 min-w-0">
					<Avatar
						className={cn(
							'w-12 h-12 border-2 border-background shadow-sm ring-1 shrink-0 transition-all duration-500',
							dentist.isActive
								? 'ring-border group-hover:ring-primary/30'
								: 'ring-transparent',
						)}
					>
						<AvatarImage
							src={
								dentist.avatarUrl ||
								`https://api.dicebear.com/7.x/notionists/svg?seed=${dentist.id}`
							}
						/>
						<AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
							{initials}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col min-w-0">
						<h3 className="text-sm font-bold text-foreground truncate pr-2">
							{sanitizeDentistName(dentist.name)}
						</h3>

						{/* Specialty Badge */}
						<div className="flex items-center gap-1 mt-0.5">
							<span className="text-[10px] font-semibold text-primary/80 truncate">
								{dentist.speciality || 'General Practitioner'}
							</span>
						</div>

						<div className="flex flex-wrap items-center gap-1.5 mt-2">
							{dentist.isOwner && (
								<span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-500 uppercase tracking-widest border border-amber-500/20 flex items-center gap-1 shadow-sm">
									<Star className="w-2.5 h-2.5 fill-current" /> Owner
								</span>
							)}
							{!dentist.isActive && (
								<span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-destructive/10 text-destructive uppercase tracking-widest border border-destructive/20">
									Deactivated
								</span>
							)}
							{dentist.isActive && dentist.isDefault && (
								<span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-primary/10 text-primary uppercase tracking-widest border border-primary/20 shadow-sm">
									Primary
								</span>
							)}
						</div>
					</div>
				</div>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground -mr-2 -mt-2 transition-colors"
						>
							<MoreHorizontal className="w-4 h-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="end"
						className="w-56 rounded-xl border-border shadow-premium dark:bg-[#121214]"
					>
						<DropdownMenuLabel className="text-[10px] text-muted-foreground uppercase tracking-wider">
							Management
						</DropdownMenuLabel>
						<DropdownMenuItem
							className="cursor-pointer font-medium py-2.5"
							onClick={() => {
								console.log('Edit dentist button clicked', { id: dentist.id })
								onEdit(dentist.id)
							}}
						>
							<Edit2 className="w-4 h-4 mr-2" /> Edit Profile
						</DropdownMenuItem>
						{dentist.isActive && !dentist.isDefault && (
							<DropdownMenuItem
								className="cursor-pointer font-medium py-2.5"
								onClick={() => onSetDefault(dentist.id)}
							>
								<Star className="w-4 h-4 mr-2" /> Set as Primary
							</DropdownMenuItem>
						)}
						<DropdownMenuSeparator className="bg-border" />
						<DropdownMenuItem
							onClick={() => onToggleStatus(dentist.id, dentist.isActive)}
							className={cn(
								'cursor-pointer font-bold py-2.5',
								dentist.isActive
									? 'text-rose-600 focus:text-rose-600'
									: 'text-emerald-600 focus:text-emerald-600',
							)}
						>
							{dentist.isActive ? (
								<>
									<UserMinus className="w-4 h-4 mr-2" /> Deactivate
								</>
							) : (
								<>
									<UserCheck className="w-4 h-4 mr-2" /> Reactivate
								</>
							)}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* --- ZONE B: CONTACT --- */}
			<div className="space-y-2.5 mb-6 relative z-10">
				<div
					className={cn(
						'flex items-center gap-2 text-xs transition-colors',
						dentist.phoneNumber
							? 'text-muted-foreground hover:text-foreground'
							: 'text-muted-foreground opacity-50',
					)}
				>
					<Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
					<span
						className={cn(
							'truncate',
							dentist.phoneNumber && 'font-mono font-medium',
						)}
					>
						{dentist.phoneNumber || 'No phone listed'}
					</span>
				</div>
				<div
					className={cn(
						'flex items-center gap-2 text-xs transition-colors',
						dentist.email
							? 'text-muted-foreground hover:text-foreground'
							: 'text-muted-foreground opacity-50',
					)}
				>
					<Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
					<span className="truncate">{dentist.email || 'No email listed'}</span>
				</div>
				{dentist.licenseNumber && (
					<div className="flex items-center gap-2 text-[10px] text-muted-foreground/60 uppercase font-bold tracking-tight">
						<Medal className="w-3 h-3 text-slate-400 shrink-0" />
						<span>Lic: {dentist.licenseNumber}</span>
					</div>
				)}
			</div>

			{/* --- ZONE C: THE PERFORMANCE LEDGER --- */}
			<div className="mt-auto p-4 rounded-xl bg-slate-50 dark:bg-white/2 border border-border relative z-10">
				<div className="flex items-center justify-between mb-4">
					<span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
						<Activity className="w-3.5 h-3.5 text-primary/70" /> Clinical Vitals
					</span>
					<span className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-wider">
						90-Day Rolling
					</span>
				</div>

				<div className="space-y-3">
					{/* 1. Production Volume */}
					<div className="flex justify-between items-end">
						<span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
							<PackageCheck className="w-3.5 h-3.5" /> Production
						</span>
						<div className="flex items-center gap-2">
							<span
								className={cn(
									'text-[10px] font-bold px-1.5 py-0.5 rounded-md border flex items-center gap-1',
									isGrowing
										? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 shadow-sm'
										: isShrinking
											? 'bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20'
											: 'bg-slate-100 dark:bg-white/10 text-muted-foreground border-border',
								)}
							>
								{isGrowing && <TrendingUp className="w-2.5 h-2.5" />}
								{isShrinking && <TrendingDown className="w-2.5 h-2.5" />}
								{dentist.metrics.casesL30D} L30D
							</span>
							<span className="text-xs font-mono font-bold text-foreground">
								{dentist.metrics.casesL90D} Total
							</span>
						</div>
					</div>

					{/* 2. Top Rx (Grouped WorkType + Product) */}
					<div className="flex justify-between items-end">
						<span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
							<Layers className="w-3.5 h-3.5" /> Top Rx
						</span>
						{dentist.metrics.topRx ? (
							<Tooltip>
								<TooltipTrigger asChild>
									<button className="text-xs font-bold text-foreground text-right leading-tight max-w-35 truncate cursor-help border-b border-dashed border-foreground/30 hover:border-foreground transition-colors">
										{dentist.metrics.topRx}
									</button>
								</TooltipTrigger>
								<TooltipContent className="glass-ai-panel border-border shadow-xl z-50">
									<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
										Most Prescribed Product
									</p>
									<p className="text-xs font-bold text-foreground">
										{dentist.metrics.topRx}
									</p>
								</TooltipContent>
							</Tooltip>
						) : (
							<span className="text-xs font-medium text-muted-foreground italic">
								No Data
							</span>
						)}
					</div>

					{/* 3. Generated Revenue (Permission Guarded) */}
					{canViewFinancials && (
						<div className="flex justify-between items-end">
							<span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
								<DollarSign className="w-3.5 h-3.5" /> Revenue
							</span>
							<span className="text-xs font-mono font-bold text-foreground">
								{formatCurrency(dentist.metrics.generatedRevenue)}
							</span>
						</div>
					)}

					{/* 4. Remake Risk (Math-Driven) */}
					<div className="flex justify-between items-end pt-3 border-t border-border/60">
						<span className="text-xs text-muted-foreground font-medium">
							Remake Rate
						</span>
						<div
							className={cn(
								'flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border',
								isHighRisk
									? 'bg-rose-500/10 text-rose-600 dark:text-rose-500 border-rose-500/20'
									: isElevatedRisk
										? 'bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20'
										: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-500/20',
							)}
						>
							{(isHighRisk || isElevatedRisk) && (
								<ShieldAlert className="w-3 h-3" />
							)}
							{dentist.metrics.remakeRate.toFixed(1)}%
						</div>
					</div>
				</div>
			</div>

			{/* --- ZONE D: QUICK ACTIONS --- */}
			<div className="mt-4 pt-4 border-t border-border flex gap-2 relative z-10">
				{dentist.isActive ? (
					<Link
						href={`/cases/new-case?clinicId=${clinicId}&dentistId=${dentist.id}`}
						className="flex-1"
					>
						<Button className="w-full rounded-xl h-10 bg-primary/10 text-primary hover:bg-primary hover:text-white shadow-none font-bold text-xs transition-all flex items-center justify-center gap-2">
							<Plus className="w-3.5 h-3.5" /> New Case
						</Button>
					</Link>
				) : (
					<Button
						disabled
						variant="outline"
						className="flex-1 rounded-xl h-10 text-xs font-bold opacity-50 cursor-not-allowed"
					>
						Register Locked
					</Button>
				)}
			</div>
		</div>
	)
})
