import { CaseActivityLogCreateManyInput } from "@/generated/prisma/models";
import { tenantPrisma } from "@/lib/prisma";

/**
 * Resolves a human-readable name for a LabUser for logging purposes.
 * Priority: LabStaff (Operational Identity) -> AuthUser (Account Identity)
 */
export async function resolveActorName(labUserId: string, labId: string): Promise<string> {
	const prisma = await tenantPrisma(labId);

	const user = await prisma.labUser.findUnique({
		where: { id: labUserId },
		select: {
			authUser: { select: { name: true } },
			labStaff: { select: { firstName: true, lastName: true } },
		},
	});

	if (!user) return "Unknown User";

	// If linked to physical staff, use that name (The Lab's source of truth)
	if (user.labStaff) {
		return `${user.labStaff.firstName} ${user.labStaff.lastName}`;
	}

	// Fallback to the Global Account Name (e.g. from Google SSO)
	return user.authUser.name || "System";
}

// Build a log entry object — used inside every transaction
export function buildLogEntry({ caseId, labId, actorId, actorName, type, summary, payload }: CaseActivityLogCreateManyInput) {
	return {
		caseId,
		labId,
		actorId,
		actorName,
		type,
		summary,
		payload: payload,
	};
}
