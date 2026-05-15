import { ClinicDashboardTab, ClinicDashboardTimeFramePeriod } from "@/schema/composed/clinics/helpers";
import { ClinicOverviewTab } from "./overview-tab/clinic-overview-tab";
import { ClinicPipelineTab } from "./cases-tab/clinic-pipeline-tab";
import { ClinicLedgerTab } from "./finanical-tab/clinic-ledger-tab";
import { ClinicRosterTab } from "./practitioner-tab/clinic-roaster-tab";
import { ReactNode, Suspense } from "react";

interface Props {
	clinicId: string;
	activeTab: ClinicDashboardTab;
	activePeriod: ClinicDashboardTimeFramePeriod;
}

export async function ClinicTabRouter({ clinicId, activePeriod, activeTab }: Props) {
	let tab: ReactNode | null = null;
	switch (activeTab) {
		case "pipeline":
			tab = <ClinicPipelineTab clinicId={clinicId} />;
			break;

		case "ledger":
			tab = <ClinicLedgerTab clinicId={clinicId} />;
			break;

		case "roster":
			tab = <ClinicRosterTab clinicId={clinicId} />;
			break;

		case "overview":
		default:
			tab = <ClinicOverviewTab clinicId={clinicId} activePeriod={activePeriod} />;
			break;
	}

	return (
		<div className="w-full max-w-400 mx-auto p-4 sm:p-6 lg:p-8">
			<Suspense>{tab}</Suspense>
		</div>
	);
}
