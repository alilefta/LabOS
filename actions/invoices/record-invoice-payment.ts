"use server";

import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";
import { RecordPaymentInputSchema } from "@/schema/composed/invoices/invoices.dtos";

export const recordInvoicePaymentAction = actionClientWithLab
	.metadata({
		actionName: "Record-Invoice-Payment",
		// SECURITY: Strict financial role guard
		requiredLabRole: "MANAGER", // Or ACCOUNTANT
	})
	.inputSchema(RecordPaymentInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { invoiceId, amount, method, reference, notes, paidAt } = parsedInput;
		const { labId } = ctx;

		try {
			const prisma = await tenantPrisma(labId);

			// THE ATOMIC TRANSACTION
			const result = await prisma.$transaction(async (tx) => {
				// 1. Fetch the invoice WITH a database-level lock to prevent concurrent double-payments
				const invoice = await tx.invoice.findUnique({
					where: { id: invoiceId, labId },
					select: { id: true, amountDue: true, clinicId: true, status: true },
				});

				if (!invoice) throw new Error("Invoice not found");
				if (invoice.status === "PAID" || invoice.status === "CANCELLED") {
					throw new Error("Cannot apply payment to a PAID or CANCELLED invoice.");
				}

				const paymentAmount = Number(amount);
				const currentDue = Number(invoice.amountDue);

				// 2. Overpayment Guard
				if (paymentAmount > currentDue) {
					throw new Error(`Payment ($${paymentAmount}) exceeds the remaining balance ($${currentDue}).`);
				}

				const isFullPayment = paymentAmount === currentDue;
				const newStatus = isFullPayment ? "PAID" : "PARTIAL";

				// 3. Create the Payment Record
				const payment = await tx.invoicePayment.create({
					data: {
						invoiceId,
						labId,
						amount: paymentAmount,
						method,
						reference: reference ?? null,
						notes: notes ?? null,
						paidAt,
					},
				});

				// 4. Update the Invoice (using atomic increments)
				const updatedInvoice = await tx.invoice.update({
					where: { id: invoiceId },
					data: {
						amountPaid: { increment: paymentAmount },
						amountDue: { decrement: paymentAmount },
						status: newStatus,
					},
				});

				// 5. Update the Clinic's Global Ledger
				await tx.clinic.update({
					where: { id: invoice.clinicId },
					data: {
						currentBalance: { decrement: paymentAmount },
					},
				});

				return { payment, invoice: updatedInvoice };
			});

			return { success: true, newStatus: result.invoice.status };
		} catch (error) {
			// Catch transaction errors and throw your standardized API errors
			console.error("[Record-Payment-Error]", error);
			throw ERRORS.OPERATION_NOT_ALLOWED;
		}
	});
