// actions/invoices/update-invoice.ts
"use server";

import { addDays, startOfDay } from "date-fns";
import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors"; // Predefined errors
import crypto from "crypto";
import { UpdateInvoiceInputSchema } from "@/schema/composed/invoices/update-invoice.schema";

export const updateDraftInvoiceAction = actionClientWithLab
	.metadata({
		actionName: "Update-Draft-Invoice-Action",
		requiredLabRole: "MANAGER", // Accountants & managers can modify ledgers
	})
	.inputSchema(UpdateInvoiceInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { labId } = ctx;
		const { invoiceId, clinicId, caseIds, status, billingTerms, customDueDate, discountPercentage, discountReason, notes } = parsedInput;

		const prisma = await tenantPrisma(labId);

		// ─────────────────────────────────────────────────────────────────
		// STEP 1: Ownership & State Verification
		// Verify invoice exists and is still a DRAFT.
		// ─────────────────────────────────────────────────────────────────
		const existingInvoice = await prisma.invoice.findUnique({
			where: { id: invoiceId, labId },
			include: {
				cases: { select: { caseId: true } },
			},
		});

		// Guard A: Invoice existence [1]
		if (!existingInvoice) {
			throw ERRORS.INVOICE_NOT_FOUND;
		}

		// Guard B: State Lockout (Only DRAFTS can be edited via the workspace) [1]
		if (existingInvoice.status !== "DRAFT") {
			throw ERRORS.OPERATION_NOT_ALLOWED;
		}

		// ── 2. STATE DIFFING LOGIC ───────────────────────────────────────
		const existingCaseIds = existingInvoice.cases.map((c) => c.caseId);

		// Cases to release (were in draft, but unchecked now)
		const removedCaseIds = existingCaseIds.filter((id) => !caseIds.includes(id));

		// Cases to add (newly checked)
		const addedCaseIds = caseIds.filter((id) => !existingCaseIds.includes(id));

		// ── 3. DATA FETCH & VERIFICATION (N+1 Proof) ─────────────────────
		// Fetch all final cases in a single parallel query to verify math
		const finalCasesToBill = await prisma.case.findMany({
			where: {
				id: { in: caseIds },
				labId,
				clinicId,
				status: { in: ["COMPLETED", "DELIVERED"] },
				OR: [
					{ invoiceCase: null }, // Unbilled cases
					{ invoiceCase: { invoiceId } }, // Cases already in our cart
				],
			},
			select: { id: true, grandTotal: true },
		});

		// Concurrency Guard: Did another accountant bill these cases mid-session?
		if (finalCasesToBill.length !== caseIds.length) {
			throw ERRORS.OPERATION_NOT_ALLOWED;
		}

		// ── 4. DATE & TERM EVALUATION ───────────────────────────────────
		const today = startOfDay(new Date());
		let resolvedDueDate: Date | null = null;

		if (status === "SENT") {
			if (billingTerms === "RECEIPT") resolvedDueDate = today;
			else if (billingTerms === "NET15") resolvedDueDate = addDays(today, 15);
			else if (billingTerms === "NET30") resolvedDueDate = addDays(today, 30);
			else if (billingTerms === "CUSTOM" && customDueDate) resolvedDueDate = startOfDay(customDueDate);
		}

		// Calculate Totals
		const subtotal = finalCasesToBill.reduce((sum, c) => sum + Number(c.grandTotal || 0), 0);
		const discountAmount = (subtotal * discountPercentage) / 100;
		const grandTotal = Math.max(0, subtotal - discountAmount);

		// ─────────────────────────────────────────────────────────────────
		// STEP 5: THE ATOMIC TRANSACTION (WRITE ONLY) [3]
		// ─────────────────────────────────────────────────────────────────
		const invoice = await prisma.$transaction(
			async (tx) => {
				// A. Delete removed cases from the junction table (releases them back to unbilled) [3]
				if (removedCaseIds.length > 0) {
					await tx.invoiceCase.deleteMany({
						where: {
							invoiceId,
							caseId: { in: removedCaseIds },
						},
					});
				}

				// B. Create newly added cases with the Price Snapshot Rule [3]
				if (addedCaseIds.length > 0) {
					const addedCasesDetails = finalCasesToBill.filter((c) => addedCaseIds.includes(c.id));

					await tx.invoiceCase.createMany({
						data: addedCasesDetails.map((c) => ({
							invoiceId,
							caseId: c.id,
							caseTotal: Number(c.grandTotal || 0), // SNAPSHOT
							labId,
						})),
					});
				}

				// C. If the status is transitioning to SENT, increment the clinic's balance [1]
				if (status === "SENT") {
					await tx.clinic.update({
						where: { id: clinicId },
						data: {
							currentBalance: { increment: grandTotal },
						},
					});
				}

				// D. Update the Invoice Metadata
				const publicToken = status === "SENT" ? crypto.randomUUID() : null;
				const publicLinkExpiresAt = status === "SENT" ? addDays(today, 90) : null;

				const updatedInvoice = await tx.invoice.update({
					where: { id: invoiceId },
					data: {
						status,
						subtotal,
						discountAmount,
						total: grandTotal,
						amountDue: grandTotal,
						notes: notes || null,
						appliedDiscountPercentage: discountPercentage > 0 ? discountPercentage : null,
						discountReason: discountReason || null,
						issuedAt: status === "SENT" ? today : null,
						dueDate: resolvedDueDate,
						publicToken,
						publicLinkExpiresAt,
					},
					select: { id: true, invoiceNumber: true, publicToken: true },
				});

				return updatedInvoice;
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
				publicToken: invoice.publicToken,
			},
		};
	});
