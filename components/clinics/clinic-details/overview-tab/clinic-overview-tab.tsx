import { getClinicSelectiveFieldById } from "@/data/clinics/get-clinic";
import { ClinicOverviewTabContent } from "./clinic-overview-tab-content";
import { TimeFrameFilter } from "./time-frame-filter";
import { ClinicDashboardTimeFramePeriod } from "@/schema/composed/clinics/helpers";
import { ClinicBase } from "@/schema/base/clinic.base";
import { getClinicOverviewAnalyticsAction } from "@/actions/clinics/analytics";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { QueryHydrationBoundary } from "@/providers/query-hydration-boundary";
interface Props {
	clinicId: string;
	activePeriod: ClinicDashboardTimeFramePeriod;
}
export async function ClinicOverviewTab({ clinicId, activePeriod }: Props) {
	const results = await getClinicSelectiveFieldById(clinicId, { id: true, name: true, creditLimit: true, currentBalance: true, discount: true });
	const queryClient = new QueryClient();

	if (!results.success) return null;
	const { id, name, creditLimit, currentBalance, discount } = results.data as ClinicBase;

	// const analyticsData = await getClinicOverviewAnalyticsAction({ clinicId, period: activePeriod });
	// Prefetch on server — populates the cache before client mounts
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
				<ClinicOverviewTabContent clinicId={id} clinicName={name} period={activePeriod} creditLimit={creditLimit} currentBalance={currentBalance} discount={discount} />
			</QueryHydrationBoundary>
		</div>
	);
}
