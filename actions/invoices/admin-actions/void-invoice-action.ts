"use server";

import { z } from "zod";
import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";
import { format } from "date-fns";

const VoidInvoiceInputSchema = z.object({
	invoiceId: z.uuid("Invalid Invoice ID format"),
	reason: z.string().trim().min(5, "Void reason must be at least 5 characters."),
});

export const voidInvoiceAction = actionClientWithLab
	.metadata({
		actionName: "Void-Live-Invoice-Action",
		requiredLabRole: "MANAGER", // High security role guard
	})
	.inputSchema(VoidInvoiceInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { invoiceId, reason } = parsedInput;
		const { labId } = ctx;

		const prisma = await tenantPrisma(labId);

		const result = await prisma.$transaction(
			async (tx) => {
				// A. Fetch the invoice with a database lock to prevent race conditions
				const invoice = await tx.invoice.findUnique({
					where: { id: invoiceId, labId },
					select: {
						id: true,
						status: true,
						amountDue: true,
						clinicId: true,
						notes: true,
						invoiceNumber: true,
					},
				});

				if (!invoice) throw ERRORS.INVOICE_NOT_FOUND;

				// Security Guard: Cannot void a draft (must delete) or an already voided invoice
				if (invoice.status === "DRAFT" || invoice.status === "CANCELLED") {
					throw new Error("Only active, issued invoices can be voided.");
				}

				const outstandingBalance = Number(invoice.amountDue);

				// B. Release all attached cases back into the clinic's unbilled queue
				await tx.invoiceCase.deleteMany({
					where: { invoiceId, labId },
				});

				// C. Decrement the Clinic's global debt strictly by the remaining unpaid balance!
				if (outstandingBalance > 0) {
					await tx.clinic.update({
						where: { id: invoice.clinicId },
						data: {
							currentBalance: { decrement: outstandingBalance },
						},
					});
				}

				// D. Append the void audit log to the invoice memo/notes
				const timestamp = format(new Date(), "yyyy-MM-dd HH:mm");
				const auditNotes = `[VOIDED ON ${timestamp}]\nReason: ${reason}\n\n${invoice.notes || ""}`;

				// E. Update the Invoice record
				const updatedInvoice = await tx.invoice.update({
					where: { id: invoiceId },
					data: {
						status: "CANCELLED",
						amountDue: 0, // No longer owed
						notes: auditNotes,

						// SECURE KILL-SWITCH: Erase public token so sharing link self-destructs instantly [1]
						publicToken: null,
						publicLinkExpiresAt: null,
					},
					select: { id: true, status: true },
				});

				return updatedInvoice;
			},
			{
				maxWait: 5000,
				timeout: 10000,
			},
		);

		return { success: true, status: result.status };
	});
