import { daError, daSuccess, toDAError } from "@/lib/data-access-errors";
import { getDataTenantContext } from "@/lib/data-tenant-context";
import { normalizeLabStaff } from "@/lib/mappers";
import { tenantPrisma } from "@/lib/prisma";

export async function getActiveLabStaff() {
	const tenantResult = await getDataTenantContext();
	if (!tenantResult.success) return daError(tenantResult.error);
	const { labId } = tenantResult.data;
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
