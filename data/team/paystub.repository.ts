import 'server-only'

import { tenantPrisma } from '@/lib/prisma'
import type { PaystubRepository } from '@/modules/labos-payroll/paystub.loader'

export const STAFF_PAYSTUB_SELECT = {
	payoutNumber: true,
	paidAt: true,
	createdAt: true,
	status: true,
	amount: true,
	lab: { select: { title: true, subtitle: true } },
	staff: {
		select: {
			id: true,
			firstName: true,
			lastName: true,
			jobTitle: true,
			roleCategory: true,
		},
	},
	caseAssignments: {
		select: {
			roleCategory: true,
			commissionTotal: true,
			dentalCase: {
				select: {
					caseNumber: true,
					caseItems: {
						take: 1,
						select: {
							product: { select: { name: true } },
							_count: { select: { selectedTeeth: true } },
						},
					},
				},
			},
		},
	},
} as const

export const prismaPaystubRepository: PaystubRepository = {
	async findPaystub({ labId, staffId, payoutId }) {
		const prisma = await tenantPrisma(labId)
		const payout = await prisma.staffPayout.findFirst({
			where: {
				id: payoutId,
				labId,
				staffId,
				status: { in: ['SETTLED', 'PROCESSING'] },
			},
			select: STAFF_PAYSTUB_SELECT,
		})

		if (!payout) return null

		return Object.freeze({
			payoutNumber: payout.payoutNumber,
			payoutDate: payout.paidAt ?? payout.createdAt,
			status: payout.status,
			staff: Object.freeze({
				id: payout.staff.id,
				name: `${payout.staff.firstName} ${payout.staff.lastName}`,
				jobTitle: payout.staff.jobTitle,
				roleCategory: payout.staff.roleCategory,
			}),
			lab: Object.freeze({
				title: payout.lab.title,
				subtitle: payout.lab.subtitle,
			}),
			cases: Object.freeze(
				payout.caseAssignments.map((assignment) => {
					const firstItem = assignment.dentalCase.caseItems[0]
					return Object.freeze({
						caseNumber: assignment.dentalCase.caseNumber,
						assignmentRole: assignment.roleCategory,
						commissionTotal: Number(assignment.commissionTotal),
						productName: firstItem?.product?.name ?? 'Custom Restoration',
						teethCount: firstItem?._count.selectedTeeth ?? 0,
					})
				}),
			),
			totalDisbursed: Number(payout.amount),
		})
	},
}
