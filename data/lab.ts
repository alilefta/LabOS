// Used by server components only!
"use server";
import { tenantPrisma } from "@/lib/prisma";
import { requireTenantContext } from "@/platform/organizations/tenant-context";
import { toLegacyLabRole } from "@/platform/organizations/legacy-role-compatibility";

/** Loads the Lab linked to the active, verified Organization membership. */
export async function getLabInfo() {
	const tenant = await requireTenantContext();
	const lab = await (await tenantPrisma(tenant.labId)).lab.findUnique({
		where: {
			id: tenant.labId,
		},
	});

	return lab;
}

/**
 * @deprecated Transitional page adapter. It returns the legacy display shape
 * from canonical Member and optional LabStaff context without reading LabUser.
 * Authorization V1 consumers must use permissions instead.
 */
export async function getCurrentLabUserRoleByAuthUserId() {
	const tenant = await requireTenantContext();
	const prisma = await tenantPrisma(tenant.labId);
	const labStaff = tenant.staffId
		? await prisma.labStaff.findFirst({
				where: { id: tenant.staffId, labId: tenant.labId, isActive: true },
				select: { id: true, roleCategory: true },
			})
		: null;

	return {
		role: toLegacyLabRole(tenant.memberRole),
		labId: tenant.labId,
		labStaff,
	};
}
