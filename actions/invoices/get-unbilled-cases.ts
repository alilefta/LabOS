"use server";

import { z } from "zod";
import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";
import { UnbilledCaseDTO } from "@/schema/composed/invoices/new.invoice.dtos";

export const getUnbilledCasesAction = actionClientWithLab
	.metadata({
		actionName: "Get-Unbilled-Cases-Action",
		// Security: Only roles that deal with finance or management can query unbilled ledgers
		requiredLabRole: "STAFF",
	})
	.inputSchema(
		z.object({
			clinicId: z.string().uuid("Invalid Clinic ID"),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		const { clinicId } = parsedInput;
		const { labId } = ctx;

		try {
			const prisma = await tenantPrisma(labId);

			// 1. Security Check: Does this clinic belong to this lab?
			const clinicExists = await prisma.clinic.findUnique({
				where: { id: clinicId, labId },
				select: { id: true, name: true },
			});

			if (!clinicExists) {
				throw ERRORS.CLIENT_NOT_FOUND;
			}

			// 2. Fetch the Unbilled Cases
			// We only want cases that are finished production but not yet billed.
			const rawCases = await prisma.case.findMany({
				where: {
					labId,
					clinicId,
					status: { in: ["COMPLETED", "DELIVERED"] },
					invoiceCase: null, // The critical check: ensures no double-billing
				},
				// N+1 Prevention: Select only what the UI needs for the Cart view
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
							jawType: true,
							product: { select: { name: true } },
							_count: { select: { selectedTeeth: true } },
						},
					},
				},
				// Order oldest first, so accountants bill the oldest debt first
				orderBy: { createdAt: "asc" },
			});

			// 3. Map to the highly optimized UI DTO
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
					jawType: item.jawType,
					teethCount: item._count.selectedTeeth,
				})),
			}));

			return {
				cases: mappedCases,
				clinicName: clinicExists.name, // Return the name in case the UI needs to update the locked card
			};
		} catch (error) {
			console.error("[Get-Unbilled-Cases-Action] Error:", error);
			throw error;
		}
	});
