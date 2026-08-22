import { daError, DAResult, daSuccess, toDAError } from "@/lib/data-access-errors";
import { ERRORS } from "@/lib/errors";
import { getDataTenantContext } from "@/lib/data-tenant-context";
import { tenantPrisma } from "@/lib/prisma";
import z from "zod";

export async function getStaffCasesHeaderData(staffId: string): Promise<
	DAResult<{
		id: string;
		firstName: string;
		lastName: string;
		activeCaseCount: number;
	}>
> {
	try {
		const tenantResult = await getDataTenantContext();
		if (!tenantResult.success) return daError(tenantResult.error);
		const { labId } = tenantResult.data;

		const results = z.string().uuid().safeParse(staffId);
		if (!results.success) return daError(ERRORS.INVALID_INPUT.toJSON());
		const parsedId = results.data;

		const prisma = await tenantPrisma(labId);

		const staff = await prisma.labStaff.findUnique({
			where: { id: parsedId, labId },
			select: {
				id: true,
				firstName: true,
				lastName: true,
				// N+1 Prevention: Get only the active workload count!
				_count: {
					select: {
						caseAssignments: {
							where: {
								dentalCase: { status: { in: ["ASSIGNED", "PROCESSING"] } },
							},
						},
					},
				},
			},
		});

		if (!staff) return daError(ERRORS.NOT_FOUND.toJSON());

		return daSuccess({
			id: staff.id,
			firstName: staff.firstName,
			lastName: staff.lastName,
			activeCaseCount: staff._count.caseAssignments,
		});
	} catch (e) {
		return toDAError(e);
	}
}
