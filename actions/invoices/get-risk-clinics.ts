"use server";

import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { RiskClinicDTO } from "@/schema/composed/invoices/invoices.dtos";

export const getArRiskClinicsAction = actionClientWithLab
	.metadata({
		actionName: "Get-AR-Risk-Clinics-Action",
		// SECURITY: Limited strictly to internal staff/accountants
		requiredLabRole: "STAFF",
	})
	.action(async ({ ctx }) => {
		const { labId } = ctx;
		const prisma = await tenantPrisma(labId);

		const now = new Date();

		// ─────────────────────────────────────────────────────────────────
		// STEP 1: Optimized Database Query (N+1 Proof)
		// Fetch clinics with positive balance OR overdue invoices
		// ─────────────────────────────────────────────────────────────────
		const rawClinics = await prisma.clinic.findMany({
			where: {
				labId,
				status: "ACTIVE", // Only monitor active accounts
				OR: [
					{ currentBalance: { gt: 0 } },
					{
						invoices: {
							some: {
								status: "OVERDUE",
								amountDue: { gt: 0 },
							},
						},
					},
				],
			},
			select: {
				id: true,
				name: true,
				city: true,
				phoneNumber: true,
				currentBalance: true,
				creditLimit: true,
				// N+1 Prevention: Pull only the IDs of overdue unpaid invoices to count them [2]
				invoices: {
					where: {
						status: "OVERDUE",
						amountDue: { gt: 0 },
						dueDate: { lt: now }, // Double check dates
					},
					select: { id: true },
				},
			},
		});

		// ─────────────────────────────────────────────────────────────────
		// STEP 2: In-Memory Filtering & DTO Mapping
		// ─────────────────────────────────────────────────────────────────
		const riskClinics: RiskClinicDTO[] = rawClinics
			.map((c) => {
				const balance = Number(c.currentBalance);
				const limit = c.creditLimit ? Number(c.creditLimit) : 0;
				const overdueCount = c.invoices.length;

				// Determine if the clinic actually violates business rules
				const isOverLimit = limit > 0 && balance > limit;
				const hasOverdueInvoices = overdueCount > 0;

				if (!isOverLimit && !hasOverdueInvoices) return null;

				return {
					id: c.id,
					name: c.name,
					city: c.city,
					phoneNumber: c.phoneNumber,
					currentBalance: balance,
					creditLimit: limit,
					overdueInvoiceCount: overdueCount,
				};
			})
			.filter((c): c is RiskClinicDTO => c !== null); // Filter out healthy clinics [4]

		return { clinics: riskClinics };
	});
