"use client";

import { useMemo, useState } from "react";
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors, DragStartEvent, DragOverEvent, DragEndEvent, defaultDropAnimationSideEffects } from "@dnd-kit/core";
import { CaseStatus } from "@/schema/base/enums.base";
import { CaseListDTO } from "@/schema/composed/case.details";

import { getStatusTransitionWarning, VALID_TRANSITIONS } from "@/lib/permissions/cases/clinical-status-rules";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AlertTriangle, Loader2 } from "lucide-react";
import { DesktopKanbanColumn } from "./kanban-desktop/desktop-column";

const COLUMNS: { id: CaseStatus; title: string }[] = [
	{ id: "NEW", title: "Intake" },
	{ id: "ASSIGNED", title: "Queue" },
	{ id: "PROCESSING", title: "Production" },
	{ id: "COMPLETED", title: "Verification" },
];

interface Props {
	data: CaseListDTO[];
	onStatusChange: (caseId: string, newStatus: CaseStatus) => void;
}

export function KanbanBoard({ data, onStatusChange }: Props) {
	const [activeCase, setActiveCase] = useState<CaseListDTO | null>(null);
	// Intercept State
	const [pendingUpdate, setPendingUpdate] = useState<{ id: string; status: CaseStatus } | null>(null);
	const [warningMessage, setWarningMessage] = useState<string | null>(null);
	const [isUpdating, setIsUpdating] = useState(false);
	// 1. Sensory Configuration
	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

	// 2. Data Grouping
	const columnsData = useMemo(() => {
		const cols: Record<string, CaseListDTO[]> = { NEW: [], ASSIGNED: [], PROCESSING: [], COMPLETED: [], FAILED: [], DELIVERED: [], DRAFT: [] };
		data.forEach((c) => {
			if (cols[c.status]) cols[c.status].push(c);
		});
		return cols;
	}, [data]);

	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;
		setActiveCase(active.data.current as CaseListDTO);
	};

	// --- THE SMOOTHNESS FIX: handleDragOver ---
	// This ensures that as you move a card between columns, the other cards
	// physically move out of the way before you even release the mouse.
	const handleDragOver = (event: DragOverEvent) => {
		const { active, over } = event;
		if (!over) return;

		const activeId = active.id;
		const overId = over.id;

		// Find the columns
		const activeColumn = active.data.current?.status;
		const overColumn = over.data.current?.status || over.id; // Fallback to id if dropping on empty column

		if (activeColumn !== overColumn) {
			// In a more complex app, we would update local state here to move cards
			// between columns instantly. For now, dnd-kit will handle the visual
			// intersection via the Droppable Column ref.
		}
	};

	const handleDragEnd = async (event: DragEndEvent) => {
		const { active, over } = event;
		setActiveCase(null);

		if (!over) return;

		const caseId = active.id as string;
		const newStatus = over.id as CaseStatus;
		const oldStatus = active.data.current?.status as CaseStatus;

		// 1. EXIT: Dropped in same column
		if (oldStatus === newStatus) return;

		// 2. EXIT: Invalid transition based on Server Rules
		if (!VALID_TRANSITIONS[oldStatus]?.includes(newStatus)) {
			// Toast "Invalid move" here if desired
			return;
		}

		// 3. INTERCEPT: Check for clinical warnings
		// Since CaseListDTO doesn't have full assignments, we check if technician is null
		const warning = getStatusTransitionWarning(newStatus, active.data.current?.leadTechnician ? [{ roleCategory: "TECHNICIAN" }] : []);

		if (warning) {
			setWarningMessage(warning);
			setPendingUpdate({ id: caseId, status: newStatus });
			return;
		}

		// 4. EXECUTE: No warnings, proceed to server
		executeMove(caseId, newStatus);
	};

	const executeMove = async (id: string, status: CaseStatus) => {
		setIsUpdating(true);
		try {
			await onStatusChange(id, status);
		} finally {
			setPendingUpdate(null);
			setWarningMessage(null);
			setIsUpdating(false);
		}
	};

	return (
		<DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
			<div className="flex h-full w-full overflow-x-auto pb-6 custom-scrollbar gap-6 px-4 items-start">
				{/* {COLUMNS.map((col) => (
					// <DesktopKanbanColumn key={col.id} id={col.id} title={col.title} cases={columnsData[col.id]} />
				))} */}
			</div>

			<DragOverlay dropAnimation={{ sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: "0.4" } } }) }}>
				{/* {activeCase ? <KanbanCard caseItem={activeCase} isOverlay /> : null} */}
			</DragOverlay>

			{/* --- THE INTERCEPTOR DIALOG --- */}
			<AlertDialog open={pendingUpdate !== null} onOpenChange={(open) => !open && !isUpdating && setPendingUpdate(null)}>
				<AlertDialogContent className="rounded-2xl border-border shadow-premium dark:bg-[#121214]">
					<AlertDialogHeader>
						<div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border bg-amber-500/10 border-amber-500/20 text-amber-500">
							<AlertTriangle className="w-6 h-6" />
						</div>
						<AlertDialogTitle className="text-xl font-bold tracking-tight">Production Warning</AlertDialogTitle>
						<AlertDialogDescription className="text-sm text-muted-foreground leading-relaxed mt-2">{warningMessage}</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className="mt-6 gap-3">
						<AlertDialogCancel disabled={isUpdating} className="rounded-xl h-10 font-semibold">
							Cancel Move
						</AlertDialogCancel>
						<AlertDialogAction
							disabled={isUpdating}
							onClick={(e) => {
								e.preventDefault(); // Prevent closing before async finish
								if (pendingUpdate) executeMove(pendingUpdate.id, pendingUpdate.status);
							}}
							className="rounded-xl h-10 bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-sm"
						>
							{isUpdating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
							Continue Anyway
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</DndContext>
	);
}
