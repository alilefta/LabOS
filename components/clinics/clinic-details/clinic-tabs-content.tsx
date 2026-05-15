// Replaced With Clinic-tab-router
// "use client";
// import { ClinicHistoricalDataTable } from "@/components/clinics/clinic-details/cases-tab/clinic-historical-data-table";
// import { CustomPricingPlanList } from "@/components/clinics/clinic-details/finanical-tab/custom-pricing-plans-list";
// import { ClinicInvoiceHistory } from "@/components/clinics/clinic-details/finanical-tab/clinic-invoice-history";
// import { TimeFrameFilter } from "@/components/clinics/clinic-details/overview-tab/time-frame-filter";
// import { ClinicOverviewTab } from "@/components/clinics/clinic-details/overview-tab/clinic-overview-tab";
// import { ClinicActiveCasesKanbanWrapper } from "@/components/clinics/clinic-details/cases-tab/kanban/clinic-active-cases-kanban-wrapper";
// import { memo, useEffect } from "react";
// import { CLINIC_PAGE_TABS, CLINIC_PAGE_TIME_PERIODS } from "@/schema/composed/clinics/helpers";
// import { DentistRosterShell } from "./practitioner-tab/dentist-roaster-shell";
// import { parseAsStringLiteral, useQueryState } from "nuqs";
// import { ClinicType } from "@/schema/base/enums.base";

// interface Props {
// 	clinicId: string;
// 	clinicType: ClinicType;
// 	clinicName: string;
// 	creditLimit: number | null;
// 	currentBalance: number;
// 	discount: number | null;
// }

// export const ClinicTabsContent = memo(function ClinicTabsContent({ clinicId, clinicName, clinicType, creditLimit, currentBalance, discount }: Props) {
// 	const [activeTab] = useQueryState("tab", parseAsStringLiteral(CLINIC_PAGE_TABS).withOptions({ shallow: true }).withDefault("overview")); // <-- Add this
// 	const [activePeriod] = useQueryState("period", parseAsStringLiteral(CLINIC_PAGE_TIME_PERIODS).withOptions({ shallow: true }).withDefault("90d"));

// 	console.log("ClinicTabContent render:", { activeTab });

// 	useEffect(() => {
// 		console.log("ClinicTabContent MOUNTED");
// 		return () => console.log("ClinicTabContent UNMOUNTED");
// 	}, []);
// 	return (
// 		<div className="w-full max-w-400 mx-auto p-4 sm:p-6 lg:p-8">
// 			{activeTab === "overview" && (
// 				<div className="flex flex-col gap-6">
// 					<div className="flex items-center justify-between mb-2">
// 						<h2 className="text-lg font-bold tracking-tight text-foreground">Business Intelligence</h2>
// 						<TimeFrameFilter activePeriod={activePeriod} clinicId={clinicId} />
// 					</div>
// 					<ClinicOverviewTab clinicId={clinicId} activePeriod={activePeriod} />
// 				</div>
// 			)}
// 			{activeTab === "pipeline" && (
// 				<div className="flex flex-col gap-6 w-full h-full min-h-0">
// 					<ClinicActiveCasesKanbanWrapper clinicId={clinicId} />
// 					<ClinicHistoricalDataTable clinicId={clinicId} />
// 				</div>
// 			)}
// 			{activeTab === "roster" && <DentistRosterShell currentClinicType={clinicType} clinicId={clinicId} />}
// 			{activeTab === "ledger" && (
// 				<div className="flex flex-col gap-6 w-full h-full min-h-0">
// 					<CustomPricingPlanList clinicId={clinicId} />
// 					<ClinicInvoiceHistory clinicId={clinicId} />
// 				</div>
// 			)}
// 		</div>
// 	);
// });
