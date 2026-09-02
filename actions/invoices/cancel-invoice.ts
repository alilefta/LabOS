// actions/invoices/cancel-invoice.ts
"use server";

import { z } from "zod";
import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";
import { Prisma } from "@/generated/prisma/client";
import { buildLogEntry, resolveActorName } from "@/data/activity-logs/build-activity-log";
import { CaseUpdatedPayloadSchema } from "@/schema/composed/case-activity-logs.details";
import { createLabOSAuthorizationActor } from "@/modules/labos-authorization/actor";
import { labosAuthorizationService } from "@/modules/labos-authorization/service";

const CancelInvoiceSchema = z.object({
	invoiceId: z.string().uuid("Invalid Invoice ID format"),
});

export const cancelInvoiceAction = actionClientWithLab
	.metadata({
		actionName: "Cancel-Void-Invoice-Action",
		requiredLabRole: "MANAGER", // Owner/Admin/Manager may cancel unpaid invoices
	})
	.inputSchema(CancelInvoiceSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { invoiceId } = parsedInput;
		const { labId, labUser } = ctx;

		const decision = await labosAuthorizationService.can({
			actor: createLabOSAuthorizationActor(ctx),
			permission: "invoice.cancel",
			target: { type: "invoice", id: invoiceId },
			operation: { kind: "invoice.unpaid.cancel" },
		});
		if (!decision.allowed) throw ERRORS.MISSING_PERMISSIONS;

		const prisma = await tenantPrisma(labId);

		// Resolve the actor name (safely bubbles up if DB fails)
		const actorName = await resolveActorName(labUser.id, labId);

		// ── THE ATOMIC TRANSACTION ───────────────────────────────────
		// If ANY error or guard is triggered, Prisma automatically rolls back.
		const result = await prisma.$transaction(
			async (tx) => {
				// 1. Fetch the invoice and its linked cases
				const invoice = await tx.invoice.findUnique({
					where: { id: invoiceId, labId },
					include: {
						cases: { select: { caseId: true } },
					},
				});

				// --- GUARD A: INVOICE EXISTENCE ---
				if (!invoice) {
					throw ERRORS.INVOICE_NOT_FOUND;
				}

				// --- GUARD B: ALREADY CANCELLED ---
				if (invoice.status === "CANCELLED") {
					throw ERRORS.OPERATION_NOT_ALLOWED;
				}

				// --- GUARD C: ACTIVE PAYMENTS LOCK ---
				if (Number(invoice.amountPaid) > 0) {
					throw ERRORS.OPERATION_NOT_ALLOWED;
				}

				const amountDue = Number(invoice.amountDue);

				// --- STEP 1: CLINIC BALANCE DECREMENT ---
				if (invoice.status !== "DRAFT" && amountDue > 0) {
					await tx.clinic.update({
						where: { id: invoice.clinicId },
						data: {
							currentBalance: { decrement: amountDue },
						},
					});
				}

				// --- STEP 2: CASE RELEASE (DELETE JUNCTION ROWS) ---
				await tx.invoiceCase.deleteMany({
					where: { invoiceId },
				});

				// --- STEP 3: DYNAMIC CASE ACTIVITY LOGGING ---
				if (invoice.cases.length > 0) {
					await tx.caseActivityLog.createMany({
						data: invoice.cases.map((ic) =>
							buildLogEntry({
								caseId: ic.caseId,
								labId,
								actorId: labUser.id,
								actorName,
								type: "CASE_UPDATED",
								summary: `Released from voided invoice #${invoice.invoiceNumber}`,
								payload: {
									scalarChanges: [
										{
											field: "invoiceCase",
											from: invoice.invoiceNumber,
											to: null,
										},
									],
									workItemsReplaced: null,
									caseAssetFiles: null,
									staffReplaced: null,
									statusChanged: null,
								} as z.infer<typeof CaseUpdatedPayloadSchema>,
							}),
						),
					});
				}

				// --- STEP 4: VOID THE INVOICE RECORD ---
				const updatedInvoice = await tx.invoice.update({
					where: { id: invoiceId },
					data: {
						status: "CANCELLED",
						amountDue: 0,
						publicToken: null,
						publicLinkExpiresAt: null,
					},
					select: { invoiceNumber: true },
				});

				return updatedInvoice;
			},
			{
				maxWait: 5000,
				timeout: 10000,
				isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
			},
		);

		return { success: true, invoiceNumber: result.invoiceNumber };
	});
