"use client";

import { useMemo, useState } from "react";
import { Layers } from "lucide-react";
import { CaseStatus } from "@/schema/base/enums.base";
import { MobileCard } from "./mobile-card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CaseListDTO } from "@/schema/composed/case.details";
import { useKanbanStore } from "../use-kanban-store";

const TABS: { id: CaseStatus; label: string }[] = [
	{ id: "NEW", label: "Intake" },
	{ id: "ASSIGNED", label: "Queue" },
	{ id: "PROCESSING", label: "Prod" }, // Shorter labels for mobile
	{ id: "COMPLETED", label: "Verify" },
];

interface MobileKanbanProps {
	requestStatusTransition: (caseItem: CaseListDTO, newStatus: CaseStatus, oldStatus: CaseStatus) => void;
}

export function MobileKanbanTabs({ requestStatusTransition }: MobileKanbanProps) {
	// 1. Hook into the highly-performant local state
	const localCases = useKanbanStore((state) => state.localCases);

	// 2. Default to "Production" since that's what mobile technicians care about most
	const [activeTab, setActiveTab] = useState<string>("PROCESSING");

	const columnsData = useMemo(() => {
		const cols: Record<string, CaseListDTO[]> = { NEW: [], ASSIGNED: [], PROCESSING: [], COMPLETED: [], FAILED: [], DELIVERED: [], DRAFT: [] };
		localCases.forEach((c) => {
			if (cols[c.status]) cols[c.status].push(c);
		});
		return cols;
	}, [localCases]);

	return (
		<div className="flex flex-col h-full w-full bg-background animate-in fade-in duration-500">
			<Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full w-full">
				{/* --- STICKY MOBILE TAB BAR --- */}
				<div className="px-4 pb-3 shrink-0">
					<TabsList className="w-full h-12 bg-slate-100 dark:bg-[#121214] p-1 rounded-2xl border border-border shadow-inner grid grid-cols-4">
						{TABS.map((tab) => {
							const count = columnsData[tab.id]?.length || 0;
							return (
								<TabsTrigger
									key={tab.id}
									value={tab.id}
									className="rounded-xl text-[10px] sm:text-xs font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-[#1e1e21] data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
								>
									{tab.label}
									{/* Optional: Show tiny dot indicator if there are items */}
									{count > 0 && <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-primary" />}
								</TabsTrigger>
							);
						})}
					</TabsList>
				</div>

				{/* --- SCROLLABLE TAB CONTENTS --- */}
				{/* 
					We use a standard vertical map instead of Virtualizer here because on mobile, 
					users rarely scroll through thousands of items—they rely on search. 
					A vertical list is native and hardware accelerated.
				*/}
				<div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-12">
					{TABS.map((tab) => {
						const casesInColumn = columnsData[tab.id] || [];

						return (
							<TabsContent key={tab.id} value={tab.id} className="m-0 mt-2 focus-visible:outline-none flex flex-col gap-4">
								{/* Header indicating column totals */}
								<div className="flex items-center justify-between mb-2">
									<h3 className="text-sm font-bold text-foreground">{tab.label} Queue</h3>
									<span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-border text-[10px] font-mono font-bold text-muted-foreground shadow-sm">
										{casesInColumn.length} Cases
									</span>
								</div>

								{/* Card List */}
								{casesInColumn.length > 0 ? (
									casesInColumn.map((caseItem) => <MobileCard key={caseItem.id} caseItem={caseItem} requestStatusTransition={requestStatusTransition} />)
								) : (
									<div className="py-16 flex flex-col items-center justify-center text-center opacity-40">
										<div className="w-14 h-14 rounded-3xl bg-slate-200 dark:bg-white/5 flex items-center justify-center mb-4">
											<Layers className="w-6 h-6 text-muted-foreground" />
										</div>
										<p className="text-sm font-bold text-foreground tracking-tight">Queue is empty</p>
										<p className="text-[11px] text-muted-foreground mt-1 max-w-50">There are no cases waiting in the {tab.label} stage.</p>
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
