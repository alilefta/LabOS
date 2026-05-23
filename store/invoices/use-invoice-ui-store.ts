import { InvoiceListDTO } from "@/schema/composed/invoices/invoices.dtos";
import { create } from "zustand";

interface InvoiceUiState {
	paymentInvoice: InvoiceListDTO | null;
	openPaymentSheet: (invoice: InvoiceListDTO) => void;
	closePaymentSheet: () => void;
}

export const useInvoiceUiStore = create<InvoiceUiState>((set) => ({
	paymentInvoice: null,

	openPaymentSheet: (invoice) => set({ paymentInvoice: invoice }),
	closePaymentSheet: () => set({ paymentInvoice: null }),
}));
