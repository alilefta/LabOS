"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";
import { Layers } from "lucide-react";
import { CaseListDTO } from "@/schema/composed/case.details";
import { DesktopKanbanCard } from "./desktop-card";

interface ColumnProps {
	id: string;
	title: string;
	cases: CaseListDTO[];
}

export function DesktopKanbanColumn({ id, title, cases }: ColumnProps) {
	const { setNodeRef, isOver } = useDroppable({
		id,
		data: { type: "Column", status: id },
	});

	return (
		<div className="flex flex-col w-[320px] shrink-0 h-full select-none">
			{/* --- COLUMN HEADER --- */}
			<div className="flex items-center justify-between mb-4 px-2 shrink-0">
				<div className="flex items-center gap-2">
					<div
						className={cn(
							"w-2 h-2 rounded-full",
							id === "NEW" ? "bg-blue-500" : id === "ASSIGNED" ? "bg-slate-400" : id === "PROCESSING" ? "bg-amber-500 animate-pulse" : "bg-emerald-500",
						)}
					/>
					<h3 className="text-sm font-bold text-foreground tracking-tight uppercase tracking-wider">{title}</h3>
					<span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-border text-[10px] font-mono font-bold text-muted-foreground shadow-sm">{cases.length}</span>
				</div>

				{isOver && <div className="text-[10px] font-bold text-primary animate-in fade-in slide-in-from-right-2 uppercase tracking-widest">Drop Here</div>}
			</div>

			{/* --- SCROLLABLE DROPPABLE AREA --- */}
			<div
				ref={setNodeRef}
				className={cn(
					"flex-1 rounded-[28px] transition-all duration-300 flex flex-col gap-3 p-3 overflow-y-auto custom-scrollbar border-2 border-transparent",
					isOver ? "bg-primary/5 border-dashed border-primary/20 shadow-inner" : "bg-slate-50/50 dark:bg-white/[0.01]",
				)}
			>
				{cases.length > 0 ? (
					<SortableContext items={cases.map((c) => c.id)} strategy={verticalListSortingStrategy}>
						<div className="flex flex-col gap-3">
							{cases.map((caseItem) => (
								<DesktopKanbanCard key={caseItem.id} caseItem={caseItem} />
							))}
						</div>
					</SortableContext>
				) : (
					!isOver && (
						<div className="flex-1 flex flex-col items-center justify-center text-center opacity-30 animate-in fade-in duration-500">
							<div className="p-4 rounded-3xl bg-slate-200 dark:bg-white/5 mb-3">
								<Layers className="w-8 h-8 text-muted-foreground" />
							</div>
							<p className="text-[10px] font-black uppercase tracking-[0.2em]">Stage Clear</p>
							<p className="text-[9px] font-medium mt-1">No cases in this queue</p>
						</div>
					)
				)}

				<div className="h-10 shrink-0 pointer-events-none" />
			</div>
		</div>
	);
}
