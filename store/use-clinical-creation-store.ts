import { JawType, PricingStrategy } from '@/schema/base/enums.base'
import { create } from 'zustand'

interface ClinicalCreationState {
	// --- MODAL VISIBILITY ---
	isWorkTypeSheetOpen: boolean
	isProductSheetOpen: boolean
	isPricingSheetOpen: boolean

	// --- CONTEXT IDs (Passed to the Sheets so they know their parent) ---
	activeCategoryId: string | null
	activeWorkTypeId: string | null
	activeProductId: string | null
	activeClinicId: string | null
	activeCategoryName: string | null
	activeJawType: JawType | null

	// --- NEWLY CREATED IDs (Used by the Configurator to auto-select) ---
	newCreatedWorkTypeId: string | null
	newCreatedProductId: string | null
	newCreatedPricingId: string | null

	requiredPricingStrategy: PricingStrategy | null

	// --- ACTIONS ---
	// 🔥 DX FIX: Made parameters optional and nullable so this can be invoked globally from the Catalog Header
	openWorkTypeSheet: (
		categoryId?: string | null,
		categoryName?: string | null,
		selectedJawType?: JawType | null,
	) => void
	openProductSheet: (workTypeId: string) => void
	openPricingSheet: (
		productId: string,
		clinicId?: string | null,
		requiredPricingStrategy?: PricingStrategy | null,
	) => void

	closeAllSheets: () => void

	setNewlyCreated: (
		type: 'workType' | 'product' | 'pricing',
		id: string,
	) => void

	// Function to safely destroy a specific ID after it has been used by the UI
	consumeNewlyCreated: (type: 'workType' | 'product' | 'pricing') => void

	clearNewlyCreated: () => void
}

export const useClinicalCreationStore = create<ClinicalCreationState>(
	(set) => ({
		isWorkTypeSheetOpen: false,
		isProductSheetOpen: false,
		isPricingSheetOpen: false,

		activeCategoryId: null,
		activeWorkTypeId: null,
		activeProductId: null,
		activeClinicId: null,

		activeCategoryName: null,
		activeJawType: null,

		newCreatedWorkTypeId: null,
		newCreatedProductId: null,
		newCreatedPricingId: null,

		requiredPricingStrategy: null,

		openWorkTypeSheet: (categoryId, categoryName, selectedJawType) =>
			set({
				isWorkTypeSheetOpen: true,
				// Safely default undefined inputs to null to maintain strict schema typing
				activeCategoryId: categoryId || null,
				activeCategoryName: categoryName || null,
				activeJawType: selectedJawType || null,
			}),

		openProductSheet: (workTypeId) =>
			set({ isProductSheetOpen: true, activeWorkTypeId: workTypeId }),

		openPricingSheet: (productId, clinicId, requiredPricingStrategy) =>
			set({
				isPricingSheetOpen: true,
				activeProductId: productId,
				activeClinicId: clinicId || null,
				requiredPricingStrategy: requiredPricingStrategy || null,
			}),

		closeAllSheets: () =>
			set({
				isWorkTypeSheetOpen: false,
				isProductSheetOpen: false,
				isPricingSheetOpen: false,
				// Clean up context on close to prevent data leaks between consecutive modals
				activeCategoryId: null,
				activeWorkTypeId: null,
				activeProductId: null,
				activeClinicId: null,
				activeCategoryName: null,
				activeJawType: null,
				requiredPricingStrategy: null,
			}),

		setNewlyCreated: (type, id) =>
			set((state) => {
				if (type === 'workType') return { newCreatedWorkTypeId: id }
				if (type === 'product') return { newCreatedProductId: id }
				if (type === 'pricing') return { newCreatedPricingId: id }
				return state
			}),

		consumeNewlyCreated: (type) =>
			set((state) => {
				if (type === 'workType') return { newCreatedWorkTypeId: null }
				if (type === 'product') return { newCreatedProductId: null }
				if (type === 'pricing') return { newCreatedPricingId: null }
				return state
			}),

		clearNewlyCreated: () =>
			set({
				newCreatedWorkTypeId: null,
				newCreatedProductId: null,
				newCreatedPricingId: null,
			}),
	}),
)
