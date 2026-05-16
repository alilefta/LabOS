import dynamic from "next/dynamic";
import { dehydrate } from "@tanstack/react-query";
import { ClinicActiveCasesKanbanSkeleton } from "./clinic-active-cases-kanban-wrapper-skeleton";
import { ClinicHistoricalDataTableSkeleton } from "./clinic-historical-data-table-skeleton";
import { getClinicActivePipelineAction, getClinicHistoricalCasesAction } from "@/actions/clinics/get-clinic";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { DEFAULT_CASES_FILTERS } from "@/schema/composed/cases/cases-filters";
import { GetClinicHistoricalCasesResult } from "@/schema/composed/clinics/clinic-cases.dtos";
import { QueryHydrationBoundary } from "@/providers/query-hydration-boundary";
import { getQueryClient } from "@/providers/get-query-client";

const ClinicActiveCasesKanbanWrapper = dynamic(() => import("./clinic-active-cases-kanban-wrapper").then((m) => m.ClinicActiveCasesKanbanWrapper), {
	loading: () => <ClinicActiveCasesKanbanSkeleton />,
});

const ClinicHistoricalDataTable = dynamic(() => import("./clinic-historical-data-table").then((m) => m.ClinicHistoricalDataTable), {
	loading: () => <ClinicHistoricalDataTableSkeleton />,
});

export async function ClinicPipelineTab({ clinicId }: { clinicId: string }) {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery({
		queryKey: ["clinic-active-pipeline", clinicId],
		queryFn: async () => {
			const res = await getClinicActivePipelineAction({ clinicId });
			if (res?.serverError || res?.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
				return null;
			}
			return res?.data ?? null;
		},
	});

	await queryClient.prefetchInfiniteQuery({
		queryKey: ["clinic-history", clinicId, "", DEFAULT_CASES_FILTERS],
		queryFn: async ({ pageParam }): Promise<GetClinicHistoricalCasesResult> => {
			const res = await getClinicHistoricalCasesAction({
				clinicId,
				cursor: pageParam as string | undefined,
				search: "",
				filters: DEFAULT_CASES_FILTERS,
				take: 20,
			});

			if (res.serverError || res.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}
			return res?.data ?? { cases: [], nextCursor: null, totalCount: 0 };
		},
		initialPageParam: undefined as string | undefined,
	});

	return (
		<div className="flex flex-col gap-6 w-full h-full min-h-0">
			<QueryHydrationBoundary state={dehydrate(queryClient)}>
				<ClinicActiveCasesKanbanWrapper clinicId={clinicId} />
			</QueryHydrationBoundary>

			<QueryHydrationBoundary state={dehydrate(queryClient)}>
				<ClinicHistoricalDataTable clinicId={clinicId} />
			</QueryHydrationBoundary>
		</div>
	);
}
