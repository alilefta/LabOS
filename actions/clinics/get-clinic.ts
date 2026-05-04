"use server";

import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { z } from "zod";
import { ERRORS } from "@/lib/errors";
import { composeClinicQuickOverviewDTO } from "@/lib/mappers/composers";
import { APIError } from "better-auth";
import { normalizeClinic } from "@/lib/mappers";

export const getClinicQuickOverviewAction = actionClientWithLab
	.metadata({
		actionName: "Get-Clinic-Quick-Overview-Action",
		requiredLabRole: "STAFF",
	})
	.inputSchema(z.object({ clinicId: z.string().min(1) }))
	.action(async ({ ctx, parsedInput }) => {
		const { labId } = ctx;
		const { clinicId } = parsedInput;
		try {
			const prisma = await tenantPrisma(labId);

			const clinic = await prisma.clinic.findUnique({
				where: { id: clinicId, labId },

				select: {
					id: true,
					name: true,
					type: true,
					status: true,
					city: true,
					address1: true,
					phoneNumber: true,
					email: true,
					createdAt: true,
					currentBalance: true,
					creditLimit: true,
					invoices: {
						select: {
							payments: {
								take: 3,
								orderBy: { paidAt: "desc" },
								select: {
									id: true,
									amount: true,
									paidAt: true,
									method: true,
								},
							},
						},
					},
					dentists: {
						orderBy: { isDefault: "desc" },
						select: { id: true, name: true, isDefault: true },
					},
					cases: {
						take: 3,
						orderBy: { createdAt: "desc" },
						select: {
							id: true,
							deadline: true,
							patientId: true,
							status: true,
							caseNumber: true,
							caseItems: {
								take: 2,
								select: { product: { select: { name: true } }, jawType: true },
							},
							invoiceCase: { select: { invoiceId: true } },
							caseCategory: {
								select: {
									name: true,
								},
							},
							patient: {
								select: {
									name: true,
								},
							},
						},
					},
				},
			});

			if (!clinic) throw ERRORS.NOT_FOUND;

			// Calculate Uninvoiced Cases Count (Completed/Delivered with no InvoiceCase)
			// Note: For extreme performance at 5k+ clinics, consider moving this to a dedicated `count`
			const uninvoicedCount = await prisma.case.count({
				where: {
					clinicId,
					labId,
					status: { in: ["COMPLETED", "DELIVERED"] },
					invoiceCase: null,
				},
			});

			// payments is calculated inside the composer
			return composeClinicQuickOverviewDTO(clinic, uninvoicedCount);
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Create-New-Dental-Case-Action] Error", e.message);
			}
			throw e;
		}
	});

export const getClinicDetailsAction = actionClientWithLab
	.metadata({
		actionName: "Get-Clinic-Details-Action",
		requiredLabRole: "STAFF",
	})
	.inputSchema(z.object({ clinicId: z.string().min(1) }))
	.action(async ({ ctx, parsedInput }) => {
		const { labId } = ctx;
		const { clinicId } = parsedInput;
		try {
			const prisma = await tenantPrisma(labId);

			const clinic = await prisma.clinic.findUnique({
				where: { id: clinicId, labId },
				select: {
					id: true,
					name: true,
					type: true,
					status: true,
					city: true,
					address1: true,
					address2: true,
					zipcode: true,
					email: true,
					phoneNumber: true,
					billingEmail: true,
					billingPhoneNumber: true,
					taxNumber: true,
					website: true,
					description: true,
					notes: true,
					currentBalance: true,
					creditLimit: true,
					discount: true,
					createdAt: true,
					updatedAt: true,
					labId: true,
				},
			});

			if (!clinic) throw ERRORS.CLIENT_NOT_FOUND;

			return { clinic: normalizeClinic(clinic) };
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Create-New-Dental-Case-Action] Error", e.message);
			}
			throw e;
		}
	});
