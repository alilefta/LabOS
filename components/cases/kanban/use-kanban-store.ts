import { create } from "zustand";
import { CaseStatus } from "@/schema/base/enums.base";
import { CaseListDTO } from "@/schema/composed/case.details";

interface KanbanState {
	// --- 1. STATE ---
	localCases: CaseListDTO[];
	isDragging: boolean;

	// --- 2. HYDRATION ---
	// Syncs React Query data into local state (Ignores if user is actively dragging)
	syncCases: (serverCases: CaseListDTO[]) => void;
	setIsDragging: (dragging: boolean) => void;

	// --- 3. OPTIMISTIC MUTATIONS ---
	// Moves the card instantly in the UI, before the server even knows about it
	moveCaseOptimistically: (caseId: string, newStatus: CaseStatus) => void;

	// Reverts the card if the server action fails or the user cancels the warning
	revertCaseMove: (caseId: string, previousStatus: CaseStatus) => void;
}

export const useKanbanStore = create<KanbanState>((set, get) => ({
	localCases: [],
	isDragging: false,

	syncCases: (serverCases) => {
		const { isDragging } = get();
		// THE MAGIC LOCK: Do not overwrite local state if the user is physically interacting with the board!
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
