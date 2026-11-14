"use server";

import { addDays, startOfDay } from "date-fns";
import { Prisma } from "@/generated/prisma/client";
import { actionClientWithAuthorization } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";

export const updateDraftInvoiceAction = actionClientWithAuthorization('A-097')
	.action(async ({ parsedInput, ctx }) => {
		const { labId } = ctx;
		const { invoiceId, clinicId, caseIds, status, billingTerms, customDueDate, discountPercentage, discountReason, notes } = parsedInput;

		const prisma = await tenantPrisma(labId);
		const invoice = await prisma.$transaction(
			async (tx) => {
		const settings = await tx.labSettings.findUnique({
			where: { labId },
			select: { currency: true },
		});
		if (!settings) throw ERRORS.OPERATION_NOT_ALLOWED;

		// ─────────────────────────────────────────────────────────────────
		// STEP 1: Ownership & State Verification
		// Verify invoice exists and is still a DRAFT.
		// ─────────────────────────────────────────────────────────────────
		const existingInvoice = await tx.invoice.findUnique({
			where: { id: invoiceId, labId },
			select: {
				id: true,
				clinicId: true,
				status: true,
				cases: { select: { caseId: true, labId: true, case: { select: { labId: true, clinicId: true } } } },
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
		if (clinicId !== existingInvoice.clinicId || existingInvoice.cases.some(
			link => link.labId !== labId || link.case.labId !== labId || link.case.clinicId !== existingInvoice.clinicId,
		)) {
			throw ERRORS.OPERATION_NOT_ALLOWED;
		}
		const clinic = await tx.clinic.findUnique({
			where: { id: existingInvoice.clinicId, labId },
			select: { id: true },
		});
		if (!clinic) throw ERRORS.OPERATION_NOT_ALLOWED;

		// ── 2. STATE DIFFING LOGIC ───────────────────────────────────────
		const existingCaseIds = existingInvoice.cases.map((c) => c.caseId);

		// Cases to release (were in draft, but unchecked now)
		const removedCaseIds = existingCaseIds.filter((id) => !caseIds.includes(id));

		// Cases to add (newly checked)
		const addedCaseIds = caseIds.filter((id) => !existingCaseIds.includes(id));

		// Load final eligible cases and current prices inside this transaction.
		const finalCasesToBill = await tx.case.findMany({
			where: {
				id: { in: caseIds },
				labId,
				clinicId: clinic.id,
				status: { in: ["COMPLETED", "DELIVERED"] },
				OR: [
					{ invoiceCase: null }, // Unbilled cases
					{ invoiceCase: { invoiceId } }, // Cases already in our cart
				],
			},
			select: { id: true, grandTotal: true },
		});

		// Reject missing, ineligible, foreign, duplicate, or already-billed cases.
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

		// Round to the Invoice's two-decimal storage scale before deriving
		// dependent values so persisted total = subtotal - discountAmount.
		const subtotal = finalCasesToBill.reduce(
			(sum, c) => sum.plus(c.grandTotal ?? 0),
			new Prisma.Decimal(0),
		).toDecimalPlaces(2, Prisma.Decimal.ROUND_HALF_UP);
		const discountAmount = subtotal.mul(discountPercentage).div(100)
			.toDecimalPlaces(2, Prisma.Decimal.ROUND_HALF_UP);
		const discountedTotal = subtotal.minus(discountAmount);
		const grandTotal = discountedTotal.isNegative() ? new Prisma.Decimal(0) : discountedTotal;

				// A. Delete removed cases from the junction table (releases them back to unbilled) [3]
				if (removedCaseIds.length > 0) {
					await tx.invoiceCase.deleteMany({
						where: {
							invoiceId,
							labId,
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
							caseTotal: c.grandTotal ?? new Prisma.Decimal(0), // Existing added-Case snapshot rule
							labId,
						})),
					});
				}

				// C. If the status is transitioning to SENT, increment the clinic's balance [1]
				if (status === "SENT") {
					await tx.clinic.update({
						where: { id: clinic.id, labId },
						data: {
							currentBalance: { increment: grandTotal },
						},
					});
				}

				// D. Update the Invoice Metadata
				const updatedInvoice = await tx.invoice.update({
					where: { id: invoiceId, labId, status: "DRAFT" },
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
					},
					select: { id: true, invoiceNumber: true, amountDue: true },
				});

			return { ...updatedInvoice, currency: settings.currency };
			},
			{
				maxWait: 5000,
				timeout: 10000,
				isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
			},
		);

		return {
			success: true,
			invoice: {
				id: invoice.id,
				invoiceNumber: invoice.invoiceNumber,
				amountDue: invoice.amountDue.toString(),
				currency: invoice.currency,
			},
		};
	});
