"use client";

import React, { useMemo, useState } from "react";
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors, DragStartEvent, DragOverEvent, DragEndEvent, defaultDropAnimationSideEffects } from "@dnd-kit/core";
import { toast } from "sonner";

import { CaseStatus } from "@/schema/base/enums.base";
import { VALID_TRANSITIONS } from "@/lib/permissions/cases/clinical-status-rules";
import { useKanbanStore } from "../use-kanban-store";
import { CaseListDTO } from "@/schema/composed/case.details";
import { DesktopKanbanColumn } from "./desktop-column";
import { DesktopKanbanCard } from "./desktop-card";

// We define the specific production columns for the board
const COLUMNS: { id: CaseStatus; title: string }[] = [
	{ id: "NEW", title: "Intake" },
	{ id: "ASSIGNED", title: "Queue" },
	{ id: "PROCESSING", title: "Production" },
	{ id: "COMPLETED", title: "Verification" },
];

interface Props {
	// Notice we no longer pass `data`. It comes from the Zustand store!
	requestStatusTransition: (caseItem: CaseListDTO, newStatus: CaseStatus, oldStatus: CaseStatus) => void;
}

export function DesktopKanbanBoard({ requestStatusTransition }: Props) {
	// 1. ZUSTAND STORE CONNECTIONS
	const localCases = useKanbanStore((state) => state.localCases);
	const setIsDragging = useKanbanStore((state) => state.setIsDragging);

	// Local State for the dragging portal overlay
	const [activeCase, setActiveCase] = useState<CaseListDTO | null>(null);

	// Sensory Configuration: Require 8px drag distance before picking up a card
	// This prevents accidentally grabbing a card when clicking to open its dossier.
	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

	// 2. DATA GROUPING (Powered by Local State)
	const columnsData = useMemo(() => {
		// Initialize all possible statuses to avoid TypeScript index errors
		const cols: Record<CaseStatus, CaseListDTO[]> = {
			NEW: [],
			ASSIGNED: [],
			PROCESSING: [],
			COMPLETED: [],
			FAILED: [],
			DELIVERED: [],
			DRAFT: [],
		};

		// Distribute the data
		localCases.forEach((c) => {
			if (cols[c.status]) {
				cols[c.status].push(c);
			}
		});

		return cols;
	}, [localCases]);

	// --- DRAG HANDLERS ---
	const handleDragStart = (event: DragStartEvent) => {
		setIsDragging(true); // LOCK HYDRATION: Stop React Query from shifting cards under us!
		const { active } = event;
		setActiveCase(active.data.current as CaseListDTO);
	};

	const handleDragOver = (event: DragOverEvent) => {
		// dnd-kit handles intersection sorting natively over Droppable column refs
	};

	const handleDragEnd = async (event: DragEndEvent) => {
		setIsDragging(false); // UNLOCK HYDRATION
		setActiveCase(null);

		const { active, over } = event;
		if (!over) return;

		const caseItem = active.data.current as CaseListDTO;
		const newStatus = (over.id || over.data.current?.status) as CaseStatus;
		const oldStatus = caseItem.status;

		// 1. EXIT: Dropped in the same column
		if (oldStatus === newStatus) return;

		// 2. EXIT: Invalid transition based on strict Server Rules
		if (!VALID_TRANSITIONS[oldStatus]?.includes(newStatus)) {
			toast.error(`Invalid move. You cannot transition a case directly from ${oldStatus} to ${newStatus}.`);
			return;
		}

		// 3. EXECUTE: Pass the responsibility UP to the wrapper!
		// The wrapper will handle Warnings, Optimistic State, and Server Action execution.
		requestStatusTransition(caseItem, newStatus, oldStatus);
	};

	return (
		<DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
			{/* The main scrollable board track */}
			<div className="flex h-full w-full overflow-x-auto pb-6 custom-scrollbar gap-6 px-4 items-start pt-2">
				{COLUMNS.map((col) => (
					<DesktopKanbanColumn key={col.id} id={col.id} title={col.title} cases={columnsData[col.id]} />
				))}
			</div>

			{/* The floating card tied to your cursor */}
			<DragOverlay
				dropAnimation={{
					sideEffects: defaultDropAnimationSideEffects({
						styles: { active: { opacity: "0.4" } },
					}),
				}}
			>
				{activeCase ? <DesktopKanbanCard caseItem={activeCase} isOverlay /> : null}
			</DragOverlay>
		</DndContext>
	);
}
