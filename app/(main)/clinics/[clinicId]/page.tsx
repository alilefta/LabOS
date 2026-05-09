import { notFound, redirect } from "next/navigation";
import { ClinicTerminalShell } from "@/components/clinics/clinic-details/navigation-shell/clinic-terminal-shell";
import { ClinicVitalsHeader } from "@/components/clinics/clinic-details/navigation-shell/clinic-vitals-header";
import { ClinicTabNavigation } from "@/components/clinics/clinic-details/navigation-shell/clinic-tab-navigation";
import { ClinicHistoricalDataTable } from "@/components/clinics/clinic-details/cases-tab/clinic-historical-data-table";
import { DentistRosterGrid } from "@/components/clinics/clinic-details/practitioner-tab/dentist-roaster-grid";
import { CustomPricingPlanList } from "@/components/clinics/clinic-details/finanical-tab/custom-pricing-plans-list";
import { ClinicInvoiceHistory } from "@/components/clinics/clinic-details/finanical-tab/clinic-invoice-history";
import { getClinicDetailsById } from "@/data/clinics/get-clinic";
import { ClinicBase } from "@/schema/base/clinic.base";
import { ClinicDashboardTimeFramePeriodSchema } from "@/schema/composed/clinics/helpers";
import { TimeFrameFilter } from "@/components/clinics/clinic-details/overview-tab/time-frame-filter";
import { ClinicOverviewTab } from "@/components/clinics/clinic-details/overview-tab/clinic-overview-tab";
import z from "zod";
import { ClinicActiveCasesKanbanWrapper } from "@/components/clinics/clinic-details/cases-tab/kanban/clinic-active-cases-kanban-wrapper";
import { PermissionsProvider } from "@/providers/permissions-provider";
import { getCurrentLabUserRoleByAuthUserId } from "@/data/lab";
import { TooltipProvider } from "@/components/ui/tooltip";

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
			<TooltipProvider delayDuration={100}>
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
						<div className="w-full max-w-400 mx-auto p-4 sm:p-6 lg:p-8">
							{activeTab === "overview" && (
								<div className="flex flex-col gap-6">
									<div className="flex items-center justify-between mb-2">
										<h2 className="text-lg font-bold tracking-tight text-foreground">Business Intelligence</h2>
										<TimeFrameFilter activePeriod={activePeriod} clinicId={clinicId} />
									</div>
									<ClinicOverviewTab
										clinicId={clinic.id}
										clinicName={clinic.name}
										period={activePeriod}
										creditLimit={clinic.creditLimit}
										currentBalance={clinic.currentBalance}
										discount={clinic.discount}
									/>
								</div>
							)}
							{activeTab === "pipeline" && (
								<div className="flex flex-col gap-6 w-full h-full min-h-0">
									<ClinicActiveCasesKanbanWrapper clinicId={clinic.id} />
									<ClinicHistoricalDataTable clinicId={clinic.id} />
								</div>
							)}
							{activeTab === "roster" && <DentistRosterGrid currentClinicType={clinic.type} clinicId={clinic.id} />}
							{activeTab === "ledger" && (
								<div className="flex flex-col gap-6 w-full h-full min-h-0">
									<CustomPricingPlanList />
									<ClinicInvoiceHistory />
								</div>
							)}
						</div>
					</div>
				</PermissionsProvider>
			</TooltipProvider>
		</ClinicTerminalShell>
	);
}
