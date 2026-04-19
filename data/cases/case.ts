import { Case } from "@/generated/prisma/client";
import { daError, DAResult, daSuccess, toDAError } from "@/lib/data-access-errors";
import { ERRORS } from "@/lib/errors";
import { getServerSession } from "@/lib/get-session";
import { composeCaseDTO } from "@/lib/mappers";
import { tenantPrisma } from "@/lib/prisma";
import { CaseBase } from "@/schema/base/case.base";
import { CaseDetailsUI } from "@/schema/composed/case.details";

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
				staffAssignments: true,
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

export async function getDentalCaseById(caseId: string) {
	const session = await getServerSession();

	if (!session) {
		return daError(ERRORS.UNAUTHORIZED.toJSON());
	}

	const labId = session.user.labId;

	if (!labId) {
		return daError(ERRORS.LAB_NOT_FOUND.toJSON());
	}

	if (!caseId) {
		return daError(ERRORS.NOT_FOUND.toJSON());
	}

	const prisma = await tenantPrisma(labId);

	const dentalCase = await prisma.case.findUnique({
		where: {
			id: caseId,
			labId: labId,
		},
		include: {
			clinic: true,
			patient: true,
			dentist: true,
			caseAssetFiles: true,
			staffAssignments: {
				include: {
					staff: true,
				},
			},
			caseItems: {
				include: {
					casePricingPlan: true,
					product: true,
					selectedTeeth: true,
					workType: true,
				},
			},
			caseCategory: true,
		},
	});

	if (!dentalCase) {
		return daError(ERRORS.NOT_FOUND.toJSON());
	}

	// return daSuccess<CaseDetailsUI | null>(serverCaseToCaseDetailsDTOMapper({ ...dentalCase, lab: null, caseItems: dentalCase.caseItems.map((ci) => ({ ...ci, lab: null, dentalCase: null })) }));
	return daSuccess<CaseDetailsUI | null>(composeCaseDTO(dentalCase));
}
export const rawCaseToCaseBaseMapper = (data: Case[]): CaseBase[] => {
	return data.map((c) => ({
		...c,
		grandTotal: Number(c.grandTotal),
	}));
};
