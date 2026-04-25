"use client";

import { useRef, useMemo, memo } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useVirtualizer, defaultRangeExtractor } from "@tanstack/react-virtual";
import { Layers, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { CaseListDTO } from "@/schema/composed/case.details";
import { DesktopKanbanCard } from "./desktop-card";

interface ColumnProps {
	id: string;
	title: string;
	cases: CaseListDTO[];
}

export const DesktopKanbanColumn = memo(function DesktopKanbanColumn({ id, title, cases }: ColumnProps) {
	// 1. STABILIZE DROPPABLE REF
	const { setNodeRef, isOver } = useDroppable({
		id,
		data: { type: "Column", status: id },
	});

	// 2. MEMOIZE IDs (Performance multiplier for large lists)
	// Prevents SortableContext from re-calculating the entire list logic on every keystroke
	const caseIds = useMemo(() => cases.map((c) => c.id), [cases]);

	// 3. VIRTUALIZER SETUP
	const parentRef = useRef<HTMLDivElement>(null);

	const rowVirtualizer = useVirtualizer({
		count: cases.length,
		getScrollElement: () => parentRef.current,
		// We use a fixed estimate for the card height + gap
		estimateSize: () => 164,
		overscan: 6, // Increased overscan for smoother high-refresh scrolling
		rangeExtractor: (range) => {
			// Helps maintain stability during rapid scrolls
			return defaultRangeExtractor(range);
		},
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
					<h3 className="text-sm font-bold text-foreground  uppercase tracking-wider">{title}</h3>
					<span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-border text-[10px] font-mono font-bold text-muted-foreground shadow-sm">{cases.length}</span>
				</div>

				{isOver && (
					<div className="flex items-center gap-1.5 text-[10px] font-bold text-primary animate-in fade-in slide-in-from-right-2 uppercase tracking-widest">
						<CheckCircle2 className="w-3 h-3" /> Drop
					</div>
				)}
			</div>

			{/* --- SCROLLABLE DROPPABLE AREA --- */}
			<div
				ref={setNodeRef}
				className={cn(
					"flex-1 rounded-[28px] transition-all duration-300 flex flex-col p-2 overflow-hidden border-2 border-transparent relative",
					isOver ? "bg-primary/5 border-dashed border-primary/20 shadow-inner" : "bg-slate-50/50 dark:bg-white/1",
				)}
				// Performance Hint: Browser isolates this column from the rest of the layout
				style={{ contain: "layout style" }}
			>
				{/* --- VIRTUALIZED SCROLL CONTAINER --- */}
				<div ref={parentRef} className="flex-1 overflow-y-auto custom-scrollbar px-1 relative transform-gpu">
					{cases.length > 0 ? (
						<SortableContext items={caseIds} strategy={verticalListSortingStrategy}>
							<div
								style={{
									height: `${rowVirtualizer.getTotalSize()}px`,
									width: "100%",
									position: "relative",
								}}
							>
								{rowVirtualizer.getVirtualItems().map((virtualRow) => {
									const caseItem = cases[virtualRow.index];
									if (!caseItem) return null;

									return (
										<div
											key={virtualRow.key}
											style={{
												position: "absolute",
												top: 0,
												left: 0,
												width: "100%",
												height: `${virtualRow.size}px`,
												// transform-gpu: Uses translate3d for 120fps motion
												transform: `translate3d(0, ${virtualRow.start}px, 0)`,
												paddingBottom: "12px",
												zIndex: 1,
												willChange: "transform",
											}}
										>
											<DesktopKanbanCard caseItem={caseItem} />
										</div>
									);
								})}
							</div>
						</SortableContext>
					) : (
						/* --- EMPTY STATE --- */
						!isOver && (
							<div className="h-full w-full flex flex-col items-center justify-center text-center opacity-30 animate-in fade-in duration-500">
								<div className="p-4 rounded-3xl bg-slate-200 dark:bg-white/5 mb-3">
									<Layers className="w-8 h-8 text-muted-foreground" />
								</div>
								<p className="text-[10px] font-black uppercase tracking-[0.2em]">Stage Clear</p>
								<p className="text-[9px] font-medium mt-1">No cases in this queue</p>
							</div>
						)
					)}
				</div>
			</div>
		</div>
	);
});
