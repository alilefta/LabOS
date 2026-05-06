"use server";

import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { z } from "zod";
import { ERRORS } from "@/lib/errors";
import { composeClinicQuickOverviewDTO } from "@/lib/mappers/composers";
import { APIError } from "better-auth";
import { normalizeClinic } from "@/lib/mappers";
import { differenceInDays, startOfDay } from "date-fns";
import { CaseStatus } from "@/schema/base/enums.base";

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

// ========================= Get Data for Active Pipline Kanban Board =============================

export const getClinicActivePipelineAction = actionClientWithLab
	.metadata({
		actionName: "Get-Clinic-Active-Pipeline-Action",
		requiredLabRole: "STAFF",
	})
	.inputSchema(
		z.object({
			clinicId: z.string().min(1),
		}),
	)
	.action(async ({ ctx, parsedInput }) => {
		const { labId } = ctx;
		const { clinicId } = parsedInput;
		try {
			const prisma = await tenantPrisma(labId);

			// 1. Fetch all cases in "Active" statuses
			const activeCasesRaw = await prisma.case.findMany({
				where: {
					clinicId,
					labId,
					status: { in: ["NEW", "ASSIGNED", "PROCESSING"] },
				},
				include: {
					patient: {
						select: { name: true },
					},
					caseItems: {
						select: {
							product: { select: { name: true } },
						},
					},
					staffAssignments: {
						// We only care about production staff for the Kanban UI
						where: {
							roleCategory: { in: ["TECHNICIAN", "SENIOR_TECHNICIAN", "MANAGER", "QC_INSPECTOR"] },
						},
						include: {
							staff: {
								select: {
									firstName: true,
									lastName: true,
									avatarUrl: true,
									jobTitle: true,
								},
							},
						},
					},
				},
				orderBy: {
					deadline: "asc", // Show most urgent cases at the top of columns
				},
			});

			// 2. Transform into DTO with UX helper flags (like isRush)
			const today = startOfDay(new Date());

			const cases = activeCasesRaw.map((c) => {
				const daysUntilDeadline = c.deadline ? differenceInDays(startOfDay(c.deadline), today) : null;

				return {
					id: c.id,
					caseNumber: c.caseNumber,
					status: c.status as CaseStatus,
					patientName: c.patient.name,
					// Flatten products into an array of strings
					products: c.caseItems.map((item) => item.product?.name ?? "Unknown Product"),
					// Find the primary technician assigned (if any)
					leadTech: c.staffAssignments[0]?.staff
						? {
								name: `${c.staffAssignments[0].staff.firstName} ${c.staffAssignments[0].staff.lastName}`,
								avatar: c.staffAssignments[0].staff.avatarUrl,
								title: c.staffAssignments[0].staff.jobTitle,
							}
						: null,
					deadline: c.deadline,
					isRush: daysUntilDeadline !== null && daysUntilDeadline <= 3,
					isRemake: c.isRemake,
				};
			});

			// 3. Group by Status for the Kanban Columns
			const pipeline = {
				NEW: cases.filter((c) => c.status === "NEW"),
				ASSIGNED: cases.filter((c) => c.status === "ASSIGNED"),
				PROCESSING: cases.filter((c) => c.status === "PROCESSING"),
			};

			return {
				pipeline,
				totalActive: cases.length,
				rushCount: cases.filter((c) => c.isRush).length,
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Create-New-Dental-Case-Action] Error", e.message);
			}
			throw e;
		}
	});
