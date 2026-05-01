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

// Mock fetching function (replace with your actual DB call)
async function getClinicDetails(id: string) {
	return {
		id,
		name: "Apex Dental Design",
		type: "CLINIC" as const,
		status: "ACTIVE" as const, // Try changing to "SUSPENDED"
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
			<div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border pt-6 flex flex-col gap-6">
				<ClinicVitalsHeader clinic={clinic} />
				<ClinicTabNavigation activeTab={activeTab} clinicId={clinic.id} />
			</div>

			{/* --- DYNAMIC TAB CONTENT AREA --- */}
			<div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-8 relative z-10">
				{activeTab === "overview" && (
					<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
						{/* TOP ROW: Split 4/8 Bento */}
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
							{/* Left Vitals (4 cols) */}
							<div className="lg:col-span-4 flex flex-col gap-6">
								<ClinicHealthRing
									scores={{
										volume: 85, // Fetch from DB
										quality: 62, // Calculate from (1 - Remake Rate) * 100
										logic: 94, // Calculate from (On-Time Payments)
									}}
								/>
								<ClinicFinancialVitalsCard balance={clinic.currentBalance} limit={clinic.creditLimit} discount={clinic.discount} />
							</div>

							{/* Right Patterns (8 cols) */}
							<div className="lg:col-span-8 flex flex-col">
								<ProductionQualityHeatmap />
							</div>
						</div>

						{/* BOTTOM ROW: Full Width AI Auditor */}
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
		</ClinicTerminalShell>
	);
}
