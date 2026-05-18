import { ClinicTerminalShell } from "@/components/clinics/clinic-details/navigation-shell/clinic-terminal-shell";
import { ClinicHeaderSection } from "@/components/clinics/clinic-details/navigation-shell/clinic-header-section";
import { ClinicTabNavigation } from "@/components/clinics/clinic-details/navigation-shell/clinic-tab-navigation";
import { Suspense } from "react";
import { ClinicDashboardTabsSchema, ClinicDashboardTimeFramePeriodSchema } from "@/schema/composed/clinics/helpers";
import { ClinicTabRouter } from "@/components/clinics/clinic-details/clinic-tab-router";
import { ClinicDetailsSkeleton } from "@/components/clinics/clinic-details/clinic-details-skeleton";
import { ClinicHeaderSectionSkeleton } from "@/components/clinics/clinic-details/navigation-shell/clinic-header-section-skeleton";
import { Metadata } from "next";
import { getClinicDetailsById } from "@/data/clinics/get-clinic";
import { ClinicBase } from "@/schema/base/clinic.base";
import z from "zod";
import { notFound, redirect } from "next/navigation";

interface PageProps {
	params: Promise<{ clinicId: string }>;
	searchParams: Promise<{ tab?: string; period?: string }>;
}

// Dynamically generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { clinicId } = await params;

	// 1. Zod Validation for Metadata
	const isUuid = z.uuid().safeParse(clinicId).success;
	if (!isUuid) return { title: "Invalid Clinic | LabOS" };

	const results = await getClinicDetailsById(clinicId);

	if (!results.success) return { title: `Clinic Not Found | LabOS` };

	const { name } = results.data as ClinicBase;

	return {
		title: `Clinic ${name} | LabOS`,
	};
}

export default async function ClinicDetailPage({ params, searchParams }: PageProps) {
	const { clinicId } = await params;
	const { period, tab } = await searchParams;

	const parsedId = z.uuid().safeParse(clinicId);

	if (!parsedId.success) {
		// If the router accidentally passed "new-clinic" to the dynamic route, gracefully catch and redirect it.
		if (clinicId === "new-clinic" || clinicId === "new") {
			redirect("/clinics/new-clinic");
		}
		// Otherwise, it's just garbage data (e.g., /clinics/123)
		notFound();
	}

	const parsedTabTitle = ClinicDashboardTabsSchema.safeParse(tab);
	const activeTab = parsedTabTitle.success ? parsedTabTitle.data : "overview";

	const parsedPeriod = ClinicDashboardTimeFramePeriodSchema.safeParse(period);
	const activePeriod = parsedPeriod.success ? parsedPeriod.data : "90d";

	return (
		<ClinicTerminalShell>
			{/* --- STICKY HEADER & TABS --- */}
			<div className="sticky top-0 z-30 bg-background/80  border-b border-border pt-6 flex flex-col gap-4 shadow-sm">
				<Suspense fallback={<ClinicHeaderSectionSkeleton />}>
					<ClinicHeaderSection clinicId={clinicId} />
				</Suspense>
				<Suspense fallback={<p>Loading Tab Nav</p>}>
					<ClinicTabNavigation activeTab={activeTab} clinicId={clinicId} />
				</Suspense>
			</div>

			{/* --- DYNAMIC TAB CONTENT AREA --- */}
			<div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 w-full">
				<Suspense fallback={<ClinicDetailsSkeleton />}>
					<ClinicTabRouter activePeriod={activePeriod} activeTab={activeTab} clinicId={clinicId} />
				</Suspense>
			</div>
		</ClinicTerminalShell>
	);
}
