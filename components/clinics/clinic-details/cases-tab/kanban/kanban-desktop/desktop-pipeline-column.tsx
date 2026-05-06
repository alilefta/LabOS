"use client";

import { useRef, useMemo, memo } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useVirtualizer, defaultRangeExtractor } from "@tanstack/react-virtual";
import { Layers, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { DesktopPipelineCard } from "./desktop-pipeline-card";
import { ClinicActiveCaseDTO } from "@/schema/composed/clinics/clinic-cases.dtos";

interface ColumnProps {
	id: string; // The CaseStatus
	title: string;
	cases: ClinicActiveCaseDTO[];
}

export const DesktopPipelineColumn = memo(function DesktopPipelineColumn({ id, title, cases }: ColumnProps) {
	// 1. STABILIZE DROPPABLE REF
	// Tells dnd-kit that this entire column can receive a card
	const { setNodeRef, isOver } = useDroppable({
		id,
		data: { type: "Column", status: id },
	});

	// 2. MEMOIZE IDs
	// Crucial: SortableContext needs a stable array of strings to avoid re-calculating
	// intersection logic unnecessarily during rapid scrolls.
	const caseIds = useMemo(() => cases.map((c) => c.id), [cases]);

	// 3. VIRTUALIZER SETUP
	const parentRef = useRef<HTMLDivElement>(null);

	const rowVirtualizer = useVirtualizer({
		count: cases.length,
		getScrollElement: () => parentRef.current,
		// We use a fixed estimate for the card height + gap based on our LabOS design (164px)
		estimateSize: () => 164,
		overscan: 6,
		rangeExtractor: (range) => {
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
							"w-2.5 h-2.5 rounded-full shadow-sm",
							id === "NEW" ? "bg-blue-500 shadow-blue-500/20" : id === "ASSIGNED" ? "bg-slate-400 shadow-slate-400/20" : "bg-amber-500 animate-pulse shadow-amber-500/20",
						)}
					/>
					<h3 className="text-[11px] font-bold text-foreground uppercase tracking-widest">{title}</h3>
					<span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-border text-[10px] font-mono font-bold text-muted-foreground shadow-sm">{cases.length}</span>
				</div>

				{/* Contextual feedback when dragging over */}
				{isOver && (
					<div className="flex items-center gap-1.5 text-[10px] font-bold text-primary animate-in fade-in slide-in-from-right-2 uppercase tracking-widest">
						<CheckCircle2 className="w-3 h-3" /> Drop here
					</div>
				)}
			</div>

			{/* --- SCROLLABLE DROPPABLE AREA --- */}
			<div
				ref={setNodeRef}
				className={cn(
					"flex-1 rounded-[28px] transition-all duration-300 flex flex-col p-2 overflow-hidden border-2 border-transparent relative",
					isOver ? "bg-primary/[0.03] border-dashed border-primary/20 shadow-inner" : "bg-slate-50/50 dark:bg-white/[0.02]",
				)}
				// Performance Optimization: Promotes this container to its own rendering layer
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
												// transform-gpu: Uses hardware-accelerated translate3d
												transform: `translate3d(0, ${virtualRow.start}px, 0)`,
												paddingBottom: "12px",
												zIndex: 1,
												willChange: "transform",
											}}
										>
											<DesktopPipelineCard caseItem={caseItem} />
										</div>
									);
								})}
							</div>
						</SortableContext>
					) : (
						/* --- EMPTY STATE (Visual Relief) --- */
						!isOver && (
							<div className="h-full w-full flex flex-col items-center justify-center text-center opacity-30 animate-in fade-in duration-700">
								<div className="p-5 rounded-3xl bg-slate-200 dark:bg-white/5 mb-3 border border-border/50">
									<Layers className="w-8 h-8 text-muted-foreground" />
								</div>
								<p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Queue Empty</p>
								<p className="text-[9px] font-medium mt-1 text-muted-foreground/80">No cases in this production stage</p>
							</div>
						)
					)}
				</div>
			</div>
		</div>
	);
});

DesktopPipelineColumn.displayName = "DesktopPipelineColumn";
