// components/team/team-details/navigation-shell/team-tab-navigation.tsx

import Link from "next/link";
import { cn } from "@/lib/utils";
import { TeamDashboardTab } from "@/schema/composed/team/helpers";

interface Props {
	activeTab: TeamDashboardTab | string;
	staffId: string;
}

const TABS: { id: TeamDashboardTab; label: string }[] = [
	{ id: "overview", label: "Performance Overview" },
	{ id: "cases", label: "Active Workbench" },
	{ id: "payroll", label: "Payroll Ledger" },
	{ id: "settings", label: "Work Settings" },
];

export function TeamTabNavigation({ activeTab, staffId }: Props) {
	return (
		// strictly aligned to your 2000px grid railing
		<div className="w-full max-w-500 mx-auto px-6 lg:px-8 mt-2">
			{/* 
				THE ALIGNMENT RAIL (md:ml-16)
				This offset matches the exact pixel margin of the header text above,
				keeping the visual lines perfectly straight on large desktop monitors.
			*/}
			<div className="flex items-center gap-8 overflow-x-auto no-scrollbar md:ml-16 border-b border-border/50">
				{TABS.map((tab) => {
					const isActive = activeTab === tab.id;
					return (
						<Link
							key={tab.id}
							href={`/team/${staffId}?tab=${tab.id}`}
							replace // Prevents filling the browser's "Back" history with tab clicks
							scroll={false} // Prevents the browser from jumping to the top of the page
							className={cn(
								"pb-3 text-[11px] font-bold uppercase tracking-widest transition-all whitespace-nowrap relative group outline-none focus-visible:text-primary",
								isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
							)}
						>
							{tab.label}

							{/* Animated Bottom Border Indicator with Neon Glow */}
							{isActive && (
								<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full shadow-[0_-2px_10px_var(--color-primary)] animate-in slide-in-from-bottom-1" />
							)}
						</Link>
					);
				})}
			</div>
		</div>
	);
}
