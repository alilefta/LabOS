import { create } from "zustand";

interface ClinicalCreationState {
	// --- MODAL VISIBILITY ---
	isWorkTypeSheetOpen: boolean;
	isProductSheetOpen: boolean;
	isPricingSheetOpen: boolean;

	// --- CONTEXT IDs (Passed to the Sheets so they know their parent) ---
	activeCategoryId: string | null;
	activeWorkTypeId: string | null;
	activeProductId: string | null;

	// --- NEWLY CREATED IDs (Used by the Configurator to auto-select) ---
	newCreatedWorkTypeId: string | null;
	newCreatedProductId: string | null;
	newCreatedPricingId: string | null;

	// --- ACTIONS ---
	openWorkTypeSheet: (categoryId: string) => void;
	openProductSheet: (workTypeId: string) => void;
	openPricingSheet: (productId: string) => void;

	closeAllSheets: () => void;

	setNewlyCreated: (type: "workType" | "product" | "pricing", id: string) => void;
	clearNewlyCreated: () => void;
}

export const useClinicalCreationStore = create<ClinicalCreationState>((set) => ({
	isWorkTypeSheetOpen: false,
	isProductSheetOpen: false,
	isPricingSheetOpen: false,

	activeCategoryId: null,
	activeWorkTypeId: null,
	activeProductId: null,

	newCreatedWorkTypeId: null,
	newCreatedProductId: null,
	newCreatedPricingId: null,

	// Opens the sheet AND sets the parent ID it needs
	openWorkTypeSheet: (categoryId) => set({ isWorkTypeSheetOpen: true, activeCategoryId: categoryId }),
	openProductSheet: (workTypeId) => set({ isProductSheetOpen: true, activeWorkTypeId: workTypeId }),
	openPricingSheet: (productId) => set({ isPricingSheetOpen: true, activeProductId: productId }),

	closeAllSheets: () =>
		set({
			isWorkTypeSheetOpen: false,
			isProductSheetOpen: false,
			isPricingSheetOpen: false,
		}),

	// Called by the Sheets on successful server action
	setNewlyCreated: (type, id) =>
		set((state) => {
			if (type === "workType") return { newCreatedWorkTypeId: id };
			if (type === "product") return { newCreatedProductId: id };
			if (type === "pricing") return { newCreatedPricingId: id };
			return state;
		}),

	clearNewlyCreated: () =>
		set({
			newCreatedWorkTypeId: null,
			newCreatedProductId: null,
			newCreatedPricingId: null,
		}),
}));
