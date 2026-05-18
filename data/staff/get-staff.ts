import { daError, daSuccess, toDAError } from "@/lib/data-access-errors";
import { ERRORS } from "@/lib/errors";
import { getServerSession } from "@/lib/get-session";
import { normalizeLabStaff } from "@/lib/mappers";
import { tenantPrisma } from "@/lib/prisma";

export async function getActiveLabStaff() {
	const session = await getServerSession();

	if (!session) {
		return daError(ERRORS.UNAUTHORIZED.toJSON());
	}

	const labId = session.user.labId;

	if (!labId) {
		return daError(ERRORS.LAB_NOT_FOUND.toJSON());
	}
	try {
		const prisma = await tenantPrisma(labId);
		const staffMembers = await prisma.labStaff.findMany({
			where: {
				labId: labId,
				isActive: true,
			},
			orderBy: {
				createdAt: "desc",
			},
			include: {
				lab: true,
			},
		});

		return daSuccess(staffMembers.map(normalizeLabStaff));
	} catch (e) {
		return toDAError(e);
	}
}
