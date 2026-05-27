// data/invoices/get-draft-invoice.ts

import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";
import { daError, daSuccess, toDAError, DAResult } from "@/lib/data-access-errors";
import { DraftInvoiceDBResult } from "@/schema/composed/invoices/draft-invoice.dtos";

export async function getDraftInvoiceForEdit(invoiceId: string, labId: string): Promise<DAResult<DraftInvoiceDBResult>> {
	try {
		const prisma = await tenantPrisma(labId);

		const invoice = await prisma.invoice.findUnique({
			where: { id: invoiceId, labId },
			select: {
				id: true,
				invoiceNumber: true,
				status: true,
				notes: true,
				appliedDiscountPercentage: true,
				discountReason: true,

				dueDate: true,
				clinic: {
					select: { id: true, name: true, phoneNumber: true },
				},
				cases: {
					select: { caseId: true },
				},
			},
		});

		if (!invoice) return daError(ERRORS.INVOICE_NOT_FOUND.toJSON());

		// Safely map Prisma Decimals to native TypeScript numbers
		const mappedInvoice: DraftInvoiceDBResult = {
			id: invoice.id,
			invoiceNumber: invoice.invoiceNumber,
			status: invoice.status,
			notes: invoice.notes,
			appliedDiscountPercentage: invoice.appliedDiscountPercentage ? Number(invoice.appliedDiscountPercentage) : null,
			discountReason: invoice.discountReason,
			dueDate: invoice.dueDate,
			clinic: {
				id: invoice.clinic.id,
				name: invoice.clinic.name,
				phoneNumber: invoice.clinic.phoneNumber,
			},
			cases: invoice.cases,
		};

		return daSuccess(mappedInvoice);
	} catch (e) {
		return toDAError(e);
	}
}
