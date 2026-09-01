import { ClinicsClientWrapper } from "@/components/clinics/clinics-list/clinics-client-wrapper-page";
import { getQueryClient } from "@/providers/get-query-client";
import { ClinicPulseStats, DEFAULT_CLINICS_FILTERS, GetClinicsListResult } from "@/schema/composed/clinic.details";
import { getClinicsListAction, getClinicsPulseAction, getClinicsRevenueAction } from "@/actions/clinics/get-clinics";
import { QueryHydrationBoundary } from "@/providers/query-hydration-boundary";
import { dehydrate } from "@tanstack/react-query";
import { requireTenantContext } from "@/platform/organizations/tenant-context";
import { createLabOSAuthorizationActor } from "@/modules/labos-authorization/actor";
import { labosAuthorizationService } from "@/modules/labos-authorization/service";

export default async function ClinicsListPage() {
	const tenant = await requireTenantContext();
	const { labId } = tenant;
	const revenueDecision = await labosAuthorizationService.can({
		actor: createLabOSAuthorizationActor(tenant),
		permission: "clinic.financials.list",
	});

	const queryClient = getQueryClient();

	await queryClient.prefetchInfiniteQuery({
		queryKey: ["clinics-list", labId, "", DEFAULT_CLINICS_FILTERS],
		queryFn: async ({ pageParam }: { pageParam: string | undefined }): Promise<GetClinicsListResult> => {
			const res = await getClinicsListAction({
				cursor: pageParam as string | undefined,
				search: "",
				filters: DEFAULT_CLINICS_FILTERS,
				take: 30,
			});

			return res?.data ?? { clinics: [], nextCursor: null, totalCount: 0 };
		},
		initialPageParam: undefined as string | undefined,
	});

	if (revenueDecision.allowed) {
		await queryClient.prefetchQuery({
			queryKey: ["clinics-revenue", labId],
			queryFn: async () => {
				const res = await getClinicsRevenueAction();
				return res?.data ?? null;
			},
			staleTime: 60_000,
		});
	}

	await queryClient.prefetchQuery({
		queryKey: ["clinics-pulse"],
		queryFn: async () => {
			const res = await getClinicsPulseAction();
			return (res?.data as ClinicPulseStats) || { all: 0, credit_risk: 0, uninvoiced: 0, suspended: 0, dormant: 0 };
		},
	});

	return (
		<QueryHydrationBoundary state={dehydrate(queryClient)}>
			<ClinicsClientWrapper labId={labId} />
		</QueryHydrationBoundary>
	);
}
