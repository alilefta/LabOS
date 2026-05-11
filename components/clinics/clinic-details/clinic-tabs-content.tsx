"use client";
import { ClinicHistoricalDataTable } from "@/components/clinics/clinic-details/cases-tab/clinic-historical-data-table";
import { DentistRosterGrid } from "@/components/clinics/clinic-details/practitioner-tab/dentist-roaster-grid";
import { CustomPricingPlanList } from "@/components/clinics/clinic-details/finanical-tab/custom-pricing-plans-list";
import { ClinicInvoiceHistory } from "@/components/clinics/clinic-details/finanical-tab/clinic-invoice-history";
import { TimeFrameFilter } from "@/components/clinics/clinic-details/overview-tab/time-frame-filter";
import { ClinicOverviewTab } from "@/components/clinics/clinic-details/overview-tab/clinic-overview-tab";
import { ClinicActiveCasesKanbanWrapper } from "@/components/clinics/clinic-details/cases-tab/kanban/clinic-active-cases-kanban-wrapper";
import { ClinicBase } from "@/schema/base/clinic.base";
import { memo, useEffect } from "react";
import { ClinicDashboardTimeFramePeriod } from "@/schema/composed/clinics/helpers";
import { TooltipProvider } from "@/components/ui/tooltip";

interface Props {
	clinic: ClinicBase;
	activeTab: string;
	activePeriod: ClinicDashboardTimeFramePeriod;
}

export const ClinicTabsContent = memo(function ClinicTabsContent({ clinic, activePeriod, activeTab }: Props) {
	console.log("ClinicTabContent render:", { activeTab });

	useEffect(() => {
		console.log("ClinicTabContent MOUNTED");
		return () => console.log("ClinicTabContent UNMOUNTED");
	}, []);
	return (
		<TooltipProvider delayDuration={100}>
			<div className="w-full max-w-400 mx-auto p-4 sm:p-6 lg:p-8">
				{activeTab === "overview" && (
					<div className="flex flex-col gap-6">
						<div className="flex items-center justify-between mb-2">
							<h2 className="text-lg font-bold tracking-tight text-foreground">Business Intelligence</h2>
							<TimeFrameFilter activePeriod={activePeriod} clinicId={clinic.id} />
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
		</TooltipProvider>
	);
});
