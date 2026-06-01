// components/team/team-details/payroll-tab/staff-payroll-tab.tsx

import { redirect, notFound } from 'next/navigation'
import { Suspense } from 'react'
import { dehydrate } from '@tanstack/react-query'
import { Wallet, ShieldAlert } from 'lucide-react'
import z from 'zod'

import { getQueryClient } from '@/providers/get-query-client'
import { getServerSession } from '@/lib/get-session'
import { getCurrentLabUserRoleByAuthUserId } from '@/data/lab'

// UI & Shared Components
import { QueryHydrationBoundary } from '@/providers/query-hydration-boundary'
import { Skeleton } from '@/components/ui/skeleton'

// Actions
import { getStaffPayrollVitalsAction } from '@/actions/team/finanical-ledger/get-staff-payroll-vitals-action'
import { getPendingCommissionsAction } from '@/actions/team/finanical-ledger/get-pending-comission-action'
import { StaffPayrollTabContent } from './staff-payroll-tab-content/staff-payroll-tab-content'
import { getStaffPayoutHistoryAction } from '@/actions/team/finanical-ledger/get-payout-history'

interface Props {
	staffId: string
}

export async function StaffPayrollTab({ staffId }: Props) {
	// ── 1. STRICT ID VALIDATION (Prevents Malformed Queries) ─────────────
	const isValidUuid = z.string().uuid().safeParse(staffId).success
	if (!isValidUuid) return notFound()

	// ── 2. STRICT FINANCIAL SECURITY GUARD ───────────────────────────────
	const session = await getServerSession()
	if (!session) redirect('/sign-in')

	const labUser = await getCurrentLabUserRoleByAuthUserId()
	if (!labUser) redirect('/onboarding')

	const userRole = labUser.role // e.g. "OWNER" | "MANAGER" | "STAFF"
	const canViewPayroll = userRole === 'OWNER' || userRole === 'MANAGER'

	if (!canViewPayroll) {
		return (
			<div className="w-full h-80 rounded-4xl border-2 border-dashed border-destructive/20 bg-destructive/5 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
				<div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive mb-4 shadow-[0_0_15px_rgba(239,68,68,0.2)] animate-pulse">
					<ShieldAlert className="w-6 h-6" />
				</div>
				<h3 className="text-sm font-bold text-destructive uppercase tracking-widest">
					Unauthorized Access
				</h3>
				<p className="text-xs text-destructive/80 max-w-sm mt-1 leading-relaxed font-medium">
					You do not have the required financial permissions to view employee
					commission statements or historical ledger data.
				</p>
			</div>
		)
	}

	const queryClient = getQueryClient()
	const staleTime = 1000 * 60 * 5 // 5 minutes

	// ── 3. TRIPLE-SERVER PREFETCH (N+1 Proof Caching) ─────────────────────
	// Run all queries in parallel, assigning a staleTime so the client
	// doesn't immediately refetch upon hydration.
	await Promise.all([
		queryClient.prefetchQuery({
			queryKey: ['staff-payroll-vitals', staffId],
			queryFn: async () => {
				const res = await getStaffPayrollVitalsAction({ staffId })
				return res?.data ?? null
			},
			staleTime,
		}),
		queryClient.prefetchQuery({
			queryKey: ['pending-commissions', staffId],
			queryFn: async () => {
				const res = await getPendingCommissionsAction({ staffId })
				return res?.data ?? null
			},
			staleTime,
		}),
		// Added the missing prefetch for the historical ledger table!
		queryClient.prefetchQuery({
			queryKey: ['staff-payout-history', staffId],
			queryFn: async () => {
				const res = await getStaffPayoutHistoryAction({ staffId })
				return res?.data ?? { payouts: [], totalCount: 0 }
			},
			staleTime: 1000 * 60 * 5,
		}),
	])

	return (
		<div className="flex flex-col gap-6 animate-in fade-in duration-500">
			{/* --- SUB-HEADER --- */}
			<div className="flex items-center gap-3 mb-4 px-1">
				<div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 shadow-sm shadow-emerald-500/10">
					<Wallet className="w-5 h-5" />
				</div>
				<div>
					<h2 className="text-lg font-bold tracking-tight text-foreground">
						Payroll Ledger
					</h2>
					<p className="text-xs text-muted-foreground mt-0.5 font-medium">
						Reconcile pending case commissions and track historical payouts.
					</p>
				</div>
			</div>

			{/* ── HYDRATION BOUNDARY ────────────────────────────────────────── */}
			<QueryHydrationBoundary state={dehydrate(queryClient)}>
				{/* 
                    Note: Suspense only fires if the client component uses `useSuspenseQuery`.
                    Otherwise, it acts as a visual placeholder during initial stream.
                */}
				<Suspense fallback={<StaffPayrollTabSkeleton />}>
					<StaffPayrollTabContent staffId={staffId} />
				</Suspense>
			</QueryHydrationBoundary>
		</div>
	)
}

// --- SUB-COMPONENT: SKELETON LOADER ---
function StaffPayrollTabSkeleton() {
	return (
		<div className="space-y-6 animate-pulse">
			{/* Vitals Cards Skeletons (Emerald Tinted for Financial Psychology) */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Skeleton className="h-32 rounded-3xl bg-emerald-500/5 dark:bg-emerald-500/2" />
				<Skeleton className="h-32 rounded-3xl bg-emerald-500/5 dark:bg-emerald-500/2" />
				<Skeleton className="h-32 rounded-3xl bg-emerald-500/5 dark:bg-emerald-500/2" />
			</div>

			{/* Table Header / Toolbar Skeleton */}
			<Skeleton className="h-16 w-full rounded-2xl bg-slate-50 dark:bg-white/2 border border-border mt-4" />

			{/* Table Rows Skeleton */}
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
