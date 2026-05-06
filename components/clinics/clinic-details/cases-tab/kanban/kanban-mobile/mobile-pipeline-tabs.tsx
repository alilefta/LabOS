"use client";

import { useMemo, useState } from "react";
import { Layers, Inbox, Clock, Wrench, LucideIcon } from "lucide-react";
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
		};

		localCases.forEach((c) => {
			if (cols[c.status]) {
				cols[c.status].push(c);
			}
		});
		return cols;
	}, [localCases]);

	return (
		<div className="flex flex-col h-full w-full bg-background animate-in fade-in duration-500">
			<Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full w-full">
				{/* --- STICKY MOBILE TAB BAR --- */}
				<div className="px-4 pb-4 pt-2 shrink-0 bg-background/80 backdrop-blur-md sticky top-0 z-20 border-b border-border/50">
					<TabsList className="w-full h-12 bg-slate-100 dark:bg-[#121214] p-1 rounded-2xl border border-border shadow-inner grid grid-cols-3">
						{TABS.map((tab) => {
							const count = columnsData[tab.id]?.length || 0;
							const isActive = activeTab === tab.id;

							return (
								<TabsTrigger
									key={tab.id}
									value={tab.id}
									className={cn(
										"rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1.5",
										"data-[state=active]:bg-white dark:data-[state=active]:bg-[#1e1e21] data-[state=active]:text-primary data-[state=active]:shadow-sm",
									)}
								>
									<tab.icon className={cn("w-3.5 h-3.5", isActive ? "text-primary" : "text-muted-foreground")} />
									{tab.label}
									{count > 0 && (
										<span
											className={cn(
												"ml-1 flex items-center justify-center min-w-[18px] h-4 px-1 rounded-full text-[9px] font-black font-mono",
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
				<div className="flex-1 overflow-y-auto custom-scrollbar px-4 pt-4 pb-24">
					{TABS.map((tab) => {
						const casesInColumn = columnsData[tab.id] || [];

						return (
							<TabsContent key={tab.id} value={tab.id} className="m-0 focus-visible:outline-none flex flex-col gap-4 animate-in slide-in-from-right-4 duration-300">
								{/* Card List */}
								{casesInColumn.length > 0 ? (
									casesInColumn.map((caseItem) => <MobilePipelineCard key={caseItem.id} caseItem={caseItem} requestStatusTransition={requestStatusTransition} />)
								) : (
									/* --- EMPTY STATE --- */
									<div className="py-24 flex flex-col items-center justify-center text-center opacity-40">
										<div className="w-16 h-16 rounded-[2rem] bg-slate-200 dark:bg-white/5 flex items-center justify-center mb-4 border border-border/50">
											<Layers className="w-8 h-8 text-muted-foreground" />
										</div>
										<p className="text-sm font-bold text-foreground tracking-tight uppercase">Stage is Clear</p>
										<p className="text-[11px] text-muted-foreground mt-1 max-w-[200px] leading-relaxed">
											There are currently no active cases for this clinic in the {tab.label} stage.
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
