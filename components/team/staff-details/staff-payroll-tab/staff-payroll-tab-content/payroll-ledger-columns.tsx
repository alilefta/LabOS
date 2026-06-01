// components/team/team-details/payroll-tab/payroll-ledger-columns.tsx

'use client'

import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import {
	CheckCircle2,
	Printer,
	Calendar,
	Clock,
	XCircle,
	LucideIcon,
	Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { StaffPayoutHistoryItemDTO } from '@/schema/composed/team/payroll-history.dtos' // Assuming PayoutStatus enum exists
import { cn } from '@/lib/utils'
import { PayoutStatus } from '@/schema/base/enums.base'

const formatMoney = (val: number) =>
	new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
		val,
	)

// ── 1. DYNAMIC STATUS BADGE CONFIG ──────────────────────────────────────────
// Elevates the UX by supporting multiple administrative states (Pending, Settled, Voided)
const STATUS_CONFIG: Record<
	PayoutStatus,
	{ label: string; icon: LucideIcon; colorClass: string }
> = {
	SETTLED: {
		label: 'Settled',
		icon: CheckCircle2,
		colorClass:
			'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
	},
	PROCESSING: {
		label: 'Processing',
		icon: Loader2,
		colorClass:
			'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 [&>svg]:animate-spin',
	},
	PENDING_APPROVAL: {
		label: 'Pending Approval',
		icon: Clock,
		colorClass:
			'bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20 animate-pulse',
	},
	VOIDED: {
		label: 'Voided',
		icon: XCircle,
		colorClass:
			'bg-slate-100 dark:bg-white/5 text-muted-foreground border-border border-dashed opacity-60',
	},
}

export const getPayrollLedgerColumns = (
	staffId: string,
): ColumnDef<StaffPayoutHistoryItemDTO>[] => [
	{
		accessorKey: 'payoutDate',
		header: 'Payout date',
		cell: ({ row }) => {
			const date = row.original.payoutDate

			// UX FIX: Safe, fallback-protected date formatting [2]
			const formattedDate = date
				? format(new Date(date), 'yyyy-MM-dd')
				: 'Unscheduled'

			return (
				<div className="flex items-center gap-3">
					<Calendar className="w-4 h-4 text-emerald-500 shrink-0" />
					<span className="font-mono font-bold text-sm text-foreground">
						{formattedDate}
					</span>
				</div>
			)
		},
	},
	{
		accessorKey: 'casesCount',
		header: 'Cases included',
		cell: ({ row }) => {
			const count = row.getValue('casesCount') as number
			return (
				<span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-border text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
					{count} {count === 1 ? 'Case' : 'Cases'}
				</span>
			)
		},
	},
	{
		accessorKey: 'totalPaid',
		header: 'Total paid',
		cell: ({ row }) => {
			const total = row.getValue('totalPaid') as number
			return (
				<div className="flex items-center gap-1 font-mono font-bold text-sm text-emerald-600 dark:text-emerald-500">
					{formatMoney(total)}
				</div>
			)
		},
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			// UX FIX: Read dynamically from the DTO instead of hardcoding "Settled" [3]
			const status = (row.getValue('status') as PayoutStatus) || 'SETTLED'
			const config = STATUS_CONFIG[status] || STATUS_CONFIG['SETTLED']
			const Icon = config.icon

			return (
				<div
					className={cn(
						'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase tracking-widest',
						config.colorClass,
					)}
				>
					<Icon className="w-3.5 h-3.5" />
					{config.label}
				</div>
			)
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const dateKey = row.original.id // YYYY-MM-DD

			return (
				<div className="text-right pr-2">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								onClick={(e) => {
									e.stopPropagation()
									window.open(`/paystub/${staffId}/${dateKey}`, '_blank')
								}}
								className="h-8 w-8 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors"
							>
								<Printer className="h-4 w-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent className="glass-ai-panel border-border shadow-2xl z-100 pointer-events-none">
							<p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">
								Accounts Payable
							</p>
							<p className="text-xs font-bold text-foreground">
								Print official paystub
							</p>
						</TooltipContent>
					</Tooltip>
				</div>
			)
		},
	},
]
