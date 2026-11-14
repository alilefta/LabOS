"use server";

import { addDays, startOfDay } from "date-fns";
import { Prisma } from "@/generated/prisma/client";
import { ERRORS } from "@/lib/errors";
import { actionClientWithAuthorization } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";

export const createInvoiceAction = actionClientWithAuthorization('A-089')
	.action(async ({ parsedInput, ctx }) => {
		const { labId } = ctx;
		const { clinicId, caseIds, status, billingTerms, customDueDate, discountPercentage, discountReason, notes } = parsedInput;

		const prisma = await tenantPrisma(labId);

		const today = startOfDay(new Date());
		let resolvedDueDate: Date | null = null;

		if (status === "SENT") {
			if (billingTerms === "RECEIPT") resolvedDueDate = today;
			else if (billingTerms === "NET15") resolvedDueDate = addDays(today, 15);
			else if (billingTerms === "NET30") resolvedDueDate = addDays(today, 30);
			else if (billingTerms === "CUSTOM" && customDueDate) resolvedDueDate = startOfDay(customDueDate);
		}

		const createInvoice = () => prisma.$transaction(
			async (tx) => {
				if (new Set(caseIds).size !== caseIds.length) throw ERRORS.OPERATION_NOT_ALLOWED;
				const settings = await tx.labSettings.findUnique({
					where: { labId },
					select: { currency: true },
				});
				if (!settings) throw ERRORS.OPERATION_NOT_ALLOWED;
				const clinic = await tx.clinic.findUnique({
					where: { id: clinicId, labId },
					select: { id: true },
				});
				if (!clinic) throw ERRORS.OPERATION_NOT_ALLOWED;
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

				// Recheck every Case after authorization and before claiming its unique link.
				const casesToBill = await tx.case.findMany({
					where: {
						id: { in: caseIds },
						labId,
						clinicId: clinic.id,
						status: { in: ["COMPLETED", "DELIVERED"] },
						invoiceCase: null,
					},
					select: { id: true, grandTotal: true },
				});

				if (casesToBill.length !== caseIds.length) {
					throw ERRORS.OPERATION_NOT_ALLOWED;
				}

				const subtotal = casesToBill.reduce(
					(sum, c) => sum.plus(c.grandTotal ?? 0),
					new Prisma.Decimal(0),
				).toDecimalPlaces(2, Prisma.Decimal.ROUND_HALF_UP);
				const discountAmount = subtotal.mul(discountPercentage).div(100)
					.toDecimalPlaces(2, Prisma.Decimal.ROUND_HALF_UP);
				const discountedTotal = subtotal.minus(discountAmount);
				const grandTotal = discountedTotal.isNegative() ? new Prisma.Decimal(0) : discountedTotal;

				const createdInvoice = await tx.invoice.create({
					data: {
						labId,
						clinicId: clinic.id,
						invoiceNumber,
						status,
						subtotal,
						discountAmount,
						total: grandTotal,
						amountDue: grandTotal,
						amountPaid: new Prisma.Decimal(0),
						notes: notes || null,
						appliedDiscountPercentage: discountPercentage > 0 ? discountPercentage : null,
						discountReason: discountReason || null,
						issuedAt: status === "SENT" ? today : null,
						dueDate: resolvedDueDate,

						cases: {
							create: casesToBill.map((c) => ({
								caseId: c.id,
								caseTotal: c.grandTotal ?? new Prisma.Decimal(0),
								labId,
							})),
						},
					},
				});
				if (status === "SENT") {
					await tx.clinic.update({
						where: { id: clinic.id, labId },
						data: { currentBalance: { increment: createdInvoice.total } },
					});
				}

				return {
					id: createdInvoice.id,
					invoiceNumber: createdInvoice.invoiceNumber,
					amountDue: createdInvoice.amountDue,
					currency: settings.currency,
				};
			},
			{
				maxWait: 5000,
				timeout: 10000,
				isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
			},
		);
		let invoice: Awaited<ReturnType<typeof createInvoice>>;
		for (let attempt = 0; ; attempt++) {
			try {
				invoice = await createInvoice();
				break;
			} catch (error) {
				if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== 'P2034' || attempt >= 2) throw error;
			}
		}

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
