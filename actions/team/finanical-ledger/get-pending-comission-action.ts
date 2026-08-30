// actions/team/get-pending-commissions.ts
'use server'

import { z } from 'zod'
import { actionClientWithLab } from '@/lib/safe-action'
import { tenantPrisma } from '@/lib/prisma'
import { ERRORS } from '@/lib/errors'
import { computeCommission } from './helpers'
import { CommissionType } from '@/schema/base/enums.base'
import { createLabOSAuthorizationActor } from '@/modules/labos-authorization/actor'
import { labosAuthorizationService } from '@/modules/labos-authorization/service'

export const getPendingCommissionsAction = actionClientWithLab
	.metadata({
		actionName: 'Get-Pending-Commissions-Action',
		// The legacy gate only establishes lab membership. The V1 permission
		// checks below decide which management roles may read payroll data.
		requiredLabRole: 'STAFF',
	})
	.inputSchema(
		z.object({
			staffId: z.string().uuid('Invalid Staff ID format'),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		const { labId } = ctx
		const { staffId } = parsedInput
		const actor = createLabOSAuthorizationActor(ctx)
		const decisions = await Promise.all([
			labosAuthorizationService.can({
				actor,
				permission: 'payout.list',
			}),
			labosAuthorizationService.can({
				actor,
				permission: 'staff.read',
				target: { type: 'staff', id: staffId },
			}),
			labosAuthorizationService.can({
				actor,
				permission: 'staff.compensation.read',
				target: { type: 'staff', id: staffId },
			}),
		])

		if (decisions.some((decision) => !decision.allowed)) {
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

		// 2. Fetch Pending Case Assignments (N+1 Proof Query) [3]
		const pendingAssignments = await prisma.caseStaffAssignment.findMany({
			where: {
				labId,
				staffId,
				isPaid: false,
				dentalCase: {
					status: { in: ['COMPLETED', 'DELIVERED'] },
				},
			},
			select: {
				id: true,
				commissionType: true,
				commissionValue: true,
				commissionTotal: true,
				createdAt: true,

				// N+1 Prevention: Flattening the Case relations inside the single JOIN
				dentalCase: {
					select: {
						id: true,
						caseNumber: true,
						grandTotal: true,
						createdAt: true,
						patient: { select: { name: true } },
					},
				},
			},
			// Order oldest first so accountants resolve aged debts first
			orderBy: { createdAt: 'asc' },
		})

		// 3. Map to clean, flat, serializable Client DTO [4]
		const mappedCommissions = pendingAssignments.map((assignment) => {
			const caseTotalVal = Number(assignment.dentalCase.grandTotal ?? 0)
			const commValue = Number(assignment.commissionValue ?? 0)

			// 🔥 JIT COMPUTATION: We calculate what is owed RIGHT NOW based on the snapshot
			const calculatedOwed = computeCommission(
				assignment.commissionType as CommissionType,
				commValue,
				caseTotalVal,
			)

			return {
				assignmentId: assignment.id,
				caseId: assignment.dentalCase.id,
				caseNumber: assignment.dentalCase.caseNumber,
				patientName: assignment.dentalCase.patient.name,
				caseTotal: caseTotalVal,

				// Return the mathematically guaranteed number
				commissionTotal: calculatedOwed,

				assignedAt: assignment.createdAt,
				caseCreatedAt: assignment.dentalCase.createdAt,
			}
		})

		return {
			pendingCommissions: mappedCommissions,
			totalCount: mappedCommissions.length,
		}
	})
