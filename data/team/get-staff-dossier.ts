// data/team/get-staff-dossier.ts

import { tenantPrisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/get-session";
import { ERRORS } from "@/lib/errors";
import { daError, daSuccess, toDAError, DAResult } from "@/lib/data-access-errors";
import { StaffDossierDTO, StaffHeaderDTO, StaffMetadataDTO, SystemAccessState } from "@/schema/composed/team/staff-dossier.dtos"; // Adjust path
import z from "zod";

const InputSchema = z.string().uuid("Invalid Staff ID format");

export async function getStaffDossierData(staffId: string): Promise<DAResult<StaffDossierDTO>> {
	try {
		// ── 1. SECURITY GATES ───────────────────────────────────────────────
		const session = await getServerSession();
		if (!session) {
			return daError(ERRORS.UNAUTHORIZED.toJSON());
		}

		const labId = session.user.labId;
		if (!labId) {
			return daError(ERRORS.LAB_NOT_FOUND.toJSON());
		}

		const parsedId = InputSchema.safeParse(staffId);
		if (!parsedId.success) {
			return daError(ERRORS.INVALID_INPUT.toJSON());
		}

		const prisma = await tenantPrisma(labId);

		// ── 2. DATABASE READS (N+1 PROOF & RUN IN PARALLEL) ─────────────────
		// We execute 4 queries in parallel.
		// Notice the raw SQL query running alongside the Prisma ORM queries!
		const [staff, completedAgg, failedAgg, rawSpeedResult] = await Promise.all([
			// A. Fetch core details + only active case assignments (O(1) memory)
			prisma.labStaff.findUnique({
				where: { id: parsedId.data, labId },
				include: {
					labUser: { select: { id: true, role: true } },
					labInvitation: { select: { token: true, email: true, roleToGrant: true, expiresAt: true } },
					caseAssignments: {
						where: {
							dentalCase: { status: { in: ["ASSIGNED", "PROCESSING"] } },
						},
						select: { id: true },
					},
				},
			}),

			// B. Aggregate completed cases directly inside PostgreSQL
			prisma.caseStaffAssignment.aggregate({
				where: {
					staffId: parsedId.data,
					labId,
					dentalCase: { status: { in: ["COMPLETED", "DELIVERED"] } },
				},
				_count: { id: true },
			}),

			// C. Aggregate failed/remake cases directly inside PostgreSQL
			prisma.caseStaffAssignment.aggregate({
				where: {
					staffId: parsedId.data,
					labId,
					OR: [{ dentalCase: { status: "FAILED" } }, { dentalCase: { isRemake: true } }],
				},
				_count: { id: true },
			}),

			// D. 🔥 THE RAW SQL SPEED ENGINE (O(1) Space Complexity)
			// We calculate the average difference between completedAt and createdAt in seconds (EPOCH),
			// divide by 86400 (seconds in a day), and let PostgreSQL run the math.
			// Prisma parameterized templates automatically protect against SQL injection.
			prisma.$queryRaw<[{ avgDays: number | null }]>`
				SELECT AVG(EXTRACT(EPOCH FROM (c."completedAt" - c."createdAt"))) / 86400 AS "avgDays"
				FROM "Case" c
				INNER JOIN "CaseStaffAssignment" csa ON c."id" = csa."caseId"
				WHERE csa."staffId" = ${parsedId.data}::uuid
				  AND csa."labId" = ${labId}::uuid
				  AND c."status" IN ('COMPLETED', 'DELIVERED')
				  AND c."completedAt" IS NOT NULL
			`,
		]);

		if (!staff) {
			return daError(ERRORS.NOT_FOUND.toJSON());
		}

		// ── 3. THE HR METRIC COMPILER ───────────────────────────────────────
		const activeCount = staff.caseAssignments.length;

		// A. Burnout Risk
		let burnoutRisk: "LOW" | "MEDIUM" | "HIGH" = "LOW";
		if (activeCount >= 15) burnoutRisk = "HIGH";
		else if (activeCount >= 8) burnoutRisk = "MEDIUM";

		// B. Remake Rate (Quality)
		const totalCompleted = completedAgg._count.id;
		const totalFailed = failedAgg._count.id;
		const totalHistoricalCount = totalCompleted + totalFailed;

		let remakeRate = 0;
		if (totalHistoricalCount > 0) {
			remakeRate = (totalFailed / totalHistoricalCount) * 100;
		}

		// C. Speed / Turnaround Time (Read directly from the single raw SQL float)
		const rawAvgDays = rawSpeedResult[0]?.avgDays;
		const avgTurnaroundDays = rawAvgDays !== null && rawAvgDays !== undefined ? Math.round(Number(rawAvgDays) * 10) / 10 : null;

		// ── 4. RESOLVE SECURITY PORTAL STATUS ──────────────────────────────
		const now = new Date();
		let accessState: SystemAccessState = "NO_ACCESS";
		let systemRole = null;
		let inviteEmail = null;
		let inviteToken = null;

		if (staff.labUser) {
			accessState = "ACTIVE_USER";
			systemRole = staff.labUser.role;
		} else if (staff.labInvitation && staff.labInvitation.expiresAt > now) {
			accessState = "PENDING_INVITE";
			systemRole = staff.labInvitation.roleToGrant;
			inviteEmail = staff.labInvitation.email;
			inviteToken = staff.labInvitation.token;
		}

		// ── 5. MAP TO SECURE, SANITIZED DTO ────────────────────────────────
		return daSuccess({
			id: staff.id,
			firstName: staff.firstName,
			lastName: staff.lastName,
			phoneNumber: staff.phoneNumber,
			avatarUrl: staff.avatarUrl,
			roleCategory: staff.roleCategory,
			jobTitle: staff.jobTitle,
			specialization: staff.specialization,
			isActive: staff.isActive,

			commissionType: staff.commissionType,
			commissionValue: staff.commissionValue ? Number(staff.commissionValue) : null,

			accessState,
			systemRole,
			inviteEmail,
			inviteToken,

			vitals: {
				activeCaseCount: activeCount,
				totalCompletedCases: totalCompleted,
				avgTurnaroundDays,
				remakeRate,
				burnoutRisk,
			},
		});
	} catch (e) {
		return toDAError(e);
	}
}

// ── DAF 1: GET STAFF METADATA (Blistering Fast PK Select) ───────────────────
export async function getStaffMetadata(staffId: string): Promise<DAResult<StaffMetadataDTO>> {
	try {
		const session = await getServerSession();
		if (!session) return daError(ERRORS.UNAUTHORIZED.toJSON());

		const labId = session.user.labId;
		if (!labId) return daError(ERRORS.LAB_NOT_FOUND.toJSON());

		const parsedId = InputSchema.safeParse(staffId);
		if (!parsedId.success) return daError(ERRORS.INVALID_INPUT.toJSON());

		const prisma = await tenantPrisma(labId);

		const staff = await prisma.labStaff.findUnique({
			where: { id: parsedId.data, labId },
			select: {
				id: true,
				firstName: true,
				lastName: true,
			},
		});

		if (!staff) return daError(ERRORS.NOT_FOUND.toJSON());

		return daSuccess(staff);
	} catch (e) {
		return toDAError(e);
	}
}

// ── DAF 2: GET STAFF HEADER DATA (Zero Relational Aggregations) ──────────────
export async function getStaffHeaderData(staffId: string): Promise<DAResult<StaffHeaderDTO>> {
	try {
		const session = await getServerSession();
		if (!session) return daError(ERRORS.UNAUTHORIZED.toJSON());

		const labId = session.user.labId;
		if (!labId) return daError(ERRORS.LAB_NOT_FOUND.toJSON());

		const parsedId = InputSchema.safeParse(staffId);
		if (!parsedId.success) return daError(ERRORS.INVALID_INPUT.toJSON());

		const prisma = await tenantPrisma(labId);

		const staff = await prisma.labStaff.findUnique({
			where: { id: parsedId.data, labId },
			select: {
				id: true,
				firstName: true,
				lastName: true,
				phoneNumber: true,
				avatarUrl: true,
				roleCategory: true,
				jobTitle: true,
				specialization: true,
				isActive: true,
				labUser: {
					select: { role: true },
				},
				labInvitation: {
					select: { email: true, roleToGrant: true, expiresAt: true },
				},
			},
		});

		if (!staff) return daError(ERRORS.NOT_FOUND.toJSON());

		const now = new Date();
		let accessState: SystemAccessState = "NO_ACCESS";
		let systemRole = null;
		let inviteEmail = null;

		if (staff.labUser) {
			accessState = "ACTIVE_USER";
			systemRole = staff.labUser.role;
		} else if (staff.labInvitation && staff.labInvitation.expiresAt > now) {
			accessState = "PENDING_INVITE";
			systemRole = staff.labInvitation.roleToGrant;
			inviteEmail = staff.labInvitation.email;
		}

		return daSuccess({
			id: staff.id,
			firstName: staff.firstName,
			lastName: staff.lastName,
			phoneNumber: staff.phoneNumber,
			avatarUrl: staff.avatarUrl,
			roleCategory: staff.roleCategory,
			jobTitle: staff.jobTitle,
			specialization: staff.specialization,
			isActive: staff.isActive,
			accessState,
			systemRole,
			inviteEmail,
		});
	} catch (e) {
		return toDAError(e);
	}
}
