"use client";

import { useEffect, useCallback, useState, memo } from "react";
import { CaseStatus } from "@/schema/base/enums.base";
import { useKanbanStore } from "./use-kanban-store";
import { CaseListDTO } from "@/schema/composed/case.details";
import { getStatusTransitionWarning } from "@/lib/permissions/cases/clinical-status-rules";
import { DesktopKanbanBoard } from "./kanban-desktop/desktop-board";
import { KanbanInterceptorDialog } from "./shared/interceptor-dialog";
import { MobileKanbanTabs } from "./kanban-mobile/mobile-board";

interface KanbanWrapperProps {
	serverData: CaseListDTO[];
	onStatusChangeAction: (caseId: string, newStatus: CaseStatus) => Promise<void>;
}

export const KanbanWrapper = memo(function KanbanWrapper({ serverData, onStatusChangeAction }: KanbanWrapperProps) {
	// 1. Connect to our high-performance store
	const syncCases = useKanbanStore((state) => state.syncCases);
	const moveCaseOptimistically = useKanbanStore((state) => state.moveCaseOptimistically);
	const revertCaseMove = useKanbanStore((state) => state.revertCaseMove);

	// --- INTERCEPTOR STATE ---
	const [pendingUpdate, setPendingUpdate] = useState<{ case: CaseListDTO; newStatus: CaseStatus; oldStatus: CaseStatus } | null>(null);
	const [warningMessage, setWarningMessage] = useState<string | null>(null);
	const [isUpdating, setIsUpdating] = useState(false);

	useEffect(() => {
		syncCases(serverData);
	}, [serverData, syncCases]);

	// --- THE EXECUTION ENGINE ---
	const executeTransition = useCallback(
		async (caseId: string, newStatus: CaseStatus, oldStatus: CaseStatus) => {
			setIsUpdating(true);

			// Optimistic UI Update (0ms latency)
			moveCaseOptimistically(caseId, newStatus);

			try {
				// Server Network Call
				await onStatusChangeAction(caseId, newStatus);

				// Clean up modal state if it was open
				setPendingUpdate(null);
				setWarningMessage(null);
			} catch (error) {
				// Rollback on failure
				revertCaseMove(caseId, oldStatus);
			} finally {
				setIsUpdating(false);
			}
		},
		[moveCaseOptimistically, onStatusChangeAction, revertCaseMove],
	);

	// --- THE GATEKEEPER ---
	// Both Desktop and Mobile call this when the user attempts a move
	const requestStatusTransition = useCallback(
		(caseItem: CaseListDTO, newStatus: CaseStatus, oldStatus: CaseStatus) => {
			// 1. Check for clinical warnings
			const warning = getStatusTransitionWarning(newStatus, caseItem.assignedRoles);

			if (warning) {
				// Catch the move and open the dialog
				setWarningMessage(warning);
				setPendingUpdate({ case: caseItem, newStatus, oldStatus });
				return;
			}

			// 2. If no warnings, execute immediately
			executeTransition(caseItem.id, newStatus, oldStatus);
		},
		[executeTransition],
	);

	const handleCancelWarning = () => {
		setPendingUpdate(null);
		setWarningMessage(null);
	};

	return (
		<div className="h-full w-full flex flex-col relative animate-in fade-in slide-in-from-right-4 duration-500">
			{/* --- DESKTOP VIEW (dnd-kit Board) --- */}
			<div className="hidden md:block h-full">
				<DesktopKanbanBoard requestStatusTransition={requestStatusTransition} />
			</div>

			{/* --- MOBILE VIEW (Tab & Tap Layout) --- */}
			<div className="md:hidden h-full flex flex-col">
				<MobileKanbanTabs requestStatusTransition={requestStatusTransition} />
			</div>

			{/* --- SHARED INTERCEPTOR MODAL --- */}
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
