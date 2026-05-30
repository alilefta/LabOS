import { TeamDashboardTab, TeamDashboardTimeFramePeriod } from "@/schema/composed/team/helpers";
import { ReactNode, Suspense } from "react";
import { StaffOverviewTab } from "../overview-tab/staff-overview-tab";
import { StaffCasesTab } from "../overview-tab/staff-cases-tab";

interface Props {
	staffId: string;
	activeTab: TeamDashboardTab;
	activePeriod: TeamDashboardTimeFramePeriod;
}

export async function TeamTabRouter({ staffId, activePeriod, activeTab }: Props) {
	let tab: ReactNode | null = null;
	switch (activeTab) {
		case "cases":
			tab = <StaffCasesTab staffId={staffId} />;
			break;

		// case "payroll":
		// 	tab = <StaffPayrollTab staffId={staffId} />;
		// 	break;

		// case "settings":
		// 	tab = <StaffSettingsTab staffId={staffId} />;
		// 	break;

		case "overview":
		default:
			tab = <StaffOverviewTab staffId={staffId} activePeriod={activePeriod} />;
			break;
	}

	return (
		<div className="w-full max-w-500 mx-auto p-4 sm:p-6 lg:p-8">
			<Suspense>{tab}</Suspense>
		</div>
	);
}
