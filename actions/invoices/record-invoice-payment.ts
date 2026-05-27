"use server";

import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";
import { RecordPaymentInputSchema } from "@/schema/composed/invoices/invoices.dtos";
import { z } from "zod";
import { buildLogEntry, resolveActorName } from "@/data/activity-logs/build-activity-log";
import { PaymentRecordedPayloadSchema } from "@/schema/composed/case-activity-logs.details";

export const recordInvoicePaymentAction = actionClientWithLab
	.metadata({
		actionName: "Record-Invoice-Payment",
		// SECURITY: Strict financial role guard
		requiredLabRole: "MANAGER", // Or ACCOUNTANT
	})
	.inputSchema(RecordPaymentInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { invoiceId, amount, method, reference, notes, paidAt } = parsedInput;
		const { labId, labUser } = ctx;

		const prisma = await tenantPrisma(labId);
		const actorName = await resolveActorName(labUser.id, labId);

		// THE ATOMIC TRANSACTION
		const result = await prisma.$transaction(async (tx) => {
			// 1. Fetch the invoice and the linked cases for logging
			const invoice = await tx.invoice.findUnique({
				where: { id: invoiceId, labId },
				select: {
					id: true,
					invoiceNumber: true,
					amountPaid: true,
					amountDue: true,
					clinicId: true,
					status: true,
					dueDate: true,
					cases: { select: { caseId: true } }, // Needed for Audit Logging
				},
			});

			if (!invoice) throw ERRORS.INVOICE_NOT_FOUND;

			// GUARD: Prevent modifying terminal states
			if (invoice.status === "PAID" || invoice.status === "CANCELLED") {
				throw ERRORS.OPERATION_NOT_ALLOWED;
			}

			const paymentAmount = Number(amount);
			const previousAmountPaid = Number(invoice.amountPaid);
			const expectedRemainingDue = Number(invoice.amountDue) - paymentAmount;

			// GUARD: Immediate pre-check for overpayment
			if (expectedRemainingDue < 0) {
				throw ERRORS.INVALID_INPUT; // "Payment exceeds the remaining balance"
			}

			// 2. Determine the correct resulting status
			const isFullPayment = expectedRemainingDue === 0;
			const isCurrentlyOverdue = invoice.status === "OVERDUE" || (invoice.dueDate && invoice.dueDate < new Date());

			// If it's fully paid, it's PAID. Otherwise, if it was overdue, it stays OVERDUE. Else, PARTIAL.
			const newStatus = isFullPayment ? "PAID" : isCurrentlyOverdue ? "OVERDUE" : "PARTIAL";

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

			// 4. Update the Invoice (Using Atomic Math)
			const updatedInvoice = await tx.invoice.update({
				where: { id: invoiceId },
				data: {
					amountPaid: { increment: paymentAmount },
					amountDue: { decrement: paymentAmount },
					status: newStatus,
				},
			});

			// CONCURRENCY GUARD: Post-Update Validation
			// If two requests fired simultaneously, the atomic decrement will push the balance below 0.
			// Checking it here triggers an automatic Prisma Rollback of the entire transaction!
			if (Number(updatedInvoice.amountDue) < 0) {
				throw ERRORS.INVALID_INPUT;
			}

			// 5. Update the Clinic's Global Ledger (Atomic Decrement)
			await tx.clinic.update({
				where: { id: invoice.clinicId },
				data: {
					currentBalance: { decrement: paymentAmount },
				},
			});

			// 6. Write to the Case Activity Logs (Audit Trail)
			if (invoice.cases.length > 0) {
				await tx.caseActivityLog.createMany({
					data: invoice.cases.map((ic) =>
						buildLogEntry({
							caseId: ic.caseId,
							labId,
							actorId: labUser.id,
							actorName,
							type: "PAYMENT_RECORDED",
							summary: `Payment of $${paymentAmount.toFixed(2)} applied via ${method.replace("_", " ")}`,
							payload: {
								invoiceId: invoice.id,
								invoiceNumber: invoice.invoiceNumber,
								amount: paymentAmount,
								method: method,
								reference: reference ?? null,
								previousAmountPaid: previousAmountPaid,
								newAmountPaid: Number(updatedInvoice.amountPaid),
								newStatus: newStatus,
							} as z.infer<typeof PaymentRecordedPayloadSchema>,
						}),
					),
				});
			}

			return { payment, invoice: updatedInvoice };
		});

		return { success: true, newStatus: result.invoice.status };
	});
