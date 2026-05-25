"use server";

import { addDays, startOfDay } from "date-fns";
import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";
import { CreateInvoiceInputSchema } from "@/schema/composed/invoices/new-invoice.schema";
import { Prisma } from "@/generated/prisma/client";

export const createInvoiceAction = actionClientWithLab
	.metadata({
		actionName: "Create-Invoice-Action",
		requiredLabRole: "MANAGER",
	})
	.inputSchema(CreateInvoiceInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { labId } = ctx;
		const { clinicId, caseIds, status, billingTerms, customDueDate, discountPercentage, discountReason, notes } = parsedInput;

		try {
			const prisma = await tenantPrisma(labId);

			const today = startOfDay(new Date());
			let resolvedDueDate: Date | null = null;

			if (status === "SENT") {
				if (billingTerms === "RECEIPT") resolvedDueDate = today;
				else if (billingTerms === "NET15") resolvedDueDate = addDays(today, 15);
				else if (billingTerms === "NET30") resolvedDueDate = addDays(today, 30);
				else if (billingTerms === "CUSTOM" && customDueDate) resolvedDueDate = startOfDay(customDueDate);
			}

			const invoice = await prisma.$transaction(
				async (tx) => {
					// A. Increment the sequential invoice number (locks row)
					const updatedLab = await tx.lab.update({
						where: { id: labId },
						data: { nextInvoiceNumber: { increment: 1 } },
						select: { nextInvoiceNumber: true },
					});

					const year = today.getFullYear().toString().slice(-2);
					const month = (today.getMonth() + 1).toString().padStart(2, "0");
					const sequence = updatedLab.nextInvoiceNumber.toString().padStart(4, "0");
					const invoiceNumber = `INV-${year}${month}-${sequence}`;

					// B. Fetch and lock cases to ensure they are unbilled
					const casesToBill = await tx.case.findMany({
						where: {
							id: { in: caseIds },
							labId,
							clinicId,
							status: { in: ["COMPLETED", "DELIVERED"] },
							invoiceCase: null,
						},
						select: { id: true, grandTotal: true },
					});

					if (casesToBill.length !== caseIds.length) {
						throw new Error("One or more selected cases have already been billed.");
					}

					const subtotal = casesToBill.reduce((sum, c) => sum + Number(c.grandTotal || 0), 0);
					const discountAmount = (subtotal * discountPercentage) / 100;
					const grandTotal = Math.max(0, subtotal - discountAmount);

					// ─────────────────────────────────────────────────────────────────
					// 🔥 STEP 1: CRYPTOGRAPHIC TOKEN GENERATION & EXPIRATION [1]
					// - Only generate a token if the status is actually SENT.
					// - Drafts remain null so they cannot be accessed via public links.
					// ─────────────────────────────────────────────────────────────────
					const publicToken = status === "SENT" ? crypto.randomUUID() : null; // Secure 36-char string [1]
					const publicLinkExpiresAt = status === "SENT" ? addDays(today, 90) : null; // 90-day expiry window

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
							notes: notes || null,
							appliedDiscountPercentage: discountPercentage > 0 ? discountPercentage : null,
							discountReason: discountReason || null,
							issuedAt: status === "SENT" ? today : null,
							dueDate: resolvedDueDate,

							// Inject the secure token and expiration [1]
							publicToken,
							publicLinkExpiresAt,

							cases: {
								create: casesToBill.map((c) => ({
									caseId: c.id,
									caseTotal: Number(c.grandTotal || 0),
								})),
							},
						},
					});

					return createdInvoice;
				},
				{
					maxWait: 5000,
					timeout: 10000,
				},
			);

			return {
				success: true,
				invoice: {
					id: invoice.id,
					invoiceNumber: invoice.invoiceNumber,
					publicToken: invoice.publicToken, // Return the token to the client for sharing [1]
				},
			};
		} catch (error) {
			console.error("[Create-Invoice-Action] Error:", error);
			if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
				throw new Error("A selected case has already been attached to another invoice.");
			}
			if (error instanceof Error) throw error;
			throw ERRORS.OPERATION_NOT_ALLOWED;
		}
	});
