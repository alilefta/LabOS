// store/use-reassign-ui-store.ts

import { StaffRoleCategory } from "@/schema/base/enums.base";
import { create } from "zustand";

interface ReassignUiState {
	isOpen: boolean;
	caseIds: string[]; // Supports multiple selections [3]
	roleCategory: StaffRoleCategory; // e.g. "TECHNICIAN"

	// Actions
	openReassignSheet: (caseIds: string[], roleCategory: StaffRoleCategory) => void;
	closeReassignSheet: () => void;
}

export const useReassignUiStore = create<ReassignUiState>((set) => ({
	isOpen: false,
	caseIds: [],
	roleCategory: "TECHNICIAN",

	openReassignSheet: (caseIds, roleCategory) => set({ isOpen: true, caseIds, roleCategory }),
	closeReassignSheet: () => set({ isOpen: false, caseIds: [] }),
}));
