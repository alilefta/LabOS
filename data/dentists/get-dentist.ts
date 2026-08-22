import { daError, daSuccess } from "@/lib/data-access-errors";
import { ERRORS } from "@/lib/errors";
import { getDataTenantContext } from "@/lib/data-tenant-context";
import { tenantPrisma } from "@/lib/prisma";
import { DentistPersonaDTO, GetClinicDentistPersonasInput } from "@/schema/composed/clinics/clinic-dentists.dtos";
import { startOfDay, subDays } from "date-fns";

export async function getClinicDentistPersonas({ clinicId, limit, searchQuery }: GetClinicDentistPersonasInput) {
	const tenantResult = await getDataTenantContext();
	if (!tenantResult.success) return daError(tenantResult.error);
	const { labId } = tenantResult.data;

	if (!clinicId) {
		return daError(ERRORS.NOT_FOUND.toJSON());
	}

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
	return daSuccess<DentistPersonaDTO[]>(personas);
}
