import { Case } from '@/generated/prisma/client'
import {
	daError,
	DAResult,
	daSuccess,
	toDAError,
} from '@/lib/data-access-errors'
import { ERRORS } from '@/lib/errors'
import { getDataTenantContext } from '@/lib/data-tenant-context'
import { composeCaseDTO } from '@/lib/mappers'
import { tenantPrisma } from '@/lib/prisma'
import { CaseBase } from '@/schema/base/case.base'
import { CaseDetailsUI } from '@/schema/composed/case.details'

export async function getCases(
	page: number,
	limit: number,
): Promise<DAResult<CaseBase[]>> {
	try {
		const tenantResult = await getDataTenantContext()
		if (!tenantResult.success) return daError(tenantResult.error)
		const { labId } = tenantResult.data

		const prisma = await tenantPrisma(labId)

		const cases = await prisma.case.findMany({
			where: { labId },
			orderBy: { createdAt: 'desc' },
			include: {
				staffAssignments: true,
				clinic: true,
				caseItems: true,
				patient: true,
			},
			take: limit,
			skip: (page - 1) * limit,
		})

		return daSuccess(rawCaseToCaseBaseMapper(cases))
	} catch (e) {
		return toDAError(e)
	}
}

export async function getDentalCaseById(caseId: string) {
	const tenantResult = await getDataTenantContext()
	if (!tenantResult.success) return daError(tenantResult.error)
	const { labId } = tenantResult.data

	if (!caseId) {
		return daError(ERRORS.NOT_FOUND.toJSON())
	}

	const prisma = await tenantPrisma(labId)

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
			caseActivityLogs: {
				include: {
					actor: true,
				},
			},
			invoiceCase: true,
			remakes: true,
			originalCase: true,
		},
	})
	if (!dentalCase) {
		return daError(ERRORS.NOT_FOUND.toJSON())
	}

	return daSuccess<CaseDetailsUI | null>(composeCaseDTO(dentalCase))
}
export const rawCaseToCaseBaseMapper = (data: Case[]): CaseBase[] => {
	return data.map((c) => ({
		...c,
		grandTotal: Number(c.grandTotal),
	}))
}
