"use client";

import { useEffect, useCallback, useState, memo } from "react";
import { CaseStatus } from "@/schema/base/enums.base";
import { useClinicPipelineStore } from "../use-clinic-pipeline-store";
import { getStatusTransitionWarning } from "@/lib/permissions/cases/clinical-status-rules";
import { ClinicActiveCaseDTO } from "@/schema/composed/clinics/clinic-cases.dtos";
import { MobilePipelineTabs } from "./kanban-mobile/mobile-pipeline-tabs";
import { DesktopPipelineBoard } from "./kanban-desktop/desktop-pipeline-board";
import { KanbanInterceptorDialog } from "@/components/cases/kanban/shared/interceptor-dialog";

interface ClinicActiveCasesKanbanProps {
	clinicId: string;
	serverData: ClinicActiveCaseDTO[];
	onStatusChangeAction: (caseId: string, newStatus: CaseStatus) => Promise<void>;
}

export const ClinicActiveCasesKanban = memo(function ClinicActiveCasesKanban({ serverData, onStatusChangeAction }: ClinicActiveCasesKanbanProps) {
	// 1. Hook into the highly-performant local store
	const syncCases = useClinicPipelineStore((state) => state.syncCases);
	const moveCaseOptimistically = useClinicPipelineStore((state) => state.moveCaseOptimistically);
	const revertCaseMove = useClinicPipelineStore((state) => state.revertCaseMove);

	// 2. INTERCEPTOR / TRANSITION STATE
	const [pendingUpdate, setPendingUpdate] = useState<{
		case: ClinicActiveCaseDTO;
		newStatus: CaseStatus;
		oldStatus: CaseStatus;
	} | null>(null);

	const [warningMessage, setWarningMessage] = useState<string | null>(null);
	const [isUpdating, setIsUpdating] = useState(false);

	// 3. HYDRATION: Sync server data into the interactive store
	useEffect(() => {
		syncCases(serverData);
	}, [serverData, syncCases]);

	// --- THE EXECUTION ENGINE ---
	// Handles the actual Server Action and UI rollback
	const executeTransition = useCallback(
		async (caseId: string, newStatus: CaseStatus, oldStatus: CaseStatus) => {
			setIsUpdating(true);

			// Step A: Move instantly in the UI (0ms latency)
			moveCaseOptimistically(caseId, newStatus);

			try {
				// Step B: Server Network Call
				await onStatusChangeAction(caseId, newStatus);

				// Step C: Success - Clear transition states
				setPendingUpdate(null);
				setWarningMessage(null);
			} catch (error) {
				// Step D: Failure - Physical rollback of the card to its original stage
				revertCaseMove(caseId, oldStatus);
			} finally {
				setIsUpdating(false);
			}
		},
		[moveCaseOptimistically, onStatusChangeAction, revertCaseMove],
	);

	// --- THE GATEKEEPER ---
	// This is the function passed to Desktop/Mobile children
	const requestStatusTransition = useCallback(
		(caseItem: ClinicActiveCaseDTO, newStatus: CaseStatus, oldStatus: CaseStatus) => {
			// 1. Run Clinical Business Rules
			// (e.g., is a technician assigned? is a scan uploaded?)
			// You can adapt your existing rule engine here
			const warning = getStatusTransitionWarning(newStatus, []); // Adjust params as needed

			if (warning) {
				// 2. INTERCEPT: Block the move and ask the user for confirmation
				setWarningMessage(warning);
				setPendingUpdate({ case: caseItem, newStatus, oldStatus });
				return;
			}

			// 3. PROCEED: If no rules are violated, execute immediately
			executeTransition(caseItem.id, newStatus, oldStatus);
		},
		[executeTransition],
	);

	const handleCancelWarning = useCallback(() => {
		setPendingUpdate(null);
		setWarningMessage(null);
	}, []);

	return (
		<div className="h-full w-full flex flex-col relative animate-in fade-in slide-in-from-bottom-4 duration-700">
			{/* --- VIEWPORT SWITCHER --- */}

			{/* DESKTOP: DnD-Kit Virtualized Board */}
			<div className="hidden md:block h-full">
				<DesktopPipelineBoard requestStatusTransition={requestStatusTransition} />
			</div>

			{/* MOBILE: Tabbed Tap-to-Move Interface */}
			<div className="md:hidden h-full flex flex-col">
				<MobilePipelineTabs requestStatusTransition={requestStatusTransition} />
			</div>

			{/* --- SHARED INTERCEPTOR DIALOG --- */}
			{/* Keeps the logic out of the Kanban boards themselves */}
			<KanbanInterceptorDialog
				isOpen={pendingUpdate !== null}
				isUpdating={isUpdating}
				warningMessage={warningMessage}
				onCancel={handleCancelWarning}
				onConfirm={() => {
					if (pendingUpdate) {
						executeTransition(pendingUpdate.case.id, pendingUpdate.newStatus, pendingUpdate.oldStatus);
					}
				}}
			/>
		</div>
	);
});
