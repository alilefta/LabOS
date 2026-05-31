// data/team/get-staff-paystub.ts

import { tenantPrisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/get-session";
import { ERRORS } from "@/lib/errors";
import { daError, daSuccess, toDAError, DAResult } from "@/lib/data-access-errors";
import { startOfDay, endOfDay } from "date-fns";
import z from "zod";
import { getCurrentLabUserRoleByAuthUserId } from "../lab";

const InputSchema = z.object({
	staffId: z.string().uuid(),
	dateKey: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format YYYY-MM-DD"),
});

export interface StaffPaystubDTO {
	payoutDate: Date;
	staff: {
		id: string;
		name: string;
		jobTitle: string | null;
		roleCategory: string;
	};
	lab: {
		title: string;
		subtitle: string | null;
	};
	cases: {
		caseNumber: string;
		patientName: string;
		caseTotal: number;
		commissionTotal: number;
	}[];
	totalDisbursed: number;
}

export async function getStaffPaystubData(staffId: string, dateKey: string): Promise<DAResult<StaffPaystubDTO>> {
	try {
		// ── 1. STRICT SECURITY GUARD (Dual-Authorization) ───────────────────
		const session = await getServerSession();
		if (!session) return daError(ERRORS.UNAUTHORIZED.toJSON());

		const labId = session.user.labId;
		if (!labId) return daError(ERRORS.LAB_NOT_FOUND.toJSON());

		// A. Validate Input
		const parsed = InputSchema.safeParse({ staffId, dateKey });
		if (!parsed.success) return daError(ERRORS.INVALID_INPUT.toJSON());

		const labUser = await getCurrentLabUserRoleByAuthUserId();
		if (!labUser) return daError(ERRORS.LAB_NOT_FOUND.toJSON());

		const labStaff = labUser.labStaff;
		if (!labStaff) return daError(ERRORS.LAB_NOT_FOUND.toJSON());

		// B. Authorization check: Owner/Manager OR The Employee themselves [2]
		const isManager = labUser.role === "OWNER" || labUser.role === "MANAGER";
		const isSelf = labUser.labStaff?.id === staffId; // Matches their linked human record [2]

		if (!isManager && !isSelf) {
			return daError(ERRORS.UNAUTHORIZED.toJSON());
		}

		const prisma = await tenantPrisma(labId);

		// Resolve date boundaries for the specific YYYY-MM-DD string
		const targetDate = new Date(dateKey);
		const start = startOfDay(targetDate);
		const end = endOfDay(targetDate);

		// ── 2. DATABASE FETCH ───────────────────────────────────────────────
		const [staff, assignments] = await Promise.all([
			prisma.labStaff.findUnique({
				where: { id: staffId, labId },
				select: { id: true, firstName: true, lastName: true, jobTitle: true, roleCategory: true },
			}),
			prisma.caseStaffAssignment.findMany({
				where: {
					labId,
					staffId,
					isPaid: true,
					paidAt: { gte: start, lte: end }, // Fetch all paid on this specific day
				},
				include: {
					dentalCase: {
						select: {
							caseNumber: true,
							grandTotal: true,
							patient: { select: { name: true } },
						},
					},
				},
			}),
		]);

		if (!staff) return daError(ERRORS.NOT_FOUND.toJSON());
		if (assignments.length === 0) return daError(ERRORS.NOT_FOUND.toJSON());

		// ── 3. MAP TO SANITIZED DTO ─────────────────────────────────────────
		const totalDisbursed = assignments.reduce((sum, item) => sum + Number(item.commissionTotal), 0);
		const lab = await prisma.lab.findFirst({ where: { id: labId }, select: { title: true, subtitle: true } });

		return daSuccess({
			payoutDate: targetDate,
			staff: {
				id: staff.id,
				name: `${staff.firstName} ${staff.lastName}`,
				jobTitle: staff.jobTitle,
				roleCategory: staff.roleCategory,
			},
			lab: {
				title: lab?.title || "LabOS",
				subtitle: lab?.subtitle || "Dental Lab",
			},
			cases: assignments.map((a) => ({
				caseNumber: a.dentalCase.caseNumber,
				patientName: a.dentalCase.patient.name,
				caseTotal: Number(a.dentalCase.grandTotal ?? 0),
				commissionTotal: Number(a.commissionTotal),
			})),
			totalDisbursed,
		});
	} catch (e) {
		return toDAError(e);
	}
}
