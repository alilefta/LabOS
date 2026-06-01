'use server'

import { z } from 'zod'
import { actionClientWithLab } from '@/lib/safe-action'
import { tenantPrisma } from '@/lib/prisma'
import { ERRORS } from '@/lib/errors'
import { startOfYear } from 'date-fns'
import { computeCommission } from './helpers'
import { CommissionType } from '@/schema/base/enums.base'

export const getStaffPayrollVitalsAction = actionClientWithLab
	.metadata({
		actionName: 'Get-Staff-Payroll-Vitals-Action',
		// Security Guard: Only Managers or Owners can view financial ledger cards [1]
		requiredLabRole: 'MANAGER',
	})
	.inputSchema(
		z.object({
			staffId: z.string().uuid('Invalid Staff ID format'),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		const { labId } = ctx
		const { staffId } = parsedInput

		const prisma = await tenantPrisma(labId)

		// 1. Security Check: Verify staff belongs to this lab tenant [2]
		const staffExists = await prisma.labStaff.findUnique({
			where: { id: staffId, labId },
			select: {
				id: true,
				commissionType: true,
				commissionValue: true,
				firstName: true,
				lastName: true,
			},
		})

		if (!staffExists) {
			throw ERRORS.NOT_FOUND
		}

		const today = new Date()
		const startOfCurrentYear = startOfYear(today)

		// 2. Parallel Database Queries (N+1 Prevention) [2]
		const [pendingAssignmentsRaw, ytdAgg] = await Promise.all([
			// Query 1: Fetch raw assignments to calculate Pending Debt JIT
			// We select only what is needed for the math formula to keep memory footprint tiny
			prisma.caseStaffAssignment.findMany({
				where: {
					labId,
					staffId,
					isPaid: false,
					dentalCase: {
						status: { in: ['COMPLETED', 'DELIVERED'] },
					},
				},
				select: {
					commissionType: true,
					commissionValue: true,
					dentalCase: {
						select: { grandTotal: true },
					},
				},
			}),

			// Query 2: Calculate YTD Earnings
			// We can trust the DB _sum here because `commissionTotal` is finalized
			// and frozen into the DB row at the exact moment `isPaid` becomes true.
			prisma.caseStaffAssignment.aggregate({
				where: {
					labId,
					staffId,
					isPaid: true,
					paidAt: { gte: startOfCurrentYear },
				},
				_sum: {
					commissionTotal: true,
				},
			}),
		])

		// 3. Just-In-Time (JIT) Node.js Memory Calculation
		const totalPendingCalculated = pendingAssignmentsRaw.reduce(
			(sum, assignment) => {
				const caseTotal = Number(assignment.dentalCase.grandTotal ?? 0)
				const commVal = Number(assignment.commissionValue ?? 0)

				return (
					sum +
					computeCommission(
						assignment.commissionType as CommissionType,
						commVal,
						caseTotal,
					)
				)
			},
			0,
		)

		// 4. Return Secure, Flattened DTO
		return {
			firstName: staffExists.firstName,
			lastName: staffExists.lastName,

			// Card 1: Current Basis
			commissionType: staffExists.commissionType,
			commissionValue: staffExists.commissionValue
				? Number(staffExists.commissionValue)
				: 0,

			// Card 2: Pending Payout (Calculated JIT)
			totalPending: totalPendingCalculated,
			pendingCasesCount: pendingAssignmentsRaw.length,

			// Card 3: YTD Earnings (Aggregated by DB)
			totalYtdEarnings: Number(ytdAgg._sum.commissionTotal ?? 0),
		}
	})
