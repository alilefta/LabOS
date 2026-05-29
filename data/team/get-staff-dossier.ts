// data/team/get-staff-dossier.ts

import { tenantPrisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/get-session";
import { ERRORS } from "@/lib/errors";
import { daError, daSuccess, toDAError, DAResult } from "@/lib/data-access-errors";
import { differenceInDays, startOfDay } from "date-fns";
import { StaffDossierDTO, StaffHeaderDTO, StaffMetadataDTO, SystemAccessState } from "@/schema/composed/team/staff-dossier.dtos"; // Adjust path
import z from "zod";

const InputSchema = z.string().uuid("Invalid Staff ID format");

export async function getStaffDossierData(staffId: string): Promise<DAResult<StaffDossierDTO>> {
	try {
		// 1. SECURITY GATES
		const session = await getServerSession();
		if (!session) {
			return daError(ERRORS.UNAUTHORIZED.toJSON());
		}

		const labId = session.user.labId;
		if (!labId) {
			return daError(ERRORS.LAB_NOT_FOUND.toJSON());
		}

		// Sanitize input
		const parsedId = InputSchema.safeParse(staffId);
		if (!parsedId.success) {
			return daError(ERRORS.INVALID_INPUT.toJSON());
		}

		const prisma = await tenantPrisma(labId);

		// 2. OPTIMIZED DATABASE QUERY
		const staff = await prisma.labStaff.findUnique({
			where: { id: parsedId.data, labId },
			include: {
				labUser: {
					select: { id: true, role: true },
				},
				labInvitation: {
					select: { token: true, email: true, roleToGrant: true, expiresAt: true },
				},
				// N+1 Prevention: Fetch active workload & finished assignments in one query [3]
				caseAssignments: {
					include: {
						dentalCase: {
							select: {
								id: true,
								status: true,
								isRemake: true,
								createdAt: true,
								completedAt: true,
							},
						},
					},
				},
			},
		});

		if (!staff) {
			return daError(ERRORS.NOT_FOUND.toJSON());
		}

		// 3. THE HR MATHEMATICAL ENGINE (Calculated on server) [2]
		const activeCases = staff.caseAssignments.filter((ca) => ca.dentalCase.status === "ASSIGNED" || ca.dentalCase.status === "PROCESSING");

		const completedCases = staff.caseAssignments.filter((ca) => ca.dentalCase.status === "COMPLETED" || ca.dentalCase.status === "DELIVERED");

		const failedCases = staff.caseAssignments.filter((ca) => ca.dentalCase.status === "FAILED" || ca.dentalCase.isRemake);

		// A. Burnout Risk calculation based on active count [2]
		const activeCount = activeCases.length;
		let burnoutRisk: "LOW" | "MEDIUM" | "HIGH" = "LOW";
		if (activeCount >= 15) burnoutRisk = "HIGH";
		else if (activeCount >= 8) burnoutRisk = "MEDIUM";

		// B. Remake Rate (Quality) [2]
		const totalHistoricalCount = completedCases.length + failedCases.length;
		let remakeRate = 0;
		if (totalHistoricalCount > 0) {
			remakeRate = (failedCases.length / totalHistoricalCount) * 100;
		}

		// C. Speed / Turnaround Time (immutable calculations) [2]
		let totalDays = 0;
		let validSpeedCases = 0;

		completedCases.forEach((ca) => {
			if (ca.dentalCase.completedAt) {
				const days = differenceInDays(startOfDay(new Date(ca.dentalCase.completedAt)), startOfDay(new Date(ca.dentalCase.createdAt)));
				totalDays += days;
				validSpeedCases++;
			}
		});

		const avgTurnaroundDays = validSpeedCases > 0 ? Math.round((totalDays / validSpeedCases) * 10) / 10 : null;

		// 4. RESOLVE IDENTITY ACCESS STATE
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

		// 5. MAP TO SECURE DTO
		const sanitizedDossier: StaffDossierDTO = {
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
				totalCompletedCases: completedCases.length,
				avgTurnaroundDays,
				remakeRate,
				burnoutRisk,
			},
		};

		return daSuccess(sanitizedDossier);
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
