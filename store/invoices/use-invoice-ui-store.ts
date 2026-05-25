// store/use-invoice-ui-store.ts

import { create } from "zustand";

// This is a common, lightweight shape that both DTOs can easily satisfy
export interface PaymentTarget {
	id: string;
	invoiceNumber: string;
	amountDue: number;
	total: number;
	clinicName?: string; // Optional because the detail page already has the name
}

interface InvoiceUiState {
	paymentInvoice: PaymentTarget | null;
	openPaymentSheet: (invoice: PaymentTarget) => void;
	closePaymentSheet: () => void;
}

export const useInvoiceUiStore = create<InvoiceUiState>((set) => ({
	paymentInvoice: null,

	openPaymentSheet: (invoice) => set({ paymentInvoice: invoice }),
	closePaymentSheet: () => set({ paymentInvoice: null }),
}));
