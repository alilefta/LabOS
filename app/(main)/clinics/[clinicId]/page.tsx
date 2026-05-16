import { ClinicTerminalShell } from "@/components/clinics/clinic-details/navigation-shell/clinic-terminal-shell";
import { ClinicHeaderSection } from "@/components/clinics/clinic-details/navigation-shell/clinic-header-section";
import { ClinicTabNavigation } from "@/components/clinics/clinic-details/navigation-shell/clinic-tab-navigation";
import { Suspense } from "react";
import { ClinicDashboardTabsSchema, ClinicDashboardTimeFramePeriodSchema } from "@/schema/composed/clinics/helpers";
import { ClinicTabRouter } from "@/components/clinics/clinic-details/clinic-tab-router";
import { ClinicDetailsSkeleton } from "@/components/clinics/clinic-details/clinic-details-skeleton";
import { ClinicHeaderSectionSkeleton } from "@/components/clinics/clinic-details/navigation-shell/clinic-header-section-skeleton";

export const metadata = {
	title: "Clinic Details | LabOS",
};

export default async function ClinicDetailPage({ params, searchParams }: { params: Promise<{ clinicId: string }>; searchParams: Promise<{ tab?: string; period?: string }> }) {
	const { clinicId } = await params;
	const { period, tab } = await searchParams;

	const parsedTabTitle = ClinicDashboardTabsSchema.safeParse(tab);
	const activeTab = parsedTabTitle.success ? parsedTabTitle.data : "overview";

	const parsedPeriod = ClinicDashboardTimeFramePeriodSchema.safeParse(period);
	const activePeriod = parsedPeriod.success ? parsedPeriod.data : "90d";

	console.log("Clinic Page rendered, searchParams:", await searchParams);

	return (
		<ClinicTerminalShell>
			{/* --- STICKY HEADER & TABS --- */}
			<div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border pt-6 flex flex-col gap-4 shadow-sm">
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
