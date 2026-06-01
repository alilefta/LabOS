'use client'

import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { ShieldAlert } from 'lucide-react'

// Schemas & DTOs
import {
	StaffPayrollVitalsDTO,
	GetPendingCommissionsResultDTO,
} from '@/schema/composed/team/payroll-ledger.dtos'

// Actions (Query Functions)
import { handleSafeActionError } from '@/lib/safe-action-helpers'
import { getStaffPayrollVitalsAction } from '@/actions/team/finanical-ledger/get-staff-payroll-vitals-action'
import { getPendingCommissionsAction } from '@/actions/team/finanical-ledger/get-pending-comission-action'

// UI Components
import { usePermissions } from '@/providers/permissions-provider'
import { StaffCompensationVitals } from './staff-compensation-vitals'
import { PendingCommissionsQueue } from './pending-commissions-queue'
import { PayrollLedgerTable } from './payroll-ledger-table'
import { Skeleton } from '@/components/ui/skeleton' // Imported for the true loading state

// Dynamic Import for heavy modal (only loads chunk when sheet opens)
const RecordPayoutSheet = dynamic(
	() =>
		import('../../../../modals/team/record-payout-sheet').then(
			(cm) => cm.RecordPayoutSheet,
		),
	{ ssr: false },
)

interface Props {
	staffId: string
}

export function StaffPayrollTabContent({ staffId }: Props) {
	// ── 1. STATE & PERMISSIONS ──────────────────────────────────────────
	const [isPayoutSheetOpen, setIsPayoutSheetOpen] = useState(false)
	const { canViewCommissions } = usePermissions()

	// ── 2. SECURE DATA HYDRATION HOOKS ──────────────────────────────────
	// The staleTime prevents the "Double Fetch" bug upon Server Hydration.
	// The `enabled: canViewCommissions` mathematically prevents data leaking.

	// Query 1: Fetch Financial Vitals
	const { data: vitals, isLoading: isLoadingVitals } = useQuery({
		queryKey: ['staff-payroll-vitals', staffId],
		queryFn: async () => {
			const res = await getStaffPayrollVitalsAction({ staffId })
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({
					serverError: res.serverError,
					validationErrors: res.validationErrors,
				})
			}
			return (res?.data as StaffPayrollVitalsDTO) || null
		},
		staleTime: 1000 * 60 * 5,
		enabled: canViewCommissions, // SECURITY GUARD
	})

	// Query 2: Fetch Pending Cases list
	const { data: queue, isLoading: isLoadingQueue } = useQuery({
		queryKey: ['pending-commissions', staffId],
		queryFn: async () => {
			const res = await getPendingCommissionsAction({ staffId })
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({
					serverError: res.serverError,
					validationErrors: res.validationErrors,
				})
			}
			return (res?.data as GetPendingCommissionsResultDTO) || null
		},
		staleTime: 1000 * 60 * 5,
		enabled: canViewCommissions, // SECURITY GUARD
	})

	const staffName = useMemo(() => {
		if (!vitals) return 'N/A'
		return vitals.firstName + ' ' + vitals.lastName
	}, [vitals])

	// ── 3. RENDERING GUARDS & LOADING STATES ─────────────────────────────

	// A. Role Guard Violation (Hard Fallback)
	if (!canViewCommissions) {
		return (
			<div className="w-full h-80 rounded-4xl border-2 border-dashed border-destructive/20 bg-destructive/5 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
				<div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive mb-4 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
					<ShieldAlert className="w-6 h-6" />
				</div>
				<h3 className="text-sm font-bold text-destructive uppercase tracking-widest">
					Access Restricted
				</h3>
				<p className="text-xs text-destructive/80 max-w-sm mt-1 font-medium">
					Your current role does not grant access to the financial ledger or
					compensation module.
				</p>
			</div>
		)
	}

	// B. True Loading State (Solves the "Illusion" problem)
	// If TanStack Query hasn't received the hydrated data yet, we show the exact Skeletons.
	if (isLoadingVitals || isLoadingQueue || !vitals || !queue) {
		return (
			<div className="space-y-6 animate-pulse">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<Skeleton className="h-32 rounded-3xl bg-emerald-500/5 dark:bg-emerald-500/2" />
					<Skeleton className="h-32 rounded-3xl bg-emerald-500/5 dark:bg-emerald-500/2" />
					<Skeleton className="h-32 rounded-3xl bg-emerald-500/5 dark:bg-emerald-500/2" />
				</div>
				<Skeleton className="h-16 w-full rounded-2xl bg-slate-50 dark:bg-white/2 border border-border mt-4" />
				<div className="space-y-3 pt-2">
					{Array.from({ length: 4 }).map((_, i) => (
						<Skeleton
							key={i}
							className="h-16 w-full rounded-2xl bg-slate-50/50 dark:bg-white/2 border border-border"
						/>
					))}
				</div>
			</div>
		)
	}

	// ── 4. MAIN RENDER ───────────────────────────────────────────────────
	return (
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
			{/* ZONE A: The Financial Vitals Bento Grid */}
			<StaffCompensationVitals vitals={vitals} />

			{/* ZONE B: The Pending Unbilled Ledger Queue */}
			<PendingCommissionsQueue
				pendingCommissions={queue.pendingCommissions}
				// Only pass the click handler if there are actually cases to pay
				onPayClick={
					queue.pendingCommissions.length > 0
						? () => setIsPayoutSheetOpen(true)
						: undefined
				}
			/>

			{/* ZONE C: Historical Ledger Table */}
			<PayrollLedgerTable staffId={staffId} />

			{/* --- SPRINT 3: RECORD PAYOUT SHEET --- */}
			{/* 
                Performance Fix: By conditionally rendering this only when `isPayoutSheetOpen` is true, 
                Next.js will literally delay downloading the JavaScript chunk for this modal 
                until the user actually clicks the "Pay" button! 
            */}
			{isPayoutSheetOpen && (
				<RecordPayoutSheet
					isOpen={isPayoutSheetOpen}
					onClose={() => setIsPayoutSheetOpen(false)}
					staffId={staffId}
					pendingCases={queue.pendingCommissions}
					staffName={staffName}
				/>
			)}
		</div>
	)
}
