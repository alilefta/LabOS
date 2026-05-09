"use server";

import { ERRORS } from "@/lib/errors";
import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { APIError } from "better-auth";
import z from "zod";

import { subDays, startOfDay } from "date-fns";
import { GetDentistPersonasInputSchema, DentistPersonaDTO } from "@/schema/composed/clinics/clinic-dentists.dtos";

export const getDentistsByClinicAction = actionClientWithLab
	.metadata({
		actionName: "Get-Dentists-By-Clinic-ID-Action",
		requiredLabRole: "STAFF",
	})
	.inputSchema(
		z.object({
			clinicId: z.string({ error: "Case Id is required." }).min(2),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		const { clinicId } = parsedInput;
		const { labId } = ctx;

		try {
			const prisma = await tenantPrisma(labId);

			const existingClinic = await prisma.clinic.findUnique({
				where: { labId, id: clinicId, status: "ACTIVE" },
				select: {
					status: true,
					id: true,
					type: true,
					dentists: {
						select: {
							id: true,
							isDefault: true,
							isOwner: true,
							name: true,
							email: true,
						},
					},
				},
			});

			if (!existingClinic) {
				throw ERRORS.NOT_FOUND;
			}

			if (existingClinic?.status === "INACTIVE" || existingClinic?.status === "SUSPENDED") {
				// do something
				throw ERRORS.CLINIC_IS_INACTIVE;
			}

			return {
				dentists: existingClinic.dentists,
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Get-Dentists-By-Clinic-ID-Action] Error", e.message);
			}
			throw e;
		}
	});

// ================================== Dentists Details and Analytics for Dentists roaster ======================

export const getClinicDentistPersonasAction = actionClientWithLab
	.metadata({
		actionName: "Get-Clinic-Dentist-Personas-Action",
		requiredLabRole: "STAFF",
	})
	.inputSchema(GetDentistPersonasInputSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { labId } = ctx;
		const { clinicId, searchQuery, limit } = parsedInput;

		const prisma = await tenantPrisma(labId);

		const clinic = await prisma.clinic.findUnique({
			where: { id: clinicId, labId },
			select: { id: true },
		});
		if (!clinic) throw ERRORS.CLIENT_NOT_FOUND;

		const now = new Date();
		const l30Start = subDays(startOfDay(now), 30);
		const l90Start = subDays(startOfDay(now), 90);

		const dentists = await prisma.dentist.findMany({
			where: {
				clinicId,
				labId,
				...(searchQuery?.trim() && {
					name: { contains: searchQuery.trim(), mode: "insensitive" },
				}),
			},
			take: limit,
			orderBy: [{ isDefault: "desc" }, { isOwner: "desc" }, { name: "asc" }],
			select: {
				id: true,
				name: true,
				email: true,
				phoneNumber: true,
				isOwner: true,
				isDefault: true,
				avatarUrl: true,
				specialty: true,
				isActive: true,
				licenseNumber: true,
				cases: {
					where: {
						labId,
						status: { notIn: ["DRAFT"] },
					},
					select: {
						createdAt: true,
						isRemake: true,
						grandTotal: true,
						caseItems: {
							select: {
								workType: {
									select: {
										name: true,
										caseCategory: { select: { name: true } },
									},
								},
							},
						},
					},
				},
			},
		});

		const personas: DentistPersonaDTO[] = dentists.map((d) => {
			const allCases = d.cases;
			const l30Cases = allCases.filter((c) => c.createdAt >= l30Start);
			const l90Cases = allCases.filter((c) => c.createdAt >= l90Start);

			// ── Remake rate (simple) ──────────────────────────────────────────────
			const remakeCount = allCases.filter((c) => c.isRemake).length;
			const remakeRate = allCases.length === 0 ? 0 : Math.round((remakeCount / allCases.length) * 100 * 10) / 10; // 1 decimal

			// ── Generated revenue ─────────────────────────────────────────────────
			const generatedRevenue = allCases.reduce((sum, c) => sum + Number(c.grandTotal ?? 0), 0);

			// ── Top Rx by work item volume ────────────────────────────────────────
			const rxMap = new Map<string, number>();

			allCases.forEach((c) => {
				c.caseItems.forEach((ci) => {
					const workTypeName = ci.workType?.name;
					const categoryName = ci.workType?.caseCategory?.name;
					if (!workTypeName || !categoryName) return;
					const key = `${categoryName} - ${workTypeName}`;
					rxMap.set(key, (rxMap.get(key) ?? 0) + 1);
				});
			});

			const topRx = rxMap.size === 0 ? null : [...rxMap.entries()].sort((a, b) => b[1] - a[1])[0][0];

			return {
				id: d.id,
				name: d.name,
				email: d.email,
				phoneNumber: d.phoneNumber,
				isOwner: d.isOwner,
				isDefault: d.isDefault,
				avatarUrl: null, // Dentist model has no avatarUrl field
				isActive: d.isActive,
				speciality: d.specialty,
				licenseNumber: d.licenseNumber,
				metrics: {
					casesL30D: l30Cases.length,
					casesL90D: l90Cases.length,
					remakeRate,
					topRx,
					generatedRevenue: Math.round(generatedRevenue * 100) / 100,
				},
			};
		});

		return { personas };
	});
