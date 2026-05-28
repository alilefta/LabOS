// app/(main)/team/page.tsx

import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Users2, FileDown, Plus } from "lucide-react";

import { getCurrentLabUserRoleByAuthUserId } from "@/data/lab";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TeamClientWrapper } from "@/components/team/team-page/team-client-wrapper";
import { AmbientBgGlow } from "@/components/ui/ui-utils/animated-ambient-bg-glow";
import { getQueryClient } from "@/providers/get-query-client";
import { getStaffVitalsAction } from "@/actions/team/get-staff-vitals-action";

interface Props {
	searchParams: Promise<{ action?: string }>;
}

export const metadata = {
	title: "Production Team | LabOS",
	description: "Monitor workforce capacity, track quality, and manage roles.",
};

export default async function TeamPage({ searchParams }: Props) {
	const { action } = await searchParams;
	const user = await getCurrentLabUserRoleByAuthUserId();
	if (!user) redirect("/onboarding");

	const queryClient = getQueryClient();
	await queryClient.prefetchQuery({
		queryKey: ["staff-vitals", user.labId],
		queryFn: async () => {
			const res = await getStaffVitalsAction();
			return res?.data ?? null;
		},
		staleTime: 1000 * 60 * 5,
	});

	return (
		<div className="flex flex-col h-full animate-in fade-in duration-700 bg-background relative">
			{/* ── ZONE A: STICKY COMMAND HEADER ─────────────────────────────── */}
			{/* Locked to the exact same vertical grid lines and height as Cases and Clinics */}
			<header className="shrink-0 sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 px-4 sm:px-6 lg:px-8 max-w-[2000px] mx-auto w-full">
					{/* Left: Title & Subtext */}
					<div>
						<h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
							<Users2 className="w-6 h-6 text-primary opacity-80" />
							Production Team
						</h1>
						<p className="text-xs sm:text-sm text-muted-foreground mt-0.5 font-medium">Monitor workforce capacity, balance daily active workloads, and audit technician quality.</p>
					</div>

					{/* Right: Actions */}
					<div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto mt-1 md:mt-0 justify-end">
						<Button variant="outline" className="h-10 rounded-xl border-border bg-white dark:bg-white/5 text-xs font-bold transition-all shadow-sm flex-1 sm:flex-none">
							<FileDown className="w-4 h-4 mr-2 text-muted-foreground" />
							Export Roster
						</Button>

						{/* 
							This button will trigger the RegisterStaffSheet via 
							our useClinicalCreationStore or custom state inside the Client Wrapper
						*/}
						<Button className="h-10 rounded-xl shadow-premium bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs px-5 flex-1 sm:flex-none">
							<Plus className="w-4 h-4 mr-1.5" /> Onboard Staff
						</Button>
					</div>
				</div>
			</header>

			{/* ── SCROLLABLE WORKSPACE ───────────────────────────────────────── */}
			<div className="flex-1 min-h-0 relative z-10 w-full">
				<AmbientBgGlow variant="primary" /> {/* Primary Blue signifies HR/Ops */}
				{/* 
					Independent Scroll Container
					Negative margins pull scrollbar to edge, matching Clinics and Cases!
				*/}
				<div className="h-full overflow-y-auto custom-scrollbar pt-6 lg:pt-8 pb-32">
					<div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
						{/* 
							--- THE TEAM CLIENT WRAPPER ---
							Wrapped in Suspense to ensure the Layout (Sidebar & Header) 
							remains interactive while the initial Query loads.
						*/}
						<Suspense fallback={<TeamRosterSkeleton />}>
							<TeamClientWrapper initialAction={action} />
						</Suspense>
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
			<Skeleton className="h-16 w-full rounded-2xl bg-slate-100 dark:bg-white/5" />

			{/* Grid Cards Skeletons */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{Array.from({ length: 8 }).map((_, i) => (
					<Skeleton key={i} className="h-72 rounded-2xl bg-slate-100 dark:bg-white/5" />
				))}
			</div>
		</div>
	);
}
