// data-access/invoices/get-uninvoiced-summary.ts

import { tenantPrisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/get-session";
import { ERRORS } from "@/lib/errors";
import { daError, DAResult, daSuccess, toDAError } from "@/lib/data-access-errors";
import { UninvoicedClinicsSummary } from "@/schema/composed/invoices/invoices.dtos";

export async function getUninvoicedClinicsSummary(): Promise<DAResult<UninvoicedClinicsSummary>> {
	try {
		// ─────────────────────────────────────────────────────────────────
		// STEP 1: SECURITY GUARDS
		// Resolve the tenant context strictly from the server session [1].
		// This mathematically prevents cross-tenant data leaks [2].
		// ─────────────────────────────────────────────────────────────────
		const session = await getServerSession();

		if (!session) {
			return daError(ERRORS.UNAUTHORIZED.toJSON());
		}

		const labId = session.user.labId;

		if (!labId) {
			return daError(ERRORS.LAB_NOT_FOUND.toJSON());
		}

		const prisma = await tenantPrisma(labId);

		// ─────────────────────────────────────────────────────────────────
		// STEP 2: HIGH-PERFORMANCE GROUPBY AGGREGATION [3]
		// We query the Case table directly, utilizing the @@index([labId, status]) index.
		// This completely bypasses heavy nested-loop scans on the Clinic table [3].
		// ─────────────────────────────────────────────────────────────────
		const unbilledGrouped = await prisma.case.groupBy({
			by: ["clinicId"],
			where: {
				labId,
				status: { in: ["COMPLETED", "DELIVERED"] },
				invoiceCase: null, // Select only cases with no invoice attached [3]
			},
			_count: {
				id: true, // Count unbilled cases per clinic
			},
			orderBy: {
				_count: {
					id: "desc", // STRICT SORT: Places heaviest unbilled accounts at the top [4]
				},
			},
		});

		if (unbilledGrouped.length === 0) {
			return daSuccess({ clinics: [], totalUnbilledCases: 0 });
		}

		// ─────────────────────────────────────────────────────────────────
		// STEP 3: IN-MEMORY CALCULATIONS & BATCH LOOKUP [5, 6]
		// Sum counts in-memory to save a secondary DB count query [5].
		// Execute a flat primary-key lookup to get the Clinic Names for the top 5 [6].
		// ─────────────────────────────────────────────────────────────────
		const totalUnbilledCases = unbilledGrouped.reduce((sum, item) => sum + item._count.id, 0);

		const top5Groups = unbilledGrouped.slice(0, 5);
		const clinicIds = top5Groups.map((g) => g.clinicId).filter((id): id is string => id !== null); // Safely filter out nulls

		const clinicNames = await prisma.clinic.findMany({
			where: { id: { in: clinicIds }, labId }, // Force labId context for absolute security [2]
			select: { id: true, name: true },
		});

		const clinicNameMap = new Map(clinicNames.map((c) => [c.id, c.name]));

		// Map to our strict, clean DTO shape
		const clinics = top5Groups
			.map((g) => {
				if (!g.clinicId) return null;
				const name = clinicNameMap.get(g.clinicId);
				if (!name) return null; // Fallback

				return {
					id: g.clinicId,
					name,
					unbilledCount: g._count.id,
				};
			})
			.filter((c): c is { id: string; name: string; unbilledCount: number } => c !== null);

		return daSuccess({
			clinics,
			totalUnbilledCases,
		});
	} catch (e) {
		return toDAError(e); // Safe, uniform fallback catch
	}
}
