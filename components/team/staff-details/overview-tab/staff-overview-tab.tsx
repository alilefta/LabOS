// components/team/team-details/overview-tab/staff-overview-tab.tsx
import { Suspense } from "react";
import { dehydrate } from "@tanstack/react-query";

// Schemas & Types
import { TeamDashboardTimeFramePeriod } from "@/schema/composed/team/helpers";

// Actions & Fetchers (Conceptual/Database Layer)
import { getQueryClient } from "@/providers/get-query-client";

// Shared Custom Components
import { QueryHydrationBoundary } from "@/providers/query-hydration-boundary";
import { StaffOverviewTabContent } from "./overview-tab-content/staff-overview-tab-content";
import { TimeFrameFilter } from "@/components/shared/filters/time-frame-filter";
import { getStaffOverviewAnalyticsAction } from "@/actions/team/get-staff-overview-analytics-action";
import { ShieldAlert } from "lucide-react";
import { requireTenantContext } from "@/platform/organizations";
import { createLabOSAuthorizationActor } from "@/modules/labos-authorization/actor";
import { labosAuthorizationService } from "@/modules/labos-authorization/service";

interface Props {
	staffId: string;
	activePeriod: TeamDashboardTimeFramePeriod;
}

export async function StaffOverviewTab({ staffId, activePeriod }: Props) {
	const tenant = await requireTenantContext();
	const decision = await labosAuthorizationService.can({
		actor: createLabOSAuthorizationActor(tenant),
		permission: "staff.analytics.read",
		target: { type: "staff", id: staffId },
	});

	if (!decision.allowed) {
		return (
			<div className="w-full h-80 rounded-4xl border-2 border-dashed border-destructive/20 bg-destructive/5 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
				<div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive mb-4">
					<ShieldAlert className="w-6 h-6" />
				</div>
				<h3 className="text-sm font-bold text-destructive uppercase tracking-widest">Private Performance Profile</h3>
				<p className="text-xs text-destructive/85 max-w-sm mt-1 leading-relaxed">
					Staff members can view their own detailed performance only. Team names and operational roster availability remain visible.
				</p>
			</div>
		);
	}

	const queryClient = getQueryClient();

	// 2. THE SERVER-PREFETCH:

	await queryClient.prefetchQuery({
		queryKey: ["staff-overview-analytics", staffId, activePeriod],
		queryFn: async () => {
			const res = await getStaffOverviewAnalyticsAction({ staffId, period: activePeriod });
			return res?.data ?? null;
		},
		staleTime: 1000 * 60 * 5, // Cache for 5 mins
	});

	return (
		<div className="flex flex-col gap-6 animate-in fade-in duration-500">
			{/* --- THE TAB SUB-HEADER --- */}
			<div className="flex items-center justify-between mb-4 px-1">
				<div>
					<h2 className="text-lg font-bold tracking-tight text-foreground">Performance Overview</h2>
					<p className="text-xs text-muted-foreground mt-0.5">Workplace throughput and quality audit logs.</p>
				</div>

				{/* 3. REUSABLE FILTER: Dynamically updates '?period=X' on this exact URL path [3] */}
				<TimeFrameFilter activePeriod={activePeriod} />
			</div>

			{/* ── HYDRATION BOUNDARY ────────────────────────────────────────── */}
			{/* Keeps the client-side useQuery from ever throwing a loading spinner on mount [2] */}
			<QueryHydrationBoundary state={dehydrate(queryClient)}>
				<Suspense fallback={<p>Loading Overview</p>}>
					<StaffOverviewTabContent period={activePeriod} staffId={staffId} />
				</Suspense>
			</QueryHydrationBoundary>
		</div>
	);
}
