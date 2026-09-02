"use server";

import { z } from "zod";
import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";
import { Prisma } from "@/generated/prisma/client";
import { createLabOSAuthorizationActor } from "@/modules/labos-authorization/actor";
import { labosAuthorizationService } from "@/modules/labos-authorization/service";

const InvoiceIdInputSchema = z.object({
	invoiceId: z.uuid("Invalid Invoice ID format"),
});

// ── 1. ACTION: DELETE DRAFT INVOICE ──────────────────────────────────────────
export const deleteDraftInvoiceAction = actionClientWithLab
	.metadata({
		actionName: "Delete-Draft-Invoice-Action",
		requiredLabRole: "MANAGER", // Accountants & managers only
	})
	.inputSchema(InvoiceIdInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { invoiceId } = parsedInput;
		const { labId } = ctx;

		const decision = await labosAuthorizationService.can({
			actor: createLabOSAuthorizationActor(ctx),
			permission: "invoice.delete_draft",
			target: { type: "invoice", id: invoiceId },
		});
		if (!decision.allowed) throw ERRORS.MISSING_PERMISSIONS;

		const prisma = await tenantPrisma(labId);

		const result = await prisma.$transaction(
			async (tx) => {
				// A. Fetch and verify the draft inside the transaction.
				const invoice = await tx.invoice.findUnique({
					where: { id: invoiceId, labId },
					select: { id: true, status: true },
				});

				if (!invoice) throw ERRORS.INVOICE_NOT_FOUND;

				// Security Guard: You can only DELETE a Draft!
				if (invoice.status !== "DRAFT") {
					throw new Error("Only Draft statements can be permanently deleted.");
				}

				// B. Delete from the junction table first (releases cases back to unbilled)
				await tx.invoiceCase.deleteMany({
					where: { invoiceId, labId },
				});

				// C. Delete the Invoice
				await tx.invoice.delete({
					where: { id: invoiceId },
				});

				return { success: true };
			},
			{
				maxWait: 5000,
				timeout: 10000,
				isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
			},
		);

		return { success: result.success };
	});
