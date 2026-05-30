// components/team/team-details/overview-tab/staff-overview-tab-content.tsx

"use client";

import { useQuery } from "@tanstack/react-query";
import { ServerCrash, RefreshCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Schemas & Actions (Conceptual)
import { TeamDashboardTimeFramePeriod } from "@/schema/composed/team/helpers";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { StaffHealthRing } from "./staff-health-ring";
import { StaffSpecialtyDonut } from "./staff-speciality-donut";
import { usePermissions } from "@/providers/permissions-provider";
import { StaffPerformanceVitalsCard } from "./staff-performance-vitals-card";
import { StaffProductionHeatmap } from "./staff-production-heatmap";
import { getStaffOverviewAnalyticsAction } from "@/actions/team/get-staff-overview-analytics-action";
import { StaffAiOverviewAuditor } from "./staff-ai-overview-auditor";

interface Props {
	staffId: string;
	period: TeamDashboardTimeFramePeriod;
}

export function StaffOverviewTabContent({ staffId, period }: Props) {
	const { canViewFinancials } = usePermissions();
	// ── 1. THE DATA ENGINE ─────────────────────────────────────────────
	// Independent query scoped to the active tab's timeframe
	const { data, isLoading, isError, refetch, isRefetching } = useQuery({
		queryKey: ["staff-overview-analytics", staffId, period],
		queryFn: async () => {
			const res = await getStaffOverviewAnalyticsAction({ staffId, period });
			if (res?.serverError || res?.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
				throw new Error("Failed to fetch staff analytics");
			}
			return res?.data ?? null;
		},
		staleTime: 1000 * 60 * 5, // Cache for 5 mins
	});

	// ── 2. PERFORMANCE SKELETONS (CLS Protection) ──────────────────────
	if (isLoading) {
		return (
			<div className="flex flex-col gap-6 animate-in fade-in duration-500">
				{/* 3-Card Bento Top Row */}
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
					<Skeleton className="h-80 rounded-4xl bg-slate-100 dark:bg-white/5 border border-border" />
					<Skeleton className="h-80 rounded-4xl bg-slate-100 dark:bg-white/5 border border-border" />
					<Skeleton className="h-80 rounded-4xl bg-slate-100 dark:bg-white/5 border border-border" />
				</div>
				{/* Wide Heatmap */}
				<Skeleton className="h-[300px] w-full rounded-4xl bg-slate-100 dark:bg-white/5 border border-border" />
				{/* Wide AI Auditor */}
				<Skeleton className="h-[200px] w-full rounded-4xl bg-slate-100 dark:bg-white/5 border border-border" />
			</div>
		);
	}

	// ── 3. HIGH-END DISCONNECT ERROR FALLBACK ───────────────────────────
	if (isError || !data) {
		return (
			<div className="w-full min-h-[500px] flex flex-col items-center justify-center p-8 rounded-4xl border-2 border-dashed border-destructive/20 bg-destructive/5 animate-in fade-in zoom-in-95 duration-500">
				<div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive mb-6 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
					<ServerCrash className="w-8 h-8" />
				</div>
				<h3 className="text-xl font-bold text-foreground mb-2">Telemetry Disconnected</h3>
				<p className="text-sm text-muted-foreground text-center max-w-md mb-8 leading-relaxed">
					LabOS was unable to retrieve the performance logs for this technician. This is typically caused by a database timeout or a network sync failure.
				</p>
				<Button
					onClick={() => refetch()}
					disabled={isRefetching}
					className="rounded-xl h-11 px-8 font-bold bg-background border border-border text-foreground hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
				>
					{isRefetching ? (
						<>
							<Loader2 className="w-4 h-4 mr-2 animate-spin text-muted-foreground" /> Reconnecting...
						</>
					) : (
						<>
							<RefreshCcw className="w-4 h-4 mr-2 text-muted-foreground" /> Retry Connection
						</>
					)}
				</Button>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
			{/* ── ROW 1: THE 3 PILLARS BENTO GRID (33% each) ────────────────── */}
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				{/* Card 1: The Production Rings */}
				<StaffHealthRing scores={data.scores} />

				{/* Card 2: The Specialty Donut */}
				<StaffSpecialtyDonut data={data.specialtyMix} />

				{/* Card 3: Performance Vitals & Workload */}
				<StaffPerformanceVitalsCard
					activeCaseCount={data.vitals.activeCaseCount}
					burnoutRisk={data.vitals.burnoutRisk}
					commissionType={data.staff.commissionType}
					commissionValue={data.staff.commissionValue}
					canViewFinancials={canViewFinancials}
				/>
			</div>

			{/* ── ROW 2: THE 90-DAY PRODUCTION RHYTHM (Full Width) ──────────── */}
			<div className="w-full">
				<StaffProductionHeatmap heatmapData={data.heatmap} staffName={data.staff.firstName} />
			</div>

			{/* ── ROW 3: THE AI OVERVIEW AUDITOR (Full Width) ───────────────── */}
			<StaffAiOverviewAuditor staffName={data.staff.firstName} vitals={data.vitals} />
		</div>
	);
}
