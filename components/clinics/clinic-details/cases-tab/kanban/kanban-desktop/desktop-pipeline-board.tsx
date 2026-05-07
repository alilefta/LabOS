"use client";

import { useCallback, useMemo, useState } from "react";
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors, DragStartEvent, DragEndEvent, defaultDropAnimationSideEffects } from "@dnd-kit/core";
import { toast } from "sonner";

import { CaseStatus, CaseStatusSchema } from "@/schema/base/enums.base";
import { VALID_TRANSITIONS } from "@/lib/permissions/cases/clinical-status-rules";
import { useClinicPipelineStore } from "@/components/clinics/clinic-details/cases-tab/use-clinic-pipeline-store";
import { DesktopPipelineColumn } from "./desktop-pipeline-column";
import { DesktopPipelineCard } from "./desktop-pipeline-card";
import { ClinicActiveCaseDTO } from "@/schema/composed/clinics/clinic-cases.dtos";

// We define the specific production columns for the clinic-level board
const COLUMNS: { id: CaseStatus; title: string }[] = [
	{ id: "NEW", title: "Intake / New" },
	{ id: "ASSIGNED", title: "Lab Queue" },
	{ id: "PROCESSING", title: "In Production" },
	{ id: "COMPLETED", title: "Verification & Dispatch" },
];

interface Props {
	requestStatusTransition: (caseItem: ClinicActiveCaseDTO, newStatus: CaseStatus, oldStatus: CaseStatus) => void;
}

export function DesktopPipelineBoard({ requestStatusTransition }: Props) {
	// 1. ZUSTAND STORE CONNECTIONS
	const localCases = useClinicPipelineStore((state) => state.localCases);
	const setIsDragging = useClinicPipelineStore((state) => state.setIsDragging);

	// Local state for the dragging portal (The "Ghost" card)
	const [activeCase, setActiveCase] = useState<ClinicActiveCaseDTO | null>(null);

	// 2. SENSORY CONFIGURATION
	// Require 8px drag distance. This is CRITICAL so users can click
	// the Case ID link or Patient name without accidentally starting a drag.
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 8 },
		}),
	);

	// 3. DATA GROUPING (Optimized via Memo)
	// Filters the local store into the three production tracks
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

	// --- DRAG HANDLERS ---

	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;
		const caseData = active.data.current as ClinicActiveCaseDTO;

		setIsDragging(true);
		setActiveCase(caseData);
	};

	const handleDragEnd = useCallback(
		(event: DragEndEvent) => {
			setIsDragging(false);
			setActiveCase(null);

			const { active, over } = event;
			if (!over) return;

			const caseItem = active.data.current as ClinicActiveCaseDTO;

			// Resolve the drop target status (either a column ID or a card's status)
			const rawNewStatus = over.data.current?.status || over.id;

			// SAFETY: Validate the drop target is a valid CaseStatus enum
			const statusParse = CaseStatusSchema.safeParse(rawNewStatus);
			if (!statusParse.success) return;

			const newStatus = statusParse.data;
			const oldStatus = caseItem.status;

			// 1. EXIT: No movement
			if (oldStatus === newStatus) return;

			// 2. EXIT: Business Rule Violation
			if (!VALID_TRANSITIONS[oldStatus]?.includes(newStatus)) {
				toast.error(`Workflow Restriction`, {
					description: `You cannot move a case directly from ${oldStatus.toLowerCase()} to ${newStatus.toLowerCase()}.`,
				});
				return;
			}

			// 3. PROCEED: Hand over to the Wrapper's logic engine
			requestStatusTransition(caseItem, newStatus, oldStatus);
		},
		[requestStatusTransition, setIsDragging],
	);

	return (
		<DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
			{/* 
            THE FIX: 
            1. Removed `items-start`, allowing columns to stretch to 100% height automatically.
            2. Added `min-w-max` to the inner div if you want to force horizontal scroll on small screens, 
               OR keep `w-full` to allow them to divide the space.
        */}
			<div className="flex  h-full w-full overflow-x-auto pb-6 custom-scrollbar gap-4 lg:gap-6 pt-2 px-1 items-start ">
				{COLUMNS.map((col) => (
					<DesktopPipelineColumn key={col.id} id={col.id} title={col.title} cases={columnsData[col.id]} />
				))}
			</div>

			{/* THE FLOATING PORTAL OVERLAY */}
			{/* Makes the card look like it's physically lifted above the UI */}
			<DragOverlay
				dropAnimation={{
					sideEffects: defaultDropAnimationSideEffects({
						styles: { active: { opacity: "0.4" } },
					}),
				}}
			>
				{activeCase ? (
					<div className="cursor-grabbing">
						<DesktopPipelineCard caseItem={activeCase} isOverlay />
					</div>
				) : null}
			</DragOverlay>
		</DndContext>
	);
}
