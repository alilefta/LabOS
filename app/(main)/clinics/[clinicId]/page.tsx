import { notFound } from "next/navigation";

import { ClinicTerminalShell } from "@/components/clinics/clinic-details/navigation-shell/clinic-terminal-shell";
import { ClinicVitalsHeader } from "@/components/clinics/clinic-details/navigation-shell/clinic-vitals-header";
import { ClinicTabNavigation } from "@/components/clinics/clinic-details/navigation-shell/clinic-tab-navigation";
import { ClinicDetailsUI } from "@/schema/composed/clinic.details";
import { ClinicHealthRing } from "@/components/clinics/clinic/clinic-health-ring";
import { ClinicFinancialVitalsCard } from "@/components/clinics/clinic-details/overview-tab/clinic-financial-vitals-card";
import { ProductionQualityHeatmap } from "@/components/clinics/clinic/production-quality-heatmap";
import { AiRelationshipAuditor } from "@/components/clinics/clinic-details/overview-tab/ai-relationship-auditor";
import { ClinicActiveCasesBoard } from "@/components/clinics/clinic-details/cases-tab/clinic-active-cases-board";
import { ClinicHistoricalDataTable } from "@/components/clinics/clinic-details/cases-tab/clinic-historical-data-table";
import { DentistRosterGrid } from "@/components/clinics/clinic-details/practitioner-tab/dentist-roaster-grid";
import { CustomPricingPlanList } from "@/components/clinics/clinic-details/finanical-tab/custom-pricing-plans-list";
import { ClinicInvoiceHistory } from "@/components/clinics/clinic-details/finanical-tab/clinic-invoice-history";
import { ProductMixDonut } from "@/components/clinics/clinic-details/overview-tab/product-mix-donut";

// Mock fetching function (replace with your actual DB call)
async function getClinicDetails(id: string) {
	return {
		id,
		name: "Apex Dental Design",
		type: "CLINIC" as const,
		status: "ACTIVE" as const,
		city: "Miami",
		email: "hello@apexdental.com",
		phoneNumber: "+1 (305) 555-0192",
		currentBalance: 4250.0,
		creditLimit: 10000.0,
		discount: 5.0,
	};
}

export default async function ClinicDetailPage({ params, searchParams }: { params: Promise<{ clinicId: string }>; searchParams: Promise<{ tab?: string }> }) {
	const { clinicId } = await params;
	const { tab } = await searchParams;
	const clinic = (await getClinicDetails(clinicId)) as ClinicDetailsUI;

	if (!clinic) notFound();

	const activeTab = tab || "overview";

	return (
		<ClinicTerminalShell status={clinic.status} balance={clinic.currentBalance} limit={clinic.creditLimit}>
			{/* --- STICKY HEADER & TABS --- */}
			{/* 
                --- THE STICKY TERMINAL HEADER --- 
                Takes full width for the background blur and bottom border.
            */}
			<div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border pt-6 flex flex-col gap-4 shadow-sm">
				<ClinicVitalsHeader clinic={clinic} />
				<ClinicTabNavigation activeTab={activeTab} clinicId={clinic.id} />
			</div>

			{/* 
                --- DYNAMIC TAB CONTENT AREA --- 
                We add a wrapper div here that takes flex-1 and handles the scrolling.
            */}
			<div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 w-full">
				<div className="w-full max-w-400 mx-auto p-4 sm:p-6 lg:p-8">
					{activeTab === "overview" && (
						<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
							{/* TOP ROW: The 3 Pillars of the Relationship (33% each) */}
							<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
								<ClinicHealthRing
									scores={{
										volume: 85, // Growth (Month over Month)
										quality: 62, // Efficiency (100 - Remake Rate)
										logic: 94, // Liquidity (% Invoices Paid)
									}}
								/>
								<ProductMixDonut />
								<ClinicFinancialVitalsCard balance={clinic.currentBalance} limit={clinic.creditLimit} discount={clinic.discount} />
							</div>

							{/* MIDDLE ROW: The Rhythm (Full Width) */}
							<div className="w-full">
								<ProductionQualityHeatmap />
							</div>

							{/* BOTTOM ROW: The Brains (Full Width) */}
							<AiRelationshipAuditor
								clinicName={clinic.name}
								insightType="WARNING"
								insightText={`${clinic.name} is your 2nd highest grossing partner, but Dr. Smith has triggered a 12% increase in remake requests this month (primarily Lower Molars). LabOS recommends initiating a technical review call regarding their intraoral scanning margins.`}
								recommendedAction="Schedule Technical Review"
								dataPoints={[
									{ label: "Quarterly Revenue", value: "$34,250", isPositive: true },
									{ label: "Overall Remake Rate", value: "8.4%", isPositive: false },
									{ label: "Margin Errors (Dr. Smith)", value: "14 Cases", isPositive: false },
								]}
							/>
						</div>
					)}
					{activeTab === "pipeline" && (
						<div className="flex flex-col gap-6 w-full h-full min-h-0">
							<ClinicActiveCasesBoard />
							<ClinicHistoricalDataTable />
						</div>
					)}
					{activeTab === "roster" && <DentistRosterGrid />}
					{activeTab === "ledger" && (
						<div className="flex flex-col gap-6 w-full h-full min-h-0">
							<CustomPricingPlanList />
							<ClinicInvoiceHistory />
						</div>
					)}
				</div>
			</div>
		</ClinicTerminalShell>
	);
}
