import { Suspense } from "react";
import Link from "next/link";
import { Users2, FileDown, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TeamClientWrapper } from "@/components/team/team-page/team-client-wrapper";
import { getQueryClient } from "@/providers/get-query-client";
import { getStaffVitalsAction } from "@/actions/team/get-staff-vitals-action";
import { dehydrate } from "@tanstack/react-query";
import { QueryHydrationBoundary } from "@/providers/query-hydration-boundary";
import { AmbientBgGlow } from "@/components/ui/ui-utils/animated-ambient-bg-glow";
import { DEFAULT_TEAM_FILTERS } from "@/schema/composed/team/team-filters";
import { getStaffRosterAction } from "@/actions/team/get-staff-roster-action";
import { requireTenantContext } from "@/platform/organizations/tenant-context";

interface Props {
	searchParams: Promise<{ action?: string }>;
}

export const metadata = {
	title: "Production Team | LabOS",
	description: "Monitor workforce capacity, track quality, and manage roles.",
};

export default async function TeamPage({ searchParams }: Props) {
	// Parse the search param to determine if the sheet should be open on load
	const { action } = await searchParams;

	const { labId } = await requireTenantContext();

	const queryClient = getQueryClient();

	// Prefetch the vital statistics for instant client rendering
	await queryClient.prefetchQuery({
		queryKey: ["staff-vitals", labId],
		queryFn: async () => {
			const res = await getStaffVitalsAction();
			return res?.data ?? null;
		},
		staleTime: 1000 * 60 * 5,
	});

	await queryClient.prefetchQuery({
		queryKey: ["staff-roster", labId, "", DEFAULT_TEAM_FILTERS],
		queryFn: async () => {
			const res = await getStaffRosterAction({
				searchQuery: "",
				filters: DEFAULT_TEAM_FILTERS,
			});
			return res?.data ?? { staff: [], totalCount: 0 };
		},
		staleTime: 1000 * 60 * 5, // Cache for 5 mins
	});

	return (
		<div className="flex flex-col h-full animate-in fade-in duration-700 bg-background relative">
			{/* ── ZONE A: STICKY COMMAND HEADER ─────────────────────────────── */}
			<header className="shrink-0 sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border transition-all duration-300">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 px-4 sm:px-6 lg:px-8 max-w-[2000px] mx-auto w-full">
					{/* Left: Title & Subtext */}
					<div className="flex items-start gap-4">
						<div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20 shrink-0 mt-0.5">
							<Users2 className="w-5 h-5" />
						</div>
						<div className="flex flex-col min-w-0">
							<h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground line-clamp-1">Production Team</h1>
							<p className="text-xs sm:text-sm text-muted-foreground mt-0.5 font-medium line-clamp-1">Monitor workforce capacity, balance workloads, and audit quality.</p>
						</div>
					</div>

					{/* Right: Actions */}
					<div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto mt-1 md:mt-0 justify-end">
						<Button variant="outline" className="h-10 rounded-xl border-border bg-white dark:bg-white/5 text-xs font-bold transition-all shadow-sm flex-1 md:flex-none">
							<FileDown className="w-4 h-4 sm:mr-2 text-muted-foreground" />
							<span className="hidden sm:inline">Export Roster</span>
						</Button>

						{/* 
							URL-DRIVEN STATE: 
							Clicking this button pushes ?action=register to the URL.
							The Client Wrapper will listen for this and open the sheet.
                            Uses scroll={false} to prevent the page from jumping to the top when clicked!
						*/}
						<Link href="?action=register" scroll={false} className="flex-1 md:flex-none">
							<Button className="w-full h-10 rounded-xl shadow-premium bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs px-5 transition-all">
								<Plus className="w-4 h-4 sm:mr-1.5" />
								<span className="hidden sm:inline">Onboard Staff</span>
							</Button>
						</Link>
					</div>
				</div>
			</header>

			{/* ── SCROLLABLE WORKSPACE ───────────────────────────────────────── */}
			<div className="flex-1 min-h-0 relative z-10 w-full">
				<AmbientBgGlow variant="primary" /> {/* Primary Blue signifies HR/Ops */}
				<div className="h-full overflow-y-auto custom-scrollbar pt-6 lg:pt-8 pb-32">
					<div className="max-w-500 mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
						{/* 
                            HYDRATION BOUNDARY:
                            This passes the prefetched "staff-vitals" cache to the client 
                            so useQuery doesn't fire a redundant network request on mount.
                        */}
						<QueryHydrationBoundary state={dehydrate(queryClient)}>
							<Suspense fallback={<TeamRosterSkeleton />}>
								<TeamClientWrapper initialAction={action} />
							</Suspense>
						</QueryHydrationBoundary>
					</div>
				</div>
			</div>
		</div>
	);
}

// --- SUB-COMPONENT: SKELETON LOADER ---
function TeamRosterSkeleton() {
	return (
		<div className="space-y-6">
			{/* Vitals Strip Skeleton */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Skeleton className="h-32 rounded-3xl bg-slate-100 dark:bg-white/5" />
				<Skeleton className="h-32 rounded-3xl bg-slate-100 dark:bg-white/5" />
				<Skeleton className="h-32 rounded-3xl bg-slate-100 dark:bg-white/5" />
			</div>

			{/* Toolbar Skeleton */}
			<Skeleton className="h-18 w-full rounded-2xl bg-slate-100 dark:bg-white/5" />

			{/* Grid Cards Skeletons */}
			<div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
				{Array.from({ length: 8 }).map((_, i) => (
					<Skeleton key={i} className="h-90 rounded-3xl bg-slate-100 dark:bg-white/5" />
				))}
			</div>
		</div>
	);
}
