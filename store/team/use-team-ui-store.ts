// store/use-team-ui-store.ts
import { create } from "zustand";

interface TeamUiState {
	isRegisterSheetOpen: boolean;
	openRegisterSheet: () => void;
	closeRegisterSheet: () => void;
}

export const useTeamUiStore = create<TeamUiState>((set) => ({
	isRegisterSheetOpen: false,
	openRegisterSheet: () => set({ isRegisterSheetOpen: true }),
	closeRegisterSheet: () => set({ isRegisterSheetOpen: false }),
}));
