import { getClinicSelectiveFieldById } from "@/data/clinics/get-clinic";
import { ClinicOverviewTabContent } from "./clinic-overview-tab-content";
import { TimeFrameFilter } from "./time-frame-filter";
import { ClinicDashboardTimeFramePeriod } from "@/schema/composed/clinics/helpers";
import { ClinicBase } from "@/schema/base/clinic.base";
import { getClinicOverviewAnalyticsAction } from "@/actions/clinics/analytics";
import { dehydrate } from "@tanstack/react-query";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { QueryHydrationBoundary } from "@/providers/query-hydration-boundary";
import { getQueryClient } from "@/providers/get-query-client";
import { Suspense } from "react";
import { ClinicOverviewTabSkeleton } from "./clinic-overview-tab-skeleton";
interface Props {
	clinicId: string;
	activePeriod: ClinicDashboardTimeFramePeriod;
}
export async function ClinicOverviewTab({ clinicId, activePeriod }: Props) {
	const results = await getClinicSelectiveFieldById(clinicId, { id: true, name: true, creditLimit: true, currentBalance: true, discount: true });
	const queryClient = getQueryClient();

	if (!results.success) return null;
	const { id, name, creditLimit, currentBalance, discount } = results.data as ClinicBase;

	// const analyticsData = await getClinicOverviewAnalyticsAction({ clinicId, period: activePeriod });
	// Prefetch on server — populates the cache before client mounts

	// the reason why we used the prefetch query is we should always fetch data on the server then pass to the client component.
	// Reson?: because the javascript bundle will be massive for client fetching rather than already rendered and hydrated components on the client.

	// Wait, sometimes we have to useQuery on the client! Yes, we have to prefetch data first before using useQuery or useInfiniteQuery for better performance,
	// so it only fetch after interaction or after cache times out.
	await queryClient.prefetchQuery({
		queryKey: ["clinic-overview", clinicId, activePeriod],
		queryFn: async () => {
			const res = await getClinicOverviewAnalyticsAction({ clinicId, period: activePeriod });

			if (res?.serverError || res?.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
				return null;
			}
			return res?.data ?? null;
		},
	});
	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between mb-2">
				<h2 className="text-lg font-bold tracking-tight text-foreground">Business Intelligence</h2>
				<TimeFrameFilter clinicId={id} activePeriod={activePeriod} />
			</div>
			<QueryHydrationBoundary state={dehydrate(queryClient)}>
				<Suspense fallback={<ClinicOverviewTabSkeleton />}>
					<ClinicOverviewTabContent clinicId={id} clinicName={name} period={activePeriod} creditLimit={creditLimit} currentBalance={currentBalance} discount={discount} />
				</Suspense>
			</QueryHydrationBoundary>
		</div>
	);
}
