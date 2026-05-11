import { notFound, redirect } from "next/navigation";
import { ClinicTerminalShell } from "@/components/clinics/clinic-details/navigation-shell/clinic-terminal-shell";
import { ClinicVitalsHeader } from "@/components/clinics/clinic-details/navigation-shell/clinic-vitals-header";
import { ClinicTabNavigation } from "@/components/clinics/clinic-details/navigation-shell/clinic-tab-navigation";

import { getClinicDetailsById } from "@/data/clinics/get-clinic";
import { ClinicBase } from "@/schema/base/clinic.base";
import { ClinicDashboardTimeFramePeriodSchema } from "@/schema/composed/clinics/helpers";
import z from "zod";
import { PermissionsProvider } from "@/providers/permissions-provider";
import { getCurrentLabUserRoleByAuthUserId } from "@/data/lab";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ClinicTabsContent } from "@/components/clinics/clinic-details/clinic-tabs-content";

// // Define your allowed periods to prevent malformed URLs from breaking the DB query
// type TimePeriod = typeof ALLOWED_PERIODS[number];
const TabTitleSchema = z.enum(["overview", "pipeline", "roster", "ledger"]);
export default async function ClinicDetailPage({
	params,
	searchParams,
}: {
	params: Promise<{ clinicId: string }>;
	searchParams: Promise<{ tab?: string; period?: string }>; // Notice we use 'period' here
}) {
	const { clinicId } = await params;
	const { tab, period } = await searchParams;

	const user = await getCurrentLabUserRoleByAuthUserId();
	if (!user) redirect("/onboarding");

	const results = await getClinicDetailsById(clinicId);
	if (!results.success) notFound();
	const clinic = results.data as ClinicBase;

	const parsedTabTitle = TabTitleSchema.safeParse(tab);
	const activeTab = parsedTabTitle.success ? parsedTabTitle.data : "overview";

	const parsedPeriod = ClinicDashboardTimeFramePeriodSchema.safeParse(period);

	// 2. The Elite Timeframe Fallback Logic
	// If period is missing, or someone types ?period=junk, it safely defaults to "90d"
	const activePeriod = parsedPeriod.success ? parsedPeriod.data : "90d";

	return (
		<ClinicTerminalShell status={clinic.status} balance={clinic.currentBalance} limit={clinic.creditLimit}>
			<PermissionsProvider
				userContext={{
					role: user.role,
					staffCategory: user.labStaff?.roleCategory,
					staffId: user.labStaff?.id,
				}}
			>
				{/* --- STICKY HEADER & TABS --- */}
				<div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border pt-6 flex flex-col gap-4 shadow-sm">
					<ClinicVitalsHeader clinic={clinic} />
					<ClinicTabNavigation activeTab={activeTab} clinicId={clinic.id} />
				</div>

				{/* 
                			--- DYNAMIC TAB CONTENT AREA --- 
            			*/}
				<div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 w-full">
					<ClinicTabsContent activePeriod={activePeriod} activeTab={activeTab} clinic={clinic} />
				</div>
			</PermissionsProvider>
		</ClinicTerminalShell>
	);
}
