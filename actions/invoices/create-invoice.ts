"use server";

import { addDays, startOfDay } from "date-fns";
import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";
import { CreateInvoiceInputSchema } from "@/schema/composed/invoices/new-invoice.schema";

export const createInvoiceAction = actionClientWithLab
	.metadata({
		actionName: "Create-Invoice-Action",
		// SECURITY: Only roles that deal with finance or management can generate invoices
		requiredLabRole: "MANAGER", // Adjust to "ACCOUNTANT" if you prefer
	})
	.inputSchema(CreateInvoiceInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { labId } = ctx;
		const { clinicId, caseIds, status, billingTerms, customDueDate, discountPercentage, discountReason, notes } = parsedInput;

		const prisma = await tenantPrisma(labId);

		// ── 1. DATE MATH ENGINE ─────────────────────────────────────────
		const today = startOfDay(new Date());
		let resolvedDueDate: Date | null = null;

		// We only set a due date if the invoice is actually being SENT today.
		// Drafts don't have an issuedAt or dueDate until they are finalized.
		if (status === "SENT") {
			if (billingTerms === "RECEIPT") resolvedDueDate = today;
			else if (billingTerms === "NET15") resolvedDueDate = addDays(today, 15);
			else if (billingTerms === "NET30") resolvedDueDate = addDays(today, 30);
			else if (billingTerms === "CUSTOM" && customDueDate) resolvedDueDate = startOfDay(customDueDate);
		}

		// ── 2. THE ATOMIC TRANSACTION ───────────────────────────────────
		const invoice = await prisma.$transaction(
			async (tx) => {
				// A. Safely increment the Lab's invoice counter (Locks the row)
				const updatedLab = await tx.lab.update({
					where: { id: labId },
					data: { nextInvoiceNumber: { increment: 1 } },
					select: { nextInvoiceNumber: true },
				});

				// Format: INV-2605-0001 (Year-Month-Sequence)
				const year = today.getFullYear().toString().slice(-2);
				const month = (today.getMonth() + 1).toString().padStart(2, "0");
				const sequence = updatedLab.nextInvoiceNumber.toString().padStart(4, "0");
				const invoiceNumber = `INV-${year}${month}-${sequence}`;

				// B. Fetch the cases to ensure they are valid and UNBILLED
				const casesToBill = await tx.case.findMany({
					where: {
						id: { in: caseIds },
						labId,
						clinicId,
						status: { in: ["COMPLETED", "DELIVERED"] },
						invoiceCase: null, // CRITICAL: Only grab cases without an invoice
					},
					select: { id: true, grandTotal: true },
				});

				// C. Concurrency Guard: Did someone else bill one of these cases a millisecond ago?
				if (casesToBill.length !== caseIds.length) {
					throw new Error("One or more selected cases have already been billed or are no longer valid.");
				}

				// D. The Ledger Math
				const subtotal = casesToBill.reduce((sum, c) => sum + Number(c.grandTotal || 0), 0);
				const discountAmount = (subtotal * discountPercentage) / 100;
				const grandTotal = Math.max(0, subtotal - discountAmount);

				// E. Create the Invoice and Snapshot the Prices
				const createdInvoice = await tx.invoice.create({
					data: {
						labId,
						clinicId,
						invoiceNumber,
						status,
						subtotal,
						discountAmount,
						total: grandTotal,
						amountDue: grandTotal,
						amountPaid: 0,

						// Metadata
						notes: notes || null,
						appliedDiscountPercentage: discountPercentage > 0 ? discountPercentage : null,
						discountReason: discountReason || null,

						// Dates
						issuedAt: status === "SENT" ? today : null,
						dueDate: resolvedDueDate,

						// Generating the public WhatsApp link token immediately if sent
						publicToken: status === "SENT" ? crypto.randomUUID() : null,

						// F. The Price Snapshot Rule (Junction Table)
						cases: {
							create: casesToBill.map((c) => ({
								caseId: c.id,
								caseTotal: Number(c.grandTotal || 0), // SNAPSHOT
							})),
						},
					},
				});

				return createdInvoice;
			},
			{
				// Give the DB breathing room for the transaction
				maxWait: 5000,
				timeout: 10000,
			},
		);

		return {
			success: true,
			invoice: { id: invoice.id, invoiceNumber: invoice.invoiceNumber },
		};
	});
