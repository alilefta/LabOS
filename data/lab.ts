// Used by server components only!

import { ERRORS } from "@/lib/errors";
import { getServerSession } from "@/lib/get-session";
import { generalPrisma, tenantPrisma } from "@/lib/prisma";

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

export async function getLabUserRoleByAuthUserId(authUserId: string) {
	const labUser = await generalPrisma.labUser.findUnique({
		where: { authUserId: authUserId },
		select: { labId: true, role: true },
	});

	return labUser;
}
