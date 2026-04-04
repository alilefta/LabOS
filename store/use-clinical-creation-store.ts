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

	activeClinicId: string | null; // required for pricing plan

	activeCategoryName: string | null;

	// --- NEWLY CREATED IDs (Used by the Configurator to auto-select) ---
	newCreatedWorkTypeId: string | null;
	newCreatedProductId: string | null;
	newCreatedPricingId: string | null;

	// --- ACTIONS ---
	openWorkTypeSheet: (categoryId: string, categoryName: string) => void;
	openProductSheet: (workTypeId: string) => void;
	openPricingSheet: (productId: string, clinicId?: string | null) => void;

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
	activeClinicId: null,

	activeCategoryName: null,

	newCreatedWorkTypeId: null,
	newCreatedProductId: null,
	newCreatedPricingId: null,

	// Opens the sheet AND sets the parent ID it needs
	openWorkTypeSheet: (categoryId, categoryName) => set({ isWorkTypeSheetOpen: true, activeCategoryId: categoryId, activeCategoryName: categoryName }),
	openProductSheet: (workTypeId) => set({ isProductSheetOpen: true, activeWorkTypeId: workTypeId }),
	openPricingSheet: (productId, clinicId) => set({ isPricingSheetOpen: true, activeProductId: productId, activeClinicId: clinicId || null }),

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
