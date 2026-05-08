"use client";

import { useMemo, useState } from "react";
import { Layers, Inbox, Clock, Wrench, LucideIcon, PackageCheck } from "lucide-react";
import { CaseStatus } from "@/schema/base/enums.base";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";
import { ClinicActiveCaseDTO } from "@/schema/composed/clinics/clinic-cases.dtos";
import { useClinicPipelineStore } from "../../use-clinic-pipeline-store";
import { MobilePipelineCard } from "./mobile-pipeline-card";

// Shorter labels for mobile real-estate
const TABS: { id: CaseStatus; label: string; icon: LucideIcon }[] = [
	{ id: "NEW", label: "Intake", icon: Inbox },
	{ id: "ASSIGNED", label: "Queue", icon: Clock },
	{ id: "PROCESSING", label: "Prod", icon: Wrench },
	{ id: "COMPLETED", label: "Verify", icon: PackageCheck },
];

interface MobilePipelineTabsProps {
	requestStatusTransition: (caseItem: ClinicActiveCaseDTO, newStatus: CaseStatus, oldStatus: CaseStatus) => void;
}

export function MobilePipelineTabs({ requestStatusTransition }: MobilePipelineTabsProps) {
	// 1. ZUSTAND STORE CONNECTION
	const localCases = useClinicPipelineStore((state) => state.localCases);

	// 2. Default to "Queue" as it's the most common starting point for mobile checks
	const [activeTab, setActiveTab] = useState<string>("ASSIGNED");

	// 3. DATA GROUPING (Optimized via Memo)
	const columnsData = useMemo(() => {
		const cols: Record<string, ClinicActiveCaseDTO[]> = {
			NEW: [],
			ASSIGNED: [],
			PROCESSING: [],
			COMPLETED: [],
		};

		localCases.forEach((c) => {
			if (cols[c.status]) {
				cols[c.status].push(c);
			}
		});
		return cols;
	}, [localCases]);

	// Find the icon for the currently active empty state
	const ActiveIcon = TABS.find((t) => t.id === activeTab)?.icon || Layers;

	return (
		<div className="flex flex-col h-full w-full bg-background animate-in fade-in duration-500">
			<Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full w-full">
				{/* --- STICKY MOBILE TAB BAR --- */}
				{/* Added z-30 to ensure it sits above the scrolling cards, and backdrop-blur for iOS polish */}
				<div className="px-4 pb-4 pt-2 shrink-0 bg-background/90 backdrop-blur-xl sticky top-0 z-30 border-b border-border/50 shadow-sm">
					<TabsList className="w-full h-14 bg-slate-100/80 dark:bg-[#121214]/80  rounded-2xl border border-border/50 shadow-inner grid grid-cols-4 gap-1">
						{TABS.map((tab) => {
							const count = columnsData[tab.id]?.length || 0;
							const isActive = activeTab === tab.id;

							return (
								<TabsTrigger
									key={tab.id}
									value={tab.id}
									className={cn(
										"rounded-[14px] text-[10px] font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 h-full",
										"data-[state=active]:bg-white dark:data-[state=active]:bg-[#1e1e21] data-[state=active]:text-primary data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-border/50",
									)}
								>
									<div className="flex items-center gap-1.5">
										<tab.icon className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4", isActive ? "text-primary" : "text-muted-foreground")} />
										<span className="hidden sm:inline-block">{tab.label}</span>
									</div>

									{/* Mobile shows count under icon, tablet shows next to text */}
									{count > 0 && (
										<span
											className={cn(
												"flex items-center justify-center min-w-4 h-4 px-1 rounded-full text-[9px] font-black font-mono leading-none",
												isActive ? "bg-primary text-white" : "bg-slate-200 dark:bg-white/10 text-muted-foreground",
											)}
										>
											{count}
										</span>
									)}
								</TabsTrigger>
							);
						})}
					</TabsList>
				</div>

				{/* --- SCROLLABLE TAB CONTENTS --- */}
				<div className="flex-1 overflow-y-auto custom-scrollbar px-4 pt-6 pb-32">
					{TABS.map((tab) => {
						const casesInColumn = columnsData[tab.id] || [];

						return (
							<TabsContent key={tab.id} value={tab.id} className="m-0 focus-visible:outline-none flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
								{casesInColumn.length > 0 ? (
									casesInColumn.map((caseItem) => <MobilePipelineCard key={caseItem.id} caseItem={caseItem} requestStatusTransition={requestStatusTransition} />)
								) : (
									/* --- EMPTY STATE --- */
									<div className="py-24 flex flex-col items-center justify-center text-center opacity-50">
										<div className="w-20 h-20 rounded-4xl bg-slate-50 dark:bg-white/2 flex items-center justify-center mb-5 border-2 border-dashed border-border shadow-sm">
											<ActiveIcon className="w-8 h-8 text-muted-foreground" />
										</div>
										<p className="text-sm font-bold text-foreground tracking-tight uppercase">Queue is Clear</p>
										<p className="text-[11px] text-muted-foreground mt-1 max-w-50 leading-relaxed">
											There are currently no active cases for this clinic in the <span className="font-bold text-foreground">{tab.label}</span> stage.
										</p>
									</div>
								)}
							</TabsContent>
						);
					})}
				</div>
			</Tabs>
		</div>
	);
}
