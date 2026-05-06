"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
	activeTab: string;
	clinicId: string;
}

const TABS = [
	{ id: "overview", label: "Intelligence Overview" },
	{ id: "pipeline", label: "Production Pipeline" },
	{ id: "roster", label: "Practitioner Roster" },
	{ id: "ledger", label: "Financial Ledger" },
];

export function ClinicTabNavigation({ activeTab, clinicId }: Props) {
	return (
		<div className="w-full max-w-400 mx-auto px-6 lg:px-8 mt-2">
			{/* The ml-14 perfectly aligns the tabs with the text of the header above, bypassing the back button */}
			<div className="flex items-center gap-8 overflow-x-auto no-scrollbar ml-14 border-b border-border/50">
				{TABS.map((tab) => {
					const isActive = activeTab === tab.id;
					return (
						<Link
							key={tab.id}
							href={`/clinics/${clinicId}?tab=${tab.id}`}
							replace // Doesn't fill browser history with tab clicks
							className={cn(
								"pb-3 text-[11px] font-bold uppercase tracking-widest transition-all whitespace-nowrap relative group",
								isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
							)}
						>
							{tab.label}

							{/* Animated Bottom Border Indicator */}
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
