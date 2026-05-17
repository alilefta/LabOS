import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/get-session";
import CasesClientWrapperPage from "@/components/cases/cases-client-wrapper-page";
import { getCurrentLabUserRoleByAuthUserId } from "@/data/lab";
import { GetCasesListResult } from "@/schema/composed/case.details";
import { getCasesListAction } from "@/actions/cases/get-cases";
import { DEFAULT_CASES_FILTERS } from "@/schema/composed/cases/cases-filters";
import { getQueryClient } from "@/providers/get-query-client";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { dehydrate } from "@tanstack/react-query";
import { QueryHydrationBoundary } from "@/providers/query-hydration-boundary";

export default async function CasesPage() {
	const session = await getServerSession();
	if (!session) redirect("/sign-in");

	const user = await getCurrentLabUserRoleByAuthUserId();
	if (!user) redirect("/onboarding");

	const queryClient = getQueryClient();

	await queryClient.prefetchInfiniteQuery({
		queryKey: ["cases-list", user.labId, "", DEFAULT_CASES_FILTERS],
		queryFn: async ({ pageParam }: { pageParam: string | undefined }): Promise<GetCasesListResult> => {
			const res = await getCasesListAction({
				cursor: pageParam as string | undefined,
				search: "",
				filters: DEFAULT_CASES_FILTERS,
				take: 30,
			});
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}
			return res?.data ?? { cases: [], nextCursor: null, totalCount: 0 };
		},
		initialPageParam: undefined as string | undefined,
	});

	return (
		<QueryHydrationBoundary state={dehydrate(queryClient)}>
			<CasesClientWrapperPage labId={user.labId} />
		</QueryHydrationBoundary>
	);
}
