// app/(main)/team/[staffId]/page.tsx

import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { Metadata } from "next";
import z from "zod";

// Schemas & Helpers
import { LabStaffDetailsUI } from "@/schema/composed/lab-staff.details";
import { TeamDashboardTabsSchema, TeamDashboardTimeFramePeriodSchema } from "@/schema/composed/team/helpers";
import { TeamHeaderSectionSkeleton } from "@/components/team/staff-details/navigation-shell/team-header-section-skeleton";
import { TeamHeaderSection } from "@/components/team/staff-details/navigation-shell/team-header-section";
import { getStaffMetadata } from "@/data/team/get-staff-dossier";
import { TeamTabNavigation } from "@/components/team/staff-details/navigation-shell/team-tab-navigation";
import { TeamTabRouter } from "@/components/team/staff-details/navigation-router/team-tabs-router";
import { requireTenantContext } from "@/platform/organizations";
import { createLabOSAuthorizationActor } from "@/modules/labos-authorization/actor";
import { labosAuthorizationService } from "@/modules/labos-authorization/service";

// --- PLACEHOLDERS FOR FUTURE COMPONENTS (PHASE 1) ---
// These will be imported and built in subsequent steps!
/*
import { TeamTerminalShell } from "@/components/team/team-details/navigation-shell/team-terminal-shell";
import { TeamHeaderSection } from "@/components/team/team-details/navigation-shell/team-header-section";
import { TeamTabNavigation } from "@/components/team/team-details/navigation-shell/team-tab-navigation";
import { TeamTabRouter } from "@/components/team/team-details/team-tab-router";
import { TeamDetailsSkeleton } from "@/components/team/team-details/team-details-skeleton";
import { TeamHeaderSectionSkeleton } from "@/components/team/team-details/navigation-shell/team-header-section-skeleton";
*/

interface PageProps {
	params: Promise<{ staffId: string }>;
	searchParams: Promise<{ tab?: string; period?: string }>;
}

// ── 1. DYNAMIC METADATA GENERATION ──────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { staffId } = await params;

	// Security: Validate UUID before querying DB to prevent SQL injection
	const isUuid = z.uuid().safeParse(staffId).success;
	if (!isUuid) return { title: "Invalid Staff ID | LabOS" };

	const results = await getStaffMetadata(staffId);
	if (!results.success) return { title: "Team Member Not Found | LabOS" };

	const staff = results.data as LabStaffDetailsUI;

	return {
		title: `${staff.firstName} ${staff.lastName} • Dossier | LabOS`,
	};
}

// ── 2. THE SERVER PAGE VIEWPORT ─────────────────────────────────────────────
export default async function StaffDossierPage({ params, searchParams }: PageProps) {
	const { staffId } = await params;
	const { period, tab } = await searchParams;

	// Validate the ID is a safe UUID
	const parsedId = z.string().uuid().safeParse(staffId);

	if (!parsedId.success) {
		// Escape hatch: If the router matches an onboard trigger, redirect to the directory action [2]
		if (staffId === "new-member" || staffId === "new") {
			redirect("/team?action=register");
		}
		notFound();
	}

	const tenant = await requireTenantContext();
	const dossierDecision = await labosAuthorizationService.can({
		actor: createLabOSAuthorizationActor(tenant),
		permission: "staff.read",
		target: { type: "staff", id: parsedId.data },
	});

	if (!dossierDecision.allowed) {
		redirect("/team");
	}

	// Safely validate and fallback search parameters [1]
	const parsedTabTitle = TeamDashboardTabsSchema.safeParse(tab);
	const activeTab = parsedTabTitle.success ? parsedTabTitle.data : "overview";

	const parsedPeriod = TeamDashboardTimeFramePeriodSchema.safeParse(period);
	const activePeriod = parsedPeriod.success ? parsedPeriod.data : "90d";

	return (
		// The custom Terminal Shell will apply the "Ambient Role Glow" on the client-side [s1]
		// <TeamTerminalShell staffId={staffId} activeTab={activeTab}>
		<div className="flex flex-col h-full bg-background relative overflow-hidden">
			<div className="relative z-10 flex flex-col h-full">
				{/* --- STICKY HEADER & TABS --- */}
				{/* Locked to the exact same top-blur and grid gap as Clinics & Cases */}
				<div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border pt-6 flex flex-col gap-4 shadow-sm">
					<Suspense fallback={<TeamHeaderSectionSkeleton />}>
						<TeamHeaderSection staffId={staffId} />
					</Suspense>

					{/* Placeholder: Tab Navigation */}
					<Suspense fallback={<p className="text-xs text-muted-foreground pl-14">Loading Navigation...</p>}>
						<TeamTabNavigation activeTab={activeTab} staffId={staffId} />
					</Suspense>
				</div>

				{/* --- DYNAMIC TAB CONTENT AREA (SCROLLABLE) --- */}
				{/* Takes flex-1 and overflow-y-auto to allow individual tab content to scroll */}
				<div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 w-full">
					<div className="w-full max-w-500 mx-auto p-4 sm:p-6 lg:p-8">
						<Suspense>
							<TeamTabRouter activePeriod={activePeriod} activeTab={activeTab} staffId={staffId} />
						</Suspense>
						{/* <div className="h-96 border-2 border-dashed border-border rounded-4xl flex items-center justify-center bg-slate-50/50 dark:bg-white/[0.01]">
							<p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
								{activeTab.toUpperCase()} Tab Router Workspace ({activePeriod})
							</p>
						</div> */}
					</div>
				</div>
			</div>
		</div>
		// </TeamTerminalShell>
	);
}
