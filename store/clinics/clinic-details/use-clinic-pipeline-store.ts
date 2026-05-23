import { create } from "zustand";
import { CaseStatus } from "@/schema/base/enums.base";
import { ClinicActiveCaseDTO } from "@/schema/composed/clinics/clinic-cases.dtos";

interface ClinicPipelineState {
	// --- 1. CORE STATE ---
	localCases: ClinicActiveCaseDTO[];
	isDragging: boolean; // The "Interaction Lock"

	// --- 2. SYNC & HYDRATION ---
	/**
	 * Synchronizes server data into the local store.
	 * It will ignore updates if the user is currently dragging
	 * to prevent UI "snapping" or layout shifts.
	 */
	syncCases: (serverCases: ClinicActiveCaseDTO[]) => void;

	/**
	 * Sets the dragging state to lock/unlock background hydration.
	 */
	setIsDragging: (dragging: boolean) => void;

	// --- 3. OPTIMISTIC MUTATIONS ---
	/**
	 * Instantly moves a case to a new column in the UI.
	 */
	moveCaseOptimistically: (caseId: string, newStatus: CaseStatus) => void;

	/**
	 * Reverts a case to its previous status if a server action fails.
	 */
	revertCaseMove: (caseId: string, previousStatus: CaseStatus) => void;
}

export const useClinicPipelineStore = create<ClinicPipelineState>((set, get) => ({
	localCases: [],
	isDragging: false,

	syncCases: (serverCases) => {
		const { isDragging } = get();

		// THE MAGIC LOCK:
		// If the user is physically interacting with the Kanban board,
		// we skip the background sync to maintain a smooth experience.
		if (isDragging) return;

		set({ localCases: serverCases });
	},

	setIsDragging: (dragging) => set({ isDragging: dragging }),

	moveCaseOptimistically: (caseId, newStatus) => {
		set((state) => ({
			localCases: state.localCases.map((c) => (c.id === caseId ? { ...c, status: newStatus } : c)),
		}));
	},

	revertCaseMove: (caseId, previousStatus) => {
		set((state) => ({
			localCases: state.localCases.map((c) => (c.id === caseId ? { ...c, status: previousStatus } : c)),
		}));
	},
}));
