'use client'

import { memo, useMemo } from 'react'
import Link from 'next/link'
import { Wallet, Plus, Inbox, HelpCircle, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { PendingCommissionItemDTO } from '@/schema/composed/team/payroll-ledger.dtos'

interface Props {
	pendingCommissions: PendingCommissionItemDTO[]
	onPayClick?: () => void
}

export const PendingCommissionsQueue = memo(function PendingCommissionsQueue({
	pendingCommissions,
	onPayClick,
}: Props) {
	const formatMoney = (val: number) =>
		new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(val)

	const isEmpty = pendingCommissions.length === 0

	// ── 1. PERFORMANCE OPTIMIZATION: CLIENT-SIDE DATE MEMOIZATION ──
	// Instantiating JS Date objects inside a .map loop causes heavy GC (garbage collection)
	// pressure. We memoize the formatting so it ONLY runs when the array actually changes.
	const formattedCommissions = useMemo(() => {
		return pendingCommissions.map((item) => ({
			...item,
			formattedDate: format(new Date(item.caseCreatedAt), 'MMM dd'),
		}))
	}, [pendingCommissions])

	return (
		<div className="lab-card flex flex-col overflow-hidden min-h-80 transition-all duration-300 bg-card">
			{/* --- 1. OPERATION ACTION BAR --- */}
			<div className="p-4 sm:p-5 border-b border-border bg-slate-50/50 dark:bg-white/2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 relative z-10">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 shadow-sm">
						<Wallet className="w-4 h-4" />
					</div>
					<div>
						<h3 className="text-sm font-bold text-foreground">
							Pending Payout Queue
						</h3>
						<p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5 font-medium">
							Awaiting Statement Run
						</p>
					</div>
				</div>

				{onPayClick && <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
					<Button
						type="button"
						disabled={isEmpty}
						onClick={onPayClick}
						className={cn(
							'rounded-xl h-10 px-5 font-bold text-xs shadow-sm flex items-center gap-1.5 w-full sm:w-auto justify-center transition-all  duration-300',
							// Dynamic active states
							!isEmpty
								? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/25 cursor-pointer scale-100'
								: 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-zinc-500 border-border cursor-not-allowed scale-95',
						)}
					>
						<Plus className="w-4 h-4" /> Review & Issue Payout
					</Button>
				</div>}
			</div>

			{/* --- 2. THE CASES LIST --- */}
			<div className="flex-1 overflow-y-auto custom-scrollbar max-h-87.5 min-h-45 p-4 sm:p-5 relative z-10 flex flex-col gap-3">
				{isEmpty ? (
					// --- FIXED EMPTY STATE: In-flow Flexbox layout (CLS-safe) ---
					<div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 my-auto">
						<div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 border border-border flex items-center justify-center mb-3 transition-transform duration-300 hover:scale-110">
							<Inbox className="w-5 h-5 text-slate-400 dark:text-zinc-600" />
						</div>
						<h4 className="text-xs font-bold text-foreground">Queue Settled</h4>
						<p className="text-[10px] text-muted-foreground max-w-56 mt-1.5 leading-relaxed font-medium">
							This employee currently has zero completed or delivered cases
							awaiting commission payouts.
						</p>
					</div>
				) : (
					// --- THE SEMANTIC CLICKABLE ROW LIST ---
					formattedCommissions.map((item) => (
						<Link
							key={item.assignmentId}
							href={`/cases/${item.caseId}`}
							target="_blank" // Opens in a new tab so the accountant doesn't lose their place in the ledger!
							className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl border border-border bg-card hover:border-emerald-500/30 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-all group shadow-sm relative overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
						>
							{/* Highlight overlay on hover */}
							<div className="absolute inset-0 bg-linear-to-r from-emerald-500/1 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

							<div className="flex items-start gap-3.5 min-w-0 relative z-10">
								<div className="w-1 h-8 bg-slate-200 dark:bg-white/10 group-hover:bg-emerald-500 rounded-full mt-1 shrink-0 transition-colors" />
								<div className="flex flex-col min-w-0">
									<div className="flex items-center gap-2">
										<span className="font-mono font-bold text-sm text-foreground group-hover:text-primary transition-colors">
											#{item.caseNumber}
										</span>
										<span className="text-[9px] font-mono font-bold text-muted-foreground/60 uppercase">
											{item.formattedDate}
										</span>
									</div>
									<span className="text-xs font-semibold text-muted-foreground mt-1 truncate max-w-50 sm:max-w-75">
										Patient:{' '}
										<strong className="text-foreground font-bold">
											{item.patientName}
										</strong>
									</span>
								</div>
							</div>

							<div className="flex items-center gap-6 justify-between sm:justify-end mt-3 sm:mt-0 pl-5 sm:pl-0 border-t border-border/50 sm:border-none pt-2.5 sm:pt-0 relative z-10">
								{/* Raw Case Total */}
								<div className="flex flex-col items-start sm:items-end">
									<span className="text-[9px] font-bold text-muted-foreground uppercase font-sans">
										Case Total
									</span>
									<span className="text-xs font-mono font-medium text-muted-foreground/60">
										{formatMoney(item.caseTotal)}
									</span>
								</div>

								<div className="w-px h-6 bg-border hidden sm:block" />

								{/* Earned Commission (Glows Green) */}
								<div className="flex flex-col items-end min-w-20 shrink-0">
									<span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-500 uppercase font-sans">
										Com. Earned
									</span>
									<span className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-500 flex items-center gap-1.5">
										+{formatMoney(item.commissionTotal)}
										<ArrowRight className="w-3.5 h-3.5 text-emerald-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all hidden sm:block" />
									</span>
								</div>
							</div>
						</Link>
					))
				)}
			</div>

			{/* Legend / Info Footer */}
			{!isEmpty && (
				<div className="p-4 border-t border-border bg-slate-50/50 dark:bg-white/1 flex items-start gap-2.5 shrink-0">
					<HelpCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
					<p className="text-[10px] text-muted-foreground leading-normal">
						This queue only displays cases with{' '}
						<strong className="text-foreground">Completed</strong> or{' '}
						<strong className="text-foreground">Delivered</strong> statuses
						where commissions have not yet been disbursed.
					</p>
				</div>
			)}
		</div>
	)
})
