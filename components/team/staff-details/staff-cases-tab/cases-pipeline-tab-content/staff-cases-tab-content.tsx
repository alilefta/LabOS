// components/team/team-details/cases-tab/staff-cases-tab-content.tsx

"use client";

import { useState } from "react";
import { ListTodo, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { StaffActiveCasesTable } from "./active-cases-view/staff-active-cases-table";
import dynamic from "next/dynamic";

interface Props {
	staffId: string;
	originalStaffName: string;
	originalActiveCaseCount: number;
}

const StaffHistoricalCasesTable = dynamic(() => import("./historical-cases-view/staff-historical-cases-table").then((m) => m.StaffHistoricalCasesTable), { ssr: false });

export function StaffCasesTabContent({ staffId, originalStaffName, originalActiveCaseCount }: Props) {
	const [view, setView] = useState<"active" | "history">("active");

	return (
		<div className="flex flex-col h-full gap-6 animate-in fade-in duration-500 min-h-0 w-full">
			{/* --- TAB-LEVEL VIEW SWITCHER --- */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50/50 dark:bg-white/2 border border-border shrink-0">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
						{view === "active" ? <ListTodo className="w-4 h-4" /> : <History className="w-4 h-4" />}
					</div>
					<div>
						<h3 className="text-sm font-bold text-foreground">{view === "active" ? "Active Workbench" : "Historical Record"}</h3>
						<p className="text-xs text-muted-foreground mt-0.5 font-medium">{view === "active" ? "Assigned production queue" : "Delivered and failed cases log"}</p>
					</div>
				</div>

				{/* Segmented Toggle Control */}
				<div className="flex p-1 bg-slate-100 dark:bg-[#121214] rounded-xl border border-border shrink-0 w-full sm:w-auto h-11">
					{[
						{ id: "active", label: "Active Queue", icon: ListTodo },
						{ id: "history", label: "History Log", icon: History },
					].map((btn) => (
						<button
							key={btn.id}
							type="button"
							onClick={() => setView(btn.id as "active" | "history")}
							className={cn(
								"flex-1 sm:flex-none px-4 flex items-center justify-center gap-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap h-full",
								view === btn.id ? "bg-white dark:bg-[#121214] text-primary shadow-sm ring-1 ring-border" : "text-muted-foreground hover:text-foreground",
							)}
						>
							<btn.icon className="w-3.5 h-3.5" />
							{btn.label}
						</button>
					))}
				</div>
			</div>

			{/* --- DYNAMIC LAZY MOUNTING --- */}
			{/* Unselected views are completely unmounted, preserving memory & battery */}
			<div className="flex-1 min-h-0 w-full">
				{view === "active" ? (
					<StaffActiveCasesTable staffId={staffId} originalStaffName={originalStaffName} originalActiveCaseCount={originalActiveCaseCount} />
				) : (
					<StaffHistoricalCasesTable staffId={staffId} />
				)}
			</div>
		</div>
	);
}
