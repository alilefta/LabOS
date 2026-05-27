// actions/invoices/get-draft-eligible-cases.ts
"use server";

import { z } from "zod";
import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";
import { UnbilledCaseDTO } from "@/schema/composed/invoices/new.invoice.dtos";

const GetDraftEligibleCasesSchema = z.object({
	clinicId: z.uuid("Invalid Clinic ID format"),
	draftInvoiceId: z.uuid("Invalid Invoice ID format"),
});

export const getDraftEligibleCasesAction = actionClientWithLab
	.metadata({
		actionName: "Get-Draft-Eligible-Cases",
		requiredLabRole: "STAFF", // Accountants & billing staff can query this
	})
	.inputSchema(GetDraftEligibleCasesSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { clinicId, draftInvoiceId } = parsedInput;
		const { labId } = ctx;

		const prisma = await tenantPrisma(labId);

		// 1. SECURITY & TENANT GUARD
		// Verify clinic belongs to this lab tenant
		const clinicExists = await prisma.clinic.findUnique({
			where: { id: clinicId, labId },
			select: { id: true },
		});

		if (!clinicExists) {
			throw ERRORS.CLIENT_NOT_FOUND;
		}

		// 2. THE CHOOSE UNION QUERY [1]
		// Fetch cases that are either completely unbilled OR already locked in this draft [2]
		const rawCases = await prisma.case.findMany({
			where: {
				labId,
				clinicId,
				status: { in: ["COMPLETED", "DELIVERED"] },
				OR: [
					{ invoiceCase: null }, // Cases in the unbilled queue [1]
					{ invoiceCase: { invoiceId: draftInvoiceId } }, // Cases already in our cart [1]
				],
			},
			select: {
				id: true,
				caseNumber: true,
				status: true,
				createdAt: true,
				grandTotal: true,
				patient: { select: { name: true } },
				dentist: { select: { name: true } },
				caseItems: {
					select: {
						jawType: true, // Dynamic shape mapping
						product: { select: { name: true } },
						workType: { select: { name: true } },
						_count: { select: { selectedTeeth: true } },
					},
				},
			},
			orderBy: { createdAt: "asc" }, // Accountants bill oldest cases first
		});

		// 3. SECURE DTO MAPPING (Zero 'any' types)
		const mappedCases: UnbilledCaseDTO[] = rawCases.map((c) => ({
			id: c.id,
			caseNumber: c.caseNumber,
			patientName: c.patient.name,
			dentistName: c.dentist?.name ?? null,
			grandTotal: Number(c.grandTotal ?? 0),
			status: c.status,
			createdAt: c.createdAt,
			workItems: c.caseItems.map((item) => ({
				productName: item.product?.name ?? "Unknown Product",
				workTypeName: item.workType?.name ?? "General",
				jawType: item.jawType,
				teethCount: item._count.selectedTeeth,
			})),
		}));

		return { cases: mappedCases };
	});
