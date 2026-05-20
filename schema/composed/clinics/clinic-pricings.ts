import { InvoiceStatus, PricingStrategy } from "@/schema/base/enums.base";

export type ClinicPricingPlanDTO = {
	id: string;
	name: string;
	pricingStrategy: PricingStrategy;
	productName: string | null;
	workTypeName: string | null;
	details: {
		bulkPrice: number | null;
		toothPrice: number | null;
		firstToothPrice: number | null;
		additionalToothPrice: number | null;
		teethCountToApplyBulkPrice: number | null;
	};
	standardComparison: {
		price: number | null; // The lab default price for same product
		discountPercent: number | null; // How much cheaper this clinic gets it
	} | null;
};

export type ClinicInvoiceListDTO = {
	id: string;
	invoiceNumber: string;
	status: InvoiceStatus;
	issuedAt: Date | null;
	dueDate: Date | null;
	total: number;
	amountDue: number;
};
