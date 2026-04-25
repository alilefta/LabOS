// Used by server components only!

import { ERRORS } from "@/lib/errors";
import { getServerSession } from "@/lib/get-session";
import { tenantPrisma } from "@/lib/prisma";

export async function getLabInfo() {
	const session = await getServerSession();
	if (!session) throw ERRORS.UNAUTHORIZED;

	if (!session.user.labId) {
		throw ERRORS.UNAUTHORIZED;
	}
	const lab = await (
		await tenantPrisma(session.user.labId)
	).lab.findUnique({
		where: {
			id: session.user.labId,
		},
	});

	return lab;
}

export async function getCurrentLabUserRoleByAuthUserId() {
	const session = await getServerSession();
	// Use a redirect or a proper Error throw here
	if (!session || !session.user.labId) throw new Error("UNAUTHORIZED");

	const prisma = await tenantPrisma(session.user.labId);

	return await prisma.labUser.findUnique({
		where: { authUserId: session.user.id },
		// We only need these specific fields for the permissions context
		select: {
			role: true,
			labId: true,
			labStaff: {
				select: {
					roleCategory: true,
					id: true,
				},
			},
		},
	});
}
