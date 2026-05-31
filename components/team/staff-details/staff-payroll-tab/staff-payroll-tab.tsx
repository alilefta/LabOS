// components/team/team-details/payroll-tab/staff-payroll-tab.tsx

import { redirect } from "next/navigation";
import { Suspense } from "react";
import { dehydrate } from "@tanstack/react-query";
import { Wallet, ShieldAlert, DollarSign } from "lucide-react";

// Actions & Data Fetchers

import { getQueryClient } from "@/providers/get-query-client";
import { getServerSession } from "@/lib/get-session";

// UI & Shared Components
import { QueryHydrationBoundary } from "@/providers/query-hydration-boundary";
import { Skeleton } from "@/components/ui/skeleton";
import { getStaffPayrollVitalsAction } from "@/actions/team/finanical-ledger/get-staff-payroll-vitals-action";
import { getPendingCommissionsAction } from "@/actions/team/finanical-ledger/get-pending-comission-action";
import { getCurrentLabUserRoleByAuthUserId } from "@/data/lab";
import { StaffPayrollTabContent } from "./staff-payroll-tab-content/staff-payroll-tab-content";

// --- PLACEHOLDERS FOR CLIENT SIDE (Sprints 2, 3, & 4) ---
/*
import { StaffPayrollTabContent } from "./staff-payroll-tab-content";
import { StaffPayrollTabSkeleton } from "./staff-payroll-tab-skeleton";
*/

interface Props {
	staffId: string;
}

export async function StaffPayrollTab({ staffId }: Props) {
	// ── 1. STRICT FINANCIAL SECURITY GUARD ───────────────────────────────
	// Even though the router checks permissions, we verify here as well.
	// This prevents a standard technician from hacking the client-side tabs to view payroll.
	const session = await getServerSession();
	if (!session) redirect("/sign-in");

	const labUser = await getCurrentLabUserRoleByAuthUserId();
	if (!labUser) redirect("/onboarding");

	const userRole = labUser.role; // e.g. "OWNER" | "MANAGER" | "STAFF"
	const canViewPayroll = userRole === "OWNER" || userRole === "MANAGER";

	if (!canViewPayroll) {
		return (
			<div className="w-full h-80 rounded-4xl border-2 border-dashed border-destructive/20 bg-destructive/5 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
				<div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive mb-4 shadow-[0_0_15px_rgba(239,68,68,0.2)] animate-pulse">
					<ShieldAlert className="w-6 h-6" />
				</div>
				<h3 className="text-sm font-bold text-destructive uppercase tracking-widest">Unauthorized Access</h3>
				<p className="text-xs text-destructive/85 max-w-sm mt-1 leading-relaxed">You do not have the required financial permissions to view employee payroll files or commission statements.</p>
			</div>
		);
	}

	const queryClient = getQueryClient();

	// ── 2. DUAL-SERVER PREFETCH (N+1 Proof Caching) ─────────────────────
	// We run these in parallel to prime the cache before hydration [2]
	await Promise.all([
		queryClient.prefetchQuery({
			queryKey: ["staff-payroll-vitals", staffId],
			queryFn: async () => {
				const res = await getStaffPayrollVitalsAction({ staffId });
				return res?.data ?? null;
			},
		}),
		queryClient.prefetchQuery({
			queryKey: ["pending-commissions", staffId],
			queryFn: async () => {
				const res = await getPendingCommissionsAction({ staffId });
				return res?.data ?? null;
			},
		}),
	]);

	return (
		<div className="flex flex-col gap-6 animate-in fade-in duration-500">
			{/* --- SUB-HEADER --- */}
			<div className="flex items-center gap-3 mb-4 px-1">
				<div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 shadow-sm">
					<Wallet className="w-4 h-4" />
				</div>
				<div>
					<h2 className="text-lg font-bold tracking-tight text-foreground">Payroll Ledger</h2>
					<p className="text-xs text-muted-foreground mt-0.5">Manage employee base salary, commission payouts, and payout history.</p>
				</div>
			</div>

			{/* ── HYDRATION BOUNDARY ────────────────────────────────────────── */}
			{/* The client-side useQuery hooks will find this pre-loaded data in 0ms [2] */}
			<QueryHydrationBoundary state={dehydrate(queryClient)}>
				<Suspense fallback={<StaffPayrollTabSkeleton />}>
					<StaffPayrollTabContent staffId={staffId} />
				</Suspense>
			</QueryHydrationBoundary>
		</div>
	);
}

// --- SUB-COMPONENT: SKELETON LOADER ---
function StaffPayrollTabSkeleton() {
	return (
		<div className="space-y-6 animate-pulse">
			{/* Vitals Cards Skeletons */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Skeleton className="h-32 rounded-3xl bg-slate-100 dark:bg-white/5" />
				<Skeleton className="h-32 rounded-3xl bg-slate-100 dark:bg-white/5" />
				<Skeleton className="h-32 rounded-3xl bg-slate-100 dark:bg-white/5" />
			</div>

			{/* Table Header / Toolbar Skeleton */}
			<Skeleton className="h-18 w-full rounded-2xl bg-slate-100 dark:bg-white/5" />

			{/* Table Rows Skeleton */}
			<div className="space-y-3">
				{Array.from({ length: 4 }).map((_, i) => (
					<Skeleton key={i} className="h-16 w-full rounded-2xl bg-slate-100 dark:bg-white/5" />
				))}
			</div>
		</div>
	);
}
