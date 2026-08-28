// data/invoices/get-invoice-dossier.ts

import { tenantPrisma } from "@/lib/prisma";
import { getDataTenantContext } from "@/lib/data-tenant-context";
import { ERRORS } from "@/lib/errors";
import { daError, daSuccess, toDAError, DAResult } from "@/lib/data-access-errors";
import { startOfDay, differenceInDays } from "date-fns";
import { InvoiceDetailsDTO } from "@/schema/composed/invoices/invoice-details.dtos";
import z from "zod";
import { INVOICE_DOSSIER_SELECT } from "./invoice-read-projections";

const InputSchema = z.string().uuid("Invalid Invoice ID format");

export async function getInvoiceDossierData(invoiceId: string): Promise<DAResult<InvoiceDetailsDTO>> {
	try {
		// ── 1. SECURITY GUARDS ───────────────────────────────────────────────
		// Resolve the session and labId internally to guarantee tenant isolation [1].
		const tenantResult = await getDataTenantContext();
		if (!tenantResult.success) return daError(tenantResult.error);
		const { labId } = tenantResult.data;

		// Sanitize input
		const parsedId = InputSchema.safeParse(invoiceId);
		if (!parsedId.success) {
			return daError(ERRORS.INVALID_INPUT.toJSON());
		}

		const prisma = await tenantPrisma(labId);

		// ── 2. DATABASE READ (OPTIMIZED SHAPE) ───────────────────────────────
		const rawInvoice = await prisma.invoice.findUnique({
			where: { id: parsedId.data, labId },
			select: INVOICE_DOSSIER_SELECT,
		});

		if (!rawInvoice) {
			return daError(ERRORS.NOT_FOUND.toJSON());
		}

		// ── 3. FINANCIAL CALCULATIONS (Server-Side) ──────────────────────────
		const subtotal = Number(rawInvoice.subtotal);
		const discountAmount = Number(rawInvoice.discountAmount);
		const total = Number(rawInvoice.total);
		const amountPaid = Number(rawInvoice.amountPaid);
		const amountDue = Number(rawInvoice.amountDue);

		const today = startOfDay(new Date());
		const dueDate = rawInvoice.dueDate ? startOfDay(new Date(rawInvoice.dueDate)) : null;

		// Evaluation of late/overdue status
		const isOverdue = amountDue > 0 && dueDate !== null && dueDate < today;

		// Calculate payment progress percentage
		const paymentProgressPct = total > 0 ? Math.min(Math.round((amountPaid / total) * 100), 100) : 0;

		// Calculate Aging Days (how many days past due)
		const agingDays = isOverdue && dueDate ? differenceInDays(today, dueDate) : null;

		// ── 4. DTO MAPPING & SANITIZATION ────────────────────────────────────
		const sanitizedDossier: InvoiceDetailsDTO = {
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

			// Map and flatten case line items, preserving the snapshotted price!
			cases: rawInvoice.cases.map((ic) => {
				const c = ic.case;
				return {
					id: c.id,
					caseNumber: c.caseNumber,
					patientName: c.patient.name,
					patientAge: c.patient.age,
					patientGender: c.patient.gender,
					dentistName: c.dentist?.name ?? null,
					caseTotal: Number(ic.caseTotal), // The historical snapshot price!
					isRemake: c.isRemake,
					workItems: c.caseItems.map((item) => ({
						productName: item.product?.name ?? "Unknown Product",
						workTypeName: item.workType?.name ?? "General",
						jawType: item.jawType,
						teethCount: item._count.selectedTeeth,
					})),
				};
			}),

			// Map payments history timeline
			payments: rawInvoice.payments.map((p) => ({
				id: p.id,
				amount: Number(p.amount),
				method: p.method,
				reference: p.reference,
				notes: p.notes,
				paidAt: p.paidAt,
			})),

			// Injected server-side metrics
			isOverdue,
			paymentProgressPct,
			agingDays,
		};

		return daSuccess(sanitizedDossier);
	} catch (e) {
		return toDAError(e);
	}
}
