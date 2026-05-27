"use server";

import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { ERRORS } from "@/lib/errors";
import { AdjustInvoiceInputSchema } from "@/schema/composed/invoices/adjust-invoice.schema";
import { InvoiceUpdateInput } from "@/generated/prisma/models";
import { revalidatePath } from "next/cache";

export const adjustLiveInvoiceAction = actionClientWithLab
	.metadata({
		actionName: "Adjust-Live-Invoice-Action",
		// Security: Only high-level roles can alter live financial documents
		requiredLabRole: "MANAGER",
	})
	.inputSchema(AdjustInvoiceInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { labId } = ctx;
		const { invoiceId, dueDate, discountPercentage, discountReason, notes } = parsedInput;

		const prisma = await tenantPrisma(labId);

		// ── 1. FETCH & VERIFY STATE ───────────────────────────────────────
		const invoice = await prisma.invoice.findUnique({
			where: { id: invoiceId, labId },
			select: {
				id: true,
				status: true,
				subtotal: true,
				amountPaid: true,
				clinicId: true,
				total: true,
				amountDue: true,
			},
		});

		if (!invoice) throw ERRORS.INVOICE_NOT_FOUND;

		// Guard: Tombstone records cannot be touched
		if (invoice.status === "CANCELLED") {
			throw new Error("Cannot adjust a voided or cancelled invoice.");
		}
		// Guard: Drafts must use the full edit flow, not the adjustment flow
		if (invoice.status === "DRAFT") {
			throw new Error("Drafts must be edited via the full workspace editor.");
		}

		// ── 2. THE LOCKOUT MATRIX (Sanitization) ──────────────────────────
		const isFinancialsLocked = ["PAID", "PARTIAL"].includes(invoice.status);

		const finalDiscountPct = isFinancialsLocked ? undefined : discountPercentage;
		const finalDiscountReason = isFinancialsLocked ? undefined : discountReason;
		const finalDueDate = isFinancialsLocked ? undefined : dueDate;

		// ── 3. FINANCIAL RECALCULATION ENGINE ─────────────────────────────
		let newDiscountAmount = 0;
		let newTotal = Number(invoice.total);
		let newAmountDue = Number(invoice.amountDue);
		let newStatus = invoice.status;
		let balanceAdjustment = 0; // To update the Clinic's global ledger

		if (!isFinancialsLocked && finalDiscountPct !== undefined) {
			const subtotal = Number(invoice.subtotal);
			newDiscountAmount = (subtotal * finalDiscountPct) / 100;
			newTotal = Math.max(0, subtotal - newDiscountAmount);

			// Amount Due = New Total - Whatever they already paid (which should be 0 here, but defense-in-depth)
			newAmountDue = Math.max(0, newTotal - Number(invoice.amountPaid));

			// Calculate how much the clinic's global debt changes
			// e.g., Old Total $1000, New Total $900 -> We must reduce clinic balance by $100
			balanceAdjustment = Number(invoice.total) - newTotal;

			// Status shift logic: If they apply a 100% discount, the invoice becomes PAID
			if (newAmountDue === 0) {
				newStatus = "PAID";
			}
		}

		// ── 4. THE ATOMIC TRANSACTION ─────────────────────────────────────
		await prisma.$transaction(async (tx) => {
			// A. Update the Invoice
			const updateData: InvoiceUpdateInput = {
				notes: notes ?? null,
			};

			// Only inject financial updates if they were allowed and altered
			if (!isFinancialsLocked) {
				if (finalDueDate !== undefined) updateData.dueDate = finalDueDate;

				if (finalDiscountPct !== undefined) {
					updateData.appliedDiscountPercentage = finalDiscountPct;
					updateData.discountReason = finalDiscountReason ?? null;
					updateData.discountAmount = newDiscountAmount;
					updateData.total = newTotal;
					updateData.amountDue = newAmountDue;
					updateData.status = newStatus;
				}
			}

			await tx.invoice.update({
				where: { id: invoiceId },
				data: updateData,
			});

			// B. Update the Clinic's Global Ledger (If total changed)
			if (balanceAdjustment > 0) {
				await tx.clinic.update({
					where: { id: invoice.clinicId },
					data: {
						currentBalance: { decrement: balanceAdjustment },
					},
				});
			}

			// C. Log the Adjustment Activity
			// In a true ERP, you would log this to CaseActivityLog or a new InvoiceActivityLog
			// showing exactly who applied the post-issuance discount.
		});

		revalidatePath("/invoices/[invoiceId]");

		return { success: true, newStatus };
	});
