"use client";

import { SubPageSidebar } from "@/components/shared/sub-page-sidebar";
import { BarChart3, History, Layers, LucideIcon, Settings, User, Wallet } from "lucide-react";

interface NavGroup {
	title: string;
	items: {
		title: string;
		href: string;
		icon: LucideIcon;
	}[];
}

export function TechnicianSidebarWrapper({ tId }: { tId: string }) {
	const techNavGroups: NavGroup[] = [
		{
			title: "Overview",
			items: [
				{ title: "Performance", href: `/technicians/${tId}`, icon: BarChart3 },
				{ title: "Assigned Cases", href: `/technicians/${tId}/cases`, icon: Layers },
			],
		},
		{
			title: "Financials",
			items: [
				{ title: "Salary & Commission", href: `/technicians/${tId}/payroll`, icon: Wallet },
				{ title: "Payout History", href: `/technicians/${tId}/history`, icon: History },
			],
		},
		{
			title: "Administration",
			items: [
				{ title: "Personal Profile", href: `/technicians/${tId}/profile`, icon: User },
				{ title: "Work Settings", href: `/technicians/${tId}/settings`, icon: Settings },
			],
		},
	];

	return <SubPageSidebar groups={techNavGroups} />;
}
