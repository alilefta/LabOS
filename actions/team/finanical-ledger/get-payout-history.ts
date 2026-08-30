// actions/team/get-payout-history.ts
'use server'

import { z } from 'zod'
import { actionClientWithLab } from '@/lib/safe-action'
import { tenantPrisma } from '@/lib/prisma'
import { ERRORS } from '@/lib/errors'
import { GetStaffPayoutHistoryResultDTO } from '@/schema/composed/team/payroll-history.dtos'
import { PayoutStatus } from '@/schema/base/enums.base'
import { createLabOSAuthorizationActor } from '@/modules/labos-authorization/actor'
import { labosAuthorizationService } from '@/modules/labos-authorization/service'

export const getStaffPayoutHistoryAction = actionClientWithLab
	.metadata({
		actionName: 'Get-Staff-Payout-History-Action',
		// The legacy gate only establishes lab membership. The V1 permission
		// checks below decide which management roles may read payroll data.
		requiredLabRole: 'STAFF',
	})
	.inputSchema(
		z.object({
			staffId: z.string().uuid('Invalid Staff ID format'),
			take: z.number().default(20).optional(), // Support pagination / limits
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		const { labId } = ctx
		const { staffId, take } = parsedInput
		const actor = createLabOSAuthorizationActor(ctx)
		const [payoutDecision, staffDecision] = await Promise.all([
			labosAuthorizationService.can({
				actor,
				permission: 'payout.list',
			}),
			labosAuthorizationService.can({
				actor,
				permission: 'staff.read',
				target: { type: 'staff', id: staffId },
			}),
		])

		if (!payoutDecision.allowed || !staffDecision.allowed) {
			throw ERRORS.MISSING_PERMISSIONS
		}

		const prisma = await tenantPrisma(labId)

		// 1. Security Check: Verify staff belongs to this lab tenant [2]
		const staffExists = await prisma.labStaff.findUnique({
			where: { id: staffId, labId },
			select: { id: true },
		})

		if (!staffExists) {
			throw ERRORS.NOT_FOUND
		}

		// 2. Fetch Settled & Pending Paychecks (High-Performance Query) [2]
		const payoutsRaw = await prisma.staffPayout.findMany({
			where: {
				labId,
				staffId,
			},
			select: {
				id: true,
				payoutNumber: true,
				amount: true,
				status: true,
				createdAt: true,
				paidAt: true,

				// N+1 Prevention: Get the exact count of cases inside this paycheck [3]
				_count: {
					select: {
						caseAssignments: true,
					},
				},
			},
			// Order by payment date descending (Most recent paychecks first)
			orderBy: { createdAt: 'desc' },
			take: take ?? 20,
		})

		// 3. Simple, Flat DTO Mapping (No heavy memory manipulation) [4]
		const payouts = payoutsRaw.map((p) => ({
			id: p.id, // Using the database Payout ID as the react key
			payoutDate: p.paidAt || p.createdAt, // Fallback to creation date if still PENDING [4]
			casesCount: p._count.caseAssignments,
			totalPaid: Number(p.amount), // Convert Prisma Decimal to Number [4]
			status: p.status as PayoutStatus, // Now dynamic, no longer hardcoded [4]
			payoutNumber: p.payoutNumber,
		}))

		return {
			payouts,
			totalCount: payouts.length,
		} as GetStaffPayoutHistoryResultDTO
	})
