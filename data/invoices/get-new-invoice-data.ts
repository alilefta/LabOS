import { tenantPrisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/get-session";
import { ERRORS } from "@/lib/errors";
import { daError, daSuccess, toDAError, DAResult } from "@/lib/data-access-errors";
import { EligibleClinicDTO, NewInvoiceOnboardingData, UnbilledCaseDTO } from "@/schema/composed/invoices/new.invoice.dtos";

export async function getNewInvoiceOnboardingData(clinicId?: string): Promise<DAResult<NewInvoiceOnboardingData>> {
	try {
		// 1. SECURE TENANT ISOLATION
		const session = await getServerSession();
		if (!session) {
			return daError(ERRORS.UNAUTHORIZED.toJSON());
		}

		const labId = session.user.labId;
		if (!labId) {
			return daError(ERRORS.LAB_NOT_FOUND.toJSON());
		}

		const prisma = await tenantPrisma(labId);

		let prefetchedCases: UnbilledCaseDTO[] = [];
		let eligibleClinics: EligibleClinicDTO[] = [];
		let selectedClinicName: string | null = null;

		// 2. CONDITIONAL HYDRATION LOGIC
		if (clinicId) {
			// Verify clinic exists and belongs to this lab tenant
			const clinic = await prisma.clinic.findUnique({
				where: { id: clinicId, labId },
				select: { name: true },
			});

			if (!clinic) {
				return daError(ERRORS.NOT_FOUND.toJSON());
			}

			selectedClinicName = clinic.name;

			// Prefetch unbilled cases for the selected clinic (High Performance Query)
			const rawCases = await prisma.case.findMany({
				where: {
					labId,
					clinicId,
					status: { in: ["COMPLETED", "DELIVERED"] },
					invoiceCase: null,
				},
				include: {
					patient: { select: { name: true } },
					dentist: { select: { name: true } },
					caseItems: {
						include: {
							product: { select: { name: true } },
							workType: { select: { name: true } },
							_count: { select: { selectedTeeth: true } },
						},
					},
				},
				orderBy: { createdAt: "desc" },
			});

			prefetchedCases = rawCases.map((c) => ({
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
		} else {
			// Fetch only clinics with unbilled cases (Optimized flat query)
			eligibleClinics = await prisma.clinic.findMany({
				where: {
					labId,
					cases: {
						some: {
							status: { in: ["COMPLETED", "DELIVERED"] },
							invoiceCase: null,
						},
					},
				},

				select: {
					id: true,
					name: true,
					city: true,
					type: true,
					phoneNumber: true,
					email: true,
					website: true,
					status: true,
					labId: true,
				},
				orderBy: { name: "asc" },
			});
		}

		return daSuccess({
			prefetchedCases,
			eligibleClinics,
			selectedClinicName,
		});
	} catch (e) {
		return toDAError(e);
	}
}
