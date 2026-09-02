"use server";

import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { ERRORS } from "@/lib/errors";
import { AdjustInvoiceInputSchema } from "@/schema/composed/invoices/adjust-invoice.schema";
import { InvoiceUpdateInput } from "@/generated/prisma/models";
import { Prisma } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { createLabOSAuthorizationActor } from "@/modules/labos-authorization/actor";
import { labosAuthorizationService } from "@/modules/labos-authorization/service";

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

		const changeSet: Array<"due_date" | "discount" | "notes"> = [];
		if (dueDate !== undefined) changeSet.push("due_date");
		if (discountPercentage !== undefined || discountReason !== undefined) {
			changeSet.push("discount");
		}
		if (notes !== undefined) changeSet.push("notes");

		const decision = await labosAuthorizationService.can({
			actor: createLabOSAuthorizationActor(ctx),
			permission: "invoice.update",
			target: { type: "invoice", id: invoiceId },
			operation: { kind: "invoice.live.update", changeSet },
		});
		if (!decision.allowed) throw ERRORS.MISSING_PERMISSIONS;

		const prisma = await tenantPrisma(labId);

		// All mutable Invoice and Clinic facts are read and used inside one
		// serializable transaction. This prevents a stale pre-read from changing
		// a newer Invoice state or crediting a caller-selected Clinic.
		const result = await prisma.$transaction(
			async (tx) => {
				// ── 1. FETCH & VERIFY STATE (transaction-time) ────────────────────
				const invoice = await tx.invoice.findUnique({
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

				// Resolve the Clinic from the trusted Invoice relationship, and read it
				// in the same transaction before changing its ledger balance.
				const clinic = await tx.clinic.findUnique({
					where: { id: invoice.clinicId, labId },
					select: { id: true, currentBalance: true },
				});
				if (!clinic) throw ERRORS.NOT_FOUND;

				// Guard: Tombstone records cannot be touched
				if (invoice.status === "CANCELLED") {
					throw new Error("Cannot adjust a voided or cancelled invoice.");
				}
				// Guard: Drafts must use the full edit flow, not the adjustment flow
				if (invoice.status === "DRAFT") {
					throw new Error("Drafts must be edited via the full workspace editor.");
				}

				// ── 2. THE LOCKOUT MATRIX (transaction-time) ─────────────────────
				const isFinancialsLocked = ["PAID", "PARTIAL"].includes(invoice.status);

				const finalDiscountPct = isFinancialsLocked ? undefined : discountPercentage;
				const finalDiscountReason = isFinancialsLocked ? undefined : discountReason;
				const finalDueDate = isFinancialsLocked ? undefined : dueDate;

				// ── 3. FINANCIAL RECALCULATION ENGINE (transaction-time) ─────────
				let newDiscountAmount = 0;
				let newTotal = Number(invoice.total);
				let newAmountDue = Number(invoice.amountDue);
				let newStatus = invoice.status;

				if (!isFinancialsLocked && finalDiscountPct !== undefined) {
					const subtotal = Number(invoice.subtotal);
					newDiscountAmount = (subtotal * finalDiscountPct) / 100;
					newTotal = Math.max(0, subtotal - newDiscountAmount);

					// Amount Due = New Total - Whatever was paid at transaction time.
					newAmountDue = Math.max(0, newTotal - Number(invoice.amountPaid));

					// A 100% discount settles the remaining balance.
					if (newAmountDue === 0) {
						newStatus = "PAID";
					}
				}

				// Positive delta increases Clinic debt; negative delta reduces it.
				const balanceDelta = newTotal - Number(invoice.total);

				// ── 4. ATOMIC WRITE ─────────────────────────────────────────────
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
					where: { id: invoice.id },
					data: updateData,
				});

				// Update the trusted Invoice Clinic's global ledger (if total changed).
				if (balanceDelta !== 0) {
					await tx.clinic.update({
						where: { id: clinic.id, labId },
						data: {
							currentBalance: { increment: balanceDelta },
						},
					});
				}

				// In a true ERP, log the adjustment in a protected financial activity log.
				return { newStatus };
			},
			{
				maxWait: 5000,
				timeout: 10000,
				isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
			},
		);

		revalidatePath("/invoices/[invoiceId]");

		return { success: true, newStatus: result.newStatus };
	});
