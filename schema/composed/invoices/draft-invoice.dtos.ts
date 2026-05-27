// schema/composed/invoices/draft-invoice.dtos.ts

import { InvoiceStatus } from "@/schema/base/enums.base"; // Adjust to your path

// 1. The DTO passed from the Server Page to the Client Wrapper
export type DraftInvoiceHydrationDTO = {
	id: string;
	clinicId: string;
	discountPercentage: number;
	discountReason: string;
	notes: string;
	customDueDate: Date | undefined;
	billingTerms: "RECEIPT" | "NET15" | "NET30" | "CUSTOM";
	caseIds: string[]; // Flat array of selected cases
	clinicPhoneNumber: string;
};

// 2. The Internal Type for the Data Access Function
export type DraftInvoiceDBResult = {
	id: string;
	invoiceNumber: string;
	status: InvoiceStatus;
	notes: string | null;
	appliedDiscountPercentage: number | null; // Note: Prisma Decimal returns as an object, needs mapping
	discountReason: string | null;
	dueDate: Date | null;
	clinic: {
		id: string;
		name: string;
		phoneNumber: string;
	};
	cases: {
		caseId: string;
	}[];
};
