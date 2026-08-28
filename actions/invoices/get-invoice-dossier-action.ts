"use server";

import { ERRORS } from "@/lib/errors";
import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { InvoiceDetailsDTO } from "@/schema/composed/invoices/invoice-details.dtos";
import { differenceInDays, startOfDay } from "date-fns";
import { z } from "zod";
import { INVOICE_DOSSIER_SELECT } from "@/data/invoices/invoice-read-projections";

export const getInvoiceDossierAction = actionClientWithLab
	.metadata({
		actionName: "Get-Invoice-Dossier-Action",
		requiredLabRole: "STAFF",
	})
	.inputSchema(z.object({ invoiceId: z.string().uuid("Invalid Invoice ID format") }))
	.action(async ({ ctx, parsedInput }) => {
		const { labId } = ctx;
		const { invoiceId } = parsedInput;

		const prisma = await tenantPrisma(labId);

		const rawInvoice = await prisma.invoice.findUnique({
			where: { id: invoiceId, labId },
			select: INVOICE_DOSSIER_SELECT,
		});

		if (!rawInvoice) throw ERRORS.INVOICE_NOT_FOUND;

		// ── Financial calculations ────────────────────────────────────────────────
		const subtotal = Number(rawInvoice.subtotal);
		const discountAmount = Number(rawInvoice.discountAmount);
		const total = Number(rawInvoice.total);
		const amountPaid = Number(rawInvoice.amountPaid);
		const amountDue = Number(rawInvoice.amountDue);

		const today = startOfDay(new Date());
		const dueDate = rawInvoice.dueDate ? startOfDay(new Date(rawInvoice.dueDate)) : null;

		const isOverdue = amountDue > 0 && dueDate !== null && dueDate < today;
		const paymentProgressPct = total > 0 ? Math.min(Math.round((amountPaid / total) * 100), 100) : 0;
		const agingDays = isOverdue && dueDate ? differenceInDays(today, dueDate) : null;

		// ── DTO mapping ───────────────────────────────────────────────────────────
		const dossier: InvoiceDetailsDTO = {
			id: rawInvoice.id,
			invoiceNumber: rawInvoice.invoiceNumber,
			status: rawInvoice.status,
			notes: rawInvoice.notes,

			subtotal,
			discountAmount,
			total,
			amountPaid,
			amountDue,

			appliedDiscountPercentage: rawInvoice.appliedDiscountPercentage ? Number(rawInvoice.appliedDiscountPercentage) : null,
			discountReason: rawInvoice.discountReason,

			issuedAt: rawInvoice.issuedAt,
			dueDate: rawInvoice.dueDate,
			createdAt: rawInvoice.createdAt,
			updatedAt: rawInvoice.updatedAt,

			lab: {
				title: rawInvoice.lab.title,
				subtitle: rawInvoice.lab.subtitle,
				brandAvatarUrl: rawInvoice.lab.brandAvatarUrl,
			},

			clinic: {
				id: rawInvoice.clinic.id,
				name: rawInvoice.clinic.name,
				city: rawInvoice.clinic.city,
				address1: rawInvoice.clinic.address1,
				phoneNumber: rawInvoice.clinic.phoneNumber,
				email: rawInvoice.clinic.email,
				type: rawInvoice.clinic.type,
			},

			cases: rawInvoice.cases.map((ic) => {
				const c = ic.case;
				return {
					id: c.id,
					caseNumber: c.caseNumber,
					patientName: c.patient.name,
					patientAge: c.patient.age,
					patientGender: c.patient.gender,
					dentistName: c.dentist?.name ?? null,
					caseTotal: Number(ic.caseTotal),
					isRemake: c.isRemake,
					workItems: c.caseItems.map((item) => ({
						productName: item.product?.name ?? "Unknown Product",
						workTypeName: item.workType?.name ?? "General",
						jawType: item.jawType,
						teethCount: item._count.selectedTeeth,
					})),
				};
			}),

			payments: rawInvoice.payments.map((p) => ({
				id: p.id,
				amount: Number(p.amount),
				method: p.method,
				reference: p.reference,
				notes: p.notes,
				paidAt: p.paidAt,
			})),

			isOverdue,
			paymentProgressPct,
			agingDays,
		};

		return { dossier };
	});
