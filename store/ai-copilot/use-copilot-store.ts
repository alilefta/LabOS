import { CopilotMode } from "@/schema/composed/ai-copilot/suggestions";
import { create } from "zustand";

interface CopilotStore {
	isOpen: boolean;
	mode: CopilotMode;
	openCopilot: (mode: CopilotMode) => void;
	closeCopilot: () => void;
}

export const useCopilotStore = create<CopilotStore>((set) => ({
	isOpen: false,
	mode: "CASES", // default
	openCopilot: (mode) => set({ isOpen: true, mode }),
	closeCopilot: () => set({ isOpen: false }),
}));
