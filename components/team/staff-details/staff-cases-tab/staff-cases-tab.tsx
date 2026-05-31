// components/team/team-details/cases-tab/staff-cases-tab.tsx

import { Suspense } from "react";
import { dehydrate } from "@tanstack/react-query";

// Schemas & Actions (Conceptual)
import { getQueryClient } from "@/providers/get-query-client";
import { QueryHydrationBoundary } from "@/providers/query-hydration-boundary";
import { StaffCasesTabSkeleton } from "./cases-pipeline-tab-content/staff-cases-tab-skeleton";
import { getActiveCasesByStaffAction } from "@/actions/team/get-active-cases";
import { StaffCasesTabContent } from "./cases-pipeline-tab-content/staff-cases-tab-content";
import { DEFAULT_CASES_FILTERS } from "@/schema/composed/cases/cases-filters";
import { GetStaffActiveCasesResult } from "@/schema/composed/team/staff-active-cases.dtos";
import { notFound } from "next/navigation";
import { getStaffCasesHeaderData } from "@/data/team/get-staff-cases-header-data";
import { getHistoricalCasesByStaffAction } from "@/actions/team/get-historical-cases-by-staff";
import { GetStaffHistoricalCasesResult } from "@/schema/composed/team/staff-historical-cases.dtos";

interface Props {
	staffId: string;
}

export async function StaffCasesTab({ staffId }: Props) {
	const results = await getStaffCasesHeaderData(staffId);

	if (!results.success) {
		notFound();
	}

	const staff = results.data;
	const staffName = `${staff.firstName} ${staff.lastName}`;

	const queryClient = getQueryClient();

	// 1. THE SERVER-PREFETCH:
	// We load only the active cases (ASSIGNED or PROCESSING) assigned to this human,
	// priming the TanStack Query cache before the client script even loads [1, 2].
	await queryClient.prefetchInfiniteQuery({
		queryKey: ["staff-active-cases", staffId, "", DEFAULT_CASES_FILTERS],
		queryFn: async ({ pageParam }): Promise<GetStaffActiveCasesResult> => {
			const res = await getActiveCasesByStaffAction({
				staffId,
				cursor: pageParam as string | undefined,
				search: "",
				filters: DEFAULT_CASES_FILTERS,
				take: 20,
			});

			return res?.data ?? { cases: [], nextCursor: null, totalCount: 0 };
		},
		initialPageParam: undefined as string | undefined,
		staleTime: 1000 * 30 * 5,
	});

	await queryClient.prefetchInfiniteQuery({
		queryKey: ["staff-historical-cases", staffId, "", DEFAULT_CASES_FILTERS],
		queryFn: async ({ pageParam }): Promise<GetStaffHistoricalCasesResult> => {
			const res = await getHistoricalCasesByStaffAction({
				staffId,
				cursor: pageParam as string | undefined,
				search: "",
				filters: DEFAULT_CASES_FILTERS,
				take: 20,
			});

			return res?.data ?? { cases: [], nextCursor: null, totalCount: 0 };
		},
		initialPageParam: undefined as string | undefined,
		staleTime: 1000 * 60 * 5,
	});

	return (
		<div className="flex flex-col animate-in fade-in duration-500">
			{/* ── HYDRATION BOUNDARY ────────────────────────────────────────── */}
			{/* Guarantees the client table has data instantly on mount, zero layout shift [2] */}
			<QueryHydrationBoundary state={dehydrate(queryClient)}>
				<Suspense fallback={<StaffCasesTabSkeleton />}>
					<StaffCasesTabContent staffId={staffId} originalStaffName={staffName} originalActiveCaseCount={staff.activeCaseCount} />{" "}
				</Suspense>
			</QueryHydrationBoundary>
		</div>
	);
}
