import { Case } from "@/generated/prisma/client";
import { daError, DAResult, daSuccess, toDAError } from "@/lib/data-access-errors";
import { ERRORS } from "@/lib/errors";
import { getServerSession } from "@/lib/get-session";
import { tenantPrisma } from "@/lib/prisma";
import { CaseBase } from "@/schema/base/case.base";

export async function getCases(page: number, limit: number): Promise<DAResult<CaseBase[]>> {
	try {
		const session = await getServerSession();

		if (!session) {
			return daError(ERRORS.UNAUTHORIZED.toJSON());
		}

		const labId = session.user.labId;

		if (!labId) {
			return daError(ERRORS.LAB_NOT_FOUND.toJSON());
		}

		const prisma = await tenantPrisma(labId);

		const cases = await prisma.case.findMany({
			where: { labId },
			orderBy: { createdAt: "desc" },
			include: {
				Technician: true,
				clinic: true,
				caseItems: true,
				patient: true,
			},
			take: limit,
			skip: (page - 1) * limit,
		});

		return daSuccess(rawCaseToCaseBaseMapper(cases));
	} catch (e) {
		return toDAError(e);
	}
}

export const rawCaseToCaseBaseMapper = (data: Case[]): CaseBase[] => {
	return data.map((c) => ({
		...c,
		grandTotal: Number(c.grandTotal),
	}));
};
