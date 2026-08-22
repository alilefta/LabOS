import CasesClientWrapperPage from "@/components/cases/cases-client-wrapper-page";
import { GetCasesListResult } from "@/schema/composed/case.details";
import { getCasesListAction, getCasesPulseAction, getCasesRevenueAction } from "@/actions/cases/get-cases";
import { DEFAULT_CASES_FILTERS } from "@/schema/composed/cases/cases-filters";
import { getQueryClient } from "@/providers/get-query-client";
import { dehydrate } from "@tanstack/react-query";
import { QueryHydrationBoundary } from "@/providers/query-hydration-boundary";
import { requireTenantContext } from "@/platform/organizations/tenant-context";

export default async function CasesPage() {
	const { labId } = await requireTenantContext();

	const queryClient = getQueryClient();

	await queryClient.prefetchInfiniteQuery({
		queryKey: ["cases-list", labId, "", DEFAULT_CASES_FILTERS],
		queryFn: async ({ pageParam }: { pageParam: string | undefined }): Promise<GetCasesListResult> => {
			const res = await getCasesListAction({
				cursor: pageParam as string | undefined,
				search: "",
				filters: DEFAULT_CASES_FILTERS,
				take: 30,
			});
			return res?.data ?? { cases: [], nextCursor: null, totalCount: 0 };
		},
		initialPageParam: undefined as string | undefined,
	});

	await queryClient.prefetchQuery({
		queryKey: ["cases-revenue", labId],
		queryFn: async () => {
			const res = await getCasesRevenueAction();
			return res?.data ?? null;
		},
		staleTime: 60_000,
	});

	await queryClient.prefetchQuery({
		queryKey: ["cases-pulse", labId],
		queryFn: async () => {
			const res = await getCasesPulseAction();
			return res?.data ?? null;
		},
		staleTime: 30_000,
	});

	return (
		<QueryHydrationBoundary state={dehydrate(queryClient)}>
			<CasesClientWrapperPage labId={labId} />
		</QueryHydrationBoundary>
	);
}
